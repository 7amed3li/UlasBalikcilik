import menuData from './menu.json' with { type: "json" };

/**
 * Build a compact system instruction for the AI concierge.
 * 
 * Instead of sending the full 67KB JSON (~17K tokens), we compress
 * each item into a single pipe-delimited line:
 *   CategoryEN | NameTR | NameEN | NameAR | Price₺ | Tags
 * 
 * This reduces token usage by ~80% (17K → ~3K tokens).
 */
export function buildSystemInstruction() {
  // Group items by category for readability
  const byCategory = {};
  for (const item of menuData) {
    const cat = item.categoryName?.en || item.category || "Other";
    if (!byCategory[cat]) byCategory[cat] = [];
    
    const tags = [];
    if (item.vegetarian) tags.push("V");
    if (item.spicy) tags.push("🌶");
    if (item.signature) tags.push("★");
    if (item.trending) tags.push("🔥");

    const nameTr = item.name?.tr || "";
    const nameEn = item.name?.en || "";
    const nameAr = item.name?.ar || "";
    const descEn = item.description?.en || "";
    
    // Compact format: "NameTR (NameEN / NameAR) — ₺Price [tags] desc"
    let line = `${nameTr}`;
    if (nameEn && nameEn !== nameTr) line += ` (${nameEn})`;
    if (nameAr && nameAr !== nameTr && nameAr !== nameEn) line += ` / ${nameAr}`;
    line += ` — ₺${item.price}`;
    if (tags.length) line += ` [${tags.join("")}]`;
    if (descEn && !descEn.startsWith("Delicious")) line += ` ${descEn}`;
    
    byCategory[cat].push(line);
  }

  // Build compact menu string
  let menuString = "";
  for (const [cat, items] of Object.entries(byCategory)) {
    menuString += `\n## ${cat}\n`;
    for (const item of items) {
      menuString += `- ${item}\n`;
    }
  }

  return `You are the AI concierge for Kardeşler Cihangir, a restaurant in Cihangir, Istanbul (near Taksim).

BEHAVIOR RULES:
1. Detect the language of the user's message and ALWAYS reply in that same language. If uncertain, default to English.
2. Keep every reply to 2–4 short sentences. This is a small chat widget — no walls of text.
3. If you need info to recommend well (diet, spice, appetite), ask exactly ONE clarifying question. Never more than one question per turn.
4. Suggest max 3 dishes. For each: name + one-line reason tied to what the user asked.
5. Only recommend dishes from the MENU below. Never invent dishes, prices, or ingredients.
6. For severe allergies, medical diets, or complaints: respond with empathy, do NOT guess, direct them to WhatsApp: wa.me/902122513696
7. If asked unrelated questions, politely redirect to menu/reservation.
8. End recommendations with a soft next step (reserve/order) without being pushy.
9. TYPO TOLERANCE: Users often misspell dish names (e.g. "adna kebab" = "Adana Kebab", "lahmagun" = "Lahmacun", "pideh" = "Pide", "kebbab" = "Kebap"). Always fuzzy-match to the closest dish and confirm: "I think you mean [correct name] — ..."
10. Currency: All prices are in Turkish Lira (₺). If user asks in USD/EUR, say "Our prices are in ₺, approximately X" using rough conversion (1 USD ≈ 38₺).

MENU:${menuString}

RESTAURANT INFO:
- Location: Firuzağa Mah. Firuzağa Camii Sok. No:1A, Cihangir, Beyoğlu, İstanbul
- Hours: 10:00 – 02:00 Every day
- WhatsApp: wa.me/902122513696
- Website: https://kardeslercihangir.com
- Tags: V=Vegetarian, 🌶=Spicy, ★=Signature, 🔥=Trending
`;
}
