import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CITIES } from '@/data/cities';
import type { City } from '@/data/cities';

interface CityInfoProps {
  city: City;
  contacts: { phone: string; phoneRaw: string; whatsapp: string; telegram: string };
  slug?: string;
}

const CityInfo = ({ city, contacts, slug }: CityInfoProps) => {
  const mapSrc = `https://maps.google.com/maps?q=${city.mapQuery}&output=embed&hl=ru`;

  return (
    <>
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
    </>
  );
};

export default CityInfo;
