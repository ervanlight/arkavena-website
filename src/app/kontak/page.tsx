import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontak Kami | TEGAKARA Construction",
  description: "Hubungi TEGAKARA untuk layanan konstruksi rumah atau perawatan fasilitas di area Surabaya dan sekitarnya.",
};

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/factory_roof_1784552012117.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto mt-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Mari Bicarakan Proyek Anda
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-2xl mx-auto">
            Fokus kami adalah melayani wilayah Surabaya Raya dan sekitarnya. Untuk memberikan layanan terbaik, kami melakukan kualifikasi pada setiap permintaan proyek.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Area Layanan</h2>
              <p className="text-[#68757D]">
                Surabaya, Sidoarjo, dan Gresik. Untuk proyek di luar area ini, kami akan mempertimbangkan berdasarkan skala proyek.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Jam Operasional</h2>
              <p className="text-[#68757D]">Senin - Jumat: 08.00 - 17.00 WIB</p>
              <p className="text-[#68757D]">Sabtu - Minggu: Tutup (Kecuali kondisi darurat Facility Care)</p>
            </div>
            
            <div className="bg-white p-6 border border-[#E8DED0] rounded-lg">
              <h3 className="font-bold text-[#0E1B26] mb-2">Email Inquiries</h3>
              <p className="text-[#68757D]">hello@tegakara.com</p>
            </div>
          </div>

          <div className="bg-[#1C2D38] p-8 rounded-xl text-white">
            <h2 className="text-2xl font-bold font-manrope mb-6 text-[#E8DED0]">Formulir Asesmen Proyek</h2>
            <p className="text-[#68757D] mb-8 text-sm">
              Langkah tercepat untuk mendapatkan respons dari tim kami adalah dengan mengisi formulir asesmen, sehingga kami dapat mempelajari skala dan kebutuhan spesifik Anda terlebih dahulu.
            </p>
            <Link href="/assessment" className="block w-full text-center bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90 transition-colors">
              Isi Informasi Proyek (Assessment)
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
