'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; href: string }[];
}

export function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  const pathname = usePathname();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      onClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" ref={menuRef}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative flex w-full max-w-[280px] flex-col overflow-y-auto bg-[#14171B] pb-12 shadow-xl ml-auto animate-in slide-in-from-right duration-300 border-l border-[#C9C3B8]/20">
        <div className="flex px-4 pb-2 pt-5">
          <button
            type="button"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-[#3F4954] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2A63C]"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-2 space-y-2 px-4">
          <Link href="/" className="mb-6 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2A63C] rounded-sm" onClick={onClose}>
            <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white leading-none mb-1">ARKAVENA</span>
            <span className="text-[10px] uppercase tracking-widest text-[#3F4954] leading-none">
              Project Control Partner
            </span>
          </Link>
          
          <nav className="flex flex-col space-y-4 mb-8">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'text-lg transition-colors',
                    isActive ? 'text-white font-bold' : 'text-[#3F4954] font-medium hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-6 border-t border-[#C9C3B8]/20">
            <Link href="/assessment">
              <Button className="w-full">
                Diskusikan Proyek
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
