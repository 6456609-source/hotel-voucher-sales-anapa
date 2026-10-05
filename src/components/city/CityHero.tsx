import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { City } from '@/data/cities';

interface CityHeroProps {
  city: City;
  contacts: { phone: string; phoneRaw: string; whatsapp: string; telegram: string };
  heroImg: string;
}

const CityHero = ({ city, contacts, heroImg }: CityHeroProps) => {
  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-2">
          <div className="flex items-center gap-6">
            <a href="mailto:a9990064045@mail.ru" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
              <Icon name="Mail" size={14} /> a9990064045@mail.ru
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:+${contacts.phoneRaw}`} className="font-600 text-accent">{contacts.phone}</a>
            <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded border border-green-500/50 px-3 py-1 text-green-400 hover:bg-green-500 hover:text-white transition-colors text-xs font-500">
              <Icon name="MessageCircle" size={13} /> WhatsApp
            </a>
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded border border-sky-400/50 px-3 py-1 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors text-xs font-500">
              <Icon name="Send" size={13} /> Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg shadow-sm">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary">
              <Icon name="ShieldCheck" size={20} className="text-accent" />
            </div>
            <div>
              <div className="font-display text-base font-700 uppercase tracking-wide text-primary leading-tight">ЧекГарант</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">Действительные чеки</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex text-sm">
            <Link to="/#catalog-nav" className="text-muted-foreground hover:text-primary transition-colors font-500">Каталог</Link>
            <Link to="/#how" className="text-muted-foreground hover:text-primary transition-colors font-500">Как мы работаем</Link>
            <Link to="/#about" className="text-muted-foreground hover:text-primary transition-colors font-500">О нас</Link>
            <Link to="/#contacts" className="text-muted-foreground hover:text-primary transition-colors font-500">Контакты</Link>
          </nav>
          <a href={`tel:+${contacts.phoneRaw}`} className="hidden md:flex items-center gap-2 font-display font-600 text-primary hover:text-accent transition-colors">
            <Icon name="Phone" size={16} />{contacts.phone}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt={city.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/96 via-primary/88 to-primary/50" />
        </div>
        <div className="container relative py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Link to="/" className="text-white/60 hover:text-white text-sm transition-colors">Главная</Link>
              <Icon name="ChevronRight" size={14} className="text-white/40" />
              <span className="text-accent text-sm font-600">{city.name}</span>
            </div>
            <p className="text-accent font-600 uppercase tracking-widest text-sm mb-3">Действительные чеки · {city.name}</p>
            <h1 className="font-display text-4xl md:text-5xl font-700 uppercase text-white leading-tight">
              Гостиничные чеки<br />в {city.caseIn}
            </h1>
            <div className="mt-6 flex flex-wrap gap-4 text-white/90 text-base">
              <div className="flex items-center gap-2 bg-white/10 rounded px-4 py-2">
                <Icon name="Percent" size={18} className="text-accent" />
                <span className="font-bold text-yellow-400 text-xl">Наша комиссия 10% от суммы чека</span>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-white font-medium leading-relaxed text-lg">
              Сотрудникам предприятий часто приходится направляться в деловые поездки. Мы поможем оформить гостиничные чеки с подтверждением для авансового отчёта о командировке в {city.caseIn}. Официально, быстро и надёжно. QR-код.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-600" asChild>
                <a href="#order">Заказать чеки</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
                <a href={`tel:+${contacts.phoneRaw}`}>Позвонить</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CityHero;
