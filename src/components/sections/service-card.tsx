import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  href: string;
  variant?: 'large' | 'compact';
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  features = [],
  href,
  variant = 'compact',
  className
}: ServiceCardProps) {
  const isLarge = variant === 'large';

  return (
    <Card hover className={cn('flex flex-col h-full group', className)}>
      <CardHeader>
        <div className="h-12 w-12 rounded-[14px] bg-[#E8DED0] text-[#0E1B26] flex items-center justify-center mb-4 transition-colors group-hover:bg-[#B88A4A] group-hover:text-white">
          {icon}
        </div>
        <CardTitle className={isLarge ? 'text-2xl' : 'text-xl'}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-[#68757D] mb-6 flex-1">
          {description}
        </p>
        
        {isLarge && features.length > 0 && (
          <ul className="space-y-3 mb-8">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-[#25775A] mr-2 shrink-0" />
                <span className="text-sm text-[#0E1B26]">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <Link 
          href={href}
          className="inline-flex items-center text-sm font-semibold text-[#B88A4A] hover:text-[#0058B3] transition-colors mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] rounded-sm w-fit"
        >
          Pelajari Lebih Lanjut
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
