import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { CheckCircle2, ShieldCheck, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Perbaikan & Maintenance Sekolah | TEGAKARA",
  description: "Layanan perawatan fasilitas pendidikan dengan penjadwalan khusus saat libur semester untuk meminimalisasi gangguan belajar mengajar.",
};

export default function FacilityServicePage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-24 px-6 min-h-[70vh] flex items-center">
        <Image 
          src="/images/school_facility_1784552005374.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-sm text-bronze font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Link href="/facility-care" className="hover:text-white transition-colors">Facility Care</Link> 
                <span className="text-slate-500">/</span> Maintenance Sekolah
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-manrope leading-tight mb-8 text-white max-w-4xl">
                Fasilitas Pendidikan yang Aman dan Terawat
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Sekolah membutuhkan lingkungan yang aman bagi siswa. Kami mengkhususkan diri pada perbaikan fasilitas dengan memanfaatkan waktu libur semester secara optimal.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn direction="left">
            <h2 className="text-3xl font-bold font-manrope mb-8 text-[#0E1B26]">Ruang Lingkup Pekerjaan</h2>
            <div className="space-y-8">
              
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-xl h-fit border border-slate-200">
                  <Ruler className="w-6 h-6 text-[#0E1B26]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Peremajaan Fasilitas Olahraga</h3>
                  <p className="text-[#68757D] leading-relaxed">Pelapisan ulang (resurfacing) lapangan basket/futsal dengan material anti-slip standar olahraga.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-xl h-fit border border-slate-200">
                  <Ruler className="w-6 h-6 text-[#0E1B26]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Perbaikan Area Sanitasi</h3>
                  <p className="text-[#68757D] leading-relaxed">Renovasi toilet siswa dan guru dengan spesifikasi material yang tahan penggunaan intens (heavy-duty).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-xl h-fit border border-slate-200">
                  <Ruler className="w-6 h-6 text-[#0E1B26]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Keselamatan Bangunan</h3>
                  <p className="text-[#68757D] leading-relaxed">Perbaikan railing tangga, perbaikan atap ruang kelas, dan penyempurnaan sirkulasi udara.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="bg-[#1C2D38] text-white p-10 rounded-2xl h-full border border-slate-700 shadow-xl shadow-slate-900/10">
              <h2 className="text-2xl font-bold font-manrope mb-8 text-[#E8DED0]">Standar & Jaminan TEGAKARA</h2>
              <div className="space-y-8">
                
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-bronze shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Zero Disturbance saat Kelas Aktif</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Mobilisasi material besar dan pekerjaan berat dikunci pada jadwal liburan sekolah.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-bronze shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Material Ramah Anak</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Penggunaan cat non-toxic dan material finishing bersudut tumpul untuk area bermain.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-6 text-[#0E1B26]">Amankan Aset Bisnis Anda</h2>
            <p className="text-[#68757D] mb-10 text-lg">Jangan biarkan kerusakan minor menghentikan operasi bisnis Anda. Jadwalkan audit kondisi gedung hari ini.</p>
            <Link href="/assessment" className="inline-block bg-[#0E1B26] text-white px-10 py-5 rounded-md font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg">
              Jadwalkan Audit Fasilitas
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
