import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import type { City } from '@/data/cities';

interface CityReviewsProps {
  city: City;
}

const CityReviews = ({ city }: CityReviewsProps) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewSending, setReviewSending] = useState(false);

  return (
    <>
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
          { name: 'Виктор Л.', date: 'Июль 2026', text: 'Заказывал чеки для командировки всей бригады. Всё оформили единым пакетом, бухгалтер вопросов не задал. Спасибо!' },
          { name: 'Марина Б.', date: 'Июль 2026', text: 'Приятно удивила скорость: прислала данные утром, к обеду проверила документы на почте. Оплатила и получила оригиналы.' },
          { name: 'Павел Г.', date: 'Август 2026', text: 'Работаю с сервисом регулярно. Ни разу не было проблем с авансовым отчётом. Цена честная, сроки соблюдают.' },
          { name: 'Татьяна Ф.', date: 'Август 2026', text: 'Очень вежливый менеджер, подробно всё объяснил и помог с оформлением. Документы выглядят безупречно.' },
          { name: 'Роман Е.', date: 'Сентябрь 2026', text: 'Выручили в последний день сдачи отчёта. Сделали быстро, налоговая вопросов не имела. Однозначно рекомендую.' },
          { name: 'Анна З.', date: 'Сентябрь 2026', text: 'Сначала сомневалась, но мне сперва показали документы на проверку, а оплата была потом. Всё прозрачно и надёжно.' },
        ];
        const preview = allReviews.slice(0, 6);
        return (
          <section className="py-14 border-t border-border">
            <div className="container">
              <div className="mb-8 text-center">
                <span className="font-display text-sm font-600 uppercase tracking-widest text-accent">Отзывы клиентов</span>
                <h2 className="mt-2 font-display text-3xl font-700 uppercase text-primary">Что говорят о нас в {city.caseIn}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
};

export default CityReviews;
