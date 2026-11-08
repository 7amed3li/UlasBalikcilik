"use client";

import React from "react";
import Link from "next/link";
import { Utensils, Home, Phone, MapPin, Compass } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function NotFound() {
  const { lang } = useAppContext();
  const isRTL = lang === "ar" || lang === "fa";

  return (
    <div
      className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center bg-[#DCE8E6]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-lg mx-auto space-y-6 bg-[#F4F1E8] p-8 sm:p-10 rounded-2xl border border-[#B8DCD3] shadow-sm relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCECE7] border border-[#B8DCD3] text-[#0E4F4A] text-xs font-extrabold tracking-widest uppercase">
          <Compass size={14} />
          <span>404</span>
        </div>

        <div className="space-y-2 pt-1">
          <h1
            className="text-3xl sm:text-4xl font-black text-[#0B2B3B]"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {lang === "ar"
              ? "الصفحة غير موجودة"
              : lang === "tr"
              ? "Sayfa Bulunamadı"
              : "Page Not Found"}
          </h1>
          <p className="text-xs sm:text-sm text-[#47626B] leading-relaxed font-medium pt-1 max-w-md mx-auto">
            {lang === "ar"
              ? "يمكنك العودة مباشرة إلى قائمة طعام مطعم أولاش باليك (Ulaş Balıkçılık)."
              : lang === "tr"
              ? "Ulaş Balıkçılık dijital menüsüne hemen geri dönebilirsiniz."
              : "You can return directly to the Ulaş Balıkçılık digital menu."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0E4F4A] hover:bg-[#0B2B3B] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            <Utensils size={16} />
            <span>{lang === "ar" ? "قائمة الطعام" : lang === "tr" ? "Menüyü İncele" : "View Menu"}</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#DCECE7] border border-[#B8DCD3] text-[#0B2B3B] font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <Home size={16} />
            <span>{lang === "ar" ? "الرئيسية" : lang === "tr" ? "Ana Sayfa" : "Home"}</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#B8DCD3]/60 flex items-center justify-center gap-6 text-xs text-[#47626B] font-bold flex-wrap">
          <a
            href="tel:+902128135757"
            className="flex items-center gap-1.5 hover:text-[#0E4F4A] transition-colors"
          >
            <Phone size={14} className="text-[#D93829]" />
            <span>Maslak: 0212 813 57 57</span>
          </a>
          <span className="opacity-30">&bull;</span>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 hover:text-[#0E4F4A] transition-colors"
          >
            <MapPin size={14} className="text-[#0E4F4A]" />
            <span>Cihangir &amp; Maslak 1453</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
