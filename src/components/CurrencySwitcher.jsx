"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  TbChevronDown,
  TbCheck,
  TbCurrencyLira,
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyPound,
} from "react-icons/tb";
import { FaRubleSign } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";
import SaudiRiyalIcon from "./SaudiRiyalIcon";
export { SaudiRiyalIcon };

export default function CurrencySwitcher() {
  const { currency, changeCurrency } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { code: "TRY", label: "Türk Lirası", icon: <TbCurrencyLira size={15} /> },
    { code: "USD", label: "US Dollar", icon: <TbCurrencyDollar size={15} /> },
    { code: "EUR", label: "Euro", icon: <TbCurrencyEuro size={15} /> },
    { code: "GBP", label: "British Pound", icon: <TbCurrencyPound size={15} /> },
    { code: "SAR", label: "ريال سعودي", icon: <SaudiRiyalIcon className="h-3.5 w-auto" /> },
    { code: "RUB", label: "Российский рубль", icon: <FaRubleSign size={12} /> },
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
            ? "bg-white border-white text-[#0C96DF]"
            : "bg-white/15 border-white/35 text-white hover:bg-white/25"
        }`}
      >
        <span className={isOpen ? "text-[#0C96DF] flex items-center" : "text-white flex items-center"}>{currentCurrencyObj.icon}</span>
        <span className={`tracking-wider font-extrabold ${isOpen ? "text-[#0C96DF]" : "text-white"}`}>{currency}</span>
        <TbChevronDown
          size={13}
          className={`transition-transform duration-200 text-white/80 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl overflow-hidden shadow-2xl z-50 end-0 p-1.5 animate-fadeIn text-[#2E3B44]">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#0C96DF] font-extrabold border-b border-[#D6EBF5]">
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
                  className={`w-full text-start px-3 py-2 text-xs rounded-xl font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-[#0C96DF] text-white font-bold"
                      : "text-[#2E3B44] hover:bg-[#E7F3F9]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-5 rounded-md flex items-center justify-center font-bold text-xs border ${
                        isSelected
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-white text-[#0C96DF] border-[#D6EBF5]"
                      }`}
                    >
                      {c.icon}
                    </span>
                    <span className="font-bold">{c.code}</span>
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
