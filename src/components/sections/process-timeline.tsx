import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TimelineStep {
  title: string;
  description: string;
}

export interface ProcessTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  return (
    <div className={cn('relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E8DED0] before:to-transparent', className)}>
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Timeline Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#0E1B26] text-[#B88A4A] text-sm font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
            {index + 1}
          </div>
          
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-lg border border-[#E8DED0] shadow-sm transition-shadow hover:shadow-md hover:border-[#B88A4A]/30">
            <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-lg text-[#0E1B26] mb-2">{step.title}</h3>
            <p className="text-[#68757D] text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
