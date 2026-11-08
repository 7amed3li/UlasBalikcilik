"use client";

import React from "react";

/**
 * Fixed Bottom Coastal Wave Ribbon matching `media_1794143364186_a24d3f6d.jpg`
 * Stays pinned to the bottom of the viewport with a sleek, compact height,
 * calligraphic "Aynı Denizden / Daha Güzel Yarınlara" text, flowing turquoise wave strokes,
 * subtle fish-scale watermark, and "Karadeniz Ruhu, Gerçek Lezzet" on the right.
 */
export default function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 w-full pointer-events-none select-none">
      <div className="max-w-5xl mx-auto w-full">
        {/* Smooth Asymmetric S-Curve Top Wave Edge */}
        <div className="relative w-full leading-none -mb-px">
          <svg
            viewBox="0 0 1200 42"
            preserveAspectRatio="none"
            className="w-full h-3.5 sm:h-4 block drop-shadow-[0_-2px_6px_rgba(7,29,43,0.18)]"
          >
            {/* Subtle Light Sea-Glass Rim Highlight */}
            <path
              d="M0,26 C210,3 440,2 670,22 C880,39 1050,9 1200,18 L1200,42 L0,42 Z"
              fill="#8CC7C0"
              opacity="0.45"
            />
            {/* Deep Black Sea Navy Wave Body */}
            <path
              d="M0,29 C210,6 440,5 670,25 C880,42 1050,12 1200,21 L1200,42 L0,42 Z"
              fill="#08283B"
            />
          </svg>
        </div>

        {/* Compact Dark Navy Banner Body */}
        <div className="relative bg-gradient-to-r from-[#072131] via-[#092C40] to-[#082537] text-[#F4F1E8] px-3.5 sm:px-6 pt-0.5 pb-2 sm:pb-2.5 overflow-hidden shadow-2xl">
          {/* Subtle Scallop / Fish-Scale Pattern Watermark */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="ulas-sticky-scales"
                width="30"
                height="18"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 18 A15 15 0 0 1 30 18 M-15 9 A15 15 0 0 1 15 9 M15 9 A15 15 0 0 1 45 9"
                  fill="none"
                  stroke="#8CC7C0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ulas-sticky-scales)" />
          </svg>

          <div className="relative z-10 flex items-center justify-between gap-2">
            {/* Left Side: Tilted Handwritten Text + Flowing Turquoise Wave Strokes */}
            <div className="flex items-center min-w-0">
              <div
                className="text-[16px] sm:text-[19px] font-semibold text-[#CBE6E0] leading-[0.98] -rotate-5 origin-bottom-left tracking-wide shrink-0"
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                }}
              >
                <div>Aynı Denizden</div>
                <div className="ps-2.5 text-white">Daha Güzel Yarınlara</div>
              </div>

              {/* Crisp Calligraphic Turquoise Wave Ribbons */}
              <svg
                viewBox="0 0 180 38"
                className="w-24 sm:w-32 h-6 sm:h-7 -ms-3 sm:-ms-4 mt-1.5 shrink-0"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18 28 C52 16, 88 19, 124 8 C142 3, 158 4, 174 8"
                  stroke="#42B0BA"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M2 34 C38 24, 74 18, 110 15 C135 13, 156 5, 178 10 C156 12, 136 21, 108 22 C72 24, 36 29, 2 34 Z"
                  fill="#2B8E9E"
                />
                <path
                  d="M16 36 C54 26, 92 31, 134 17 C148 13, 162 12, 174 15"
                  stroke="#63C5CD"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>
            </div>

            {/* Right Side: Crisp Tagline */}
            <div
              className="text-[10.5px] sm:text-xs font-medium text-[#E6F2EF]/95 tracking-wide text-end shrink-0"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Karadeniz Ruhu, Gerçek Lezzet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
