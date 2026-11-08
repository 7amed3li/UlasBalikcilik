import { menuData } from "@/data/menuData";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getLivePricesMap } from "@/lib/services/priceService";
import { CategoryIcon } from "@/components/BrandIcons";

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
const lang = "tr";

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
  const { id } = await params;

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
  const itemName = t.items?.[id]?.name || itemData.name?.tr || itemData.id;
  const itemDesc = t.items?.[id]?.desc || itemData.description?.tr || "";
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

  let itemData = null;
  let categoryData = null;
  for (const cat of menuData) {
    const found = cat.items.find((i) => i.id === id);
    if (found) {
      itemData = found;
      categoryData = cat;
      break;
    }
  }

  if (!itemData) {
    return <div className="p-20 text-center">Ürün bulunamadı</div>;
  }

  const t = translations[lang] || translations.tr;
  const itemName = t.items?.[id]?.name || itemData.name?.tr || itemData.id;
  const itemDesc = t.items?.[id]?.desc || itemData.description?.tr || "";

  let displayPrice = itemData.price;
  try {
    const livePrices = await getLivePricesMap();
    if (livePrices && livePrices[id] !== undefined) {
      displayPrice = livePrices[id];
    }
  } catch (_) {
    /* fallback to menuData price */
  }

  return (
    <main className="min-h-screen bg-[#DCE8E6]">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 pt-10">
        <Link
          href={`/menu#${categoryData?.id || ""}`}
          className="inline-flex items-center gap-2 text-[#0E4F4A] font-extrabold mb-6 hover:text-[#0B2B3B] transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Menüye Dön</span>
        </Link>

        <div className="bg-[#F4F1E8] rounded-2xl shadow-lg overflow-hidden border border-[#B8DCD3] flex flex-col md:flex-row">
          {itemData.image ? (
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-white">
              <Image
                src={itemData.image}
                alt={itemName}
                fill
                style={{ objectFit: "contain", padding: "1rem" }}
                priority
              />
            </div>
          ) : (
            <div className="w-full md:w-2/5 min-h-[220px] bg-gradient-to-br from-[#0B2B3B] to-[#0E4F4A] flex flex-col items-center justify-center p-6 text-[#F4F1E8]">
              <CategoryIcon id={categoryData?.id || "izgaralar"} size={48} className="text-[#F4F1E8] mb-2" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#B8DCD3]">
                Ulaş Balıkçılık • Görsel Alanı
              </span>
            </div>
          )}

          <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1
                className="text-2xl sm:text-3xl font-black text-[#0B2B3B] leading-tight"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {itemName}
              </h1>
              <span
                className="shrink-0 text-xl font-black text-[#0B2B3B] bg-[#CFE3DF] px-3.5 py-1 rounded-xl border border-[#B8DCD3]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {displayPrice != null ? `${displayPrice} ₺` : "— ₺"}
              </span>
            </div>

            {itemDesc && (
              <p className="text-[#47626B] text-base leading-relaxed mb-4">{itemDesc}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
