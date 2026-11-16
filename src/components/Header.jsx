"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { useAppContext } from "../context/AppContext";
import {
  TbMenu2 as List,
  TbHome as House,
  TbBook2 as BookOpen,
  TbInfoCircle as Info,
  TbPhone as Phone,
  TbMapPin as MapPin,
} from "react-icons/tb";

export default function Header() {
  const { t, lang } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  const prefix = lang === "tr" ? "" : `/${lang}`;

  const getNavLabel = (key) => {
    if (key === "home") {
      if (lang === "ar") return "الرئيسية";
      if (lang === "tr") return "Ana Sayfa";
      return t.home || "Home";
    }
    if (key === "menu") {
      if (lang === "ar") return "قائمة الطعام";
      if (lang === "tr") return "Menü";
      return t.menu || "Menu";
    }
    if (key === "about") {
      if (lang === "ar") return "من نحن";
      if (lang === "tr") return "Hakkımızda";
      return t.about || "About Us";
    }
    if (key === "contact") {
      if (lang === "ar") return "الفروع والتواصل";
      if (lang === "tr") return "Şubeler & İletişim";
      return t.contact || "Branches & Contact";
    }
    return "";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Measure the sticky header body height and expose as `--header-height`
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof window === "undefined") return;

    const updateHeight = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-height", `${Math.round(h)}px`);
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    window.addEventListener("resize", updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#006BA6] via-[#0088CC] to-[#1AA3E8] text-white overflow-visible select-none"
    >
      {/* Background Decorative Layer: Topographic Sea Contour Lines + Radial Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-[0.18]"
        >
          <g fill="none" stroke="#FFFFFF" strokeWidth="1.2">
            <path d="M-50,20 C180,90 360,-30 620,55 C820,120 940,30 1060,70" />
            <path d="M-50,55 C200,125 380,5 640,90 C840,155 950,65 1060,105" />
            <path d="M-50,90 C220,160 400,40 660,125 C860,190 960,100 1060,140" />
            <path d="M120,-20 C240,60 480,20 720,110 C880,170 980,95 1050,130" />
            <path d="M350,-10 C430,85 590,45 790,145" />
          </g>
        </svg>

        <div
          className="absolute -top-10 end-12 w-72 h-44 rounded-full opacity-30 blur-2xl"
          style={{
            background: "radial-gradient(circle, #38B6FF 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Header Content */}
      <div className="relative max-w-5xl mx-auto px-3 sm:px-5 pt-2.5 pb-3">
        {/* Top Row: Official Ulaş Balık Logo (`/ulas-logo.jpg`) + ULAŞ BALIKÇILIK | Controls */}
        <div className="flex items-center justify-between gap-2 relative z-20">
          {/* Official Restaurant Logo Icon + Brand Name */}
          <Link
            href={prefix || "/"}
            className="flex items-center gap-2.5 sm:gap-3 hover:opacity-95 transition-opacity shrink-0 group"
          >
            <div className="relative w-12 h-10 sm:w-14 sm:h-11 shrink-0 rounded-xl bg-white border border-white/50 shadow-md overflow-hidden flex items-center justify-center p-1.5">
              <Image
                src="/ulas-fish-icon.png"
                alt="Ulaş Balıkçılık"
                fill
                priority
                unoptimized={true}
                style={{ objectFit: "contain", padding: "2px" }}
                className="transition-transform duration-200 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span
                className="text-lg sm:text-xl font-black text-white tracking-[0.16em] uppercase leading-none drop-shadow-xs"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                ULAŞ
              </span>
              <span
                className="text-[10px] sm:text-[11px] font-bold text-[#EBF4FA] tracking-[0.26em] uppercase mt-1 leading-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                BALIKÇILIK
              </span>
            </div>
          </Link>

          {/* Right Side Dark Translucent Controls (Currency, Language, Menu) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CurrencySwitcher />
            <LanguageSwitcher />

            {/* Hamburger Menu Button */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                  isMenuOpen
                    ? "bg-white border-white text-[#0088CC]"
                    : "bg-white/15 border-white/35 text-white hover:bg-white/25"
                }`}
                aria-label="Menu"
              >
                <List size={20} weight="bold" />
              </button>

              {isMenuOpen && (
                <div className="absolute end-0 mt-2 w-60 rounded-2xl bg-[#F8FBFE] border border-[#C5E1F5] shadow-2xl overflow-hidden z-50 animate-fadeIn text-[#1E2D3D]">
                  <div className="px-4 py-2.5 bg-[#0088CC] text-white flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wider uppercase">
                      Ulaş Balıkçılık
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                      Cihangir &amp; Maslak
                    </span>
                  </div>
                  <div className="py-1.5 flex flex-col">
                    <Link
                      href={prefix || "/"}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-[#1E2D3D] hover:bg-[#EBF4FA] transition-colors"
                    >
                      <House size={18} weight="duotone" className="text-[#0077B6]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("home")}</span>
                    </Link>
                    <Link
                      href={`${prefix}/menu`}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-[#1E2D3D] hover:bg-[#EBF4FA] transition-colors"
                    >
                      <BookOpen size={18} weight="duotone" className="text-[#29ABE2]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("menu")}</span>
                    </Link>
                    <Link
                      href={`${prefix}/about`}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-[#1E2D3D] hover:bg-[#EBF4FA] transition-colors"
                    >
                      <Info size={18} weight="duotone" className="text-[#0077B6]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("about")}</span>
                    </Link>
                    <Link
                      href={`${prefix}/contact`}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-[#1E2D3D] hover:bg-[#EBF4FA] transition-colors"
                    >
                      <Phone size={18} weight="duotone" className="text-[#0077B6]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>
                        {getNavLabel("contact")}
                      </span>
                    </Link>
                    <div className="h-px bg-[#C5E1F5] my-1" />
                    <div className="px-4 py-2 text-[11px] text-[#52667A] flex items-start gap-2">
                      <MapPin size={15} weight="fill" className="text-[#29ABE2] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-[#1E2D3D]">Cihangir &amp; Maslak 1453</div>
                        <div className="text-[10px]">Beyoğlu &amp; Sarıyer / İstanbul</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lower Right: Handwritten Tagline + Detailed Black Sea Fishing Trawler Silhouette */}
        <div className="flex items-end justify-end gap-2 sm:gap-3 mt-0.5 pe-1 relative z-10 pointer-events-none">
          <div
            className="text-[14px] sm:text-[17px] font-semibold text-white/95 leading-[1.05] text-center -rotate-6"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            <div>
              {lang === "ar" ? "خيرات البحر الأسود" : "Karadeniz'in Bereketi"}
            </div>
            <div>{lang === "ar" ? "على مائدتنا" : "Soframızda"}</div>
          </div>

          {/* Black Sea Trawler Silhouette */}
          <svg
            viewBox="0 0 120 50"
            className="w-18 h-8 sm:w-22 sm:h-9 text-[#004A75] shrink-0 translate-y-1"
            aria-hidden="true"
          >
            <path
              d="M0 40 Q25 35 55 39 T120 38 L120 44 L0 44 Z"
              fill="#005585"
              opacity="0.7"
            />
            <path
              d="M52 6 L52 30 M76 10 L76 30 M52 9 L30 29 M52 9 L76 14 M76 12 L98 27 M45 16 L59 16"
              stroke="#00446B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M56 20 H74 L77 29 H54 Z" fill="#00446B" />
            <rect x="60" y="22" width="5" height="3.5" fill="#EBF4FA" opacity="0.85" />
            <rect x="67" y="22" width="5" height="3.5" fill="#EBF4FA" opacity="0.85" />
            <path d="M22 26 L50 29 L96 27 L90 38 L30 38 Z" fill="#00446B" />
            <path
              d="M18 40 Q45 38 75 41 T112 40"
              stroke="#FFFFFF"
              strokeWidth="1"
              fill="none"
              opacity="0.65"
            />
          </svg>
        </div>
      </div>

      {/* Transparent Bottom Wave Overhang */}
      <div className="absolute left-0 right-0 top-full w-full overflow-hidden leading-none pointer-events-none z-30 -mt-px">
        <svg
          viewBox="0 0 1200 44"
          preserveAspectRatio="none"
          className="w-full h-5 sm:h-6 block drop-shadow-xs"
        >
          <defs>
            <linearGradient id="ulasHeaderWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#006BA6" />
              <stop offset="50%" stopColor="#0088CC" />
              <stop offset="100%" stopColor="#1AA3E8" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L1200,0 L1200,34 C1080,42 940,38 740,22 C480,2 240,2 0,24 Z"
            fill="url(#ulasHeaderWaveGrad)"
          />
          <path
            d="M0,24 C240,2 480,2 740,22 C940,38 1080,42 1200,34"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            opacity="0.55"
          />
        </svg>
      </div>
    </header>
  );
}
