import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Layanan Waterproofing & Perbaikan Atap | TEGAKARA",
  description: "Solusi anti bocor sistematis. Diagnosa akar masalah, persiapan substrat yang tepat, dan uji rendam (ponding test) untuk jaminan kualitas.",
};

export default function WaterproofingPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_facility_waterproofing_1784553830435.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="text-sm text-[#B88A4A] mb-4">
            <Link href="/facility-care" className="hover:underline">Facility Care</Link> &gt; Waterproofing & Atap
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Menghentikan Kebocoran dari Akar Masalah
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mb-10">
            Menambal secara membabi buta tidak akan menyelesaikan masalah air. Kami mulai dengan diagnosa yang tepat, persiapan permukaan (substrate) yang benar, dan material yang sesuai.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-manrope mb-8 text-[#0E1B26]">Metodologi Kami</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#E8DED0] rounded-full flex items-center justify-center font-bold text-[#0E1B26] flex-shrink-0 mt-1">1</div>
              <div>
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Diagnosa & Drainase</h3>
                <p className="text-[#68757D]">Kebocoran sering kali disebabkan oleh kemiringan (slope) yang salah atau saluran pembuangan yang mampet. Kami memperbaiki drainase sebelum mengaplikasikan pelapis.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#E8DED0] rounded-full flex items-center justify-center font-bold text-[#0E1B26] flex-shrink-0 mt-1">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Persiapan Substrat</h3>
                <p className="text-[#68757D]">Waterproofing terbaik pun akan gagal jika diaplikasikan di atas beton yang rapuh atau kotor. Pembersihan dan primer adalah tahap krusial kami.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#E8DED0] rounded-full flex items-center justify-center font-bold text-[#0E1B26] flex-shrink-0 mt-1">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#0E1B26] mb-2">Uji Rendam (Ponding Test)</h3>
                <p className="text-[#68757D]">Untuk area dak beton basah, kami melakukan uji rendam air selama 1x24 jam untuk membuktikan tidak ada lagi rembesan sebelum diserahterimakan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Selesaikan Masalah Bocor Anda</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Konsultasi Gratis
        </Link>
      </section>
    </main>
  );
}
