import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { FaqAccordion } from '@/components/home/faq-accordion';
import { ProjectViewPreview } from '@/components/home/projectview-preview';
import { 
  MessageCircle, ArrowRight, CheckCircle2, 
  AlertTriangle, EyeOff, MessageSquareOff, ShieldAlert,
  Target, FileSignature, Activity, CheckSquare, Share2,
  Map, PenTool, Handshake, Hammer, BarChart3, Key
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'TEGAKARA — Project Control Partner',
  description: 'Kami membantu pemilik properti menjaga seluruh proses tetap transparan, terdokumentasi, dan berada dalam kendali hingga proyek selesai.',
};

export default function HomePage() {
  const faqs = [
    {
      question: "Apakah saya harus memiliki gambar kerja sebelum menghubungi TEGAKARA?",
      answer: "Tidak. Kami dapat membantu mengevaluasi kondisi proyek Anda terlebih dahulu dan memberikan arahan mengenai langkah yang perlu dipersiapkan."
    },
    {
      question: "Bagaimana saya memantau progres proyek?",
      answer: "Kami memberikan laporan perkembangan proyek secara berkala yang dilengkapi dokumentasi visual sehingga Anda mengetahui kondisi terbaru tanpa harus selalu berada di lokasi."
    },
    {
      question: "Bagaimana jika terjadi perubahan pekerjaan?",
      answer: "Setiap perubahan dibahas terlebih dahulu, didokumentasikan, dan hanya dilaksanakan setelah memperoleh persetujuan."
    },
    {
      question: "Apakah TEGAKARA melayani renovasi maupun pembangunan baru?",
      answer: "Ya. Kami membantu pembangunan baru, renovasi, serta layanan facility care sesuai kebutuhan proyek."
    },
    {
      question: "Bagaimana proses konsultasi awal?",
      answer: "Diskusi awal bertujuan memahami kebutuhan proyek Anda dan menentukan pendekatan terbaik sebelum pekerjaan dimulai."
    }
  ];

  const testimonials = [
    {
      quote: "Saya tidak pernah merasa kehilangan kendali atas proyek. Setiap minggu selalu ada laporan progres yang jelas beserta dokumentasi foto. Keputusan yang diambil selalu didiskusikan terlebih dahulu.",
      name: "Bpk. Hendra S.",
      role: "Pemilik Rumah, Citraland",
      initial: "Kondisi Awal: Khawatir budget membengkak karena sering dengar cerita miring tentang kontraktor."
    },
    {
      quote: "Laporan harian dan dokumentasi mereka sangat membantu kami dalam audit internal. Sistem yang rapi membuat kami yakin bangunan fasilitas industri kami terawat dengan standar tinggi.",
      name: "Ibu Rina M.",
      role: "Facility Manager, Pabrik Sidoarjo",
      initial: "Kondisi Awal: Kesulitan memantau jadwal perbaikan dan riwayat pemeliharaan di berbagai area pabrik."
    },
    {
      quote: "Transparansi adalah kunci. Dari awal sampai serah terima, semua jelas. Tidak ada biaya tersembunyi, dan perubahan selalu melalui proses approval tertulis. Sangat profesional.",
      name: "Bpk. Aditya P.",
      role: "Pemilik Ruko Komersial, Surabaya Barat",
      initial: "Kondisi Awal: Punya pengalaman buruk dengan kontraktor sebelumnya yang menghilang di tengah jalan."
    }
  ];

  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="relative bg-[#14171B] pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#14171B] before:via-[#14171B]/80 before:to-transparent before:z-10">
          <Image 
            src="/images/hero_home_1784553150926.jpg" 
            alt="TEGAKARA Project Manager and Client Site Supervision" 
            fill 
            className="object-cover object-center"
            priority
           sizes="(max-width: 1200px) 100vw, 50vw" />
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
                  <br /><span className="text-white/50">Yang Lebih Berharga Adalah Kendali Atas Proses Membangunnya.</span>
                </h1>
                <div className="text-base text-white/60 leading-relaxed font-inter space-y-4 mb-8">
                  <p>Membangun, merenovasi, atau merawat properti bukan hanya tentang pekerjaan konstruksi.</p>
                  <p>Yang menentukan keberhasilan sebuah proyek adalah bagaimana setiap keputusan, perubahan, biaya, kualitas, dan progres dikelola sejak hari pertama.</p>
                  <p>Di TEGAKARA, kami membantu pemilik properti menjaga seluruh proses tetap transparan, terdokumentasi, dan berada dalam kendali hingga proyek selesai.</p>
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

      {/* SECTION 02: THE PROBLEM */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-8">
                Mengapa Banyak Proyek Menjadi Lebih Sulit Dari Yang Seharusnya?
              </h2>
              <div className="text-lg text-white/50 leading-relaxed space-y-6">
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
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-[#5B6570]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-[#5B6570] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 03: THE INSIGHT */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-12">
                Proyek Tidak Berhasil Karena Tidak Ada Masalah.
                <br /><span className="text-[#5B6570]">Proyek Berhasil Karena Setiap Masalah Dikendalikan.</span>
              </h2>
              <div className="text-lg text-[#5B6570] leading-relaxed space-y-6">
                <p>Dalam setiap proyek akan selalu ada perubahan, tantangan, dan keputusan yang harus diambil.</p>
                <p>Yang membedakan proyek yang berjalan baik bukanlah tidak adanya masalah.</p>
                <p>Melainkan adanya sistem yang memastikan setiap perubahan terdokumentasi, setiap keputusan memiliki dasar, dan setiap progres dapat dipantau dengan jelas.</p>
                <p className="font-bold text-[#14171B]">Inilah pendekatan yang menjadi dasar cara kerja TEGAKARA.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 04: OUR APPROACH */}
      <section id="cara-kerja" className="py-24 lg:py-32 bg-[#ECE8E1] bg-structural-grid border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                  Cara Kami Menjaga Proyek Tetap Dalam Kendali
                </h2>
                <div className="text-lg text-[#5B6570] leading-relaxed space-y-6 mb-8">
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
                        <p className="text-[#5B6570] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 05: WHY TEGAKARA */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-8">
                  Kami Tidak Menjanjikan Proyek Tanpa Tantangan.
                  <br /><span className="text-white/50">Kami Menjanjikan Proyek Yang Tetap Dalam Kendali.</span>
                </h2>
                <div className="text-lg text-white/50 leading-relaxed space-y-6">
                  <p>Keberhasilan proyek bukan ditentukan oleh janji bahwa semuanya akan berjalan sempurna.</p>
                  <p>Keberhasilan ditentukan oleh bagaimana setiap tantangan direspons secara cepat, transparan, dan terdokumentasi.</p>
                  <p>Itulah komitmen yang kami pegang dalam setiap proyek.</p>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 space-y-6">
                  {[
                    "Setiap perubahan memiliki dokumentasi.",
                    "Setiap progres memiliki laporan.",
                    "Setiap keputusan memiliki dasar.",
                    "Setiap pekerjaan memiliki standar pemeriksaan.",
                    "Setiap klien mengetahui perkembangan proyeknya."
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-[#E2A63C] shrink-0" />
                      <p className="text-white/70 font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 06: PROJECT CASE STUDIES */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16 mb-16">
              <div className="lg:col-span-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                  Bukti Terbaik Bukan Klaim.
                  <br /><span className="text-[#5B6570]">Tetapi Proyek Yang Dapat Dipertanggungjawabkan.</span>
                </h2>
              </div>
              <div className="lg:col-span-6">
                <div className="text-lg text-[#5B6570] leading-relaxed space-y-6 mb-8">
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
                    <Image src="/images/hero_residential_1784553175729.jpg" fill alt="Residential" className="object-cover group-hover:scale-105 transition-transform duration-700"  sizes="(max-width: 1200px) 100vw, 50vw" />
                  </div>
                  <h3 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-4">Rumah Tinggal Citraland</h3>
                  <p className="text-[#5B6570] leading-relaxed mb-6">Pembangunan hunian dengan sistem pelaporan terstruktur yang memudahkan klien memantau dari luar kota.</p>
                  <span className="inline-flex items-center text-sm font-bold text-[#14171B]">
                    Baca Studi Kasus <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
              
              <div className="bg-[#ECE8E1] hover:bg-[#C9C3B8]/10 transition-colors p-8 sm:p-12 block group cursor-pointer border border-transparent hover:border-[#C9C3B8]">
                <Link href="/portfolio/fasilitas-sekolah-sidoarjo">
                  <div className="aspect-[4/3] bg-[#C9C3B8]/20 mb-8 relative overflow-hidden rounded-lg">
                    <Image src="/images/school_facility_1784552005374.jpg" fill alt="Facility Care" className="object-cover group-hover:scale-105 transition-transform duration-700"  sizes="(max-width: 1200px) 100vw, 50vw" />
                  </div>
                  <h3 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-4">Maintenance Fasilitas Sekolah</h3>
                  <p className="text-[#5B6570] leading-relaxed mb-6">Program pemeliharaan terjadwal untuk memastikan operasional sekolah berjalan tanpa gangguan.</p>
                  <span className="inline-flex items-center text-sm font-bold text-[#14171B]">
                    Baca Studi Kasus <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 07: OUR PROCESS */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] bg-structural-grid border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                Apa Yang Akan Terjadi Setelah Anda Menghubungi Kami?
              </h2>
              <p className="text-lg text-[#5B6570] leading-relaxed">
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
                    <div className="w-8 h-8 rounded bg-[#C9C3B8]/20 flex items-center justify-center text-[#5B6570] shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-[#5B6570] font-[family-name:var(--font-ibm-plex-mono)]">STEP 0{idx + 1}</div>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] text-xl mb-3">{item.title}</h3>
                  <p className="text-[#5B6570] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-[#E2A63C] text-[#14171B] hover:bg-[#c9922f]">
              <Link href="/kontak">Mulai Dengan Diskusi Awal</Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 08: TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-8">
                Kepercayaan Dibangun Dari Pengalaman Nyata.
              </h2>
              <div className="text-lg text-white/50 leading-relaxed space-y-6">
                <p>Kami percaya bahwa kepuasan klien tidak hanya diukur dari bangunan yang selesai.</p>
                <p>Tetapi juga dari pengalaman selama proses pengerjaan berlangsung.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testi, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col">
                  <p className="text-white/70 leading-relaxed mb-8 flex-grow">"{testi.quote}"</p>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[#5B6570] text-sm mb-4 italic">{testi.initial}</p>
                    <p className="font-bold text-white">{testi.name}</p>
                    <p className="text-[#5B6570] text-sm">{testi.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 09: FAQ */}
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

      {/* SECTION 10: FINAL CTA */}
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
