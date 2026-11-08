import { menuData } from "@/data/menuData";

export default async function sitemap() {
  const baseUrl = "https://www.ulasbalik.com";
  const currentDate = new Date();
  const locales = ["tr", "en", "ar", "ru", "fa", "fr", "de", "it", "es", "zh"];

  const pages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  locales.forEach((loc) => {
    pages.push({
      url: `${baseUrl}/${loc}/menu`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    });
  });

  menuData.forEach((cat) => {
    (cat.items || []).forEach((item) => {
      if (item?.id) {
        pages.push({
          url: `${baseUrl}/dish/${item.id}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
    });
  });

  return pages;
}
