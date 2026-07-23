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
  { label: 'Residential', href: '/residential' },
  { label: 'Facility Care', href: '/facility-care' },
  { label: 'Portofolio', href: '/portfolio' },
  { label: 'ProjectView', href: '/projectview' },
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
          isScrolled ? 'bg-white/90 py-3 shadow-sm backdrop-blur-md border-b border-zinc-200' : 'bg-transparent py-5'
        )}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm shrink-0">
            <span className={cn("font-manrope text-2xl font-bold tracking-tight leading-none mb-1", isScrolled ? "text-zinc-900" : "text-zinc-900")}>
              TEGAKARA
            </span>
            <span className={cn("text-[10px] uppercase tracking-widest hidden sm:block leading-none", isScrolled ? "text-zinc-500" : "text-zinc-500")}>
              Project Control Partner
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm whitespace-nowrap',
                    isActive ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-900 font-medium'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center shrink-0 ml-4">
            <Link href="/assessment">
              <Button size="sm">
                Diskusikan Proyek
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className={cn("lg:hidden p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-md", isScrolled ? "text-zinc-900" : "text-zinc-900")}
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
