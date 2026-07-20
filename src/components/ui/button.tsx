import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#B88A4A] text-white hover:bg-[#a3793f] focus-visible:ring-[#B88A4A]',
      secondary: 'border-2 border-[#1C2D38] text-[#1C2D38] hover:bg-[#1C2D38] hover:text-white',
      ghost: 'text-[#1C2D38] hover:bg-[#F6F3ED]',
      danger: 'bg-[#A33C3C] text-white hover:bg-[#8f3434]',
    };

    const sizes = {
      sm: 'h-9 px-4 py-2 text-sm',
      md: 'h-11 px-6 py-2 text-base',
      lg: 'h-14 px-8 py-3 text-lg font-medium',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
