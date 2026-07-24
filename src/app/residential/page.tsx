import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { FaqAccordion } from '@/components/home/faq-accordion';
import { 
  ArrowRight, CheckCircle2,
  TrendingUp, EyeOff, MessageSquareOff, ShieldAlert,
  Target, Calculator, Activity, CheckSquare, Key,
  Home, Wrench, Layers, PenTool, MessageCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Layanan Residential — ARKAVENA',
  description: 'Kami tidak hanya membangun rumah. Kami mengelola seluruh perjalanannya agar proyek tetap dalam kendali.',
};

export default function ResidentialPage() {
  const faqs = [
    {
      question: "Berapa lama proses pembangunan rumah?",
      answer: "Durasi proyek bergantung pada luas bangunan, tingkat kompleksitas, serta ruang lingkup pekerjaan. Jadwal akan dijelaskan sebelum proyek dimulai."
    },
    {
      question: "Apakah saya harus memiliki desain terlebih dahulu?",
      answer: "Tidak. Kami dapat membantu mengevaluasi kebutuhan Anda terlebih dahulu sebelum menentukan langkah berikutnya."
    },
    {
      question: "Apakah saya harus sering datang ke lokasi?",
      answer: "Tidak selalu. Kami menyediakan sistem pelaporan berkala agar Anda tetap mengetahui perkembangan proyek."
    },
    {
      question: "Bagaimana jika terjadi perubahan selama pembangunan?",
      answer: "Perubahan akan dibahas terlebih dahulu, didokumentasikan, dan disetujui sebelum dilaksanakan."
    }
  ];

  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-[#ECE8E1] pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-8">
                Residential Construction
              </span>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.05] tracking-tight mb-8">
                Rumah Yang Baik Tidak Hanya Dibangun Dengan Material Berkualitas.
                <br /><span className="text-[#3F4954]">Tetapi Dengan Proses Yang Dikelola Dengan Benar.</span>
              </h1>
              <p className="text-lg text-[#3F4954] leading-relaxed font-inter max-w-2xl mb-8">
                Membangun rumah adalah salah satu keputusan finansial terbesar dalam hidup. Karena itu, kami percaya prosesnya harus sama baiknya dengan hasil akhirnya.
                <br /><br />
                ARKAVENA membantu Anda mengelola pembangunan maupun renovasi rumah melalui sistem kerja yang transparan, terstruktur, dan terdokumentasi sehingga Anda dapat mengambil keputusan dengan lebih tenang.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  <Link href="/assessment">Diskusikan Rencana Rumah Anda</Link>
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Link href="#cara-kerja">Lihat Cara Kami Bekerja</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: THE PROBLEM */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-8">
                MEMBANGUN RUMAH SEHARUSNYA TIDAK MENJADI SUMBER STRES
              </h2>
              <div className="text-lg text-[#DCD6CD] leading-relaxed space-y-6">
                <p>Banyak pemilik rumah memulai proyek dengan penuh semangat.</p>
                <p>Namun di tengah perjalanan mereka mulai menghadapi perubahan biaya, komunikasi yang tidak jelas, keterlambatan pekerjaan, hingga kualitas yang tidak sesuai harapan.</p>
                <p>Sebagian besar masalah tersebut bukan terjadi karena niat yang buruk. Melainkan karena proyek tidak memiliki sistem pengendalian yang jelas.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[#ECE8E1]/10 border border-white/10">
              {[
                {
                  title: "Budget Terus Bertambah",
                  desc: "Perubahan kecil yang tidak terdokumentasi sering berkembang menjadi biaya tambahan yang tidak direncanakan.",
                  icon: TrendingUp
                },
                {
                  title: "Sulit Memantau Progres",
                  desc: "Tidak semua pemilik rumah memiliki waktu untuk datang ke lokasi setiap hari.",
                  icon: EyeOff
                },
                {
                  title: "Komunikasi Tidak Terarah",
                  desc: "Informasi sering berpindah melalui banyak orang sehingga mudah terjadi salah persepsi.",
                  icon: MessageSquareOff
                },
                {
                  title: "Hasil Tidak Sesuai Harapan",
                  desc: "Tanpa standar pemeriksaan yang jelas, kualitas akhir sering bergantung pada masing-masing pekerja.",
                  icon: ShieldAlert
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#14171B] p-8 lg:p-10 hover:bg-[#14171B] transition-colors">
                  <div className="w-12 h-12 bg-[#14171B] border border-white/10 rounded-xl flex items-center justify-center mb-8 text-[#3F4954]">
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

      {/* SECTION 03: CARA KAMI MEMBANGUN RUMAH */}
      <section id="cara-kerja" className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-6">
                  CARA KAMI MEMBANGUN RUMAH
                </h2>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                  Kami Tidak Hanya Membangun Rumah.
                  <br /><span className="text-[#3F4954]">Kami Mengelola Seluruh Perjalanannya.</span>
                </h3>
                <div className="text-lg text-[#3F4954] leading-relaxed space-y-6">
                  <p>Setiap proyek rumah memiliki kebutuhan yang berbeda.</p>
                  <p>Namun seluruhnya mengikuti prinsip yang sama: setiap keputusan harus jelas, setiap perubahan harus terdokumentasi, dan setiap progres harus dapat dipantau.</p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-12">
                  {[
                    {
                      title: "Perencanaan Yang Matang",
                      desc: "Kami membantu memastikan ruang lingkup pekerjaan dipahami sejak awal sehingga mengurangi perubahan yang tidak diperlukan.",
                      icon: Target
                    },
                    {
                      title: "Estimasi Yang Transparan",
                      desc: "Setiap pekerjaan dijelaskan secara terbuka sehingga Anda memahami bagaimana anggaran digunakan.",
                      icon: Calculator
                    },
                    {
                      title: "Pelaksanaan Yang Terarah",
                      desc: "Tim bekerja mengikuti tahapan yang telah direncanakan agar kualitas tetap terjaga.",
                      icon: CheckSquare
                    },
                    {
                      title: "Monitoring Berkala",
                      desc: "Anda memperoleh laporan perkembangan proyek tanpa harus selalu berada di lokasi.",
                      icon: Activity
                    },
                    {
                      title: "Serah Terima Yang Jelas",
                      desc: "Kami melakukan pemeriksaan bersama sebelum proyek dinyatakan selesai.",
                      icon: Key
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="shrink-0 mt-1">
                        <div className="w-10 h-10 bg-[#C9C3B8]/20 border border-[#C9C3B8] rounded-lg flex items-center justify-center text-[#3F4954]">
                          <item.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-3">{item.title}</h4>
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

      {/* SECTION 04: LAYANAN RESIDENTIAL */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-6">
                LAYANAN RESIDENTIAL
              </h2>
              <p className="text-lg text-[#3F4954] leading-relaxed">
                Kami membantu berbagai kebutuhan pembangunan dan pengembangan rumah sesuai kondisi masing-masing keluarga.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[#C9C3B8] border border-[#C9C3B8] mb-16">
              {[
                { title: "Bangun Rumah Baru", desc: "Pendampingan pembangunan rumah dari tahap persiapan hingga serah terima.", icon: Home },
                { title: "Renovasi Rumah", desc: "Mengembangkan rumah yang sudah ada agar lebih nyaman, fungsional, dan sesuai kebutuhan baru.", icon: Wrench },
                { title: "Tambah Lantai", desc: "Perencanaan dan pelaksanaan penambahan ruang dengan memperhatikan struktur bangunan yang sudah ada.", icon: Layers },
                { title: "Interior Fit-Out", desc: "Penyelesaian interior untuk meningkatkan fungsi maupun kenyamanan ruang.", icon: PenTool }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#ECE8E1] p-8 lg:p-10 hover:bg-[#ECE8E1] transition-colors">
                  <div className="w-12 h-12 bg-[#C9C3B8]/20 rounded-xl flex items-center justify-center mb-6 text-[#14171B]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-4">{item.title}</h3>
                  <p className="text-[#3F4954] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <Button size="lg">
              <Link href="/assessment">Diskusikan Kebutuhan Rumah Anda</Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 05: KENAPA BANYAK PEMILIK RUMAH MEMILIH PENDEKATAN INI */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <h2 className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.2] tracking-tight mb-16 max-w-2xl">
              KENAPA BANYAK PEMILIK RUMAH MEMILIH PENDEKATAN INI
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
              {[
                "Anda mengetahui perkembangan proyek secara berkala.",
                "Perubahan pekerjaan memiliki dokumentasi.",
                "Komunikasi berjalan melalui sistem yang jelas.",
                "Proses lebih mudah dipahami meskipun Anda tidak memiliki latar belakang teknik.",
                "Keputusan dapat diambil berdasarkan informasi yang lengkap."
              ].map((point, idx) => (
                <div key={idx} className="border-t border-[#C9C3B8] pt-6">
                  <p className="text-[#14171B] font-medium text-lg leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 06: STUDI KASUS */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-6">STUDI KASUS</h2>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                  Setiap Rumah Memiliki Ceritanya Sendiri.
                </h3>
                <div className="text-lg text-[#3F4954] leading-relaxed space-y-6 mb-8">
                  <p>Kami percaya pengalaman membangun rumah tidak hanya dinilai dari hasil akhirnya. Tetapi juga dari bagaimana proses tersebut dijalankan.</p>
                </div>
                <Button variant="secondary">
                  <Link href="/portfolio">Lihat Semua Proyek Residential</Link>
                </Button>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-[#ECE8E1] border border-[#C9C3B8] p-8 sm:p-12 text-sm text-[#3F4954] font-mono tracking-wide">
                  <p className="mb-4 text-[#14171B] font-bold">CASE_STUDY_TEMPLATE</p>
                  <p className="mb-4">Nama Proyek</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Kondisi Awal</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Kebutuhan Pemilik</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Pendekatan</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Dokumentasi Progress</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Hasil Akhir</p>
                  <p className="mb-4">↓</p>
                  <p>Testimoni Pemilik</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 07: PROSES KERJA */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-16 tracking-tight">
              PROSES KERJA
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
              {[
                { step: "01", title: "Diskusi Awal", desc: "Kami memahami kebutuhan keluarga serta tujuan pembangunan." },
                { step: "02", title: "Survey Lokasi", desc: "Tim melakukan pemeriksaan kondisi lahan atau bangunan." },
                { step: "03", title: "Perencanaan", desc: "Penyusunan ruang lingkup, estimasi, dan jadwal pelaksanaan." },
                { step: "04", title: "Kesepakatan", desc: "Seluruh pekerjaan disetujui sebelum dimulai." },
                { step: "05", title: "Pelaksanaan", desc: "Pengerjaan dilakukan sesuai tahapan yang telah direncanakan." },
                { step: "06", title: "Monitoring", desc: "Laporan perkembangan proyek diberikan secara berkala." },
                { step: "07", title: "Serah Terima", desc: "Pemeriksaan bersama untuk memastikan hasil sesuai kesepakatan." }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="text-xs font-bold text-[#3F4954] mb-4 font-mono">STEP {item.step}</div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-[#3F4954] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 08: FAQ */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-16 tracking-tight">
              FAQ
            </h2>
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      {/* SECTION 09: FINAL CTA */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-8 tracking-tight leading-tight">
              Rumah Yang Nyaman Dimulai Dari Proses Yang Tepat.
            </h2>
            <p className="text-lg text-[#3F4954] mb-8 leading-relaxed">
              Mari mulai dengan sebuah diskusi. Kami akan membantu Anda memahami langkah terbaik sebelum pembangunan dimulai sehingga setiap keputusan dapat diambil dengan lebih percaya diri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto">
                <Link href="/assessment">Diskusikan Rencana Rumah Anda</Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
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
