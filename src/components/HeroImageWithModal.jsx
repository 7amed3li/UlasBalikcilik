"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import DishModal from "./DishModal";

export default function HeroImageWithModal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative h-[280px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/30 shadow-xl group cursor-pointer"
        onClick={() => setModalOpen(true)}
        role="button"
        aria-label="View Sultan Mixed Grill Platter details"
      >
        <Image
          src="/images/27-Karisik-Kebap_1.webp"
          alt="Sultan Mixed Grill Platter Kardeşler Cihangir"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804] via-transparent to-transparent"></div>

        {/* Zoom hint overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <ZoomIn size={24} className="text-cream" />
          </div>
        </div>

        <div className="absolute bottom-4 start-4 end-4 p-3.5 sm:p-4 rounded-xl glass-card border border-gold/30 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-cream font-bold text-sm sm:text-base">Sultan&apos;s Mixed Charcoal Feast</h4>
              <p className="text-cream-dim/70 text-xs">Selection of artisan kebabs &amp; fresh home mezes</p>
            </div>
            <span className="text-gold font-black text-base sm:text-lg">1600 ₺</span>
          </div>
        </div>
      </div>

      <DishModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        customName="Sultan's Mixed Charcoal Feast"
        customDesc="The ultimate charcoal feast: Adana kebab, tender lamb cubes, chicken shish, Inegol meatballs & marinated wings served with artisan home mezes. A grand royal spread for 2-3 guests."
        customPrice={1600}
        customImage="/images/27-Karisik-Kebap_1.webp"
        customTags={["signature"]}
        hideCart={true}
      />
    </>
  );
}
