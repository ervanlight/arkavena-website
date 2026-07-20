import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perawatan & Pemeliharaan Gedung | TEGAKARA",
  description: "Layanan maintenance gedung komersial untuk menjaga operasional berjalan lancar dengan sistem work order yang terdokumentasi.",
};

export default function MaintenanceGedungPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/commercial_building_1784551986230.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="text-sm text-[#B88A4A] mb-4">
            <Link href="/facility-care" className="hover:underline">Facility Care</Link> &gt; Maintenance Gedung
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Pemeliharaan Gedung Komersial
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mb-10">
            Perawatan bangunan tidak seharusnya reaktif. Kami menyediakan layanan terencana untuk menjaga nilai aset dan kenyamanan tenant atau staf Anda.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold font-manrope mb-6 text-[#0E1B26]">Planned vs Corrective Maintenance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Planned (Preventif)</h3>
                <p className="text-[#68757D]">Pengecekan berkala pada sistem drainase, kondisi cat, perbaikan retak minor sebelum menjadi kerusakan struktural yang mahal.</p>
              </div>
              <div className="bg-white p-6 rounded border border-[#E8DED0]">
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Corrective (Perbaikan)</h3>
                <p className="text-[#68757D]">Penanganan cepat untuk insiden seperti pipa bocor, kerusakan keramik, atau plafon runtuh dengan sistem Work Order yang terdokumentasi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Audit Kondisi Gedung Anda</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Jadwalkan Audit
        </Link>
      </section>
    </main>
  );
}
