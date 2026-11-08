"use client";

import React from "react";
import DeveloperProfile from "@/components/DeveloperProfile";
import { devProfileContent } from "@/data/developerProfile";
import { useAppContext } from "@/context/AppContext";

export default function TasarimGelistirmePage() {
  const { lang } = useAppContext();
  const currentLang = lang || "tr";
  const content = devProfileContent[currentLang] || devProfileContent.tr;
  const isRTL = currentLang === "ar" || currentLang === "fa";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "name": content.meta?.title || "",
            "description": content.meta?.description || "",
            "mainEntity": {
              "@type": "Person",
              "name": content.hero?.name || "Hamed Mohamed",
              "jobTitle": content.hero?.role || "Web Designer & Developer",
              "url": "https://hamedmohamed.dev/"
            }
          })
        }}
      />
      <DeveloperProfile content={content} isRTL={isRTL} lang={currentLang} />
    </>
  );
}
