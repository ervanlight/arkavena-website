import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — TEGAKARA',
  description: 'Syarat dan ketentuan penggunaan situs web dan layanan TEGAKARA.',
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <section className="bg-white pt-40 pb-20 border-b border-[#C9C3B8]">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#5B6570] mb-8">
                Legal
              </span>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] leading-[1.1] tracking-tight mb-8">
                Syarat & Ketentuan
              </h1>
              <p className="text-lg text-[#5B6570]">Terakhir diperbarui: 23 Juli 2026</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <FadeIn delay={100}>
            <div className="max-w-3xl mx-auto prose prose-zinc prose-lg">
              <p>Selamat datang di situs web TEGAKARA. Dengan mengakses dan menggunakan situs ini, Anda setuju untuk terikat oleh Syarat & Ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan situs kami.</p>
              
              <h3>1. Penggunaan Situs Web</h3>
              <p>Anda setuju untuk menggunakan situs ini hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar hak, membatasi, atau menghalangi penggunaan dan penikmatan situs ini oleh pihak ketiga mana pun.</p>
              
              <h3>2. Hak Kekayaan Intelektual</h3>
              <p>Seluruh konten, desain, grafik, logo, dan teks di situs web ini adalah milik TEGAKARA atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta. Anda tidak diperkenankan untuk menyalin, mereproduksi, atau mendistribusikan materi apa pun tanpa izin tertulis dari kami.</p>
              
              <h3>3. Informasi Layanan</h3>
              <p>Informasi yang disediakan di situs ini, termasuk namun tidak terbatas pada deskripsi layanan, portofolio, dan artikel, bersifat informatif. Kami berusaha untuk menjaga keakuratan informasi, namun kami tidak memberikan jaminan bahwa semua informasi bebas dari kesalahan (error-free).</p>
              
              <h3>4. Tautan ke Pihak Ketiga</h3>
              <p>Situs kami mungkin berisi tautan ke situs web pihak ketiga. Tautan ini disediakan semata-mata demi kenyamanan Anda. TEGAKARA tidak bertanggung jawab atas konten atau praktik privasi dari situs-situs tersebut.</p>
              
              <h3>5. Batasan Tanggung Jawab</h3>
              <p>Dalam keadaan apa pun, TEGAKARA tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan Anda dalam menggunakan situs web ini atau layanan yang kami sediakan.</p>
              
              <h3>6. Hukum yang Berlaku</h3>
              <p>Syarat & Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala perselisihan yang timbul sehubungan dengan ketentuan ini akan tunduk pada yurisdiksi eksklusif pengadilan di Indonesia.</p>
              
              <h3>7. Perubahan Ketentuan</h3>
              <p>Kami berhak untuk merevisi Syarat & Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Penggunaan situs ini setelah adanya perubahan merupakan persetujuan Anda terhadap ketentuan yang baru.</p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
