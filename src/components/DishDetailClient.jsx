"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { menuData } from "@/data/menuData";
import { ULAS_CONFIG } from "@/data/ulasConfig";
import { CategoryIcon } from "@/components/BrandIcons";
import FoodCard from "@/components/FoodCard";
import {
  TbChevronLeft as ChevronLeft,
  TbPlus as Plus,
  TbMinus as Minus,
  TbShoppingBag as ShoppingBag,
  TbPhone as Phone,
  TbMapPin as MapPin,
  TbToolsKitchen2 as Utensils,
  TbArrowRight as ArrowRight,
} from "react-icons/tb";
import { FaAward } from "react-icons/fa6";

export default function DishDetailClient({ itemId, livePrice }) {
  const { t, lang, convertPrice, getCurrencySymbol, cart, addToCart, removeFromCart, setIsCartOpen } =
    useAppContext();
  const prefix = lang === "tr" ? "" : `/${lang}`;
  const maslak = ULAS_CONFIG.branches.maslak;
  const cihangir = ULAS_CONFIG.branches.cihangir;
  const currencySymbol = getCurrencySymbol ? getCurrencySymbol() : "₺";
  const renderPrice = (price) =>
    price != null ? (
      <>
        {convertPrice ? convertPrice(price) : price} {currencySymbol}
      </>
    ) : (
      "— ₺"
    );

  const { itemData, categoryData, relatedItems } = React.useMemo(() => {
    let foundItem = null;
    let foundCat = null;
    for (const cat of menuData) {
      const match = cat.items.find((i) => i.id === itemId);
      if (match) {
        foundItem = match;
        foundCat = cat;
        break;
      }
    }
    const related = foundCat
      ? foundCat.items.filter((i) => i.id !== itemId).slice(0, 4)
      : [];
    return { itemData: foundItem, categoryData: foundCat, relatedItems: related };
  }, [itemId]);

  if (!itemData) {
    return (
      <div className="min-h-[60vh] bg-[#EBF4FA] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-black text-[#1E2D3D] mb-3">Ürün Bulunamadı</h1>
        <Link
          href={`${prefix}/menu`}
          className="px-5 py-2.5 rounded-xl bg-[#0077B6] text-white font-bold text-xs uppercase tracking-wider"
        >
          {t.backToMenu || "Menüye Dön"}
        </Link>
      </div>
    );
  }

  const effectivePrice = livePrice !== undefined && livePrice !== null ? livePrice : itemData.price;
  const itemWithLivePrice = { ...itemData, price: effectivePrice };

  const itemName =
    t.items?.[itemData.id]?.name ||
    itemData.name?.[lang] ||
    itemData.name?.tr ||
    itemData.id;
  const itemDesc =
    t.items?.[itemData.id]?.desc ||
    itemData.description?.[lang] ||
    itemData.description?.tr ||
    "";
  const categoryName =
    t.categories?.[categoryData?.id] ||
    categoryData?.category?.[lang] ||
    categoryData?.category?.tr ||
    "";

  const cartEntry = cart?.find((c) => c.id === itemData.id);
  const quantity = cartEntry ? cartEntry.qty || cartEntry.quantity || 0 : 0;

  return (
    <main className="min-h-screen bg-[#EBF4FA] text-[#1E2D3D] pt-7 pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-5 space-y-6">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`${prefix}/menu#${categoryData?.id || ""}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8FBFE] border border-[#C5E1F5] text-[#0077B6] font-extrabold text-xs hover:bg-white transition-colors shadow-2xs"
          >
            <ChevronLeft size={16} />
            <span>{t.backToMenu || "Menüye Dön"}</span>
          </Link>

          <span className="text-xs font-extrabold text-[#52667A] uppercase tracking-wider">
            Ulaş Balıkçılık • {categoryName}
          </span>
        </div>

        {/* Main Dish Card */}
        <section className="bg-[#F8FBFE] rounded-3xl shadow-md overflow-hidden border border-[#C5E1F5] flex flex-col md:flex-row">
          {/* Left Visual Panel */}
          {itemData.image ? (
            <div className="w-full md:w-2/5 min-h-[260px] relative bg-white border-b md:border-b-0 md:border-e border-[#C5E1F5] overflow-hidden">
              <Image
                src={itemData.image}
                alt={itemName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          ) : (
            <div className="w-full md:w-2/5 min-h-[240px] bg-gradient-to-br from-[#006BA6] via-[#0088CC] to-[#1AA3E8] flex flex-col items-center justify-center p-8 text-[#F8FBFE] relative overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-white/10 border border-[#38B6FF]/40 flex items-center justify-center mb-3 shadow-inner">
                <CategoryIcon
                  id={categoryData?.id || "izgaralar"}
                  size={48}
                  className="text-[#F8FBFE]"
                />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-[#C5E1F5]">
                {categoryName}
              </span>
              <span
                className="text-lg text-[#38B6FF] mt-1 -rotate-2"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Karadeniz&apos;in Bereketi
              </span>
            </div>
          )}

          {/* Right Details Panel */}
          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="px-3 py-0.5 rounded-full bg-[#0077B6] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  {categoryName}
                </span>
                {itemData.trending && (
                  <span className="px-3 py-0.5 rounded-full bg-[#0088CC] text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <FaAward size={11} />
                    <span>{t.trending || "Popüler Seçim"}</span>
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-4 mb-3">
                <h1
                  className="text-2xl sm:text-3xl font-black text-[#1E2D3D] leading-tight"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  {itemName}
                </h1>
                <span
                  className="shrink-0 text-xl sm:text-2xl font-black text-[#1E2D3D] bg-[#EBF4FA] px-4 py-1.5 rounded-2xl border border-[#38B6FF]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {renderPrice(effectivePrice)}
                </span>
              </div>

              {itemDesc && (
                <p className="text-[#52667A] text-sm sm:text-base leading-relaxed font-medium">
                  {itemDesc}
                </p>
              )}
            </div>

            {/* Interactive Basket Controls */}
            <div className="pt-4 border-t border-[#C5E1F5] flex flex-wrap items-center justify-between gap-3">
              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(itemWithLivePrice)}
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#0088CC] hover:bg-[#006DA3] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  <Plus size={18} strokeWidth={3} />
                  <span>{t.addToCart || "Sepete Ekle"}</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="inline-flex items-center gap-3 bg-white border-2 border-[#0077B6] rounded-2xl px-3 py-1.5">
                    <button
                      onClick={() => removeFromCart(itemData.id)}
                      className="w-8 h-8 rounded-xl bg-[#EBF4FA] text-[#1E2D3D] flex items-center justify-center font-black hover:bg-[#C5E1F5] transition-colors cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-base font-black text-[#1E2D3D] min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => addToCart(itemWithLivePrice)}
                      className="w-8 h-8 rounded-xl bg-[#0077B6] text-white flex items-center justify-center font-black hover:bg-[#1E2D3D] transition-colors cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="inline-flex items-center gap-2 py-3 px-5 rounded-2xl bg-[#1E2D3D] hover:bg-[#0077B6] text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                    <span>{lang === "ar" ? "عرض السلة" : "Sepeti Gör"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Branch Order Bar */}
        <section className="bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-[#0077B6] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <div className="font-black text-[#1E2D3D]">
                Ulaş Balıkçılık — Cihangir &amp; Maslak 1453
              </div>
              <div className="text-[#52667A]">
                {cihangir.address} • {maslak.address}
              </div>
            </div>
          </div>
          <a
            href={maslak.phoneHref}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077B6] hover:bg-[#1E2D3D] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            <Phone size={14} />
            <span>Maslak: {maslak.confirmedPhone}</span>
          </a>
        </section>

        {/* Related Items in the Same Category */}
        {relatedItems.length > 0 && (
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2
                className="text-lg sm:text-xl font-black text-[#1E2D3D] flex items-center gap-2"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                <Utensils size={18} className="text-[#0077B6]" />
                <span>
                  {lang === "ar"
                    ? `أصناف أخرى في قسم ${categoryName}`
                    : `${categoryName} Kategorisindeki Diğer Lezzetler`}
                </span>
              </h2>
              <Link
                href={`${prefix}/menu#${categoryData?.id || ""}`}
                className="text-xs font-extrabold text-[#0077B6] hover:underline inline-flex items-center gap-1"
              >
                <span>{lang === "ar" ? "عرض الكل" : "Tümünü Gör"}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {relatedItems.map((rel) => (
                <FoodCard key={rel.id} item={rel} categoryId={categoryData?.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

