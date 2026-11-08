"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import SaudiRiyalIcon from "./SaudiRiyalIcon";
export { SaudiRiyalIcon };

export default function CurrencySwitcher() {
  const { currency, changeCurrency } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { code: "TRY", label: "Türk Lirası", symbol: "₺" },
    { code: "USD", label: "US Dollar", symbol: "$" },
    { code: "EUR", label: "Euro", symbol: "€" },
    { code: "GBP", label: "British Pound", symbol: "£" },
    { code: "SAR", label: "ريال سعودي", symbol: <SaudiRiyalIcon className="h-3.5 w-auto" /> },
    { code: "RUB", label: "Российский рубль", symbol: "₽" },
  ];

  const currentCurrencyObj = currencies.find((c) => c.code === currency) || currencies[0];

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
        aria-label={`Current Currency: ${currency}`}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border transition-colors h-9 sm:h-10 text-xs font-bold cursor-pointer ${
          isOpen
            ? "bg-[#0E394D] border-[#8CC7C0]/70 text-white"
            : "bg-[#092230]/70 border-[#6CA6A1]/45 text-white hover:bg-[#0E394D]/80"
        }`}
      >
        <span className="text-white font-extrabold">{currentCurrencyObj.symbol}</span>
        <span className="tracking-wider text-white/95">{currency}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 text-white/80 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl overflow-hidden shadow-2xl z-50 end-0 p-1.5 animate-fadeIn text-[#18323B]">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#0E4F4A] font-bold border-b border-[#B8DCD3]">
            Döviz / Currency
          </div>
          <div className="py-1 space-y-0.5">
            {currencies.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    changeCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-start px-3 py-2 text-xs rounded-xl font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer ${isSelected
                    ? "bg-[#0E4F4A] text-white font-bold"
                    : "text-[#18323B] hover:bg-[#DCECE7]"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs border ${isSelected
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-white text-[#0E4F4A] border-[#B8DCD3]"
                        }`}
                    >
                      {c.symbol}
                    </span>
                    <span className="font-semibold">{c.code}</span>
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
