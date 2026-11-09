import React from "react";
import {
  TbGrill,
  TbFish,
  TbBowlSpoon,
  TbSalad,
  TbSoup,
  TbBaguette,
  TbCake,
  TbGlassFull,
  TbStarFilled,
} from "react-icons/tb";
import { PiWavesBold, PiFishSimpleDuotone } from "react-icons/pi";

/**
 * BrandIcons — Ulaş Balıkçılık React Icon Components (`react-icons`)
 */

export function FishLineArt({ className = "text-[#0E4F4A]", size = 24, ...props }) {
  return (
    <PiFishSimpleDuotone
      size={size}
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SeaWaves({ className = "text-[#0E4F4A]", size = 26, ...props }) {
  return (
    <PiWavesBold
      size={size}
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function CategoryIcon({ id, categoryId, className = "text-current", size = 24 }) {
  const resolvedId = id || categoryId;

  switch (resolvedId) {
    case "izgaralar":
      return <TbGrill size={size} className={className} />;
    case "tavalar":
      return <TbFish size={size} className={className} />;
    case "mezeler":
      return <TbBowlSpoon size={size} className={className} />;
    case "salatalar":
      return <TbSalad size={size} className={className} />;
    case "corbalar":
      return <TbSoup size={size} className={className} />;
    case "ekmek_arasi":
      return <TbBaguette size={size} className={className} />;
    case "tatlilar":
      return <TbCake size={size} className={className} />;
    case "icecekler":
      return <TbGlassFull size={size} className={className} />;
    default:
      return <TbFish size={size} className={className} />;
  }
}

export function OttomanSeal({ className = "text-[#0E4F4A]", size = 24, ...props }) {
  return <FishLineArt className={className} size={size} {...props} />;
}

export function KebabSkewer({ className = "text-[#0E4F4A]", size = 20, ...props }) {
  return <FishLineArt className={className} size={size} {...props} />;
}

export function StoneOven({ className = "text-[#F26B45]", size = 20, ...props }) {
  return <SeaWaves className={className} size={size} {...props} />;
}

export function OttomanStar({ className = "text-[#F26B45]", size = 16, ...props }) {
  return (
    <TbStarFilled
      size={size}
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
