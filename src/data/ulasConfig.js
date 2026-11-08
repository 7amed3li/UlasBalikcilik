/**
 * Ulaş Balıkçılık — Centralized Restaurant & Branch Configuration
 * Single source of truth for branch addresses, maps, social links, and phone numbers.
 *
 * NOTE ON CIHANGIR PHONE NUMBER:
 * Google Maps & Cihangir delivery post show: 0212 434 25 02
 * Instagram bio shows: 0212 434 23 02
 * Per instructions, `confirmedPhone` for Cihangir is left `null` (not linked as `tel:`)
 * until management confirms which number is active. Once confirmed, set
 * `CIHANGIR_CONFIRMED_PHONE` below (e.g. "+902124342502" or "+902124342302").
 */

export const CIHANGIR_CONFIRMED_PHONE = null; // Set to "+902124342502" or "+902124342302" after confirmation
export const CIHANGIR_CONFIRMED_PHONE_DISPLAY = null; // Set to "0212 434 25 02" or "0212 434 23 02" after confirmation

export const ULAS_CONFIG = {
  brandName: "Ulaş Balıkçılık",
  shortName: "Ulaş Balık",
  tagline: {
    tr: "Balık Restaurant • Cihangir & Maslak 1453",
    en: "Fish Restaurant • Cihangir & Maslak 1453",
    ar: "مطعم أسماك ومأكولات بحرية • جيهانغير ومسلك 1453",
    ru: "Рыбный ресторан • Джихангир и Маслак 1453",
    fa: "رستوران ماهی و غذای دریایی • جهانگیر و مسلک ۱۴۵۳",
    fr: "Restaurant de Poisson • Cihangir & Maslak 1453",
    de: "Fischrestaurant • Cihangir & Maslak 1453",
    it: "Ristorante di Pesce • Cihangir & Maslak 1453",
    es: "Restaurante de Pescado • Cihangir & Maslak 1453",
    zh: "海鲜鱼类餐厅 • Cihangir & Maslak 1453",
  },
  logoPath: "/ulas-logo.webp",
  logoJpgPath: "/ulas-logo.jpg",
  instagramUrl: "https://www.instagram.com/ulasbalik/",
  instagramHandle: "@ulasbalik",
  branches: {
    cihangir: {
      id: "cihangir",
      isNew: false,
      name: {
        tr: "Cihangir Şubesi",
        en: "Cihangir Branch",
        ar: "فرع جيهانغير (Cihangir)",
        ru: "Филиал Джихангир",
        fa: "شعبه جهانگیر (Cihangir)",
        fr: "Succursale Cihangir",
        de: "Filiale Cihangir",
        it: "Filiale Cihangir",
        es: "Sucursal Cihangir",
        zh: "Cihangir 分店",
      },
      address: "Kuloğlu, Liva Sk. No: 15/A, 34433 Beyoğlu/İstanbul, Türkiye",
      plusCode: "2XMJ+5X Beyoğlu",
      coordinates: {
        latitude: 41.0329702,
        longitude: 28.9823786,
      },
      mapUrl:
        "https://www.google.com/maps/place/Cihangir+Ula%C5%9F+Bal%C4%B1k%C3%A7%C4%B1l%C4%B1k/@41.0329702,28.9823786,17z",
      googleMapsUrl:
        "https://www.google.com/maps/place/Cihangir+Ula%C5%9F+Bal%C4%B1k%C3%A7%C4%B1l%C4%B1k/@41.0329702,28.9823786,17z",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=41.0329702,28.9823786&z=17&output=embed",
      rating: "4.8",
      reviewsCount: "558",
      confirmedPhone: CIHANGIR_CONFIRMED_PHONE,
      confirmedPhoneDisplay: CIHANGIR_CONFIRMED_PHONE_DISPLAY,
      phoneHref: CIHANGIR_CONFIRMED_PHONE ? `tel:${CIHANGIR_CONFIRMED_PHONE}` : null,
      unconfirmedPhones: {
        googleAndDelivery: "0212 434 25 02",
        instagramBio: "0212 434 23 02",
      },
      hours: {
        tr: "Pzt–Cmt: 11:00–02:00 • Pazar: 13:00–02:00",
        en: "Mon–Sat: 11:00–02:00 • Sun: 13:00–02:00",
        ar: "الاثنين–السبت: 11:00–02:00 • الأحد: 13:00–02:00",
        ru: "Пн–Сб: 11:00–02:00 • Вс: 13:00–02:00",
        fa: "دوشنبه تا شنبه: ۱۱:۰۰–۰۲:۰۰ • یکشنبه: ۱۳:۰۰–۰۲:۰۰",
        fr: "Lun–Sam : 11h00–02h00 • Dim : 13h00–02h00",
        de: "Mo–Sa: 11:00–02:00 • So: 13:00–02:00",
        it: "Lun–Sab: 11:00–02:00 • Dom: 13:00–02:00",
        es: "Lun–Sáb: 11:00–02:00 • Dom: 13:00–02:00",
        zh: "周一至周六 11:00–02:00 • 周日 13:00–02:00",
        weekdays: {
          tr: "Pazartesi – Cumartesi: 11:00 – 02:00",
          en: "Monday – Saturday: 11:00 – 02:00",
          ar: "الاثنين – السبت: 11:00 – 02:00",
        },
        sunday: {
          tr: "Pazar: 13:00 – 02:00",
          en: "Sunday: 13:00 – 02:00",
          ar: "الأحد: 13:00 – 02:00",
        },
      },
      features: {
        tr: "Açık Alan Oturma • Paket Servis",
        en: "Outdoor Seating • Delivery Available",
        ar: "جلسات خارجية • خدمة توصيل",
        ru: "Столики на улице • Доставка",
        fa: "فضای باز • ارسال سفارش",
        fr: "Terrasse extérieure • Livraison",
        de: "Außenplätze • Lieferservice",
        it: "Posti all'aperto • Consegna",
        es: "Terraza exterior • Entrega a domicilio",
        zh: "户外座位 • 提供外卖",
      },
    },
    maslak: {
      id: "maslak",
      isNew: true,
      name: {
        tr: "Maslak 1453 Şubesi (Yeni)",
        en: "Maslak 1453 Branch (New)",
        ar: "فرع مسلك 1453 (فرع جديد)",
        ru: "Филиал Маслак 1453 (Новый)",
        fa: "شعبه مسلک ۱۴۵۳ (جدید)",
        fr: "Succursale Maslak 1453 (Nouveau)",
        de: "Filiale Maslak 1453 (Neu)",
        it: "Filiale Maslak 1453 (Nuovo)",
        es: "Sucursal Maslak 1453 (Nuevo)",
        zh: "Maslak 1453 分店（新店）",
      },
      address: "Ağaoğlu Maslak 1453, Maslak Mahallesi, Sarıyer/İstanbul",
      addressNote: {
        tr: "Tam mağaza/giriş numarası ve Google Maps pini yönetim teyidi bekliyor",
        en: "Exact unit/entrance number & Google Maps pin pending confirmation",
        ar: "رقم المحل/المدخل الدقيق ودبوس Google بانتظار تأكيد الإدارة",
        ru: "Точный номер входа и точка Google Maps ожидают подтверждения",
        fa: "شماره دقیق واحد/ورودی و لوکیشن گوگل در انتظار تایید مدیریت",
        fr: "Numéro exact de l'entrée et point Google Maps en attente de confirmation",
        de: "Genaue Eingangsnummer & Google Maps-Pin warten auf Bestätigung",
        it: "Numero civico/ingresso esatto e pin Google Maps in attesa di conferma",
        es: "Número exacto de local/entrada y pin de Google Maps pendientes de confirmación",
        zh: "具体店铺/入口编号及 Google 地图定位待管理层确认",
      },
      mapUrl: "https://yandex.com/maps/org/maslak_ulas_balikcilik/80591156850/",
      yandexMapsUrl: "https://yandex.com/maps/org/maslak_ulas_balikcilik/80591156850/",
      confirmedPhone: "0212 813 57 57",
      confirmedPhoneDisplay: "0212 813 57 57",
      phoneHref: "tel:+902128135757",
      hours: null,
      hoursNote: {
        tr: "Çalışma saatleri teyit bekliyor",
        en: "Working hours pending confirmation",
        ar: "ساعات العمل بانتظار تأكيد الإدارة",
        ru: "Часы работы уточняются",
        fa: "ساعات کاری در انتظار تایید",
        fr: "Horaires d'ouverture en attente de confirmation",
        de: "Öffnungszeiten warten auf Bestätigung",
        it: "Orari di apertura in attesa de conferma",
        es: "Horario pendiente de confirmación",
        zh: "营业时间待确认",
      },
    },
  },
};
