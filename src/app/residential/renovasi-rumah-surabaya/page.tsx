import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { CheckCircle2, ShieldCheck, Ruler, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Renovasi Rumah Mayor di Surabaya | TEGAKARA",
  description: "Layanan renovasi rumah skala menengah hingga besar di Surabaya dengan penjadwalan ketat dan minim risiko bongkar-pasang.",
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[#ECE8E1] text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-24 px-6 min-h-[70vh] flex items-center">
        <Image 
          src="/images/hero_residential_renovasi_1784553779148.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-sm text-bronze font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Link href="/residential" className="hover:text-white transition-colors">Residential</Link> 
                <span className="text-slate-500">/</span> Renovasi Rumah Surabaya
              </div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight mb-8 text-white max-w-4xl">
                Renovasi Besar Tanpa Kejutan Biaya
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Renovasi sering kali dipenuhi biaya tak terduga. Kami memulai dengan audit kondisi eksisting untuk mengunci ruang lingkup pekerjaan.
              </p>
            </FadeIn>
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
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Audit Struktur Eksisting</h3>
                  <p className="text-[#68757D] leading-relaxed">Pemeriksaan kelayakan struktur lama sebelum dibongkar atau disambung.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-bronze/10 p-3 rounded-xl h-fit">
                  <Ruler className="w-6 h-6 text-bronze" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Re-layout Ruangan</h3>
                  <p className="text-[#68757D] leading-relaxed">Perubahan tata letak dinding, pemindahan jalur pipa, dan modifikasi ruang.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-bronze/10 p-3 rounded-xl h-fit">
                  <Ruler className="w-6 h-6 text-bronze" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Pembaruan Fasad & Atap</h3>
                  <p className="text-[#68757D] leading-relaxed">Desain ulang wajah bangunan dan perbaikan/penggantian sistem atap secara menyeluruh.</p>
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
                    <h3 className="text-lg font-bold text-[#0E1B26] mb-2">Proteksi Area</h3>
                    <p className="text-[#68757D] text-sm leading-relaxed">Area yang tidak direnovasi dilindungi secara maksimal dari debu dan serpihan (debris).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#25775A] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#0E1B26] mb-2">ScopeLock Agreement</h3>
                    <p className="text-[#68757D] text-sm leading-relaxed">Perubahan pekerjaan di tengah jalan hanya akan dieksekusi jika disetujui tertulis beserta biayanya.</p>
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
    </main>
  );
}
