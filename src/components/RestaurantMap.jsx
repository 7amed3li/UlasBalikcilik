"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ULAS_CONFIG } from "../data/ulasConfig";

export default function RestaurantMap({
  heightClass = "h-48 sm:h-56",
  className = "mb-8",
  showDirectionsButton = false,
}) {
  const { lang, language } = useAppContext();
  const currentLang = lang || language || "tr";
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const mapRef = useRef(null);

  const cihangir = ULAS_CONFIG.branches.cihangir;
  const googleMapsUrl = cihangir.mapUrl;
  const primaryEmbedUrl = cihangir.mapEmbedUrl;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "400px",
        threshold: 0,
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      setIsMapVisible(true);
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleIframeError = useCallback(() => {
    setIframeFailed(true);
  }, []);

  const labels = {
    tr: {
      openMaps: "Haritalar'da Aç",
      restaurantName: "Ulaş Balıkçılık — Cihangir",
      address: "Kuloğlu, Liva Sk. No: 15/A, Beyoğlu",
      plusCode: "2XMJ+5X Beyoğlu • Maslak 1453",
      getDirections: "Cihangir Şube Yol Tarifi",
      loading: "Harita Yükleniyor...",
      tapToOpen: "Haritayı açmak için dokunun",
    },
    en: {
      openMaps: "Open in Maps",
      restaurantName: "Ulaş Balıkçılık — Cihangir",
      address: "Kuloğlu, Liva Sk. No: 15/A, Beyoğlu",
      plusCode: "2XMJ+5X Beyoğlu • Maslak 1453",
      getDirections: "Directions to Cihangir Branch",
      loading: "Loading Map...",
      tapToOpen: "Tap to open map",
    },
    ar: {
      openMaps: "افتح في الخرائط",
      restaurantName: "Ulaş Balıkçılık — جيهانغير",
      address: "Kuloğlu, Liva Sk. No: 15/A, Beyoğlu",
      plusCode: "فرع جيهانغير • وفرع مسلك 1453",
      getDirections: "الاتجاهات إلى فرع جيهانغير",
      loading: "جاري تحميل الخريطة...",
      tapToOpen: "انقر لفتح الخريطة",
    },
  };

  const currentLabels = labels[currentLang] || labels.en;

  return (
    <div className={`w-full ${className}`}>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        ref={mapRef}
        className={`block w-full ${heightClass} rounded-2xl relative bg-[#DCECE7] overflow-hidden group cursor-pointer border border-[#B8DCD3] hover:border-[#0E4F4A] transition-colors shadow-xs`}
        aria-label="Google Maps Location for Ulaş Balıkçılık Cihangir"
      >
        {!isMapVisible ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#0E4F4A]">
            <MapPin className="w-8 h-8 mb-2 animate-bounce text-[#F26B45]" />
            <span className="text-xs uppercase tracking-widest font-bold">
              {currentLabels.loading}
            </span>
          </div>
        ) : !iframeFailed ? (
          <iframe
            src={primaryEmbedUrl}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ulaş Balıkçılık Cihangir Konumu"
            allow="geolocation"
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="w-full h-full border-0 pointer-events-none"
            style={{ minHeight: "192px" }}
            onError={handleIframeError}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F4F1E8]">
            <MapPin className="w-10 h-10 mb-2 text-[#0E4F4A]" />
            <span className="text-sm font-bold text-[#18323B]">{currentLabels.restaurantName}</span>
            <span className="text-xs text-[#47626B] mt-1">{currentLabels.address}</span>
            <span className="text-xs text-[#F26B45] mt-2 font-bold">{currentLabels.tapToOpen}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-[#0B2B3B]/10 pointer-events-none" />

        {/* Pin Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex flex-col items-center -translate-y-4">
            <div className="px-3 py-1.5 rounded-xl bg-[#F4F1E8] border border-[#B8DCD3] shadow-md flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F26B45]" />
              <span className="text-xs font-extrabold text-[#0B2B3B] tracking-tight whitespace-nowrap">
                {currentLabels.restaurantName}
              </span>
            </div>

            <div className="relative z-10 w-9 h-9 rounded-full bg-[#0E4F4A] shadow-md flex items-center justify-center border-2 border-[#F4F1E8]">
              <MapPin size={18} className="text-white" />
            </div>
          </div>
        </div>

        {/* Top Floating Action: Open in Maps */}
        <div className="absolute top-3 end-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F1E8] border border-[#B8DCD3] text-[#18323B] text-xs font-extrabold shadow-xs">
            <span>{currentLabels.openMaps}</span>
            <ExternalLink size={12} className="text-[#0E4F4A]" />
          </div>
        </div>

        {/* Bottom Floating Tag */}
        <div className="absolute bottom-3 start-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F4F1E8] border border-[#B8DCD3] text-[#18323B] text-[11px] font-bold shadow-xs">
            <Navigation size={11} className="text-[#F26B45]" />
            <span>{currentLabels.plusCode}</span>
          </div>
        </div>
      </a>

      {showDirectionsButton && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0E4F4A] hover:bg-[#0B2B3B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <Navigation size={15} />
          <span>{currentLabels.getDirections}</span>
        </a>
      )}
    </div>
  );
}
