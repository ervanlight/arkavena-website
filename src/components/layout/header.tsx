'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { MobileNav } from './mobile-nav';

const navItems = [
  { label: 'Rumah Tinggal', href: '/residential' },
  { label: 'Perawatan Gedung', href: '/facility-care' },
  { label: 'Portofolio', href: '/portfolio' },
  { label: 'Cara Kerja', href: '/cara-kerja' },
  { label: 'ProjectView', href: '/project-view' },
  { label: 'Tentang', href: '/tentang' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

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
          isScrolled ? 'bg-[#0E1B26]/95 py-3 shadow-md backdrop-blur-sm' : 'bg-[#0E1B26] py-5'
        )}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] rounded-sm shrink-0">
            <span className="font-manrope text-2xl font-bold text-white tracking-tight leading-none mb-1">TEGAKARA</span>
            <span className="text-[10px] text-[#E8DED0] uppercase tracking-widest hidden sm:block leading-none">Konstruksi & Perawatan Properti</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-[#B88A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] rounded-sm whitespace-nowrap',
                    isActive ? 'text-[#B88A4A]' : 'text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center shrink-0 ml-4">
            <Link href="/assessment">
              <Button variant="primary" className="whitespace-nowrap">Konsultasikan Proyek</Button>
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-white hover:text-[#B88A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] rounded-md"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
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
