import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | TEGAKARA",
  description: "Syarat dan ketentuan layanan penggunaan website dan layanan TEGAKARA Construction.",
};

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26] py-20 px-6">
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl md:text-4xl font-bold font-manrope mb-8 text-[#0E1B26]">Syarat & Ketentuan</h1>
        <div className="prose prose-slate prose-p:text-[#68757D] prose-h2:text-[#0E1B26] prose-h2:font-manrope bg-white p-8 rounded-lg border border-[#E8DED0]">
          <p className="text-sm mb-6">Terakhir diperbarui: Juli 2026</p>
          
          <h2>1. Penerimaan Syarat</h2>
          <p>
            Dengan mengakses dan menggunakan situs web TEGAKARA, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan ini.
          </p>

          <h2>2. Layanan Konstruksi</h2>
          <p>
            Informasi yang disediakan di website ini bersifat umum. Detail spesifik mengenai spesifikasi, harga, dan jadwal pelaksanaan (timeline) akan diatur dalam Kontrak Kerja terpisah (ScopeLock Agreement) yang mengikat secara hukum bagi setiap klien.
          </p>

          <h2>3. Hak Kekayaan Intelektual</h2>
          <p>
            Seluruh konten, gambar, logo, dan teks pada situs web ini adalah hak milik TEGAKARA. Dilarang menyalin atau menggunakan tanpa izin tertulis.
          </p>
          
          <h2>4. Penolakan Tanggung Jawab</h2>
          <p>
            Kami berhak untuk tidak menerima atau menolak permintaan proyek yang tidak sesuai dengan standar mutu, keselamatan (HSE), atau kapasitas operasional kami.
          </p>
        </div>
      </div>
    </main>
  );
}
