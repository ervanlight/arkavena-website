import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { projectsData } from '@/content/projects';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portofolio — TEGAKARA',
  description: 'Studi kasus proyek yang pernah kami kerjakan. Bukti terbaik bukan klaim, melainkan proyek yang dapat dipertanggungjawabkan.',
};

export default function PortfolioPage() {
  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-white pt-40 pb-40 border-b border-zinc-200">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-8">
                Project Case Studies
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-manrope font-bold text-zinc-900 leading-[1.05] tracking-tight mb-8">
                Bukti Terbaik Bukan Klaim.
                <br /><span className="text-zinc-400">Melainkan Proyek Yang Terkendali.</span>
              </h1>
              <div className="text-xl text-zinc-600 leading-relaxed font-inter max-w-3xl space-y-6 mb-12">
                <p>Kami tidak hanya menampilkan hasil akhirnya, tetapi juga bagaimana proses pengambilan keputusan dilakukan hingga proyek selesai.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: PROJECTS */}
      <section className="py-40 bg-zinc-50 border-b border-zinc-200">
        <Container>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
            {projectsData.map((project, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white hover:bg-zinc-50 transition-colors p-8 sm:p-12 h-full flex flex-col group border border-transparent hover:border-zinc-300 cursor-pointer">
                  <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full">
                    <div className="aspect-[4/3] bg-zinc-100 mb-8 relative overflow-hidden rounded-lg">
                      <Image src={project.imageUrl} fill alt={project.title} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="mb-4">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-manrope font-bold text-zinc-900 mb-4">{project.title}</h3>
                    <p className="text-zinc-600 leading-relaxed mb-6 flex-grow">{project.challenge.substring(0, 100)}...</p>
                    <div className="mt-auto pt-6 border-t border-zinc-100">
                      <span className="inline-flex items-center text-sm font-bold text-zinc-900">
                        Baca Studi Kasus <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      
      {/* SECTION 03: CTA */}
      <section className="py-40 bg-white">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-manrope font-bold text-zinc-900 leading-[1.1] tracking-tight mb-8">
                Mari Diskusikan Proyek Anda.
              </h2>
              <Button size="lg">
                <Link href="/assessment">Jadwalkan Diskusi</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
