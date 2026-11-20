"use client";

import React from "react";
import { FaAward, FaPepperHot, FaLeaf, FaSeedling } from "react-icons/fa6";
import { TbSearch, TbX } from "react-icons/tb";
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
          className={`shrink-0 ${isActive ? "text-white" : "text-[#2E3B44]"}`}
        />
      );
    }
    if (type === "chili") {
      return (
        <FaPepperHot
          size={13}
          className={`shrink-0 ${isActive ? "text-white" : "text-[#0C96DF]"}`}
        />
      );
    }
    if (type === "vegan") {
      return (
        <FaSeedling
          size={13}
          className={`shrink-0 ${isActive ? "text-white" : "text-[#0C96DF]"}`}
        />
      );
    }
    return (
      <FaLeaf
        size={13}
        className={`shrink-0 ${isActive ? "text-white" : "text-[#0C96DF]"}`}
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
              className={`shrink-0 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-extrabold tracking-wide transition-all cursor-pointer border ${isActive
                  ? "bg-[#0C96DF] hover:bg-[#104760] text-white border-[#2E3B44] shadow-md"
                  : "bg-[#F4F9FB] border-[#D6EBF5] text-[#2E3B44] hover:border-[#0C96DF] shadow-2xs"
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
            className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#53636E] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder || "Menüde ara..."}
            className="w-full ps-9 pe-7 py-2 rounded-full bg-[#F4F9FB] border border-[#D6EBF5] text-xs font-bold text-[#2E3B44] placeholder:text-[#53636E]/75 focus:outline-none focus:border-[#0C96DF] shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#53636E] hover:text-[#2E3B44] cursor-pointer"
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
