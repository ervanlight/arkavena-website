import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  Search, 
  ShieldCheck, 
  Eye, 
  Layers, 
  Clock, 
  FileText, 
  CheckSquare, 
  Wallet,
  Settings,
  PenTool,
  Building2,
  HardHat
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { generalFaqs } from '@/content/faqs';
import { processSteps } from '@/content/process';
import { HeroPanel } from '@/components/home/hero-panel';
import { FaqAccordion } from '@/components/home/faq-accordion';
import { ProjectViewPreview } from '@/components/home/projectview-preview';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/ui/section-header';
import { ProjectCard } from '@/components/sections/project-card';
import { FadeIn } from '@/components/shared/fade-in';

export const metadata: Metadata = {
  title: 'TEGAKARA — Karya Terukur. Aset Terjaga.',
  description: 'TEGAKARA mengelola ruang lingkup, biaya, progres, mutu, dan perubahan pekerjaan secara terdokumentasi—untuk rumah, sekolah, gedung komersial, dan fasilitas operasional di Surabaya.',
  alternates: {
    canonical: '/',
  }
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.domain}/#organization`,
        name: 'TEGAKARA Construction & Facility Care',
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/images/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+62-811-1234-5678', // Placeholder, update in siteConfig if available
          contactType: 'customer service',
          areaServed: 'ID',
          availableLanguage: 'Indonesian'
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Surabaya',
          addressRegion: 'Jawa Timur',
          addressCountry: 'ID'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.domain}/#website`,
        url: siteConfig.domain,
        name: 'TEGAKARA',
        publisher: {
          '@id': `${siteConfig.domain}/#organization`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* SECTION 1: Hero */}
      <section className="z-0 relative bg-[#0E1B26] min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        <Image 
          src="/images/hero_home_1784553150926.jpg"
          alt="" aria-hidden="true"
          fill
          className="object-cover opacity-20 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
        {/* Decorative blueprint pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B26] via-transparent to-transparent pointer-events-none"></div>
        
        <Container className="relative z-10">
          <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="space-y-8 max-w-2xl">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-bronze/10 border border-bronze/20 text-bronze text-sm font-medium tracking-wide mb-6">
                  Konstruksi & Perawatan Properti — Surabaya
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-white leading-tight tracking-tight">
                  Bangun dan rawat properti tanpa <span className="text-bronze">kehilangan kendali.</span>
                </h1>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed font-inter max-w-xl">
                TEGAKARA membantu pemilik rumah dan pengelola gedung mengendalikan ruang lingkup, biaya, progres, mutu, dan perubahan pekerjaan melalui sistem yang jelas dan terdokumentasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-bronze hover:bg-bronze/90 text-[#0E1B26] font-bold px-8 text-base h-14">
                  <Link href="/assessment">Konsultasikan Proyek</Link>
                </Button>
                <Button size="lg" variant="secondary" className="border-white/20 text-white hover:bg-white/5 font-medium px-8 text-base h-14">
                  <Link href="/cara-kerja">Lihat Cara Kerja</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end relative">
              {/* Decorative glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              <HeroPanel />
            </div>
          </div>
          </FadeIn>
        </Container>
              </div>
      </section>

      {/* SECTION 2: Control Strip */}
      <section className="bg-[#1C2D38] border-y border-white/5 py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x divide-white/10">
            <div className="flex flex-col items-center text-center px-4 space-y-3">
              <FileCheck2 className="w-8 h-8 text-bronze" />
              <span className="text-sm font-medium text-white tracking-wide">Ruang Lingkup Jelas</span>
            </div>
            <div className="flex flex-col items-center text-center px-4 space-y-3">
              <Eye className="w-8 h-8 text-bronze" />
              <span className="text-sm font-medium text-white tracking-wide">Progres Dilengkapi Bukti</span>
            </div>
            <div className="flex flex-col items-center text-center px-4 space-y-3">
              <Layers className="w-8 h-8 text-bronze" />
              <span className="text-sm font-medium text-white tracking-wide">Perubahan Disetujui Tertulis</span>
            </div>
            <div className="flex flex-col items-center text-center px-4 space-y-3">
              <ShieldCheck className="w-8 h-8 text-bronze" />
              <span className="text-sm font-medium text-white tracking-wide">Garansi Tercatat</span>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: Service Selection */}
      <section className="py-24 bg-[#E8DED0] relative overflow-hidden">
        {/* Subtle mesh background for glassmorphism pop */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <Container className="relative z-10">
          <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-manrope font-bold text-[#0E1B26] mb-4">Layanan untuk Rumah dan Gedung</h2>
            <p className="text-[#68757D] text-lg">Pilih layanan sesuai kebutuhan Anda. Setiap proyek menggunakan standar yang sama untuk perencanaan, dokumentasi progres, pemeriksaan mutu, dan perubahan pekerjaan.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Residential Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-64 bg-slate-100 relative overflow-hidden">
                <Image 
                  src="/images/house_renovation_1784551967214.jpg" 
                  alt="Fasad rumah dua lantai dengan gaya modern"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-manrope font-bold text-[#0E1B26] mb-4">Bangun dan Renovasi Rumah</h3>
                <p className="text-[#68757D] mb-8 leading-relaxed flex-1">
                  Bangun rumah baru, renovasi besar, atau tambah lantai dengan ruang lingkup, spesifikasi, jadwal, dan perubahan pekerjaan yang dicatat sejak awal.\n\nPelaksanaan disesuaikan dengan kondisi lokasi, kesiapan desain, kebutuhan pemilik, dan skema pengadaan yang disepakati.
                </p>
                <Button className="w-full sm:w-auto group-hover:bg-[#0E1B26] group-hover:text-white transition-colors">
                  <Link href="/residential" className="flex items-center justify-center gap-2">
                    Lihat Layanan Rumah Tinggal <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Facility Care Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-64 bg-slate-100 relative overflow-hidden">
                <Image 
                  src="/images/commercial_building_1784551986230.jpg" 
                  alt="Perawatan gedung komersial dan fasilitas industri"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-manrope font-bold text-[#0E1B26] mb-4">Facility Care</h3>
                <p className="text-[#68757D] mb-8 leading-relaxed flex-1">
                  Perbaikan dan perawatan terencana untuk sekolah, gedung komersial, gudang, dan fasilitas operasional, dengan pelaksanaan yang diatur agar gangguan kegiatan harian dapat ditekan.
                </p>
                <Button className="w-full sm:w-auto group-hover:bg-[#0E1B26] group-hover:text-white transition-colors">
                  <Link href="/facility-care" className="flex items-center justify-center gap-2">
                    Lihat Layanan Facility Care <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 4: Client Anxieties */}
      <section className="py-24 bg-[#E8DED0]">
        <Container>
          <FadeIn>
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-manrope font-bold text-[#0E1B26] leading-tight mb-6">
              Banyak masalah konstruksi bukan semata persoalan tenaga lapangan, tetapi <span className="text-bronze">sistem kerja yang tidak jelas.</span>
            </h2>
            <p className="text-lg text-[#0E1B26]">
              TEGAKARA menggunakan mekanisme kontrol untuk mengurangi risiko biaya, mutu, keterlambatan, dan perubahan yang tidak terdokumentasi sejak awal proyek.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                pain: "Biaya bertambah tanpa penjelasan yang jelas.", 
                solution: "ScopeLock & Persetujuan Perubahan",
                desc: "Setiap perubahan dihitung bersama dampaknya terhadap biaya dan jadwal, kemudian disetujui secara tertulis sebelum dikerjakan."
              },
              { 
                pain: "Material atau hasil pekerjaan tidak sesuai dengan spesifikasi yang disepakati.", 
                solution: "Pemeriksaan Mutu Terbuka",
                desc: "Spesifikasi dan sampel disetujui sebelum pengadaan. Material yang tiba serta tahapan penting didokumentasikan sebelum pekerjaan ditutup atau dilanjutkan."
              },
              { 
                pain: "Pembayaran dan progres pekerjaan tidak berada pada tahap yang sama.", 
                solution: "Termin Berdasarkan Tahap Kerja",
                desc: "Setiap tahap memiliki ruang lingkup, kebutuhan dana, bukti progres, dan kriteria penyelesaian yang jelas. Pekerjaan tahap berikutnya dimulai setelah termin terkait diterima."
              },
              { 
                pain: "Progres sulit dipantau dan laporan proyek tidak tersusun dengan rapi.", 
                solution: "ProjectView",
                desc: "Lihat progres, foto pekerjaan, jadwal, keputusan, dan perubahan proyek dalam satu portal yang mudah dipahami."
              },
              { 
                pain: "Kesalahan pada pekerjaan penting baru diketahui setelah pekerjaan ditutup.", 
                solution: "Quality Hold Point",
                desc: "Tahapan penting seperti pembesian, pengecoran, pipa tertanam, kelistrikan, dan waterproofing diperiksa sebelum pekerjaan berikutnya dilanjutkan."
              },
              { 
                pain: "Keluhan selama masa garansi sulit dicatat dan dipantau penyelesaiannya.", 
                solution: "Tiket Garansi Digital",
                desc: "Setiap laporan dicatat, diperiksa, dan ditindaklanjuti sesuai cakupan serta masa garansi yang tercantum dalam kontrak."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="mb-4 text-red-500/90 font-medium text-sm flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> {item.pain}
                </div>
                <div className="h-px bg-slate-200/50 w-full my-4"></div>
                <div className="text-[#0E1B26] font-semibold text-sm flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25775A]" /> Solusi: {item.solution}
                </div>
                <p className="text-[#68757D] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 5: Controlled Delivery System */}
      <section className="py-24 bg-white">
        <Container>
          <FadeIn>
          <SectionHeader 
            title="Satu sistem untuk mengendalikan proyek dari awal hingga serah terima."
            description="Setiap tahap memiliki ruang lingkup, penanggung jawab, bukti pekerjaan, dan persetujuan yang jelas."
            align="center"
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-6 h-6 text-bronze" />,
                title: "Project Assessment",
                desc: "Peninjauan awal terhadap kondisi lokasi, kebutuhan proyek, risiko, dan kesiapan anggaran sebelum ruang lingkup final disusun."
              },
              {
                icon: <FileCheck2 className="w-6 h-6 text-bronze" />,
                title: "ScopeLock",
                desc: "Dokumen dasar proyek yang menjelaskan pekerjaan yang termasuk, pekerjaan yang tidak termasuk, spesifikasi material, dan prosedur perubahan."
              },
              {
                icon: <Clock className="w-6 h-6 text-bronze" />,
                title: "Milestone Planning",
                desc: "Proyek dibagi menjadi beberapa tahap kerja dengan jadwal, kebutuhan dana, dan kriteria penyelesaian yang jelas."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-bronze" />,
                title: "Quality Hold Point",
                desc: "Pemeriksaan pada pekerjaan penting—seperti struktur, pipa tertanam, kelistrikan, dan waterproofing—sebelum pekerjaan ditutup atau dilanjutkan."
              },
              {
                icon: <Search className="w-6 h-6 text-bronze" />,
                title: "ProjectView",
                desc: "Portal klien untuk melihat progres per area, foto pekerjaan, keputusan, perubahan, dokumen mutu, dan status termin proyek."
              },
              {
                icon: <HardHat className="w-6 h-6 text-bronze" />,
                title: "Warranty & Facility Care",
                desc: "Masa garansi, laporan kendala, inspeksi berkala, dan kebutuhan perawatan dicatat hingga tindak lanjut sesuai ketentuan layanan."
              }
            ].map((pillar, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="bg-[#0E1B26]/5 p-3 rounded-lg shrink-0">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-manrope font-bold text-[#0E1B26] text-lg mb-2">{pillar.title}</h3>
                  <p className="text-[#68757D] text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 6: ProjectView Preview */}
      <section className="py-24 bg-[#0E1B26] border-t border-slate-800 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <Container className="relative z-10">
          <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-6">
              Informasi Proyek Lebih Jelas
            </span>
            <h2 className="text-3xl md:text-4xl font-manrope font-bold text-white mb-6">
              Lihat informasi penting proyek dalam satu tempat
            </h2>
            <p className="text-slate-400 text-lg">
              ProjectView memberi Anda kendali penuh atas informasi proyek. Tidak perlu lagi bertanya-tanya &quot;sampai mana progres hari ini?&quot; atau &quot;mengapa biaya bertambah?&quot;.
            </p>
          </div>

          <div className="mb-12">
            <ProjectViewPreview />
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-bronze hover:bg-bronze/90 text-[#0E1B26] font-bold px-8 h-14">
              <Link href="/projectview">Lihat Seluruh Fitur ProjectView</Link>
            </Button>
          </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 7: Process */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeader 
            title="Langkah kerja yang jelas dari awal hingga pelaksanaan"
            description="Proses kerja kami disusun berurutan untuk mengurangi miskomunikasi, perubahan yang tidak tercatat, dan pekerjaan ulang."
            align="center"
            className="mb-16"
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 md:border-l-0">
              {processSteps.slice(0, 7).map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Mobile Layout */}
                  <div className="md:hidden relative pl-10 mb-12">
                    <div className="absolute w-8 h-8 rounded-full bg-[#0E1B26] text-white flex items-center justify-center font-bold text-sm -left-[17px] top-0 border-4 border-warm-white z-10">
                      {step.stepNumber}
                    </div>
                    <h3 className="text-xl font-manrope font-bold text-[#0E1B26] mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                    <div className="mt-4">
                      <ul className="space-y-2">
                        {step.details.slice(0, 2).map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#0E1B26]">
                            <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start mb-12 relative group">
                    {/* Left side */}
                    <div className={`text-right ${index % 2 !== 0 ? 'invisible' : ''}`}>
                      <h3 className="text-xl font-manrope font-bold text-[#0E1B26] mb-2">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                      <div className="mt-4 inline-block text-left">
                        <ul className="space-y-2">
                          {step.details.slice(0, 2).map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#0E1B26]">
                              <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Center dot */}
                    <div className="flex flex-col items-center relative h-full">
                      <div className="w-10 h-10 rounded-full bg-[#0E1B26] text-white flex items-center justify-center font-bold z-10 shadow-md transition-transform group-hover:scale-110">
                        {step.stepNumber}
                      </div>
                      {index !== processSteps.slice(0, 7).length - 1 && (
                        <div className="absolute top-10 bottom-[-3rem] w-0.5 bg-slate-200"></div>
                      )}
                    </div>

                    {/* Right side */}
                    <div className={`text-left ${index % 2 === 0 ? 'invisible' : ''}`}>
                      <h3 className="text-xl font-manrope font-bold text-[#0E1B26] mb-2">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                      <div className="mt-4">
                        <ul className="space-y-2">
                          {step.details.slice(0, 2).map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#0E1B26]">
                              <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="secondary" className="border-slate-300 text-[#0E1B26] hover:bg-slate-50 font-medium">
                <Link href="/cara-kerja">Lihat Detail Cara Kerja</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 8: Portfolio placeholder/neutral layout */}
      <section className="py-24 bg-[#1C2D38]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-manrope font-bold text-white mb-4">Lihat Proyek yang Telah Kami Kerjakan</h2>
              <p className="text-slate-300 text-lg">
                Kami hanya menampilkan proyek yang telah mendapat izin publikasi. Informasi proyek lainnya tetap kami jaga sesuai kesepakatan dengan klien.
              </p>
            </div>
            <Button className="bg-white text-[#0E1B26] hover:bg-slate-100 shrink-0">
              <Link href="/portfolio">Lihat Semua Proyek</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard 
              title="Pembangunan Rumah Tinggal Modern Minimalis"
              category="Rumah Tinggal"
              location="CitraLand, Surabaya"
              href="/portfolio/rumah-tinggal-citraland"
              imageUrl="/images/house_renovation_1784551967214.jpg"
            />
            <ProjectCard 
              title="Fasad & Perawatan Gedung Perkantoran"
              category="Gedung Komersial"
              location="Pusat Kota Surabaya"
              href="/portfolio/gedung-perkantoran-surabaya"
              imageUrl="/images/commercial_building_1784551986230.jpg"
            />
          </div>
        </Container>
      </section>

      {/* SECTION 9: Why Clients Choose */}
      <section className="py-24 bg-white overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-manrope font-bold text-[#0E1B26] mb-6 leading-tight">
                Mengapa memilih TEGAKARA?
              </h2>
              <div className="space-y-8 mt-12">
                {[
                  {
                    title: "Ruang Lingkup Jelas, Bukan Janji Umum",
                    desc: "Ruang lingkup, spesifikasi, jadwal, dan prosedur perubahan dicatat sejak awal. Setiap perubahan dibahas dan disetujui sebelum dikerjakan."
                  },
                  {
                    title: "Pekerjaan Penting Diperiksa Sebelum Ditutup",
                    desc: "Quality Hold Point digunakan untuk memeriksa tahapan penting sebelum pekerjaan berikutnya dilanjutkan, sehingga risiko kesalahan tersembunyi dapat dikurangi."
                  },
                  {
                    title: "Progres Dibuktikan, Bukan Sekadar Dilaporkan",
                    desc: "Laporan progres dan status tahap pekerjaan dilengkapi foto, catatan lapangan, serta hasil pemeriksaan yang relevan."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 bg-bronze/10 p-2 rounded-full h-fit">
                      <CheckSquare className="w-5 h-5 text-bronze" />
                    </div>
                    <div>
                      <h3 className="text-xl font-manrope font-bold text-[#0E1B26] mb-2">{item.title}</h3>
                      <p className="text-[#68757D] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-full bg-[#1C2D38] flex items-center justify-center p-12 relative z-10">
                <div className="text-center">
                  <div className="w-20 h-20 bg-bronze rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Garansi Sesuai Lingkup Pekerjaan</h3>
                  <p className="text-slate-300">Cakupan dan masa garansi dijelaskan dalam kontrak.</p>
                  <p className="text-sm text-slate-400 mt-6 border-t border-slate-700 pt-6">
                    Laporan kendala dapat dicatat dan dipantau melalui tiket garansi digital.
                  </p>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square rounded-full border border-slate-200 -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square rounded-full border border-slate-100 -z-10"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 10: Qualification CTA */}
      <section className="py-24 bg-[#0E1B26] relative overflow-hidden">
        {/* Abstract pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B88A4A 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center border border-[#1C2D38] bg-[#0E1B26]/50 p-12 rounded-2xl backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl font-manrope font-bold text-white mb-6">
              Ceritakan kebutuhan proyek Anda.
            </h2>
            <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Kami meninjau jenis pekerjaan, lokasi, anggaran, jadwal, skema pembayaran, dan kapasitas tim sebelum menerima proyek.
            </p>
            <Button size="lg" className="bg-bronze hover:bg-bronze/90 text-[#0E1B26] font-bold px-8 h-14 text-lg">
              <Link href="/assessment">Mulai Penilaian Proyek</Link>
            </Button>
            <p className="text-slate-400 text-sm mt-6">
              Formulir singkat ini membantu kami memahami kebutuhan awal proyek Anda dan tidak mengikat.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 11: FAQ */}
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-manrope font-bold text-[#0E1B26] mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-[#68757D] text-lg">
              Jawaban singkat atas pertanyaan yang paling sering diajukan calon klien.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <FaqAccordion faqs={generalFaqs} />
            
            <div className="mt-12 text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-[#0E1B26] mb-4 font-medium">Masih memiliki pertanyaan tentang proyek Anda?</p>
              <Button variant="secondary" className="border-[#0E1B26] text-[#0E1B26] hover:bg-[#0E1B26] hover:text-white">
                <Link href="/kontak">Hubungi Tim TEGAKARA</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
