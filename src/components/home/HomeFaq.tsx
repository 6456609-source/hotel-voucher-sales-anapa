import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const buildFaq = (caseIn?: string) => {
  const inCity = caseIn ? ` в ${caseIn}` : '';
  const items = [
    {
      q: `Что такое гостиничные чеки${inCity} и зачем они нужны?`,
      a: 'Гостиничный чек — документ, подтверждающий оплату проживания. Он нужен бухгалтерии для закрытия авансового отчёта о командировке.',
    },
    {
      q: `Как заказать гостиничные чеки${inCity}?`,
      a: 'Свяжитесь с нами по телефону или оставьте заявку на сайте. Оператор бесплатно проконсультирует, поможет оформить заказ и подготовит документы.',
    },
    {
      q: 'Сколько стоят услуги?',
      a: 'Стоимость зависит от суммы документов и рассчитывается как процент от неё. Точный расчёт назовёт оператор при консультации.',
    },
    {
      q: 'Как быстро будут готовы документы?',
      a: 'Мы изготавливаем документы в кратчайшие сроки. Готовые файлы вы получаете на проверку по email до оплаты.',
    },
    {
      q: 'Как я получу заказ?',
      a: 'После проверки и оплаты мы отправляем оригиналы экспресс-доставкой по всей России.',
    },
  ];
  if (!caseIn) {
    items.push({
      q: 'Работаете ли вы в других городах, кроме Анапы?',
      a: 'Да, мы работаем по всей России. Список городов указан на сайте, а если вашего нет — напишите нам.',
    });
  }
  return items;
};

interface HomeFaqProps {
  caseIn?: string;
}

const HomeFaq = ({ caseIn }: HomeFaqProps) => {
  const FAQ = buildFaq(caseIn);
  return (
  <section id="faq" className="bg-secondary/40 py-14 border-y border-border">
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        })}
      </script>
    </Helmet>
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl font-bold text-center mb-8">Частые вопросы</h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
  );
};

export default HomeFaq;
