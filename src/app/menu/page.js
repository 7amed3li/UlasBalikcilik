"use client";

import React, { useState, useRef, useEffect } from "react";
import { menuData } from "@/data/menuData";
import FoodCard from "@/components/FoodCard";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import dynamic from "next/dynamic";
const SmartFilters = dynamic(() => import("@/components/SmartFilters"), { ssr: false });
const DishModal = dynamic(() => import("@/components/DishModal"), { ssr: false });
import { CaretRight } from "@phosphor-icons/react";
import { CategoryIcon } from "@/components/BrandIcons";
import { trackViewItemList } from "@/lib/analytics";

// ─── Ulaş Balıkçılık Signature "GÜNÜN AVI" Showcase ───
const featuredDishes = [
  {
    id: "levrek_izgara",
    menuItemId: "levrek_izgara",
    categoryId: "izgaralar",
    image: null,
  },
  {
    id: "midye_dolma",
    menuItemId: "midye_dolma",
    categoryId: "mezeler",
    image: null,
  },
  {
    id: "hamsili_pilav",
    menuItemId: "hamsili_pilav",
    categoryId: "tavalar",
    image: null,
  },
  {
    id: "cipura_izgara",
    menuItemId: "cipura_izgara",
    categoryId: "izgaralar",
    image: null,
  },
  {
    id: "kalamar_tava",
    menuItemId: "kalamar_tava",
    categoryId: "tavalar",
    image: null,
  },
  {
    id: "hamsi_tava",
    menuItemId: "hamsi_tava",
    categoryId: "tavalar",
    image: null,
  },
  {
    id: "fener_kavurma",
    menuItemId: "fener_kavurma",
    categoryId: "tavalar",
    image: null,
  },
  {
    id: "jumbo_karides",
    menuItemId: "jumbo_karides",
    categoryId: "izgaralar",
    image: null,
  },
  {
    id: "balik_corbasi",
    menuItemId: "balik_corbasi",
    categoryId: "corbalar",
    image: null,
  },
  {
    id: "sicak_helva",
    menuItemId: "sicak_helva",
    categoryId: "tatlilar",
    image: null,
  },
];

function FeaturedDishesShowcase({ onExplore }) {
  const { lang, menuT } = useAppContext();
  const activeLang = lang || "tr";
  const [selectedDish, setSelectedDish] = useState(null);

  const getSectionTitle = () => {
    if (activeLang === "ar") return "صيد اليوم";
    if (activeLang === "tr") return "GÜNÜN AVI";
    if (activeLang === "fa") return "صید روز";
    if (activeLang === "ru") return "УЛОВ ДНЯ";
    return "CATCH OF THE DAY";
  };

  const getSubtitle = () => {
    if (activeLang === "ar") return "أشهى أطباق البحر الأسود الطازجة";
    if (activeLang === "tr") return "Karadeniz'den en taze lezzetler";
    return "Freshest flavors from the Black Sea";
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F1E8] border-b border-[#B8DCD3]/70 pt-6 sm:pt-7 pb-3.5 shadow-2xs">
      <div className="max-w-5xl mx-auto px-3 sm:px-5">
        {/* Header Row: GÜNÜN AVI + Coral Brush Stroke on Left, Subtitle + Chevron on Right */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <h2
              className="text-base sm:text-lg font-black text-[#0B2B3B] tracking-wide uppercase"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {getSectionTitle()}
            </h2>
            {/* Coral Red Brush Stroke SVG matching reference */}
            <svg
              viewBox="0 0 64 10"
              className="w-12 sm:w-14 h-2.5 text-[#D93829] fill-current"
              aria-hidden="true"
            >
              <path d="M2,7 C18,2 42,1 62,5 C45,8 20,9 2,7 Z" />
            </svg>
          </div>

          <button
            type="button"
            onClick={onExplore}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#47626B] hover:text-[#0B2B3B] transition-colors cursor-pointer"
          >
            <span>{getSubtitle()}</span>
            <CaretRight size={13} weight="bold" className="text-[#0B2B3B]" />
          </button>
        </div>

        {/* Circular Plates Row matching reference */}
        <div className="flex overflow-x-auto gap-3.5 sm:gap-5 no-scrollbar pb-1 px-0.5 snap-x snap-mandatory">
          {featuredDishes.map((dish) => {
            const fullItem = menuData
              .flatMap((c) => c.items || [])
              .find((i) => i.id === dish.menuItemId);
            const itemImage = fullItem?.image || dish.image;
            const translatedName =
              menuT?.items?.[dish.menuItemId]?.name ||
              fullItem?.name?.[activeLang] ||
              fullItem?.name?.tr ||
              "Özel Seçim";
            const translatedDesc =
              menuT?.items?.[dish.menuItemId]?.desc ||
              fullItem?.description?.[activeLang] ||
              fullItem?.description?.tr ||
              "";

            return (
              <button
                type="button"
                key={dish.id}
                className="relative flex flex-col items-center shrink-0 cursor-pointer group w-[80px] sm:w-[92px] snap-center text-center focus:outline-none"
                onClick={() =>
                  setSelectedDish({
                    ...dish,
                    fullItem,
                    translatedName,
                    translatedDesc,
                    itemImage,
                  })
                }
              >
                {/* Ceramic Plate Circle Frame */}
                <div className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] rounded-full p-1 bg-white border border-[#B8DCD3] shadow-md group-hover:border-[#0E4F4A] transition-all">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#12384B] via-[#0E4F4A] to-[#0B2B3B] border border-[#DCECE7] flex flex-col items-center justify-center">
                    {itemImage ? (
                      <Image
                        src={itemImage}
                        alt={translatedName}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 640px) 76px, 88px"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Ceramic Plate Rim + Coastal Icon Slot */
                      <div className="w-[84%] h-[84%] rounded-full border border-dashed border-[#B8DCD3]/45 flex flex-col items-center justify-center text-[#F4F1E8] group-hover:scale-110 transition-transform">
                        <CategoryIcon
                          id={dish.categoryId}
                          size={28}
                          className="text-[#F4F1E8] drop-shadow-xs"
                        />
                        {/* Lemon slice accent dot */}
                        <span className="w-2.5 h-1.5 rounded-full bg-[#F5C242] mt-0.5 opacity-90" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Dish Name Underneath */}
                <span
                  className="text-[11px] sm:text-xs text-center font-extrabold text-[#0B2B3B] leading-tight mt-1.5 group-hover:text-[#0E4F4A] transition-colors line-clamp-1 w-full"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  {translatedName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal for Featured Dish */}
      {selectedDish && (
        <DishModal
          isOpen={true}
          setIsOpen={() => setSelectedDish(null)}
          item={
            selectedDish.fullItem || {
              id: selectedDish.menuItemId,
              image: selectedDish.itemImage,
            }
          }
          customName={selectedDish.translatedName}
          customDesc={selectedDish.translatedDesc}
          customImage={selectedDish.itemImage}
        />
      )}
    </section>
  );
}

/**
 * Unified Category Navigation Bar matching `media_1794142386195_ac1f9251.jpg`
 */
function MenuCategoryBar({ categories, activeCategory, setActiveCategory }) {
  const { menuT } = useAppContext();
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector(`[data-cat="${activeCategory}"]`);
    if (activeBtn) {
      const containerRect = el.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const offset =
        btnRect.left - containerRect.left - containerRect.width / 2 + btnRect.width / 2;
      el.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div className="w-full pt-5 sm:pt-6 pb-1.5">
      <div className="max-w-5xl mx-auto px-3 sm:px-5">
        {/* Single Unified Ivory Bar */}
        <div
          ref={scrollRef}
          className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-1 shadow-sm flex items-stretch overflow-x-auto no-scrollbar gap-1"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                data-cat={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative shrink-0 flex flex-col items-center justify-center gap-1 min-w-[74px] sm:min-w-[96px] py-2.5 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-b from-[#0E4F4A] to-[#0B2B3B] text-white shadow-sm"
                    : "bg-transparent text-[#0B2B3B] hover:bg-[#DCECE7]/60"
                }`}
              >
                <CategoryIcon
                  id={cat.id}
                  size={25}
                  className={isActive ? "text-white" : "text-[#0B2B3B]"}
                />

                <span
                  className={`text-[11px] sm:text-xs font-extrabold text-center leading-tight whitespace-nowrap ${
                    isActive ? "text-white" : "text-[#18323B]"
                  }`}
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  {menuT?.categories?.[cat.id] || cat.category.tr || cat.category.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, lang, menuT } = useAppContext();
  const menuSectionRef = useRef(null);

  // Restore state from URL hash on first mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const [catPart, queryPart] = hash.split("?");
    const catId = catPart?.trim();
    if (catId && menuData.find((c) => c.id === catId)) {
      setActiveCategory(catId);
    }
    if (queryPart) {
      const params = new URLSearchParams(queryPart);
      const filter = params.get("filter");
      if (filter) setActiveFilter(filter);
    }
  }, []);

  // Persist state to URL hash whenever it changes
  useEffect(() => {
    const hash = activeFilter
      ? `${activeCategory}?filter=${activeFilter}`
      : activeCategory;
    const url = `${window.location.pathname}${window.location.search}#${hash}`;
    window.history.replaceState(null, "", url);
  }, [activeCategory, activeFilter]);

  const scrollToMenu = () => {
    if (!menuSectionRef.current || typeof window === "undefined") return;
    const headerOffset =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height") || "88",
        10
      ) || 88;
    const rect = menuSectionRef.current.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - headerOffset;
    if (Math.abs(window.scrollY - targetY) > 12) {
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setActiveFilter(null);
    scrollToMenu();
  };

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    const category = menuData.find((c) => c.id === activeCategory);
    if (category && category.items) {
      const itemsToTrack = category.items
        .filter((item) => {
          if (!activeFilter) return true;
          return item.tags?.includes(activeFilter);
        })
        .map((item) => ({
          ...item,
          category: activeCategory,
        }));
      trackViewItemList(itemsToTrack, activeCategory);
    }
  }, [activeCategory, activeFilter]);

  return (
    <div className="bg-[#DCE8E6] min-h-screen text-[#18323B] font-sans">
      {/* ═══════════════════════════════════════════
          GÜNÜN AVI — COMPACT HORIZONTAL STRIP
          ═══════════════════════════════════════════ */}
      <FeaturedDishesShowcase
        onExplore={scrollToMenu}
        onSelectCategory={handleCategorySelect}
      />

      {/* Anchor right above sticky bar */}
      <div ref={menuSectionRef} className="h-0 w-full" />

      {/* ═══════════════════════════════════════════
          STICKY CATEGORY TABS & SMART FILTERS
          Uses dynamic `top: var(--header-height, 88px)` so it docks
          cleanly right under the curved header wave without ever clipping!
          ═══════════════════════════════════════════ */}
      <div
        style={{ top: "var(--header-height, 88px)" }}
        className="sticky z-30 bg-[#DCE8E6]/95 backdrop-blur-md pb-2.5 border-b border-[#B8DCD3]/50 shadow-2xs transition-[top] duration-150"
      >
        <MenuCategoryBar
          categories={menuData}
          activeCategory={activeCategory}
          setActiveCategory={handleCategorySelect}
        />

        {/* Smart Filters Pills */}
        <div className="max-w-5xl mx-auto px-3 sm:px-5 pt-1">
          <SmartFilters
            activeFilter={activeFilter}
            setActiveFilter={handleFilterSelect}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MENU ITEMS LIST (Single-Column Mobile, 2-Column Desktop)
          ═══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 py-3.5 pb-14 min-h-[55vh]">
        {menuData.map((category) => {
          if (activeCategory !== category.id && !searchQuery.trim()) return null;

          const filteredItems = category.items.filter((item) => {
            if (activeFilter && !item.tags?.includes(activeFilter)) return false;
            if (searchQuery.trim()) {
              const q = searchQuery.trim().toLowerCase();
              const trName = (item.name?.tr || "").toLowerCase();
              const enName = (item.name?.en || "").toLowerCase();
              const locName = (menuT?.items?.[item.id]?.name || "").toLowerCase();
              const locDesc = (menuT?.items?.[item.id]?.desc || "").toLowerCase();
              return (
                trName.includes(q) ||
                enName.includes(q) ||
                locName.includes(q) ||
                locDesc.includes(q)
              );
            }
            return true;
          });

          if (searchQuery.trim() && filteredItems.length === 0) return null;

          return (
            <div key={category.id} className="mb-6 last:mb-0 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {filteredItems.filter((item) => item && item.id).length > 0 ? (
                  filteredItems
                    .filter((item) => item && item.id)
                    .map((item, index) => (
                      <FoodCard
                        key={item.id}
                        item={item}
                        categoryId={category.id}
                        index={index}
                      />
                    ))
                ) : (
                  <div className="col-span-full py-16 text-center bg-[#F4F1E8] rounded-2xl border border-[#B8DCD3]">
                    <p className="text-[#47626B] font-semibold tracking-wide">
                      {t?.noResults ||
                        (lang === "ar"
                          ? "لا توجد أطباق تطابق الفلتر المحدد."
                          : lang === "tr"
                          ? "Seçilen filtreye uygun ürün bulunamadı."
                          : "No dishes match the selected filter.")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
