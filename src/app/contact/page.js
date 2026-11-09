"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  AlertCircle,
  ExternalLink,
  PhoneCall,
  Utensils,
  Star,
  ArrowRight,
} from "lucide-react";
import { InstagramLogo } from "@phosphor-icons/react";
import { useAppContext } from "@/context/AppContext";
import RestaurantMap from "@/components/RestaurantMap";
import { ULAS_CONFIG } from "@/data/ulasConfig";

export default function ContactPage() {
  const { t, lang } = useAppContext();
  const c = t.contactPage || {};
  const cihangir = ULAS_CONFIG.branches.cihangir;
  const maslak = ULAS_CONFIG.branches.maslak;
  const prefix = lang === "tr" ? "" : `/${lang}`;

  return (
    <div className="min-h-screen bg-[#DCE8E6] text-[#18323B] pt-7 pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-5 space-y-6">
        {/* Header Card */}
        <section className="rounded-3xl bg-gradient-to-r from-[#071D2B] via-[#0B2B3B] to-[#0E4F4A] text-white p-6 sm:p-8 text-center border border-[#B8DCD3]/30 shadow-md">
          <div className="relative w-32 h-20 mx-auto mb-3 rounded-2xl bg-white p-2 border border-[#B8DCD3] shadow-xs">
            <Image
              src="/ulas-logo.jpg"
              alt="Ulaş Balıkçılık"
              fill
              unoptimized={true}
              style={{ objectFit: "contain", padding: "6px" }}
            />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-black text-white mb-2"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {c.title || "Şubelerimiz & İletişim"}
          </h1>
          <p className="text-[#B8DCD3] text-xs sm:text-sm font-bold tracking-wide">
            {c.subtitle || "Ulaş Balıkçılık — Cihangir (Beyoğlu) & Maslak 1453 (Sarıyer)"}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cihangir Branch Card */}
          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0E4F4A] text-white text-xs font-extrabold">
                  {cihangir.name[lang] || cihangir.name.tr}
                </span>
                <span className="text-xs font-extrabold text-[#0E4F4A] inline-flex items-center gap-1">
                  <Star size={12} className="fill-[#0E4F4A] text-[#0E4F4A]" />
                  <span>{cihangir.rating} ({cihangir.reviewsCount})</span>
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B2B3B]">{c.addressLabel || "Adres"}</div>
                    <div className="text-[#47626B]">{cihangir.address}</div>
                    <div className="text-xs text-[#0E4F4A] font-semibold mt-0.5">
                      Plus Code: {cihangir.plusCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B2B3B]">
                      {c.hoursLabel || "Çalışma Saatleri"}
                    </div>
                    <div className="text-[#47626B]">
                      {cihangir.hours[lang] || cihangir.hours.tr}
                    </div>
                  </div>
                </div>

                {cihangir.phoneHref ? (
                  <a
                    href={cihangir.phoneHref}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0E4F4A] text-white font-bold text-sm"
                  >
                    <Phone size={16} />
                    <span>{cihangir.confirmedPhone}</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-dashed border-[#D93829] text-xs text-[#47626B] flex items-start gap-2.5">
                    <AlertCircle size={16} className="text-[#D93829] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0B2B3B] block mb-0.5">
                        {lang === "ar"
                          ? "رقم هاتف جيهانغير بانتظار تأكيد الإدارة:"
                          : "Cihangir Telefon Numarası Teyit Bekliyor:"}
                      </strong>
                      <div>Google Maps &amp; Paket İlanı: 0212 434 25 02</div>
                      <div>Instagram Bio: 0212 434 23 02</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={cihangir.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0E4F4A] hover:bg-[#0B2B3B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{c.directions || "Google Haritalar'da Aç"}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Maslak 1453 Branch Card */}
          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#D93829] text-white text-xs font-extrabold">
                  {maslak.name[lang] || maslak.name.tr}
                </span>
                <span className="text-xs font-bold text-[#47626B]">Sarıyer / İstanbul</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B2B3B]">{c.addressLabel || "Adres"}</div>
                    <div className="text-[#47626B]">{maslak.address}</div>
                    <div className="text-xs text-[#47626B]/80 mt-0.5">
                      {maslak.addressNote[lang] || maslak.addressNote.tr}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#D93829] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B2B3B]">
                      {c.phoneLabel || "Sipariş & İletişim Hattı"}
                    </div>
                    <a
                      href={maslak.phoneHref}
                      className="text-base font-black text-[#0E4F4A] hover:underline"
                    >
                      {maslak.confirmedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#0E4F4A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B2B3B]">
                      {c.hoursLabel || "Çalışma Saatleri"}
                    </div>
                    <div className="text-xs text-[#47626B]">
                      {maslak.hoursNote[lang] || maslak.hoursNote.tr}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={maslak.phoneHref}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D93829] hover:bg-[#B82D20] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                <Phone size={15} />
                <span>
                  {t.callNow || "Hemen Ara"} ({maslak.confirmedPhone})
                </span>
              </a>
              <a
                href={maslak.yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-[#B8DCD3] text-[#0B2B3B] font-bold text-xs hover:border-[#0E4F4A]"
              >
                <span>Yandex Harita</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Table Reservation & Social Media Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0E4F4A] text-white flex items-center justify-center shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#0B2B3B] mb-1">
                {t.vipBooking || "Masa Rezervasyonu & Paket Sipariş"}
              </h2>
              <p className="text-xs text-[#47626B] leading-relaxed font-medium">
                {t.phoneReservationNotice ||
                  "En iyi hizmeti sunabilmek adına rezervasyonları ve paket siparişlerinizi telefon üzerinden kabul etmekteyiz."}
              </p>
            </div>
          </div>

          <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B2B3B] to-[#0E4F4A] text-white flex items-center justify-center shrink-0">
                <InstagramLogo size={20} weight="bold" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#0B2B3B]">@ulasbalik</h2>
                <p className="text-xs text-[#47626B] font-medium">
                  Resmi Instagram Hesabımız
                </p>
              </div>
            </div>
            <a
              href={ULAS_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#0B2B3B] hover:bg-[#0E4F4A] text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors"
            >
              <span>Takip Et</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Cihangir Map */}
        <div className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2
              className="text-xl font-black text-[#0B2B3B]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              Cihangir Şube Haritası
            </h2>
            <Link
              href={`${prefix}/menu`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0E4F4A] hover:underline"
            >
              <Utensils size={14} />
              <span>{t.backToMenu || "Menüye Dön"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <RestaurantMap showDirectionsButton={true} className="mb-0" />
        </div>
      </div>
    </div>
  );
}
