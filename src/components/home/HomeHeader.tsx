import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/9c55a72e-8db7-4f0f-9133-153f82ea8a63.jpg';

const HomeHeader = () => (
  <>
    {/* Top bar */}
    <div className="bg-primary text-primary-foreground text-sm">
      <div className="container flex flex-wrap items-center justify-between gap-2 py-2">
        <div className="flex items-center gap-6">
          <a href="tel:+79184641800" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
            <Icon name="Phone" size={14} /> +7 (918) 464-18-00
          </a>
          <span className="hidden md:flex items-center gap-1.5 text-white/70">
            <Icon name="MapPin" size={14} /> Анапа и другие города
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://wa.me/79184641800" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded border border-green-500/50 px-3 py-1 text-green-400 hover:bg-green-500 hover:text-white transition-colors text-xs font-500">
            <Icon name="MessageCircle" size={13} /> WhatsApp
          </a>
          <a href="https://t.me/+79184641800" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded border border-sky-400/50 px-3 py-1 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors text-xs font-500">
            <Icon name="Send" size={13} /> Telegram
          </a>
          <a href="tel:+79184641800" className="flex items-center gap-1.5 rounded border border-accent/50 px-3 py-1 text-accent hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-500">
            <Icon name="Phone" size={13} /> Позвонить
          </a>
        </div>
      </div>
    </div>

    {/* Header */}
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-primary">
            <Icon name="ShieldCheck" size={20} className="text-accent" />
          </div>
          <div>
            <div className="font-display text-base font-700 uppercase tracking-wide text-primary leading-tight">ЧекГарант</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">Действительные чеки</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 md:flex text-sm">
          <a href="#catalog-nav" className="text-muted-foreground hover:text-primary transition-colors font-500">Каталог</a>
          <a href="#how" className="text-muted-foreground hover:text-primary transition-colors font-500">Как мы работаем</a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors font-500">О нас</a>
          <a href="#contacts" className="text-muted-foreground hover:text-primary transition-colors font-500">Контакты</a>
        </nav>
        <a href="tel:+79184641800" className="hidden md:flex items-center gap-2 font-display font-600 text-primary hover:text-accent transition-colors">
          <Icon name="Phone" size={16} />+7 (918) 464-18-00
        </a>
      </div>
    </header>

    {/* Hero */}
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Анапа" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/96 via-primary/88 to-primary/50" />
      </div>
      <div className="container relative py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-accent font-600 uppercase tracking-widest text-sm mb-3">Действительные чеки · Анапа</p>
          <h1 className="font-display text-4xl md:text-6xl font-700 uppercase text-white leading-tight">
            Гостиничные чеки
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-white/90 text-base">
            <div className="flex items-center gap-2 bg-white/10 rounded px-4 py-2">
              <Icon name="Percent" size={18} className="text-accent" />
              <span className="font-bold text-yellow-400 text-xl">Наша комиссия 10% от суммы чека</span>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-white/75 leading-relaxed text-lg">
            Сотрудникам предприятий часто приходится направляться в деловые поездки. Мы поможем оформить гостиничные чеки с подтверждением для авансового отчёта о командировке. Официально, быстро и надёжно.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-600" asChild>
              <a href="#catalog-nav">Наш каталог</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
              <a href="#order">Заказать звонок</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default HomeHeader;
