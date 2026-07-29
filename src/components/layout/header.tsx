'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { MobileNav } from './mobile-nav';

// /proyek is deliberately excluded — it stays hidden from primary navigation
// until real, verified projects exist (ARCHITECTURE.md Batch 01 §3.3, §10).
// Exported so navigation contract tests don't need to render the client
// component (which depends on usePathname).
export const navItems = [
  { label: 'Layanan', href: '/layanan' },
  { label: 'Sektor', href: '/sektor' },
  { label: 'Wilayah', href: '/wilayah' },
  { label: 'Panduan', href: '/panduan' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kontak', href: '/kontak' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Only the homepage has a dark hero directly under the header, so only
  // the homepage can afford a transparent, unscrolled header — logo and nav
  // text here are styled for a dark background. Every other route (layanan,
  // sektor, wilayah, panduan, proyek, etc.) has a light page background from
  // the very top, so a transparent header there makes the white logo and
  // active-link text nearly invisible until the visitor scrolls (audit C4).
  const isHome = pathname === '/';
  const showSolidHeader = isScrolled || !isHome;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
          showSolidHeader ? 'bg-[#14171B] py-2.5 shadow-sm border-b border-[#C9C3B8]/20' : 'bg-transparent py-4'
        )}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2A63C] rounded-sm shrink-0 items-center">
            <Image 
              src="/logo.png" 
              alt="ARKAVENA Construction & Facility Care" 
              width={180} 
              height={50} 
              className="h-10 md:h-11 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          <div className="hidden lg:flex items-center ml-auto">
            <nav className="flex items-center space-x-6 xl:space-x-10 mr-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2A63C] rounded-sm whitespace-nowrap',
                      isActive ? 'text-white font-bold' : 'text-[#3F4954] hover:text-white font-medium'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link href="/konsultasi-proyek">
              <Button>
                Konsultasikan Proyek
              </Button>
            </Link>
          </div>

          <button
            type="button"
            // p-3 not p-2 (audit finding I6): with the 20px icon, p-2 gave a
            // 36x36px tap target, below the 44x44px minimum.
            className={cn("lg:hidden p-3 -mr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2A63C] rounded-md text-white")}
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </header>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItems}
      />
    </>
  );
}
