import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { FaqAccordion } from '@/components/home/faq-accordion';
import { 
  ArrowRight,
  Clock, CalendarX, FileMinus, Users, Building,
  Shield, Settings, Search, Hammer, Activity,
  FileSearch, CheckCircle2, ListChecks, FileSignature, BarChart3,
  MessageCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Facility Care — ARKAVENA',
  description: 'Bangunan yang terawat bukan sekadar terlihat lebih baik. Tetapi membantu bisnis tetap berjalan.',
};

export default function FacilityCarePage() {
  const faqs = [
    {
      question: "Apakah Facility Care hanya untuk perusahaan besar?",
      answer: "Tidak. Kami membantu berbagai skala perusahaan maupun pemilik bangunan komersial sesuai kebutuhan."
    },
    {
      question: "Apakah saya bisa menggunakan layanan hanya ketika ada kerusakan?",
      answer: "Bisa. Namun kami lebih menyarankan pendekatan preventif agar biaya perawatan lebih terkendali."
    },
    {
      question: "Apakah tersedia laporan pekerjaan?",
      answer: "Ya. Setiap aktivitas didokumentasikan sehingga riwayat pekerjaan dapat ditelusuri dengan mudah."
    },
    {
      question: "Apakah dapat menangani beberapa lokasi sekaligus?",
      answer: "Ya. Pendekatan kami dirancang agar pengelolaan beberapa lokasi tetap terkoordinasi."
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
                Commercial Building • Industrial Facility • Building Maintenance
              </span>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.05] tracking-tight mb-8">
                Bangunan Yang Terawat Bukan Sekadar Terlihat Lebih Baik.
                <br /><span className="text-[#3F4954]">Tetapi Membantu Bisnis Tetap Berjalan.</span>
              </h1>
              <div className="text-lg text-[#3F4954] leading-relaxed font-inter max-w-3xl mb-8 space-y-6">
                <p>Bangunan yang digunakan setiap hari akan terus mengalami perubahan. Peralatan bekerja. Material menua. Kerusakan kecil mulai muncul.</p>
                <p>Jika tidak dikelola sejak awal, gangguan kecil dapat berkembang menjadi gangguan operasional yang jauh lebih mahal.</p>
                <p>ARKAVENA membantu perusahaan menjaga fasilitas tetap aman, nyaman, dan siap digunakan melalui sistem Facility Care yang terencana dan terdokumentasi.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  <Link href="/assessment">Diskusikan Kebutuhan Facility Anda</Link>
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Link href="#cara-kerja">Pelajari Cara Kerja Kami</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-24 aspect-[21/9] relative rounded-xl overflow-hidden bg-[#C9C3B8]/20 border border-[#C9C3B8]">
              <Image 
                src="/images/commercial_building_v5.jpg"
                alt="Engineer melakukan inspeksi"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
               sizes="(max-width: 1200px) 100vw, 50vw" />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: MASALAH YANG SERING TERJADI */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-8">
                Banyak Gangguan Operasional Berawal Dari Hal-Hal Kecil Yang Diabaikan.
              </h2>
              <div className="text-lg text-[#DCD6CD] leading-relaxed space-y-6">
                <p>Kerusakan besar jarang terjadi secara tiba-tiba.</p>
                <p>Biasanya diawali oleh masalah kecil yang tidak terpantau, tidak terdokumentasi, atau tidak ditindaklanjuti tepat waktu.</p>
                <p>Facility Care yang baik membantu mencegah hal tersebut sebelum berdampak pada operasional bisnis.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ECE8E1]/10 border border-white/10">
              {[
                {
                  title: "Perawatan Bersifat Reaktif",
                  desc: "Perbaikan baru dilakukan ketika kerusakan sudah mengganggu aktivitas.",
                  icon: Clock
                },
                {
                  title: "Tidak Ada Jadwal Berkala",
                  desc: "Pemeriksaan dilakukan hanya ketika ada keluhan.",
                  icon: CalendarX
                },
                {
                  title: "Dokumentasi Tidak Lengkap",
                  desc: "Riwayat pekerjaan sulit ditelusuri sehingga evaluasi menjadi tidak efektif.",
                  icon: FileMinus
                },
                {
                  title: "Vendor Berbeda-Beda",
                  desc: "Koordinasi menjadi lebih sulit karena setiap pekerjaan ditangani pihak yang berbeda.",
                  icon: Users
                },
                {
                  title: "Gangguan Operasional",
                  desc: "Kerusakan kecil berkembang menjadi downtime yang merugikan perusahaan.",
                  icon: Building
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#14171B] p-8 lg:p-10 hover:bg-[#14171B] transition-colors">
                  <div className="w-12 h-12 bg-[#14171B] border border-white/10 rounded-xl flex items-center justify-center mb-8 text-[#3F4954]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[#3F4954] font-bold text-xs tracking-widest uppercase block mb-4">MASALAH</span>
                  <h3 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-[#3F4954] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 03: OUR PHILOSOPHY */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-12">
                Facility Care Bukan Tentang Memperbaiki Kerusakan.
                <br /><span className="text-[#3F4954]">Tetapi Menjaga Agar Kerusakan Tidak Mengganggu Bisnis.</span>
              </h2>
              <div className="text-lg text-[#3F4954] leading-relaxed space-y-6">
                <p>Kami percaya bahwa maintenance terbaik adalah maintenance yang direncanakan.</p>
                <p>Pendekatan kami membantu perusahaan mengurangi gangguan operasional melalui inspeksi rutin, dokumentasi, dan tindakan preventif.</p>
                <p>Dengan demikian, keputusan perawatan menjadi lebih terukur dan biaya lebih mudah dikendalikan.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 04: LAYANAN FACILITY CARE */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-6">LAYANAN FACILITY CARE</h2>
              <p className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.2] tracking-tight">
                Kami membantu pengelolaan berbagai kebutuhan bangunan komersial maupun industri.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9C3B8] border border-[#C9C3B8] mb-16">
              {[
                { title: "Preventive Maintenance", desc: "Perawatan berkala untuk menjaga kondisi bangunan dan fasilitas tetap optimal.", icon: Shield },
                { title: "Corrective Maintenance", desc: "Penanganan kerusakan secara sistematis dengan dokumentasi yang jelas.", icon: Settings },
                { title: "Building Inspection", desc: "Evaluasi kondisi bangunan untuk mengidentifikasi potensi masalah sebelum berkembang menjadi kerusakan yang lebih besar.", icon: Search },
                { title: "Minor Renovation", desc: "Perbaikan maupun pengembangan ruang sesuai kebutuhan operasional.", icon: Hammer },
                { title: "Facility Improvement", desc: "Peningkatan fungsi bangunan agar lebih efisien, aman, dan nyaman digunakan.", icon: Activity }
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
              <Link href="/assessment">Diskusikan Facility Anda</Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 05: BAGAIMANA KAMI BEKERJA */}
      <section id="cara-kerja" className="py-24 lg:py-32 bg-[#14171B] text-white border-b border-white/10">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight mb-6">
                Setiap Aktivitas Memiliki Sistem.
                <br /><span className="text-[#3F4954]">Setiap Sistem Menghasilkan Kepastian.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {[
                { step: "01", title: "Facility Assessment", desc: "Kami memahami kondisi eksisting bangunan.", icon: FileSearch },
                { step: "02", title: "Inspection", desc: "Tim melakukan pemeriksaan menyeluruh terhadap area yang menjadi tanggung jawab.", icon: Search },
                { step: "03", title: "Recommendation", desc: "Kami menyusun prioritas pekerjaan berdasarkan tingkat risiko.", icon: ListChecks },
                { step: "04", title: "Execution", desc: "Pekerjaan dilakukan sesuai jadwal yang telah disepakati.", icon: Hammer },
                { step: "05", title: "Documentation", desc: "Seluruh aktivitas dicatat dalam laporan.", icon: FileSignature },
                { step: "06", title: "Evaluation", desc: "Kami melakukan evaluasi berkala agar fasilitas tetap berada dalam kondisi terbaik.", icon: BarChart3 }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                    <div className="w-8 h-8 rounded bg-[#ECE8E1]/10 flex items-center justify-center text-[#DCD6CD] shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-[#3F4954] font-mono">STEP {item.step}</div>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-[#3F4954] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 06: MENGAPA PENDEKATAN INI BERBEDA */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="col-span-full mb-8">
                <h2 className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] tracking-tight">
                  MENGAPA PENDEKATAN INI BERBEDA
                </h2>
              </div>
              <div className="border-t border-[#C9C3B8] pt-6">
                <p className="text-[#3F4954] mb-2">Kami tidak hanya memperbaiki.</p>
                <p className="text-[#14171B] font-bold text-lg">Kami membantu perusahaan mengelola fasilitas.</p>
              </div>
              <div className="border-t border-[#C9C3B8] pt-6">
                <p className="text-[#3F4954] mb-2">Kami tidak hanya datang ketika ada masalah.</p>
                <p className="text-[#14171B] font-bold text-lg">Kami membantu mencegah masalah.</p>
              </div>
              <div className="border-t border-[#C9C3B8] pt-6">
                <p className="text-[#3F4954] mb-2">Kami tidak hanya mengirim teknisi.</p>
                <p className="text-[#14171B] font-bold text-lg">Kami memberikan sistem dokumentasi.</p>
              </div>
              <div className="border-t border-[#C9C3B8] pt-6">
                <p className="text-[#14171B] font-bold text-lg">Kami membantu perusahaan mengambil keputusan berdasarkan data.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 07: STUDI KASUS */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-6">STUDI KASUS</h2>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                  Setiap Bangunan Memiliki Tantangan Yang Berbeda.
                </h3>
                <div className="text-lg text-[#3F4954] leading-relaxed space-y-6 mb-8">
                  <p>Kami mendokumentasikan bagaimana setiap tantangan diselesaikan sehingga dapat menjadi pembelajaran untuk proyek berikutnya.</p>
                </div>
                <Button variant="secondary">
                  <Link href="/portfolio">Lihat Semua Studi Kasus</Link>
                </Button>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-[#ECE8E1] border border-[#C9C3B8] p-8 sm:p-12 text-sm text-[#3F4954] font-mono tracking-wide">
                  <p className="mb-4 text-[#14171B] font-bold">CASE_STUDY_TEMPLATE</p>
                  <p className="mb-4">Client</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Building Type</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Challenge</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Inspection</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Action</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Result</p>
                  <p className="mb-4">↓</p>
                  <p className="mb-4">Documentation</p>
                  <p className="mb-4">↓</p>
                  <p>Client Feedback</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 08: INDUSTRI YANG KAMI LAYANI */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#3F4954] mb-6">INDUSTRI YANG KAMI LAYANI</h2>
              <p className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.2] tracking-tight">
                Kami membantu berbagai jenis fasilitas.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Office Building', 'Factory', 'Warehouse', 'Retail', 'Hotel', 'School', 'Hospital', 'Commercial Building'].map((industry, i) => (
                <div key={i} className="px-6 py-3 border border-white/10 rounded-full text-white/70 font-medium text-sm">
                  {industry}
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION EXTRAS: COST OF DAMAGE */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-16 tracking-tight">
                Berapa Biaya Kerusakan Yang Tidak Direncanakan?
              </h2>
              
              <div className="flex flex-col items-center max-w-sm mx-auto mb-16">
                <div className="w-full bg-[#ECE8E1] border border-[#C9C3B8] p-4 rounded-lg font-medium text-[#14171B]">Tidak ada inspeksi</div>
                <div className="h-6 w-px bg-[#C9C3B8]"></div>
                <div className="w-full bg-[#ECE8E1] border border-[#C9C3B8] p-4 rounded-lg font-medium text-[#14171B]">Kerusakan kecil</div>
                <div className="h-6 w-px bg-[#C9C3B8]"></div>
                <div className="w-full bg-[#ECE8E1] border border-[#C9C3B8] p-4 rounded-lg font-medium text-[#14171B]">Gangguan operasional</div>
                <div className="h-6 w-px bg-[#C9C3B8]"></div>
                <div className="w-full bg-[#ECE8E1] border border-[#C9C3B8] p-4 rounded-lg font-medium text-[#14171B]">Downtime</div>
                <div className="h-6 w-px bg-[#C9C3B8]"></div>
                <div className="w-full bg-[#ECE8E1] border border-[#C9C3B8] p-4 rounded-lg font-medium text-[#14171B]">Biaya darurat</div>
                <div className="h-6 w-px bg-[#C9C3B8]"></div>
                <div className="w-full bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg font-bold">Kerugian bisnis</div>
              </div>
              
              <p className="text-xl font-bold text-[#14171B]">
                Preventive maintenance hampir selalu lebih murah daripada corrective maintenance.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 09: FAQ */}
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

      {/* SECTION 10: FINAL CTA */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-8 tracking-tight leading-tight">
              Bangunan Yang Terawat Membantu Bisnis Tetap Bergerak.
            </h2>
            <p className="text-lg text-[#3F4954] mb-8 leading-relaxed">
              Mari diskusikan bagaimana sistem Facility Care dapat membantu menjaga operasional bangunan Anda tetap berjalan secara lebih aman, efisien, dan terencana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto">
                <Link href="/assessment">Jadwalkan Facility Assessment</Link>
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
