import { NextResponse } from 'next/server';

// Strict in-memory rate limiter for login attempts
const loginRateLimitMap = globalThis.loginRateLimitMap || new Map();
if (process.env.NODE_ENV !== 'production') globalThis.loginRateLimitMap = loginRateLimitMap;

export async function POST(request) {
  // Use IP for rate limiting
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const limit = 15; // Max 15 login attempts per minute per IP

  if (!loginRateLimitMap.has(ip)) {
    loginRateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
  } else {
    const record = loginRateLimitMap.get(ip);
    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + windowMs;
    } else {
      record.count++;
      if (record.count > limit) {
        return NextResponse.json({ error: 'Çok fazla giriş denemesi. Lütfen bir dakika bekleyin.' }, { status: 429 });
      }
    }
  }

  return NextResponse.json({ success: true });
}
