"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TbMapPin as MapPin,
  TbPhone as Phone,
  TbClock as Clock,
  TbInfoCircle as AlertCircle,
  TbExternalLink as ExternalLink,
  TbPhoneCall as PhoneCall,
  TbToolsKitchen2 as Utensils,
  TbStarFilled as Star,
  TbArrowRight as ArrowRight,
} from "react-icons/tb";
import { FaInstagram } from "react-icons/fa6";
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
    <div className="min-h-screen bg-[#EBF4FA] text-[#1E2D3D] pt-7 pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-5 space-y-6">
        {/* Header Card */}
        <section className="rounded-3xl bg-gradient-to-r from-[#13202E] via-[#1E2D3D] to-[#0077B6] text-white p-6 sm:p-8 text-center border border-[#C5E1F5]/30 shadow-md">
          <div className="relative w-32 h-20 mx-auto mb-3 rounded-2xl bg-white p-2 border border-[#C5E1F5] shadow-xs">
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
          <p className="text-[#C5E1F5] text-xs sm:text-sm font-bold tracking-wide">
            {c.subtitle || "Ulaş Balıkçılık — Cihangir (Beyoğlu) & Maslak 1453 (Sarıyer)"}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cihangir Branch Card */}
          <div className="bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0077B6] text-white text-xs font-extrabold">
                  {cihangir.name[lang] || cihangir.name.tr}
                </span>
                <span className="text-xs font-extrabold text-[#0077B6] inline-flex items-center gap-1">
                  <Star size={12} className="fill-[#0077B6] text-[#0077B6]" />
                  <span>{cihangir.rating} ({cihangir.reviewsCount})</span>
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0077B6] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1E2D3D]">{c.addressLabel || "Adres"}</div>
                    <div className="text-[#52667A]">{cihangir.address}</div>
                    <div className="text-xs text-[#0077B6] font-semibold mt-0.5">
                      Plus Code: {cihangir.plusCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#0077B6] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1E2D3D]">
                      {c.hoursLabel || "Çalışma Saatleri"}
                    </div>
                    <div className="text-[#52667A]">
                      {cihangir.hours[lang] || cihangir.hours.tr}
                    </div>
                  </div>
                </div>

                {cihangir.phoneHref ? (
                  <a
                    href={cihangir.phoneHref}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0077B6] text-white font-bold text-sm"
                  >
                    <Phone size={16} />
                    <span>{cihangir.confirmedPhone}</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-dashed border-[#0088CC] text-xs text-[#52667A] flex items-start gap-2.5">
                    <AlertCircle size={16} className="text-[#0088CC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E2D3D] block mb-0.5">
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
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0077B6] hover:bg-[#1E2D3D] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{c.directions || "Google Haritalar'da Aç"}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Maslak 1453 Branch Card */}
          <div className="bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0088CC] text-white text-xs font-extrabold">
                  {maslak.name[lang] || maslak.name.tr}
                </span>
                <span className="text-xs font-bold text-[#52667A]">Sarıyer / İstanbul</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0077B6] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1E2D3D]">{c.addressLabel || "Adres"}</div>
                    <div className="text-[#52667A]">{maslak.address}</div>
                    <div className="text-xs text-[#52667A]/80 mt-0.5">
                      {maslak.addressNote[lang] || maslak.addressNote.tr}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#0088CC] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1E2D3D]">
                      {c.phoneLabel || "Sipariş & İletişim Hattı"}
                    </div>
                    <a
                      href={maslak.phoneHref}
                      className="text-base font-black text-[#0077B6] hover:underline"
                    >
                      {maslak.confirmedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#0077B6] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1E2D3D]">
                      {c.hoursLabel || "Çalışma Saatleri"}
                    </div>
                    <div className="text-xs text-[#52667A]">
                      {maslak.hoursNote[lang] || maslak.hoursNote.tr}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={maslak.phoneHref}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0088CC] hover:bg-[#006DA3] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
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
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-[#C5E1F5] text-[#1E2D3D] font-bold text-xs hover:border-[#0077B6]"
              >
                <span>Yandex Harita</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Table Reservation & Social Media Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0077B6] text-white flex items-center justify-center shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#1E2D3D] mb-1">
                {t.vipBooking || "Masa Rezervasyonu & Paket Sipariş"}
              </h2>
              <p className="text-xs text-[#52667A] leading-relaxed font-medium">
                {t.phoneReservationNotice ||
                  "En iyi hizmeti sunabilmek adına rezervasyonları ve paket siparişlerinizi telefon üzerinden kabul etmekteyiz."}
              </p>
            </div>
          </div>

          <div className="bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E2D3D] to-[#0077B6] text-white flex items-center justify-center shrink-0">
                <FaInstagram size={20} />
              </div>
              <div>
                <h2 className="text-base font-black text-[#1E2D3D]">@ulasbalik</h2>
                <p className="text-xs text-[#52667A] font-medium">
                  Resmi Instagram Hesabımız
                </p>
              </div>
            </div>
            <a
              href={ULAS_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1E2D3D] hover:bg-[#0077B6] text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors"
            >
              <span>Takip Et</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Cihangir Map */}
        <div className="bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2
              className="text-xl font-black text-[#1E2D3D]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              Cihangir Şube Haritası
            </h2>
            <Link
              href={`${prefix}/menu`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0077B6] hover:underline"
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
