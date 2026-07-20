import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'neutral';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#1C2D38] text-white',
    success: 'bg-[#25775A]/10 text-[#25775A] border border-[#25775A]/20',
    warning: 'bg-[#A76B1F]/10 text-[#A76B1F] border border-[#A76B1F]/20',
    error: 'bg-[#A33C3C]/10 text-[#A33C3C] border border-[#A33C3C]/20',
    neutral: 'bg-white text-[#68757D] border border-[#E8DED0]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#B88A4A] focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
