import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div 
      className={cn('flex flex-col items-center justify-center p-12 text-center border border-dashed border-[#E8DED0] rounded-lg bg-white/50', className)}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#68757D] shadow-sm mb-4">
        {icon}
      </div>
      <h3 className="font-manrope text-lg font-semibold text-[#0E1B26] mb-2">{title}</h3>
      <p className="text-[#68757D] text-sm max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
