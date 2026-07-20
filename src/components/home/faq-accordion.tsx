'use client';

import { Accordion } from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const items = faqs.map((faq, i) => ({
    id: `faq-${i}`,
    title: faq.question,
    content: <p className="text-muted leading-relaxed">{faq.answer}</p>,
  }));

  return <Accordion items={items} className="w-full" />;
}
