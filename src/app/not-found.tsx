import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-40">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-[family-name:var(--font-space-grotesk)] font-bold text-white leading-none mb-8 tracking-tighter">
            404
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-6 tracking-tight">
            Halaman tidak ditemukan.
          </h2>
          <p className="text-xl text-[#5B6570] mb-12 leading-relaxed">
            Halaman yang Anda cari tidak tersedia. Mari kembali ke halaman utama atau hubungi tim kami apabila membutuhkan bantuan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              <Link href="/">Kembali ke Halaman Utama</Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
