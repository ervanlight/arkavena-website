import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bangun & Renovasi Rumah Sistematis | TEGAKARA",
  description: "Layanan konstruksi dan renovasi rumah di Surabaya dengan sistem manajemen proyek yang terukur, transparan, dan dapat diandalkan.",
  openGraph: {
    title: "Bangun & Renovasi Rumah Sistematis | TEGAKARA",
    description: "Layanan konstruksi dan renovasi rumah di Surabaya dengan sistem manajemen proyek yang terukur.",
  },
};

export default function ResidentialPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      {/* Hero Section */}
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_residential_1784553175729.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <h1 className="text-4xl md:text-6xl font-bold font-manrope leading-tight mb-6 text-white">
            Pembangunan dan renovasi rumah dengan proses yang jelas, <br className="hidden md:block" /> mutu yang terdokumentasi, dan komunikasi yang terarah.
          </h1>
          <p className="text-xl md:text-2xl text-[#E8DED0] max-w-3xl mb-10">
            Kami mendokumentasikan perencanaan, pelaksanaan, dan serah terima rumah Anda dalam satu sistem yang mudah dipantau.
          </p>
          <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Mulai Konsultasi Proyek
          </Link>
        </div>
              </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-12 text-[#0E1B26]">Layanan Residensial Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E8DED0]">
              <h3 className="text-2xl font-bold font-manrope mb-4 text-[#0E1B26]">Bangun Rumah Baru</h3>
              <p className="text-[#68757D] mb-6">Membangun dari lahan kosong atau bangunan lama yang diratakan. Terstruktur dari gambar hingga serah terima.</p>
              <Link href="/residential/bangun-rumah-surabaya" className="text-[#B88A4A] font-medium hover:underline">Pelajari lebih lanjut &rarr;</Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E8DED0]">
              <h3 className="text-2xl font-bold font-manrope mb-4 text-[#0E1B26]">Renovasi Mayor</h3>
              <p className="text-[#68757D] mb-6">Perombakan besar rumah Anda. Mengelola risiko kondisi bangunan lama dengan mitigasi yang direncanakan dan dikomunikasikan.</p>
              <Link href="/residential/renovasi-rumah-surabaya" className="text-[#B88A4A] font-medium hover:underline">Pelajari lebih lanjut &rarr;</Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E8DED0]">
              <h3 className="text-2xl font-bold font-manrope mb-4 text-[#0E1B26]">Tambah Lantai</h3>
              <p className="text-[#68757D] mb-6">Ekspansi ke atas tanpa harus pindah rumah. Fokus pada keamanan struktur dan proteksi cuaca.</p>
              <Link href="/residential/tambah-lantai-rumah" className="text-[#B88A4A] font-medium hover:underline">Pelajari lebih lanjut &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & CTA Section */}
      <section className="bg-[#1C2D38] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-6 text-[#E8DED0]">Siap membangun dengan proses yang terstruktur?</h2>
          <p className="text-lg text-slate-300 mb-10">
            Ceritakan kebutuhan proyek Anda dan mari jadwalkan diskusi awal bersama kami.
          </p>
          <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Isi Informasi Proyek
          </Link>
        </div>
      </section>
    </main>
  );
}
