import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tambah Lantai Rumah di Surabaya | TEGAKARA",
  description: "Layanan tambah lantai rumah dengan asesmen struktural menyeluruh, eksekusi bertahap, dan proteksi cuaca maksimal.",
};

export default function TambahLantaiPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_residential_tambah_lantai_1784553801629.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="text-sm text-[#B88A4A] mb-4">
            <Link href="/residential" className="hover:underline">Residential</Link> &gt; Tambah Lantai
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Ekspansi ke Atas dengan Keamanan Struktural
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mb-10">
            Penambahan lantai membutuhkan perhitungan matang, bukan sekadar menumpuk beban. Kami mengutamakan integritas struktur rumah eksisting Anda.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-[#E8DED0] p-6 rounded-lg border-l-4 border-[#B88A4A]">
            <h3 className="text-lg font-bold text-[#0E1B26] mb-2">Disclaimer Struktural</h3>
            <p className="text-[#0E1B26]">
              Setiap penambahan lantai wajib didahului oleh asesmen struktural pada pondasi dan kolom eksisting. Kami berhak menolak pengerjaan jika struktur bangunan lama dinilai tidak mampu menahan beban tambahan, demi keselamatan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Proteksi Cuaca & Keamanan</h3>
              <p className="text-[#68757D] mb-4">
                Membuka atap rumah eksisting membawa risiko besar, terutama kebocoran saat hujan. Kami merencanakan proteksi sementara yang andal selama masa transisi pembongkaran atap hingga penutupan lantai baru.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Akses & Eksekusi Bertahap</h3>
              <p className="text-[#68757D] mb-4">
                Mobilisasi material ke lantai atas dilakukan dengan aman tanpa mengganggu aktivitas di lantai bawah jika bangunan masih dihuni. Pekerjaan dieksekusi secara bertahap dengan zonasi yang jelas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0E1B26] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Bahas Kebutuhan Ekpansi Anda</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Mulai Asesmen
        </Link>
      </section>
    </main>
  );
}
