"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { menuData } from "@/data/menuData";
import breakfastTranslations from "@/i18n/breakfastTranslations";
import { useAppContext } from "@/context/AppContext";
import {
  BREAKFAST_HOURS,
  BREAKFAST_DISH_IDS,
  RESTAURANT_INFO,
} from "@/data/breakfastConfig";
import { trackEvent, captureUTMParams } from "@/lib/trackingUtils";

// ─── Helper: get breakfast items from menuData ───

// Turkish dish names for authentic display
const TURKISH_DISH_NAMES = {
  serpme_kahvalti: "Serpme Kahvaltı (2 Kişilik)",
  menemen: "Menemen",
  omlet: "Omlet",
  sahanda_yumurta: "Sahanda Yumurta",
  sucuklu_yumurta: "Sucuklu Yumurta",
  kavurmali_yumurta: "Kavurmalı Yumurta",
  pacanga_boregi: "Paçanga Böreği",
};

function getBreakfastItems() {
  const kahvaltiCategory = menuData.find((cat) => cat.id === "kahvalti");
  if (!kahvaltiCategory) return { featured: null, dishes: [] };

  const featured = kahvaltiCategory.items.find(
    (item) => item.id === BREAKFAST_DISH_IDS.featured
  );
  const dishes = BREAKFAST_DISH_IDS.dishes
    .map((id) => kahvaltiCategory.items.find((item) => item.id === id))
    .filter(Boolean);

  return { featured, dishes };
}

export default function BreakfastLandingPage({ locale = "en" }) {
  const { convertPrice, getCurrencySymbol, getLivePrice } = useAppContext();
  const t = breakfastTranslations[locale] || breakfastTranslations.en;
  const isRTL = locale === "ar" || locale === "fa";
  const { featured, dishes } = getBreakfastItems();

  useEffect(() => {
    captureUTMParams();
    trackEvent("breakfast_page_view", {
      language: locale,
      page: "turkish-breakfast-cihangir",
    });
  }, [locale]);

  const handleTrack = (eventName, extra = {}) => {
    trackEvent(eventName, { language: locale, page_type: "breakfast", page_url: typeof window !== 'undefined' ? window.location.href : '', ...extra });
  };

  return (
    <article className="min-h-screen bg-[#EDE3CE] text-[#2B2620] font-sans selection:bg-[#9C7A3F] selection:text-[#EDE3CE]" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* ── 1. CINEMATIC BRIGHT HERO SECTION ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with soft elegant overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/Serpme-Kahvalti-2-Kisilik.webp" 
            alt="Traditional Turkish Breakfast" 
            fill 
            style={{ objectFit: 'cover' }}
            priority
            className="opacity-90"
          />
          <div className="absolute inset-0 bg-[#EDE3CE]/80 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE3CE]/90 via-[#EDE3CE]/70 to-[#EDE3CE]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 pt-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-[0.2em]">
            <span>{t.badgeText || "MORNING RITUAL"}</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#2B2620] leading-[1.1] tracking-tight uppercase"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.h1}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#2B2620]/70 font-medium leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {t.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href={`/${locale}/menu?category=kahvalti`}
              onClick={() => handleTrack("view_menu")}
              className="w-full sm:w-auto px-10 py-4 bg-[#2B2620] hover:bg-[#1A1814] text-[#EDE3CE] font-bold text-xs tracking-[0.15em] uppercase transition-colors"
            >
              {t.ctaViewMenu}
            </Link>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrack("get_directions")}
              className="w-full sm:w-auto px-10 py-4 border border-[#2B2620]/40 text-[#2B2620] hover:bg-[#2B2620]/5 font-bold text-xs tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Navigation size={16} />
              <span>{t.ctaDirections}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. BREAKFAST MENU GRID (MAGAZINE STYLE) ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2620] uppercase tracking-widest" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.breakfastDishesTitle}
          </h2>
          <div className="h-0.5 w-16 bg-[#9C7A3F] mx-auto"></div>
        </div>

        {featured && (
          <div className="mb-16 flex flex-col md:flex-row gap-12 items-center bg-[#F7F2E7] p-8 sm:p-12 border border-[#9C7A3F]/20">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black text-[#2B2620] uppercase" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.serpmeTitle}
              </h3>
              <p className="text-[#2B2620]/70 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {t.serpmeDesc}
              </p>
              <div className="text-2xl font-serif text-[#9C7A3F]">
                {getCurrencySymbol()}{convertPrice(getLivePrice(featured))}
              </div>
            </div>
            <div className="flex-1 w-full relative aspect-[4/3]">
              <Image 
                src={featured.image} 
                alt="Serpme Kahvaltı" 
                fill 
                style={{ objectFit: 'cover' }}
                className="rounded-sm shadow-md"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.slice(0, 6).map((dish) => (
            <div key={dish.id} className="group border-b border-[#9C7A3F]/20 pb-8 space-y-4">
              {dish.image && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={dish.image} 
                    alt={dish.id} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-bold text-[#2B2620] uppercase tracking-wider text-sm">
                  {TURKISH_DISH_NAMES[dish.id] || dish.id.replace(/_/g, ' ')}
                </h4>
                <span className="font-serif text-[#9C7A3F]">
                  {getCurrencySymbol()}{convertPrice(getLivePrice(dish))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. ELEGANT INFO STRIP ── */}
      <section className="border-t border-[#9C7A3F]/20 bg-[#F7F2E7] py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 flex flex-col items-center">
            <Clock size={32} className="text-[#9C7A3F]" strokeWidth={1.5} />
            <h3 className="font-bold text-[#2B2620] uppercase tracking-widest text-sm">{t.breakfastHoursTitle}</h3>
            <p className="text-xs text-[#2B2620]/60 leading-relaxed uppercase tracking-wider">
              {t.faq[2].a}
            </p>
          </div>
          <div className="space-y-4 flex flex-col items-center md:border-l md:border-r border-[#9C7A3F]/20 px-4">
            <MapPin size={32} className="text-[#9C7A3F]" strokeWidth={1.5} />
            <h3 className="font-bold text-[#2B2620] uppercase tracking-widest text-sm">{t.addressTitle}</h3>
            <p className="text-xs text-[#2B2620]/60 leading-relaxed uppercase tracking-wider mb-4">
              {t.fullAddress}
            </p>
            <a 
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B2620] hover:bg-[#1A1814] text-[#EDE3CE] font-bold text-[10px] tracking-[0.2em] uppercase transition-colors mt-2"
            >
              <Navigation size={14} />
              <span>{t.ctaDirections}</span>
            </a>
          </div>
          <div className="space-y-4 flex flex-col items-center">
            <Phone size={32} className="text-[#9C7A3F]" strokeWidth={1.5} />
            <h3 className="font-bold text-[#2B2620] uppercase tracking-widest text-sm">{t.contactLinkText}</h3>
            <p className="text-xs text-[#2B2620]/60 leading-relaxed uppercase tracking-wider mb-4">
              {t.walkInsWelcome}
            </p>
            <a 
              href="tel:+902122513696"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#2B2620]/30 hover:bg-[#2B2620]/5 text-[#2B2620] font-bold text-[10px] tracking-[0.2em] uppercase transition-colors mt-2"
            >
              <Phone size={14} />
              <span>+90 212 251 36 96</span>
            </a>
          </div>
        </div>
      </section>

    </article>
  );
}
