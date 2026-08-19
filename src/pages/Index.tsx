import { Helmet } from 'react-helmet-async';
import HomeHeader from '@/components/home/HomeHeader';
import HomeCatalog from '@/components/home/HomeCatalog';
import HomeOrderForm from '@/components/home/HomeOrderForm';
import HomeFooter from '@/components/home/HomeFooter';

const Index = () => (
  <div className="min-h-screen bg-background font-sans">
    <Helmet>
      <title>Гостиничные чеки — купить с подтверждением | ЧекГарант</title>
      <meta name="description" content="Купить гостиничные чеки с подтверждением для авансового отчёта о командировке. Комиссия 12%. Официально, быстро, надёжно по всей России. Тел: +7 (999) 006-40-45" />
      <meta name="keywords" content="гостиничные чеки, купить гостиничные чеки, чеки для командировки, авансовый отчёт, кассовые чеки, товарные чеки" />
      <link rel="canonical" href="https://chekgarant.online/" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'ЧекГарант',
          image: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/9c55a72e-8db7-4f0f-9133-153f82ea8a63.jpg',
          description: 'Гостиничные чеки с подтверждением для авансового отчёта о командировке по всей России.',
          telephone: '+7-999-006-40-45',
          email: 'a9990064045@mail.ru',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Анапское шоссе, 14',
            addressLocality: 'Анапа',
            addressCountry: 'RU',
          },
          url: 'https://chekgarant.online/',
          priceRange: '₽₽',
        })}
      </script>
    </Helmet>
    <HomeHeader />
    <HomeCatalog />
    <HomeOrderForm />
    <HomeFooter />
  </div>
);

export default Index;