import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';

export const metadata: Metadata = {
  title: 'Tentang Kami — TEGAKARA',
  description: 'Kami percaya bahwa proyek yang baik lahir dari sistem yang baik. Kami membantu pemilik properti mengambil keputusan dengan lebih percaya diri.',
};

export default function TentangPage() {
  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-[#14171B] text-white pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-white/10">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#5B6570] mb-8">
                About Tegakara
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-[1.05] tracking-tight mb-8">
                Kami Percaya Bahwa
                <br /><span className="text-[#5B6570]">Proyek Yang Baik Lahir Dari Sistem Yang Baik.</span>
              </h1>
              <div className="text-lg text-white/50 leading-relaxed font-inter max-w-3xl space-y-6">
                <p>TEGAKARA dibangun dengan keyakinan sederhana.</p>
                <p>Bangunan yang baik tidak hanya ditentukan oleh material maupun tenaga kerja. Tetapi oleh bagaimana seluruh proses dikelola.</p>
                <p>Karena itu kami mengembangkan cara kerja yang mengutamakan transparansi, dokumentasi, koordinasi, dan tanggung jawab pada setiap tahap proyek.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: FILOSOFI KAMI */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#5B6570]">FILOSOFI KAMI</h2>
              </div>
              <div className="md:col-span-8">
                <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.2] tracking-tight mb-6">
                  Kami tidak berusaha menjadi kontraktor terbesar.
                </h3>
                <p className="text-lg text-[#5B6570] leading-relaxed">
                  Kami ingin menjadi partner yang membantu pemilik properti mengambil keputusan dengan lebih percaya diri.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 03: CARA KAMI BEKERJA */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#5B6570]">CARA KAMI BEKERJA</h2>
              </div>
              <div className="md:col-span-8">
                <div className="space-y-6 text-2xl md:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.3] tracking-tight">
                  <p>Kami percaya bahwa setiap keputusan harus memiliki dasar.</p>
                  <p className="text-white/50">Setiap perubahan harus memiliki dokumentasi.</p>
                  <p className="text-[#5B6570]">Setiap progres harus dapat dipantau.</p>
                  <p>Setiap pekerjaan harus dapat dipertanggungjawabkan.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 04: NILAI YANG KAMI PEGANG */}
      <section className="py-24 lg:py-32 bg-[#14171B] text-white">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#5B6570] mb-6">NILAI YANG KAMI PEGANG</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#ECE8E1]/10 border border-white/10">
              {[
                { title: "Transparansi", desc: "Tidak ada keputusan penting tanpa komunikasi." },
                { title: "Akuntabilitas", desc: "Setiap pekerjaan memiliki tanggung jawab yang jelas." },
                { title: "Disiplin", desc: "Proses yang baik menghasilkan hasil yang baik." },
                { title: "Kolaborasi", desc: "Kami bekerja bersama klien, bukan hanya untuk klien." }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#14171B] p-8 lg:p-10">
                  <h3 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-[#5B6570] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 05: TIM KAMI */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-[11px] font-bold tracking-widest uppercase text-[#5B6570] mb-6">TIM KAMI</h2>
              <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] tracking-tight">
                Perkenalkan tim yang berada di balik setiap proyek.
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-[#C9C3B8] border border-[#C9C3B8]">
              {[
                { role: "Founder" },
                { role: "Project Manager" },
                { role: "Engineer" },
                { role: "Supervisor" },
                { role: "Field Team" }
              ].map((member, idx) => (
                <div key={idx} className="bg-[#ECE8E1] p-8 group">
                  <div className="aspect-square bg-[#C9C3B8]/20 mb-6 relative overflow-hidden rounded-lg">
                    {/* Placeholder for real photos */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/70 font-mono text-xs group-hover:scale-105 transition-transform duration-500">
                      PHOTO
                    </div>
                  </div>
                  <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B]">{member.role}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 06: CTA */}
      <section className="py-24 lg:py-32 bg-[#ECE8E1] text-center">
        <Container>
          <FadeIn>
            <Button size="lg">
              <Link href="/kontak">Mari Berdiskusi</Link>
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
