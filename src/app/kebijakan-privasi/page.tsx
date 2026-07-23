import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/shared/fade-in';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — TEGAKARA',
  description: 'Kebijakan privasi TEGAKARA dalam mengelola dan melindungi data Anda.',
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <section className="bg-white pt-40 pb-20 border-b border-zinc-200">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-8">
                Legal
              </span>
              <h1 className="text-4xl md:text-5xl font-manrope font-bold text-zinc-900 leading-[1.1] tracking-tight mb-8">
                Kebijakan Privasi
              </h1>
              <p className="text-lg text-zinc-600">Terakhir diperbarui: 23 Juli 2026</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <FadeIn delay={100}>
            <div className="max-w-3xl mx-auto prose prose-zinc prose-lg">
              <p>Di TEGAKARA, kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda bagikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga data Anda saat mengunjungi situs web kami atau menggunakan layanan kami.</p>
              
              <h3>1. Informasi yang Kami Kumpulkan</h3>
              <p>Kami dapat mengumpulkan informasi pribadi seperti nama, alamat email, nomor telepon, dan detail proyek saat Anda mengisi formulir kontak, form penilaian (assessment), atau mendaftar untuk menerima pembaruan dari kami.</p>
              
              <h3>2. Penggunaan Informasi</h3>
              <p>Informasi yang kami kumpulkan digunakan secara eksklusif untuk:</p>
              <ul>
                <li>Memahami kebutuhan proyek Anda.</li>
                <li>Menghubungi Anda terkait permintaan diskusi atau penilaian proyek.</li>
                <li>Meningkatkan layanan dan pengalaman pengguna di situs web kami.</li>
              </ul>
              
              <h3>3. Perlindungan Data</h3>
              <p>Kami menerapkan standar keamanan yang wajar untuk mencegah akses, pengungkapan, atau modifikasi data pribadi Anda oleh pihak yang tidak berwenang. Data Anda disimpan di lingkungan yang aman dan hanya dapat diakses oleh personel yang berwenang.</p>
              
              <h3>4. Pembagian Informasi</h3>
              <p>Kami tidak menjual, menyewakan, atau menukar informasi pribadi Anda kepada pihak ketiga. Kami hanya dapat membagikan informasi Anda kepada mitra tepercaya yang membantu kami dalam mengoperasikan situs web atau menjalankan bisnis kami, dengan syarat mereka setuju untuk menjaga kerahasiaan informasi tersebut.</p>
              
              <h3>5. Perubahan Kebijakan</h3>
              <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan dipublikasikan di halaman ini dengan memperbarui tanggal "Terakhir diperbarui".</p>
              
              <h3>6. Hubungi Kami</h3>
              <p>Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui email di <strong>hello@tegakara.com</strong>.</p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
