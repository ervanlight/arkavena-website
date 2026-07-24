import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ label, value, trend, icon, className }: MetricCardProps) {
  return (
    <Card className={cn('bg-white', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-[#68757D]">{label}</h4>
          {icon && <div className="text-[#B88A4A]">{icon}</div>}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#0E1B26]">{value}</span>
          {trend && (
            <span 
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                trend.isPositive ? "bg-[#25775A]/10 text-[#25775A]" : "bg-[#A33C3C]/10 text-[#A33C3C]"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
