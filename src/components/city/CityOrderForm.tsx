import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { City } from '@/data/cities';

interface CityOrderFormProps {
  city: City;
}

const CityOrderForm = ({ city }: CityOrderFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [contact, setContact] = useState('');
  const [product, setProduct] = useState('');
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

  return (
    <>
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
    </>
  );
};

export default CityOrderForm;
