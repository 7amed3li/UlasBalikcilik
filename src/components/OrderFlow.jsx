"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { useMounted } from "../hooks/useMounted";
import Image from "next/image";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  PhoneCall,
  Info,
  Sparkles,
  Utensils,
} from "lucide-react";
import { ULAS_CONFIG } from "../data/ulasConfig";
import { CategoryIcon, FishLineArt } from "./BrandIcons";

export default function OrderFlow() {
  const {
    t,
    menuT,
    lang,
    cart,
    cartCount,
    cartTotal,
    cartPulse,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    convertPrice,
    getCurrencySymbol,
    getLivePrice,
    pricesLoading,
  } = useAppContext();

  const symbol = getCurrencySymbol();
  const labels = t.orderFlow || {};
  const isRTL = lang === "ar" || lang === "fa";

  const waiterText =
    t.showWaiter ||
    (lang === "ar"
      ? "اعرض هذه السلة للنادل على الطاولة أو اتصل بالفرع للطلب"
      : lang === "tr"
      ? "Siparişinizi vermek için bu sepeti garsona gösterin veya şubeyi arayın"
      : "Show this basket to the waiter at your table or call the branch");

  const listTitle =
    lang === "ar"
      ? "سلتي"
      : lang === "tr"
      ? "Sepetim / Listem"
      : t.myList || "My Basket";

  const isMounted = useMounted();
  if (!isMounted) return null;

  const cihangirBranch = ULAS_CONFIG.branches.cihangir;
  const maslakBranch = ULAS_CONFIG.branches.maslak;

  return (
    <>
      {/* ═══════════════════════════════════════════
          FLOATING BASKET PILL (Sepetim / سلتي)
          Positioned above the fixed bottom wave ribbon (`bottom-16`)
          Shows item count badge + live total price right on the pill!
          ═══════════════════════════════════════════ */}
      {cartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-16 ${
            isRTL ? "left-4 sm:left-6" : "right-4 sm:right-6"
          } z-[99990] flex items-center gap-3 bg-gradient-to-r from-[#0B2B3B] via-[#0E4F4A] to-[#0B2B3B] text-white ps-3.5 pe-4 py-2.5 rounded-2xl shadow-[0_10px_28px_rgba(7,29,43,0.45)] hover:scale-103 active:scale-95 transition-all duration-200 border-2 border-[#B8DCD3] cursor-pointer group ${
            cartPulse ? "animate-bounce" : ""
          }`}
          aria-label={listTitle}
        >
          {/* Coral Icon Box with Count Badge */}
          <div className="relative w-10 h-10 rounded-xl bg-[#D93829] flex items-center justify-center text-white shadow-xs shrink-0 group-hover:bg-[#F26B45] transition-colors">
            <ShoppingBag size={19} />
            <span className="absolute -top-1.5 -end-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#F4F1E8] text-[#0B2B3B] text-[11px] font-black flex items-center justify-center border border-[#0B2B3B] shadow-2xs">
              {cartCount}
            </span>
          </div>

          {/* Label + Live Total */}
          <div className="flex flex-col items-start text-start leading-tight">
            <span
              className="font-extrabold text-xs sm:text-[13px] text-[#F4F1E8] tracking-wide"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {listTitle}
            </span>
            {cartTotal != null && (
              <span
                className="text-xs sm:text-sm font-black text-[#B8DCD3]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {convertPrice(cartTotal)} {symbol}
              </span>
            )}
          </div>
        </button>
      )}

      {/* ═══════════════════════════════════════════
          BASKET DRAWER (Bottom Sheet on Mobile / Side Drawer on Desktop)
          ═══════════════════════════════════════════ */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[99998] flex items-end sm:items-stretch sm:justify-end bg-[#071D2B]/80 backdrop-blur-sm modal-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="bg-[#DCE8E6] w-full sm:max-w-md sm:h-full max-h-[90vh] sm:max-h-full rounded-t-3xl sm:rounded-none overflow-hidden flex flex-col shadow-2xl relative border-t-2 sm:border-t-0 sm:border-s-2 border-[#B8DCD3]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Coastal Navy Drawer Header */}
            <div className="relative bg-gradient-to-r from-[#071D2B] via-[#0B2B3B] to-[#0E4F4A] text-white px-5 py-4 shrink-0 flex items-center justify-between border-b border-[#B8DCD3]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D93829] flex items-center justify-center text-white shadow-sm">
                  <ShoppingBag size={20} />
                </div>
                <div className="text-start">
                  <h2
                    className="text-lg font-black text-white leading-none"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    {listTitle} ({cartCount})
                  </h2>
                  <span className="text-[11px] font-bold text-[#B8DCD3] mt-1 block">
                    Ulaş Balıkçılık • Cihangir &amp; Maslak 1453
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close basket"
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-[#D93829] hover:border-[#D93829] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Waiter / Table Order Banner */}
            <div className="bg-[#F4F1E8] border-b border-[#B8DCD3] px-4 py-2.5 flex items-center justify-center gap-2 text-center shrink-0">
              <Sparkles size={14} className="text-[#0E4F4A] shrink-0" />
              <p
                className="font-extrabold text-xs text-[#0B2B3B] leading-snug"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {waiterText}
              </p>
            </div>

            {/* Basket Items List */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 sm:px-4 py-3.5 space-y-2.5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-[#F4F1E8] rounded-2xl border border-[#B8DCD3] p-6">
                  <div className="w-16 h-16 rounded-full bg-[#DCECE7] border border-[#B8DCD3] flex items-center justify-center mb-3">
                    <Utensils size={26} className="text-[#0E4F4A]" />
                  </div>
                  <p className="text-[#0B2B3B] font-extrabold text-sm mb-1">
                    {labels.empty || (lang === "ar" ? "سلتك فارغة حالياً" : "Sepetiniz şu an boş")}
                  </p>
                  <p className="text-xs text-[#47626B]">
                    {lang === "ar"
                      ? "أضف أطباقك المفضلة من القائمة باستخدام زر (+)"
                      : "Menüden (+) butonuna dokunarak lezzetleri ekleyebilirsiniz."}
                  </p>
                </div>
              ) : (
                cart.map((item) => {
                  const name =
                    menuT?.items?.[item.id]?.name ||
                    item?.name?.[lang] ||
                    item?.name?.tr ||
                    item.id;
                  const price = getLivePrice(item);
                  const itemSubtotal = price !== null ? price * item.qty : null;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-[#F4F1E8] border border-[#B8DCD3] shadow-2xs hover:border-[#0E4F4A]/50 transition-colors"
                    >
                      {/* Ceramic Plate / Dish Thumbnail */}
                      {item.image ? (
                        <div className="w-13 h-13 rounded-xl overflow-hidden shrink-0 relative bg-white border border-[#B8DCD3]">
                          <Image
                            src={item.image}
                            alt={name}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="52px"
                          />
                        </div>
                      ) : (
                        <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#0B2B3B] to-[#0E4F4A] border border-[#B8DCD3] flex flex-col items-center justify-center shrink-0 text-[#F4F1E8]">
                          <CategoryIcon
                            id={item.category || "izgaralar"}
                            size={22}
                            className="text-[#F4F1E8]"
                          />
                        </div>
                      )}

                      {/* Dish Name & Sea-Glass Price Pill */}
                      <div className="flex-1 min-w-0 text-start">
                        <p
                          className="text-sm font-black text-[#0B2B3B] truncate"
                          style={{ fontFamily: "var(--font-cairo)" }}
                        >
                          {name}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          {pricesLoading && itemSubtotal == null ? (
                            <span className="text-[11px] text-[#0E4F4A] animate-pulse">...</span>
                          ) : itemSubtotal == null ? (
                            <span className="inline-flex px-2 py-0.5 rounded-md bg-[#CFE3DF] text-[#0B2B3B] text-[11px] font-black">
                              — {symbol}
                            </span>
                          ) : (
                            <span
                              className="inline-flex px-2.5 py-0.5 rounded-md bg-[#CFE3DF] text-[#0B2B3B] text-xs font-black"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {convertPrice(itemSubtotal)} {symbol}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper (`- qty +`) */}
                      <div className="flex items-center gap-1.5 shrink-0 bg-white rounded-xl p-1 border border-[#B8DCD3] shadow-2xs">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-lg bg-[#F4F1E8] flex items-center justify-center text-[#18323B] hover:bg-[#D93829] hover:text-white transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          {item.qty === 1 ? <Trash2 size={13} /> : <Minus size={13} />}
                        </button>
                        <span className="w-5 text-center text-xs font-black text-[#0B2B3B]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-7 h-7 rounded-lg bg-[#D93829] flex items-center justify-center text-white hover:bg-[#B82D20] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Basket Footer — Total Summary & Branch Order Actions */}
            {cart.length > 0 && (
              <div className="px-4 py-4 border-t border-[#B8DCD3] bg-[#F4F1E8] space-y-2.5 shrink-0">
                {/* Estimated Total Box */}
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#CFE3DF] border border-[#9BCAC3]">
                  <span className="text-xs sm:text-sm font-extrabold text-[#0B2B3B]">
                    {t.estimatedTotal || labels.total || "Tahmini Toplam:"}
                  </span>
                  <span
                    className="text-base sm:text-lg font-black text-[#0B2B3B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {cartTotal != null ? (
                      <>
                        {convertPrice(cartTotal)} {symbol}
                      </>
                    ) : (
                      `— ${symbol}`
                    )}
                  </span>
                </div>

                {/* Maslak 1453 Confirmed Phone Call Button */}
                <a
                  href={maslakBranch.phoneHref}
                  className="w-full py-3 px-4 rounded-xl bg-[#D93829] hover:bg-[#B82D20] text-white font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-between transition-colors shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <PhoneCall size={16} />
                    <span>Maslak 1453 Şube Sipariş</span>
                  </span>
                  <span className="font-mono text-xs bg-white/20 px-2.5 py-0.5 rounded-lg font-bold">
                    {maslakBranch.confirmedPhone}
                  </span>
                </a>

                {/* Cihangir Branch Phone Status */}
                {cihangirBranch.phoneHref ? (
                  <a
                    href={cihangirBranch.phoneHref}
                    className="w-full py-3 px-4 rounded-xl bg-[#0E4F4A] hover:bg-[#0B2B3B] text-white font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-between transition-colors shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <PhoneCall size={16} />
                      <span>Cihangir Şube Sipariş</span>
                    </span>
                    <span className="font-mono text-xs bg-white/20 px-2.5 py-0.5 rounded-lg font-bold">
                      {cihangirBranch.confirmedPhone}
                    </span>
                  </a>
                ) : (
                  <div className="p-2.5 rounded-xl bg-white border border-dashed border-[#0E4F4A]/40 text-[11px] text-[#47626B] flex items-start gap-2 text-start">
                    <Info size={14} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <span className="font-bold text-[#0B2B3B] block">
                        {lang === "ar"
                          ? "فرع جيهانغير (بانتظار تأكيد الرقم النهائي):"
                          : lang === "tr"
                          ? "Cihangir Şube (Numara Teyit Bekliyor):"
                          : "Cihangir Branch (Phone Pending Confirmation):"}
                      </span>
                      <span>
                        Google: {cihangirBranch.unconfirmedPhones.googleAndDelivery} • Instagram:{" "}
                        {cihangirBranch.unconfirmedPhones.instagramBio}
                      </span>
                    </div>
                  </div>
                )}

                {/* Clear Basket Action */}
                <div className="flex items-center justify-between pt-1 px-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#47626B]">
                    <FishLineArt className="w-5 h-2.5 text-[#0E4F4A]" />
                    <span>Ulaş Balıkçılık</span>
                  </div>
                  <button
                    onClick={clearCart}
                    className="inline-flex items-center gap-1 text-xs text-[#D93829] font-extrabold hover:underline cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>{labels.clear || "Sepeti Temizle"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
