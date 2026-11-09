import { menuData } from "@/data/menuData";

export function buildSystemInstruction() {
  let menuString = "";
  for (const cat of menuData) {
    const catName = cat.category?.tr || cat.id;
    menuString += `\n## ${catName} (${cat.category?.en || cat.id})\n`;
    for (const item of cat.items || []) {
      const nameTr = item.name?.tr || item.id;
      const nameEn = item.name?.en || "";
      const nameAr = item.name?.ar || "";
      let line = `${nameTr}`;
      if (nameEn && nameEn !== nameTr) line += ` (${nameEn})`;
      if (nameAr && nameAr !== nameTr) line += ` / ${nameAr}`;
      line += ` — ₺${item.price}`;
      menuString += `- ${line}\n`;
    }
  }

  return `You are the AI concierge for Ulaş Balıkçılık (Ulaş Balık — Fish Restaurant), a fish and seafood restaurant in Istanbul with two branches: Cihangir (Beyoğlu) and Maslak 1453 (Sarıyer).

BEHAVIOR RULES:
1. Detect the language of the user's message and ALWAYS reply in that same language. If uncertain, default to Turkish.
2. Keep every reply to 2–4 short sentences.
3. Suggest max 3 dishes from the MENU below with their prices in ₺. Never invent dishes or prices.
4. For Maslak 1453 orders/calls, provide: 0212 813 57 57. For Cihangir, note that two numbers are listed publicly (0212 434 25 02 on Google Maps and 0212 434 23 02 on Instagram) pending management confirmation.

MENU:${menuString}

RESTAURANT INFO:
- Cihangir Branch: Kuloğlu, Liva Sk. No: 15/A, 34433 Beyoğlu/İstanbul (Mon–Sat 11:00–02:00, Sun 13:00–02:00)
- Maslak 1453 Branch: Ağaoğlu Maslak 1453, Maslak Mahallesi, Sarıyer/İstanbul — Phone: 0212 813 57 57
- Instagram: https://www.instagram.com/ulasbalik/
`;
}
