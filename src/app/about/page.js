"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TbMapPin as MapPin,
  TbPhone as Phone,
  TbClock as Clock,
  TbInfoCircle as AlertCircle,
  TbToolsKitchen2 as Utensils,
  TbAnchor as Anchor,
  TbShieldCheck as ShieldCheck,
  TbGrill as Flame,
  TbFish as Fish,
  TbArrowRight as ArrowRight,
  TbStarFilled as Star,
} from "react-icons/tb";
import { PiFishSimpleDuotone } from "react-icons/pi";
import { useAppContext } from "@/context/AppContext";
import RestaurantMap from "@/components/RestaurantMap";
import { ULAS_CONFIG } from "@/data/ulasConfig";
import { menuData } from "@/data/menuData";
import { SeaWaves, CategoryIcon } from "@/components/BrandIcons";

export default function AboutPage() {
  const { t, lang } = useAppContext();
  const content = t.aboutPage || {};
  const cihangir = ULAS_CONFIG.branches.cihangir;
  const maslak = ULAS_CONFIG.branches.maslak;
  const prefix = lang === "tr" ? "" : `/${lang}`;

  const highlights = [
    {
      cat: "izgaralar",
      title:
        lang === "ar"
          ? "أسماك البحر الأسود الطازجة يومياً"
          : t.adanaTitle || "Günlük Taze Karadeniz Balıkları",
      desc:
        lang === "ar"
          ? "نختار يومياً أجود أسماك الموسم من الهمسي واللوفر والدنيس والقاروص لتُطهى طازجة على الشواية أو المقلاة."
          : t.adanaDesc ||
          "Mevsiminde günlük seçilen hamsi, lüfer, çipura, levrek ve somon çeşitlerimiz ızgara ve tavada ustalıkla hazırlanır.",
    },
    {
      cat: "mezeler",
      title:
        lang === "ar"
          ? "مقبلات بحرية تقليدية"
          : t.pideTitle || "Özel Deniz Mezeleri & Ara Sıcaklar",
      desc:
        lang === "ar"
          ? "تشكيلة غنية من المقبلات الباردة والساخنة تشمل الكاليماري والمحار المحشي والجمبري بالفخار."
          : t.pideDesc ||
          "Lakerda, deniz börülcesi, fava, midye dolma, kalamar tava ve tereyağlı karides güveç ile eksiksiz bir balık sofrası.",
    },
    {
      cat: "tatlilar",
      title:
        lang === "ar"
          ? "حلوى اليقطين والحلاوة الساخنة بالفرن"
          : t.breakfastTitle || "Fırında Sıcak Helva & Tatlılar",
      desc:
        lang === "ar"
          ? "نختتم مائدتنا البحرية بالحلاوة الساخنة في الفرن وحلوى اليقطين بالطحينة والجوز."
          : t.breakfastDesc ||
          "Balık ziyafetinin ardından fırında sıcak helva, tahinli cevizli kabak tatlısı ve irmik tatlısı.",
    },
  ];

  const qualityPromises = [
    {
      icon: Fish,
      title: lang === "ar" ? "صيد يومي طازج 100%" : "Günlük Taze Balık Seçimi",
      desc:
        lang === "ar"
          ? "يتم اختيار الأسماك والمأكولات البحرية يومياً حسب موسم الصيد في البحر الأسود ومرمرة وبحر إيجة."
          : "Karadeniz, Marmara ve Ege'den mevsimine göre her sabah taze seçilen balıklar.",
    },
    {
      icon: Flame,
      title: lang === "ar" ? "شواء وقلي على الأصول" : "Usta Pişirme Teknikleri",
      desc:
        lang === "ar"
          ? "نحافظ على العصارة والنكهة الأصلية للسمك سواء على الفحم أو في مقلاة الذرة المقرمشة."
          : "Mısır ununda çıtır tava ve suyunu kaybetmeden tam kıvamında pişirilen ızgara çeşitleri.",
    },
    {
      icon: ShieldCheck,
      title: lang === "ar" ? "ضيافة أصيلة في فرعين" : "Cihangir & Maslak 1453 Güvencesi",
      desc:
        lang === "ar"
          ? "نفس الجودة والمذاق الأصيل في فرع جيهانغير وفرع مسلك 1453 الجديد."
          : "Beyoğlu Cihangir'deki köklü şubemiz ve Sarıyer Maslak 1453'teki yeni şubemizde standart kalite.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E7F3F9] text-[#2E3B44] pt-7 pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-5 space-y-6">
        {/* Hero Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#082A3A] via-[#06384E] to-[#104760] text-white p-6 sm:p-10 text-center border border-[#D6EBF5]/30 shadow-lg">
          <div className="relative w-44 h-20 mx-auto mb-4 rounded-2xl bg-white p-2.5 border border-[#D6EBF5] shadow-md">
            <Image
              src="/ulas-logo.jpg"
              alt="Ulaş Balıkçılık Logo"
              fill
              unoptimized={true}
              style={{ objectFit: "contain", padding: "6px" }}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-[#D6EBF5]/30 text-[#D6EBF5] text-[11px] font-extrabold uppercase tracking-widest mb-3">
            <Anchor size={12} />
            <span>Ulaş Balıkçılık • Fish Restaurant</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-black text-white mb-2"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.about || "Hakkımızda"}
          </h1>

          <p
            className="text-lg sm:text-2xl text-[#0C96DF] font-semibold -rotate-2 mb-3"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            Karadeniz&apos;in Bereketi Soframızda
          </p>

          <p className="text-xs sm:text-sm text-[#E7F3F9]/90 max-w-2xl mx-auto leading-relaxed">
            {content.storyP1 ||
              "Ulaş Balıkçılık olarak Cihangir ve Maslak 1453 şubelerimizde denizden sofraya günlük taze balık, ızgara, tava ve geleneksel mezelerimizi sunuyoruz."}
          </p>
        </section>

        {/* 3 Coastal Pillar Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0C96DF] to-[#104760] text-white flex items-center justify-center mb-3.5 shadow-2xs">
                  <CategoryIcon id={item.cat} size={24} className="text-white" />
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#2E3B44] mb-2"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#53636E] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Story Section */}
        <section className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-[#0C96DF] text-xs font-extrabold uppercase tracking-wider mb-2">
            <PiFishSimpleDuotone size={16} />
            <span>{lang === "ar" ? "قصتنا وتراثنا البحري" : "Hikayemiz & Mutfak Kültürümüz"}</span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-black text-[#2E3B44] mb-3"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {content.storyTitle || "Ulaş Balıkçılık: Denizden Sofraya Günlük Tazelik"}
          </h2>
          <p className="text-[#2E3B44] leading-relaxed mb-3.5 text-sm sm:text-base font-medium">
            {content.storyP1}
          </p>
          <p className="text-[#53636E] leading-relaxed text-sm sm:text-base font-medium">
            {content.storyP2}
          </p>

          {/* Quality Promises Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#D6EBF5]">
            {qualityPromises.map((q, i) => {
              const Icon = q.icon;
              return (
                <div key={i} className="bg-white/75 rounded-xl p-4 border border-[#E7F3F9]">
                  <Icon size={20} className="text-[#0C96DF] mb-2" />
                  <h3 className="text-sm font-black text-[#2E3B44] mb-1">{q.title}</h3>
                  <p className="text-xs text-[#53636E] leading-relaxed">{q.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#D6EBF5] flex flex-wrap items-center justify-between gap-3">
            <SeaWaves className="w-28 h-3 text-[#0C96DF]/50" />
            <Link
              href={`${prefix}/menu`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0C96DF] hover:bg-[#104760] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <Utensils size={15} />
              <span>{t.allMenuCta || "Menüyü İncele"}</span>
            </Link>
          </div>
        </section>

        {/* 8 Culinary Categories Overview */}
        <section className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-black text-[#2E3B44]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {lang === "ar" ? "أقسام مطبخنا البحري (81 صنف)" : "Mutfak Kategorilerimiz (81 Çeşit)"}
            </h2>
            <Link
              href={`${prefix}/menu`}
              className="text-xs font-extrabold text-[#0C96DF] hover:underline flex items-center gap-1"
            >
              <span>{t.menu || "Menü"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {menuData.map((cat) => (
              <Link
                key={cat.id}
                href={`${prefix}/menu#${cat.id}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#D6EBF5] hover:border-[#0C96DF] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0C96DF] text-white flex items-center justify-center shrink-0">
                  <CategoryIcon id={cat.id} size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-[#2E3B44] truncate">
                    {cat.category[lang] || cat.category.tr}
                  </div>
                  <div className="text-[10px] font-bold text-[#53636E]">
                    {cat.items.length} {lang === "ar" ? "صنف" : "çeşit"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Two Branches Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cihangir Branch */}
          <section className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#0C96DF] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  Beyoğlu / İstanbul
                </span>
                <span className="text-xs font-extrabold text-[#0C96DF] inline-flex items-center gap-1">
                  <Star size={12} className="fill-[#EE7B3F] text-[#EE7B3F]" />
                  <span>4.8 (558)</span>
                </span>
              </div>
              <h3
                className="text-xl font-black text-[#2E3B44] mb-3"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {cihangir.name[lang] || cihangir.name.tr}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#53636E]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <span>{cihangir.address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <span>{cihangir.hours[lang] || cihangir.hours.tr}</span>
                </div>
                {cihangir.phoneHref ? (
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-[#0C96DF] shrink-0" />
                    <a href={cihangir.phoneHref} className="font-bold text-[#2E3B44]">
                      {cihangir.confirmedPhone}
                    </a>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-dashed border-[#90C6DF]/40 text-[11px] flex items-start gap-2">
                    <AlertCircle size={14} className="text-[#0C96DF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#2E3B44] block">Telefon Teyit Bekliyor:</strong>
                      <span>Google: 0212 434 25 02 • Instagram: 0212 434 23 02</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Maslak 1453 Branch */}
          <section className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#0C96DF] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  Yeni Şube • Sarıyer
                </span>
                <span className="text-xs font-bold text-[#53636E]">Ağaoğlu Maslak 1453</span>
              </div>
              <h3
                className="text-xl font-black text-[#2E3B44] mb-3"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {maslak.name[lang] || maslak.name.tr}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#53636E]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <div>
                    <div>{maslak.address}</div>
                    <div className="text-[11px] text-[#53636E]/80 mt-0.5">
                      ({maslak.addressNote[lang] || maslak.addressNote.tr})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#0C96DF] shrink-0" />
                  <a
                    href={maslak.phoneHref}
                    className="font-extrabold text-[#2E3B44] hover:text-[#0C96DF]"
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
          </section>
        </div>

        {/* Map Section */}
        <section className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 shadow-xs">
          <h2
            className="text-xl font-black text-[#2E3B44] mb-4"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Cihangir Şube Konumu
          </h2>
          <RestaurantMap heightClass="h-56 sm:h-72" className="mb-0" showDirectionsButton={true} />
        </section>
      </div>
    </div>
  );
}
