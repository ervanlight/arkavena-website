import { cn } from '@/lib/utils';

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export function StatBlock({ value, label, className }: StatBlockProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="font-[family-name:var(--font-ibm-plex-mono)] text-5xl md:text-6xl font-medium tracking-tight text-[#E2A63C] mb-3">
        {value}
      </div>
      <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.04em] text-[#5B6570]">
        {label}
      </div>
    </div>
  );
}
