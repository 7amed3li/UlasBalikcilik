export default function robots() {
  const siteUrl = "https://www.ulasbalikcilik.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Yandex",
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
