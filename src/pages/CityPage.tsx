import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCityBySlug, CITIES } from '@/data/cities';
import { CITY_SEO } from '@/data/citySeo';
import HomeFaq from '@/components/home/HomeFaq';
import CityHero from '@/components/city/CityHero';
import CityInfo from '@/components/city/CityInfo';
import CityReviews from '@/components/city/CityReviews';
import CityOrderForm from '@/components/city/CityOrderForm';
import Icon from '@/components/ui/icon';

const DEFAULT_HERO_IMG = 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/9c55a72e-8db7-4f0f-9133-153f82ea8a63.jpg';

const CITY_OVERRIDES: Record<string, { phone: string; phoneRaw: string; whatsapp: string; telegram: string; heroImg?: string }> = {
  novorossiysk: {
    phone: '+7 (918) 464-18-00',
    phoneRaw: '79184641800',
    whatsapp: 'https://wa.me/79184641800',
    telegram: 'https://t.me/+79184641800',
    heroImg: 'https://gorod-novoross.ru/foto/thumbs/1201.jpg',
  },
  adler: {
    phone: '+7 (918) 464-18-00',
    phoneRaw: '79184641800',
    whatsapp: 'https://wa.me/79184641800',
    telegram: 'https://t.me/+79184641800',
    heroImg: 'https://gorod-novoross.ru/foto/thumbs/1201.jpg',
  },
};

const EXTRA_KEYWORDS = (n: string) => [
  `чеки за проживание ${n}`,
  `закрывающие документы для командировки ${n}`,
  `документы для бухгалтерии гостиница ${n}`,
  `подтверждение проживания в гостинице ${n}`,
  `гостиничный чек для отчёта ${n}`,
  `чек из гостиницы для командировочных ${n}`,
  `оформление командировки ${n}`,
  `чеки отеля ${n}`,
  `купить чек за проживание ${n}`,
  `гостиничные чеки для бухгалтерии ${n}`,
];

const SEO_VARIANTS = [
  (c: string, ph: string) => ({
    title: `Гостиничные чеки в ${c} — купить для командировки и отчёта | ЧекГарант`,
    description: `Гостиничные чеки в ${c} для командировок и авансового отчёта: чеки за проживание, счёт, договор, QR-код. Проверка документов по email до оплаты. Звоните: ${ph}`,
  }),
  (c: string, ph: string) => ({
    title: `Чеки за проживание в ${c} для бухгалтерии — оформим быстро | ЧекГарант`,
    description: `Нужны документы о проживании в ${c}? Подготовим гостиничные чеки с QR-кодом для бухгалтерии и закрытия командировки. Сначала проверка на email, потом оплата. Телефон: ${ph}`,
  }),
  (c: string, ph: string) => ({
    title: `Закрывающие документы для командировки в ${c} — гостиничные чеки | ЧекГарант`,
    description: `Закрывающие документы для командировки в ${c}: гостиничный чек, счёт о проживании, договор. Экспресс-доставка оригиналов по России. Консультация бесплатно: ${ph}`,
  }),
  (c: string, ph: string) => ({
    title: `Гостиничный чек в ${c} с подтверждением проживания | ЧекГарант`,
    description: `Оформим гостиничный чек в ${c} с подтверждением проживания для авансового отчёта. Работаем официально, помогаем на каждом шаге заказа. Позвоните: ${ph}`,
  }),
];

const pickSeo = (slug: string, caseIn: string, phone: string) => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return SEO_VARIANTS[h % SEO_VARIANTS.length](caseIn, phone);
};

const HOME_SLUG = 'novorossiysk';

const DEFAULT_CONTACTS = {
  phone: '+7 (918) 464-18-00',
  phoneRaw: '79184641800',
  whatsapp: 'https://wa.me/79184641800',
  telegram: 'https://t.me/+79184641800',
};

interface CityPageProps {
  forcedSlug?: string;
}

const CityPage = ({ forcedSlug }: CityPageProps) => {
  const params = useParams<{ slug: string }>();
  const slug = forcedSlug || params.slug;
  const isHome = !!forcedSlug;
  const city = getCityBySlug(slug || '');
  const override = slug ? CITY_OVERRIDES[slug] : undefined;
  const contacts = override ? { phone: override.phone, phoneRaw: override.phoneRaw, whatsapp: override.whatsapp, telegram: override.telegram } : DEFAULT_CONTACTS;
  const HERO_IMG = override?.heroImg || DEFAULT_HERO_IMG;

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-muted-foreground">Город не найден</p>
        <Link to="/" className="text-primary underline">На главную</Link>
      </div>
    );
  }

  const cityIndex = CITIES.findIndex(c => c.slug === city.slug);
  const nearbyCities = Array.from({ length: 12 }, (_, i) => CITIES[(cityIndex + 1 + i) % CITIES.length]).filter(c => c.slug !== city.slug);
  const seo = pickSeo(city.slug, city.caseIn, contacts.phone);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={[slug && CITY_SEO[slug] ? CITY_SEO[slug].keywords : `гостиничные чеки ${city.name}, купить гостиничные чеки ${city.name}, чеки для командировки ${city.name}, авансовый отчёт ${city.name}`, ...EXTRA_KEYWORDS(city.name)].join(', ')} />
        <link rel="canonical" href={isHome || city.slug === HOME_SLUG ? `https://top-cheki-novorossiysk.ru/` : `https://top-cheki-novorossiysk.ru/cities/${city.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={isHome || city.slug === HOME_SLUG ? `https://top-cheki-novorossiysk.ru/` : `https://top-cheki-novorossiysk.ru/cities/${city.slug}`} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'ЧекГарант',
            image: HERO_IMG,
            description: `Гостиничные чеки в ${city.caseIn} с подтверждением для авансового отчёта о командировке.`,
            telephone: contacts.phone,
            email: 'a9990064045@mail.ru',
            address: { '@type': 'PostalAddress', streetAddress: city.busStation, addressLocality: city.name, addressCountry: 'RU' },
            url: isHome || city.slug === HOME_SLUG ? `https://top-cheki-novorossiysk.ru/` : `https://top-cheki-novorossiysk.ru/cities/${city.slug}`,
            priceRange: '₽₽',
          })}
        </script>
      </Helmet>


      <CityHero city={city} contacts={contacts} heroImg={HERO_IMG} />

      <CityInfo city={city} contacts={contacts} slug={slug} />

      <CityReviews city={city} />

      <CityOrderForm city={city} />

      <HomeFaq caseIn={city.caseIn} />

      <section className="py-12">
        <div className="container">
          <h2 className="font-display text-xl font-700 uppercase text-primary mb-5">Гостиничные чеки в других городах</h2>
          <div className="flex flex-wrap gap-2">
            {nearbyCities.map(c => (
              <Link key={c.slug} to={c.slug === HOME_SLUG ? '/' : `/cities/${c.slug}`} className="rounded border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-accent hover:text-primary transition-colors">
                Чеки в {c.caseIn}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8 text-primary-foreground">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="ShieldCheck" size={16} className="text-accent" />
            <span className="font-display font-600 uppercase tracking-wide text-white/70">ЧекГарант — гостиничные чеки в {city.caseIn}</span>
          </div>
          <span>© 2026 Действительные чеки</span>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-xl hover:bg-green-600 transition-all hover:scale-105 font-600 text-sm">
          <Icon name="MessageCircle" size={20} /> WhatsApp
        </a>
        <a href={contacts.telegram} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-white shadow-xl hover:bg-sky-600 transition-all hover:scale-105 font-600 text-sm">
          <Icon name="Send" size={20} /> Telegram
        </a>
        <a href="https://max.ru/u/f9LHodD0cOKR-Q8BTfSOKFFnva1Qwl_xYasvJfTAdU32qbXXsDWu4nZ1OD0" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-purple-600 px-4 py-3 text-white shadow-xl hover:bg-purple-700 transition-all hover:scale-105 font-600 text-sm">
          <Icon name="MessageSquare" size={20} /> МАКС
        </a>
        <a href={`tel:+${contacts.phoneRaw}`}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-accent-foreground shadow-xl hover:bg-accent/90 transition-all hover:scale-105 font-600 text-sm">
          <Icon name="Phone" size={20} /> Позвонить
        </a>
      </div>

    </div>
  );
};

export default CityPage;