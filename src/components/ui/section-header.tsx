import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeader({
  title,
  eyebrow,
  description,
  align = 'left',
  className,
  ...props
}: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('flex flex-col gap-4 max-w-3xl', alignments[align], className)} {...props}>
      {eyebrow && (
        <span className="text-sm font-bold uppercase tracking-wider text-[#B88A4A]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-manrope text-3xl font-bold tracking-tight text-[#0E1B26] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-[#68757D]">
          {description}
        </p>
      )}
    </div>
  );
}
