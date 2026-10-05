import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const CATALOG = [
  { name: 'Кассовые чеки', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/dfb78967-bace-4005-bd2f-c9c2892226e8.jpg' },
  { name: 'Товарные чеки', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/70a1594f-232a-4cd9-8b1d-3e89a0c5324c.jpg' },
  { name: 'Гостиничные чеки', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/eaa43569-2dc0-4b19-9ffc-980bae491f21.jpg' },
  { name: 'Ресторанные чеки', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/0e81b8fc-8f47-46d0-ba0a-1d0d7a629e54.jpg' },
  { name: 'Счета-фактуры', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/a992d67d-0c9a-4541-95a8-bb147eb1f379.jpg' },
  { name: 'Чеки АЗС', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/98559993-1a62-4e01-b162-b3eb363d12f0.jpg' },
  { name: 'Чеки на стройматериалы', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/5727fd5e-4280-49a8-bb7b-939f35e0cd0a.jpg' },
  { name: 'Акты выполненных работ', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/0e63723b-14b0-4354-aa91-261b42811aef.jpg' },
  { name: 'Почтовые чеки', img: 'https://cdn.poehali.dev/projects/5801a4f3-870b-4b77-9d1b-c82c5628d209/files/cd97999b-3b1b-42ce-8ce3-5f5263c019ad.jpg' },
];

export { CATALOG };

const HomeCatalog = () => {
  const [modalItem, setModalItem] = useState<{ name: string; img: string } | null>(null);

  return (
    <>
      {/* Main content + sidebar */}
      <section id="about" className="py-14">
        <div className="container grid gap-10 lg:grid-cols-3">
          {/* Article */}
          <div className="lg:col-span-2 space-y-8 text-muted-foreground leading-relaxed text-[15px]">
            <div>
              <h2 className="font-display text-2xl font-700 uppercase text-primary mb-4">Гостиничные чеки в Анапе</h2>
              <p>
                Сотрудникам предприятий часто приходится направляться в деловые поездки. Это связано с расширением сферы деятельности, поиском новых партнёров, прохождением курсов повышения квалификации. Поездки преимущественно финансируются работодателем, но сотрудником к отчёту прикладываются гостиничные чеки, обосновывающие расход.
              </p>
              <p className="mt-3">
                Командированному сотруднику знакома система компенсации и возмещения расходов. Часто из региональных отделений сотрудников отправляют для прохождения различных семинаров, сдачи отчётов, курсов повышения квалификации.
              </p>
              <ul className="mt-4 space-y-2 ml-4 list-none">
                {['Оптимизация издержек во время поездки', 'Предоставление точной информации о расходах', 'Создание условий для сотрудника, позволяющих справляться со своими задачами'].map(t => (
                  <li key={t} className="flex items-start gap-2"><Icon name="ChevronRight" size={16} className="text-accent mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl font-600 uppercase text-primary mb-3">Особенности подготовки гостиничных чеков</h3>
              <p>Цели работы с документами понятны каждому — начиная от руководителей, заканчивая конкретными подчинёнными. Гостиничные чеки с подтверждением содержат основную информацию:</p>
              <ul className="mt-3 space-y-2 ml-4">
                {['Время заселения и выезда (общая продолжительность аренды номера)', 'Общая стоимость услуги', 'Дополнительные сведения об условиях проживания'].map(t => (
                  <li key={t} className="flex items-start gap-2"><Icon name="ChevronRight" size={16} className="text-accent mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl font-600 uppercase text-primary mb-3">Для чего нужны гостиничные чеки во время поездки?</h3>
              <p>Это документация, собирающаяся вместе и представляющаяся работодателю. Во всех организациях действует строгая отчётность. Преследуются разнообразные цели:</p>
              <ul className="mt-3 space-y-2 ml-4">
                {['Обоснование факта заселения и сбор документов', 'Снижение издержек и увеличение гонорара за счёт квитанций', 'Составление точных отчётов и исключение любых неточностей'].map(t => (
                  <li key={t} className="flex items-start gap-2"><Icon name="ChevronRight" size={16} className="text-accent mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl font-600 uppercase text-primary mb-3">Потеря документов — как подготовить отчёт о затратах?</h3>
              <p>На помощь сотрудникам муниципальных и коммерческих структур приходят специалисты нашей фирмы. С нашей помощью можно составить отчёт о своих издержках. Если из-за рассеянности или случайности потеряны документы — просто обратитесь в нашу фирму. Мы поможем купить гостиничные чеки с подтверждением и другие документы для авансового отчёта о командировке.</p>
            </div>

            <div>
              <h3 className="font-display text-xl font-600 uppercase text-primary mb-3">Оперативность и гарантия полной безопасности</h3>
              <p>Пакет сформированных документов обосновывается при необходимости. Если бухгалтеры захотят проверить чеки, они смогут это сделать — по телефону им ответят на все вопросы и официально подтвердят подлинность справок.</p>
              <ul className="mt-3 space-y-2 ml-4">
                {['Оперативность выполнения любого заказа', 'Индивидуальный подход при решении поставленных задач', 'Конфиденциальность и гарантия безопасности', 'Большой ассортимент квитанций'].map(t => (
                  <li key={t} className="flex items-start gap-2"><Icon name="CheckCircle2" size={16} className="text-accent mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
              <div className="font-display text-lg font-700 text-primary mb-1">Стоимость</div>
              <div className="text-3xl font-display font-700 text-accent">10% <span className="text-base text-muted-foreground font-400">от суммы чека</span></div>
              <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#order">Купить</a>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div id="catalog-nav" className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="font-display text-sm font-600 uppercase tracking-wider text-muted-foreground mb-3">Каталог</div>
              <ul className="space-y-1">
                {CATALOG.map((item) => (
                  <li key={item.name}>
                    <button onClick={() => setModalItem(item)} className={`w-full flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors text-left ${item.name === 'Гостиничные чеки' ? 'bg-primary text-primary-foreground font-600' : 'text-foreground hover:bg-muted'}`}>
                      <Icon name="ChevronRight" size={14} className={item.name === 'Гостиничные чеки' ? 'text-accent' : 'text-muted-foreground'} />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="font-display text-sm font-600 uppercase tracking-wider text-muted-foreground mb-3">Контакты</div>
              <div className="space-y-3 text-sm">
                <a href="tel:+79184641800" className="flex items-center gap-2 text-primary font-600 hover:text-accent transition-colors">
                  <Icon name="Phone" size={16} className="text-accent" />+7 (918) 464-18-00
                </a>
                <a href="mailto:a9990064045@mail.ru" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Mail" size={16} className="text-accent" />a9990064045@mail.ru
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={16} className="text-accent" />г. Анапа и другие города
                </div>
              </div>
              <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="#order">Заказать звонок</a>
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="font-display text-sm font-600 uppercase tracking-wider text-muted-foreground mb-3">Информация</div>
              <ul className="space-y-1 text-sm">
                {['Доставка и оплата', 'О нас', 'Отзывы', 'Контакты'].map(item => (
                  <li key={item}>
                    <a href="#contacts" className="flex items-center gap-2 rounded px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                      <Icon name="ChevronRight" size={14} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setModalItem(null)}>
          <div className="relative max-w-lg w-full bg-card rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={modalItem.img} alt={modalItem.name} className="w-full object-cover max-h-[60vh]" />
            <div className="p-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-700 uppercase text-primary">{modalItem.name}</h3>
              <div className="flex gap-3">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-600" asChild>
                  <a href="#order" onClick={() => setModalItem(null)}>Заказать</a>
                </Button>
                <button onClick={() => setModalItem(null)} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCatalog;
