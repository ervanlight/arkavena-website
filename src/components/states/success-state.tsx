import * as React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export interface SuccessStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export function SuccessState({
  title,
  message,
  actionText,
  onAction,
  className,
  ...props
}: SuccessStateProps) {
  return (
    <div 
      className={cn('flex flex-col items-center justify-center p-8 text-center rounded-lg bg-[#25775A]/5 border border-[#25775A]/20', className)}
      {...props}
    >
      <div className="h-12 w-12 rounded-full bg-[#25775A]/10 flex items-center justify-center mb-4">
        <CheckCircle2 className="h-6 w-6 text-[#25775A]" />
      </div>
      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0E1B26] mb-2">{title}</h3>
      <p className="text-[#68757D] text-sm max-w-sm mb-6">{message}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
