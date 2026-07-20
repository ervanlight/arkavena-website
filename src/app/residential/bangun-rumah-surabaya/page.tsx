import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bangun Rumah Baru di Surabaya | TEGAKARA",
  description: "Layanan pembangunan rumah baru di Surabaya dengan definisi ruang lingkup yang jelas, Bill of Quantities (BOQ), dan dokumentasi yang transparan.",
};

export default function BangunRumahPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_residential_bangun_1784553789892.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="text-sm text-[#B88A4A] mb-4">
            <Link href="/residential" className="hover:underline">Residential</Link> &gt; Bangun Rumah
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Pembangunan Rumah yang Terdefinisi Sejak Awal
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mb-10">
            Tidak ada asumsi. Tidak ada 'nanti kita lihat'. Semua ruang lingkup, gambar, dan Bill of Quantities (BOQ) disepakati sebelum pekerjaan dimulai.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold font-manrope mb-6 text-[#0E1B26]">Fokus Kami dalam Membangun</h2>
            <div className="space-y-6 text-[#68757D]">
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Definisi Ruang Lingkup & BOQ</h3>
                <p>Kami menyusun Bill of Quantities (BOQ) yang mendetail, memastikan setiap material dan pekerjaan terukur dengan jelas.</p>
              </div>
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Milestone & Persetujuan Material</h3>
                <p>Progres dibagi berdasarkan milestone yang jelas. Setiap material utama harus melalui proses persetujuan (approval) sebelum diaplikasikan.</p>
              </div>
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Dokumentasi Pekerjaan Tertutup</h3>
                <p>Pekerjaan struktural, pemipaan, dan kelistrikan yang tertutup akan selalu didokumentasikan sebagai bukti (concealed-work evidence) untuk referensi di masa depan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E8DED0] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#0E1B26]">Rencanakan Rumah Baru Anda</h2>
        <Link href="/assessment" className="inline-block bg-[#0E1B26] text-white px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Mulai Diskusi
        </Link>
      </section>
    </main>
  );
}
