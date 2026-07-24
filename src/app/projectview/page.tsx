import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { ProjectViewPreview } from '@/components/home/projectview-preview';
import { 
  ArrowRight, CheckCircle2,
  CalendarDays, Image as ImageIcon, GitMerge, FileText, Settings2, FileSignature 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ProjectView — TEGAKARA',
  description: 'Tetap mengetahui perkembangan proyek tanpa harus selalu berada di lokasi. ProjectView adalah bukti transparansi kami.',
};

export default function ProjectViewPage() {
  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-[#ECE8E1] pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#5B6570] mb-8">
                Project Transparency System
              </span>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.05] tracking-tight mb-8">
                Tetap Mengetahui Perkembangan Proyek,
                <br /><span className="text-[#5B6570]">Tanpa Harus Selalu Berada di Lokasi.</span>
              </h1>
              <div className="text-lg text-[#5B6570] leading-relaxed font-inter max-w-3xl mb-8 space-y-6">
                <p>Kami percaya bahwa pemilik proyek tidak seharusnya menunggu laporan untuk mengetahui apa yang sedang terjadi.</p>
                <p>Melalui sistem ProjectView, setiap perkembangan proyek didokumentasikan secara terstruktur sehingga Anda mengetahui progres, keputusan, perubahan, dan kondisi lapangan dengan lebih jelas.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  <Link href="#preview">Lihat Contoh Laporan</Link>
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/assessment">Diskusikan Proyek Anda</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* PREVIEW SECTION */}
      <section id="preview" className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] tracking-tight">
                Simulasi ProjectView
              </h2>
            </div>
            <ProjectViewPreview />
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: APA YANG BISA ANDA PANTAU */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.1] tracking-tight">
                Apa Yang Bisa Anda Pantau
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ECE8E1]/10 border border-white/10">
              {[
                { title: "Progress Mingguan", desc: "Persentase penyelesaian pekerjaan.", icon: CalendarDays },
                { title: "Dokumentasi Lapangan", desc: "Foto kondisi terbaru.", icon: ImageIcon },
                { title: "Timeline", desc: "Tahapan yang sudah selesai. Tahapan berikutnya.", icon: GitMerge },
                { title: "Catatan Lapangan", desc: "Informasi penting dari tim proyek.", icon: FileText },
                { title: "Perubahan Pekerjaan", desc: "Semua perubahan tercatat secara jelas.", icon: Settings2 },
                { title: "Approval", desc: "Riwayat keputusan yang telah disetujui.", icon: FileSignature }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#14171B] p-8 lg:p-10 hover:bg-[#14171B] transition-colors">
                  <div className="w-12 h-12 bg-[#14171B] border border-white/10 rounded-xl flex items-center justify-center mb-8 text-[#5B6570]">
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

      {/* SECTION 03: MENGAPA TRANSPARANSI ITU PENTING? */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-12">
                Mengapa Transparansi Itu Penting?
              </h2>
              <div className="text-lg text-[#5B6570] leading-relaxed space-y-6 mb-16">
                <p>Semakin besar nilai investasi sebuah proyek, semakin penting pemilik proyek mengetahui apa yang sedang terjadi.</p>
                <p>Kami percaya bahwa kepercayaan dibangun melalui visibilitas, bukan asumsi.</p>
              </div>
              <Button size="lg">
                <Link href="/assessment">Jadwalkan Demo ProjectView</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
