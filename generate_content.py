import os

# --- 1. PROJECTS DATA ---
projects_ts = """export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  scope: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const projectsData: Project[] = [
  {
    slug: 'rumah-tinggal-citraland',
    title: 'Pembangunan Rumah Tinggal Modern Minimalis',
    category: 'Residensial',
    location: 'CitraLand, Surabaya',
    imageUrl: '/images/house_renovation_1784551967214.jpg',
    scope: 'Desain & Konstruksi Sipil, Arsitektur, MEP',
    duration: '8 Bulan',
    challenge: 'Klien menginginkan tata letak ruang terbuka (open plan) tanpa kolom di tengah ruang keluarga yang luas, serta membutuhkan tingkat kedap suara yang tinggi karena lokasi rumah berada di jalan utama perumahan.',
    solution: 'Kami menggunakan struktur baja komposit untuk menopang bentang lebar tanpa kolom tengah. Untuk insulasi suara, kami mengaplikasikan dinding lapis ganda dengan rockwool dan menggunakan jendela uPVC double-glass.',
    results: [
      'Struktur bentang 12 meter berhasil dibangun tanpa lendutan melebihi toleransi.',
      'Kebisingan dari jalan raya berkurang hingga 45 desibel di dalam ruangan.',
      'Proyek selesai tepat waktu sesuai jadwal awal tanpa ada penambahan biaya (Overrun 0%).'
    ]
  },
  {
    slug: 'gedung-perkantoran-surabaya',
    title: 'Fasad & Perawatan Gedung Perkantoran',
    category: 'Komersial',
    location: 'Pusat Kota Surabaya',
    imageUrl: '/images/commercial_building_1784551986230.jpg',
    scope: 'Renovasi Fasad, Waterproofing, Pengecatan Eksterior',
    duration: '3 Bulan',
    challenge: 'Gedung berusia 15 tahun mengalami kebocoran di beberapa titik saat hujan deras. Fasad lama terlihat kusam dan perlu peremajaan tanpa menghentikan aktivitas operasional kantor di dalamnya.',
    solution: 'Pekerjaan dilakukan secara parsial per zona pada akhir pekan dan malam hari. Kami mengupas lapisan fasad lama, menyuntikkan (injeksi) PU pada retakan struktural, dan melapisi ulang dengan cat eksterior tahan cuaca bergaransi.',
    results: [
      'Kebocoran tuntas 100% setelah diuji dengan water test selama 24 jam.',
      'Operasional kantor klien tidak terganggu selama masa perbaikan.',
      'Tampilan fasad kembali modern dan memberikan citra positif bagi perusahaan klien.'
    ]
  },
  {
    slug: 'fasilitas-sekolah-sidoarjo',
    title: 'Pemeliharaan Fasilitas Sekolah & Lapangan',
    category: 'Sekolah',
    location: 'Sidoarjo',
    imageUrl: '/images/school_facility_1784552005374.jpg',
    scope: 'Perbaikan Toilet, Plafon, dan Pengecatan Lapangan Basket',
    duration: '1 Bulan (Masa Libur Sekolah)',
    challenge: 'Seluruh pekerjaan harus diselesaikan dalam waktu libur semester yang sangat ketat (4 minggu) agar tidak mengganggu aktivitas belajar mengajar di semester baru.',
    solution: 'Kami mengerahkan dua tim paralel (tim sipil untuk toilet/plafon dan tim aplikator untuk lapangan). Proses pemesanan material (PO) diselesaikan 2 minggu sebelum libur dimulai untuk menghindari jeda tunggu (idle time).',
    results: [
      'Pekerjaan selesai 3 hari lebih cepat dari tenggat waktu.',
      'Standar kebersihan (clearing) dijaga ketat sehingga sekolah siap digunakan pada hari pertama masuk.',
      'Diterapkan sistem material anti-slip pada toilet untuk keamanan siswa.'
    ]
  },
  {
    slug: 'waterproofing-pabrik-gresik',
    title: 'Waterproofing Atap Pabrik Industri',
    category: 'Komersial',
    location: 'Kawasan Industri Gresik',
    imageUrl: '/images/industrial_facility_1784552026672.jpg',
    scope: 'Waterproofing Membran Bakar dan Perbaikan Talang',
    duration: '2 Bulan',
    challenge: 'Atap pabrik seluas 2.000 m2 mengalami korosi dan rembesan yang membahayakan mesin produksi di bawahnya. Area kerja berada di ketinggian dengan paparan angin kencang.',
    solution: 'Penerapan standar K3 (HSE) yang ketat dengan penggunaan body harness dan jaring pengaman. Kami mengaplikasikan membran bakar 3mm pada area dak beton dan pelapisan polyurethane pada sambungan talang metal.',
    results: [
      'Zero accident (Nihil kecelakaan kerja) selama proyek berlangsung.',
      'Area produksi di bawahnya 100% aman dari tetesan air selama musim hujan.',
      'Masa garansi pekerjaan diberikan selama 5 tahun dengan kunjungan audit tahunan.'
    ]
  }
];
"""

with open('/Users/macbook/kontraktor-website/src/content/projects.ts', 'w') as f:
    f.write(projects_ts)

# --- 2. PORTFOLIO DYNAMIC PAGE ---
slug_page = """import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/content/projects';
import { FadeIn } from '@/components/shared/fade-in';
import { ArrowLeft, MapPin, Calendar, Layers, CheckCircle2 } from 'lucide-react';

// For Next.js static export
export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-[#0E1B26]">
        <Image 
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B26] via-[#0E1B26]/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <Link href="/portfolio" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Portofolio
              </Link>
              <div className="flex gap-3 mb-4">
                <span className="px-3 py-1 bg-bronze/20 border border-bronze/30 text-bronze rounded-full text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-manrope font-bold text-white mb-4 leading-tight">
                {project.title}
              </h1>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Project Meta */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.1}>
                <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 sticky top-24">
                  <h3 className="font-manrope font-bold text-[#0E1B26] text-xl mb-6 border-b border-slate-200 pb-4">Info Proyek</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center text-slate-500 mb-1 text-sm">
                        <MapPin className="w-4 h-4 mr-2" /> Lokasi
                      </div>
                      <p className="font-medium text-[#0E1B26]">{project.location}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-slate-500 mb-1 text-sm">
                        <Calendar className="w-4 h-4 mr-2" /> Durasi
                      </div>
                      <p className="font-medium text-[#0E1B26]">{project.duration}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-slate-500 mb-1 text-sm">
                        <Layers className="w-4 h-4 mr-2" /> Ruang Lingkup
                      </div>
                      <p className="font-medium text-[#0E1B26]">{project.scope}</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <Link href="/assessment" className="block w-full text-center bg-[#0E1B26] text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                      Mulai Proyek Serupa
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Story */}
            <div className="lg:col-span-2 space-y-12">
              <FadeIn delay={0.2}>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Tantangan Proyek</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{project.challenge}</p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h2 className="text-2xl font-bold font-manrope text-[#0E1B26] mb-4">Pendekatan & Solusi</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{project.solution}</p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="bg-[#0E1B26] text-white p-8 rounded-xl mt-8">
                  <h2 className="text-2xl font-bold font-manrope text-white mb-6">Hasil Akhir</h2>
                  <ul className="space-y-4">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-6 h-6 text-bronze shrink-0 mr-4 mt-0.5" />
                        <span className="text-slate-300 leading-relaxed">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
"""
with open('/Users/macbook/kontraktor-website/src/app/portfolio/[slug]/page.tsx', 'w') as f:
    f.write(slug_page)

print("Created Portfolio Data & Dynamic Pages.")
