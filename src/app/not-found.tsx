import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan | TEGAKARA",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 text-[#0E1B26]">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-7xl font-bold font-manrope text-[#0E1B26]">404</h1>
        <h2 className="text-2xl font-bold text-[#0E1B26]">Halaman Tidak Ditemukan</h2>
        <p className="text-[#68757D]">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak lagi tersedia.
        </p>
        <div className="pt-6">
          <Link href="/" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
