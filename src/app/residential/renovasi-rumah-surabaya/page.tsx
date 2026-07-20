import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Renovasi Rumah Mayor di Surabaya | TEGAKARA",
  description: "Layanan renovasi rumah mayor dengan manajemen risiko kondisi tersembunyi, proteksi debu, dan kontrol anggaran yang ketat.",
};

export default function RenovasiMayorPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_residential_renovasi_1784553779148.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="text-sm text-[#B88A4A] mb-4">
            <Link href="/residential" className="hover:underline">Residential</Link> &gt; Renovasi Mayor
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Renovasi Mayor Tanpa Kejutan Anggaran
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mb-10">
            Mengelola kompleksitas renovasi bangunan eksisting dengan mitigasi risiko sejak awal, dari pembongkaran hingga manajemen debu.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold font-manrope mb-6 text-[#0E1B26]">Tantangan Renovasi yang Kami Selesaikan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Risiko Kondisi Tersembunyi</h3>
                <p className="text-[#68757D]">Struktur lama sering menyembunyikan masalah. Kami melakukan asesmen awal untuk meminimalkan perubahan dan eskalasi anggaran (variation orders).</p>
              </div>
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Manajemen Bangunan Dihuni</h3>
                <p className="text-[#68757D]">Jika sebagian area masih dihuni, kami menerapkan protokol ketat untuk manajemen debu, kebisingan, dan pemisahan akses pekerja.</p>
              </div>
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Pembongkaran Terkontrol</h3>
                <p className="text-[#68757D]">Demolisi dilakukan secara sistematis tanpa merusak struktur yang dipertahankan, dengan manajemen limbah yang tertib.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Siap Merenovasi Rumah Anda?</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Konsultasi Renovasi
        </Link>
      </section>
    </main>
  );
}
