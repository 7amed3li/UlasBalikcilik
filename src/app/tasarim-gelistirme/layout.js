import { devProfileContent } from "@/data/developerProfile";

export const metadata = {
  title: devProfileContent.tr.meta.title,
  description: devProfileContent.tr.meta.description,
  openGraph: {
    title: devProfileContent.tr.meta.title,
    description: devProfileContent.tr.meta.description,
    url: "https://www.ulasbalik.com/tasarim-gelistirme",
    siteName: "Ulaş Balıkçılık",
    locale: "tr_TR",
    type: "profile",
  },
};

export default function TasarimGelistirmeLayout({ children }) {
  return children;
}
