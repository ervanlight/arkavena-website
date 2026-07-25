import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { FaqAccordion } from '@/components/home/faq-accordion';
import { ProjectViewPreview } from '@/components/home/projectview-preview';
import { 
  ShieldAlert, 
  AlertTriangle, 
  EyeOff, 
  MessageSquareOff, 
  Target, 
  FileSignature, 
  Activity, 
  CheckSquare, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Map,
  PenTool,
  Handshake,
  Hammer,
  BarChart3,
  Key
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ARKAVENA — Project Control Partner',
  description: 'Membangun, merenovasi, dan merawat fasilitas properti dengan sistem kerja terukur, transparan, dan terdokumentasi.',
};

export default function HomePage() {
  const testimonials = [
    {
      quote: "Dengan ARKAVENA, kami merasa sangat tenang karena setiap perubahan spesifikasi dan biaya selalu dibahas dan disetujui terlebih dahulu secara tertulis.",
      initial: "Bpk. Hendra S.",
      name: "Pemilik Rumah Tinggal",
      role: "Surabaya Barat"
    },
    {
      quote: "Pemeliharaan fasilitas sekolah kami menjadiauh lebih terencana. Laporan rutin dan dokumentasi pekerjaan sangat membantu manajemen Yayasan.",
      initial: "Ibu Maria L.",
      name: "Pengurus Yayasan Pendidikan",
      role: "Sidoarjo"
    },
    {
      quote: "ProjectView sangat membantu tim operasional kami memantau perbaikan gedung tanpa harus turun langsung ke lapangan setiap hari.",
      initial: "Bpk. Bambang T.",
      name: "Operational Manager Gedung",
      role: "Surabaya Pusat"
    }
  ];

  const faqs = [
    {
      question: "Apa perbedaan ARKAVENA dengan kontraktor konvensional?",
      answer: "ARKAVENA bekerja sebagai Project Control Partner. Kami tidak hanya mengeksekusi pekerjaan fisik, tetapi mengelola ruang lingkup, biaya, perubahan, dan mutu pekerjaan dengan sistem yang transparan dan terdokumentasi."
    },
    {
      question: "Bagaimana ARKAVENA mencegah pembengkakan biaya (cost overrun)?",
      answer: "Kami menggunakan mekanisme ScopeLock di mana seluruh spesifikasi dan gambar kerja disepakati di awal. Jika ada perubahan di lapangan, perubahan tersebut harus disetujui secara tertulis melalui Change Order sebelum dikerjakan."
    },
    {
      question: "Apakah saya bisa memantau perkembangan proyek jika berada di luar kota?",
      answer: "Bisa. Seluruh laporan progres, foto hasil pekerjaan, dan status keputusan dapat diakses secara digital melalui platform ProjectView kami."
    },
    {
      question: "Layanan apa saja yang disediakan oleh ARKAVENA?",
      answer: "Kami melayani 2 divisi utama: Residential (Bangun Rumah Baru, Renovasi Besar, Tambah Lantai) dan Facility Care (Maintenance Sekolah, Maintenance Gedung, Waterproofing/Atap, dan Minor Works Industri)."
    }
  ];

  return (
    <>
      {/* 1. HERO */}
      <section className="relative bg-[#14171B] pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#14171B] before:via-[#14171B]/80 before:to-transparent before:z-10">
          <Image 
            src="/images/hero_home_v10.jpg" 
            alt="ARKAVENA Project Control & Construction Architectural View" 
            fill 
            className="object-cover object-right lg:object-center"
            priority
            unoptimized
          />
        </div>
        
        <Container className="relative z-20">
          <div className="max-w-2xl">
            <FadeIn>
              <div>
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#E2A63C] mb-6">
                  Construction • Renovation • Facility Care
                </span>
                <h1 className="text-xl md:text-2xl lg:text-[2.75rem] font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.15] tracking-tight mb-5">
                  Bangunan Bukan Investasi Terbesar Anda.
                  <br /><span className="text-[#DCD6CD]">Yang Lebih Berharga Adalah Kendali Atas Proses Membangunnya.</span>
                </h1>
                <div className="text-base text-white/60 leading-relaxed font-inter space-y-4 mb-8">
                  <p>Membangun, merenovasi, atau merawat properti bukan hanya tentang pekerjaan konstruksi.</p>
                  <p>Yang menentukan keberhasilan sebuah proyek adalah bagaimana setiap keputusan, perubahan, biaya, kualitas, dan progres dikelola sejak hari pertama.</p>
                  <p>Di ARKAVENA, kami membantu pemilik properti menjaga seluruh proses tetap transparan, terdokumentasi, dan berada dalam kendali hingga proyek selesai.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/assessment">
                    <Button size="lg" className="w-full sm:w-auto bg-[#E2A63C] text-[#14171B] hover:bg-[#c9922f]">
                      Diskusikan Proyek Anda
                    </Button>
                  </Link>
                  <Link href="/#cara-kerja">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto border-white/30 text-white bg-transparent hover:bg-white/10">
                      Lihat Cara Kami Bekerja
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-[#14171B] border-b border-white/10 py-6">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl md:text-3xl font-bold text-[#E2A63C]">100%</div>
              <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">ScopeLock & Transparansi</div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl md:text-3xl font-bold text-[#E2A63C]">Overrun 0%</div>
              <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">Pengendalian Biaya</div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl md:text-3xl font-bold text-[#E2A63C]">Real-time</div>
              <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">Laporan ProjectView</div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl md:text-3xl font-bold text-[#E2A63C]">Surabaya+</div>
              <div className="text-xs text-white/60 font-[family-name:var(--font-inter)] uppercase tracking-wider mt-1">Sidoarjo & Gresik</div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. PROBLEM */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-8">
                Mengapa Banyak Proyek Menjadi Lebih Sulit Dari Yang Seharusnya?
              </h2>
              <div className="text-lg text-[#DCD6CD] leading-relaxed space-y-6">
                <p>Sebagian besar proyek tidak bermasalah karena kurangnya tenaga kerja.</p>
                <p>Masalah justru muncul ketika proses berjalan tanpa sistem yang jelas.</p>
                <p>Tanpa dokumentasi, komunikasi yang baik, dan pengendalian yang konsisten, proyek yang seharusnya sederhana dapat berubah menjadi sumber stres, pembengkakan biaya, dan keterlambatan.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {[
                { title: "Biaya Sulit Dikendalikan", desc: "Perubahan pekerjaan yang tidak tercatat sering menyebabkan anggaran berkembang tanpa disadari.", icon: AlertTriangle },
                { title: "Progress Tidak Transparan", desc: "Pemilik proyek sering tidak mengetahui pekerjaan apa yang sudah selesai dan apa yang sedang berjalan.", icon: EyeOff },
                { title: "Komunikasi Terputus", desc: "Keputusan penting sering hanya disampaikan secara lisan sehingga mudah terjadi salah persepsi.", icon: MessageSquareOff },
                { title: "Kualitas Tidak Konsisten", desc: "Tanpa sistem pemeriksaan yang jelas, kualitas pekerjaan bergantung pada kebiasaan masing-masing pelaksana.", icon: ShieldAlert }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#14171B] p-8 lg:p-10 hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-[#3F4954]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-[#3F4954] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 4. INSIGHT */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-12">
                Setiap Proyek Akan Menghadapi Tantangan.
                <br /><span className="text-[#3F4954]">Yang Membedakan Adalah Cara Mengelolanya.</span>
              </h2>
              <div className="text-lg text-[#3F4954] leading-relaxed space-y-6 max-w-3xl mx-auto">
                <p>Tidak ada proyek yang berjalan persis sesuai rencana.</p>
                <p>Perubahan kebutuhan, penyesuaian pekerjaan, maupun kendala di lapangan adalah bagian yang wajar dalam proses pembangunan.</p>
                <p>Yang membedakan proyek yang berjalan baik bukanlah sedikitnya masalah, tetapi adanya sistem yang memastikan setiap perubahan terdokumentasi, setiap keputusan memiliki dasar, dan setiap progres tetap berada dalam kendali.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 5. CASE STUDY ⭐ */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16 mb-16">
              <div className="lg:col-span-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                  Bukti Terbaik Bukan Klaim.
                  <br /><span className="text-[#3F4954]">Tetapi Proyek Yang Dapat Dipertanggungjawabkan.</span>
                </h2>
              </div>
              <div className="lg:col-span-6">
                <div className="text-lg text-[#3F4954] leading-relaxed space-y-6 mb-8">
                  <p>Setiap proyek memiliki tantangan yang berbeda.</p>
                  <p>Karena itu kami tidak hanya menampilkan hasil akhirnya, tetapi juga bagaimana proses pengambilan keputusan dilakukan hingga proyek selesai.</p>
                </div>
                <Button variant="secondary" className="border-[#C9C3B8] text-[#14171B] hover:bg-[#C9C3B8]/10 bg-transparent">
                  <Link href="/portfolio">Lihat Semua Studi Kasus</Link>
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[#C9C3B8] border border-[#C9C3B8]">
              <div className="bg-[#ECE8E1] hover:bg-[#C9C3B8]/10 transition-colors p-8 sm:p-12 block group cursor-pointer border border-transparent hover:border-[#C9C3B8]">
                <Link href="/portfolio/rumah-tinggal-citraland">
                  <div className="aspect-[4/3] bg-[#C9C3B8]/20 mb-8 relative overflow-hidden rounded-lg">
                    <Image src="/images/hero_residential_v3.jpg" fill alt="Residential" className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1200px) 100vw, 50vw" />
                  </div>
                  <h3 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-4">Rumah Tinggal Citraland</h3>
                  <p className="text-[#3F4954] leading-relaxed mb-6">Pembangunan hunian dengan sistem pelaporan terstruktur yang memudahkan klien memantau dari luar kota.</p>
                  <span className="inline-flex items-center text-sm font-bold text-[#14171B]">
                    Baca Studi Kasus <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
              
              <div className="bg-[#ECE8E1] hover:bg-[#C9C3B8]/10 transition-colors p-8 sm:p-12 block group cursor-pointer border border-transparent hover:border-[#C9C3B8]">
                <Link href="/portfolio/fasilitas-sekolah-sidoarjo">
                  <div className="aspect-[4/3] bg-[#C9C3B8]/20 mb-8 relative overflow-hidden rounded-lg">
                    <Image src="/images/school_facility_v5.jpg" fill alt="Facility Care" className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1200px) 100vw, 50vw" />
                  </div>
                  <h3 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-4">Maintenance Fasilitas Sekolah</h3>
                  <p className="text-[#3F4954] leading-relaxed mb-6">Program pemeliharaan terjadwal untuk memastikan operasional sekolah berjalan tanpa gangguan.</p>
                  <span className="inline-flex items-center text-sm font-bold text-[#14171B]">
                    Baca Studi Kasus <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 6. CARA KAMI MENGELOLA PROYEK */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] bg-structural-grid border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                  Cara Kami Menjaga Proyek Tetap Dalam Kendali
                </h2>
                <div className="text-lg text-[#3F4954] leading-relaxed space-y-6 mb-8">
                  <p>Kami percaya bahwa hasil terbaik lahir dari proses yang dapat dipertanggungjawabkan.</p>
                  <p>Karena itu kami membangun setiap proyek menggunakan sistem kerja yang mengutamakan transparansi, koordinasi, dan dokumentasi.</p>
                </div>
                <Button variant="secondary" className="border-[#C9C3B8] text-[#14171B] hover:bg-[#C9C3B8]/10 bg-transparent">
                  <Link href="/projectview">Pelajari Cara Kami Mengelola Proyek</Link>
                </Button>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-12">
                  {[
                    { title: "Scope yang Jelas", desc: "Seluruh ruang lingkup pekerjaan disepakati sejak awal sehingga semua pihak memahami apa yang akan dikerjakan.", icon: Target },
                    { title: "Dokumentasi Perubahan", desc: "Setiap perubahan dibahas, dicatat, dan disetujui sebelum dilaksanakan.", icon: FileSignature },
                    { title: "Monitoring Berkala", desc: "Klien memperoleh laporan perkembangan proyek secara berkala tanpa harus selalu berada di lokasi.", icon: Activity },
                    { title: "Quality Control", desc: "Setiap tahapan pekerjaan diperiksa sebelum berlanjut ke tahap berikutnya.", icon: CheckSquare },
                    { title: "Komunikasi Terpusat", desc: "Seluruh koordinasi dilakukan melalui jalur komunikasi yang jelas sehingga informasi tidak terpecah.", icon: Share2 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="shrink-0 mt-1">
                        <div className="w-10 h-10 bg-[#1C3A5C]/10 border border-[#1C3A5C]/20 rounded-lg flex items-center justify-center text-[#1C3A5C]">
                          <item.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-3">{item.title}</h4>
                        <p className="text-[#3F4954] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 7. PROJECTVIEW PREVIEW ⭐ */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-4 font-[family-name:var(--font-ibm-plex-mono)]">
                SIMULASI PROJECTVIEW
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-6">
                Transparansi Proyek Dalam Satu Dashboard
              </h2>
              <p className="text-lg text-[#3F4954] leading-relaxed max-w-2xl mx-auto">
                Pantau perkembangan pekerjaan, laporan progres, riwayat keputusan, dan penyesuaian biaya secara real-time dari mana saja.
              </p>
            </div>
            
            <ProjectViewPreview />
          </FadeIn>
        </Container>
      </section>

      {/* 8. CARA KERJA */}
      <section id="cara-kerja" className="py-24 lg:py-32 bg-[#ECE8E1] bg-structural-grid border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                Apa Yang Akan Terjadi Setelah Anda Menghubungi Kami?
              </h2>
              <p className="text-lg text-[#3F4954] leading-relaxed">
                Kami menggunakan proses yang jelas agar setiap tahap proyek dapat dipahami sejak awal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12 mb-16">
              {[
                { title: "Diskusi Awal", desc: "Kami memahami kebutuhan, tujuan, dan kondisi proyek Anda.", icon: MessageCircle },
                { title: "Survey Lokasi", desc: "Tim melakukan peninjauan untuk memperoleh gambaran teknis secara langsung.", icon: Map },
                { title: "Perencanaan", desc: "Kami menyusun ruang lingkup pekerjaan, estimasi biaya, dan pendekatan pelaksanaan.", icon: PenTool },
                { title: "Kesepakatan", desc: "Seluruh pekerjaan disepakati sebelum proyek dimulai.", icon: Handshake },
                { title: "Pelaksanaan", desc: "Tim menjalankan pekerjaan sesuai rencana yang telah disetujui.", icon: Hammer },
                { title: "Monitoring", desc: "Kami memberikan laporan perkembangan proyek secara berkala.", icon: BarChart3 },
                { title: "Serah Terima", desc: "Kami memastikan pekerjaan selesai sesuai standar yang telah ditetapkan.", icon: Key }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-4 mb-4 border-b border-[#C9C3B8] pb-4">
                    <div className="w-8 h-8 rounded bg-[#C9C3B8]/20 flex items-center justify-center text-[#3F4954] shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-[#3F4954] font-[family-name:var(--font-ibm-plex-mono)]">STEP 0{idx + 1}</div>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] text-xl mb-3">{item.title}</h3>
                  <p className="text-[#3F4954] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-[#E2A63C] text-[#14171B] hover:bg-[#c9922f]">
              <Link href="/assessment">Diskusikan Proyek Anda</Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* 9. TESTIMONI */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-8">
                Kepercayaan Dibangun Dari Pengalaman Nyata.
              </h2>
              <div className="text-lg text-[#DCD6CD] leading-relaxed space-y-6">
                <p>Kami percaya bahwa kepuasan klien tidak hanya diukur dari bangunan yang selesai.</p>
                <p>Tetapi juga dari pengalaman selama proses pengerjaan berlangsung.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testi, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col">
                  <p className="text-white/70 leading-relaxed mb-8 flex-grow">"{testi.quote}"</p>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[#3F4954] text-sm mb-4 italic">{testi.initial}</p>
                    <p className="font-bold text-white">{testi.name}</p>
                    <p className="text-[#3F4954] text-sm">{testi.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-16 tracking-tight">
              Pertanyaan Yang Sering Ditanyakan
            </h2>
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      {/* 11. CTA */}
      <section className="py-24 lg:py-32 bg-[#1C3A5C]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-8 tracking-tight leading-tight">
              Setiap Proyek Dimulai Dari Keputusan Yang Tepat.
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Jika Anda sedang merencanakan pembangunan, renovasi, atau pengelolaan fasilitas, mari mulai dengan sebuah percakapan.
              <br /><br />
              Kami akan membantu Anda memahami langkah yang perlu dipersiapkan agar proyek berjalan lebih terarah, transparan, dan terkendali.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto bg-[#E2A63C] text-[#14171B] hover:bg-[#c9922f]">
                <Link href="/assessment">Jadwalkan Diskusi Proyek</Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto border-white/30 text-white bg-transparent hover:bg-white/10">
                <Link href="https://wa.me/6281112345678" target="_blank" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Hubungi Kami via WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
