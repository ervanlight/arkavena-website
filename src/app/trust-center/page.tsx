import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust Center | Transparansi & Kepatuhan TEGAKARA",
  description: "Dokumentasi legal, kebijakan keselamatan (HSE), mutu (Quality), privasi, dan standar asuransi yang mengatur operasional TEGAKARA.",
};

export default function TrustCenterPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-16 px-6">
        <Image 
          src="/images/hero_trust_1784553259220.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto mt-10">
          <h1 className="text-4xl font-bold font-manrope mb-4 text-white">Trust Center</h1>
          <p className="text-xl text-[#E8DED0]">
            Pusat informasi mengenai legalitas, kebijakan mutu, kepatuhan keselamatan (HSE), dan komitmen privasi kami.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-bold text-lg text-[#0E1B26] border-b pb-2 border-[#E8DED0]">Navigasi Kebijakan</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#kualitas" className="text-[#68757D] hover:text-[#B88A4A]">Standar Mutu (Quality)</a></li>
              <li><a href="#keselamatan" className="text-[#68757D] hover:text-[#B88A4A]">HSE & Keselamatan</a></li>
              <li><a href="#garansi" className="text-[#68757D] hover:text-[#B88A4A]">Garansi & Retensi</a></li>
              <li><a href="#legal" className="text-[#68757D] hover:text-[#B88A4A]">Legal & Asuransi</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2 space-y-12">
            
            <div id="kualitas" className="bg-white p-8 rounded-lg border border-[#E8DED0] shadow-sm">
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Manajemen Mutu & Material</h2>
              <p className="text-sm text-[#68757D] mb-4">
                Setiap penerimaan material utama di lapangan wajib melalui pemeriksaan kesesuaian dengan Rencana Anggaran Biaya (RAB) dan spesifikasi teknis. Kami menerapkan <strong>Quality Hold Points</strong>, di mana pekerjaan tidak bisa dilanjutkan ke tahap berikutnya sebelum tahap kritis (misalnya pembesian sebelum pengecoran) diinspeksi.
              </p>
            </div>

            <div id="keselamatan" className="bg-white p-8 rounded-lg border border-[#E8DED0] shadow-sm">
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Health, Safety, and Environment (HSE)</h2>
              <p className="text-sm text-[#68757D] mb-4">
                Kami mewajibkan penggunaan Alat Pelindung Diri (APD) standar bagi seluruh pekerja dan staf di lapangan. Untuk proyek komersial dan industri, kami dapat mematuhi sistem izin kerja (Permit to Work) sesuai regulasi fasilitas klien.
              </p>
            </div>

            <div id="garansi" className="bg-white p-8 rounded-lg border border-[#E8DED0] shadow-sm">
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Kebijakan Garansi & Retensi</h2>
              <p className="text-sm text-[#68757D] mb-4">
                Setiap penyelesaian proyek konstruksi disertai dengan Masa Pemeliharaan (Defect Liability Period) yang diatur dalam kontrak, di mana sebagian nilai pembayaran ditahan sebagai retensi hingga masa pemeliharaan selesai dan cacat fisik yang mungkin timbul diperbaiki.
              </p>
            </div>

            <div id="legal" className="bg-white p-8 rounded-lg border border-[#E8DED0] shadow-sm">
              <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Kepatuhan Hukum & Privasi</h2>
              <p className="text-sm text-[#68757D] mb-4">
                Informasi desain, anggaran, dan data pribadi klien dijaga kerahasiaannya dan hanya digunakan untuk keperluan eksekusi proyek. Baca lebih lanjut di <Link href="/kebijakan-privasi" className="text-[#B88A4A] hover:underline">Kebijakan Privasi</Link> dan <Link href="/syarat-ketentuan" className="text-[#B88A4A] hover:underline">Syarat & Ketentuan</Link> kami.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
