import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cara Kerja TEGAKARA | Proses Konstruksi Transparan",
  description: "Pelajari 14 langkah kerja sistematis TEGAKARA dari Lead hingga Care. Proses konstruksi yang dirancang untuk kepastian anggaran, waktu, dan kualitas.",
};

export default function CaraKerjaPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-20 px-6">
        <Image 
          src="/images/hero_trust_1784553259220.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto mt-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight mb-6 text-white">
            Proses Kerja yang Mengutamakan Pengendalian
          </h1>
          <p className="text-xl text-[#E8DED0] max-w-3xl mx-auto">
            Proyek konstruksi memiliki banyak variabel. Kami merancang 14 langkah kerja untuk mendefinisikan ruang lingkup, mencatat setiap perubahan, dan menjaga standar pelaksanaan.
          </p>
        </div>
              </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="hidden md:flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-[#E8DED0] mb-16 overflow-x-auto text-sm font-bold font-manrope text-[#0E1B26]">
            <span className="text-[#B88A4A]">1. Lead</span> &rarr;
            <span>2. Assessment</span> &rarr;
            <span>3. ScopeLock</span> &rarr;
            <span>4. Contract</span> &rarr;
            <span>5. Execution</span> &rarr;
            <span>6. Quality</span> &rarr;
            <span>7. Handover</span> &rarr;
            <span>8. Care</span>
          </div>

          <div className="space-y-12">
            {[
              {
                phase: "Fase Perencanaan & Penawaran",
                steps: [
                  { title: "Initial Lead & Filtering", desc: "Diskusi awal untuk memastikan kesesuaian proyek dengan standar mutu kami." },
                  { title: "Site Assessment", desc: "Kunjungan lokasi dan pengukuran detail untuk mengumpulkan data riil." },
                  { title: "Design & Engineering", desc: "Pembuatan gambar kerja, perhitungan struktur, dan spesifikasi material." },
                  { title: "Bill of Quantities (BOQ)", desc: "Perhitungan volume dan harga satuan yang transparan." },
                  { title: "ScopeLock Agreement", desc: "Penyepakatan ruang lingkup dasar untuk meminimalkan perubahan yang tidak direncanakan." },
                ]
              },
              {
                phase: "Fase Eksekusi & Pengendalian",
                steps: [
                  { title: "Kickoff & Permit", desc: "Pengurusan izin kerja, asuransi proyek, dan persiapan lahan." },
                  { title: "Material Approval", desc: "Persetujuan sampel material oleh klien sebelum pembelian massal." },
                  { title: "Milestone Execution", desc: "Pekerjaan fisik berdasarkan jadwal (Gantt Chart) yang telah disepakati." },
                  { title: "Quality Hold Points", desc: "Inspeksi pada tahap kritis (misal: sebelum pengecoran) yang wajib dilalui." },
                  { title: "Change Order Management", desc: "Prosedur tertulis untuk setiap perubahan atau penambahan pekerjaan selama proyek berlangsung." },
                ]
              },
              {
                phase: "Fase Serah Terima & Pemeliharaan",
                steps: [
                  { title: "Defect Liability Inspection", desc: "Pemeriksaan cacat fisik bersama sebelum serah terima resmi." },
                  { title: "Handover & Documentation", desc: "Penyerahan kunci, as-built drawing, dan manual perawatan bangunan." },
                  { title: "Warranty Period", desc: "Masa pemeliharaan di mana kami bertanggung jawab atas cacat tersembunyi." },
                  { title: "Ongoing Facility Care", desc: "Opsi kontrak perawatan lanjutan untuk fasilitas komersial." },
                ]
              }
            ].map((section, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-[#E8DED0]">
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-6 pb-2 border-b border-[#E8DED0]">{section.phase}</h2>
                <div className="space-y-6">
                  {section.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#E8DED0] text-[#0E1B26] font-bold rounded-full flex items-center justify-center mt-1">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0E1B26] mb-1">{step.title}</h3>
                        <p className="text-[#68757D] text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white border border-[#E8DED0] p-8 rounded-xl">
            <h3 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Pembayaran & Pengendalian Perubahan (Change Order)</h3>
            <p className="text-[#0E1B26] mb-4">
              Sistem pembayaran kami berbasis termin yang diselaraskan dengan tahapan pekerjaan (milestone). Pekerjaan pada tahap selanjutnya akan dimulai setelah pendanaan termin terkait diterima, menjaga kelancaran proyek bagi kedua belah pihak.
            </p>
            <p className="text-[#0E1B26]">
              Setiap usulan perubahan pekerjaan wajib melalui kesepakatan tertulis (Variation Order) yang menjelaskan dampaknya terhadap waktu dan biaya. Pekerjaan tambahan baru dilakukan setelah ada persetujuan.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold font-manrope mb-6 text-[#E8DED0]">Mulai Proyek Anda dengan Sistem yang Jelas</h2>
        <Link href="/assessment" className="inline-block bg-[#B88A4A] text-[#0E1B26] px-8 py-4 rounded-md font-medium hover:bg-opacity-90">
          Isi Form Proyek
        </Link>
      </section>
    </main>
  );
}
