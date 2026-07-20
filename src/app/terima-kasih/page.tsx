import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = {
  title: "Terima Kasih | TEGAKARA",
  description: "Terima kasih telah menghubungi TEGAKARA Construction & Facility Care. Tim kami akan segera meninjau data Anda.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TerimaKasihPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-24">
      <div className="max-w-2xl w-full text-center">
        <FadeIn>
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <CheckCircle2 className="w-20 h-20 text-[#25775A] mx-auto mb-8" />
            <h1 className="text-4xl font-bold font-manrope text-[#0E1B26] mb-4">Pengajuan Berhasil!</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Terima kasih telah mempercayakan rencana proyek Anda kepada TEGAKARA. Tim kami sedang meninjau informasi yang Anda berikan dan akan segera menghubungi Anda dalam waktu <strong>1x24 jam kerja</strong> untuk langkah selanjutnya.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-10 text-left">
              <h3 className="font-bold text-[#0E1B26] mb-2 font-manrope">Langkah Berikutnya:</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2 mr-3 shrink-0"></div>
                  <span>Menjadwalkan survei lokasi (jika diperlukan)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2 mr-3 shrink-0"></div>
                  <span>Mendiskusikan detail teknis dan material</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2 mr-3 shrink-0"></div>
                  <span>Pembuatan Bill of Quantities awal (BOQ)</span>
                </li>
              </ul>
            </div>

            <Link href="/" className="inline-flex items-center text-[#0E1B26] font-medium hover:text-bronze transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Halaman Utama
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
