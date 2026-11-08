import React from "react";

/**
 * BrandIcons — Ulaş Balıkçılık Custom Line-Art SVG Icon Library
 * Inspired by "Modern Fish Market" & "Black Sea Fisherman's Notebook"
 * Minimalist line drawings (fish, water ripples, category icons) — no heavy nautical clichés.
 */

function getIconDimensions(size, width, height, defaultSize = 24) {
  const w = width || size || defaultSize;
  const h = height || size || defaultSize;
  return { width: w, height: h };
}

// 1. FishLineArt — Minimalist continuous-line fish helper illustration
export function FishLineArt({ className = "text-[#0E4F4A]", size = 24, width, height, ...props }) {
  const dims = getIconDimensions(size, width, height, 24);
  return (
    <svg
      viewBox="0 0 36 20"
      width={dims.width}
      height={dims.height}
      fill="none"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M3 10C7 4.5 15 3 23 6.5C27 8.2 30.5 11.5 33 14.5M33 5.5C30.5 8.5 27 11.8 23 13.5C15 17 7 15.5 3 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 4.2L18 1.5L19.5 4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="9" r="1.3" fill="currentColor" />
      <path
        d="M5 16.5C9 15 13 18 17 16.5C21 15 25 18 29 16.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

// 2. SeaWaves — Gentle water ripple line-art divider/ornament
export function SeaWaves({ className = "text-[#0E4F4A]", size = 28, width, height, ...props }) {
  const dims = getIconDimensions(size, width, height, 28);
  return (
    <svg
      viewBox="0 0 40 16"
      width={dims.width}
      height={dims.height}
      fill="none"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 5C6 2 10 2 14 5C18 8 22 8 26 5C30 2 34 2 38 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M2 11C6 8 10 8 14 11C18 14 22 14 26 11C30 8 34 8 38 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// 3. CategoryIcon — Line-art icons for Ulaş Balıkçılık menu categories
// Accepts either `id` or `categoryId` prop for flexibility
export function CategoryIcon({ id, categoryId, className = "text-current", size = 24 }) {
  const resolvedId = id || categoryId;

  switch (resolvedId) {
    case "izgaralar":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M5 14H23L20.5 21H7.5L5 14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8 14V18M12 14V19M16 14V19M20 14V18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M10 21L8 25M18 21L20 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M10 9C10 7 11.5 6 11.5 4M14 9C14 7 15.5 6 15.5 4M18 9C18 7 19.5 6 19.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "tavalar":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M4 15C8 10 15 9 20 12.5C22.5 14 24.5 16.5 26 18.5M26 11.5C24.5 13.5 22.5 16 20 17.5C15 21 8 20 4 15Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="14" r="1.3" fill="currentColor" />
          <path d="M13 10L15.5 7.5L16.8 10.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mezeler":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M6 16C6 19.5 9.5 22 14 22C18.5 22 22 19.5 22 16H6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="11" cy="13" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15.5" cy="12.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 7C16.5 7 18.5 8.5 19 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "salatalar":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M7 18C7 12 13 7 21 7C21 15 16 21 10 21C8.5 21 7 19.8 7 18Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M7 21L17 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "corbalar":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M5 14H23C23 19 19 22 14 22C9 22 5 19 5 14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 24H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M11 10C11 8.5 12 7.5 12 6M15 10C15 8.5 16 7.5 16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "ekmek_arasi":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M5 13C5 9.5 9 7 14 7C19 7 23 9.5 23 13H5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M4 16C7 14.5 10 17.5 14 16C18 14.5 21 17.5 24 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 19H22C22 21 19 22 14 22C9 22 6 21 6 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "tatlilar":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M6 19L15 8L22 12V19H6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M6 15.5H22" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="15" cy="6" r="1.5" fill="currentColor" />
        </svg>
      );
    case "icecekler":
      return (
        <svg viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
          <path d="M8 9H20L18.5 23H9.5L8 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M14 9V5L18 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 14H19" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    default:
      return <FishLineArt className={className} size={size} />;
  }
}

// Legacy aliases mapped to coastal line-art so existing imports continue working cleanly
export function OttomanSeal({ className = "text-[#0E4F4A]", size = 24, width, height, ...props }) {
  return <FishLineArt className={className} size={size} width={width} height={height} {...props} />;
}

export function KebabSkewer({ className = "text-[#0E4F4A]", size = 20, width, height, ...props }) {
  return <FishLineArt className={className} size={size} width={width} height={height} {...props} />;
}

export function StoneOven({ className = "text-[#F26B45]", size = 20, width, height, ...props }) {
  return <SeaWaves className={className} size={size} width={width} height={height} {...props} />;
}

export function OttomanStar({ className = "text-[#F26B45]", size = 16, width, height, ...props }) {
  const dims = getIconDimensions(size, width, height, 16);
  return (
    <svg
      viewBox="0 0 24 24"
      width={dims.width}
      height={dims.height}
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 2l2.4 5.6L20 10l-4.4 4.4L17 20l-5-3.2L7 20l1.4-5.6L4 10l5.6-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
