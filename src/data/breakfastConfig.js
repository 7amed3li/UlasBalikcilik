/**
 * Restaurant Configuration
 * Single source of truth for restaurant-specific settings.
 */

export const BREAKFAST_HOURS = {
  opens: "11:00",
  closes: "02:00",
  display: {
    en: "Mon–Sat 11:00–02:00 • Sun 13:00–02:00",
    tr: "Pzt–Cmt 11:00–02:00 • Pazar 13:00–02:00",
    ar: "الاثنين–السبت 11:00–02:00 • الأحد 13:00–02:00",
    ru: "Пн–Сб 11:00–02:00 • Вс 13:00–02:00",
    fa: "دوشنبه تا شنبه ۱۱:۰۰–۰۲:۰۰ • یکشنبه ۱۳:۰۰–۰۲:۰۰",
    fr: "Lun–Sam 11h00–02h00 • Dim 13h00–02h00",
    de: "Mo–Sa 11:00–02:00 • So 13:00–02:00",
    it: "Lun–Sab 11:00–02:00 • Dom 13:00–02:00",
    es: "Lun–Sáb 11:00–02:00 • Dom 13:00–02:00",
    zh: "周一至周六 11:00–02:00 • 周日 13:00–02:00",
  },
};

export const RESTAURANT_INFO = {
  name: "Ulaş Balıkçılık — Cihangir & Maslak 1453",
  phone: null, // Cihangir phone awaiting confirmation (0212 434 25 02 vs 0212 434 23 02)
  phoneDisplay: "0212 813 57 57 (Maslak)",
  address: {
    street: "Kuloğlu, Liva Sk. No: 15/A",
    locality: "Cihangir, Beyoğlu",
    region: "İstanbul",
    postalCode: "34433",
    country: "TR",
  },
  coordinates: {
    latitude: 41.0329702,
    longitude: 28.9823786,
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Cihangir+Ula%C5%9F+Bal%C4%B1k%C3%A7%C4%B1l%C4%B1k/@41.0329702,28.9823786,17z/data=!4m8!3m7!1s0x14cab9df517a6c03:0x98fabf0a208b9fa2!8m2!3d41.0329702!4d28.9823786!9m1!1b1!16s%2Fg%2F11ggr51qp4?hl=en",
  googleMapsPlaceId: "0x14cab9df517a6c03:0x98fabf0a208b9fa2",
  siteUrl: "https://www.ulasbalik.com",
  instagram: "https://www.instagram.com/ulasbalik_restaurant/",
  generalHours: { opens: "11:00", closes: "02:00" },
};

export const BREAKFAST_DISH_IDS = {
  featured: "levrek_izgara",
  dishes: [
    "hamsi_tava",
    "cipura_izgara",
    "midye_dolma",
    "hamsili_pilav",
    "kalamar_tava",
  ],
};

export const UTM_CAMPAIGNS = {
  en: "ulas_en",
  tr: "ulas_tr",
  ar: "ulas_ar",
  ru: "ulas_ru",
  fa: "ulas_fa",
  fr: "ulas_fr",
  de: "ulas_de",
  it: "ulas_it",
  es: "ulas_es",
  zh: "ulas_zh",
};

export function getBreakfastUrl(locale) {
  const slug = "menu";
  if (locale === "tr") return `/${slug}`;
  return `/${locale}/${slug}`;
}

export function getBreakfastFullUrl(locale) {
  return `${RESTAURANT_INFO.siteUrl}${getBreakfastUrl(locale)}`;
}

export const getDirectionsUrl = () => {
  return RESTAURANT_INFO.googleMapsUrl;
};
