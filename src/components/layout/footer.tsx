"use client";

import * as React from 'react';
import Link from 'next/link';
import { Container } from '../ui/container';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8 border-t border-zinc-900">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-manrope text-2xl font-bold tracking-tight">TEGAKARA</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Project Control Partner</p>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Kami percaya bahwa proyek terbaik lahir dari proses yang dapat dipertanggungjawabkan. TEGAKARA membantu pemilik properti menjaga setiap keputusan, biaya, kualitas, dan progres tetap berada dalam kendali.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-manrope text-lg font-bold mb-6">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/residential" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Residential
                </Link>
              </li>
              <li>
                <Link href="/facility-care" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Facility Care
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Portofolio Proyek
                </Link>
              </li>
              <li>
                <Link href="/projectview" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  ProjectView
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-manrope text-lg font-bold mb-6">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tentang" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/trust-center" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-manrope text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-zinc-400 text-sm mb-4">
              Dapatkan panduan tentang pengelolaan proyek konstruksi dan perawatannya.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Masukkan alamat email" 
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 h-10"
              />
              <Button variant="secondary" className="w-full bg-white text-zinc-900 hover:bg-zinc-200">Berlangganan</Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-zinc-500">
              <p>&copy; {currentYear} TEGAKARA. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/kebijakan-privasi" className="hover:text-zinc-300 transition-colors">Kebijakan Privasi</Link>
                <span>•</span>
                <Link href="/syarat-ketentuan" className="hover:text-zinc-300 transition-colors">Syarat & Ketentuan</Link>
              </div>
            </div>
        </div>
      </Container>
    </footer>
  );
}
