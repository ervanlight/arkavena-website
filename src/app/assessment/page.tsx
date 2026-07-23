import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { Suspense } from 'react';
import { CheckCircle2, ArrowDown } from 'lucide-react';
import AssessmentForm from '@/components/assessment/AssessmentForm';

export const metadata: Metadata = {
  title: 'Project Assessment — TEGAKARA',
  description: 'Sebelum memulai proyek, pastikan proyek Anda sudah siap. Evaluasi kesiapan proyek Anda bersama TEGAKARA.',
};

export default function AssessmentPage() {
  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-white pt-40 pb-40 border-b border-zinc-200">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-6">
              <FadeIn>
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-8">
                  Project Readiness Assessment
                </span>
                <h1 className="text-5xl md:text-6xl font-manrope font-bold text-zinc-900 leading-[1.05] tracking-tight mb-8">
                  Sebelum Memulai Proyek,
                  <br /><span className="text-zinc-400">Pastikan Proyek Anda Sudah Siap.</span>
                </h1>
                <div className="text-xl text-zinc-600 leading-relaxed font-inter mb-12 space-y-6">
                  <p>Banyak proyek mengalami kendala bukan karena pelaksanaannya. Tetapi karena persiapannya.</p>
                  <p>Assessment ini membantu Anda memahami kondisi proyek saat ini dan mengetahui apa saja yang masih perlu dipersiapkan sebelum pembangunan dimulai.</p>
                </div>

                <div className="mt-16">
                  <h3 className="text-xl font-manrope font-bold text-zinc-900 mb-6">Apa Yang Akan Anda Dapatkan?</h3>
                  <div className="space-y-4">
                    {[
                      "Gambaran kesiapan proyek",
                      "Area yang perlu dipersiapkan",
                      "Potensi risiko",
                      "Rekomendasi langkah berikutnya",
                      "Kesempatan berdiskusi bersama tim TEGAKARA"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-zinc-300 shrink-0" />
                        <span className="text-zinc-600 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 p-8 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-6">Assessment Mencakup</h3>
                  <div className="space-y-4 text-zinc-900 font-medium">
                    <p>Apakah lahan sudah siap?</p>
                    <ArrowDown className="w-4 h-4 text-zinc-300" />
                    <p>Apakah desain sudah tersedia?</p>
                    <ArrowDown className="w-4 h-4 text-zinc-300" />
                    <p>Apakah anggaran sudah ditentukan?</p>
                    <ArrowDown className="w-4 h-4 text-zinc-300" />
                    <p>Apakah target waktu sudah jelas?</p>
                    <ArrowDown className="w-4 h-4 text-zinc-300" />
                    <p>Apa tantangan terbesar proyek Anda?</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-6">
              <FadeIn delay={200}>
                <div className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm sticky top-32">
                  <div className="mb-8">
                    <h2 className="text-2xl font-manrope font-bold text-zinc-900 mb-2">Ceritakan Proyek Anda.</h2>
                    <p className="text-zinc-500">Semakin lengkap informasi yang Anda berikan, semakin baik kami memahami kebutuhan proyek Anda.</p>
                  </div>
                  <Suspense fallback={<div className="h-64 flex items-center justify-center text-zinc-400">Loading form...</div>}>
                    <AssessmentForm />
                  </Suspense>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
