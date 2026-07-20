import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-[#0E1B26]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[120px] w-full rounded-md border border-[#E8DED0] bg-white px-3 py-2 text-sm text-[#0E1B26] placeholder:text-[#68757D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
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
Textarea.displayName = 'Textarea';
