"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ULAS_CONFIG } from "@/data/ulasConfig";
import ReservationModal from "@/components/ReservationModal";

/* Palette — logo hue line, 60-30-10 */
const C = {
  sea: "#06384E",
  abyss: "#082A3A",
  mid: "#104760",
  foam: "#F4F9FB",
  tint1: "#D6EBF5",
  tint2: "#E7F3F9",
  haze: "#90C6DF",
  azure: "#0C96DF",
  ink: "#2E3B44",
  soft: "#53636E",
  sand: "#F1E8D8",
  amber: "#EE7B3F",
  amberDeep: "#D15015",
};

const PHONE_MASLAK = { display: "0212 813 57 57", href: "tel:+902128135757" };
const PHONE_CIHANGIR = { display: "0212 434 25 02", href: "tel:+902124342502" };

const SIGNATURE = [
  {
    name: "Levrek Izgara",
    price: "600 ₺",
    line: "Kömür ateşinde derisi çıtır, içi sulu — bütün levrek.",
    src: "/images/ulas_photos/BA07-levrek-izgara.webp",
  },
  {
    name: "Hamsi Tava",
    price: "500 ₺",
    line: "Mısır ununa bulanıp tavada çıtırdayan Karadeniz hamsisi.",
    src: "/images/ulas_photos/KL20-hamsi-tava.webp",
    icon: true,
  },
  {
    name: "Kalamar Tava",
    price: "500 ₺",
    line: "Altın sarısı çıtır kaplama, içi yumuşacık taze kalamar.",
    src: "/images/ulas_photos/KL32-kalamar-tava.webp",
  },
];

const MORE = [
  { name: "Çipura Izgara", price: "600 ₺", line: "Zeytinyağı ve deniz tuzuyla, ızgarada tam kıvamında." },
  { name: "Fener Kavurma", price: "850 ₺", line: "Sebze ve özel sosla sotelenir, güveçte sıcak servis edilir." },
  { name: "Jumbo Karides", price: "990 ₺", line: "Izgara ateşinde, sarımsak ve tereyağı dokunuşuyla." },
  { name: "Midye Dolma", price: "20 ₺", line: "Baharatlı iç pilavla doldurulur, limonla servis edilir — adet fiyatı." },
];

const MEZE = ["Ahtapot Salatası", "Lakerda", "Çiroz", "İsli Midye", "Şakşuka", "Haydari"];

const CHAPTERS = [
  { n: "01", title: "DENİZ", text: "Karadeniz'in günlük avı, mevsiminde seçilir.", bg: C.foam },
  { n: "02", title: "HAL", text: "Şefimiz her gece 01.00'de halde balığı tek tek eliyle seçer.", bg: C.sand },
  { n: "03", title: "SOFRA", text: "Izgara, tava ve mezelerle ailenin sofrasına.", bg: C.tint2 },
];

/* Soft scroll reveal: fade + 12px rise */
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`lux-reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ "--lux-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Stars({ n = 5, size = 11 }) {
  return (
    <span aria-hidden="true" className="inline-flex gap-[3px] align-middle">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={C.amber}>
          <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Leader({ name, price, big = false }) {
  return (
    <div className="flex items-baseline gap-3">
      <h3 className={`lux-serif ${big ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} leading-none`} style={{ color: C.ink }}>
        {name}
      </h3>
      <span className="flex-1 translate-y-[-4px] border-b border-dotted" style={{ borderColor: C.haze }} />
      <span className="lux-sans text-sm sm:text-base font-semibold tabular-nums" style={{ color: C.amberDeep }}>
        {price}
      </span>
    </div>
  );
}

export function LuxHeader({ extra = null }) {
  const links = [
    { href: "/menu", label: "Menü" },
    { href: "/about", label: "Hikayemiz" },
    { href: "#subeler", label: "Şubelerimiz" },
    { href: "/contact", label: "İletişim" },
  ];
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ background: "rgba(244,249,251,0.94)", borderColor: C.tint1 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-10">
        <Link href="/" aria-label="Ulaş Balıkçılık" className="shrink-0">
          <Image src="/ulas-logo.webp" alt="Ulaş Balıkçılık" width={150} height={56} className="h-10 w-auto sm:h-12" priority />
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="lux-link lux-sans text-[13px] tracking-wide" style={{ color: C.ink }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
        {extra}
        <a
          href={PHONE_MASLAK.href}
          className="lux-sans inline-flex flex-col items-center px-5 py-2 text-white transition-colors duration-300 hover:bg-[#104760]"
          style={{ background: C.azure }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Rezervasyon</span>
          <span className="text-[11px] opacity-90">{PHONE_MASLAK.display}</span>
        </a>
        </div>
      </div>
      <nav className="flex justify-center gap-6 border-t px-5 py-2 md:hidden" style={{ borderColor: C.tint1 }}>
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="lux-sans text-[12px]" style={{ color: C.ink }}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const imgRef = useRef(null);
  const [resOpen, setResOpen] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (imgRef.current) imgRef.current.style.transform = `translateY(${Math.min(window.scrollY, 900) * 0.14}px) scale(1.08)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-110px)] items-center justify-center overflow-hidden text-center" style={{ background: C.sea }}>
      <div ref={imgRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.08)" }}>
        <Image
          src="/images/ulas-balik-restaurant-hero.webp"
          alt="Ulaş Balıkçılık sofrası"
          fill
          priority
         
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,42,58,0.92) 0%, rgba(6,56,78,0.80) 50%, rgba(8,42,58,0.95) 100%)" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <p className="lux-kicker mb-8" style={{ color: C.tint1 }}>
          ULAŞ BALIKÇILIK — CİHANGİR &amp; MASLAK 1453
        </p>
        <h1 className="lux-serif text-[clamp(3.2rem,9.5vw,8.5rem)] leading-[0.95] tracking-tight text-white">
          Karadeniz&apos;in
          <br />
          <em className="font-normal italic">Bereketi</em> Soframızda
        </h1>
        <div className="mx-auto mt-12 flex items-center justify-center gap-4">
          <span className="h-px w-10" style={{ background: C.amber }} />
          <p className="lux-sans text-sm tracking-[0.12em]" style={{ color: C.amber }}>
            Günün Avı: Hamsi Tava
          </p>
          <span className="h-px w-10" style={{ background: C.amber }} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/menu"
            className="lux-sans inline-flex min-w-[210px] items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white bg-[#0C96DF] hover:bg-[#104760] transition-colors duration-300"
          >
            Menüyü Keşfet
          </Link>
          <button
            type="button"
            onClick={() => setResOpen(true)}
            className="lux-sans inline-flex min-w-[210px] items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#F4F9FB] border border-[#F4F9FB]/40 hover:border-[#EE7B3F] hover:text-[#EE7B3F] transition-colors duration-300 cursor-pointer"
          >
            Rezervasyon Yap
          </button>
        </div>
      </div>

      <a href="#manifesto" aria-label="Aşağı kaydır" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="lux-cue block h-12 w-px" style={{ background: C.tint1 }} />
      </a>
      <ReservationModal isOpen={resOpen} onClose={() => setResOpen(false)} />
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="flex min-h-screen items-center justify-center px-6 py-24 text-center" style={{ background: C.foam }}>
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="lux-serif text-[clamp(2rem,5vw,4rem)] leading-[1.15]" style={{ color: C.ink }}>
            Her gece 01.00&apos;de halden seçilir, öğlen sofranızda olur.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="lux-sans mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] tracking-[0.1em]" style={{ color: C.soft }}>
            <span className="inline-flex items-center gap-2"><Stars n={1} size={10} /> 4.8 — Cihangir</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-2"><Stars n={1} size={10} /> 4.9 — Maslak 1453</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section id="imza" className="px-6 py-28 sm:px-10 sm:py-40" style={{ background: C.foam }}>
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-20 text-center sm:mb-28">
          <p className="lux-kicker mb-5" style={{ color: C.azure }}>İMZA LEZZETLER</p>
          <h2 className="lux-serif text-5xl sm:text-7xl" style={{ color: C.ink }}>Sofranın imzası</h2>
        </Reveal>

        {/* Three editorial photographs — Hamsi Tava centred, larger, dropped lower */}
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_1.3fr_1fr] md:gap-10">
          {SIGNATURE.map((d, i) => (
            <Reveal key={d.name} delay={i * 120} className={d.icon ? "md:mt-24" : ""}>
              <figure>
                <div className="relative overflow-hidden" style={{ background: C.tint2, aspectRatio: d.icon ? "4 / 5" : "4 / 5" }}>
                  <Image
                    src={d.src}
                    alt={d.name}
                    fill
                   
                    sizes="(min-width: 768px) 33vw, 100vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                  />
                  {d.icon && (
                    <span
                      className="lux-sans absolute left-0 top-6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
                      style={{ background: C.amber }}
                    >
                      EN ÇOK SEVİLEN
                    </span>
                  )}
                </div>
                <figcaption className="mt-6">
                  <Leader name={d.name} price={d.price} big={d.icon} />
                  <p className="lux-sans mt-3 text-[13px] leading-relaxed" style={{ color: C.soft }}>{d.line}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Remaining dishes — calm two-column list */}
        <div className="mx-auto mt-32 grid max-w-5xl grid-cols-1 gap-x-20 gap-y-12 md:grid-cols-2">
          {MORE.map((d, i) => (
            <Reveal key={d.name} delay={(i % 2) * 120}>
              <Leader name={d.name} price={d.price} />
              <p className="lux-sans mt-3 text-[13px] leading-relaxed" style={{ color: C.soft }}>{d.line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-32 text-center">
          <p className="lux-serif text-3xl italic sm:text-5xl" style={{ color: C.ink }}>Tezgâhta ne varsa, sofrada o var.</p>
          <p className="lux-sans mx-auto mt-6 max-w-md text-[12px] leading-relaxed tracking-wide" style={{ color: C.soft }}>
            Menü, mevsimin avına göre her gün yeniden şekillenir — 8 kategoride 81 çeşit.
          </p>
          <Link href="/menu" className="lux-link lux-sans mt-10 inline-block pb-1 text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: C.azure }}>
            Tüm menü
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section aria-label="Denizden sofraya">
      <div className="px-6 pt-24 text-center sm:pt-32" style={{ background: C.foam }}>
        <Reveal>
          <p className="lux-kicker" style={{ color: C.azure }}>DENİZDEN SOFRAYA</p>
        </Reveal>
      </div>
      {CHAPTERS.map((c, i) => (
        <div key={c.n} className="px-6 py-24 sm:px-10 sm:py-36" style={{ background: i === 0 ? C.foam : c.bg }}>
          <Reveal className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[auto_1fr] md:gap-20">
            <span className="lux-serif text-[clamp(6rem,18vw,15rem)] leading-none" style={{ color: i === 1 ? C.haze : C.tint1 }}>
              {c.n}
            </span>
            <div>
              <p className="lux-kicker mb-5" style={{ color: C.azure }}>{c.title}</p>
              <p className="lux-serif max-w-xl text-3xl leading-tight sm:text-5xl" style={{ color: C.ink }}>{c.text}</p>
            </div>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

function Meze() {
  return (
    <section className="px-6 py-28 text-center sm:px-10 sm:py-40" style={{ background: C.sea, color: C.foam }}>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="lux-kicker mb-5" style={{ color: C.haze }}>MEZE</p>
          <h2 className="lux-serif text-5xl italic sm:text-7xl">Soğuk Başlangıçlar</h2>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {MEZE.map((m, i) => (
            <Reveal
              key={m}
              delay={(i % 3) * 100}
              className="border-t border-[#0C96DF]/55 px-4 py-9"
            >
              <span className="lux-serif text-2xl sm:text-3xl">{m}</span>
            </Reveal>
          ))}
        </div>
        <span className="mt-4 block h-px w-full" style={{ background: C.azure, opacity: 0.6 }} />
      </div>
    </section>
  );
}

function Branches() {
  const cihMap = ULAS_CONFIG?.branches?.cihangir?.googleMapsUrl || ULAS_CONFIG?.branches?.cihangir?.mapUrl;
  const masMap = ULAS_CONFIG?.branches?.maslak?.mapUrl;
  return (
    <section id="subeler" className="px-6 py-28 sm:px-10 sm:py-40" style={{ background: C.foam }}>
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-20 text-center">
          <p className="lux-kicker mb-5" style={{ color: C.azure }}>ŞUBELERİMİZ</p>
          <h2 className="lux-serif text-5xl sm:text-7xl" style={{ color: C.ink }}>İki şube, tek sofra</h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div style={{ background: C.tint1 }} className="p-10 sm:p-14">
              <p className="lux-kicker mb-6" style={{ color: C.soft }}>CİHANGİR</p>
              <p className="lux-serif text-6xl" style={{ color: C.ink }}>4.8</p>
              <p className="lux-sans mt-8 text-[14px] leading-relaxed" style={{ color: C.ink }}>
                Kuloğlu, Liva Sk. No: 15/A, Beyoğlu
              </p>
              <p className="lux-sans mt-2 text-[13px] leading-relaxed" style={{ color: C.soft }}>
                Pzt–Cmt 11:00–02:00, Paz 13:00–02:00
              </p>
              <a href={PHONE_CIHANGIR.href} className="lux-serif mt-6 block text-3xl" style={{ color: C.ink }}>{PHONE_CIHANGIR.display}</a>
              <a href={cihMap} target="_blank" rel="noopener noreferrer" className="lux-link lux-sans mt-8 inline-block pb-1 text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: C.azure }}>
                Yol Tarifi
              </a>
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-5 md:mt-32">
            <div style={{ background: C.tint2 }} className="p-10 sm:p-14">
              <p className="lux-kicker mb-6" style={{ color: C.soft }}>MASLAK 1453</p>
              <p className="lux-serif text-6xl" style={{ color: C.ink }}>4.9</p>
              <p className="lux-sans mt-2 text-[11px] uppercase tracking-[0.25em]" style={{ color: C.soft }}>Yeni Şube</p>
              <p className="lux-sans mt-8 text-[14px] leading-relaxed" style={{ color: C.ink }}>Ağaoğlu Maslak 1453, Sarıyer</p>
              <a href={PHONE_MASLAK.href} className="lux-serif mt-6 block text-3xl" style={{ color: C.ink }}>{PHONE_MASLAK.display}</a>
              <a href={masMap} target="_blank" rel="noopener noreferrer" className="lux-link lux-sans mt-8 inline-block pb-1 text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: C.azure }}>
                Yol Tarifi
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GuestVoice() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-28 text-center" style={{ background: C.foam }}>
      <Reveal className="mx-auto max-w-5xl">
        <blockquote className="lux-serif text-[clamp(2rem,4.8vw,4.2rem)] italic leading-[1.2]" style={{ color: C.ink }}>
          “Hamsi tavası sanki sabah denizdeydi; çıtır, sıcak ve tertemiz.”
        </blockquote>
        <p className="lux-kicker mt-12" style={{ color: C.soft }}>— Misafir yorumu, Google</p>
      </Reveal>
    </section>
  );
}

export function Colophon() {
  return (
    <footer className="px-6 py-24 text-center sm:py-32" style={{ background: C.abyss, color: C.foam }}>
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto inline-flex items-center justify-center p-4" style={{ background: C.foam }}>
          <Image src="/ulas-logo.webp" alt="Ulaş Balıkçılık" width={140} height={52} className="h-12 w-auto" />
        </div>
        <a href={PHONE_MASLAK.href} className="lux-serif mt-14 block text-[clamp(2.6rem,7vw,5rem)] leading-none">{PHONE_MASLAK.display}</a>
        <a
          href="https://www.instagram.com/ulasbalik_restaurant/"
          target="_blank"
          rel="noopener noreferrer"
          className="lux-link lux-sans mt-10 inline-block pb-1 text-[13px] tracking-[0.12em]"
          style={{ color: C.azure }}
        >
          @ulasbalik_restaurant
        </a>
        <p className="lux-sans mt-20 text-[11px] tracking-[0.1em]" style={{ color: C.haze }}>
          © 2026 Ulaş Balıkçılık — Cihangir &amp; Maslak 1453
        </p>
      </div>
    </footer>
  );
}

export default function LuxuryHome() {
  return (
    <div className="lux-sans" style={{ background: C.foam, color: C.ink }}>
      <Hero />
      <Manifesto />
      <Signature />
      <Journey />
      <Meze />
      <Branches />
      <GuestVoice />
    </div>
  );
}
