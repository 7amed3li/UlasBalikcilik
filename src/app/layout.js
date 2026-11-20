import { AppProvider } from "@/context/AppContext";
import SiteChrome from "@/components/SiteChrome";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { headers } from "next/headers";
import {
  Alexandria,
  Caveat,
  Cormorant_Garamond,
  Manrope,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ULAS_CONFIG } from "@/data/ulasConfig";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-outfit", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });
const alexandria = Alexandria({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-alexandria", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ulasbalikcilik.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ulaş Balıkçılık | Cihangir & Maslak 1453 Balık Restoranı",
  description:
    "Ulaş Balıkçılık — Cihangir (Beyoğlu) ve Maslak 1453 (Sarıyer) şubelerimizde günlük taze Karadeniz balıkları, ızgaralar, tavalar, zengin deniz mezeleri ve sıcak helva. Dijital menümüzü keşfedin.",
  keywords: [
    "Ulaş Balıkçılık",
    "Ulaş Balık",
    "Ulaş Balık Cihangir",
    "Ulaş Balık Maslak 1453",
    "Cihangir balık restoranı",
    "Beyoğlu balıkçı",
    "Maslak 1453 balık restoranı",
    "taze balık İstanbul",
    "hamsi tava Cihangir",
    "balık ızgara Beyoğlu",
    "deniz ürünleri İstanbul",
    "seafood restaurant Cihangir",
    "fish restaurant Istanbul",
    "مطعم سمك إسطنبول",
    "أولاش باليك جيهانغير",
    "مطعم مأكولات بحرية مسلك 1453",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      tr: "/",
      en: "/en",
      ar: "/ar",
      ru: "/ru",
      fa: "/fa",
      fr: "/fr",
      de: "/de",
      it: "/it",
      es: "/es",
      zh: "/zh",
    },
  },
  icons: {
    icon: "/ulas-logo.webp",
    apple: "/ulas-logo.webp",
  },
  authors: [{ name: "Ulaş Balıkçılık" }],
  creator: "Hamed Mohamed",
  openGraph: {
    title: "Ulaş Balıkçılık | Cihangir & Maslak 1453 Balık Restoranı",
    description:
      "Cihangir ve Maslak 1453 şubelerimizde günlük taze balık, ızgara, tava, deniz mezeleri ve sıcak helva.",
    url: siteUrl,
    siteName: "Ulaş Balıkçılık",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/ulas-logo.webp",
        width: 1024,
        height: 675,
        alt: "Ulaş Balıkçılık — Fish Restaurant Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulaş Balıkçılık | Cihangir & Maslak 1453",
    description:
      "Günlük taze Karadeniz balıkları, ızgaralar, tavalar ve mezeler. Dijital menümüzü inceleyin.",
    images: ["/ulas-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#0C96DF",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

const globalSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": `${siteUrl}/#restaurant-cihangir`,
      name: "Ulaş Balıkçılık — Cihangir",
      alternateName: ["Ulaş Balık", "Ulaş Balık Cihangir", "Ulas Balikcilik"],
      description:
        "Fish and seafood restaurant in Cihangir, Beyoğlu serving daily fresh Black Sea fish, grilled and pan-fried seafood, and traditional mezze.",
      url: siteUrl,
      ...(ULAS_CONFIG.branches.cihangir.phoneHref
        ? { telephone: ULAS_CONFIG.branches.cihangir.confirmedPhone }
        : {}),
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/ulas-logo.webp`,
        contentUrl: `${siteUrl}/ulas-logo.webp`,
        caption: "Ulaş Balıkçılık — Fish Restaurant Logo",
        width: 1024,
        height: 675,
      },
      image: [`${siteUrl}/ulas-logo.webp`],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kuloğlu, Liva Sk. No: 15/A",
        addressLocality: "Cihangir, Beyoğlu",
        addressRegion: "İstanbul",
        postalCode: "34433",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.0329702,
        longitude: 28.9823786,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "11:00",
          closes: "02:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "13:00",
          closes: "02:00",
        },
      ],
      servesCuisine: ["Seafood", "Fish", "Turkish", "Black Sea", "Mediterranean"],
      priceRange: "₺₺",
      menu: `${siteUrl}/menu`,
      currenciesAccepted: "TRY",
      paymentAccepted: "Cash, Credit Card",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "558",
        bestRating: "5",
        worstRating: "1",
      },
      hasMenu: {
        "@type": "Menu",
        name: "Ulaş Balıkçılık Menü",
        url: `${siteUrl}/menu`,
        hasMenuSection: [
          { "@type": "MenuSection", name: "Izgaralar" },
          { "@type": "MenuSection", name: "Tavalar" },
          { "@type": "MenuSection", name: "Mezeler" },
          { "@type": "MenuSection", name: "Salatalar" },
          { "@type": "MenuSection", name: "Çorbalar" },
          { "@type": "MenuSection", name: "Ekmek Arası" },
          { "@type": "MenuSection", name: "Tatlılar" },
          { "@type": "MenuSection", name: "İçecekler" },
          { "@type": "MenuSection", name: "Kahvaltı" },
        ],
      },
      acceptsReservations: "True",
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Alcohol-Free Family Restaurant", value: true },
        { "@type": "LocationFeatureSpecification", name: "Daily Fresh Black Sea Fish", value: true },
        { "@type": "LocationFeatureSpecification", name: "Transparent Published Menu Prices", value: true },
      ],
      department: [
        {
          "@type": "Restaurant",
          "@id": `${siteUrl}/#restaurant-maslak`,
          name: "Ulaş Balıkçılık — Maslak 1453",
          telephone: "+902128135757",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ağaoğlu Maslak 1453, Maslak Mahallesi",
            addressLocality: "Sarıyer",
            addressRegion: "İstanbul",
            addressCountry: "TR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            worstRating: "1",
          },
          servesCuisine: ["Seafood", "Fish", "Turkish", "Black Sea"],
          priceRange: "₺₺",
          acceptsReservations: "True",
        },
      ],
      sameAs: [
        "https://www.instagram.com/ulasbalik_restaurant/",
        "https://www.instagram.com/ulasbalik/",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Ulaş Balıkçılık alkolsüz bir aile restoranı mı?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet, Ulaş Balıkçılık hem Cihangir hem de Maslak 1453 şubelerinde %100 alkolsüz, aile dostu bir balık ve deniz ürünleri restoranıdır.",
          },
        },
        {
          "@type": "Question",
          name: "Ulaş Balıkçılık şubeleri nerede ve telefon numaraları nedir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cihangir şubesi Kuloğlu, Liva Sk. No: 15/A Beyoğlu/İstanbul adresindedir (0212 434 25 02). Maslak 1453 şubesi Ağaoğlu Maslak 1453 Sarıyer/İstanbul adresindedir (0212 813 57 57).",
          },
        },
        {
          "@type": "Question",
          name: "Balıklar günlük taze mi geliyor ve fiyatlar şeffaf mı?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet, şefimiz her gece 01.00'de İstanbul balık halinden günlük taze Karadeniz balıklarını bizzat seçer. Tüm menü fiyatları web sitemizde şeffaf olarak yayınlanmaktadır.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ulaş Balıkçılık",
      publisher: {
        "@id": `${siteUrl}/#restaurant-cihangir`,
      },
    },
  ],
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "tr";
  const dir = locale === "ar" || locale === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`h-full antialiased ${outfit.variable} ${jakarta.variable} ${alexandria.variable} ${caveat.variable} ${cormorant.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchemaGraph),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F4F9FB] text-[#2E3B44] font-[var(--font-inter)]"
        suppressHydrationWarning
      >
        <GoogleTagManager gtmId="GTM-PRHLP84Z" />

        <AppProvider>
          <Analytics />
          <SiteChrome>{children}</SiteChrome>
        </AppProvider>
      </body>
    </html>
  );
}
