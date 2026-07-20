import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export function LoadingState({ lines = 3, className, ...props }: LoadingStateProps) {
  return (
    <div className={cn('w-full animate-pulse space-y-4', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={cn(
            'h-4 bg-[#E8DED0] rounded',
            i === 0 ? 'w-3/4' : i === lines - 1 ? 'w-1/2' : 'w-full'
          )} 
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="border border-[#E8DED0] rounded-lg p-6 bg-white animate-pulse">
      <div className="h-12 w-12 bg-white rounded-lg mb-4" />
      <div className="h-6 bg-[#E8DED0] rounded w-1/2 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-white rounded w-full" />
        <div className="h-4 bg-white rounded w-5/6" />
        <div className="h-4 bg-white rounded w-4/6" />
      </div>
    </div>
  );
}
