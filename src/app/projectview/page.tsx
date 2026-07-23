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
      <section className="bg-white pt-40 pb-40 border-b border-zinc-200">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-8">
                Project Transparency System
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-manrope font-bold text-zinc-900 leading-[1.05] tracking-tight mb-8">
                Tetap Mengetahui Perkembangan Proyek,
                <br /><span className="text-zinc-400">Tanpa Harus Selalu Berada di Lokasi.</span>
              </h1>
              <div className="text-xl text-zinc-600 leading-relaxed font-inter max-w-3xl mb-12 space-y-6">
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
      <section id="preview" className="py-40 bg-zinc-50 border-b border-zinc-200">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-3xl font-manrope font-bold text-zinc-900 tracking-tight">
                Simulasi ProjectView
              </h2>
            </div>
            <ProjectViewPreview />
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: APA YANG BISA ANDA PANTAU */}
      <section className="py-40 bg-zinc-950 text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-24">
              <h2 className="text-4xl md:text-5xl font-manrope font-bold text-zinc-50 leading-[1.1] tracking-tight">
                Apa Yang Bisa Anda Pantau
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
              {[
                { title: "Progress Mingguan", desc: "Persentase penyelesaian pekerjaan.", icon: CalendarDays },
                { title: "Dokumentasi Lapangan", desc: "Foto kondisi terbaru.", icon: ImageIcon },
                { title: "Timeline", desc: "Tahapan yang sudah selesai. Tahapan berikutnya.", icon: GitMerge },
                { title: "Catatan Lapangan", desc: "Informasi penting dari tim proyek.", icon: FileText },
                { title: "Perubahan Pekerjaan", desc: "Semua perubahan tercatat secara jelas.", icon: Settings2 },
                { title: "Approval", desc: "Riwayat keputusan yang telah disetujui.", icon: FileSignature }
              ].map((item, idx) => (
                <div key={idx} className="bg-zinc-950 p-12 hover:bg-zinc-900 transition-colors">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-8 text-zinc-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-manrope font-bold text-zinc-100 mb-4">{item.title}</h3>
                  <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 03: MENGAPA TRANSPARANSI ITU PENTING? */}
      <section className="py-40 bg-white border-b border-zinc-200">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-manrope font-bold text-zinc-900 leading-[1.1] tracking-tight mb-12">
                Mengapa Transparansi Itu Penting?
              </h2>
              <div className="text-xl text-zinc-600 leading-relaxed space-y-6 mb-16">
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
