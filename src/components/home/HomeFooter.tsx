import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { CITIES } from '@/data/cities';
import { CATALOG } from '@/components/home/HomeCatalog';

const HomeFooter = () => {
  useEffect(() => {
    const date = new Date();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    (window as Record<string, unknown>).KUPI_COUNTER_ID = 3393092;
    script.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
      '//counter.vkupiprodai.ru/js/counter.js?' + date.getFullYear() + date.getMonth() + date.getDate();
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
  <>
    {/* Map */}
    <section className="border-t border-border py-14">
      <div className="container">
        <div className="mb-6 text-center">
          <span className="font-display text-sm font-600 uppercase tracking-widest text-accent">Наш адрес</span>
          <h2 className="mt-2 font-display text-3xl font-700 uppercase text-primary">Мы на карте</h2>
          <p className="mt-2 text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="MapPin" size={16} className="text-accent" />
            г. Анапа, Анапское шоссе, 14
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.0!2d37.3167!3d44.8957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f0f5c3e1b1b1b1%3A0x0!2z0JDQvdCw0L_RgdC60L7QtSDRiNC-0YHRgdC1IDE0LCDQkNC90LDQv9CwLCDQmtGA0LDRgdC90L7QtNCw0YDRgdC60LjQuSDQutGA0LDQuQ!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Мы на карте — Анапа, Анапское шоссе 14"
          />
        </div>
      </div>
    </section>

    {/* Cities */}
    <section className="border-t border-border py-12 bg-secondary/30">
      <div className="container">
        <h2 className="font-display text-xl font-700 uppercase text-primary mb-6">Гостиничные чеки в регионах РФ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
          {CITIES.map(city => (
            <Link key={city.slug} to={`/cities/${city.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Contacts */}
    <section id="contacts" className="bg-primary py-12 text-primary-foreground">
      <div className="container grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-sm font-600 uppercase tracking-widest text-accent mb-4">Каталог</div>
          <ul className="space-y-1.5 text-sm">
            {CATALOG.map(item => (
              <li key={item.name}><a href="#order" className="text-white/70 hover:text-white transition-colors">{item.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display text-sm font-600 uppercase tracking-widest text-accent mb-4">Информация</div>
          <ul className="space-y-1.5 text-sm">
            {['Доставка и оплата', 'О нас', 'Отзывы', 'Контакты'].map(item => (
              <li key={item}><a href="#order" className="text-white/70 hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display text-sm font-600 uppercase tracking-widest text-accent mb-4">Контакты</div>
          <div className="space-y-3 text-sm">
            <a href="tel:+79990064045" className="flex items-center gap-2 text-white font-600 hover:text-accent transition-colors">
              <Icon name="Phone" size={16} className="text-accent" />+7 (999) 006-40-45
            </a>
            <a href="mailto:a9990064045@mail.ru" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Icon name="Mail" size={16} className="text-accent" />a9990064045@mail.ru
            </a>
            <Button className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 font-600" asChild>
              <a href="#order">Онлайн заказ</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Footer cities */}
    <footer className="bg-primary/95 border-t border-white/10 py-10">
      <div className="container">
        <div className="mb-6">
          <div className="font-display text-sm font-600 uppercase tracking-widest text-accent mb-4">Гостиничные чеки по городам России</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
            {CITIES.map(city => (
              <Link key={city.slug} to={`/cities/${city.slug}`} className="text-xs text-white/50 hover:text-white transition-colors">
                {city.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="ShieldCheck" size={16} className="text-accent" />
            <span className="font-display font-600 uppercase tracking-wide text-white/70">ЧекГарант Анапа</span>
          </div>
          <span>© 2026 Действительные чеки в Анапе</span>
          <a href="https://krasnodar.vkupiprodai.ru/anapa_all/" className="text-white/30 hover:text-white/60 transition-colors text-xs">Объявления в Анапе</a>
        </div>
      </div>
    </footer>

    {/* Floating buttons */}
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <a href="https://wa.me/79990064045" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-xl hover:bg-green-600 transition-all hover:scale-105 font-600 text-sm">
        <Icon name="MessageCircle" size={20} /> WhatsApp
      </a>
      <a href="https://t.me/+79990064045" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-white shadow-xl hover:bg-sky-600 transition-all hover:scale-105 font-600 text-sm">
        <Icon name="Send" size={20} /> Telegram
      </a>
      <a href="https://max.ru/u/f9LHodD0cOKR-Q8BTfSOKFFnva1Qwl_xYasvJfTAdU32qbXXsDWu4nZ1OD0" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-purple-600 px-4 py-3 text-white shadow-xl hover:bg-purple-700 transition-all hover:scale-105 font-600 text-sm">
        <Icon name="MessageSquare" size={20} /> МАКС
      </a>
      <a href="tel:+79990064045"
        className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-accent-foreground shadow-xl hover:bg-accent/90 transition-all hover:scale-105 font-600 text-sm">
        <Icon name="Phone" size={20} /> Позвонить
      </a>
    </div>
  </>
  );
};

export default HomeFooter;