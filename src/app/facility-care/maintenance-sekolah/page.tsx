import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perawatan & Pemeliharaan Sekolah | TEGAKARA",
  description: "Layanan perbaikan dan perawatan fasilitas sekolah di Surabaya. Fokus pada keamanan siswa, eksekusi saat libur sekolah, dan perbaikan terencana.",
};

export default function MaintenanceSekolahPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/school_field_1784552033990.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="text-sm text-[#B88A4A] mb-4">
            <Link href="/facility-care" className="hover:underline">Facility Care</Link> &gt; Maintenance Sekolah
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Menjaga Fasilitas Belajar Tetap Aman & Layak
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mb-10">
            Kami memahami dinamika jadwal sekolah. Perbaikan dilakukan dengan mengutamakan keselamatan siswa dan penjadwalan ketat saat periode libur atau akhir pekan.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded border border-[#E8DED0]">
              <h3 className="text-xl font-bold text-[#0E1B26] mb-3">Eksekusi Bertahap (Phased Execution)</h3>
              <p className="text-[#68757D]">Pekerjaan yang memakan waktu lama akan dibagi menjadi fase-fase yang disesuaikan dengan jendela libur sekolah, untuk meminimalisasi gangguan kegiatan belajar mengajar.</p>
            </div>
            <div className="bg-white p-6 rounded border border-[#E8DED0]">
              <h3 className="text-xl font-bold text-[#0E1B26] mb-3">Area Kritis</h3>
              <p className="text-[#68757D]">Fokus kami meliputi ruang kelas, perbaikan toilet, plafon jebol, dan inspeksi atap sebelum musim hujan.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Butuh Perbaikan Fasilitas Sekolah?</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Hubungi Kami
        </Link>
      </section>
    </main>
  );
}
