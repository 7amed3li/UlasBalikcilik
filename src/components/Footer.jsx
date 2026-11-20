"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import {
  TbMapPin as MapPin,
  TbPhone as Phone,
  TbClock as Clock,
  TbChevronRight as ChevronRight,
  TbChevronLeft as ChevronLeft,
  TbChevronDown as ChevronDown,
  TbNavigation as Navigation,
  TbArrowUp as ArrowUp,
} from "react-icons/tb";
import { FaStar, FaInstagram } from "react-icons/fa6";
import RestaurantMap from "./RestaurantMap";
import ReservationModal from "./ReservationModal";
import { ULAS_CONFIG } from "../data/ulasConfig";

function isCihangirOpenIstanbul() {
  try {
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
    );
    const day = now.getDay(); // 0 = Sunday
    const mins = now.getHours() * 60 + now.getMinutes();
    // Mon-Sat: 11:00–02:00 (next day), Sun: 13:00–02:00 (next day)
    if (mins < 120) return true; // 00:00–02:00
    const openMins = day === 0 ? 13 * 60 : 11 * 60;
    return mins >= openMins;
  } catch {
    return true;
  }
}

export default function Footer() {
  const { t, lang } = useAppContext();
  const currentYear = new Date().getFullYear();
  const fc = t?.footer || {};

  const [resOpen, setResOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpenNow(isCihangirOpenIstanbul()));
    return () => cancelAnimationFrame(id);
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-[#06384E] to-[#082A3A] text-[#F4F9FB] pt-16 pb-32 sm:pb-24 px-5 sm:px-8 border-t border-white/10 select-none">
        <div className="max-w-5xl mx-auto">
          {/* Top Luxury Reservation & Back-to-Top Strip */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 mb-12 border-b border-white/10 text-start">
            <div>
              <p className="lux-kicker text-[#90C6DF] mb-2">
                {lang === "ar"
                  ? "أولاش باليكتشيليك • إسطنبول"
                  : lang === "en"
                  ? "Ulaş Balıkçılık • Istanbul"
                  : "Ulaş Balıkçılık • İstanbul"}
              </p>
              <h2 className="lux-serif text-3xl sm:text-4xl text-white leading-tight">
                {lang === "ar"
                  ? "احجز طاولتك لمائدة البحر الأسود"
                  : lang === "en"
                  ? "Reserve your table by the Black Sea catch"
                  : "Akşam sofranız için yerinizi ayırtın"}
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setResOpen(true)}
                className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 bg-[#EE7B3F] hover:bg-[#D15015] text-[#06384E] hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer"
              >
                {lang === "ar"
                  ? "احجز طاولة"
                  : lang === "en"
                  ? "Reserve a Table"
                  : "Rezervasyon Yap"}
              </button>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="inline-flex items-center justify-center w-11 h-11 border border-white/20 text-[#D6EBF5] hover:border-[#0C96DF] hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

          {/* Open 4-column editorial grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10 text-start">
            {/* 1. Brand Anchor */}
            <div className="flex flex-col items-start">
              <div className="relative w-32 h-14 rounded-lg bg-[#F4F9FB] p-2 shadow-sm mb-4">
                <Image
                  src="/ulas-logo.webp"
                  alt="Ulaş Balıkçılık Logo"
                  fill
                  sizes="128px"
                  style={{ objectFit: "contain", padding: "4px" }}
                />
              </div>
              <p className="text-[#90C6DF] text-[11px] font-semibold tracking-[0.2em] uppercase mb-2.5">
                {t?.heroTagline || "Karadeniz'in Bereketi Soframızda"}
              </p>
              <p className="text-[#D6EBF5]/85 text-xs leading-relaxed mb-4">
                {t?.subtitle ||
                  "Cihangir ve Maslak 1453 şubelerimizde günlük taze Karadeniz balıkları, ızgaralar, tavalar ve deniz mezeleri."}
              </p>
              <a
                href="https://www.instagram.com/ulasbalik_restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ulaş Balık Instagram"
                className="lux-link inline-flex items-center gap-2 min-h-[40px] text-xs font-semibold text-[#0C96DF] hover:text-[#D6EBF5] transition-colors"
              >
                <FaInstagram size={15} />
                <span>@ulasbalik_restaurant</span>
              </a>
            </div>

            {/* 2. Cihangir Branch */}
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-between w-full mb-4 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white tracking-[0.18em] uppercase">
                    Cihangir
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold ${
                      isOpenNow ? "text-[#90C6DF]" : "text-[#D6EBF5]/60"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isOpenNow ? "bg-[#0C96DF]" : "bg-white/30"
                      }`}
                    />
                    {isOpenNow
                      ? lang === "ar"
                        ? "مفتوح"
                        : lang === "en"
                        ? "Open"
                        : "Açık"
                      : lang === "ar"
                      ? "مغلق"
                      : lang === "en"
                      ? "Closed"
                      : "Kapalı"}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4F9FB]">
                  <FaStar size={11} className="text-[#EE7B3F]" />
                  <span>4.8</span>
                </span>
              </div>

              <a
                href={cihangir.googleMapsUrl || cihangir.mapUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 mb-3 text-[#D6EBF5]/85 hover:text-white transition-colors"
              >
                <MapPin size={15} className="text-[#90C6DF] mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">
                  Kuloğlu, Liva Sk. No: 15/A,
                  <br />
                  34433 Beyoğlu/İstanbul
                </span>
              </a>

              <div className="flex items-start gap-2.5 mb-2 text-[#D6EBF5]/80">
                <Clock size={15} className="text-[#90C6DF] mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">{cihangirHoursText}</span>
              </div>

              <a
                href={cihangir.phoneHref || "tel:+902124342502"}
                className="inline-flex items-center gap-2.5 min-h-[44px] text-sm font-bold text-white hover:text-[#0C96DF] transition-colors"
              >
                <Phone size={15} className="text-[#0C96DF] shrink-0" />
                <span>{cihangir.confirmedPhone || "0212 434 25 02"}</span>
              </a>

              <a
                href={cihangir.googleMapsUrl || cihangir.mapUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-link inline-flex items-center gap-1.5 min-h-[40px] text-xs font-semibold text-[#0C96DF] hover:text-[#D6EBF5] transition-colors"
              >
                <Navigation size={13} />
                <span>{lang === "ar" ? "الاتجاهات" : lang === "en" ? "Directions" : "Yol Tarifi"}</span>
              </a>
            </div>

            {/* 3. Maslak 1453 Branch */}
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-between w-full mb-4 pb-2.5 border-b border-white/10">
                <h3 className="text-xs font-bold text-white tracking-[0.18em] uppercase">
                  Maslak 1453
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4F9FB]">
                  <FaStar size={11} className="text-[#EE7B3F]" />
                  <span>4.9</span>
                  <span className="text-[10px] text-[#90C6DF] font-medium">• Yeni</span>
                </span>
              </div>

              <a
                href={maslak.mapUrl || maslak.yandexMapsUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 mb-3 text-[#D6EBF5]/85 hover:text-white transition-colors"
              >
                <MapPin size={15} className="text-[#90C6DF] mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">
                  Ağaoğlu Maslak 1453,
                  <br />
                  Maslak, Sarıyer/İstanbul
                </span>
              </a>

              <a
                href={maslak.phoneHref || "tel:+902128135757"}
                className="inline-flex items-center gap-2.5 min-h-[44px] text-sm font-bold text-white hover:text-[#0C96DF] transition-colors"
              >
                <Phone size={15} className="text-[#0C96DF] shrink-0" />
                <span>{maslak.confirmedPhoneDisplay || "0212 813 57 57"}</span>
              </a>

              <a
                href={maslak.mapUrl || maslak.yandexMapsUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-link inline-flex items-center gap-1.5 min-h-[40px] text-xs font-semibold text-[#0C96DF] hover:text-[#D6EBF5] transition-colors"
              >
                <Navigation size={13} />
                <span>{lang === "ar" ? "الاتجاهات" : lang === "en" ? "Directions" : "Yol Tarifi"}</span>
              </a>
            </div>

            {/* 4. Quick Links (collapsible on mobile, open on desktop) */}
            <div className="flex flex-col items-start">
              <button
                type="button"
                onClick={() => setLinksOpen((v) => !v)}
                aria-expanded={linksOpen}
                className="sm:pointer-events-none flex items-center justify-between w-full text-xs font-bold text-white tracking-[0.18em] uppercase mb-3 sm:mb-4 pb-2.5 border-b border-white/10 cursor-pointer sm:cursor-default"
              >
                <span>{fc.quickLinks || "Hızlı Bağlantılar"}</span>
                <ChevronDown
                  size={15}
                  className={`sm:hidden text-[#90C6DF] transition-transform duration-300 ${
                    linksOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                className={`${
                  linksOpen ? "flex" : "hidden"
                } sm:flex flex-col space-y-1 text-xs sm:text-sm w-full`}
              >
                <li>
                  <Link
                    href={prefix || "/"}
                    className="text-[#D6EBF5]/85 hover:text-white transition-colors inline-flex items-center gap-1.5 min-h-[40px]"
                  >
                    <ArrowIcon size={13} className="text-[#0C96DF]" />
                    <span>{fc.home || "Ana Sayfa"}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${prefix}/menu`}
                    className="text-white hover:text-[#0C96DF] transition-colors inline-flex items-center gap-1.5 min-h-[40px] font-semibold"
                  >
                    <ArrowIcon size={13} className="text-[#0C96DF]" />
                    <span>{fc.menu || "Dijital Menü"}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${prefix}/about`}
                    className="text-[#D6EBF5]/85 hover:text-white transition-colors inline-flex items-center gap-1.5 min-h-[40px]"
                  >
                    <ArrowIcon size={13} className="text-[#0C96DF]" />
                    <span>{fc.about || "Hakkımızda"}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${prefix}/contact`}
                    className="text-[#D6EBF5]/85 hover:text-white transition-colors inline-flex items-center gap-1.5 min-h-[40px]"
                  >
                    <ArrowIcon size={13} className="text-[#0C96DF]" />
                    <span>{fc.contact || "Şubeler & İletişim"}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Map Strip */}
          <div className="py-8 border-b border-white/10">
            <RestaurantMap heightClass="h-44 sm:h-52" />
          </div>

          {/* Bottom Colophon Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
            <p className="text-[#D6EBF5]/75 text-xs">
              &copy; {currentYear} Ulaş Balıkçılık (Cihangir &amp; Maslak 1453).{" "}
              {fc.rights || "Tüm Hakları Saklıdır."}
            </p>
            <p className="text-[#90C6DF]/80 text-[10px] tracking-[0.18em] uppercase flex items-center gap-1.5">
              <span>{fc.madeBy || "Tasarım & Geliştirme:"}</span>
              <Link
                href={lang === "tr" ? "/tasarim-gelistirme" : `/${lang}/design-development`}
                className="text-[#D6EBF5] hover:text-white transition-colors underline underline-offset-4 font-semibold"
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

      <ReservationModal isOpen={resOpen} onClose={() => setResOpen(false)} />
    </>
  );
}
