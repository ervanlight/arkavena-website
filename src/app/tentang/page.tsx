import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang TEGAKARA | Perusahaan Konstruksi & Facility Care",
  description: "Sistem kerja untuk mengelola pelaksanaan konstruksi yang lebih terarah. Mengenal nilai-nilai transparansi dan sistematis di TEGAKARA.",
};

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_about_1784553229701.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto mt-10">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Sistem kerja untuk mengelola pelaksanaan konstruksi yang lebih terarah.
          </h1>
          <p className="text-xl text-[#E8DED0] mb-6">
            Industri konstruksi penuh dengan asimetri informasi antara kontraktor dan klien. Kami hadir untuk menyeimbangkan hal tersebut melalui keterbukaan proses, kesepakatan spesifikasi yang jelas sebelum eksekusi, dan standarisasi operasional.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold font-manrope mb-6 text-[#0E1B26]">Filosofi Kami</h2>
            <div className="prose prose-lg text-[#0E1B26]">
              <p>
                TEGAKARA fokus pada penyusunan rencana kerja yang realistis. Kami percaya bahwa setiap proyek konstruksi pada dasarnya rumit dan berpotensi mengalami kendala. Perbedaan kontraktor yang baik dengan yang tidak adalah bagaimana sistem mereka merespons kendala tersebut.
              </p>
              <p className="mt-4">
                Kami membangun sistem <strong>ScopeLock</strong> dan <strong>Quality Hold Points</strong> karena kami sadar bahwa mengandalkan komunikasi lisan tanpa dokumentasi sering kali menjadi sumber kesalahpahaman. Bagi kami, struktur dokumentasi sama pentingnya dengan struktur beton.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 border border-[#E8DED0] rounded-xl">
            <h2 className="text-2xl font-bold font-manrope mb-6 text-[#0E1B26]">Janji Integritas Kami</h2>
            <ul className="space-y-4 text-[#68757D]">
              <li className="flex gap-3">
                <span className="text-[#B88A4A] font-bold">1.</span>
                <span>Spesifikasi material disesuaikan dengan kesepakatan. Setiap perubahan akan diinformasikan dan membutuhkan persetujuan.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#B88A4A] font-bold">2.</span>
                <span>Rencana Anggaran Biaya (RAB) dirinci dengan jelas untuk memudahkan klien memahami cakupan pekerjaannya.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#B88A4A] font-bold">3.</span>
                <span>Fokus pada kualitas pekerjaan struktural dan ME (Mekanikal Elektrikal), yang sering kali tersembunyi namun krusial.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="bg-[#E8DED0] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#0E1B26]">Pelajari Standar Kami Lebih Lanjut</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/trust-center" className="inline-block bg-white text-[#0E1B26] border border-[#0E1B26] px-8 py-3 rounded-md font-medium hover:bg-gray-50">
            Kunjungi Trust Center
          </Link>
          <Link href="/cara-kerja" className="inline-block bg-[#0E1B26] text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90">
            Lihat Cara Kerja Kami
          </Link>
        </div>
      </section>
    </main>
  );
}
