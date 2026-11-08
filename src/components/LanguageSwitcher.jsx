"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check, Globe } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const languagesConfig = [
  { code: "tr", name: "Türkçe", short: "TR", flag: "🇹🇷" },
  { code: "en", name: "English", short: "EN", flag: "🇬🇧" },
  { code: "ar", name: "العربية", short: "AR", flag: "🇸🇦" },
  { code: "ru", name: "Русский", short: "RU", flag: "🇷🇺" },
  { code: "fa", name: "فارسی", short: "FA", flag: "🇮🇷" },
  { code: "fr", name: "Français", short: "FR", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "it", name: "Italiano", short: "IT", flag: "🇮🇹" },
  { code: "es", name: "Español", short: "ES", flag: "🇪🇸" },
  { code: "zh", name: "中文", short: "ZH", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const { lang, changeLang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentLangObj = languagesConfig.find((l) => l.code === lang) || languagesConfig[0];

  const selectLang = (code) => {
    changeLang(code);
    setIsOpen(false);

    if (!pathname) return;

    const parts = pathname.split("/").filter(Boolean);
    const knownLocales = ["ar", "tr", "ru", "fa", "fr", "de", "it", "es", "zh", "en"];

    if (parts.length > 0 && knownLocales.includes(parts[0])) {
      parts.shift();
    }

    const routeWithoutLocale = `/${parts.join("/")}`;
    const isDevProfile =
      routeWithoutLocale === "/tasarim-gelistirme" || routeWithoutLocale === "/design-development";
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";

    let targetUrl;
    if (isDevProfile) {
      targetUrl = code === "tr" ? "/tasarim-gelistirme" : `/${code}/design-development`;
    } else if (
      routeWithoutLocale === "/about" ||
      routeWithoutLocale === "/contact" ||
      routeWithoutLocale.startsWith("/dish/")
    ) {
      targetUrl = routeWithoutLocale;
    } else {
      if (code === "tr") {
        targetUrl = routeWithoutLocale === "/" ? "/" : routeWithoutLocale;
      } else {
        targetUrl = routeWithoutLocale === "/" ? `/${code}` : `/${code}${routeWithoutLocale}`;
      }
    }

    if (currentHash) {
      targetUrl = `${targetUrl}${currentHash}`;
    }

    if (pathname + currentHash !== targetUrl) {
      router.push(targetUrl);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Selected Language: ${currentLangObj.name}`}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border transition-colors h-9 sm:h-10 text-xs font-bold cursor-pointer ${
          isOpen
            ? "bg-[#0E394D] border-[#8CC7C0]/70 text-white"
            : "bg-[#092230]/70 border-[#6CA6A1]/45 text-white hover:bg-[#0E394D]/80"
        }`}
      >
        <span className="text-[10px] font-black text-white">{currentLangObj.short}</span>
        <span className="tracking-wider font-semibold text-white/95">{currentLangObj.short}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 text-white/80 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 end-0 w-48 bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 animate-fadeIn text-[#18323B]">
          <div className="px-3 py-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#0E4F4A] font-bold border-b border-[#B8DCD3]">
            <span className="flex items-center gap-1">
              <Globe size={11} className="text-[#0E4F4A]" />
              Dil / Language
            </span>
          </div>

          <div className="py-1 space-y-0.5 max-h-72 overflow-y-auto">
            {languagesConfig.map((item) => {
              const isSelected = lang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => selectLang(item.code)}
                  className={`w-full px-3 py-2 text-xs rounded-xl font-medium transition-colors flex items-center justify-between gap-2 text-start cursor-pointer ${
                    isSelected
                      ? "bg-[#0E4F4A] text-white font-bold"
                      : "text-[#18323B] hover:bg-[#DCECE7]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  {isSelected && <Check size={14} className="text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
