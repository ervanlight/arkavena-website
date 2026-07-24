import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PainSolutionCardProps {
  painPoint: string;
  solution: string;
  className?: string;
}

export function PainSolutionCard({ painPoint, solution, className }: PainSolutionCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E8DED0]">
        <CardContent className="p-6 bg-white">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-[#A33C3C]/10 p-2 rounded-full text-[#A33C3C]">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#A33C3C] mb-2">Masalah Umum</h4>
              <p className="text-[#68757D] text-sm leading-relaxed">{painPoint}</p>
            </div>
          </div>
        </CardContent>
        <CardContent className="p-6 bg-white">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-[#25775A]/10 p-2 rounded-full text-[#25775A]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#25775A] mb-2">Kontrol TEGAKARA</h4>
              <p className="text-[#0E1B26] text-sm leading-relaxed font-medium">{solution}</p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
