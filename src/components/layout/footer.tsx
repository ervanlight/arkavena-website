"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/container';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14171B] bg-structural-grid-dark text-white pt-16 pb-8 border-t border-[#C9C3B8]/20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo-icon.png" 
                alt="ARKAVENA Logo" 
                width={36} 
                height={36} 
                className="h-9 w-auto object-contain"
                unoptimized
              />
              <div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight">ARKAVENA</h3>
                <p className="text-[10px] text-[#3F4954] uppercase tracking-widest mt-0.5">Project Control Partner</p>
              </div>
            </div>
            <p className="text-[#3F4954] text-sm leading-relaxed max-w-xs">
              Kami percaya bahwa proyek terbaik lahir dari proses yang dapat dipertanggungjawabkan. ARKAVENA membantu pemilik properti menjaga setiap keputusan, biaya, kualitas, dan progres tetap berada dalam kendali.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-6">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/residential" className="text-[#3F4954] hover:text-white transition-colors text-sm">
                  Residential
                </Link>
              </li>
              <li>
                <Link href="/facility-care" className="text-[#3F4954] hover:text-white transition-colors text-sm">
                  Facility Care
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-[#3F4954] hover:text-white transition-colors text-sm">
                  Portofolio Proyek
                </Link>
              </li>
              <li>
                <Link href="/projectview" className="text-[#3F4954] hover:text-white transition-colors text-sm">
                  ProjectView
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-6">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tentang" className="text-[#3F4954] hover:text-white transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/trust-center" className="text-[#3F4954] hover:text-white transition-colors text-sm">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-[#3F4954] hover:text-white transition-colors text-sm">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-[#3F4954] text-sm mb-4">
              Dapatkan panduan tentang pengelolaan proyek konstruksi dan perawatannya.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Masukkan alamat email" 
                className="bg-white/5 border-white/10 text-white placeholder:text-[#3F4954] h-10"
              />
              <Button className="w-full">Berlangganan</Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-[#3F4954]">
              <p>&copy; {currentYear} ARKAVENA. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/kebijakan-privasi" className="hover:text-[#3F4954] transition-colors">Kebijakan Privasi</Link>
                <span>•</span>
                <Link href="/syarat-ketentuan" className="hover:text-[#3F4954] transition-colors">Syarat & Ketentuan</Link>
              </div>
            </div>
        </div>
      </Container>
    </footer>
  );
}
