import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terima Kasih | TEGAKARA",
  description: "Terima kasih telah menghubungi TEGAKARA.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TerimaKasihPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 text-[#0E1B26]">
      <div className="max-w-lg w-full bg-white p-10 rounded-xl shadow-sm border border-[#E8DED0] text-center">
        <div className="w-16 h-16 bg-[#B88A4A] bg-opacity-20 text-[#B88A4A] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold font-manrope text-[#0E1B26] mb-4">Terima Kasih</h1>
        <p className="text-[#68757D] mb-8">
          Data proyek Anda telah kami terima. Tim kami akan segera meninjau informasi tersebut dan menghubungi Anda kembali dalam 1-2 hari kerja untuk mendiskusikan langkah selanjutnya.
        </p>
        <div className="space-y-4">
          <Link href="/" className="block w-full bg-[#0E1B26] text-white py-3 rounded font-medium hover:bg-opacity-90">
            Kembali ke Beranda
          </Link>
          <Link href="/cara-kerja" className="block w-full bg-[#E8DED0] text-[#0E1B26] py-3 rounded font-medium hover:bg-opacity-80">
            Pelajari Cara Kerja Kami
          </Link>
        </div>
      </div>
    </main>
  );
}
