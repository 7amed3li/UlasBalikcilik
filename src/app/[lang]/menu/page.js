import MenuPage from "@/app/menu/page";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";

const siteUrl = RESTAURANT_INFO.siteUrl;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = {
    tr: "Menü | Ulaş Balıkçılık — Cihangir & Maslak 1453",
    en: "Menu | Ulaş Balıkçılık — Fish & Seafood Restaurant",
    ar: "قائمة الطعام (المنيو) | مطعم أولاش باليك للأسماك والمأكولات البحرية",
    fa: "منوی غذا | رستوران ماهی و غذاهای دریایی اولاش بالیک",
    ru: "Меню | Рыбный ресторан Ulaş Balıkçılık",
    fr: "Menu | Restaurant de Poisson Ulaş Balıkçılık",
    de: "Speisekarte | Fischrestaurant Ulaş Balıkçılık",
    it: "Menu | Ristorante di Pesce Ulaş Balıkçılık",
    es: "Menú | Restaurante de Pescado Ulaş Balıkçılık",
    zh: "菜单 | Ulaş Balıkçılık 海鲜与鲜鱼餐厅",
  };
  const descriptions = {
    tr: "Ulaş Balıkçılık Cihangir ve Maslak 1453 menüsü: günlük taze ızgara ve tava balıklar, Karadeniz hamsisi, soğuk ve sıcak deniz mezeleri, salatalar ve fırında sıcak helva.",
    en: "Ulaş Balıkçılık Cihangir & Maslak 1453 menu: daily fresh grilled and pan-fried fish, Black Sea anchovies, seafood mezze, salads, and warm baked halva.",
    ar: "قائمة طعام مطعم أولاش باليك (جيهانغير ومسلك 1453): أسماك طازجة مشوية ومقلية، همسي البحر الأسود، مقبلات بحرية باردة وساخنة، سلطات وحلاوة ساخنة بالفرن.",
    fa: "منوی رستوران اولاش بالیک در جیهانگیر و مسلک ۱۴۵۳: ماهی‌های تازه کبابی و تابه‌ای، مزه‌های دریایی، سالاد و حلوای داغ.",
    ru: "Меню ресторана Ulaş Balıkçılık в Джихангире и Маслак 1453: свежая рыба на гриле и сковороде, черноморская хамса, морские закуски мезе и горячая халва.",
    fr: "Menu du restaurant Ulaş Balıkçılık à Cihangir et Maslak 1453 : poissons frais grillés et poêlés, anchois de la mer Noire, mezzés de fruits de mer et halva chaud.",
    de: "Speisekarte von Ulaş Balıkçılık in Cihangir & Maslak 1453: täglich frischer Grill- und Pfannenfisch, Schwarzmeer-Sardellen, Meeresfrüchte-Mezze und warmes Halva.",
    it: "Menu del ristorante Ulaş Balıkçılık a Cihangir e Maslak 1453: pesce fresco alla griglia e in padella, alici del Mar Nero, antipasti di mare e halva calda.",
    es: "Menú del restaurante Ulaş Balıkçılık en Cihangir y Maslak 1453: pescado fresco a la parrilla y sartén, anchoas del Mar Negro, mezze de mariscos y halva caliente.",
    zh: "Ulaş Balıkçılık 吉汉吉尔与 Maslak 1453 菜单：每日新鲜炭烤与香煎海鱼、黑海凤尾鱼、海鲜前菜及热烤哈尔瓦甜点。",
  };

  const currentTitle = titles[lang] || titles.en;
  const currentDesc = descriptions[lang] || descriptions.en;

  return {
    title: currentTitle,
    description: currentDesc,
    alternates: {
      canonical: `${siteUrl}/${lang}/menu`,
      languages: {
        "x-default": `${siteUrl}/menu`,
        en: `${siteUrl}/en/menu`,
        ar: `${siteUrl}/ar/menu`,
        tr: `${siteUrl}/tr/menu`,
        ru: `${siteUrl}/ru/menu`,
        fa: `${siteUrl}/fa/menu`,
        fr: `${siteUrl}/fr/menu`,
        de: `${siteUrl}/de/menu`,
        it: `${siteUrl}/it/menu`,
        es: `${siteUrl}/es/menu`,
        zh: `${siteUrl}/zh/menu`,
      },
    },
    openGraph: {
      title: currentTitle,
      description: currentDesc,
      url: `${siteUrl}/${lang}/menu`,
      type: "website",
    },
  };
}

export default async function LocalizedMenuPage({ params }) {
  const { lang } = await params;
  return (
    <div data-locale={lang} className="localized-menu-wrapper">
      <MenuPage />
    </div>
  );
}
