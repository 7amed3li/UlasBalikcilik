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
  MapPin,
  Phone,
  Clock,
  Star,
  Utensils,
  ArrowRight,
  Sparkles,
  Anchor,
  AlertCircle,
  Plus,
  Check,
  Compass,
} from "lucide-react";

const DAILY_CATCH_HIGHLIGHTS = [
  { id: "hamsi_tava", catId: "tavalar", badgeTr: "Karadeniz", badgeAr: "البحر الأسود", badgeEn: "Black Sea" },
  { id: "levrek_izgara", catId: "izgaralar", badgeTr: "Izgara", badgeAr: "مشوي", badgeEn: "Charcoal Grill" },
  { id: "kalamar_tava", catId: "mezeler", badgeTr: "Çıtır", badgeAr: "مقرمش", badgeEn: "Crispy" },
  { id: "karides_guvec", catId: "mezeler", badgeTr: "Güveç", badgeAr: "طاجن", badgeEn: "Clay Pot" },
  { id: "balik_corbasi", catId: "corbalar", badgeTr: "Sıcak", badgeAr: "ساخن", badgeEn: "Chef Special" },
];

const FEATURED_DISH_IDS = [
  "cipura_izgara",
  "hamsi_tava",
  "somon_izgara",
  "kalamar_tava",
  "balik_ekmek_uskumru",
  "firinda_helva",
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
    <div className="min-h-screen bg-[#DCE8E6] text-[#18323B] pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-7 pb-6 px-3 sm:px-5 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071D2B] via-[#0B2B3B] to-[#0E4F4A] text-white p-6 sm:p-10 border border-[#B8DCD3]/40 shadow-xl">
          {/* Decorative Topographic Sea Lines */}
          <svg
            viewBox="0 0 1000 320"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
            aria-hidden="true"
          >
            <g fill="none" stroke="#B8DCD3" strokeWidth="1.4">
              <path d="M-60,40 C200,130 420,-30 700,80 C880,150 960,40 1060,90" />
              <path d="M-60,110 C220,200 440,40 720,150 C900,220 970,110 1060,160" />
              <path d="M-60,180 C240,270 460,110 740,220 C920,290 980,180 1060,230" />
              <path d="M-60,250 C260,340 480,180 760,290 C940,360 990,250 1060,300" />
            </g>
          </svg>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Left Column: Brand & Headlines */}
            <div className="flex-1 text-center md:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#B8DCD3]/30 text-[#B8DCD3] text-[11px] font-extrabold uppercase tracking-widest mb-4">
                <Anchor size={13} className="text-[#F26B45]" />
                <span>{t.storyBadge || "Taze Deniz Ürünleri • Cihangir & Maslak 1453"}</span>
              </div>

              <h1
                className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12] mb-2"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                ULAŞ BALIKÇILIK
              </h1>

              <p
                className="text-xl sm:text-2xl text-[#9BCAC3] font-semibold -rotate-1 mb-3"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                {lang === "ar"
                  ? "خيرات البحر الأسود الطازجة على مائدتنا"
                  : "Karadeniz'in Bereketi Soframızda"}
              </p>

              <p className="text-xs sm:text-base text-[#DCECE7]/90 max-w-xl mx-auto md:mx-0 leading-relaxed mb-6 font-medium">
                {t.subtitle ||
                  "Cihangir ve Maslak 1453 şubelerimizde günlük taze Karadeniz balıkları, kömürde ızgaralar, çıtır tavalar ve geleneksel deniz mezeleri."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  href={`${prefix}/menu`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#D93829] hover:bg-[#B82D20] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  <Utensils size={16} />
                  <span>{t.heroCta || "Menüyü Keşfet"}</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href={`${prefix}/contact`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-[#B8DCD3]/40 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  <MapPin size={16} className="text-[#9BCAC3]" />
                  <span>{lang === "ar" ? "الفروع والتواصل" : "Şubelerimiz"}</span>
                </Link>

                <a
                  href={maslak.phoneHref}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-[#0E4F4A] hover:bg-[#13635D] border border-[#8CC7C0]/40 text-white font-extrabold text-xs sm:text-sm transition-all"
                >
                  <Phone size={15} className="text-[#F26B45]" />
                  <span>Maslak: {maslak.confirmedPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Official Logo Card + Stats Badges */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div className="relative w-44 h-28 sm:w-52 sm:h-32 rounded-3xl bg-white p-3 border-2 border-[#B8DCD3] shadow-xl flex items-center justify-center">
                <Image
                  src="/ulas-logo.jpg"
                  alt="Ulaş Balık — Fish Restaurant"
                  fill
                  priority
                  unoptimized={true}
                  style={{ objectFit: "contain", padding: "8px" }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="rounded-xl bg-[#071D2B]/80 border border-[#B8DCD3]/25 px-3 py-2 text-center">
                  <div className="text-sm sm:text-base font-black text-[#F26B45] flex items-center justify-center gap-0.5">
                    <span>4.8</span>
                    <Star size={12} className="fill-[#F26B45] text-[#F26B45]" />
                  </div>
                  <div className="text-[10px] text-[#B8DCD3] font-bold">558+ Google</div>
                </div>
                <div className="rounded-xl bg-[#071D2B]/80 border border-[#B8DCD3]/25 px-3 py-2 text-center">
                  <div className="text-sm sm:text-base font-black text-white">81</div>
                  <div className="text-[10px] text-[#B8DCD3] font-bold">
                    {t.statsDishes || "ÇEŞİT"}
                  </div>
                </div>
                <div className="rounded-xl bg-[#071D2B]/80 border border-[#B8DCD3]/25 px-3 py-2 text-center">
                  <div className="text-sm sm:text-base font-black text-[#9BCAC3]">2</div>
                  <div className="text-[10px] text-[#B8DCD3] font-bold">
                    {lang === "ar" ? "فرع" : "ŞUBE"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GÜNÜN AVI (DAILY CATCH CIRCULAR PLATES SHOWCASE) */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 py-3">
        <div className="rounded-3xl bg-[#F4F1E8] border border-[#B8DCD3] p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <h2
                className="text-lg sm:text-xl font-black text-[#0B2B3B] tracking-wider uppercase"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {lang === "ar"
                  ? "صيد اليوم المختار"
                  : lang === "en"
                  ? "CATCH OF THE DAY"
                  : "GÜNÜN AVI"}
              </h2>
              <svg viewBox="0 0 80 12" className="w-14 h-3 text-[#D93829]" aria-hidden="true">
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
              className="text-xs font-extrabold text-[#0E4F4A] hover:text-[#D93829] flex items-center gap-1 transition-colors"
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
                  className="shrink-0 w-[148px] sm:w-[172px] bg-white/80 hover:bg-white rounded-2xl p-3 border border-[#B8DCD3] shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between group"
                >
                  <Link href={`${prefix}/dish/${item.id}`} className="w-full flex flex-col items-center">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-[#0E4F4A] to-[#082433] shadow-md mb-2.5 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0F384C] via-[#0B2B3B] to-[#071D2B] border border-[#6CA6A1]/40 flex flex-col items-center justify-center relative overflow-hidden">
                        <CategoryIcon
                          id={item.categoryId}
                          size={30}
                          className="text-[#F4F1E8] drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="mt-0.5 text-[8px] font-bold tracking-wider uppercase text-[#8CC7C0]">
                          {badge}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-xs sm:text-sm font-black text-[#0B2B3B] line-clamp-1 mb-1 group-hover:text-[#0E4F4A]"
                      style={{ fontFamily: "var(--font-cairo)" }}
                    >
                      {name}
                    </h3>
                  </Link>

                  <div className="w-full flex items-center justify-between gap-1.5 mt-1.5 pt-2 border-t border-[#DCE8E6]">
                    <span
                      className="text-xs sm:text-sm font-black text-[#0B2B3B]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {renderPrice(item.price)}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      aria-label={name}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs transition-transform active:scale-90 cursor-pointer ${
                        qty > 0
                          ? "bg-[#0E4F4A] hover:bg-[#0B2B3B]"
                          : "bg-[#D93829] hover:bg-[#B82D20]"
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
              className="text-xl sm:text-2xl font-black text-[#0B2B3B]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {lang === "ar" ? "أقسام القائمة البحرية" : "Menü Kategorilerimiz"}
            </h2>
            <p className="text-xs text-[#47626B] font-medium">
              {lang === "ar"
                ? "اختر القسم لتصفح الأصناف الطازجة والأسعار"
                : "8 ana kategoride 81 çeşit günlük taze deniz lezzeti"}
            </p>
          </div>
          <Link
            href={`${prefix}/menu`}
            className="px-3.5 py-2 rounded-xl bg-[#0E4F4A] text-white text-xs font-extrabold hover:bg-[#0B2B3B] transition-colors inline-flex items-center gap-1.5"
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
                className="group bg-[#F4F1E8] hover:bg-white border border-[#B8DCD3] hover:border-[#0E4F4A] rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#0E4F4A] to-[#0B2B3B] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <CategoryIcon id={cat.id} size={24} className="text-white" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DCE8E6] text-[#0E4F4A] text-[11px] font-black">
                      {cat.items.length} {lang === "ar" ? "صنف" : "çeşit"}
                    </span>
                  </div>

                  <h3
                    className="text-base font-black text-[#0B2B3B] group-hover:text-[#0E4F4A] mb-1"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[11px] text-[#47626B] line-clamp-2 leading-relaxed font-medium">
                    {desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#DCE8E6] flex items-center justify-between text-[11px] font-extrabold text-[#0E4F4A]">
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
              className="text-xl sm:text-2xl font-black text-[#0B2B3B]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.signatureDishes || "Özel Seçimlerimiz"}
            </h2>
            <p className="text-xs text-[#47626B] font-medium">
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0B2B3B] to-[#0E4F4A] hover:from-[#0E4F4A] hover:to-[#0B2B3B] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            <Utensils size={16} className="text-[#F26B45]" />
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
          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0E4F4A]/10 text-[#0E4F4A] text-[10px] font-extrabold uppercase tracking-wider mb-2">
              {t.adanaBadge || "Karadeniz & Marmara"}
            </span>
            <h3
              className="text-lg font-black text-[#0B2B3B] mb-1.5"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.adanaTitle || "Günlük Tava & Izgara Balıklar"}
            </h3>
            <p className="text-xs sm:text-sm text-[#47626B] leading-relaxed font-medium">
              {t.adanaDesc}
            </p>
          </div>

          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0E4F4A]/10 text-[#0E4F4A] text-[10px] font-extrabold uppercase tracking-wider mb-2">
              {t.pideBadge || "Soğuk & Sıcak Başlangıçlar"}
            </span>
            <h3
              className="text-lg font-black text-[#0B2B3B] mb-1.5"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.pideTitle || "Zengin Deniz Mezeleri"}
            </h3>
            <p className="text-xs sm:text-sm text-[#47626B] leading-relaxed font-medium">
              {t.pideDesc}
            </p>
          </div>

          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 shadow-2xs">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D93829]/10 text-[#D93829] text-[10px] font-extrabold uppercase tracking-wider mb-2">
              {t.breakfastBadge || "Klasik Final"}
            </span>
            <h3
              className="text-lg font-black text-[#0B2B3B] mb-1.5"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.breakfastTitle || "Kabak Tatlısı & Sıcak Helva"}
            </h3>
            <p className="text-xs sm:text-sm text-[#47626B] leading-relaxed font-medium">
              {t.breakfastDesc}
            </p>
          </div>
        </div>

        {/* Story Banner */}
        <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0E4F4A] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>{t.about || "Hakkımızda"}</span>
            </div>
            <h2
              className="text-xl sm:text-2xl font-black text-[#0B2B3B]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.ourStoryTitle || "Ulaş Balıkçılık Lezzet Geleneği"}
            </h2>
            <p className="text-xs sm:text-sm text-[#47626B] leading-relaxed font-medium">
              {t.ourStoryDesc}
            </p>
          </div>

          <Link
            href={`${prefix}/about`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B2B3B] hover:bg-[#0E4F4A] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
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
              className="text-xl sm:text-2xl font-black text-[#0B2B3B]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.locationTitle || "Şubelerimiz & İletişim"}
            </h2>
            <p className="text-xs text-[#47626B] font-medium">
              {t.locationSubtitle || "Cihangir (Beyoğlu) & Maslak 1453 (Sarıyer)"}
            </p>
          </div>
          <Link
            href={`${prefix}/contact`}
            className="text-xs font-extrabold text-[#0E4F4A] hover:underline flex items-center gap-1"
          >
            <span>{t.contactPageBtn || "İletişim Sayfası"}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cihangir Branch */}
          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0E4F4A] text-white text-xs font-extrabold">
                  {cihangir.name[lang] || cihangir.name.tr}
                </span>
                <span className="text-xs font-extrabold text-[#0E4F4A] inline-flex items-center gap-1">
                  <Star size={12} className="fill-[#0E4F4A] text-[#0E4F4A]" />
                  <span>{cihangir.rating} ({cihangir.reviewsCount})</span>
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#47626B]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <span>{cihangir.address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <span>{cihangir.hours[lang] || cihangir.hours.tr}</span>
                </div>
                {!cihangir.phoneHref && (
                  <div className="p-2.5 rounded-xl bg-white border border-dashed border-[#0E4F4A]/40 text-[11px] flex items-start gap-2">
                    <AlertCircle size={14} className="text-[#D93829] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B2B3B] block">Telefon Teyit Bekliyor:</strong>
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
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0E4F4A] hover:bg-[#0B2B3B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              <Compass size={15} />
              <span>{t.directions || "Yol Tarifi Al"}</span>
            </a>
          </div>

          {/* Maslak 1453 Branch */}
          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#D93829] text-white text-xs font-extrabold">
                  {maslak.name[lang] || maslak.name.tr}
                </span>
                <span className="text-xs font-bold text-[#47626B]">Sarıyer / İstanbul</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#47626B]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <div>
                    <div>{maslak.address}</div>
                    <div className="text-[11px] text-[#47626B]/80">
                      ({maslak.addressNote[lang] || maslak.addressNote.tr})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#D93829] shrink-0" />
                  <a
                    href={maslak.phoneHref}
                    className="font-black text-[#0B2B3B] hover:text-[#D93829]"
                  >
                    {maslak.confirmedPhone}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <span>{maslak.hoursNote[lang] || maslak.hoursNote.tr}</span>
                </div>
              </div>
            </div>

            <a
              href={maslak.phoneHref}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#D93829] hover:bg-[#B82D20] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              <Phone size={15} />
              <span>
                {t.callNow || "Hemen Ara"} ({maslak.confirmedPhone})
              </span>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-4 sm:p-5 shadow-xs">
          <RestaurantMap heightClass="h-56 sm:h-64" className="mb-0" showDirectionsButton={true} />
        </div>
      </section>
    </div>
  );
}
