import { Metadata } from "next";
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
