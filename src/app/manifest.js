export default function manifest() {
  return {
    name: "Ulaş Balıkçılık | Cihangir & Maslak 1453",
    short_name: "Ulaş Balık",
    description: "Cihangir ve Maslak 1453 şubelerimizde günlük taze balık, ızgara, tava ve deniz mezeleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#1E2D3D",
    theme_color: "#0088CC",
    icons: [
      {
        src: "/ulas-logo.webp",
        sizes: "192x192 512x512",
        type: "image/webp",
      },
    ],
  };
}
