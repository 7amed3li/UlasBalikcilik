import React from "react";
import FoodCardSkeleton from "@/components/FoodCardSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#EBF4FA] text-[#1E2D3D] p-4 space-y-6 animate-fadeIn">
      {/* Category & Filter Skeleton */}
      <div className="max-w-5xl mx-auto pt-4 space-y-3">
        <div className="w-full h-16 bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl animate-pulse" />
        <div className="flex gap-2">
          <div className="w-32 h-9 bg-[#F8FBFE] border border-[#C5E1F5] rounded-full animate-pulse" />
          <div className="w-24 h-9 bg-[#F8FBFE] border border-[#C5E1F5] rounded-full animate-pulse" />
          <div className="w-28 h-9 bg-[#F8FBFE] border border-[#C5E1F5] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Menu Cards Skeletons */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <FoodCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
