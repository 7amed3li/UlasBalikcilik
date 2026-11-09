"use client";

import React from "react";
import { FaAward, FaPepperHot, FaLeaf } from "react-icons/fa6";
import { TbSearch, TbX, TbSparkles } from "react-icons/tb";
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
    { id: "vegan", label: t.vegan || "Vegan", icon: "vegan" },
  ];

  const renderIcon = (type, isActive) => {
    if (type === "star") {
      return (
        <FaAward
          size={14}
          className={`shrink-0 ${isActive ? "text-white" : "text-[#0B2B3B]"}`}
        />
      );
    }
    if (type === "chili") {
      return (
        <FaPepperHot
          size={13}
          className={`shrink-0 ${isActive ? "text-white" : "text-[#D93829]"}`}
        />
      );
    }
    if (type === "vegan") {
      return (
        <TbSparkles
          size={14}
          className={`shrink-0 ${isActive ? "text-white" : "text-[#0E4F4A]"}`}
        />
      );
    }
    return (
      <FaLeaf
        size={13}
        className={`shrink-0 ${isActive ? "text-white" : "text-[#0E4F4A]"}`}
      />
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      {/* Pill Filters Row */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;

          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(isActive ? null : f.id)}
              className={`shrink-0 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-extrabold tracking-wide transition-all cursor-pointer border ${
                isActive
                  ? "bg-gradient-to-r from-[#0B2B3B] to-[#0E4F4A] text-white border-[#0B2B3B] shadow-md"
                  : "bg-[#F4F1E8] border-[#B8DCD3] text-[#18323B] hover:border-[#0E4F4A] shadow-2xs"
              }`}
            >
              {renderIcon(f.icon, isActive)}
              <span>{f.label}</span>
              {isActive && <TbX size={14} className="ms-0.5 opacity-90" />}
            </button>
          );
        })}
      </div>

      {/* Quick Search Input */}
      {typeof setSearchQuery === "function" && (
        <div className="relative w-full sm:w-56 shrink-0">
          <TbSearch
            size={15}
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
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#47626B] hover:text-[#18323B] cursor-pointer"
              aria-label="Clear search"
            >
              <TbX size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
