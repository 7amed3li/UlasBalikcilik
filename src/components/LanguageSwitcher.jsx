"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TbWorld, TbChevronDown, TbCheck } from "react-icons/tb";
import { useAppContext } from "../context/AppContext";

const languagesConfig = [
  { code: "tr", name: "Türkçe", short: "TR", region: "TR" },
  { code: "en", name: "English", short: "EN", region: "GB" },
  { code: "ar", name: "العربية", short: "AR", region: "SA" },
  { code: "ru", name: "Русский", short: "RU", region: "RU" },
  { code: "fa", name: "فارسی", short: "FA", region: "IR" },
  { code: "fr", name: "Français", short: "FR", region: "FR" },
  { code: "de", name: "Deutsch", short: "DE", region: "DE" },
  { code: "it", name: "Italiano", short: "IT", region: "IT" },
  { code: "es", name: "Español", short: "ES", region: "ES" },
  { code: "zh", name: "中文", short: "ZH", region: "CN" },
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
        <TbWorld size={15} className="text-[#8CC7C0]" />
        <span className="tracking-wider font-extrabold text-white/95">
          {currentLangObj.short}
        </span>
        <TbChevronDown
          size={13}
          className={`transition-transform duration-200 text-white/80 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 end-0 w-48 bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 animate-fadeIn text-[#18323B]">
          <div className="px-3 py-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#0E4F4A] font-extrabold border-b border-[#B8DCD3]">
            <span className="flex items-center gap-1.5">
              <TbWorld size={13} className="text-[#0E4F4A]" />
              <span>Dil / Language</span>
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
                    <span
                      className={`w-6 h-5 rounded-md text-[10px] font-extrabold flex items-center justify-center border ${
                        isSelected
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-white text-[#0E4F4A] border-[#B8DCD3]"
                      }`}
                    >
                      {item.short}
                    </span>
                    <span className="font-bold">{item.name}</span>
                  </div>
                  {isSelected && <TbCheck size={15} className="text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
