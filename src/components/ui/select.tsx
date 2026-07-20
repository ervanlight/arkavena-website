import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, options, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-sm font-medium text-[#0E1B26]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              'flex h-11 w-full appearance-none rounded-md border border-[#E8DED0] bg-white px-3 py-2 pr-10 text-sm text-[#26333C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
              error && 'border-[#A33C3C] focus-visible:ring-[#A33C3C]',
              className
            )}
            ref={ref}
            {...props}
          >
            <option value="" disabled hidden>Pilih salah satu...</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-[#68757D]" />
        </div>
        {error && <p className="mt-1 text-sm text-[#A33C3C]">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[#68757D]">{helperText}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
