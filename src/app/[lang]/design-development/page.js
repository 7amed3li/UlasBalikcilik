import React from "react";
import DeveloperProfile from "@/components/DeveloperProfile";
import { devProfileContent } from "@/data/developerProfile";

export async function generateStaticParams() {
  return ["tr", "en", "ar", "ru", "fa", "fr", "de", "it", "es", "zh"].map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = devProfileContent[lang] || devProfileContent.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ulasbalik.com";

  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: `${siteUrl}/${lang}/design-development`,
      siteName: "Ulaş Balıkçılık",
      locale: lang,
      type: "profile",
    },
  };
}

export default async function DesignDevelopmentDynamicPage({ params }) {
  const { lang } = await params;
  const content = devProfileContent[lang] || devProfileContent.en;
  const isRTL = lang === "ar" || lang === "fa";

  return <DeveloperProfile content={content} isRTL={isRTL} lang={lang} />;
}
