import { GoogleGenAI } from "@google/genai";
import { buildSystemInstruction } from "@/lib/systemPrompt";

export const runtime = "nodejs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Models to try in order — if one hits quota, fall back to the next
const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
];

// Simple in-memory rate limiting (10 requests/minute per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  const record = rateLimitMap.get(ip);
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// Cleanup stale entries occasionally to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS * 5);


/**
 * Try calling Gemini with fallback models.
 * If a model returns 429 (quota) or 404 (not found), try the next model.
 * For network errors, retry up to 2 times with the same model.
 */
async function callWithFallback(contents, systemInstruction) {
  let lastError = null;

  for (const model of MODELS) {
    // Try each model with up to 2 retries for network errors
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            temperature: 0.4,
            maxOutputTokens: 300,
          },
        });
        return result;
      } catch (err) {
        lastError = err;
        const status = err?.status;
        
        // Quota exhausted or model not found → skip to next model
        if (status === 429 || status === 404) {
          console.warn(`Model ${model} returned ${status}, trying next model...`);
          break; // break retry loop, continue to next model
        }
        
        // Network error → retry same model
        const isNetworkError = 
          err?.code === 'UND_ERR_CONNECT_TIMEOUT' ||
          err?.code === 'ECONNRESET' ||
          err?.code === 'UND_ERR_SOCKET' ||
          err?.message?.includes('fetch failed');
        
        if (isNetworkError && attempt < 1) {
          console.warn(`Network error on ${model}, retrying (attempt ${attempt + 1})...`);
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
          continue;
        }
        
        // Other errors → throw immediately
        throw err;
      }
    }
  }

  // All models exhausted
  throw lastError || new Error("All models failed");
}


export async function POST(req) {
  try {
    // Determine IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown-ip";
    
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string" || message.length > 1000) {
      return Response.json({ error: "Invalid message" }, { status: 400 });
    }

    const systemInstruction = buildSystemInstruction();
    const contents = [...history, { role: "user", parts: [{ text: message }] }];

    const result = await callWithFallback(contents, systemInstruction);

    return Response.json({ reply: result.text });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      {
        reply: "Sorry, I'm having trouble right now. Please reach us directly by phone at +90 212 251 36 96 and our team will be happy to help!",
      },
      { status: 200 } // 200 so the widget renders the fallback text gracefully
    );
  }
}
