import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Layanan Perawatan Fasilitas (Facility Care) | TEGAKARA",
  description: "Perbaikan dan perawatan fasilitas komersial, sekolah, dan industri di Surabaya. Menjaga operasional Anda tetap berjalan dengan Facility Priority Audit dan sistem HSE.",
};

export default function FacilityCarePage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      {/* Hero Section */}
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_facility_1784553203202.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <h1 className="text-4xl md:text-6xl font-bold font-manrope leading-tight mb-6 text-white">
            Perbaikan fasilitas yang menjaga operasional tetap berjalan.
          </h1>
          <p className="text-xl md:text-2xl text-[#E8DED0] max-w-3xl mb-10">
            Kelancaran operasional sangat bergantung pada kondisi fasilitas. Kami membantu melakukan perawatan secara terencana, responsif, dan terdokumentasi.
          </p>
          <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Audit Fasilitas Anda
          </Link>
        </div>
              </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-12 text-[#0E1B26]">Kategori Perawatan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Maintenance Sekolah", href: "/facility-care/maintenance-sekolah", desc: "Perawatan saat masa libur untuk keamanan siswa." },
              { title: "Maintenance Gedung", href: "/facility-care/maintenance-gedung", desc: "Menjaga kondisi bangunan komersial & operasional." },
              { title: "Waterproofing & Atap", href: "/facility-care/waterproofing-dan-atap", desc: "Penanganan kebocoran dengan tes dan garansi terstruktur." },
              { title: "Minor Works Industri", href: "/facility-care/minor-works-industri", desc: "Perbaikan pabrik, gudang, dengan standar K3 (HSE)." },
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-[#E8DED0] hover:shadow-md transition">
                <h3 className="text-xl font-bold font-manrope text-[#0E1B26] mb-3">{service.title}</h3>
                <p className="text-[#68757D] text-sm mb-4">{service.desc}</p>
                <Link href={service.href} className="text-[#B88A4A] text-sm font-medium hover:underline">Detail Layanan &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features: Facility Priority Audit & Continuity */}
      <section className="bg-[#E8DED0] py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-manrope text-[#0E1B26] mb-4">Pendekatan Facility Care Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-[#0E1B26] mb-3">Facility Priority Audit</h3>
              <p className="text-[#0E1B26]">Kami meninjau fasilitas Anda terlebih dahulu untuk memetakan perbaikan yang mendesak (urgent) dan perbaikan yang dapat dijadwalkan (planned) agar lebih efisien.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0E1B26] mb-3">Kontinuitas Bisnis & HSE</h3>
              <p className="text-[#0E1B26]">Pekerjaan kami berpusat pada kontinuitas. Kami bekerja dengan work-window yang tidak mengganggu jam sibuk, serta menerapkan standar Keselamatan, Kesehatan Kerja, dan Lingkungan (HSE) yang ketat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C2D38] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Jadwalkan Facility Passport Assessment</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Hubungi Tim Facility Care
        </Link>
      </section>
    </main>
  );
}
