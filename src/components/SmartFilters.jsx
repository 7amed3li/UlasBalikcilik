"use client";

import React from "react";
import { X, Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function SmartFilters({
  activeFilter,
  setActiveFilter,
  searchQuery = "",
  setSearchQuery,
}) {
  const { t } = useAppContext();

  const filters = [
    { id: "signature", label: t.signature || "Şefin Seçimi", icon: "star" },
    { id: "spicy", label: t.spicy || "Acılı", icon: "chili" },
    { id: "vegetarian", label: t.vegetarian || "Vejetaryen", icon: "leaf" },
    { id: "vegan", label: t.vegan || "Vegan", icon: "leaf" },
  ];

  const renderIcon = (type, isActive) => {
    if (type === "star") {
      return (
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 shrink-0 fill-current ${isActive ? "text-white" : "text-[#0B2B3B]"
            }`}
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
        </svg>
      );
    }
    if (type === "chili") {
      return (
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 shrink-0 fill-current ${isActive ? "text-white" : "text-[#D93829]"
            }`}
        >
          <path d="M17.5 4.5c1.5 0 2.5 1 2.5 2.5 0 5.5-5.5 12-13.5 13.5-1.5.3-2.5-.7-2-2 1.5-3.5 5.5-5.5 9-9 1.2-1.2 2-3 4-5z" />
          <path
            d="M19 3l2-1.5"
            stroke={isActive ? "#FFFFFF" : "#1E6B43"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 24 24"
        className={`w-4 h-4 shrink-0 fill-current ${isActive ? "text-white" : "text-[#0E4F4A]"
          }`}
      >
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      {/* Large Pill Filters Row matching `media_1794142386195_ac1f9251.jpg` */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;

          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(isActive ? null : f.id)}
              className={`shrink-0 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-extrabold tracking-wide transition-all cursor-pointer border ${isActive
                ? "bg-gradient-to-r from-[#0B2B3B] to-[#0E4F4A] text-white border-[#0B2B3B] shadow-md"
                : "bg-[#F4F1E8] border-[#B8DCD3] text-[#18323B] hover:border-[#0E4F4A] shadow-2xs"
                }`}
            >
              {renderIcon(f.icon, isActive)}
              <span>{f.label}</span>
              {isActive && <X size={13} className="ms-0.5 opacity-90" />}
            </button>
          );
        })}
      </div>

      {/* Quick Search Input */}
      {typeof setSearchQuery === "function" && (
        <div className="relative w-full sm:w-52 shrink-0">
          <Search
            size={14}
            className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#47626B] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder || "Menüde ara..."}
            className="w-full ps-9 pe-7 py-2 rounded-full bg-[#F4F1E8] border border-[#B8DCD3] text-xs font-bold text-[#18323B] placeholder:text-[#47626B]/75 focus:outline-none focus:border-[#0E4F4A] shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#47626B] hover:text-[#18323B]"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
