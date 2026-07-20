import { Metadata } from "next";
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
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/assessment" className="flex items-center justify-center flex-1 bg-bronze text-[#0E1B26] px-6 py-5 rounded-xl font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg hover:shadow-bronze/20 text-center">
                    Isi Assessment
                  </Link>
                  <Link href="https://wa.me/6281112345678" target="_blank" className="flex items-center justify-center flex-1 bg-transparent border-2 border-slate-600 text-slate-300 px-6 py-5 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-all text-lg text-center gap-2">
                    <Phone className="w-5 h-5" /> Hubungi via WhatsApp
                  </Link>
                </div>

                <p className="text-slate-400 text-sm mt-8 text-center">
                  Atau jika butuh konsultasi cepat dan belum memiliki detail proyek, kami selalu tersedia di WhatsApp.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </main>
  );
}
