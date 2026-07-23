import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { projectsData } from '@/content/projects';
import { ArrowLeft, MapPin, Calendar, Layers, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-white pt-40 pb-20 border-b border-zinc-200">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <Link href="/portfolio" className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-zinc-900 mb-12 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Portofolio
              </Link>
              <h1 className="text-5xl md:text-6xl font-manrope font-bold text-zinc-900 leading-[1.05] tracking-tight mb-8">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm font-medium text-zinc-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-zinc-400" /> {project.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400" /> {project.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-400" /> {project.category}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: IMAGE */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn delay={100}>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
              <Image 
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 03: CONTENT */}
      <section className="py-20 bg-white border-b border-zinc-200">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <FadeIn delay={150}>
                <div className="sticky top-32 space-y-8">
                  <div>
                    <h3 className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-4">Ruang Lingkup Pekerjaan</h3>
                    <p className="text-lg font-medium text-zinc-900">{project.scope}</p>
                  </div>
                  <div className="pt-8 border-t border-zinc-200">
                    <Button className="w-full">
                      <Link href="/assessment">Diskusikan Proyek Serupa</Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-8 space-y-24">
              <FadeIn delay={200}>
                <div>
                  <h2 className="text-3xl font-manrope font-bold text-zinc-900 tracking-tight mb-6">Tantangan Proyek</h2>
                  <p className="text-xl text-zinc-600 leading-relaxed">{project.challenge}</p>
                </div>
              </FadeIn>
              
              <FadeIn delay={250}>
                <div>
                  <h2 className="text-3xl font-manrope font-bold text-zinc-900 tracking-tight mb-6">Pendekatan & Solusi</h2>
                  <p className="text-xl text-zinc-600 leading-relaxed">{project.solution}</p>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 md:p-12">
                  <h2 className="text-2xl font-manrope font-bold text-zinc-900 tracking-tight mb-8">Hasil Akhir</h2>
                  <div className="space-y-6">
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-zinc-400 shrink-0 mt-1" />
                        <p className="text-lg text-zinc-900 font-medium leading-relaxed">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
