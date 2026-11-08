import React from "react";

export default function FoodCardSkeleton({ isVertical = false }) {
  return (
    <div
      className={`bg-[#F4F1E8] rounded-2xl p-2.5 border border-[#B8DCD3] overflow-hidden relative animate-pulse ${
        isVertical ? "flex flex-col h-[340px]" : "flex gap-3 items-stretch min-h-[128px]"
      }`}
    >
      {/* Image Skeleton */}
      <div
        className={`bg-[#0B2B3B]/15 rounded-xl relative overflow-hidden shrink-0 border border-[#B8DCD3]/60 ${
          isVertical ? "w-full h-44 mb-3" : "w-[136px] sm:w-[162px]"
        }`}
      />

      {/* Details Skeleton */}
      <div className="flex-1 min-w-0 py-1.5 pe-1.5 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 bg-[#DCECE7] rounded-md w-16" />
          <div className="h-4 bg-[#0B2B3B]/15 rounded-md w-3/4" />
          <div className="h-3 bg-[#47626B]/15 rounded-md w-full" />
        </div>

        <div className="pt-2 flex items-center justify-end">
          <div className="w-9 h-9 rounded-xl bg-[#D93829]/20" />
        </div>
      </div>
    </div>
  );
}
