import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface TrustItemProps {
  title: string;
  category: string;
  status: 'valid' | 'expired' | 'pending';
  validUntil?: string;
  documentUrl?: string;
  className?: string;
}

export function TrustItem({ title, category, status, validUntil, documentUrl, className }: TrustItemProps) {
  const statusMap = {
    valid: { label: 'Valid', variant: 'success' as const },
    expired: { label: 'Expired', variant: 'error' as const },
    pending: { label: 'Pending Renewal', variant: 'warning' as const },
  };

  return (
    <Card className={cn('bg-white group', className)}>
      <CardContent className="p-5 flex items-start gap-4">
        <div className="h-10 w-10 rounded bg-white text-[#0E1B26] flex items-center justify-center shrink-0">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
            <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#0E1B26] truncate" title={title}>{title}</h4>
            <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#68757D]">
            <span>{category}</span>
            {validUntil && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#E8DED0]" />
                <span>Berlaku s/d: {validUntil}</span>
              </>
            )}
          </div>
        </div>
        {documentUrl && (
          <Link 
            href={documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 rounded flex items-center justify-center text-[#68757D] hover:bg-white hover:text-[#B88A4A] transition-colors shrink-0"
            aria-label="View document"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
