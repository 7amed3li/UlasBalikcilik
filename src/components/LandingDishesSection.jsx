"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fire, ForkKnife, ArrowUpRight, ArrowUpLeft, CaretRight, CaretLeft, Coins, Check, MagnifyingGlassPlus, Phone } from "@phosphor-icons/react";
import { useAppContext } from "../context/AppContext";
import SaudiRiyalIcon from "./SaudiRiyalIcon";
import DishModal from "./DishModal";
import { menuData } from "../data/menuData";

// Helper: find a menu item by id from menuData (used to resolve live prices from Supabase)
const allMenuItems = menuData.flatMap(cat => cat.items || []);
const getMenuItemById = (id) => allMenuItems.find(item => item.id === id) || null;

// menuItemId maps each landing dish to its Supabase item ID for live price lookup
export const landingDishesData = {
  ar: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "الطبق المميز",
      desc: "لحم مفروم يدوياً ومتبل بالفلفل، مشوي على الفحم الطبيعي ويقدم مع الخبز الساخن.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "وصفة المطعم",
      desc: "كباب ملفوف في خبز مقرمش من الفرن، مغطى بصلصة الطماطم والزبدة ويقدم مع اللبن الطازج.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "تكفي 2-3 أشخاص",
      desc: "تشكيلة مشوية على الفحم: كباب أضنة، شيش طاووق، أوصال لحم، كفتة وأجنحة دجاج.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "من الفرن الحجري",
      desc: "عجينة رقيقة مغطاة بقطع اللحم المتبلة وجبن القشقوان الذائب وتُخبز فور الطلب.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "مخبوز في دقيقتين",
      desc: "عجينة رقيقة جداً ومقرمشة بلحم مفروم متبل بالفرن التركي، تقدم مع خس، بقدونس، طماطم وليمون.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "حلوى طازجة",
      desc: "كنافة مقرمشة محشوة بالجبن الذائب وتُسقى بالقطر الساخن مع الفستق الحلبي.",
      image: "/images/kunefe.webp",
    },

  ],
  en: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "Signature Since 1998",
      desc: "Prime lamb & beef hand-minced with traditional Zırh knife, spiced with Urfa pepper, slow-grilled over natural oak embers.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Heritage Recipe",
      desc: "Tender kebab wrapped in stone-baked lavash, topped with sizzling melted butter tomato sauce and fresh farm yoghurt.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "Grand Feast for 2-3",
      desc: "The ultimate charcoal feast: Adana kebab, tender lamb cubes, chicken shish, Inegol meatballs & marinated wings with home mezes.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "Stone Oven 450°C",
      desc: "Fresh hand-stretched dough, marinated tender beef cuts, and premium melting Kaşar cheese, baked instantly on hot stone tiles.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Baked to Order",
      desc: "Ultra-thin crispy dough topped with seasoned minced meat, baked in a stone oven, served with lettuce, parsley, tomatoes, and lemon.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Artisanal Dessert",
      desc: "Golden crispy shredded phyllo pastry with molten stringy cheese, scented warm syrup, and generous green Antep pistachios.",
      image: "/images/kunefe.webp",
    },
  ],

  tr: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "1998'den Beri İmza Lezzet",
      desc: "Günlük taze kuzu ve dana eti, geleneksel zırh bıçağı ile elde kıyılarak meşe kömürü ateşinde közlenir. Tırnak pide ve köz biberle sunulur.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Tarihi Reçete",
      desc: "Taş fırından yeni çıkmış sıcak lavaşa sarılan zırh kebabı, tereyağlı özel domates sosu ve süzme yoğurt eşliğinde servis edilir.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "2-3 Kişilik Şölen",
      desc: "Meşe kömüründe pişen Adana kebap, kuzu şiş, tavuk şiş, İnegöl köfte ve kanat; köz sebzeler ve taze mezeler ile.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "450°C Taş Fırın",
      desc: "Anında açılan ince hamur, marine edilmiş dana eti ve eriyen leziz kaşar peyniri ile odun ateşinde nar gibi kızarır.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Anında Fırından",
      desc: "İncecik çıtır hamur, özenle hazırlanan kıyma harcı ile taş fırında pişirilir; kıvırcık marul, maydanoz, domates ve limon eşliğinde servis edilir.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Sıcak Servis",
      desc: "Altın sarısı kadayıf, sünme Hatay peyniri, sıcak şerbet ve hakiki Antep fıstığı tozu ile tatlı bir lezzet şöleni.",
      image: "/images/kunefe.webp",
    },
  ],
  ru: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "Хит с 1998 года",
      desc: "Свежая баранина и телятина, рубленная вручную османским ножом Зырх, обжаренная на углях из дуба. Подается с горячим лавашем.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Исторический рецепт",
      desc: "Сочный кебаб, запеченный в хрустящем лаваше, политый горячим томатно-сливочным маслом и подаваемый с фермерским йогуртом.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "Блюдо для 2-3 гостей",
      desc: "Богатое ассорти: Адана кебаб, шашлык из баранины, куриный шашлык, котлеты Инегёль и крылышки на углях с мезе.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "Каменная печь 450°C",
      desc: "Тонкое тесто ручной раскатки, маринованная сочная говядина и тянущийся сыр, выпекается на раскаленном камне печи.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Выпекается за 2 мин",
      desc: "Ультратонкая хрустящая лепешка с мясным фаршем, запеченная в каменной печи, подается с листьями салата, петрушкой, помидорами и лимоном.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Традиционный десерт",
      desc: "Золотистое хрустящее тесто кадаиф, тягучий сыр, горячий ароматный сироп и щедрая порция зеленых фисташек.",
      image: "/images/kunefe.webp",
    },
  ],
  fa: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "شاهکار رستوران از ۱۹۹۸",
      desc: "گوشت تازه بره و گوساله ساطوری شده با چاقوی زره و فلفل اورفا، کباب شده روی زغال طبیعی بلوط با نان لواش داغ تنوری.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "دستورپخت تاریخی",
      desc: "کباب لذیذ پیچیده شده در نان تنوری با سس کره مخصوص گوجه‌فرنگی و ماست چکیده سنتی تازه.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "ولیمه ۲ الی ۳ نفره",
      desc: "مجموعه کباب‌های زغالی: کباب آدانا، کباب برگ و چنجه بره، جوجه کباب، کوفته مخصوص و بال کبابی با مخلفات.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "پخت در تنور ۴۵۰ درجه",
      desc: "خمیر دست‌ساز تازه، گوشت تازه مرینیت شده و پنیر درجه یک کاشار، پخته شده بر روی سنگ داغ تنور هیزمی.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "دست‌ساز و برشته",
      desc: "خمیر بسیار نازک و ترد با گوشت چرخ‌کرده، پخته شده در تنور سنگی، سرو شده با کاهو، جعفری، گوجه فرنگی و لیمو.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "دسر اصیل شیرین",
      desc: "رشته‌های کادایف طلایی با پنیر مخصوص و شهد داغ معطر و پودر پسته اعلا.",
      image: "/images/kunefe.webp",
    },
  ],
  fr: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "Plat Signature Depuis 1998",
      desc: "Agneau et bœuf frais hachés au couteau traditionnel, assaisonnés au piment d'Antep et grillés sur braises de chêne avec lavash chaud.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Recette Historique",
      desc: "Kebab roulé dans un pain lavash croustillant, nappé de sauce tomate au beurre fondu et servi avec du yaourt frais fermier.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "Festin pour 2-3 personnes",
      desc: "Le festin au charbon de bois : Adana kebab, agneau tendre, brochettes de poulet, boulettes İnegöl et ailes grillées.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "Four à Pierre 450°C",
      desc: "Pâte fine étalée à la minute, dés de viande marinée et fromage Kaşar fondant, cuite sur pierre volcanique au feu de bois.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Cuit à la Minute",
      desc: "Pâte extra-fine garnie de viande hachée, cuite au four à pierre, servie avec de la laitue, du persil, des tomates et du citron.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Dessert Chaud Artisanal",
      desc: "Cheveux d'ange dorés, fromage fondant d'Antakya, sirop parfumé chaud et éclats de pistaches vertes.",
      image: "/images/kunefe.webp",
    },
  ],
  de: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "Signatur seit 1998",
      desc: "Lamm- und Rindfleisch, handgehackt mit dem Zırh-Messer, gewürzt und auf Eichenglut gegrillt.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Historisches Rezept",
      desc: "Zarter Kebab in knusprigem Lavash, mit geschmolzener Butter-Tomatensauce und frischem Joghurt.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "Festmahl für 2-3",
      desc: "Das ultimative Grillfest: Adana Kebab, Lammspieß, Hähnchenspieß, Inegöl-Frikadellen & Flügel.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "Steinofen 450°C",
      desc: "Frischer Teig, mariniertes Rindfleisch und schmelzender Kaşar-Käse, gebacken auf heißem Stein.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Frisch gebacken",
      desc: "Hauchdünner knuspriger Teig mit gewürztem Hackfleisch, gebacken im Steinofen, serviert mit Salat, Petersilie, Tomaten und Zitrone.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Handwerkliches Dessert",
      desc: "Goldbraun gebackener Engelshaar-Teig mit geschmolzenem Käse, warmem Sirup und Pistazien.",
      image: "/images/kunefe.webp",
    },
  ],
  it: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "Firma dal 1998",
      desc: "Agnello e manzo tritati a mano con il coltello Zırh, speziati e grigliati su brace di quercia.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Ricetta Storica",
      desc: "Kebab tenero avvolto in lavash croccante, condito con salsa di pomodoro al burro fuso e yogurt fresco.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "Banchetto per 2-3",
      desc: "Il banchetto definitivo: Adana kebab, spiedini di agnello, pollo, polpette Inegöl e ali marinate.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "Forno a Pietra 450°C",
      desc: "Impasto fresco, manzo marinato e formaggio Kaşar fuso, cotto istantaneamente su pietra calda.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Cotto al momento",
      desc: "Impasto sottilissimo e croccante con carne macinata speziata, cotto nel forno di pietra, servito con lattuga, prezzemolo, pomodori e limone.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Dessert Artigianale",
      desc: "Pasta fillo dorata e croccante con formaggio fuso, sciroppo caldo e pistacchi di Antep.",
      image: "/images/kunefe.webp",
    },
  ],
  es: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "Firma desde 1998",
      desc: "Cordero y ternera picados a mano con cuchillo Zırh, especiados y asados a las brasas de roble.",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Receta Histórica",
      desc: "Tierno kebab envuelto en lavash crujiente, cubierto con salsa de tomate con mantequilla derretida y yogur.",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "Banquete para 2-3",
      desc: "El gran banquete: Adana kebab, brochetas de cordero, pollo, albóndigas Inegöl y alitas marinadas.",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "Horno de Piedra 450°C",
      desc: "Masa fresca, ternera marinada y queso Kaşar derretido, horneado al instante sobre piedra caliente.",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Horneado al instante",
      desc: "Masa extrafina y crujiente con carne picada especiada, horneada en horno de piedra, servida con lechuga, perejil, tomates y limón.",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Postre Artesanal",
      desc: "Masa dorada y crujiente con queso derretido, sirope caliente perfumado y pistachos de Antep.",
      image: "/images/kunefe.webp",
    },
  ],
  zh: [
    {
      id: "adana",
      menuItemId: "adana_urfa",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "1998年以来的招牌",
      desc: "优质羊肉和牛肉，使用传统Zırh刀手工切碎，加入香料并在橡木炭火上慢烤。",
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      menuItemId: "beyti_kebap",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "历史秘方",
      desc: "嫩烤肉包裹在酥脆的薄饼中，淋上热黄油番茄酱，配以新鲜酸奶。",
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      menuItemId: "karisik_kebap_1",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "2-3人盛宴",
      desc: "终极炭火盛宴：阿达纳烤肉、嫩羊肉块、鸡肉串、Inegol肉丸和腌制鸡翅。",
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      menuItemId: "kusbasili_kasarli_pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "石炉 450°C",
      desc: "新鲜手擀面团，腌制嫩牛肉块和优质融化奶酪，在热石板上即时烘烤。",
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      menuItemId: "lahmacun_item",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "现点现烤",
      desc: "超薄酥脆面团，铺上调味碎肉，在石炉中烘烤，配以生菜、欧芹、西红柿和柠檬。",
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      menuItemId: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "手工甜点",
      desc: "金黄酥脆的丝状面点，内含融化的拉丝奶酪，淋上热糖浆并撒上开心果。",
      image: "/images/kunefe.webp",
    },
  ],
};

const currencyOptions = [
  { code: "TRY", label: "TRY", symbol: "₺" },
  { code: "USD", label: "USD", symbol: "$" },
  { code: "EUR", label: "EUR", symbol: "€" },
  { code: "SAR", label: "SAR", symbol: <SaudiRiyalIcon className="h-3.5 w-auto inline-block" /> },
  { code: "RUB", label: "RUB", symbol: "₽" },
  { code: "GBP", label: "GBP", symbol: "£" },
];

const uiLabels = {
  ar: {
    badge: "قائمة المشاوي",
    title: "أطباق مشوية على الفحم الطبيعي",
    subtitle: "أسعار المنيو الحقيقية مع إمكانية التحويل المباشر للعملات:",
    currencyHint: "اختر العملة المفضلة:",
    orderNow: "اطلب الآن",
    woodFired: "مشوي على الفحم",
    viewFullMenu: "تصفح المنيو الكامل (+100 صنف)",
  },
  en: {
    badge: "Chef's Signature Selection",
    title: "Legendary Dishes Grilled on Oak Embers",
    subtitle: "Official live menu prices with instant currency conversion for international travelers:",
    currencyHint: "Select your preferred display currency:",
    orderNow: "Call to Order",
    woodFired: "Oak Charcoal Grilled",
    viewFullMenu: "Explore Full Digital Menu (100+ items with currency converter)",
  },
  tr: {
    badge: "Şefin Özel Seçimleri",
    title: "Meşe Kömüründe Pişen Efsane Lezzetler",
    subtitle: "Canlı ve güncel menü fiyatları (farklı para birimleriyle görüntüleyebilirsiniz):",
    currencyHint: "Görüntüleme para birimini seçin:",
    orderNow: "Sipariş İçin Ara",
    woodFired: "Meşe Kömürü Ateşinde",
    viewFullMenu: "Tüm Dijital Menüyü İnceleyin (100+ Çeşit)",
  },
  ru: {
    badge: "Выбор шеф-повара",
    title: "Легендарные блюда на углях из дуба",
    subtitle: "Официальные актуальные цены с мгновенной конвертацией в рубли, доллары и евро:",
    currencyHint: "Выберите удобную валюту:",
    orderNow: "Позвонить для заказа",
    woodFired: "На натуральных углях",
    viewFullMenu: "Смотреть полное меню (более 100 блюд с конвертером)",
  },
  fa: {
    badge: "پیشنهادهای سرآشپز",
    title: "غذاهای شاهکار پخته شده روی زغال بلوط",
    subtitle: "قیمت‌های رسمی منو با قابلیت تبدیل خودکار به دلار، یورو، ریال و لیر:",
    currencyHint: "انتخاب واحد پول نمایشی:",
    orderNow: "تماس برای سفارش",
    woodFired: "پخت روی زغال چوب",
    viewFullMenu: "مشاهده منوی کامل (بیش از ۱۰۰ تنوع غذایی)",
  },
  fr: {
    badge: "Sélection du Chef",
    title: "Grillades d'Exception sur Braises de Chêne",
    subtitle: "Tarifs officiels avec conversion en direct en Euros, Dollars et autres devises :",
    currencyHint: "Choisissez votre devise d'affichage :",
    orderNow: "Appeler pour commander",
    woodFired: "Braises de Chêne",
    viewFullMenu: "Découvrir notre Menu Complet (100+ Plats avec convertisseur)",
  },
  de: {
    badge: "Empfehlung des Küchenchefs",
    title: "Legendäre Gerichte auf Eichenglut",
    subtitle: "Aktuelle Menüpreise mit Währungsumrechnung:",
    currencyHint: "Währung auswählen:",
    orderNow: "Anrufen zum Bestellen",
    woodFired: "Auf Eichenholz gegrillt",
    viewFullMenu: "Komplettes Menü ansehen (100+ Gerichte)",
  },
  it: {
    badge: "Selezione dello Chef",
    title: "Piatti Leggendari alla Brace di Quercia",
    subtitle: "Prezzi ufficiali del menu con conversione di valuta in tempo reale:",
    currencyHint: "Seleziona la tua valuta:",
    orderNow: "Chiama per ordinare",
    woodFired: "Grigliato a Carbone",
    viewFullMenu: "Esplora il Menu Completo (100+ piatti)",
  },
  es: {
    badge: "Selección del Chef",
    title: "Platos Legendarios a la Brasa de Roble",
    subtitle: "Precios oficiales del menú con conversión de moneda:",
    currencyHint: "Seleccione su moneda:",
    orderNow: "Llamar para pedir",
    woodFired: "Asado a la Brasa de Roble",
    viewFullMenu: "Ver Menú Completo (100+ platos)",
  },
  zh: {
    badge: "主厨招牌精选",
    title: "橡木炭火烤制的传奇菜肴",
    subtitle: "官方实时菜单价格，带货币转换功能：",
    currencyHint: "选择您喜欢的显示货币：",
    orderNow: "致电订购",
    woodFired: "橡木炭烤",
    viewFullMenu: "查看完整数字菜单 (100多种菜品)",
  },
};

export default function LandingDishesSection({ currentLocale = "ar" }) {
  const { currency, changeCurrency, convertPrice, getCurrencySymbol, getLivePrice } = useAppContext();
  const [modalDish, setModalDish] = useState(null);

  const dishes = landingDishesData[currentLocale] || landingDishesData.en;
  const labels = uiLabels[currentLocale] || uiLabels.en;
  const isRtl = currentLocale === "ar" || currentLocale === "fa";

  // Resolve live price from Supabase via menuItemId → menuData item → getLivePrice
  const getDishLivePrice = (dish) => {
    if (!dish.menuItemId) return 0;
    const menuItem = getMenuItemById(dish.menuItemId);
    if (!menuItem) return 0;
    return getLivePrice(menuItem);
  };

  const phoneOrderLink = "tel:+902122513696";

  return (
    <section className="py-14 sm:py-20 bg-[#EDE3CE] border-y border-[#9C7A3F]/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider">
            <ForkKnife size={16} weight="duotone" />
            <span>{labels.badge}</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2B2620]"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {labels.title}
          </h2>
          <div className="h-0.5 w-20 bg-[#9C7A3F]/40 mx-auto"></div>
          <p className="text-[#7A7364] text-xs sm:text-sm md:text-base font-medium">
            {labels.subtitle}
          </p>
        </div>

        {/* Currency Switcher Pill Bar */}
        <div className="max-w-xl mx-auto p-2 sm:p-2.5 rounded-xl bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-sm">
          <div className="flex items-center justify-between gap-2 px-2 pb-2 text-[11px] sm:text-xs text-[#9C7A3F] font-bold">
            <span className="flex items-center gap-1.5">
              <Coins size={13} />
              <span>{labels.currencyHint}</span>
            </span>
            <span className="text-[#7A7364] text-[10px] flex items-center gap-1">
              <span>{currency}</span>
              <span>
                (
                {currency === "SAR" ? (
                  <SaudiRiyalIcon className="h-3 w-auto inline-block text-[#9C7A3F] fill-current" />
                ) : (
                  getCurrencySymbol()
                )}
                )
              </span>
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {currencyOptions.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => changeCurrency(c.code)}
                  className={`py-2 px-1.5 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${isSelected
                      ? "bg-[#4E5F4C] text-[#EAF0E6]"
                      : "bg-[#EDE3CE] text-[#2B2620] border border-[#9C7A3F]/20 hover:border-[#9C7A3F]"
                    }`}
                >
                  <span>{c.code}</span>
                  <span className="flex items-center opacity-90">{c.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {dishes.map((dish) => {
            // Live price from Supabase via menuItemId — never hardcoded
            const livePriceTRY = getDishLivePrice(dish);
            const converted = convertPrice(livePriceTRY);
            const symbol = getCurrencySymbol();

            return (
              <div
                key={dish.id}
                className="bg-[#F7F2E7] rounded-xl overflow-hidden border border-[#9C7A3F]/30 shadow-sm flex flex-col group transition-transform hover:scale-101"
              >
                {/* Clickable Image Area */}
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-[#EDE3CE]"
                  onClick={() => setModalDish(dish)}
                  role="button"
                  aria-label={`View details for ${dish.name}`}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover zoom hint overlay */}
                  <div className="absolute inset-0 bg-[#2B2620]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-[#4E5F4C] flex items-center justify-center text-white">
                      <MagnifyingGlassPlus size={20} weight="bold" />
                    </div>
                  </div>

                  <div className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-[#2B2620] text-[#EDE3CE] text-[11px] font-bold uppercase tracking-wider">
                    {dish.tag}
                  </div>

                  {/* Dynamic Converted Price Badge — sourced from Supabase */}
                  {livePriceTRY != null && (
                    <div className="absolute top-3 end-3 px-3 py-1.5 rounded-md bg-[#4E5F4C] text-[#EAF0E6] shadow-sm flex flex-col items-end leading-tight">
                      <span className="text-xs font-black tracking-tight flex items-center gap-1">
                        {currency !== "TRY" && (
                          <>
                            <span>{converted}</span>
                            {currency === "SAR" ? (
                              <SaudiRiyalIcon className="h-3.5 w-auto inline-block fill-current" />
                            ) : (
                              <span>{symbol}</span>
                            )}
                          </>
                        )}
                        {currency === "TRY" && `${livePriceTRY} ₺`}
                      </span>
                      {currency !== "TRY" && (
                        <span className="text-[9px] font-bold opacity-90">
                          ({livePriceTRY} ₺)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div
                    className="cursor-pointer"
                    onClick={() => setModalDish(dish)}
                  >
                    <h3 className="text-base sm:text-lg font-bold text-[#2B2620] group-hover:text-[#9C7A3F] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A7364] font-medium leading-relaxed mt-1">
                      {dish.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#9C7A3F]/20 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#9C7A3F] font-semibold flex items-center gap-1">
                      <Fire size={16} weight="duotone" /> {labels.woodFired}
                    </span>
                    <a
                      href={phoneOrderLink}
                      className="px-3.5 py-1.5 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone size={14} weight="bold" />
                      <span>{labels.orderNow}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>{labels.viewFullMenu}</span>
            {isRtl ? <ArrowUpLeft size={16} /> : <ArrowUpRight size={16} />}
          </Link>
        </div>
      </div>

      {/* Dish Detail Modal — item resolved from menuData for live price via getLivePrice */}
      {modalDish && (
        <DishModal
          isOpen={!!modalDish}
          setIsOpen={(open) => { if (!open) setModalDish(null); }}
          item={modalDish.menuItemId ? getMenuItemById(modalDish.menuItemId) : null}
          customName={modalDish.name}
          customDesc={modalDish.desc}
          customImage={modalDish.image}
          customTags={["signature"]}
          hideCart={true}
        />
      )}
    </section>
  );
}
