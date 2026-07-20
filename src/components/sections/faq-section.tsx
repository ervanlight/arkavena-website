import * as React from 'react';
import { Container } from '../ui/container';
import { SectionHeader } from '../ui/section-header';
import { Accordion } from '../ui/accordion';
import { cn } from '@/lib/utils';

export interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface FAQSectionProps {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ 
  title = 'Pertanyaan yang Sering Diajukan', 
  description = 'Temukan jawaban atas pertanyaan umum seputar layanan dan proses kerja kami.',
  items,
  className
}: FAQSectionProps) {
  const accordionItems = items.map(item => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section className={cn('py-20 bg-white', className)}>
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHeader 
              title={title}
              description={description}
              className="sticky top-24"
            />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
