export async function generateMetadata({ params }) {
  const { lang } = await params;
  const baseUrl = "https://www.ulasbalik.com";

  const localeMap = {
    tr: "tr_TR",
    en: "en_US",
    ar: "ar_SA",
    ru: "ru_RU",
    fa: "fa_IR",
    fr: "fr_FR",
    de: "de_DE",
    it: "it_IT",
    es: "es_ES",
    zh: "zh_CN",
  };

  const titles = {
    tr: "Ulaş Balıkçılık | Cihangir & Maslak 1453 Balık Restoranı",
    en: "Ulaş Balıkçılık | Fish & Seafood Restaurant in Cihangir & Maslak 1453",
    ar: "مطعم أولاش باليك (Ulaş Balıkçılık) | أسماك ومأكولات بحرية في جيهانغير ومسلك 1453",
    ru: "Ulaş Balıkçılık | Рыбный ресторан в Джихангире и Маслак 1453",
    fa: "رستوران ماهی و غذاهای دریایی اولاش بالیک | جیهانگیر و مسلک ۱۴۵۳",
    fr: "Ulaş Balıkçılık | Restaurant de Poisson à Cihangir & Maslak 1453",
    de: "Ulaş Balıkçılık | Fischrestaurant in Cihangir & Maslak 1453",
    it: "Ulaş Balıkçılık | Ristorante di Pesce a Cihangir & Maslak 1453",
    es: "Ulaş Balıkçılık | Restaurante de Pescado en Cihangir y Maslak 1453",
    zh: "Ulaş Balıkçılık | 伊斯坦布尔 Cihangir 与 Maslak 1453 海鲜餐厅",
  };

  const descriptions = {
    tr: "Cihangir (Beyoğlu) ve Maslak 1453 (Sarıyer) şubelerimizde günlük taze Karadeniz balıkları, ızgaralar, tavalar, deniz mezeleri ve fırında sıcak helva.",
    en: "Daily fresh Black Sea catch, grilled and pan-fried fish, coastal mezze, and warm halva at our Cihangir and Maslak 1453 branches in Istanbul.",
    ar: "أسماك البحر الأسود الطازجة يومياً، المشويات والمقالي البحرية والمقبلات والحلاوة الساخنة في فرعي جيهانغير ومسلك 1453 بإسطنبول.",
    ru: "Свежая черноморская рыба, блюда на гриле и сковороде, морские закуски мезе и горячая халва в наших филиалах в Джихангире и Маслак 1453.",
    fa: "ماهی تازه دریای سیاه، کبابی و تابه‌ای، مزه‌های دریایی و حلوای داغ در شعبه‌های جیهانگیر و مسلک ۱۴۵۳ استانبول.",
    fr: "Poissons frais de la mer Noire, grillades, poêlées, mezzés de la mer et halva chaud à Cihangir et Maslak 1453.",
    de: "Täglich frischer Schwarzmeerfisch, Grill- und Pfannengerichte, Meeresfrüchte-Mezze und warmes Halva in Cihangir und Maslak 1453.",
    it: "Pesce fresco del Mar Nero, grigliate, padellate, antipasti di mare e halva calda a Cihangir e Maslak 1453.",
    es: "Pescado fresco del Mar Negro, a la parrilla y sartén, mezze marinero y halva caliente en Cihangir y Maslak 1453.",
    zh: "伊斯坦布尔 Cihangir 与 Maslak 1453 分店每日供应新鲜黑海鱼类、炭烤与香煎海鲜、传统冷盘及热烤哈尔瓦。",
  };

  const currentLocale = localeMap[lang] || "tr_TR";
  const url = `${baseUrl}/${lang}`;

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: url,
      languages: {
        "x-default": baseUrl,
        tr: `${baseUrl}/tr`,
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        ru: `${baseUrl}/ru`,
        fa: `${baseUrl}/fa`,
        fr: `${baseUrl}/fr`,
        de: `${baseUrl}/de`,
        it: `${baseUrl}/it`,
        es: `${baseUrl}/es`,
        zh: `${baseUrl}/zh`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: url,
      locale: currentLocale,
    },
  };
}

export default function LangLayout({ children }) {
  return children;
}
