"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../context/AppContext";
import { useMounted } from "../hooks/useMounted";
import {
  X,
  MagnifyingGlassPlus,
  Plus,
  Minus,
  ShareNetwork,
  Check,
  CaretRight,
} from "@phosphor-icons/react";
import Image from "next/image";
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
        aria-label="Add to list"
        className={`flex items-center justify-center gap-1.5 rounded-xl bg-[#D93829] text-white hover:bg-[#B82D20] active:scale-95 transition-all shadow-sm cursor-pointer ${
          compact ? "w-9 h-9" : "px-5 py-2.5 w-full max-w-[220px] font-bold text-sm"
        }`}
      >
        <Plus size={compact ? 18 : 20} weight="bold" />
        {!compact && <span>{t?.addToCart || "Listeme Ekle"}</span>}
      </button>
    );
  }

  return (
    <div
      className="flex items-center min-h-[36px] rounded-xl border border-[#0E4F4A]/30 bg-[#DCECE7] px-1 py-0.5 gap-1 shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleRemove}
        aria-label="Decrease quantity"
        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#18323B] hover:text-[#D93829] transition-colors shadow-2xs cursor-pointer"
      >
        <Minus size={13} weight="bold" />
      </button>
      <span key={qty} className="text-center font-extrabold text-[#0B2B3B] w-5 text-xs">
        {qty}
      </span>
      <button
        onClick={handleAdd}
        aria-label="Increase quantity"
        className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#D93829] text-white hover:bg-[#B82D20] transition-colors shadow-2xs cursor-pointer"
      >
        <Plus size={13} weight="bold" />
      </button>
    </div>
  );
}

export default function FoodCard({ item, categoryId = "izgaralar", isVertical = false }) {
  const {
    menuT,
    t,
    convertPrice,
    getLivePrice,
    getCurrencySymbol,
    getItemQuantity,
    lang,
    pricesLoading,
  } = useAppContext();
  const isRTL = lang === "ar" || lang === "fa";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const isMounted = useMounted();
  const [isCopied, setIsCopied] = useState(false);

  const name =
    menuT?.items?.[item.id]?.name ||
    item?.name?.[lang] ||
    item?.name?.tr ||
    item?.name?.en ||
    "Balık Ürünü";
  const description =
    menuT?.items?.[item.id]?.desc ||
    item?.description?.[lang] ||
    item?.description?.tr ||
    item?.description?.en ||
    "";

  const rawPrice = getLivePrice(item);
  const displayPrice = rawPrice !== null ? convertPrice(rawPrice) : null;
  const symbol = getCurrencySymbol();
  const qty = getItemQuantity(item.id);

  const placeholderLabel =
    lang === "ar"
      ? "مكان الصورة"
      : lang === "tr"
      ? "Görsel Alanı"
      : "Photo Slot";

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    try {
      const baseUrl = window.location.origin;
      const dishUrl = lang === "tr" ? `/dish/${item.id}` : `/${lang}/dish/${item.id}`;
      await navigator.clipboard.writeText(`${baseUrl}${dishUrl}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <>
      {/* Card Layout matching `media_1794142386195_ac1f9251.jpg` */}
      <div
        id={item.id}
        dir={isRTL ? "rtl" : "ltr"}
        className={`group relative rounded-2xl bg-[#F4F1E8] border border-[#B8DCD3] shadow-sm hover:shadow-md hover:border-[#0E4F4A]/50 overflow-hidden transition-all duration-200 flex ${
          isVertical ? "flex-col" : "flex-row"
        } items-stretch ${isVertical ? "h-auto" : "min-h-[136px]"} text-start`}
      >
        {/* Left Dish Image / Ceramic Plate Slot */}
        <div
          className={`${
            isVertical ? "w-full aspect-[4/3]" : "w-[136px] sm:w-[162px] shrink-0"
          } relative overflow-hidden bg-gradient-to-br from-[#12384B] via-[#0B2B3B] to-[#0E4F4A] z-10 cursor-pointer flex flex-col items-center justify-center p-2.5`}
          onClick={() => setIsModalOpen(true)}
        >
          {item.image ? (
            <div className="absolute inset-0 bg-white group-hover:scale-105 transition-transform duration-500">
              <Image
                src={item.image}
                alt={name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 136px, 162px"
                priority={false}
              />
            </div>
          ) : (
            /* Ceramic Plate Illustration Slot matching Reference Concept */
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F4F1E8]/95 border-2 border-[#1E4E68] shadow-inner flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full border border-dashed border-[#0E4F4A]/40 flex flex-col items-center justify-center text-[#0B2B3B]">
                <CategoryIcon id={categoryId} size={32} className="text-[#0E4F4A]" />
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-[#47626B] mt-0.5">
                  {placeholderLabel}
                </span>
              </div>
              {/* Lemon & Herb Garnish Dots on Plate Rim */}
              <span className="absolute top-2 end-2 w-3.5 h-3.5 rounded-full bg-[#F5C242] border border-white shadow-2xs" />
              <span className="absolute top-1.5 start-3 w-2.5 h-2.5 rounded-full bg-[#2E7D32]/80" />
            </div>
          )}

          {/* Bottom-Left Tag Pill Over Image matching Reference Concept */}
          <div className="absolute bottom-2 start-2 z-20 flex flex-wrap gap-1 pointer-events-none">
            {item.tags?.includes("signature") ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white bg-[#0B2B3B]/90 backdrop-blur-xs rounded-full font-extrabold border border-white/15 shadow-xs">
                <span>★</span>
                <span>{t.signature || "ŞEFİN SEÇİMİ"}</span>
              </span>
            ) : item.tags?.includes("vegetarian") ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white bg-[#1E6B43]/90 backdrop-blur-xs rounded-full font-extrabold border border-white/15 shadow-xs">
                <span>🌿</span>
                <span>{t.vegetarian || "VEJETARYEN"}</span>
              </span>
            ) : item.tags?.includes("spicy") ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white bg-[#D93829]/90 backdrop-blur-xs rounded-full font-extrabold border border-white/15 shadow-xs">
                <span>🌶️</span>
                <span>{t.spicy || "ACILI"}</span>
              </span>
            ) : null}
          </div>
        </div>

        {/* Right Content Section matching `media_1794142386195_ac1f9251.jpg` */}
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="flex flex-col flex-grow p-3.5 sm:p-4 justify-between relative z-10 w-full min-w-0 bg-[#F4F1E8] text-start"
        >
          {/* Top Row: Sea-Glass Brush Price Pill on Left + Chevron on Right */}
          <div
            className="cursor-pointer flex-1 text-start flex flex-col"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              {/* Sea-Glass Brush Price Badge */}
              <span
                className="inline-flex items-center px-3 py-0.5 rounded-md bg-[#CFE3DF] text-[#0B2B3B] font-black text-xs sm:text-sm tracking-wide"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {pricesLoading && displayPrice == null ? (
                  <span className="animate-pulse">...</span>
                ) : displayPrice == null ? (
                  <span className="text-[#0B2B3B]">— {symbol}</span>
                ) : (
                  <>
                    {displayPrice} {symbol}
                  </>
                )}
              </span>

              {/* Top-Right Chevron */}
              <CaretRight
                size={15}
                weight="bold"
                className={`text-[#0B2B3B]/70 group-hover:text-[#0B2B3B] transition-transform ${
                  isRTL ? "-scale-x-100" : ""
                }`}
              />
            </div>

            {/* Dish Title */}
            <h3
              className="font-black text-base sm:text-[18px] text-[#0B2B3B] leading-snug group-hover:text-[#0E4F4A] transition-colors text-start"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {name}
            </h3>

            {/* Description + Add Button Row */}
            <div className="flex items-end justify-between gap-2 mt-1">
              <p
                className="text-xs text-[#47626B] line-clamp-2 leading-relaxed font-medium text-start flex-1"
                style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}
              >
                {description}
              </p>

              <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                <CartCounter item={item} compact={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Badge Overlay */}
        {qty > 0 && (
          <div className="absolute top-2 start-2 z-20 w-6 h-6 rounded-full bg-[#D93829] text-white text-xs font-extrabold flex items-center justify-center border-2 border-[#F4F1E8] shadow-xs pointer-events-none">
            {qty}
          </div>
        )}
      </div>

      {/* MODAL — Item Details + Cart Action */}
      {isMounted &&
        isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0B2B3B]/80 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              dir={isRTL ? "rtl" : "ltr"}
              className="bg-[#F4F1E8] rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative border border-[#B8DCD3] text-start"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Action Buttons: Share & Close */}
              <div className="absolute top-3.5 end-3.5 z-50 flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link to dish"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/90 text-[#18323B] hover:text-[#0E4F4A] transition-all border border-[#B8DCD3] shadow-xs cursor-pointer"
                >
                  {isCopied ? (
                    <Check size={16} weight="bold" className="text-[#0E4F4A]" />
                  ) : (
                    <ShareNetwork size={16} weight="bold" />
                  )}
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/90 text-[#18323B] hover:text-[#D93829] transition-all border border-[#B8DCD3] shadow-xs cursor-pointer"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Modal Header Visual */}
              {item.image ? (
                <div className="w-full h-56 sm:h-64 shrink-0 relative bg-white">
                  <Image
                    src={item.image}
                    alt={name}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <button
                    onClick={() => setIsFullscreenImage(true)}
                    aria-label="View fullscreen image"
                    className="absolute bottom-3 end-3 z-20 w-9 h-9 flex items-center justify-center rounded-xl bg-[#0B2B3B] text-white hover:bg-[#0E4F4A] transition-colors shadow-md"
                  >
                    <MagnifyingGlassPlus size={16} weight="bold" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-44 shrink-0 relative bg-gradient-to-br from-[#0B2B3B] via-[#0E4F4A] to-[#14635C] flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-[#B8DCD3]/30 flex items-center justify-center text-[#F4F1E8] mb-2">
                    <CategoryIcon id={categoryId} size={36} className="text-[#F4F1E8]" />
                  </div>
                  <div className="flex items-center gap-2 text-[#B8DCD3] text-xs font-bold uppercase tracking-widest">
                    <FishLineArt className="w-5 h-2.5 text-[#B8DCD3]" />
                    <span>Ulaş Balıkçılık • {placeholderLabel}</span>
                  </div>
                </div>
              )}

              {/* Modal Details */}
              <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
                <div className="flex justify-between items-start gap-3">
                  <h2
                    className="text-xl sm:text-2xl font-black text-[#0B2B3B] leading-tight"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    {name}
                  </h2>
                  <span
                    className="shrink-0 text-base sm:text-lg font-extrabold text-[#0B2B3B] bg-[#CFE3DF] px-3 py-1 rounded-xl border border-[#B8DCD3]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {displayPrice != null ? (
                      <>
                        {displayPrice} {symbol}
                      </>
                    ) : (
                      `— ${symbol}`
                    )}
                  </span>
                </div>

                {description && (
                  <div className="mt-1">
                    <h4 className="text-xs font-extrabold text-[#0E4F4A] mb-1 uppercase tracking-widest">
                      {t.description || "Detaylar"}
                    </h4>
                    <p
                      className="text-[#47626B] leading-relaxed text-sm"
                      style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}
                    >
                      {description}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-center">
                  <CartCounter item={item} compact={false} />
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="mt-1 w-full py-2.5 rounded-xl bg-white text-[#18323B] font-bold hover:bg-[#0B2B3B] hover:text-white transition-colors border border-[#B8DCD3] text-xs uppercase tracking-wider cursor-pointer"
                >
                  {t.close || "Kapat"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
