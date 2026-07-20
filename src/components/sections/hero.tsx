import * as React from 'react';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  primaryCtaText: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  interactiveElement?: React.ReactNode;
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  description,
  primaryCtaText,
  secondaryCtaText,
  interactiveElement,
  className
}: HeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#0E1B26] pt-32 pb-20 lg:pt-48 lg:pb-32', className)}>
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#B88A4A 1px, transparent 1px), linear-gradient(90deg, #B88A4A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      
      {/* Subtle Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B26] to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl text-left">
            {eyebrow && (
              <p className="inline-block mb-4 text-sm font-bold uppercase tracking-widest text-[#B88A4A]">
                {eyebrow}
              </p>
            )}
            <h1 className="font-manrope text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-[#E8DED0] mb-8 max-w-xl leading-relaxed opacity-90">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                {primaryCtaText}
              </Button>
              {secondaryCtaText && (
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-transparent border-[#B88A4A] text-white hover:bg-[#B88A4A]/10 hover:text-white">
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
          
          {interactiveElement && (
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
              {interactiveElement}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
