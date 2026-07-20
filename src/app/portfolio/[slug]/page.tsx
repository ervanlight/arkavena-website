import { notFound } from 'next/navigation';
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

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find(p => p.slug === slug);

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
