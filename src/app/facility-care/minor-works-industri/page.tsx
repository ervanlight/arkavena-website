import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { CheckCircle2, ShieldCheck, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Minor Works & Perbaikan Fasilitas Industri | ARKAVENA",
  description: "Layanan pekerjaan sipil minor untuk kawasan industri dan pabrik dengan kepatuhan tinggi terhadap standar K3/HSE.",
  // Audit finding I1 (owner-approved 2026-07-29): no 1:1 replacement page
  // exists yet, so this stays live but points Google at the closest real
  // equivalent instead of competing with it in search results.
  robots: { index: false, follow: true },
  alternates: { canonical: "https://arkavena.com/layanan/building-maintenance" },
};

export default function FacilityServicePage() {
  return (
    <main className="min-h-screen bg-[#ECE8E1] text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-24 px-6 min-h-[70vh] flex items-center">
        <Image 
          src="/images/hero_facility_industri_v4.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30 mix-blend-overlay pointer-events-none"
          priority
         sizes="(max-width: 1200px) 100vw, 50vw" />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-sm text-bronze font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Link href="/facility-care" className="hover:text-white transition-colors">Facility Care</Link> 
                <span className="text-slate-500">/</span> Minor Works Industri
              </div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight mb-8 text-white max-w-4xl">
                Pekerjaan Sipil Industri yang Mematuhi HSE
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Kami mengerti bahwa di kawasan industri, standar keselamatan (Safety) sama pentingnya dengan hasil konstruksi itu sendiri. Tim kami tersertifikasi dan terbiasa dengan regulasi pabrik.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TRUST BAR — GOOGLE ADS READY */}
      <section className="bg-[#14171B] border-b border-white/10 py-5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xl md:text-2xl font-bold text-[#E2A63C]">Overrun 0%</div>
            <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">Estimasi BOQ Presisi</div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xl md:text-2xl font-bold text-[#E2A63C]">100% On-Time</div>
            <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">Jadwal Terkendali</div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xl md:text-2xl font-bold text-[#E2A63C]">ProjectView</div>
            <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">Laporan Real-time</div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xl md:text-2xl font-bold text-[#E2A63C]">Surabaya+</div>
            <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">Sidoarjo & Gresik</div>
          </div>
        </div>
      </section>


      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn direction="left">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-8 text-[#0E1B26]">Ruang Lingkup Pekerjaan</h2>
            <div className="space-y-8">
              
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-xl h-fit border border-slate-200">
                  <Ruler className="w-6 h-6 text-[#0E1B26]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Pembuatan Pondasi Mesin</h3>
                  <p className="text-[#68757D] leading-relaxed">Pengecoran pondasi beton bertulang (reinforced concrete) dengan spesifikasi mutu tinggi untuk menahan getaran mesin industri.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-xl h-fit border border-slate-200">
                  <Ruler className="w-6 h-6 text-[#0E1B26]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Perbaikan Lantai Gudang</h3>
                  <p className="text-[#68757D] leading-relaxed">Aplikasi epoxy lantai industri yang tahan terhadap bahan kimia dan beban forklift (heavy traffic).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-xl h-fit border border-slate-200">
                  <Ruler className="w-6 h-6 text-[#0E1B26]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Konstruksi Fasilitas Pendukung</h3>
                  <p className="text-[#68757D] leading-relaxed">Pembuatan pos satpam, ruang genset, perbaikan saluran drainase pabrik, dan dinding pembatas.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="bg-[#1C2D38] text-white p-10 rounded-2xl h-full border border-slate-700 shadow-xl shadow-slate-900/10">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] mb-8 text-[#E8DED0]">Standar & Jaminan ARKAVENA</h2>
              <div className="space-y-8">
                
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-bronze shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Prosedur K3 Lengkap</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Seluruh pekerja dilengkapi APD standar, dan pekerjaan selalu didahului dengan Job Safety Analysis (JSA).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-bronze shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Sertifikasi Alat & Pekerja</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Operator alat berat dan perancah (scaffolding) memiliki SIO (Surat Izin Operator) yang valid.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#E8DED0] py-24 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <ShieldCheck className="w-16 h-16 text-[#0E1B26] mx-auto mb-8" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 text-[#0E1B26]">Amankan Aset Bisnis Anda</h2>
            <p className="text-[#68757D] mb-10 text-lg">Jangan biarkan kerusakan minor menghentikan operasi bisnis Anda. Jadwalkan audit kondisi gedung hari ini.</p>
            <Link href="/assessment" className="inline-block bg-[#0E1B26] text-white px-10 py-5 rounded-md font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg">
              Jadwalkan Audit Fasilitas
            </Link>
          </FadeIn>
        </div>
      </section>
    
      {/* TESTIMONIAL & CTA SECTION */}
      <section className="py-20 bg-[#14171B] text-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl max-w-2xl mx-auto">
            <p className="text-white/80 italic text-lg leading-relaxed mb-6">
              "Transparansi laporan dan kejelasan biaya sejak awal membuat kami sangat tenang mengawasi proyek meski dari luar kota."
            </p>
            <div className="text-xs font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-[#E2A63C]">
              Pemilik Proyek • Surabaya
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
            Siap Memulai Diskusi Proyek Anda?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Konsultasikan kebutuhan Anda bersama tim ARKAVENA. Kami melayani area Surabaya, Sidoarjo, dan Gresik.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/assessment" className="w-full sm:w-auto inline-block bg-[#E2A63C] text-[#14171B] font-bold px-8 py-4 rounded-xl hover:bg-[#c9922f] transition-all text-center">
              Diskusikan Proyek Anda
            </Link>
            <a href="https://wa.me/6281112345678" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-center">
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </section>

</main>
  );
}
