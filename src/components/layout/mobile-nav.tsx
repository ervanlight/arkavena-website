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
      // Basic focus trap setup would go here
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on route change
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
        className="fixed inset-0 bg-[#0E1B26]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-[#0E1B26] pb-12 shadow-xl ml-auto animate-in slide-in-from-right duration-300">
        <div className="flex px-4 pb-2 pt-5">
          <button
            type="button"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-white hover:text-[#B88A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A]"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-2 space-y-2 px-4">
          <Link href="/" className="mb-6 block" onClick={onClose}>
            <span className="font-manrope text-2xl font-bold text-white">TEGAKARA</span>
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
                    'text-lg font-medium transition-colors hover:text-[#B88A4A]',
                    isActive ? 'text-[#B88A4A]' : 'text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-6 border-t border-[#1C2D38]">
            <Button variant="primary" className="w-full">Konsultasikan Proyek</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
