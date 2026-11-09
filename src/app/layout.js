import {
  Outfit,
  Plus_Jakarta_Sans,
  Alexandria,
  Caveat,
} from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import SmartSplash from "@/components/SmartSplash";
import OrderFlowWrapper from "@/components/OrderFlowWrapper";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { headers } from "next/headers";
import Footer from "@/components/Footer";
import { ULAS_CONFIG } from "@/data/ulasConfig";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
  preload: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
  preload: true,
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-alexandria",
  preload: true,
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-caveat",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ulasbalik.com";

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
        url: "/ulas-logo.jpg",
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
    images: ["/ulas-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#0E4F4A",
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
        url: `${siteUrl}/ulas-logo.jpg`,
        contentUrl: `${siteUrl}/ulas-logo.jpg`,
        caption: "Ulaş Balıkçılık — Fish Restaurant Logo",
        width: 1024,
        height: 675,
      },
      image: [`${siteUrl}/ulas-logo.jpg`],
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
        ],
      },
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
          servesCuisine: ["Seafood", "Fish", "Turkish"],
        },
      ],
      sameAs: ["https://www.instagram.com/ulasbalik/"],
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
      className={`h-full antialiased ${outfit.variable} ${plusJakarta.variable} ${alexandria.variable} ${caveat.variable}`}
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
        className="min-h-full flex flex-col bg-[#DCE8E6] text-[#18323B] font-[var(--font-inter)]"
        suppressHydrationWarning
      >
        <GoogleTagManager gtmId="GTM-PRHLP84Z" />

        <AppProvider>
          <SmartSplash />
          <Analytics />
          <Header />
          <main className="flex-grow w-full max-w-5xl mx-auto flex flex-col relative">
            {children}
          </main>
          <Footer />
          <MobileStickyCTA />
          <OrderFlowWrapper />
        </AppProvider>
      </body>
    </html>
  );
}
