import { menuData } from "@/data/menuData";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";
import { getLivePricesMap } from "@/lib/services/priceService";
import DishDetailClient from "@/components/DishDetailClient";

import tr from "@/i18n/menu/tr.json";
import en from "@/i18n/menu/en.json";
import ar from "@/i18n/menu/ar.json";
import ru from "@/i18n/menu/ru.json";
import fa from "@/i18n/menu/fa.json";
import fr from "@/i18n/menu/fr.json";
import de from "@/i18n/menu/de.json";
import it from "@/i18n/menu/it.json";
import es from "@/i18n/menu/es.json";
import zh from "@/i18n/menu/zh.json";

const translations = { tr, en, ar, ru, fa, fr, de, it, es, zh };

export async function generateStaticParams() {
  const params = [];
  menuData.forEach((category) => {
    category.items.forEach((item) => {
      if (item.id) {
        params.push({ id: item.id });
      }
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { id, lang = "tr" } = await params;

  let itemData = null;
  for (const cat of menuData) {
    const found = cat.items.find((i) => i.id === id);
    if (found) {
      itemData = found;
      break;
    }
  }

  if (!itemData) return { title: "Ürün Bulunamadı | Ulaş Balıkçılık" };

  const t = translations[lang] || translations.tr;
  const itemName = t.items?.[id]?.name || itemData.name?.[lang] || itemData.name?.tr || itemData.id;
  const itemDesc =
    t.items?.[id]?.desc || itemData.description?.[lang] || itemData.description?.tr || "";
  const siteUrl = RESTAURANT_INFO.siteUrl;

  return {
    title: `${itemName} | Ulaş Balıkçılık`,
    description: itemDesc || `${itemName} — Ulaş Balıkçılık Cihangir & Maslak 1453.`,
    openGraph: {
      title: `${itemName} | Ulaş Balıkçılık`,
      description: itemDesc,
      url: `${siteUrl}/dish/${id}`,
      images: itemData.image ? [{ url: `${siteUrl}${itemData.image}` }] : [],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;

  let livePrice = null;
  try {
    const livePrices = await getLivePricesMap();
    if (livePrices && livePrices[id] !== undefined) {
      livePrice = livePrices[id];
    }
  } catch (_) {
    /* fallback to menuData price */
  }

  return <DishDetailClient itemId={id} livePrice={livePrice} />;
}
