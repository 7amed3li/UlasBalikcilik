import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Navigation, ShieldCheck } from "lucide-react";
import LandingDishesSection from "@/components/LandingDishesSection";
import LandingVerifiedReviews from "@/components/LandingVerifiedReviews";
import kebabTranslations from "@/i18n/kebabTranslations";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "tr";
  const t = kebabTranslations[lang] || kebabTranslations.tr;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: [
      "best kebab taksim",
      "kebab near taksim square",
      "authentic turkish kebab istanbul",
      "adana kebab taksim",
      "halal restaurant beyoglu",
      "stone oven pide cihangir",
      "best kebab in taksim",
      "wood fired kebab",
      "cihangir kebab restaurant"
    ],
    alternates: {
      canonical: `https://www.kardeslercihangir.com/${lang}/best-kebab-taksim`,
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I find the best authentic kebab near Taksim Square?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kardeşler Kebap in historical Cihangir, established in 1998, is located just a 10-minute walk (750m) from Taksim Square. Renowned for authentic oak-charcoal Adana kebab and stone-oven pides.",
      },
    },
    {
      "@type": "Question",
      name: "Do you serve Halal meat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we exclusively use 100% fresh, daily butchered Halal meat from trusted local Anatolian farms. We do not use any frozen meats.",
      },
    },
  ],
};

export default async function BestKebabTaksimPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "tr";
  const t = kebabTranslations[lang] || kebabTranslations.tr;
  const isRTL = lang === "ar" || lang === "fa";
  const phoneCallUrl = "tel:+902122513696";

  return (
    <article className="min-h-screen bg-[#EDE3CE] text-[#2B2620] font-sans selection:bg-[#9C7A3F] selection:text-[#EDE3CE]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. PREMIUM HERO SECTION ── */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#F7F2E7]">
        <div className="absolute inset-0 border-b border-[#9C7A3F]/20"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 pt-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-[#9C7A3F]/40 text-[#9C7A3F] text-xs font-bold uppercase tracking-[0.2em]">
            <span>{t.badge1}</span>
            <span className="w-1 h-1 rounded-full bg-[#9C7A3F]"></span>
            <span>{t.badge2}</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#2B2620] leading-[1.1] tracking-tight uppercase"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.h1Line1} <br />
            <span className="text-[#9C7A3F] font-serif italic font-medium lowercase text-3xl sm:text-5xl">{t.h1Line2}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#2B2620]/70 font-medium leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {t.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href={`/${lang}/menu`}
              className="w-full sm:w-auto px-10 py-4 bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EDE3CE] font-bold text-xs tracking-[0.15em] uppercase transition-colors"
            >
              {t.btnExplore}
            </Link>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border border-[#4E5F4C]/40 text-[#4E5F4C] hover:bg-[#4E5F4C]/10 font-bold text-xs tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Navigation size={16} />
              <span>{t.btnDirections}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. ELEGANT STATS STRIP ── */}
      <section className="border-y border-[#9C7A3F]/20 bg-[#F7F2E7] py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2 border-r border-[#9C7A3F]/20">
            <div className="text-3xl sm:text-4xl font-serif text-[#9C7A3F]">1998</div>
            <div className="text-[10px] sm:text-xs text-[#2B2620]/60 font-bold uppercase tracking-[0.2em]">{t.stat1Label}</div>
          </div>
          <div className="space-y-2 border-r border-[#9C7A3F]/20">
            <div className="text-3xl sm:text-4xl font-serif text-[#2B2620]">100%</div>
            <div className="text-[10px] sm:text-xs text-[#2B2620]/60 font-bold uppercase tracking-[0.2em]">{t.stat2Label}</div>
          </div>
          <div className="space-y-2 border-r border-[#9C7A3F]/20">
            <div className="text-3xl sm:text-4xl font-serif text-[#9C7A3F]">4.6</div>
            <div className="text-[10px] sm:text-xs text-[#2B2620]/60 font-bold uppercase tracking-[0.2em]">{t.stat3Label}</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-serif text-[#2B2620]">450°C</div>
            <div className="text-[10px] sm:text-xs text-[#2B2620]/60 font-bold uppercase tracking-[0.2em]">{t.stat4Label}</div>
          </div>
        </div>
      </section>

      {/* ── 3. THE CRAFT (STORYTELLING) ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-3 text-[#9C7A3F] text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-8 h-px bg-[#9C7A3F]"></span>
              <span>{t.craftBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#2B2620] uppercase leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.craftTitle1} <br /> {t.craftTitle2}
            </h2>
            <div className="space-y-6 text-[#2B2620]/70 text-sm sm:text-base leading-loose" style={{ fontFamily: "var(--font-inter)" }}>
              <p>{t.craftDesc1}</p>
              <p>{t.craftDesc2}</p>
            </div>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-4 text-sm text-[#2B2620]">
                <ShieldCheck size={20} className="text-[#9C7A3F]" />
                <span className="uppercase tracking-widest text-xs font-bold">{t.craftFeature1}</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-[#2B2620]">
                <ShieldCheck size={20} className="text-[#9C7A3F]" />
                <span className="uppercase tracking-widest text-xs font-bold">{t.craftFeature2}</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full relative aspect-[4/3]">
            <Image 
              src="/images/adana.webp" 
              alt="Zirh Kebab Preparation" 
              fill 
              style={{ objectFit: 'cover', objectPosition: 'center' }} 
              className="rounded-sm border border-[#9C7A3F]/20 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── 4. SIGNATURE DISHES INJECTION ── */}
      <div className="bg-[#141310]">
        <LandingDishesSection currentLocale={lang} />
      </div>

      {/* ── 5. PREMIUM LOCATION SECTION ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#9C7A3F]/20 bg-[#F7F2E7]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#2B2620] uppercase tracking-widest" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.locationTitle}
            </h2>
            <p className="text-[#2B2620]/70 text-sm uppercase tracking-[0.2em]">{t.locationSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#9C7A3F]/20 flex flex-col items-center text-center space-y-4 bg-[#EDE3CE]">
              <MapPin size={24} className="text-[#9C7A3F]" />
              <h3 className="font-bold text-[#2B2620] uppercase tracking-widest text-sm">{t.addressLabel}</h3>
              <p className="text-xs text-[#2B2620]/60 leading-relaxed">
                {t.addressText}
              </p>
            </div>
            
            <div className="p-8 border border-[#9C7A3F]/20 flex flex-col items-center text-center space-y-4 bg-[#EDE3CE]">
              <Clock size={24} className="text-[#9C7A3F]" />
              <h3 className="font-bold text-[#2B2620] uppercase tracking-widest text-sm">{t.hoursLabel}</h3>
              <p className="text-xs text-[#2B2620]/60 leading-relaxed">
                {t.hoursText}
              </p>
            </div>

            <div className="p-8 border border-[#9C7A3F]/20 flex flex-col items-center text-center space-y-4 bg-[#EDE3CE]">
              <Phone size={24} className="text-[#9C7A3F]" />
              <h3 className="font-bold text-[#2B2620] uppercase tracking-widest text-sm">{t.reservationsLabel}</h3>
              <p className="text-xs text-[#2B2620]/60 leading-relaxed mb-4">
                {t.reservationsText}
              </p>
              <a href={phoneCallUrl} className="text-[#9C7A3F] font-bold text-xs uppercase tracking-[0.1em] hover:text-[#2B2620] transition-colors">
                +90 212 251 36 96
              </a>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
