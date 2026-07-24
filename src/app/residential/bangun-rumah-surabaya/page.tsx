import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { CheckCircle2, ShieldCheck, Ruler, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Bangun Rumah Baru di Surabaya | TEGAKARA",
  description: "Layanan pembangunan rumah baru di Surabaya dengan definisi ruang lingkup yang jelas, Bill of Quantities (BOQ), dan dokumentasi yang transparan.",
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[#ECE8E1] text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-24 px-6 min-h-[70vh] flex items-center">
        <Image 
          src="/images/hero_residential_bangun_1784553789892.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30 mix-blend-overlay pointer-events-none"
          priority
         sizes="(max-width: 1200px) 100vw, 50vw" />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-sm text-bronze font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Link href="/residential" className="hover:text-white transition-colors">Residential</Link> 
                <span className="text-slate-500">/</span> Bangun Rumah Surabaya
              </div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight mb-8 text-white max-w-4xl">
                Pembangunan Rumah yang Terdefinisi Sejak Awal
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Tidak ada asumsi. Tidak ada 'nanti kita lihat'. Semua ruang lingkup, gambar, dan Bill of Quantities (BOQ) disepakati sebelum pekerjaan dimulai.
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
                <div className="mt-1 bg-bronze/10 p-3 rounded-xl h-fit">
                  <Ruler className="w-6 h-6 text-bronze" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Perencanaan & BOQ</h3>
                  <p className="text-[#68757D] leading-relaxed">Pembuatan Bill of Quantities yang mendetail berdasarkan gambar kerja (DED).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-bronze/10 p-3 rounded-xl h-fit">
                  <Ruler className="w-6 h-6 text-bronze" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Pekerjaan Sipil & Arsitektur</h3>
                  <p className="text-[#68757D] leading-relaxed">Dari pondasi, struktur beton bertulang, dinding, hingga sentuhan akhir arsitektural (finishing).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-bronze/10 p-3 rounded-xl h-fit">
                  <Ruler className="w-6 h-6 text-bronze" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Mekanikal & Elektrikal (MEP)</h3>
                  <p className="text-[#68757D] leading-relaxed">Instalasi listrik, perpipaan air bersih dan kotor, serta sistem tata udara.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="bg-slate-50 p-10 rounded-2xl border border-slate-200 h-full">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] mb-8 text-[#0E1B26]">Mengapa Pendekatan TEGAKARA Berbeda?</h2>
              <div className="space-y-8">
                
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#25775A] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#0E1B26] mb-2">Material Terjamin</h3>
                    <p className="text-[#68757D] text-sm leading-relaxed">Semua material utama harus melalui proses persetujuan (approval) sebelum dikirim ke proyek.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#25775A] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#0E1B26] mb-2">Quality Hold Point</h3>
                    <p className="text-[#68757D] text-sm leading-relaxed">Setiap tahapan kritis (misal: sebelum pengecoran) wajib diperiksa dan disetujui bersama.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bronze/10 via-transparent to-transparent"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <ShieldCheck className="w-16 h-16 text-bronze mx-auto mb-8" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 text-white">Siap Memulai Proyek Anda secara Profesional?</h2>
            <p className="text-slate-400 mb-10 text-lg">Diskusikan kebutuhan spesifik Anda bersama tim kami. Dapatkan analisis awal mengenai waktu, biaya, dan tahapan kerja secara transparan.</p>
            <Link href="/assessment" className="inline-block bg-bronze text-[#0E1B26] px-10 py-5 rounded-md font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg hover:shadow-bronze/20">
              Mulai Konsultasi Proyek
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
            Konsultasikan kebutuhan Anda bersama tim TEGAKARA. Kami melayani area Surabaya, Sidoarjo, dan Gresik.
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
