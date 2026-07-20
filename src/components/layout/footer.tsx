"use client";

import * as React from 'react';
import Link from 'next/link';
import { Container } from '../ui/container';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E1B26] text-white pt-16 pb-8 border-t border-[#1C2D38]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-manrope text-2xl font-bold tracking-tight">TEGAKARA</h3>
              <p className="text-xs text-[#E8DED0] uppercase tracking-widest mt-1">Construction & Facility Care</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Membangun dan merawat properti dengan proses yang jelas, mutu yang terdokumentasi, dan komunikasi yang terarah.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-manrope text-lg font-semibold mb-6">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/residential" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  Bangun & Renovasi Rumah
                </Link>
              </li>
              <li>
                <Link href="/facility-care" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  Perawatan Gedung & Fasilitas
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  Portofolio Proyek
                </Link>
              </li>
              <li>
                <Link href="/projectview" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  ProjectView
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-manrope text-lg font-semibold mb-6">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tentang" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/cara-kerja" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/trust-center" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  Legalitas & Standar
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-slate-400 hover:text-[#B88A4A] transition-colors text-sm">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-manrope text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Dapatkan panduan singkat tentang pembangunan, renovasi, dan perawatan properti.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Masukkan alamat email" 
                className="bg-[#1C2D38] border-[#1C2D38] text-white placeholder:text-slate-400"
              />
              <Button variant="primary" className="w-full">Berlangganan</Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1C2D38] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} TEGAKARA. Hak cipta dilindungi.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
