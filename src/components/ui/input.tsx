import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-[#0E1B26]"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-11 w-full rounded-md border border-[#E8DED0] bg-white px-3 py-2 text-sm text-[#26333C] placeholder:text-[#68757D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            error && 'border-[#A33C3C] focus-visible:ring-[#A33C3C]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-[#A33C3C]">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[#68757D]">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
