import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { processSteps } from '@/content/process';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cara Kerja — TEGAKARA',
  description: 'Proses kerja terstruktur TEGAKARA dari perencanaan hingga serah terima dan pemeliharaan.',
};

const phases = [
  {
    title: 'Perencanaan & Penawaran',
    steps: processSteps.slice(0, 7),
  },
  {
    title: 'Eksekusi & Pengendalian',
    steps: processSteps.slice(7, 11),
  },
  {
    title: 'Serah Terima & Pemeliharaan',
    steps: processSteps.slice(11, 14),
  }
];

export default function CaraKerjaPage() {
  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-[#ECE8E1] pt-32 pb-20 border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-block text-[11px] font-[family-name:var(--font-ibm-plex-mono)] font-bold tracking-widest uppercase text-[#5B6570] mb-8">
                PROSES KAMI
              </span>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.05] tracking-tight mb-8">
                Transparan, Terukur, & Terkendali
              </h1>
              <p className="text-xl text-[#5B6570] leading-relaxed max-w-2xl font-[family-name:var(--font-inter)]">
                Kami menerapkan 14 langkah kerja yang terstruktur untuk memastikan setiap proyek berjalan sesuai standar kualitas, waktu, dan anggaran.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: PHASES */}
      <section className="py-24 bg-[#ECE8E1]">
        <Container>
          <div className="space-y-32">
            {phases.map((phase, pIdx) => (
              <div key={pIdx} className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <FadeIn>
                      <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-4">
                        Fase {pIdx + 1}: <br />{phase.title}
                      </h2>
                    </FadeIn>
                  </div>
                </div>
                
                <div className="lg:col-span-8">
                  <div className="space-y-8">
                      {phase.steps.map((step) => (
                        <FadeIn key={step.id}>
                          <div className="bg-white border border-[#C9C3B8] rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-[#14171B] rounded-xl flex items-center justify-center text-[#E2A63C] font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
                              {step.stepNumber}
                            </div>
                            <div>
                              <h3 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-3">
                                {step.title}
                              </h3>
                              <p className="text-[#5B6570] leading-relaxed mb-6 font-[family-name:var(--font-inter)]">
                                {step.description}
                              </p>
                              <ul className="space-y-3">
                                {step.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E2A63C] mt-2.5 flex-shrink-0" />
                                    <span className="text-[#14171B] font-medium font-[family-name:var(--font-inter)]">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* SECTION 03: CTA */}
      <section className="py-24 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-6">
                Siap Memulai Proyek Anda?
              </h2>
              <p className="text-[#C9C3B8] text-lg mb-10 font-[family-name:var(--font-inter)]">
                Konsultasikan rencana Anda dan mari kita mulai langkah pertama dari 14 tahap kesuksesan proyek bersama TEGAKARA.
              </p>
              <Button className="bg-[#E2A63C] text-[#14171B] hover:bg-[#c9922f] px-8 py-6 text-lg font-bold h-auto">
                <Link href="/assessment">Mulai Assessment Proyek</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
