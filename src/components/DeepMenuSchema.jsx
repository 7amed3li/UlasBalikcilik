"use client";

import React from "react";
import { menuData } from "@/data/menuData";
import { menuTranslations } from "@/i18n/translations";
import { useAppContext } from "@/context/AppContext";
import { ULAS_CONFIG } from "@/data/ulasConfig";

export default function DeepMenuSchema({ locale = "tr" }) {
  const { getLivePrice } = useAppContext();
  const mt = menuTranslations[locale] || menuTranslations.tr;

  const baseUrl = ULAS_CONFIG.siteUrl;
  const localePath = locale === "tr" ? "/menu" : `/${locale}/menu`;
  const menuUrl = `${baseUrl}${localePath}`;

  const hasMenuSection = menuData.map((category) => {
    const categoryName =
      mt.categories?.[category.id] || category.category[locale] || category.category.tr;

    const hasMenuItem = category.items.map((item) => {
      const itemName =
        mt.items?.[item.id]?.name || item.name?.[locale] || item.name?.tr || item.id;
      const itemDesc =
        mt.items?.[item.id]?.desc || item.description?.[locale] || item.description?.tr || "";

      const menuItem = {
        "@type": "MenuItem",
        name: itemName,
        description: itemDesc,
        url: `${menuUrl}#${item.id}`,
        offers: {
          "@type": "Offer",
          price: getLivePrice(item) || 0,
          priceCurrency: "TRY",
          availability: "https://schema.org/InStock",
        },
      };

      if (item.image) {
        const imageUrl = item.image.startsWith("http")
          ? item.image
          : `${baseUrl}${item.image}`;
        menuItem.image = imageUrl;
      }

      return menuItem;
    });

    return {
      "@type": "MenuSection",
      name: categoryName,
      hasMenuItem,
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${menuUrl}/#menu`,
    name: `Ulaş Balıkçılık — Fish & Seafood Menu (${locale.toUpperCase()})`,
    url: menuUrl,
    mainEntityOfPage: menuUrl,
    isPartOf: { "@id": `${baseUrl}/#restaurant` },
    hasMenuSection,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
