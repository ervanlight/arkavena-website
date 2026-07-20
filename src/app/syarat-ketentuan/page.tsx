import { Metadata } from "next";
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
