import os

# --- KONTAK PAGE ---
kontak_page = """import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { MapPin, Mail, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak Kami | TEGAKARA Construction",
  description: "Hubungi TEGAKARA untuk layanan konstruksi rumah atau perawatan fasilitas di area Surabaya dan sekitarnya.",
};

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-24 px-6 min-h-[50vh] flex items-center">
        <Image 
          src="/images/factory_roof_1784552012117.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
                Mari Bicarakan Proyek Anda
              </h1>
              <p className="text-xl text-[#E8DED0] max-w-2xl mx-auto">
                Fokus kami adalah melayani wilayah Surabaya Raya dan sekitarnya. Untuk memberikan layanan terbaik, kami melakukan kualifikasi pada setiap permintaan proyek.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <FadeIn direction="up">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="mt-1 bg-bronze/10 p-4 rounded-2xl h-fit">
                  <MapPin className="w-8 h-8 text-bronze" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-3">Area Layanan</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Surabaya, Sidoarjo, dan Gresik.<br/>
                    <span className="text-sm text-slate-500 mt-2 block">Untuk proyek di luar area ini, kami akan mempertimbangkan berdasarkan skala proyek.</span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="mt-1 bg-bronze/10 p-4 rounded-2xl h-fit">
                  <Clock className="w-8 h-8 text-bronze" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-3">Jam Operasional</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Senin - Jumat: 08.00 - 17.00 WIB<br/>
                    <span className="text-sm text-slate-500 mt-2 block">Sabtu - Minggu: Tutup (Kecuali kondisi darurat Facility Care)</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="mt-1 bg-bronze/10 p-4 rounded-2xl h-fit">
                  <Mail className="w-8 h-8 text-bronze" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-3">Hubungi Langsung</h2>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">
                    hello@tegakara.com
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="bg-[#1C2D38] p-10 lg:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-bronze/10 blur-[100px] rounded-full pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold font-manrope mb-6 text-white">Formulir Asesmen Proyek</h2>
                <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                  Langkah tercepat untuk mendapatkan respons dari tim kami adalah dengan mengisi formulir asesmen, sehingga kami dapat mempelajari skala dan kebutuhan spesifik Anda terlebih dahulu.
                </p>
                
                <Link href="/assessment" className="flex items-center justify-center w-full bg-bronze text-[#0E1B26] px-8 py-5 rounded-xl font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg hover:shadow-bronze/20">
                  Isi Informasi Proyek (Assessment)
                </Link>

                <p className="text-slate-400 text-sm mt-8 text-center">
                  Estimasi waktu pengisian: ~3 Menit
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </main>
  );
}
"""

# --- PRIVACY PAGE ---
privacy_page = """import { Metadata } from "next";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | TEGAKARA",
  description: "Kebijakan privasi dan pengelolaan data pengguna oleh TEGAKARA Construction.",
};

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-[#0E1B26] py-24 px-6 selection:bg-bronze selection:text-[#0E1B26]">
      <FadeIn>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope mb-8 text-[#0E1B26] text-center">Kebijakan Privasi</h1>
          
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <p className="text-sm text-slate-500 mb-10 uppercase tracking-widest font-semibold pb-6 border-b border-slate-100">Terakhir diperbarui: Juli 2026</p>
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-bronze/10 text-bronze flex items-center justify-center text-sm mr-4">1</span>
                  Pengumpulan Data
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg ml-12">
                  Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami melalui formulir kontak atau asesmen proyek, termasuk nama, alamat email, nomor telepon, dan detail rencana konstruksi Anda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-bronze/10 text-bronze flex items-center justify-center text-sm mr-4">2</span>
                  Penggunaan Informasi
                </h2>
                <div className="ml-12">
                  <p className="text-slate-600 leading-relaxed text-lg mb-4">
                    Informasi yang dikumpulkan digunakan secara eksklusif untuk:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-bronze mt-2.5 mr-4 shrink-0"></div>
                      <span className="text-slate-600 text-lg">Mengevaluasi kelayakan dan ruang lingkup proyek Anda.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-bronze mt-2.5 mr-4 shrink-0"></div>
                      <span className="text-slate-600 text-lg">Berkomunikasi terkait penawaran, penjadwalan survei, dan operasional proyek.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-bronze mt-2.5 mr-4 shrink-0"></div>
                      <span className="text-slate-600 text-lg">Meningkatkan kualitas operasional layanan kami di masa mendatang.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-bronze/10 text-bronze flex items-center justify-center text-sm mr-4">3</span>
                  Keamanan Data Tingkat Lanjut
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg ml-12">
                  Kami menjaga kerahasiaan data proyek (seperti gambar desain, denah arsitektur, dan anggaran internal) yang Anda serahkan dan tidak akan membagikannya kepada pihak ketiga di luar keperluan sub-kontraktor atau vendor yang terlibat langsung dalam pelaksanaan proyek Anda. Kami menerapkan protokol keamanan setara industri untuk melindungi informasi digital Anda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-bronze/10 text-bronze flex items-center justify-center text-sm mr-4">4</span>
                  Hubungi Kami
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg ml-12">
                  Jika Anda memiliki pertanyaan mengenai data Anda atau ingin mengajukan penghapusan data dari sistem kami, silakan hubungi tim administrasi kami di <strong>hello@tegakara.com</strong>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
"""

# --- TERMS PAGE ---
terms_page = """import { Metadata } from "next";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | TEGAKARA",
  description: "Syarat dan ketentuan layanan penggunaan website dan layanan TEGAKARA Construction.",
};

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-[#0E1B26] py-24 px-6 selection:bg-bronze selection:text-[#0E1B26]">
      <FadeIn>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope mb-8 text-[#0E1B26] text-center">Syarat & Ketentuan</h1>
          
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <p className="text-sm text-slate-500 mb-10 uppercase tracking-widest font-semibold pb-6 border-b border-slate-100">Terakhir diperbarui: Juli 2026</p>
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#1C2D38] text-white flex items-center justify-center text-sm mr-4">1</span>
                  Penerimaan Syarat
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg ml-12">
                  Dengan mengakses dan menggunakan situs web TEGAKARA, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan sebagian atau seluruh syarat ini, Anda disarankan untuk tidak menggunakan situs ini.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#1C2D38] text-white flex items-center justify-center text-sm mr-4">2</span>
                  Layanan Konstruksi & Kontrak Kerja
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg ml-12">
                  Informasi yang disediakan di website ini bersifat umum sebagai representasi profil perusahaan. Detail spesifik mengenai spesifikasi material, harga akurat, dan jadwal pelaksanaan (timeline) tidak akan disepakati melalui website, melainkan diatur dalam <strong>Kontrak Kerja tertulis (ScopeLock Agreement)</strong> yang ditandatangani oleh kedua belah pihak dan mengikat secara hukum.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#1C2D38] text-white flex items-center justify-center text-sm mr-4">3</span>
                  Hak Kekayaan Intelektual
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg ml-12">
                  Seluruh konten, gambar proyek, logo, kode desain (ProjectView UI), dan teks pada situs web ini adalah hak milik eksklusif TEGAKARA atau dilisensikan kepada kami. Dilarang menyalin, mereproduksi, atau mendistribusikan materi apa pun dari situs ini tanpa izin tertulis dari manajemen TEGAKARA.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#1C2D38] text-white flex items-center justify-center text-sm mr-4">4</span>
                  Penolakan Tanggung Jawab Operasional
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg ml-12">
                  Kami berhak sepenuhnya untuk meninjau, tidak menerima, atau menolak permintaan proyek yang kami nilai tidak sesuai dengan standar mutu operasional, melanggar prosedur keselamatan kerja (HSE), atau berada di luar kapasitas sumber daya kami saat permintaan diajukan.
                </p>
              </section>
            </div>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
"""

with open('/Users/macbook/kontraktor-website/src/app/kontak/page.tsx', 'w') as f:
    f.write(kontak_page)

with open('/Users/macbook/kontraktor-website/src/app/kebijakan-privasi/page.tsx', 'w') as f:
    f.write(privacy_page)

with open('/Users/macbook/kontraktor-website/src/app/syarat-ketentuan/page.tsx', 'w') as f:
    f.write(terms_page)

print("Contact and Legal pages deepened.")
