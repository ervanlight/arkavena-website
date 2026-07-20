import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, HardHat, Building2, ShieldCheck, MapPin } from "lucide-react";

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

      {/* Profil & Rekam Jejak */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold font-manrope mb-6 text-[#0E1B26]">Di Balik TEGAKARA</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Berdiri di bawah naungan PT Tegakara Konstruksi Indonesia, kami dikelola oleh tim profesional yang telah memimpin berbagai proyek konstruksi di Surabaya Raya sejak lebih dari 10 tahun yang lalu.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Mulai dari rumah tinggal eksklusif hingga fasilitas industri berskala besar, pengalaman operasional kami menjadi dasar dari sistem <strong>ScopeLock</strong> dan standarisasi kualitas yang kami terapkan hari ini.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="flex gap-4 items-start">
                <div className="bg-bronze/10 p-3 rounded-xl mt-1">
                  <HardHat className="w-6 h-6 text-bronze" />
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-[#0E1B26]">10+</h4>
                  <p className="text-sm text-slate-500">Tahun Pengalaman</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-bronze/10 p-3 rounded-xl mt-1">
                  <Building2 className="w-6 h-6 text-bronze" />
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-[#0E1B26]">150+</h4>
                  <p className="text-sm text-slate-500">Proyek Diselesaikan</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold font-manrope mb-6 text-[#0E1B26] border-b border-slate-100 pb-4">Legalitas & Kompetensi</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="w-6 h-6 text-[#25775A] shrink-0" />
                <div>
                  <h4 className="font-bold text-[#0E1B26] mb-1">Badan Usaha Resmi</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Terdaftar resmi sebagai PT (Perseroan Terbatas) dengan Nomor Induk Berusaha (NIB) dan sertifikasi kompetensi untuk proyek komersial dan residensial.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <Users className="w-6 h-6 text-bronze shrink-0" />
                <div>
                  <h4 className="font-bold text-[#0E1B26] mb-1">Tenaga Ahli Bersertifikat</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Tim operasional dipimpin oleh Project Manager bersertifikat (SKA) dan operator yang memiliki Surat Izin Operator (SIO) untuk penggunaan alat berat di fasilitas industri.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-[#0E1B26] mb-1">Berpusat di Surabaya</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Berakar kuat di Surabaya dengan pemahaman mendalam tentang tata kota, regulasi perizinan bangunan lokal, dan karakter iklim lingkungan setempat.</p>
                </div>
              </div>
            </div>
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
