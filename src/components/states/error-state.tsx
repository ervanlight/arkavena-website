import * as React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Terjadi Kesalahan',
  message = 'Sistem tidak dapat memuat data yang diminta. Silakan coba beberapa saat lagi.',
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div 
      className={cn('flex flex-col items-center justify-center p-8 text-center rounded-lg bg-[#A33C3C]/5 border border-[#A33C3C]/20', className)}
      {...props}
    >
      <AlertTriangle className="h-12 w-12 text-[#A33C3C] mb-4" />
      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0E1B26] mb-2">{title}</h3>
      <p className="text-[#68757D] text-sm max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="bg-white">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
