"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartSplash from "@/components/SmartSplash";
import OrderFlowWrapper from "@/components/OrderFlowWrapper";
import MobileStickyCTA from "@/components/MobileStickyCTA";

// The original header and footer stay on every page. Only the homepage
// ("/" and "/<lang>") drops the narrow content column so the luxury sections run full-bleed.
const HOME_RE = /^\/([a-z]{2})?\/?$/;

export default function SiteChrome({ children }) {
  const pathname = usePathname() || "/";
  const isHome = HOME_RE.test(pathname);
  return (
    <>
      <SmartSplash />
      <Header />
      <main
        className={`flex-grow w-full flex flex-col relative ${isHome ? "" : "max-w-5xl mx-auto"}`}
      >
        {children}
      </main>
      <Footer />
      <MobileStickyCTA />
      <OrderFlowWrapper />
    </>
  );
}