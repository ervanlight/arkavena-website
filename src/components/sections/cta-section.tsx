import * as React from 'react';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export interface CtaSectionProps {
  title: string;
  description: string;
  primaryText: string;
  secondaryText?: string;
  className?: string;
  dark?: boolean;
}

export function CtaSection({
  title,
  description,
  primaryText,
  secondaryText,
  className,
  dark = false,
}: CtaSectionProps) {
  return (
    <section className={cn('py-24', dark ? 'bg-[#0E1B26] text-white' : 'bg-white text-[#0E1B26]', className)}>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            {title}
          </h2>
          <p className={cn('text-lg mb-10 max-w-2xl mx-auto', dark ? 'text-[#E8DED0]' : 'text-[#68757D]')}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg">
              {primaryText}
            </Button>
            {secondaryText && (
              <Button 
                variant={dark ? 'ghost' : 'secondary'} 
                size="lg"
                className={cn(dark && 'text-white hover:bg-white/10 hover:text-white')}
              >
                {secondaryText}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
