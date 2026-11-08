"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useMounted } from "../hooks/useMounted";
import { X, MagnifyingGlassPlus, Plus, Minus } from "@phosphor-icons/react";
import { useAppContext } from "../context/AppContext";
import { trackViewItem } from "@/lib/analytics";
import { CategoryIcon, FishLineArt } from "./BrandIcons";

function CartCounter({ item, compact = false }) {
  const { addToCart, removeFromCart, getItemQuantity, t } = useAppContext();
  const qty = getItemQuantity(item.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFromCart(item.id);
  };

  if (qty === 0) {
    return (
      <button
        onClick={handleAdd}
        aria-label="Add to cart"
        className={`flex items-center justify-center gap-1.5 rounded-xl bg-[#F26B45] hover:bg-[#D95632] text-white transition-all duration-200 hover:scale-102 active:scale-95 shadow-sm cursor-pointer ${
          compact ? "w-8 h-8" : "px-5 py-2.5 w-full max-w-[220px]"
        }`}
      >
        <Plus size={compact ? 16 : 20} weight="bold" />
        {!compact && (
          <span className="text-sm font-bold tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
            {t?.addToCart || "Listeme Ekle"}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-[#0E4F4A]/30 bg-[#DCECE7] ${
        compact ? "gap-1 px-1 py-0.5" : "gap-4 px-4 py-2 w-full max-w-[220px]"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleRemove}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-lg bg-white text-[#18323B] hover:text-[#F26B45] transition-colors cursor-pointer ${
          compact ? "w-6 h-6" : "w-9 h-9"
        }`}
      >
        <Minus size={14} weight="bold" />
      </button>
      <span
        key={qty}
        className={`text-center font-extrabold text-[#0B2B3B] ${
          compact ? "w-5 text-xs" : "w-8 text-lg"
        }`}
      >
        {qty}
      </span>
      <button
        onClick={handleAdd}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-lg bg-[#0E4F4A] text-white hover:bg-[#0B2B3B] transition-colors cursor-pointer ${
          compact ? "w-6 h-6" : "w-9 h-9"
        }`}
      >
        <Plus size={compact ? 12 : 16} weight="bold" />
      </button>
    </div>
  );
}

export default function DishModal({
  isOpen,
  setIsOpen,
  item,
  customName,
  customDesc,
  customPrice,
  customImage,
  customTags,
  hideCart = false,
}) {
  const { menuT, t, convertPrice, getLivePrice, getCurrencySymbol, lang, pricesLoading } =
    useAppContext();
  const isRTL = lang === "ar" || lang === "fa";
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted && isOpen && item) {
      const priceVal = customPrice !== undefined ? customPrice : getLivePrice(item);
      const itemName =
        customName || menuT?.items?.[item.id]?.name || item?.name?.tr || "Balık Ürünü";
      trackViewItem({
        id: item.id,
        name: itemName,
        category: item.categoryId || "Menu",
        price: priceVal || 0,
      });
    }
  }, [isMounted, isOpen, item, customName, customPrice, getLivePrice, menuT]);

  if (!isMounted || !isOpen) return null;

  const name =
    customName ||
    (item
      ? menuT?.items?.[item.id]?.name || item?.name?.[lang] || item?.name?.tr || item?.name?.en
      : "Özel Seçim");
  const description =
    customDesc ||
    (item
      ? menuT?.items?.[item.id]?.desc ||
        item?.description?.[lang] ||
        item?.description?.tr ||
        item?.description?.en
      : "");
  const price = customPrice !== undefined ? customPrice : item ? getLivePrice(item) : null;
  const displayPrice =
    price !== null ? (convertPrice ? convertPrice(price) : price) : null;
  const symbol = getCurrencySymbol ? getCurrencySymbol() : "₺";
  const image = customImage || (item ? item.image : null);
  const baseTags = customTags || (item ? item.tags : []) || [];
  const tags = Array.isArray(baseTags) ? [...baseTags] : [];
  if (item?.badgeKey && !tags.includes(item.badgeKey)) tags.push(item.badgeKey);
  if (item?.trending && !tags.includes("trending")) tags.push("trending");

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: name,
    image: image ? `https://www.ulasbalik.com${image}` : undefined,
    description: description || name,
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: price || 0,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Ulaş Balıkçılık",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0B2B3B]/80 backdrop-blur-sm p-4 modal-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="bg-[#F4F1E8] rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative modal-content border border-[#B8DCD3] text-start"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className={`absolute top-4 ${
                isRTL ? "start-4" : "end-4"
              } z-50 w-9 h-9 flex items-center justify-center rounded-xl bg-white/90 text-[#18323B] hover:text-[#F26B45] transition-colors border border-[#B8DCD3] cursor-pointer`}
            >
              <X size={18} weight="bold" />
            </button>

            {/* Modal Visual */}
            {image ? (
              <div className="w-full h-56 sm:h-64 shrink-0 relative bg-white group">
                <Image
                  src={image}
                  alt={name}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <button
                  onClick={() => setIsFullscreenImage(true)}
                  aria-label="View fullscreen image"
                  className={`absolute bottom-4 ${
                    isRTL ? "start-4" : "end-4"
                  } z-20 w-9 h-9 flex items-center justify-center rounded-xl bg-[#0B2B3B] text-white hover:bg-[#0E4F4A] transition-all shadow-md`}
                >
                  <MagnifyingGlassPlus size={16} weight="bold" />
                </button>
              </div>
            ) : (
              <div className="w-full h-44 shrink-0 relative bg-gradient-to-br from-[#0B2B3B] via-[#0E4F4A] to-[#14635C] flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-[#B8DCD3]/30 flex items-center justify-center text-[#F4F1E8] mb-2">
                  <CategoryIcon
                    id={item?.categoryId || "izgaralar"}
                    size={36}
                    className="text-[#F4F1E8]"
                  />
                </div>
                <div className="flex items-center gap-2 text-[#B8DCD3] text-xs font-bold uppercase tracking-widest">
                  <FishLineArt className="w-5 h-2.5 text-[#B8DCD3]" />
                  <span>Ulaş Balıkçılık</span>
                </div>
              </div>
            )}

            {/* Modal Details */}
            <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar flex flex-col gap-4 text-start">
              <div className="flex justify-between items-start gap-4">
                <h2
                  className="text-xl sm:text-2xl font-black text-[#0B2B3B] leading-tight text-start"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  {name}
                </h2>
                {displayPrice != null && (
                  <span
                    className="shrink-0 flex items-center gap-1 text-base sm:text-lg font-extrabold text-[#0E4F4A] bg-[#DCECE7] px-3 py-1 rounded-xl border border-[#B8DCD3]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {pricesLoading && displayPrice == null ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <>
                        {displayPrice} {symbol}
                      </>
                    )}
                  </span>
                )}
              </div>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.includes("signature") && (
                    <span className="px-2.5 py-0.5 bg-[#F26B45]/15 text-[#F26B45] border border-[#F26B45]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                      {t?.signature || "Şefin Seçimi"}
                    </span>
                  )}
                  {tags.includes("trending") && (
                    <span className="px-2.5 py-0.5 bg-[#0E4F4A]/15 text-[#0E4F4A] border border-[#0E4F4A]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                      {t?.trending || "En Çok Satan"}
                    </span>
                  )}
                  {tags.includes("spicy") && (
                    <span className="px-2.5 py-0.5 bg-[#D94E34]/15 text-[#D94E34] border border-[#D94E34]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                      {t?.spicy || "Acılı"}
                    </span>
                  )}
                  {tags.includes("vegetarian") && (
                    <span className="px-2.5 py-0.5 bg-[#0E4F4A]/15 text-[#0E4F4A] border border-[#0E4F4A]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                      {t?.vegetarian || "Vejetaryen"}
                    </span>
                  )}
                </div>
              )}

              {description && (
                <div className="mt-1 text-start" dir={isRTL ? "rtl" : "ltr"}>
                  <h4
                    className="text-xs font-extrabold text-[#0E4F4A] mb-1 uppercase tracking-widest text-start"
                    style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}
                  >
                    {t?.description || "Detaylar"}
                  </h4>
                  <p
                    className="text-[#47626B] leading-relaxed text-sm text-start"
                    style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}
                  >
                    {description}
                  </p>
                </div>
              )}

              {/* Modal Cart Action */}
              {!hideCart && item && (
                <div className="mt-2 flex items-center justify-center">
                  <CartCounter item={item} compact={false} />
                </div>
              )}

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="mt-1 w-full py-2.5 rounded-xl bg-white text-[#18323B] font-bold hover:bg-[#0B2B3B] hover:text-white transition-colors border border-[#B8DCD3] text-xs uppercase tracking-wider cursor-pointer"
              >
                {t?.close || "Kapat"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fullscreen Image Overlay */}
      {isFullscreenImage &&
        image &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setIsFullscreenImage(false)}
          >
            <button
              onClick={() => setIsFullscreenImage(false)}
              aria-label="Close fullscreen image"
              className="absolute top-6 end-6 z-[9999999] w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#0B2B3B] hover:bg-[#F26B45] hover:text-white transition-all shadow-lg"
            >
              <X size={28} weight="bold" />
            </button>

            <div
              className="relative w-full h-full max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={name}
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
                quality={100}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
