"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Flame, Compass } from 'lucide-react';
import DishModal from './DishModal';

export default function SeoStorytelling({ locale = 'en' }) {
  const [activeModal, setActiveModal] = useState(null);
  const content = {
    en: {
      storyTitle: "A Heritage Born in Cihangir",
      storyText1: "Just a short walk from the bustling center of Taksim Square lies Cihangir, Beyoğlu’s most historic and bohemian neighborhood. It is here, among winding streets favored by artists and culinary enthusiasts, that Kardeşler Kebap was established in 1998.",
      storyText2: "While tourist-focused restaurants come and go on Istiklal Avenue, we have stood as a bastion of genuine local flavor. We are not just a restaurant; we are a family tradition dedicated to preserving the rich heritage of authentic Anatolian grilling and warm Turkish hospitality.",
      craftTitle: "The Mastery of Fire & Stone",
      craftText1: "We compromise on nothing. Our master chefs continue to use the traditional heavy crescent knife, known as a 'Zırh', to hand-mince our 100% fresh, daily halal meat, completely rejecting frozen products.",
      craftText2: "Once prepared, the kebabs are slow-roasted over real oak charcoal embers. Equally important is our 450°C stone oven, the heart of our bakery, where every lahmacun and wood-fired pide is baked fresh to order to achieve the perfect crispy balance.",
      kebabDesc: "A luxurious mix of our finest kebabs, slowly charcoal-grilled to perfection.",
      lahmacunDesc: "Authentic Turkish Lahmacun baked in our 450°C stone oven for the perfect crispiness.",
      viewDish: "View Dish",
      hospitalityTitle: "A Warm Anatolian Welcome",
      hospitalityText1: "Every guest at Kardeşler Kebap is treated like family. Our commitment goes beyond serving Istanbul's best kebab; it's about providing a traditional dining experience in a cozy, authentic atmosphere.",
      hospitalityText2: "Whether you are a local artisan from Cihangir or a traveler exploring Beyoğlu, our doors are open until 2:00 AM, offering a safe, vibrant, and unforgettable taste of Turkey.",
      qualityTitle: "100% Halal & Daily Freshness",
      qualityText1: "The secret to our legendary flavor is uncompromised quality. We source our meat daily from trusted local farms, ensuring every cut is 100% Halal and entirely free from freezing or artificial preservatives.",
      qualityText2: "Combined with hand-picked spices from Gaziantep and baked in our traditional stone oven using pure oak wood, every dish is a masterpiece of Anatolian culinary arts."
    },
    ar: {
      storyTitle: "من قلب جيهانكير.. وُلدت الحكاية",
      storyText1: "على بُعد مسافة قصيرة من صخب ميدان تقسيم، يقع حي جيهانكير، الحي الأكثر عراقة وفناً في منطقة بيوغلو. وهنا، وسط الشوارع المتعرجة التي يفضلها الفنانون وعشاق الطعام الأصيل، تأسس مطعم كارديشلر كباب في عام 1998.",
      storyText2: "وبينما تظهر وتختفي المطاعم السياحية في شارع الاستقلال، صمدنا كمعقل للنكهة المحلية الأصيلة. نحن تقليد عائلي مكرس للحفاظ على التراث الغني للشواء الأناضولي الأصيل وحسن الضيافة التركية في قلب إسطنبول.",
      craftTitle: "سر النكهة: نار السنديان وحجر الفرن",
      craftText1: "لا نساوم أبداً على الجودة. لا يزال طهاتنا يستخدمون السكين الهلالي الثقيل 'الزره' (Zırh) لفرم اللحم يدوياً للحفاظ على عصارته، مستخدمين لحوماً حلال طازجة 100% يومياً ومبتعدين تماماً عن المجمدات.",
      craftText2: "يتم شواء الكباب ببطء على جمر السنديان الحقيقي. وبنفس الأهمية يأتي فرننا الحجري بدرجة حرارة 450 مئوية، حيث تُخبز كل قطعة من اللحمجون وفطائر البيدا طازجة عند الطلب للوصول إلى القرمشة المثالية.",
      kebabDesc: "مزيج فاخر من أفضل أنواع الكباب لدينا، مشوي على الفحم ببطء للوصول إلى الطعم المثالي.",
      lahmacunDesc: "اللحمجون التركي الأصيل المحضر في فرننا الحجري على حرارة 450 مئوية.",
      viewDish: "عرض التفاصيل",
      hospitalityTitle: "ترحيب الأناضول الدافئ",
      hospitalityText1: "في كارديشلر كباب، نتعامل مع كل ضيف كفرد من العائلة. التزامنا يتجاوز مجرد تقديم أفضل كباب في إسطنبول؛ بل يمتد لتوفير تجربة طعام تقليدية في جو دافئ وأصيل يعكس كرم الضيافة التركية.",
      hospitalityText2: "سواء كنت من سكان جيهانكير المحليين أو مسافراً تستكشف منطقة بيوغلو، أبوابنا مفتوحة حتى الساعة 2:00 صباحاً، لنقدم لك مذاقاً تركياً لا يُنسى في بيئة آمنة وحيوية.",
      qualityTitle: "جودة حلال 100% وطازجة يومياً",
      qualityText1: "سر نكهتنا الأسطورية يكمن في الجودة التي لا نساوم عليها. نستورد لحومنا يومياً من مزارع محلية موثوقة، مما يضمن أن كل قطعة حلال 100% وخالية تماماً من التجميد أو المواد الحافظة الاصطناعية.",
      qualityText2: "ممزوجة بتوابل مختارة يدوياً من غازي عنتاب ومخبوزة في فرننا الحجري التقليدي باستخدام خشب البلوط الصافي، ليصبح كل طبق تحفة فنية من فنون الطهي الأناضولي."
    },
    ru: {
      storyTitle: "Наследие, рожденное в Джихангире",
      storyText1: "Всего в нескольких минутах ходьбы от шумного центра площади Таксим находится Джихангир, самый исторический и богемный район Бейоглу. Именно здесь, на извилистых улочках, в 1998 году был основан Kardeşler Kebap.",
      storyText2: "В то время как туристические рестораны на улице Истикляль открываются и закрываются, мы остаемся оплотом истинного местного вкуса и семейной традицией, сохраняющей настоящее анатолийское мастерство приготовления на гриле и турецкое гостеприимство.",
      craftTitle: "Мастерство Огня и Камня",
      craftText1: "Мы не идем на компромиссы. Наши шеф-повара используют традиционный тяжелый нож 'Zırh' для ручной рубки свежего 100% халяльного мяса каждый день, полностью отказываясь от замороженных продуктов.",
      craftText2: "Кебабы медленно жарятся на углях из натурального дуба. Не менее важна наша каменная печь при 450°C, где каждый лахмаджун и пиде на дровах выпекаются на заказ до идеального хруста.",
      kebabDesc: "Роскошный микс наших лучших кебабов, медленно приготовленных на углях до совершенства.",
      lahmacunDesc: "Настоящий турецкий лахмаджун, запеченный в каменной печи при 450°C для идеального хруста.",
      viewDish: "Смотреть Блюдо",
      hospitalityTitle: "Теплый Анатолийский Прием",
      hospitalityText1: "К каждому гостю в Kardeşler Kebap относятся как к члену семьи. Мы стремимся не просто подавать лучший кебаб в Стамбуле, но и обеспечивать традиционную трапезу в уютной, аутентичной атмосфере.",
      hospitalityText2: "Будь вы местный ремесленник из Джихангира или путешественник, исследующий Бейоглу, наши двери открыты до 2:00 ночи, предлагая вам безопасный, яркий и незабываемый вкус Турции.",
      qualityTitle: "100% Халяль и Ежедневная Свежесть",
      qualityText1: "Секрет нашего легендарного вкуса заключается в бескомпромиссном качестве. Мы ежедневно закупаем мясо на проверенных местных фермах, гарантируя, что оно 100% халяльное и никогда не подвергалось заморозке.",
      qualityText2: "В сочетании со специями ручной сборки из Газиантепа и выпечкой в традиционной каменной печи на чистых дубовых дровах, каждое блюдо становится шедевром анатолийского кулинарного искусства."
    },
    tr: {
      storyTitle: "Cihangir'de Doğan Bir Miras",
      storyText1: "Taksim Meydanı'nın hareketli merkezinden sadece kısa bir yürüyüş mesafesinde, Beyoğlu'nun en tarihi ve bohem semti Cihangir yer alır. Kardeşler Kebap, 1998 yılında sanatçıların ve lezzet tutkunlarının gözdesi olan bu dolambaçlı sokaklarda kuruldu.",
      storyText2: "İstiklal Caddesi'nde turistik restoranlar açılıp kapanırken, biz gerçek yerel lezzetlerin kalesi olarak ayakta kaldık. Biz sadece bir restoran değiliz; otantik Anadolu ızgara mirasını ve sıcak Türk misafirperverliğini yaşatmaya adanmış bir aile geleneğiyiz.",
      craftTitle: "Ateş ve Taşın Ustalığı",
      craftText1: "Kaliteden asla ödün vermeyiz. Ustalarımız, dondurulmuş ürünleri tamamen reddederek, %100 taze günlük helal etimizi 'Zırh' adı verilen geleneksel ağır bıçakla elde zırhlamaya devam ediyor.",
      craftText2: "Hazırlanan kebaplar, gerçek meşe kömürü ateşinde yavaşça közlenir. Aynı derecede önemli olan, her bir lahmacun ve odun ateşli pidenin mükemmel çıtırlığa ulaşmak için sipariş üzerine taze olarak pişirildiği 450°C'lik taş fırınımızdır.",
      kebabDesc: "En iyi kebaplarımızın mükemmel kıvamda meşe kömüründe pişirilmiş lüks karışımı.",
      lahmacunDesc: "Mükemmel çıtırlık için 450°C taş fırınımızda pişirilen otantik Türk Lahmacunu.",
      viewDish: "Yemeği Gör",
      hospitalityTitle: "Sıcak Bir Anadolu Karşılaması",
      hospitalityText1: "Kardeşler Kebap'ta her misafirimiz ailemizden biri gibi ağırlanır. Amacımız sadece İstanbul'un en iyi kebabını sunmak değil; aynı zamanda samimi ve otantik bir atmosferde geleneksel bir yemek deneyimi yaşatmaktır.",
      hospitalityText2: "İster Cihangir'in yerel bir esnafı olun, ister Beyoğlu'nu keşfeden bir gezgin; kapılarımız gece 2:00'ye kadar açık olup size güvenli, canlı ve unutulmaz bir Türkiye lezzeti sunmaktadır.",
      qualityTitle: "%100 Helal ve Günlük Tazelik",
      qualityText1: "Efsanevi lezzetimizin sırrı ödün vermediğimiz kalitemizdir. Etlerimizi her gün güvenilir yerel çiftliklerden temin ediyor, her parçanın %100 Helal olmasını ve dondurulmuş veya yapay koruyuculardan tamamen uzak olmasını sağlıyoruz.",
      qualityText2: "Gaziantep'ten özenle seçilen baharatlarla harmanlanan ve saf meşe odunu kullanılarak geleneksel taş fırınımızda pişirilen her tabak, Anadolu mutfak sanatlarının bir başyapıtıdır."
    },
    fa: {
      storyTitle: "میراثی متولد شده در جهانگیر",
      storyText1: "تنها با چند دقیقه پیاده‌روی از مرکز پر هیاهوی میدان تکسیم، محله جهانگیر، تاریخی‌ترین و هنری‌ترین محله بی‌اوغلو قرار دارد. در همین کوچه‌های پرپیچ و خم محبوب هنرمندان و عاشقان غذا بود که کاردشلر کباب در سال ۱۹۹۸ تاسیس شد.",
      storyText2: "در حالی که رستوران‌های توریستی خیابان استقلال مدام باز و بسته می‌شوند، ما به عنوان سنگری از طعم اصیل محلی پابرجا مانده‌اییم. ما فقط یک رستوران نیستیم؛ ما یک سنت خانوادگی هستیم که به حفظ میراث غنی کباب‌های آناتولی و مهمان‌نوازی گرم ترکی در قلب استانبول اختصاص یافته‌ایم.",
      craftTitle: "مهارت آتش و سنگ",
      craftText1: "ما هرگز در کیفیت سازش نمی‌کنیم. سرآشپزهای ما همچنان از چاقوی سنتی و سنگین هلالی شکل به نام «زره» (Zırh) برای خرد کردن دستی گوشت حلال ۱۰۰٪ تازه و روزانه استفاده می‌کنند و محصولات یخ‌زده را کاملاً رد می‌کنند.",
      craftText2: "کباب‌های آماده شده، روی زغال واقعی چوب بلوط به آرامی کباب می‌شوند. تنور سنگی ۴۵۰ درجه ما نیز به همان اندازه مهم است؛ قلب تپنده نانوایی ما که در آن هر لاهماجون و پیده هیزمی برای رسیدن به تردی کامل، تازه و به سفارش مشتری پخته می‌شود.",
      kebabDesc: "ترکیبی مجلل از بهترین کباب‌های ما که به آرامی روی زغال کباب شده‌اند.",
      lahmacunDesc: "لاهماجون اصیل ترکی که در تنور سنگی ۴۵۰ درجه ما برای تردی کامل پخته شده است.",
      viewDish: "مشاهده غذا",
      hospitalityTitle: "استقبال گرم آناتولی",
      hospitalityText1: "در کاردشلر کباب، با هر مهمان مانند یکی از اعضای خانواده رفتار می‌شود. تعهد ما فراتر از سرو بهترین کباب استانبول است؛ هدف ما ارائه یک تجربه غذاخوری سنتی در فضایی دنج و اصیل است.",
      hospitalityText2: "چه از اهالی جهانگیر باشید و چه مسافری در حال گشت و گذار در بی‌اوغلو، درهای ما تا ساعت ۲:۰۰ بامداد به روی شما باز است تا طعمی فراموش‌نشدنی، امن و پر جنب و جوش از ترکیه را به شما ارائه دهیم.",
      qualityTitle: "۱۰۰٪ حلال و تازگی روزانه",
      qualityText1: "راز طعم افسانه‌ای ما کیفیت بدون سازش است. ما گوشت خود را روزانه از مزارع محلی مورد اعتماد تهیه می‌کنیم و اطمینان می‌دهیم که هر قطعه ۱۰۰٪ حلال است و به هیچ وجه منجمد نمی‌شود.",
      qualityText2: "ترکیب این گوشت با ادویه‌های دست‌چین شده از غازی‌عینتاب و پخت در تنور سنگی سنتی ما با استفاده از چوب بلوط خالص، هر غذا را به یک شاهکار از هنر آشپزی آناتولی تبدیل می‌کند."
    },
    fr: {
      storyTitle: "Un Héritage Né à Cihangir",
      storyText1: "À quelques pas du centre animé de la place Taksim se trouve Cihangir, le quartier le plus historique et bohème de Beyoğlu. C'est ici, parmi les rues sinueuses prisées des artistes et des passionnés de gastronomie, que Kardeşler Kebap a été fondé en 1998.",
      storyText2: "Alors que les restaurants touristiques vont et viennent sur l'avenue Istiklal, nous sommes restés un bastion de saveurs locales authentiques. Nous ne sommes pas seulement un restaurant; nous sommes une tradition familiale dédiée à la préservation du riche héritage des grillades anatoliennes authentiques.",
      craftTitle: "La Maîtrise du Feu et de la Pierre",
      craftText1: "Nous ne faisons aucun compromis. Nos maîtres chefs continuent d'utiliser le lourd couteau traditionnel en croissant, le 'Zırh', pour hacher à la main notre viande halal 100% fraîche du jour.",
      craftText2: "Une fois préparés, les kebabs sont lentement rôtis sur de véritables braises de chêne. Tout aussi important est notre four en pierre à 450°C, où chaque lahmacun et pide au feu de bois est cuit à la commande pour obtenir un équilibre croustillant parfait.",
      kebabDesc: "Un mélange luxueux de nos meilleurs kebabs, lentement grillés au charbon de bois à la perfection.",
      lahmacunDesc: "Authentique Lahmacun turc cuit dans notre four en pierre à 450°C pour un croustillant parfait.",
      viewDish: "Voir le Plat",
      hospitalityTitle: "Un Accueil Chaleureux Anatolien",
      hospitalityText1: "Chaque invité chez Kardeşler Kebap est traité comme un membre de la famille. Notre engagement va au-delà de servir le meilleur kebab d'Istanbul ; il s'agit d'offrir une expérience culinaire traditionnelle dans une atmosphère chaleureuse.",
      hospitalityText2: "Que vous soyez un artisan local de Cihangir ou un voyageur explorant Beyoğlu, nos portes sont ouvertes jusqu'à 2h00 du matin, offrant un goût de la Turquie sûr, vibrant et inoubliable.",
      qualityTitle: "100% Halal et Fraîcheur Quotidienne",
      qualityText1: "Le secret de notre saveur légendaire est une qualité sans compromis. Nous nous approvisionnons quotidiennement en viande auprès de fermes locales de confiance, garantissant que chaque coupe est 100% Halal et totalement exempte de congélation.",
      qualityText2: "Combiné avec des épices cueillies à la main de Gaziantep et cuit dans notre four en pierre traditionnel en utilisant du bois de chêne pur, chaque plat est un chef-d'œuvre des arts culinaires anatoliens."
    }
  };

  const t = content[locale] || content.en;
  const isRtl = locale === 'ar' || locale === 'fa';
  
  // Custom float class for drop cap based on direction
  const dropCapFloat = isRtl ? "float-right ml-3" : "float-left mr-3";

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#EDE3CE] border-y border-[#9C7A3F]/20">
      <div className={`max-w-6xl mx-auto ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
          
          {/* Main Story Block (Bento Large) */}
          <div className="col-span-1 lg:col-span-7 bg-[#F7F2E7] rounded-2xl p-6 sm:p-10 border border-[#9C7A3F]/30 relative overflow-hidden group shadow-sm order-1">
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div className="w-12 h-[2px] bg-[#9C7A3F] mb-4 rounded-full"></div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.storyTitle}
              </h2>
              <div className="space-y-4 text-[#7A7364] text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  {isRtl ? (
                    t.storyText1
                  ) : (
                    <>
                      <span className={`text-5xl font-black text-[#9C7A3F] leading-none mt-1 float-left mr-3`} style={{ fontFamily: "var(--font-cairo)" }}>
                        {t.storyText1.charAt(0)}
                      </span>
                      {t.storyText1.substring(1)}
                    </>
                  )}
                </p>
                <p className="pt-2">{t.storyText2}</p>
              </div>
            </div>
          </div>

          {/* Image Block 1 */}
          <button 
            onClick={() => setActiveModal('kebab')}
            className="col-span-1 lg:col-span-5 relative min-h-[250px] sm:min-h-[320px] rounded-2xl overflow-hidden border border-[#9C7A3F]/30 shadow-sm block w-full text-left cursor-zoom-in group order-2 bg-[#EDE3CE]"
          >
            <Image 
              src="/images/27-Karisik-Kebap_1.webp" 
              alt="Authentic Kebab Taksim" 
              fill 
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-[#2B2620]/30 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-white text-xs font-bold bg-[#4E5F4C] px-4 py-2 rounded-md">{t.viewDish}</span>
            </div>
          </button>

          {/* Image Block 2 */}
          <button 
            onClick={() => setActiveModal('lahmacun')}
            className="col-span-1 lg:col-span-4 relative min-h-[250px] sm:min-h-[300px] rounded-2xl overflow-hidden border border-[#9C7A3F]/30 shadow-sm block w-full text-left cursor-zoom-in group order-4 lg:order-3 bg-[#EDE3CE]"
          >
            <Image 
              src="/images/lahmacun.webp" 
              alt="Stone Oven Lahmacun" 
              fill 
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
             <div className="absolute inset-0 bg-[#2B2620]/30 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-white text-xs font-bold bg-[#4E5F4C] px-4 py-2 rounded-md">{t.viewDish}</span>
            </div>
          </button>

          {/* Secondary Story Block */}
          <div className="col-span-1 lg:col-span-8 bg-[#F7F2E7] rounded-2xl p-6 sm:p-8 border border-[#9C7A3F]/30 relative overflow-hidden group shadow-sm order-3 lg:order-4">
            <div className="relative z-10 space-y-4 sm:space-y-5">
              <div className="w-12 h-[2px] bg-[#9C7A3F] mb-4 rounded-full"></div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.craftTitle}
              </h3>
              <div className="space-y-3 text-[#7A7364] text-sm sm:text-base leading-relaxed font-medium">
                <p>{t.craftText1}</p>
                <p>{t.craftText2}</p>
              </div>
            </div>
          </div>

          {/* SEO Block 3 (Hospitality) */}
          <div className="col-span-1 lg:col-span-6 bg-[#F7F2E7] rounded-2xl p-6 sm:p-8 border border-[#9C7A3F]/30 relative overflow-hidden group shadow-sm order-5">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-[2px] bg-[#9C7A3F] mb-4 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.hospitalityTitle}
              </h3>
              <div className="space-y-3 text-[#7A7364] text-sm leading-relaxed font-medium">
                <p>{t.hospitalityText1}</p>
                <p>{t.hospitalityText2}</p>
              </div>
            </div>
          </div>

          {/* SEO Block 4 (Quality) */}
          <div className="col-span-1 lg:col-span-6 bg-[#F7F2E7] rounded-2xl p-6 sm:p-8 border border-[#9C7A3F]/30 relative overflow-hidden group shadow-sm order-6">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-[2px] bg-[#9C7A3F] mb-4 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.qualityTitle}
              </h3>
              <div className="space-y-3 text-[#7A7364] text-sm leading-relaxed font-medium">
                <p>{t.qualityText1}</p>
                <p>{t.qualityText2}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Dish Modals */}
      <DishModal 
        isOpen={activeModal === 'kebab'} 
        setIsOpen={() => setActiveModal(null)} 
        customName="Karışık Kebap"
        customDesc={t.kebabDesc}
        customImage="/images/27-Karisik-Kebap_1.webp"
        hideCart={true}
      />
      <DishModal 
        isOpen={activeModal === 'lahmacun'} 
        setIsOpen={() => setActiveModal(null)} 
        customName="Taş Fırın Lahmacun"
        customDesc={t.lahmacunDesc}
        customImage="/images/lahmacun.webp"
        hideCart={true}
      />
    </section>
  );
}
