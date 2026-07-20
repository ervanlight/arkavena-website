import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || React.useId();

    return (
      <div className="flex items-start gap-3">
        <div className="flex h-6 items-center">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(
              'h-4 w-4 rounded border-[#E8DED0] text-[#B88A4A] focus:ring-[#B88A4A] cursor-pointer',
              className
            )}
            {...props}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={checkboxId} className="text-sm font-medium text-[#0E1B26] cursor-pointer">
            {label}
          </label>
          {description && (
            <p className="text-sm text-[#68757D]">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
