"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import { MapPin, Phone, Clock, ChevronRight, ChevronLeft, AlertCircle, Navigation } from "lucide-react";
import { FaStar, FaInstagram } from "react-icons/fa6";
import RestaurantMap from "./RestaurantMap";
import { ULAS_CONFIG } from "../data/ulasConfig";
import { SeaWaves } from "./BrandIcons";

export default function Footer() {
  const { t, lang } = useAppContext();
  const currentYear = new Date().getFullYear();
  const fc = t?.footer || {};

  const isRTL = lang === "ar" || lang === "fa";
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;
  const prefix = lang === "tr" ? "" : `/${lang}`;

  const cihangir = ULAS_CONFIG?.branches?.cihangir || {};
  const maslak = ULAS_CONFIG?.branches?.maslak || {};

  const cihangirHoursText =
    typeof cihangir?.hours?.[lang] === "string"
      ? cihangir.hours[lang]
      : typeof cihangir?.hours?.tr === "string"
      ? cihangir.hours.tr
      : "Pzt–Cmt: 11:00–02:00 • Pazar: 13:00–02:00";

  const maslakHoursNoteText =
    maslak?.hoursNote?.[lang] || maslak?.hoursNote?.tr || "Çalışma saatleri teyit bekliyor";

  return (
    <footer className="relative bg-gradient-to-b from-[#082636] to-[#061B28] text-[#F4F1E8] pt-8 pb-24 px-4 overflow-hidden select-none">
      {/* Subtle Topographic Sea Lines in Footer Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" aria-hidden="true">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
          <g fill="none" stroke="#8CC7C0" strokeWidth="1.2">
            <path d="M-100,60 C250,180 550,-40 900,110 C1050,170 1180,80 1300,130" />
            <path d="M-100,160 C280,280 580,60 930,210 C1080,270 1190,180 1300,230" />
            <path d="M-100,260 C310,380 610,160 960,310 C1100,370 1200,280 1300,330" />
          </g>
        </svg>
      </div>

      {/* Top Wave Border Separator */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mb-8 text-start">
          {/* 1. Brand & Official Logo Card */}
          <div className="flex flex-col items-start text-start bg-white/[0.04] border border-[#B8DCD3]/15 rounded-2xl p-5">
            <div className="relative w-32 h-20 rounded-xl bg-white p-2 border border-[#B8DCD3] shadow-md mb-3.5">
              <Image
                src="/ulas-logo.jpg"
                alt="Ulaş Balıkçılık Logo"
                fill
                unoptimized={true}
                style={{ objectFit: "contain", padding: "4px" }}
              />
            </div>
            <h2
              className="text-xl font-black text-white mb-1 tracking-wide"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              Ulaş Balıkçılık
            </h2>
            <p className="text-[#8CC7C0] text-[11px] font-extrabold tracking-widest uppercase mb-2.5">
              {t?.heroTagline || "Balık & Deniz Ürünleri"}
            </p>
            <p className="text-[#F4F1E8]/80 text-xs leading-relaxed">
              {t?.subtitle ||
                "Cihangir ve Maslak 1453 şubelerimizde günlük taze Karadeniz balıkları, ızgaralar, tavalar ve deniz mezeleri."}
            </p>
          </div>

          {/* 2. Cihangir Branch Card */}
          <div className="flex flex-col justify-between items-start text-start w-full bg-white/[0.04] border border-[#B8DCD3]/15 rounded-2xl p-5">
            <div className="w-full">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#B8DCD3] tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0E4F4A] ring-2 ring-[#8CC7C0]" />
                  <span>Cihangir Şube</span>
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#0E4F4A] text-[#DCECE7] inline-flex items-center gap-1">
                  <FaStar size={10} className="text-[#F5C242]" />
                  <span>4.8 (558)</span>
                </span>
              </div>

              <a
                href={cihangir.mapUrl || cihangir.googleMapsUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 mb-3 text-start hover:text-[#B8DCD3] transition-colors"
              >
                <MapPin size={15} className="text-[#8CC7C0] mt-0.5 shrink-0" />
                <p className="text-xs leading-relaxed text-[#F4F1E8]/90">
                  Kuloğlu, Liva Sk. No: 15/A,
                  <br />
                  34433 Beyoğlu/İstanbul
                </p>
              </a>

              <div className="flex items-start gap-2.5 mb-3.5">
                <Clock size={15} className="text-[#8CC7C0] mt-0.5 shrink-0" />
                <div className="text-xs text-[#F4F1E8]/85 leading-relaxed">
                  {cihangirHoursText}
                </div>
              </div>
            </div>

            {cihangir.phoneHref ? (
              <a
                href={cihangir.phoneHref}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0E4F4A] text-white hover:bg-[#146861] transition-colors font-bold text-xs shadow-xs"
              >
                <Phone size={14} />
                <span>{cihangir.confirmedPhone}</span>
              </a>
            ) : (
              <div className="p-2.5 rounded-xl bg-[#0B2B3B]/90 border border-dashed border-[#8CC7C0]/35 text-[11px] text-[#F4F1E8]/85 flex items-start gap-2 w-full">
                <AlertCircle size={14} className="text-[#F26B45] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-[#B8DCD3] block mb-0.5">
                    {lang === "ar"
                      ? "هاتف جيهانغير (قيد التأكيد):"
                      : lang === "tr"
                      ? "Cihangir Tel (Teyit Bekliyor):"
                      : "Cihangir Tel (Pending):"}
                  </span>
                  <span className="block text-[10.5px]">Google: 0212 434 25 02</span>
                  <span className="block text-[10.5px]">Instagram: 0212 434 23 02</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. Maslak 1453 Branch Card */}
          <div className="flex flex-col justify-between items-start text-start w-full bg-white/[0.04] border border-[#B8DCD3]/15 rounded-2xl p-5">
            <div className="w-full">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#B8DCD3] tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D93829] ring-2 ring-[#F26B45]/60" />
                  <span>Maslak 1453</span>
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D93829] text-white">
                  Yeni Şube
                </span>
              </div>

              <a
                href={maslak.mapUrl || maslak.yandexMapsUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 mb-3 text-start hover:text-[#B8DCD3] transition-colors"
              >
                <MapPin size={15} className="text-[#8CC7C0] mt-0.5 shrink-0" />
                <p className="text-xs leading-relaxed text-[#F4F1E8]/90">
                  Ağaoğlu Maslak 1453,
                  <br />
                  Maslak, Sarıyer/İstanbul
                </p>
              </a>

              <div className="flex items-center gap-2.5 mb-2.5">
                <Phone size={15} className="text-[#F26B45] shrink-0" />
                <a
                  href={maslak.phoneHref || "tel:+902128135757"}
                  className="text-xs sm:text-sm font-black text-white hover:text-[#B8DCD3] transition-colors"
                >
                  {maslak.confirmedPhoneDisplay || "0212 813 57 57"}
                </a>
              </div>

              <div className="flex items-start gap-2.5 mb-4">
                <Clock size={15} className="text-[#8CC7C0] mt-0.5 shrink-0" />
                <p className="text-[11px] text-[#F4F1E8]/75 leading-snug">{maslakHoursNoteText}</p>
              </div>
            </div>

            <a
              href={maslak.phoneHref || "tel:+902128135757"}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#D93829] text-white hover:bg-[#B82D20] transition-colors font-extrabold text-xs shadow-sm"
            >
              <Phone size={14} />
              <span>Maslak Şube Ara ({maslak.confirmedPhoneDisplay || "0212 813 57 57"})</span>
            </a>
          </div>

          {/* 4. Quick Links & Social Card */}
          <div className="flex flex-col justify-between items-start text-start w-full bg-white/[0.04] border border-[#B8DCD3]/15 rounded-2xl p-5">
            <div className="w-full">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#B8DCD3] tracking-wider uppercase mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8CC7C0]" />
                <span>{fc.quickLinks || "Hızlı Bağlantılar"}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm mb-5">
                <li>
                  <Link
                    href={prefix || "/"}
                    className="text-[#F4F1E8]/85 hover:text-[#B8DCD3] transition-colors inline-flex items-center gap-1.5"
                  >
                    <ArrowIcon size={13} className="text-[#8CC7C0]" />
                    <span>{fc.home || "Ana Sayfa"}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${prefix}/menu`}
                    className="text-[#F4F1E8]/85 hover:text-[#B8DCD3] transition-colors inline-flex items-center gap-1.5 font-bold"
                  >
                    <ArrowIcon size={13} className="text-[#F26B45]" />
                    <span>{fc.menu || "Dijital Menü"}</span>
                  </Link>
                </li>
                <li>
                <Link
                  href={`${prefix}/about`}
                  className="text-[#F4F1E8]/85 hover:text-[#B8DCD3] transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowIcon size={13} className="text-[#8CC7C0]" />
                  <span>{fc.about || "Hakkımızda"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/contact`}
                  className="text-[#F4F1E8]/85 hover:text-[#B8DCD3] transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowIcon size={13} className="text-[#8CC7C0]" />
                  <span>{fc.contact || "Şubeler & İletişim"}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full space-y-2">
            <a
              href="https://www.instagram.com/ulasbalik/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ulaş Balık Instagram"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 border border-[#B8DCD3]/30 text-xs font-bold text-[#F4F1E8] hover:bg-[#0E4F4A] transition-colors"
            >
              <FaInstagram size={15} />
              <span>@ulasbalik</span>
            </a>

              <a
                href={cihangir.mapUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-[#0E4F4A]/50 border border-[#8CC7C0]/25 text-[11px] font-bold text-[#B8DCD3] hover:bg-[#0E4F4A] hover:text-white transition-colors"
              >
                <Navigation size={12} />
                <span>Cihangir Yol Tarifi</span>
              </a>
            </div>
          </div>
        </div>

        {/* Cihangir Branch Interactive Map */}
        <RestaurantMap heightClass="h-48 sm:h-56" className="mb-7" />

        <div className="flex justify-center mb-5">
          <SeaWaves className="w-32 h-3.5 text-[#8CC7C0]/40" />
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
          <p className="text-[#F4F1E8]/70 text-xs font-medium">
            &copy; {currentYear} Ulaş Balıkçılık (Cihangir &amp; Maslak 1453).{" "}
            {fc.rights || "Tüm Hakları Saklıdır."}
          </p>
          <p className="text-[#F4F1E8]/60 text-[10px] tracking-widest uppercase flex items-center gap-1">
            {fc.madeBy || "Tasarım & Geliştirme:"}{" "}
            <Link
              href={lang === "tr" ? "/tasarim-gelistirme" : `/${lang}/design-development`}
              className="text-[#B8DCD3] hover:text-white transition-colors underline underline-offset-2 font-bold"
            >
              {lang === "ar" || lang === "fa"
                ? "حامد محمد"
                : lang === "ru"
                ? "Хамед Мохамед"
                : "Hamed Mohamed"}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
