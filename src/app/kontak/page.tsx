import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontak — TEGAKARA',
  description: 'Mari mulai dengan sebuah percakapan. Diskusi awal membantu kami memahami kondisi proyek Anda.',
};

export default function KontakPage() {
  return (
    <>
      {/* SECTION 01: HERO */}
      <section className="bg-white pt-28 pb-20 lg:pt-36 lg:pb-20">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-zinc-900 leading-[1.05] tracking-tight mb-8">
                Mari Mulai Dengan Sebuah Percakapan.
              </h1>
              <div className="text-lg text-zinc-600 leading-relaxed font-inter max-w-3xl space-y-6">
                <p>Setiap proyek memiliki kebutuhan yang berbeda.</p>
                <p>Kami akan mendengarkan terlebih dahulu sebelum memberikan rekomendasi.</p>
                <p>Diskusi awal membantu kami memahami kondisi proyek Anda sehingga solusi yang diberikan menjadi lebih relevan.</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 02: FORM & INFO */}
      <section className="py-20 bg-white border-b border-zinc-200">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* CONTACT FORM */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 lg:p-10">
                  <div className="mb-12">
                    <h2 className="text-2xl font-manrope font-bold text-zinc-900 mb-2">Ceritakan Proyek Anda.</h2>
                    <p className="text-zinc-500">Semakin lengkap informasi yang Anda berikan, semakin baik kami memahami kebutuhan proyek Anda.</p>
                  </div>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Nama</label>
                        <input type="text" className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Nomor WhatsApp</label>
                        <input type="tel" className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Email <span className="text-zinc-400 font-normal">(opsional)</span></label>
                        <input type="email" className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Lokasi Proyek</label>
                        <input type="text" placeholder="Lokasi proyek..." className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow placeholder:text-zinc-400" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Jenis Proyek</label>
                        <select className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow appearance-none">
                          <option value="">Pilih jenis proyek...</option>
                          <option value="bangun_baru">Bangun Baru</option>
                          <option value="renovasi">Renovasi</option>
                          <option value="facility_care">Facility Care</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Tahap Saat Ini</label>
                        <select className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow appearance-none">
                          <option value="">Pilih tahap proyek...</option>
                          <option value="berencana">Baru Berencana</option>
                          <option value="ada_desain">Sudah Memiliki Desain</option>
                          <option value="cari_kontraktor">Sedang Mencari Kontraktor</option>
                          <option value="berjalan">Proyek Sedang Berjalan</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-700">Ceritakan Kebutuhan Anda</label>
                      <textarea rows={5} placeholder="Ceritakan kebutuhan Anda..." className="w-full bg-white border border-zinc-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow resize-none placeholder:text-zinc-400"></textarea>
                    </div>

                    <Button type="button" size="lg" className="w-full h-14 text-base">
                      Kirim Permintaan Diskusi
                    </Button>
                  </form>
                </div>
              </FadeIn>
            </div>

            {/* CONTACT INFO & FAQ MINI */}
            <div className="lg:col-span-5">
              <FadeIn delay={200}>
                <div className="space-y-16">
                  <div>
                    <h3 className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-6">OFFICE</h3>
                    <div className="space-y-6 text-zinc-600 leading-relaxed">
                      <div>
                        <p className="font-bold text-zinc-900">Headquarters</p>
                        <p>Jl. Raya Pembangunan No. 123<br />Surabaya, Jawa Timur 60123</p>
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">Jam Operasional</p>
                        <p>Senin - Jumat: 08:00 - 17:00 WIB<br />Sabtu: 08:00 - 12:00 WIB</p>
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">Kontak Langsung</p>
                        <p>T. (031) 555-1234<br />E. hello@tegakara.com</p>
                      </div>
                      <a href="#" className="inline-block font-bold text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-zinc-600 hover:border-zinc-600 transition-colors">
                        Lihat di Google Maps
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-6">FAQ MINI</h3>
                    <div className="space-y-8">
                      <div>
                        <p className="font-bold text-zinc-900 mb-2">Berapa lama kami akan merespons?</p>
                        <p className="text-zinc-600 leading-relaxed">Dalam hari kerja, tim kami akan berusaha merespons secepat mungkin setelah menerima informasi proyek Anda.</p>
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 mb-2">Apakah konsultasi awal berbayar?</p>
                        <p className="text-zinc-600 leading-relaxed">Diskusi awal bertujuan memahami kebutuhan proyek dan tidak mengharuskan Anda mengambil keputusan saat itu juga.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 03: FINAL CTA */}
      <section className="py-24 lg:py-32 bg-zinc-950 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-manrope font-bold text-zinc-50 mb-8 tracking-tight leading-tight">
              Setiap Proyek Dimulai Dari Percakapan Yang Tepat.
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              Jika Anda sedang mempertimbangkan pembangunan, renovasi, atau pengelolaan fasilitas, mari mulai dengan berdiskusi.
              <br /><br />
              Kami akan membantu Anda memahami langkah yang paling sesuai dengan kondisi proyek Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto bg-white text-zinc-950 hover:bg-zinc-200">
                <Link href="/kontak">Jadwalkan Diskusi</Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                <Link href="https://wa.me/6281112345678" target="_blank" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
