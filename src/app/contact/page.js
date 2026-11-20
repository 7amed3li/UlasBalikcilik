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
    <div className="min-h-screen bg-[#E7F3F9] text-[#2E3B44] pt-7 pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-5 space-y-6">
        {/* Header Card */}
        <section className="rounded-3xl bg-gradient-to-r from-[#082A3A] via-[#06384E] to-[#104760] text-white p-6 sm:p-8 text-center border border-[#D6EBF5]/30 shadow-md">
          <div className="relative w-32 h-20 mx-auto mb-3 rounded-2xl bg-white p-2 border border-[#D6EBF5] shadow-xs">
            <Image
              src="/ulas-logo.webp"
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
          <p className="text-[#D6EBF5] text-xs sm:text-sm font-bold tracking-wide">
            {c.subtitle || "Ulaş Balıkçılık — Cihangir (Beyoğlu) & Maslak 1453 (Sarıyer)"}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cihangir Branch Card */}
          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0C96DF] text-white text-xs font-extrabold">
                  {cihangir.name[lang] || cihangir.name.tr}
                </span>
                <span className="text-xs font-extrabold text-[#0C96DF] inline-flex items-center gap-1">
                  <Star size={12} className="fill-[#EE7B3F] text-[#EE7B3F]" />
                  <span>{cihangir.rating} ({cihangir.reviewsCount})</span>
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#2E3B44]">{c.addressLabel || "Adres"}</div>
                    <div className="text-[#53636E]">{cihangir.address}</div>
                    <div className="text-xs text-[#0C96DF] font-semibold mt-0.5">
                      Plus Code: {cihangir.plusCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#2E3B44]">
                      {c.hoursLabel || "Çalışma Saatleri"}
                    </div>
                    <div className="text-[#53636E]">
                      {cihangir.hours[lang] || cihangir.hours.tr}
                    </div>
                  </div>
                </div>

                {cihangir.phoneHref ? (
                  <a
                    href={cihangir.phoneHref}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0C96DF] text-white font-bold text-sm"
                  >
                    <Phone size={16} />
                    <span>{cihangir.confirmedPhone}</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-dashed border-[#0C96DF] text-xs text-[#53636E] flex items-start gap-2.5">
                    <AlertCircle size={16} className="text-[#0C96DF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#2E3B44] block mb-0.5">
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
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0C96DF] hover:bg-[#06384E] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{c.directions || "Google Haritalar'da Aç"}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Maslak 1453 Branch Card */}
          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0C96DF] text-white text-xs font-extrabold">
                  {maslak.name[lang] || maslak.name.tr}
                </span>
                <span className="text-xs font-bold text-[#53636E]">Sarıyer / İstanbul</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#2E3B44]">{c.addressLabel || "Adres"}</div>
                    <div className="text-[#53636E]">{maslak.address}</div>
                    <div className="text-xs text-[#53636E]/80 mt-0.5">
                      {maslak.addressNote[lang] || maslak.addressNote.tr}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#2E3B44]">
                      {c.phoneLabel || "Sipariş & İletişim Hattı"}
                    </div>
                    <a
                      href={maslak.phoneHref}
                      className="text-base font-black text-[#0C96DF] hover:underline"
                    >
                      {maslak.confirmedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#0C96DF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#2E3B44]">
                      {c.hoursLabel || "Çalışma Saatleri"}
                    </div>
                    <div className="text-xs text-[#53636E]">
                      {maslak.hoursNote[lang] || maslak.hoursNote.tr}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={maslak.phoneHref}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0C96DF] hover:bg-[#104760] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
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
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-[#D6EBF5] text-[#2E3B44] font-bold text-xs hover:border-[#0C96DF]"
              >
                <span>Yandex Harita</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Table Reservation & Social Media Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0C96DF] text-white flex items-center justify-center shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#2E3B44] mb-1">
                {t.vipBooking || "Masa Rezervasyonu & Paket Sipariş"}
              </h2>
              <p className="text-xs text-[#53636E] leading-relaxed font-medium">
                {t.phoneReservationNotice ||
                  "En iyi hizmeti sunabilmek adına rezervasyonları ve paket siparişlerinizi telefon üzerinden kabul etmekteyiz."}
              </p>
            </div>
          </div>

          <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#104760] to-[#0C96DF] text-white flex items-center justify-center shrink-0">
                <FaInstagram size={20} />
              </div>
              <div>
                <h2 className="text-base font-black text-[#2E3B44]">@ulasbalik</h2>
                <p className="text-xs text-[#53636E] font-medium">
                  Resmi Instagram Hesabımız
                </p>
              </div>
            </div>
            <a
              href={ULAS_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#06384E] hover:bg-[#0C96DF] text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors"
            >
              <span>Takip Et</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Cihangir Map */}
        <div className="bg-[#F4F9FB] border border-[#D6EBF5] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2
              className="text-xl font-black text-[#2E3B44]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              Cihangir Şube Haritası
            </h2>
            <Link
              href={`${prefix}/menu`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0C96DF] hover:underline"
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
