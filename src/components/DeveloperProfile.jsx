"use client";

import React from "react";
import Link from "next/link";
import {
  TbArrowRight as ArrowRight,
  TbMail as Mail,
  TbCode as Code2,
  TbMessageCircle as MessageCircle,
} from "react-icons/tb";

export default function DeveloperProfile({ content, isRTL, lang }) {
  const { hero, proof, services, whyMe, process: workProcess, cta } = content;

  const trackEvent = (eventName) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: eventName });
    }
  };

  return (
    <div
      className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-14 bg-[#EBF4FA] min-h-screen text-[#1E2D3D] pb-24 ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-5 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8FBFE] border border-[#C5E1F5] text-[#0077B6] text-xs font-extrabold uppercase tracking-wider mx-auto shadow-2xs">
          <Code2 size={14} className="text-[#0088CC]" />
          <span>{hero.role}</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1E2D3D] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {hero.name}
        </h1>
        <p className="text-base sm:text-lg text-[#52667A] font-medium leading-relaxed max-w-2xl mx-auto">
          {hero.headline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={cta.whatsappLink}
            onClick={() => trackEvent("cta_whatsapp_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0077B6] hover:bg-[#1E2D3D] text-white font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
          >
            {hero.ctaQuote}
          </a>
          <a
            href={cta.portfolioLink}
            onClick={() => trackEvent("cta_portfolio_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#F8FBFE] border border-[#C5E1F5] text-[#1E2D3D] hover:border-[#0077B6] font-extrabold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 text-sm"
          >
            <span>{hero.ctaWork}</span>
            <ArrowRight size={15} className={isRTL ? "rotate-180" : ""} />
          </a>
        </div>
      </section>

      {/* 2. REAL PROOF */}
      <section className="bg-gradient-to-br from-[#13202E] via-[#1E2D3D] to-[#0077B6] text-white rounded-3xl p-7 sm:p-10 shadow-lg relative overflow-hidden border border-[#C5E1F5]/30">
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-[#38B6FF] text-xs font-extrabold tracking-widest uppercase">
              {proof.title}
            </h2>
            <p
              className="text-xl sm:text-2xl font-black leading-snug text-white"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {proof.subtitle?.replace(/kardeslercihangir\.com|ulasbalik\.com/gi, "ulasbalikcilik.com")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-4 border-t border-white/15">
            {proof.points.map((point, index) => (
              <div key={index} className="flex gap-3.5">
                <span className="text-[#38B6FF] font-black text-base leading-none pt-0.5">
                  0{index + 1}
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#F8FBFE]/90">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="space-y-6">
        <h2
          className="text-2xl sm:text-3xl font-black text-[#1E2D3D] text-center"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {services.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.items.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8FBFE] p-6 rounded-2xl border border-[#C5E1F5] shadow-2xs hover:border-[#0077B6]/50 transition-colors"
            >
              <div className="text-[#0077B6] font-black text-lg mb-2.5 border-b border-[#C5E1F5] pb-1.5 inline-block">
                0{index + 1}
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E2D3D] mb-1.5">
                {item.title}
              </h3>
              <p className="text-[#52667A] text-xs sm:text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY ME */}
      <section className="border-t border-b border-[#C5E1F5] py-8 space-y-6">
        <h2
          className="text-2xl sm:text-3xl font-black text-[#1E2D3D] text-center"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {whyMe.title}
        </h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {whyMe.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3.5 bg-[#F8FBFE] p-4 rounded-2xl border border-[#C5E1F5]"
            >
              <div className="w-2.5 h-2.5 bg-[#0088CC] rounded-full shrink-0 mt-2" />
              <p className="text-[#1E2D3D] font-semibold leading-relaxed text-sm sm:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THE PROCESS */}
      <section className="space-y-6">
        <h2
          className="text-2xl sm:text-3xl font-black text-[#1E2D3D] text-center"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {workProcess.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {workProcess.items.map((item, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center space-y-3 bg-[#F8FBFE] border border-[#C5E1F5] rounded-2xl p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1E2D3D] text-white flex items-center justify-center font-black text-sm shadow-xs">
                {index + 1}
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#1E2D3D]">{item.title}</h3>
              <p className="text-xs text-[#52667A] font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="bg-[#1E2D3D] text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl border border-[#0077B6]">
        <h2
          className="text-2xl sm:text-3xl font-black max-w-2xl mx-auto leading-snug"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {cta.title}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={cta.whatsappLink}
            onClick={() => trackEvent("cta_whatsapp_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0077B6] hover:bg-[#0088CC] text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md text-sm"
          >
            <MessageCircle size={18} />
            <span>{cta.whatsapp}</span>
          </a>
          <a
            href={cta.emailLink}
            onClick={() => trackEvent("cta_email_click")}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Mail size={18} />
            <span>{cta.email}</span>
          </a>
        </div>
        <div className="pt-2">
          <a
            href={cta.portfolioLink}
            onClick={() => trackEvent("cta_portfolio_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#38B6FF] hover:text-white transition-colors underline underline-offset-4 font-bold"
          >
            <span>{cta.portfolio}</span>
            <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
          </a>
        </div>
      </section>

      {/* Return to home link */}
      <div className="pt-4 flex justify-center">
        <Link
          href={`/${lang !== "tr" ? lang : ""}`}
          className="text-xs sm:text-sm text-[#0077B6] hover:text-[#1E2D3D] transition-colors inline-flex items-center gap-1.5 font-extrabold"
        >
          {isRTL ? <ArrowRight size={15} /> : <ArrowRight size={15} className="rotate-180" />}
          <span style={{ fontFamily: "var(--font-cairo)" }}>
            {lang === "ar"
              ? "العودة إلى مطعم أولاش باليك"
              : lang === "tr"
              ? "Ulaş Balıkçılık Ana Sayfasına Dön"
              : "Return to Ulaş Balıkçılık"}
          </span>
        </Link>
      </div>
    </div>
  );
}
