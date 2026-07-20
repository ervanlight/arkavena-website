import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Minor Works Industri | Perbaikan Fasilitas Pabrik | TEGAKARA",
  description: "Pekerjaan perbaikan skala kecil-menengah untuk area industri, pabrik, dan gudang. Mematuhi standar HSE dan work-window yang ketat.",
};

export default function MinorWorksIndustriPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_facility_industri_1784553840673.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="text-sm text-[#B88A4A] mb-4">
            <Link href="/facility-care" className="hover:underline">Facility Care</Link> &gt; Minor Works Industri
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Dukungan Infrastruktur untuk Area Industri
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mb-10">
            Perbaikan area pabrik, gudang, dan workshop yang membutuhkan kecepatan, standar keselamatan (HSE), dan perizinan kerja (permit to work) yang ketat.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Work-Window & Penjadwalan</h2>
              <p className="text-[#68757D]">
                Kami paham operasional pabrik tidak boleh berhenti. Pekerjaan kami dijadwalkan pada <em>work-window</em> yang disepakati (misal: akhir pekan, malam hari, atau saat mesin <em>shutdown</em>) untuk meminimalkan gangguan produksi.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Ruang Lingkup Umum</h2>
              <ul className="list-disc pl-5 text-[#68757D] space-y-2">
                <li>Perbaikan lantai beton (epoxy/floor hardener)</li>
                <li>Perbaikan atap dan talang pabrik</li>
                <li>Partisi ruang kantor dan workshop</li>
                <li>Pembuatan saluran drainase area basah</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Butuh Kontraktor Perbaikan Andal?</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Hubungi Kami
        </Link>
      </section>
    </main>
  );
}
