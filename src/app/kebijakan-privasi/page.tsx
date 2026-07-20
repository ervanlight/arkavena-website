import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | TEGAKARA",
  description: "Kebijakan privasi dan pengelolaan data pengguna oleh TEGAKARA Construction.",
};

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26] py-20 px-6">
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl md:text-4xl font-bold font-manrope mb-8 text-[#0E1B26]">Kebijakan Privasi</h1>
        <div className="prose prose-slate prose-p:text-[#68757D] prose-h2:text-[#0E1B26] prose-h2:font-manrope bg-white p-8 rounded-lg border border-[#E8DED0]">
          <p className="text-sm mb-6">Terakhir diperbarui: Juli 2026</p>
          
          <h2>1. Pengumpulan Data</h2>
          <p>
            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami melalui formulir kontak atau asesmen proyek, termasuk nama, alamat email, nomor telepon, dan detail rencana konstruksi Anda.
          </p>

          <h2>2. Penggunaan Informasi</h2>
          <p>
            Informasi yang dikumpulkan digunakan secara eksklusif untuk:
          </p>
          <ul>
            <li>Mengevaluasi kelayakan dan ruang lingkup proyek Anda.</li>
            <li>Berkomunikasi terkait penawaran, penjadwalan survei, dan operasional proyek.</li>
            <li>Meningkatkan layanan kami.</li>
          </ul>

          <h2>3. Keamanan Data</h2>
          <p>
            Kami menjaga kerahasiaan data proyek (seperti gambar desain dan anggaran) yang Anda serahkan dan tidak akan membagikannya kepada pihak ketiga di luar keperluan sub-kontraktor atau vendor yang terlibat langsung dalam pelaksanaan proyek Anda.
          </p>

          <h2>4. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai data Anda, silakan hubungi kami di hello@tegakara.com.
          </p>
        </div>
      </div>
    </main>
  );
}
