import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { getCityBySlug, CITIES } from '@/data/cities';
import { CITY_SEO } from '@/data/citySeo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import HomeFaq from '@/components/home/HomeFaq';

const DEFAULT_HERO_IMG = 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/9c55a72e-8db7-4f0f-9133-153f82ea8a63.jpg';

const CITY_OVERRIDES: Record<string, { phone: string; phoneRaw: string; whatsapp: string; telegram: string; heroImg?: string }> = {
  novorossiysk: {
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

const DEFAULT_CONTACTS = {
  phone: '+7 (999) 006-40-45',
  phoneRaw: '79990064045',
  whatsapp: 'https://wa.me/79990064045',
  telegram: 'https://t.me/+79990064045',
};

const CityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug || '');
  const override = slug ? CITY_OVERRIDES[slug] : undefined;
  const contacts = override ? { phone: override.phone, phoneRaw: override.phoneRaw, whatsapp: override.whatsapp, telegram: override.telegram } : DEFAULT_CONTACTS;
  const HERO_IMG = override?.heroImg || DEFAULT_HERO_IMG;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [contact, setContact] = useState('');
  const [product, setProduct] = useState('');
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewSending, setReviewSending] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async () => {
    setSending(true);
    setSendError('');
    try {
      const res = await fetch('https://functions.poehali.dev/f7bc5056-5d3a-4553-8128-4067e8082b88', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, contact, product, city: city?.name || '' }),
      });
      if (res.ok) {
        setSent(true);
        setName(''); setPhone(''); setContact(''); setAgree(false); setProduct('');
      } else {
        setSendError('Ошибка отправки. Попробуйте ещё раз.');
      }
    } catch {
      setSendError('Ошибка сети. Попробуйте ещё раз.');
    } finally {
      setSending(false);
    }
  };

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
  const mapSrc = `https://maps.google.com/maps?q=${city.mapQuery}&output=embed&hl=ru`;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={[slug && CITY_SEO[slug] ? CITY_SEO[slug].keywords : `гостиничные чеки ${city.name}, купить гостиничные чеки ${city.name}, чеки для командировки ${city.name}, авансовый отчёт ${city.name}`, ...EXTRA_KEYWORDS(city.name)].join(', ')} />
        <link rel="canonical" href={`https://chekgarant.online/cities/${city.slug}`} />
      </Helmet>

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
          <img src={HERO_IMG} alt={city.name} className="h-full w-full object-cover" />
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
            <p className="mt-6 max-w-xl text-white/75 leading-relaxed text-lg">
              Сотрудникам предприятий часто приходится направляться в деловые поездки. Мы поможем оформить гостиничные чеки с подтверждением для авансового отчёта о командировке в {city.caseIn}. Официально, быстро и надёжно.
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

      {/* Info */}
      <section className="py-14">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-muted-foreground leading-relaxed text-[15px]">
            <h2 className="font-display text-2xl font-700 uppercase text-primary">Гостиничные чеки в {city.caseIn}</h2>
            <p>
              Сотрудникам предприятий часто приходится направляться в деловые поездки в {city.caseIn}. Это связано с расширением сферы деятельности, поиском новых партнёров, прохождением курсов повышения квалификации. Поездки финансируются работодателем, но сотрудником к отчёту прикладываются гостиничные чеки, обосновывающие расход.
            </p>
            <p>
              Командированному сотруднику знакома система компенсации и возмещения расходов. Мы помогаем оформить гостиничные чеки с подтверждением для авансового отчёта в {city.caseIn} официально и быстро.
            </p>
            <ul className="space-y-2 ml-4 list-none">
              {['Оперативность выполнения любого заказа', 'Индивидуальный подход при решении поставленных задач', 'Конфиденциальность и гарантия безопасности', 'Большой ассортимент квитанций'].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-accent mt-0.5 shrink-0" />{t}
                </li>
              ))}
            </ul>

            <h3 className="font-display text-xl font-700 text-primary pt-2">Кому нужны гостиничные чеки в {city.caseIn}</h3>
            <p>
              Чеки за проживание в {city.caseIn} нужны сотрудникам, которые вернулись из командировки и закрывают авансовый отчёт. Без подтверждающих документов бухгалтерия не сможет принять расходы на гостиницу.
            </p>
            <ul className="space-y-2 ml-4 list-none">
              {[`Командированные сотрудники, выезжающие в ${city.caseIn} по работе`, 'Бухгалтеры, которым нужно закрыть авансовый отчёт', 'Руководители и ИП, оформляющие командировки для команды', 'Организации, отправляющие сотрудников на обучение и переговоры'].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-accent mt-0.5 shrink-0" />{t}
                </li>
              ))}
            </ul>
            <p>
              Вы отправляете заявку, оператор бесплатно консультирует, мы готовим документы и присылаем их на проверку по email. Оплата — только после того, как вы всё проверили.
            </p>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
              <div className="font-display text-lg font-700 text-primary mb-1">Стоимость</div>
              <div className="text-3xl font-display font-700 text-accent">10% <span className="text-base text-muted-foreground font-400">от суммы чека</span></div>
              <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#order">Купить</a>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="font-display text-sm font-600 uppercase tracking-wider text-muted-foreground mb-3">Наш адрес в {city.caseIn}</div>
              <div className="flex items-start gap-2 text-sm text-foreground">
                <Icon name="MapPin" size={16} className="text-accent mt-0.5 shrink-0" />
                <span>{city.busStation}</span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="font-display text-sm font-600 uppercase tracking-wider text-muted-foreground mb-3">Контакты</div>
              <div className="space-y-3 text-sm">
                <a href={`tel:+${contacts.phoneRaw}`} className="flex items-center gap-2 text-primary font-600 hover:text-accent transition-colors">
                  <Icon name="Phone" size={16} className="text-accent" />{contacts.phone}
                </a>
                <a href="mailto:a9990064045@mail.ru" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Mail" size={16} className="text-accent" />a9990064045@mail.ru
                </a>
              </div>
              <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="#order">Заказать звонок</a>
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="font-display text-sm font-600 uppercase tracking-wider text-muted-foreground mb-3">Другие города</div>
              <ul className="space-y-1 max-h-48 overflow-y-auto">
                {CITIES.slice(0, 15).map(c => (
                  <li key={c.slug}>
                    <Link
                      to={`/cities/${c.slug}`}
                      className={`flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors ${c.slug === slug ? 'bg-primary text-primary-foreground font-600' : 'text-foreground hover:bg-muted'}`}
                    >
                      <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-border py-14">
        <div className="container">
          <div className="mb-6 text-center">
            <span className="font-display text-sm font-600 uppercase tracking-widest text-accent">Наш адрес</span>
            <h2 className="mt-2 font-display text-3xl font-700 uppercase text-primary">Мы на карте в {city.caseIn}</h2>
            <p className="mt-2 text-muted-foreground flex items-center justify-center gap-2">
              <Icon name="MapPin" size={16} className="text-accent" />
              {city.busStation}
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border shadow-md">
            <iframe
              src={mapSrc}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Автовокзал ${city.name}`}
            />
          </div>
        </div>
      </section>

      {/* Reviews */}
      {(() => {
        const allReviews = [
          { name: 'Андрей К.', date: 'Март 2026', text: 'Очень оперативно сделали чеки для командировки. Всё прошло проверку в бухгалтерии без вопросов. Рекомендую!' },
          { name: 'Наталья В.', date: 'Апрель 2026', text: 'Обращалась уже второй раз. Документы готовы за несколько часов, качество отличное. Спасибо за профессионализм!' },
          { name: 'Сергей М.', date: 'Май 2026', text: 'Быстро, чётко, без лишних вопросов. Чеки приняли в отделе кадров без замечаний. Сервис на высоте!' },
          { name: 'Ольга Д.', date: 'Июнь 2026', text: 'Нашла через интернет, не пожалела. Менеджер всё объяснил, сделали в срок. Цена за 10% от суммы — честно и выгодно.' },
          { name: 'Дмитрий Р.', date: 'Февраль 2026', text: 'Отличный сервис! Чеки оформили за 2 часа. Бухгалтерия приняла без единого вопроса. Буду обращаться снова.' },
          { name: 'Елена С.', date: 'Январь 2026', text: 'Очень удобно — всё онлайн, не нужно никуда ехать. Менеджер на связи весь день, ответил на все вопросы.' },
          { name: 'Максим П.', date: 'Март 2026', text: 'Пользуюсь уже третий раз. Стабильное качество, быстрое исполнение. Надёжные ребята, всё официально.' },
          { name: 'Ирина Т.', date: 'Апрель 2026', text: 'Заказала срочно, сделали за час. Все документы оформлены правильно, с печатью. Очень выручили!' },
          { name: 'Алексей Н.', date: 'Май 2026', text: 'Давно искал надёжный сервис для оформления чеков. Нашёл — не разочаровался. Рекомендую коллегам.' },
          { name: 'Светлана Ж.', date: 'Июнь 2026', text: 'Всё прошло гладко: написала в мессенджер, получила чеки, сдала отчёт. Удобно, быстро, без лишних слов.' },
        ];
        const preview = allReviews.slice(0, 4);
        return (
          <section className="py-14 border-t border-border">
            <div className="container">
              <div className="mb-8 text-center">
                <span className="font-display text-sm font-600 uppercase tracking-widest text-accent">Отзывы клиентов</span>
                <h2 className="mt-2 font-display text-3xl font-700 uppercase text-primary">Что говорят о нас в {city.caseIn}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {preview.map((r) => (
                  <div key={r.name} className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />)}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{r.text}"</p>
                    <div className="border-t border-border pt-3 flex items-center justify-between">
                      <span className="font-600 text-sm text-foreground">{r.name}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setReviewsOpen(true)}>
                  Смотреть все отзывы ({allReviews.length})
                </Button>
              </div>
            </div>

            {/* Modal */}
            {reviewsOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setReviewsOpen(false); }}>
                <div ref={modalRef} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl p-8">
                  <button onClick={() => setReviewsOpen(false)} className="absolute top-4 right-4 rounded-full p-2 hover:bg-muted transition-colors">
                    <Icon name="X" size={20} className="text-muted-foreground" />
                  </button>
                  <div className="mb-6 text-center">
                    <span className="font-display text-sm font-600 uppercase tracking-widest text-accent">Отзывы клиентов</span>
                    <h3 className="mt-2 font-display text-2xl font-700 uppercase text-primary">Все отзывы — {city.name}</h3>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {allReviews.map((r) => (
                      <div key={r.name} className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => <Icon key={i} name="Star" size={15} className="text-accent fill-accent" />)}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{r.text}"</p>
                        <div className="border-t border-border pt-3 flex items-center justify-between">
                          <span className="font-600 text-sm text-foreground">{r.name}</span>
                          <span className="text-xs text-muted-foreground">{r.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Leave a review form */}
                  <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6">
                    <h4 className="font-display text-lg font-700 text-primary mb-4">Оставить отзыв</h4>
                    {reviewSent ? (
                      <div className="flex flex-col items-center gap-3 py-4 text-center">
                        <Icon name="CheckCircle2" size={40} className="text-green-500" />
                        <p className="font-600 text-foreground">Спасибо за ваш отзыв!</p>
                        <p className="text-sm text-muted-foreground">Мы ценим ваше мнение</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-500 text-foreground">Ваше имя</label>
                          <Input value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="Иван И." className="h-10" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-500 text-foreground">Оценка</label>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => (
                              <button key={i} type="button" onClick={() => setReviewRating(i)} className="transition-transform hover:scale-110">
                                <Icon name="Star" size={24} className={i <= reviewRating ? 'text-accent fill-accent' : 'text-muted-foreground'} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-500 text-foreground">Ваш отзыв</label>
                          <textarea
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                            placeholder="Расскажите о вашем опыте..."
                            rows={3}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          disabled={reviewSending || !reviewName.trim() || !reviewText.trim()}
                          onClick={async () => {
                            setReviewSending(true);
                            try {
                              await fetch('https://functions.poehali.dev/f7bc5056-5d3a-4553-8128-4067e8082b88', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name: reviewName, review: reviewText, rating: reviewRating, city: city?.name || '', type: 'review' }),
                              });
                            } finally {
                              setReviewSending(false);
                              setReviewSent(true);
                            }
                          }}
                        >
                          {reviewSending ? 'Отправляем...' : 'Отправить отзыв'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })()}

      {/* Order form */}
      <section id="order" className="py-14 bg-secondary/30">
        <div className="container max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
            <h2 className="font-display text-2xl font-700 uppercase text-primary">Заказать чеки в {city.caseIn}</h2>
            <p className="mt-1 text-muted-foreground">Заполните контактные данные и мы свяжемся с вами в течение 15 минут</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-500 text-foreground">Ваше имя <span className="text-destructive">*</span></label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Иван Иванов" className="h-11" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-500 text-foreground">Ваш телефон <span className="text-destructive">*</span></label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className="h-11" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-500 text-foreground">Что вас интересует?</label>
                <div className="flex flex-wrap gap-2">
                  {['Кассовые чеки', 'Товарные чеки', 'Гостиничные чеки', 'Ресторанные чеки', 'Счета-фактуры', 'Чеки АЗС', 'Чеки на стройматериалы', 'Акты выполненных работ', 'Почтовые чеки'].map(p => (
                    <button
                      key={p}
                      onClick={() => setProduct(product === p ? '' : p)}
                      className={`rounded-full px-4 py-2 text-sm font-500 border transition-colors ${product === p ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
                    >{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-500 text-foreground">Как с вами связаться?</label>
                <div className="flex flex-wrap gap-2">
                  {['Телефон', 'WhatsApp', 'Telegram'].map(c => (
                    <button
                      key={c}
                      onClick={() => setContact(c)}
                      className={`rounded-full px-4 py-2 text-sm font-500 border transition-colors ${contact === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
                <span className="text-sm text-muted-foreground">Согласие на обработку персональных данных <span className="text-destructive">*</span></span>
              </label>
              {sent && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center text-green-700 font-500">
                  Заявка отправлена! Мы свяжемся с вами в течение 15 минут.
                </div>
              )}
              {sendError && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-center text-red-600 text-sm">
                  {sendError}
                </div>
              )}
              <Button
                disabled={!agree || !name || !phone || sending || sent}
                onClick={handleSubmit}
                className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-600 disabled:opacity-50"
              >
                {sending ? 'Отправка...' : sent ? 'Отправлено!' : 'Отправить'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <HomeFaq caseIn={city.caseIn} />

      <section className="py-12">
        <div className="container">
          <h2 className="font-display text-xl font-700 uppercase text-primary mb-5">Гостиничные чеки в других городах</h2>
          <div className="flex flex-wrap gap-2">
            {nearbyCities.map(c => (
              <Link key={c.slug} to={`/cities/${c.slug}`} className="rounded border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-accent hover:text-primary transition-colors">
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

    </div>
  );
};

export default CityPage;