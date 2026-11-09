"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  AlertCircle,
  Utensils,
  Sparkles,
  Anchor,
  ShieldCheck,
  Flame,
  Fish,
  ArrowRight,
  Star,
} from "lucide-react";
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
    <div className="min-h-screen bg-[#DCE8E6] text-[#18323B] pt-7 pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-5 space-y-6">
        {/* Hero Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071D2B] via-[#0B2B3B] to-[#0E4F4A] text-white p-6 sm:p-10 text-center border border-[#B8DCD3]/30 shadow-lg">
          <div className="relative w-36 h-22 mx-auto mb-4 rounded-2xl bg-white p-2.5 border border-[#B8DCD3] shadow-md">
            <Image
              src="/ulas-logo.jpg"
              alt="Ulaş Balıkçılık Logo"
              fill
              unoptimized={true}
              style={{ objectFit: "contain", padding: "6px" }}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-[#B8DCD3]/30 text-[#B8DCD3] text-[11px] font-extrabold uppercase tracking-widest mb-3">
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
            className="text-lg sm:text-2xl text-[#9BCAC3] font-semibold -rotate-2 mb-3"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            Karadeniz&apos;in Bereketi Soframızda
          </p>

          <p className="text-xs sm:text-sm text-[#DCECE7]/90 max-w-2xl mx-auto leading-relaxed">
            {content.storyP1 ||
              "Ulaş Balıkçılık olarak Cihangir ve Maslak 1453 şubelerimizde denizden sofraya günlük taze balık, ızgara, tava ve geleneksel mezelerimizi sunuyoruz."}
          </p>
        </section>

        {/* 3 Coastal Pillar Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0E4F4A] to-[#0B2B3B] text-white flex items-center justify-center mb-3.5 shadow-2xs">
                  <CategoryIcon id={item.cat} size={24} className="text-white" />
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#0B2B3B] mb-2"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#47626B] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Story Section */}
        <section className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-[#0E4F4A] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            <span>{lang === "ar" ? "قصتنا وتراثنا البحري" : "Hikayemiz & Mutfak Kültürümüz"}</span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-black text-[#0B2B3B] mb-3"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {content.storyTitle || "Ulaş Balıkçılık: Denizden Sofraya Günlük Tazelik"}
          </h2>
          <p className="text-[#18323B] leading-relaxed mb-3.5 text-sm sm:text-base font-medium">
            {content.storyP1}
          </p>
          <p className="text-[#47626B] leading-relaxed text-sm sm:text-base font-medium">
            {content.storyP2}
          </p>

          {/* Quality Promises Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#B8DCD3]">
            {qualityPromises.map((q, i) => {
              const Icon = q.icon;
              return (
                <div key={i} className="bg-white/75 rounded-xl p-4 border border-[#DCE8E6]">
                  <Icon size={20} className="text-[#0E4F4A] mb-2" />
                  <h3 className="text-sm font-black text-[#0B2B3B] mb-1">{q.title}</h3>
                  <p className="text-xs text-[#47626B] leading-relaxed">{q.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#B8DCD3] flex flex-wrap items-center justify-between gap-3">
            <SeaWaves className="w-28 h-3 text-[#0E4F4A]/50" />
            <Link
              href={`${prefix}/menu`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D93829] hover:bg-[#B82D20] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <Utensils size={15} />
              <span>{t.allMenuCta || "Menüyü İncele"}</span>
            </Link>
          </div>
        </section>

        {/* 8 Culinary Categories Overview */}
        <section className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-black text-[#0B2B3B]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {lang === "ar" ? "أقسام مطبخنا البحري (81 صنف)" : "Mutfak Kategorilerimiz (81 Çeşit)"}
            </h2>
            <Link
              href={`${prefix}/menu`}
              className="text-xs font-extrabold text-[#0E4F4A] hover:underline flex items-center gap-1"
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
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#B8DCD3] hover:border-[#0E4F4A] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0E4F4A] text-white flex items-center justify-center shrink-0">
                  <CategoryIcon id={cat.id} size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-[#0B2B3B] truncate">
                    {cat.category[lang] || cat.category.tr}
                  </div>
                  <div className="text-[10px] font-bold text-[#47626B]">
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
          <section className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#0E4F4A] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  Beyoğlu / İstanbul
                </span>
                <span className="text-xs font-extrabold text-[#0E4F4A] inline-flex items-center gap-1">
                  <Star size={12} className="fill-[#0E4F4A] text-[#0E4F4A]" />
                  <span>4.8 (558)</span>
                </span>
              </div>
              <h3
                className="text-xl font-black text-[#0B2B3B] mb-3"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {cihangir.name[lang] || cihangir.name.tr}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#47626B]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <span>{cihangir.address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <span>{cihangir.hours[lang] || cihangir.hours.tr}</span>
                </div>
                {cihangir.phoneHref ? (
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-[#0E4F4A] shrink-0" />
                    <a href={cihangir.phoneHref} className="font-bold text-[#0B2B3B]">
                      {cihangir.confirmedPhone}
                    </a>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-dashed border-[#0E4F4A]/40 text-[11px] flex items-start gap-2">
                    <AlertCircle size={14} className="text-[#D93829] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B2B3B] block">Telefon Teyit Bekliyor:</strong>
                      <span>Google: 0212 434 25 02 • Instagram: 0212 434 23 02</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Maslak 1453 Branch */}
          <section className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#D93829] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  Yeni Şube • Sarıyer
                </span>
                <span className="text-xs font-bold text-[#47626B]">Ağaoğlu Maslak 1453</span>
              </div>
              <h3
                className="text-xl font-black text-[#0B2B3B] mb-3"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {maslak.name[lang] || maslak.name.tr}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#47626B]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <div>
                    <div>{maslak.address}</div>
                    <div className="text-[11px] text-[#47626B]/80 mt-0.5">
                      ({maslak.addressNote[lang] || maslak.addressNote.tr})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#D93829] shrink-0" />
                  <a
                    href={maslak.phoneHref}
                    className="font-extrabold text-[#0B2B3B] hover:text-[#D93829]"
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
          </section>
        </div>

        {/* Map Section */}
        <section className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 shadow-xs">
          <h2
            className="text-xl font-black text-[#0B2B3B] mb-4"
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
