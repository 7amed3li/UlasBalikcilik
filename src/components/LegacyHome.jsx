"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { menuData } from "@/data/menuData";
import { ULAS_CONFIG } from "@/data/ulasConfig";
import FoodCard from "@/components/FoodCard";
import RestaurantMap from "@/components/RestaurantMap";
import { CategoryIcon, SeaWaves } from "@/components/BrandIcons";
import {
  TbMapPin as MapPin,
  TbPhone as Phone,
  TbClock as Clock,
  TbStarFilled as Star,
  TbToolsKitchen2 as Utensils,
  TbArrowRight as ArrowRight,
  TbAnchor as Anchor,
  TbInfoCircle as AlertCircle,
  TbPlus as Plus,
  TbCheck as Check,
  TbCompass as Compass,
} from "react-icons/tb";
import { PiFishSimpleDuotone } from "react-icons/pi";

const DAILY_CATCH_HIGHLIGHTS = [
  { id: "levrek_izgara", catId: "izgaralar", badgeTr: "Izgara", badgeAr: "مشوي", badgeEn: "Charcoal Grill" },
  { id: "cipura_izgara", catId: "izgaralar", badgeTr: "Izgara", badgeAr: "مشوي", badgeEn: "Charcoal Grill" },
  { id: "hamsi_tava", catId: "tavalar", badgeTr: "Karadeniz", badgeAr: "البحر الأسود", badgeEn: "Black Sea" },
  { id: "kalamar_tava", catId: "tavalar", badgeTr: "Çıtır", badgeAr: "مقرمش", badgeEn: "Crispy" },
  { id: "jumbo_karides", catId: "izgaralar", badgeTr: "Jumbo", badgeAr: "جامبو", badgeEn: "Jumbo" },
  { id: "hamsili_pilav", catId: "tavalar", badgeTr: "Karadeniz", badgeAr: "بالأرز", badgeEn: "Black Sea" },
  { id: "midye_dolma", catId: "mezeler", badgeTr: "Klasik", badgeAr: "محشي", badgeEn: "Classic" },
  { id: "balik_corbasi", catId: "corbalar", badgeTr: "Sıcak", badgeAr: "ساخن", badgeEn: "Chef Special" },
];

const FEATURED_DISH_IDS = [
  "levrek_izgara",
  "cipura_izgara",
  "hamsi_tava",
  "kalamar_tava",
  "fener_kavurma",
  "jumbo_karides",
  "midye_dolma",
  "kabak_tatlisi",
];

export default function Home() {
  const { t, lang, convertPrice, getCurrencySymbol, addToCart, cart } = useAppContext();
  const prefix = lang === "tr" ? "" : `/${lang}`;
  const cihangir = ULAS_CONFIG.branches.cihangir;
  const maslak = ULAS_CONFIG.branches.maslak;
  const currencySymbol = getCurrencySymbol ? getCurrencySymbol() : "₺";
  const renderPrice = (price) =>
    price != null ? (
      <>
        {convertPrice ? convertPrice(price) : price} {currencySymbol}
      </>
    ) : (
      "— ₺"
    );

  const allItemsMap = React.useMemo(() => {
    const map = new Map();
    menuData.forEach((cat) => {
      cat.items.forEach((item) => {
        map.set(item.id, { ...item, categoryId: cat.id });
      });
    });
    return map;
  }, []);

  const dailyCatchItems = React.useMemo(() => {
    return DAILY_CATCH_HIGHLIGHTS.map((h) => {
      const found = allItemsMap.get(h.id);
      return found ? { ...found, highlight: h } : null;
    }).filter(Boolean);
  }, [allItemsMap]);

  const featuredDishes = React.useMemo(() => {
    return FEATURED_DISH_IDS.map((id) => allItemsMap.get(id)).filter(Boolean);
  }, [allItemsMap]);

  const getCartQty = (id) => {
    const found = cart?.find((c) => c.id === id);
    return found ? found.qty || found.quantity || 0 : 0;
  };

  return (
    <div className="min-h-screen bg-[#F4F9FB] text-[#2E3B44] pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-5 pb-4 px-3 sm:px-5 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[#06384E] text-white border border-[#D6EBF5]/50 shadow-2xl">
          {/* Background Seafood Table Photography */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/ulas-balik-restaurant-hero.webp"
              alt="Ulaş Balıkçılık — Taze Deniz Ürünleri"
              fill
              priority
             
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="opacity-25 scale-105 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06384E]/95 via-[#06384E]/90 to-[#104760]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#104760]/90 via-transparent to-[#104760]/40" />
          </div>

          <div className="relative z-10 p-6 sm:p-9 lg:p-11 grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            {/* Left Column: Editorial Brand & CTAs */}
            <div className="lg:col-span-7 text-start">
              {/* Subtle Location Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/15 border border-white/30 text-white text-[11px] font-bold uppercase tracking-wider mb-4">
                <PiFishSimpleDuotone size={15} className="text-white shrink-0" />
                <span>{t.storyBadge || "Cihangir & Maslak 1453 • İstanbul"}</span>
              </div>

              <h1
                className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.08] mb-2"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                ULAŞ BALIKÇILIK
              </h1>

              <p
                className="text-xl sm:text-2xl text-[#E7F3F9] font-semibold mb-3"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                {lang === "ar"
                  ? "خيرات البحر الأسود الطازجة على مائدتنا يومياً"
                  : "Karadeniz'in Bereketi Soframızda"}
              </p>

              <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-xl leading-relaxed mb-6 font-medium">
                {t.subtitle ||
                  "Cihangir ve Maslak 1453 şubelerimizde günlük taze Karadeniz balıkları, kömürde ızgaralar, çıtır tavalar ve geleneksel deniz mezeleri."}
              </p>

              {/* Clean 2-Button Action Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-6">
                <Link
                  href={`${prefix}/menu`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#E7F3F9] text-[#0C96DF] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  <Utensils size={17} />
                  <span>{t.heroCta || "Menüyü Keşfet"}</span>
                  <ArrowRight size={15} />
                </Link>

                <div className="grid grid-cols-2 sm:flex items-center gap-2.5">
                  <Link
                    href={`${prefix}/contact`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-extrabold text-xs sm:text-sm transition-all"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    <MapPin size={16} className="text-white shrink-0" />
                    <span>{lang === "ar" ? "الفروع" : "Şubelerimiz"}</span>
                  </Link>

                  <a
                    href={maslak.phoneHref}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-[#104760] hover:bg-[#06384E] border border-white/30 text-white font-extrabold text-xs sm:text-sm transition-all"
                  >
                    <Phone size={15} className="text-[#0C96DF] shrink-0" />
                    <span className="truncate">{maslak.confirmedPhone}</span>
                  </a>
                </div>
              </div>

              {/* Clean Horizontal Trust Bar */}
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-[#EE7B3F]" />
                  <span className="font-black text-white">4.8</span>
                  <span className="text-white/85 font-medium">(558+ Google)</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-white">95+</span>
                  <span className="text-white/85 font-medium">
                    {lang === "ar" ? "صنف بحري طازج" : t.statsDishes || "Deniz Lezzeti"}
                  </span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-white" />
                  <span className="text-white/95 font-semibold">11:30 – 22:00</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Visual Plate Collage */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`${prefix}/menu/levrek_izgara`}
                  className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/30 shadow-lg bg-[#104760]"
                >
                  <Image
                    src="/images/ulas_photos/BA07-levrek-izgara.webp"
                    alt="Izgara Levrek"
                    fill
                   
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06384E]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 inset-x-3 flex items-end justify-between gap-1">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#D6EBF5]">
                        {lang === "ar" ? "مشوي على الفحم" : "Kömürde Izgara"}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white">
                        {lang === "ar" ? "قاروص مشوي" : "Izgara Levrek"}
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href={`${prefix}/menu/hamsi_tava`}
                  className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/30 shadow-lg bg-[#104760]"
                >
                  <Image
                    src="/images/ulas_photos/KL20-hamsi-tava.webp"
                    alt="Karadeniz Hamsi Tava"
                    fill
                   
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06384E]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 inset-x-3 flex items-end justify-between gap-1">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#D6EBF5]">
                        {lang === "ar" ? "البحر الأسود" : "Karadeniz"}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white">
                        {lang === "ar" ? "همسي مقلي مقرمش" : "Hamsi Tava"}
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href={`${prefix}/menu/kalamar_tava`}
                  className="group relative h-32 sm:h-36 rounded-2xl overflow-hidden border border-white/30 shadow-lg bg-[#104760] col-span-2"
                >
                  <Image
                    src="/images/ulas_photos/KL32-kalamar-tava.webp"
                    alt="Kalamar Tava & Mezeler"
                    fill
                   
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#06384E]/90 via-[#104760]/45 to-transparent" />
                  <div className="absolute inset-y-0 start-4 flex flex-col justify-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D6EBF5]">
                      {lang === "ar" ? "الأكثر طلباً" : "En Çok Tercih Edilen"}
                    </span>
                    <span className="text-sm sm:text-base font-black text-white">
                      {lang === "ar" ? "كاليماري مقرمش ومقبلات بحرية" : "Çıtır Kalamar Tava & Mezeler"}
                    </span>
                    <span className="text-[11px] font-bold text-white mt-0.5 flex items-center gap-1">
                      <span>{lang === "ar" ? "اطلب الآن" : "Detayları Gör"}</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GÜNÜN AVI (DAILY CATCH CIRCULAR PLATES SHOWCASE) */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 py-3">
        <div className="rounded-3xl bg-[#F4F9FB] border border-[#D6EBF5] p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <h2
                className="text-lg sm:text-xl font-black text-[#2E3B44] tracking-wider uppercase"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {lang === "ar"
                  ? "صيد اليوم المختار"
                  : lang === "en"
                  ? "CATCH OF THE DAY"
                  : "GÜNÜN AVI"}
              </h2>
              <svg viewBox="0 0 80 12" className="w-14 h-3 text-[#EE7B3F]" aria-hidden="true">
                <path
                  d="M2 9 C22 2, 52 2, 78 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <Link
              href={`${prefix}/menu`}
              className="text-xs font-extrabold text-[#0C96DF] hover:text-[#0C96DF] flex items-center gap-1 transition-colors"
            >
              <span>{t.allMenuCta || "Tüm Menüyü İnceleyin"}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-1">
            {dailyCatchItems.map((item) => {
              const name = item.name[lang] || item.name.tr;
              const qty = getCartQty(item.id);
              const badge =
                lang === "ar"
                  ? item.highlight.badgeAr
                  : lang === "en"
                  ? item.highlight.badgeEn
                  : item.highlight.badgeTr;

              return (
                <div
                  key={item.id}
                  className="shrink-0 w-[148px] sm:w-[172px] bg-white/80 hover:bg-white rounded-2xl p-3 border border-[#D6EBF5] shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between group"
                >
                  <Link href={`${prefix}/dish/${item.id}`} className="w-full flex flex-col items-center">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white border border-[#D6EBF5] shadow-md mb-2.5 flex items-center justify-center group-hover:border-[#0C96DF] transition-all">
                      <div className="w-full h-full rounded-full bg-[#06384E] border border-[#E7F3F9] flex flex-col items-center justify-center relative overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={name}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="96px"
                            className="transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <>
                            <CategoryIcon
                              id={item.categoryId}
                              size={30}
                              className="text-[#F4F9FB] drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="mt-0.5 text-[8px] font-bold tracking-wider uppercase text-[#0C96DF]">
                              {badge}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <h3
                      className="text-xs sm:text-sm font-black text-[#2E3B44] line-clamp-1 mb-1 group-hover:text-[#0C96DF]"
                      style={{ fontFamily: "var(--font-cairo)" }}
                    >
                      {name}
                    </h3>
                  </Link>

                  <div className="w-full flex items-center justify-between gap-1.5 mt-1.5 pt-2 border-t border-[#E7F3F9]">
                    <span
                      className="text-xs sm:text-sm font-black text-[#D15015]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {renderPrice(item.price)}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      aria-label={name}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs transition-transform active:scale-90 cursor-pointer ${
                        qty > 0
                          ? "bg-[#0C96DF] hover:bg-[#06384E]"
                          : "bg-[#0C96DF] hover:bg-[#104760]"
                      }`}
                    >
                      {qty > 0 ? <Check size={14} strokeWidth={3} /> : <Plus size={15} strokeWidth={3} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ALL 8 MENU CATEGORIES SHOWCASE */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 py-4">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2
              className="text-xl sm:text-2xl font-black text-[#2E3B44]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {lang === "ar" ? "أقسام القائمة البحرية" : "Menü Kategorilerimiz"}
            </h2>
            <p className="text-xs text-[#53636E] font-medium">
              {lang === "ar"
                ? "اختر القسم لتصفح الأصناف الطازجة والأسعار"
                : "8 ana kategoride 81 çeşit günlük taze deniz lezzeti"}
            </p>
          </div>
          <Link
            href={`${prefix}/menu`}
            className="px-3.5 py-2 rounded-xl bg-[#0C96DF] text-white text-xs font-extrabold hover:bg-[#06384E] transition-colors inline-flex items-center gap-1.5"
          >
            <span>{lang === "ar" ? "فتح المنيو الكامل" : "Tam Menü"}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {menuData.map((cat) => {
            const title = cat.category[lang] || cat.category.tr;
            const desc = cat.description?.[lang] || cat.description?.tr || "";
            return (
              <Link
                key={cat.id}
                href={`${prefix}/menu#${cat.id}`}
                className="group bg-[#F4F9FB] hover:bg-white border border-[#D6EBF5] hover:border-[#0C96DF] rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#06384E] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <CategoryIcon id={cat.id} size={24} className="text-white" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E7F3F9] text-[#0C96DF] text-[11px] font-black">
                      {cat.items.length} {lang === "ar" ? "صنف" : "çeşit"}
                    </span>
                  </div>

                  <h3
                    className="text-base font-black text-[#2E3B44] group-hover:text-[#0C96DF] mb-1"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[11px] text-[#53636E] line-clamp-2 leading-relaxed font-medium">
                    {desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E7F3F9] flex items-center justify-between text-[11px] font-extrabold text-[#0C96DF]">
                  <span>{lang === "ar" ? "استكشف القسم" : "Kategoriyi Aç"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED DISHES SECTION (WITH DIRECT BASKET ADD) */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 py-4">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2
              className="text-xl sm:text-2xl font-black text-[#2E3B44]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.signatureDishes || "Özel Seçimlerimiz"}
            </h2>
            <p className="text-xs text-[#53636E] font-medium">
              {lang === "ar"
                ? "أشهر أطباق Ulaş Balıkçılık المفضلة لدى ضيوفنا"
                : "Misafirlerimizin en çok tercih ettiği balık ve deniz ürünleri"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
          {featuredDishes.map((dish) => (
            <FoodCard key={dish.id} item={dish} categoryId={dish.categoryId} />
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link
            href={`${prefix}/menu`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0C96DF] hover:bg-[#104760] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            <Utensils size={16} className="text-[#0C96DF]" />
            <span>
              {lang === "ar"
                ? "عرض القائمة الكاملة (81 صنف)"
                : "Tüm Menüyü Görüntüle (81 Çeşit)"}
            </span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5. THREE CULINARY PILLARS & OUR STORY */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 py-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0C96DF]/10 text-[#0C96DF] text-[10px] font-extrabold uppercase tracking-wider mb-2">
              {t.adanaBadge || "Karadeniz & Marmara"}
            </span>
            <h3
              className="text-lg font-black text-[#2E3B44] mb-1.5"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.adanaTitle || "Günlük Tava & Izgara Balıklar"}
            </h3>
            <p className="text-xs sm:text-sm text-[#53636E] leading-relaxed font-medium">
              {t.adanaDesc}
            </p>
          </div>

          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0C96DF]/10 text-[#0C96DF] text-[10px] font-extrabold uppercase tracking-wider mb-2">
              {t.pideBadge || "Soğuk & Sıcak Başlangıçlar"}
            </span>
            <h3
              className="text-lg font-black text-[#2E3B44] mb-1.5"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.pideTitle || "Zengin Deniz Mezeleri"}
            </h3>
            <p className="text-xs sm:text-sm text-[#53636E] leading-relaxed font-medium">
              {t.pideDesc}
            </p>
          </div>

          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0C96DF]/10 text-[#0C96DF] text-[10px] font-extrabold uppercase tracking-wider mb-2">
              {t.breakfastBadge || "Klasik Final"}
            </span>
            <h3
              className="text-lg font-black text-[#2E3B44] mb-1.5"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.breakfastTitle || "Kabak Tatlısı & Sıcak Helva"}
            </h3>
            <p className="text-xs sm:text-sm text-[#53636E] leading-relaxed font-medium">
              {t.breakfastDesc}
            </p>
          </div>
        </div>

        {/* Story Banner with Official Restaurant Photo */}
        <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-64 h-44 sm:h-48 shrink-0 rounded-2xl overflow-hidden border border-[#D6EBF5] shadow-sm">
            <Image
              src="/images/ulas-balik-restaurant-hero.webp"
              alt="Ulaş Balıkçılık"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </div>

          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0C96DF] uppercase tracking-wider">
              <PiFishSimpleDuotone size={16} />
              <span>{t.about || "Hakkımızda"}</span>
            </div>
            <h2
              className="text-xl sm:text-2xl font-black text-[#2E3B44]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.ourStoryTitle || "Ulaş Balıkçılık Lezzet Geleneği"}
            </h2>
            <p className="text-xs sm:text-sm text-[#53636E] leading-relaxed font-medium">
              {t.ourStoryDesc}
            </p>
          </div>

          <Link
            href={`${prefix}/about`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#06384E] hover:bg-[#0C96DF] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            <span>{t.learnMoreAboutUs || "Hakkımızda Detaylı Bilgi"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 6. TWO BRANCHES & INTERACTIVE MAP SECTION */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-xl sm:text-2xl font-black text-[#2E3B44]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.locationTitle || "Şubelerimiz & İletişim"}
            </h2>
            <p className="text-xs text-[#53636E] font-medium">
              {t.locationSubtitle || "Cihangir (Beyoğlu) & Maslak 1453 (Sarıyer)"}
            </p>
          </div>
          <Link
            href={`${prefix}/contact`}
            className="text-xs font-extrabold text-[#0C96DF] hover:underline flex items-center gap-1"
          >
            <span>{t.contactPageBtn || "İletişim Sayfası"}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cihangir Branch */}
          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0C96DF] text-white text-xs font-extrabold">
                  {cihangir.name[lang] || cihangir.name.tr}
                </span>
                <span className="text-xs font-extrabold text-[#0C96DF] inline-flex items-center gap-1">
                  <Star size={12} className="fill-[#EE7B3F] text-[#EE7B3F]" />
                  <span>{cihangir.rating} ({cihangir.reviewsCount})</span>
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#53636E]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <span>{cihangir.address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <span>{cihangir.hours[lang] || cihangir.hours.tr}</span>
                </div>
                {!cihangir.phoneHref && (
                  <div className="p-2.5 rounded-xl bg-white border border-dashed border-[#90C6DF]/40 text-[11px] flex items-start gap-2">
                    <AlertCircle size={14} className="text-[#0C96DF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#2E3B44] block">Telefon Teyit Bekliyor:</strong>
                      <span>Google: 0212 434 25 02 • Instagram: 0212 434 23 02</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <a
              href={cihangir.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0C96DF] hover:bg-[#06384E] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              <Compass size={15} />
              <span>{t.directions || "Yol Tarifi Al"}</span>
            </a>
          </div>

          {/* Maslak 1453 Branch */}
          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0C96DF] text-white text-xs font-extrabold">
                  {maslak.name[lang] || maslak.name.tr}
                </span>
                <span className="text-xs font-bold text-[#53636E]">Sarıyer / İstanbul</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#53636E]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <div>
                    <div>{maslak.address}</div>
                    <div className="text-[11px] text-[#53636E]/80">
                      ({maslak.addressNote[lang] || maslak.addressNote.tr})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#0C96DF] shrink-0" />
                  <a
                    href={maslak.phoneHref}
                    className="font-black text-[#2E3B44] hover:text-[#0C96DF]"
                  >
                    {maslak.confirmedPhone}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <span>{maslak.hoursNote[lang] || maslak.hoursNote.tr}</span>
                </div>
              </div>
            </div>

            <a
              href={maslak.phoneHref}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0C96DF] hover:bg-[#104760] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              <Phone size={15} />
              <span>
                {t.callNow || "Hemen Ara"} ({maslak.confirmedPhone})
              </span>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-4 sm:p-5 shadow-xs">
          <RestaurantMap heightClass="h-56 sm:h-64" className="mb-0" showDirectionsButton={true} />
        </div>
      </section>
    </div>
  );
}
