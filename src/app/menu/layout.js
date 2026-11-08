import React from "react";
import { menuData } from "@/data/menuData";
import trMenu from "@/i18n/menu/tr.json";
import { getLivePricesMap } from "@/lib/services/priceService";

export const metadata = {
  title: "Menü | Ulaş Balıkçılık — Cihangir & Maslak 1453 Balık Restoranı",
  description:
    "Ulaş Balıkçılık dijital menüsü: günlük taze Karadeniz hamsisi, ızgara ve tava balıklar, soğuk ve sıcak deniz mezeleri, salatalar ve fırında sıcak helva.",
  keywords: [
    "Ulaş Balıkçılık menü",
    "Ulaş Balık Cihangir",
    "Ulaş Balık Maslak 1453",
    "balık menüsü İstanbul",
    "hamsi tava",
    "levrek ızgara",
    "çipura ızgara",
    "deniz mezeleri",
  ],
  openGraph: {
    title: "Menü | Ulaş Balıkçılık — Cihangir & Maslak 1453",
    description:
      "Günlük taze balıklar, ızgaralar, tavalar, deniz mezeleri ve tatlılar.",
    url: "https://www.ulasbalik.com/menu",
    siteName: "Ulaş Balıkçılık",
    images: [
      {
        url: "/ulas-logo.jpg",
        width: 1024,
        height: 675,
        alt: "Ulaş Balıkçılık Menü",
      },
    ],
  },
};

export default async function MenuLayout({ children }) {
  const siteUrl = "https://www.ulasbalik.com";
  const livePrices = await getLivePricesMap();

  const menuSections = menuData.map((cat) => {
    const catNameTr = trMenu.categories?.[cat.id] || cat.category?.tr || cat.id;

    return {
      "@type": "MenuSection",
      name: catNameTr,
      hasMenuItem: (cat.items || []).map((item) => {
        const trItem = trMenu.items?.[item.id] || {};
        const itemName = trItem.name || item.name?.tr || item.id;
        const itemPrice = livePrices[item.id] ?? item.price ?? 0;

        return {
          "@type": "MenuItem",
          name: itemName,
          description: trItem.desc || item.description?.tr || itemName,
          offers: {
            "@type": "Offer",
            price: itemPrice,
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/menu#${cat.id}`,
          },
        };
      }),
    };
  });

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Ulaş Balıkçılık Dijital Menü",
    url: `${siteUrl}/menu`,
    mainEntityOfPage: `${siteUrl}/menu`,
    inLanguage: ["tr", "en", "ar", "ru", "fa", "fr", "de", "it", "es", "zh"],
    hasMenuSection: menuSections,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      {children}
    </>
  );
}
