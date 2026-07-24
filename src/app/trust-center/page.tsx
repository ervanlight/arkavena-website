import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { CheckCircle2, ShieldCheck, FileText, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trust Center — TEGAKARA',
  description: 'Dokumentasi legal, kebijakan keselamatan (HSE), mutu (Quality), privasi, dan standar asuransi yang mengatur operasional TEGAKARA.',
};

export default function TrustCenterPage() {
  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="relative overflow-hidden bg-[#14171B] text-white pt-32 pb-28 border-b border-white/10">
        <Image 
          src="/images/hero_trust_v5.jpg" 
          alt="Inspeksi Standar & Kualitas Struktur TEGAKARA" 
          fill 
          className="object-cover opacity-25 pointer-events-none"
          priority
          sizes="100vw"
        />
        <Container className="relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-8">
                Trust & Compliance
              </span>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.05] tracking-tight mb-8">
                Kepercayaan Dibangun
                <br /><span className="text-[#3F4954]">Dengan Transparansi & Kepatuhan.</span>
              </h1>
              <div className="text-xl text-[#DCD6CD] leading-relaxed font-inter max-w-3xl space-y-6">
                <p>Pusat informasi mengenai legalitas, kebijakan mutu, kepatuhan keselamatan (HSE), sertifikasi, dan komitmen privasi kami.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: CONTENT */}
      <section className="py-40 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="sticky top-32">
                  <h3 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-6 border-b border-[#C9C3B8] pb-4">
                    Navigasi Kebijakan
                  </h3>
                  <ul className="space-y-4 font-medium text-[#3F4954]">
                    <li><a href="#sertifikasi" className="hover:text-[#14171B] transition-colors">Legalitas & Sertifikasi</a></li>
                    <li><a href="#kualitas" className="hover:text-[#14171B] transition-colors">Standar Mutu (Quality)</a></li>
                    <li><a href="#keselamatan" className="hover:text-[#14171B] transition-colors">HSE & Keselamatan</a></li>
                    <li><a href="#garansi" className="hover:text-[#14171B] transition-colors">Garansi & Retensi</a></li>
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-8 space-y-24">
              
              <FadeIn delay={100}>
                <div id="sertifikasi" className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#C9C3B8]/20 rounded-lg">
                      <FileText className="w-6 h-6 text-[#14171B]" />
                    </div>
                    <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] tracking-tight">Legalitas & Sertifikasi</h2>
                  </div>
                  <div className="text-lg text-[#3F4954] leading-relaxed space-y-6 mb-8">
                    <p>Sebagai perusahaan kontraktor yang profesional, TEGAKARA beroperasi di bawah payung hukum yang sah dan memiliki sertifikasi badan usaha yang diakui oleh negara untuk memastikan setiap proyek dapat dipertanggungjawabkan secara hukum dan regulasi.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#ECE8E1] border border-[#C9C3B8] rounded-xl">
                      <h4 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-2">Sertifikat Badan Usaha (SBU)</h4>
                      <p className="font-bold text-[#14171B] text-lg mb-2">Jasa Pelaksana Konstruksi</p>
                      <p className="text-sm text-[#3F4954]">Terdaftar dan diverifikasi oleh LPJK (Lembaga Pengembangan Jasa Konstruksi) untuk kualifikasi pelaksanaan bangunan gedung dan sipil.</p>
                    </div>
                    <div className="p-6 bg-[#ECE8E1] border border-[#C9C3B8] rounded-xl">
                      <h4 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-2">Nomor Induk Berusaha (NIB)</h4>
                      <p className="font-bold text-[#14171B] text-lg mb-2">Izin Usaha Terintegrasi</p>
                      <p className="text-sm text-[#3F4954]">Memiliki izin usaha resmi melalui sistem OSS (Online Single Submission) dari Kementerian Investasi/BKPM.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div id="kualitas" className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#C9C3B8]/20 rounded-lg">
                      <ShieldCheck className="w-6 h-6 text-[#14171B]" />
                    </div>
                    <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] tracking-tight">Manajemen Mutu & Material</h2>
                  </div>
                  <div className="text-lg text-[#3F4954] leading-relaxed space-y-6">
                    <p>Setiap penerimaan material utama di lapangan wajib melalui pemeriksaan kesesuaian dengan Rencana Anggaran Biaya (RAB) dan spesifikasi teknis.</p>
                    <p>Kami menerapkan <strong>Quality Hold Points</strong>, di mana pekerjaan tidak bisa dilanjutkan ke tahap berikutnya sebelum tahap kritis (misalnya pembesian sebelum pengecoran) diinspeksi dan disetujui bersama.</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div id="keselamatan" className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#C9C3B8]/20 rounded-lg">
                      <Activity className="w-6 h-6 text-[#14171B]" />
                    </div>
                    <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] tracking-tight">Health, Safety, and Environment (HSE)</h2>
                  </div>
                  <div className="text-lg text-[#3F4954] leading-relaxed space-y-6">
                    <p>Keselamatan bukan sekadar prioritas, tetapi nilai fundamental dalam setiap operasional kami.</p>
                    <p>Kami mewajibkan penggunaan Alat Pelindung Diri (APD) standar bagi seluruh pekerja dan staf di lapangan. Untuk proyek komersial dan industri, kami mematuhi sistem izin kerja (Permit to Work) sesuai dengan prosedur dan regulasi fasilitas klien secara ketat.</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={250}>
                <div id="garansi" className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#C9C3B8]/20 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-[#14171B]" />
                    </div>
                    <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] tracking-tight">Kebijakan Garansi & Retensi</h2>
                  </div>
                  <div className="text-lg text-[#3F4954] leading-relaxed space-y-6">
                    <p>Setiap penyelesaian proyek konstruksi disertai dengan Masa Pemeliharaan (Defect Liability Period) yang diatur secara transparan dalam kontrak.</p>
                    <p>Sesuai standar industri, sebagian nilai pembayaran ditahan sebagai jaminan retensi. Jaminan ini akan dicairkan hanya setelah masa pemeliharaan selesai dan seluruh cacat fisik (defect) yang timbul telah diperbaiki dengan memuaskan.</p>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
