"use client";

import React, { useRef, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { TbChevronLeft as ChevronLeft, TbChevronRight as ChevronRight } from "react-icons/tb";

export default function MenuSelector({ categories, activeCategory, setActiveCategory }) {
  const { menuT } = useAppContext();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-[#F4F9FB]">
      {/* Left fade + arrow */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll(-1)} 
          aria-label="Scroll left"
          className="absolute start-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-r from-[#F4F9FB] via-[#F4F9FB]/80 to-transparent"
        >
          <ChevronLeft size={18} className="text-[#53636E]" />
        </button>
      )}

      {/* Right fade + arrow */}
      {canScrollRight && (
        <button 
          onClick={() => scroll(1)} 
          aria-label="Scroll right"
          className="absolute end-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-l from-[#F4F9FB] via-[#F4F9FB]/80 to-transparent"
        >
          <ChevronRight size={18} className="text-[#53636E]" />
        </button>
      )}

      <div 
        ref={scrollRef}
        className="flex items-center gap-1 px-4 overflow-x-auto no-scrollbar"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="relative shrink-0 px-3.5 py-2.5 my-1"
            >
              <span className={`relative z-10 block text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-colors ${
                isActive ? "text-white" : "text-[#53636E] hover:text-[#2E3B44]"
              }`}>
                {menuT.categories[cat.id] || cat.category.en}
              </span>

              {/* Active pill background */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-md bg-[#06384E] animate-fadeIn"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

