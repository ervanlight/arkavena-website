import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/container';
import { NewsletterForm } from './newsletter-form';

// text-[#C9C3B8] not text-[#3F4954] (audit finding I7): #3F4954 measured
// 1.96:1 against this footer's dark background, far below the 4.5:1
// minimum — it's designed for use on light backgrounds (see its definition
// in globals.css), not dark ones. #C9C3B8 is the palette's existing
// on-dark secondary tone (already used for this footer's own border).
const LINK_CLASS =
  'inline-block py-2 -my-2 text-[#C9C3B8] hover:text-white transition-colors text-sm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14171B] bg-structural-grid-dark text-white pt-16 pb-8 border-t border-[#C9C3B8]/20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Image
                src="/logo.png"
                alt="ARKAVENA Construction & Facility Care"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
                unoptimized
              />
            </div>
            <p className="text-[#C9C3B8] text-sm leading-relaxed max-w-xs">
              Kami percaya bahwa proyek terbaik lahir dari proses yang dapat dipertanggungjawabkan. ARKAVENA membantu pemilik properti menjaga setiap keputusan, biaya, kualitas, dan progres tetap berada dalam kendali.
            </p>
          </div>

          {/* Jelajahi — the current content-engine structure (audit finding
              I2, owner-approved 2026-07-29: the footer previously had zero
              links into /layanan, /sektor, /wilayah, /panduan). */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-6 text-white">Jelajahi</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/layanan" className={LINK_CLASS}>
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/sektor" className={LINK_CLASS}>
                  Sektor
                </Link>
              </li>
              <li>
                <Link href="/wilayah" className={LINK_CLASS}>
                  Wilayah
                </Link>
              </li>
              <li>
                <Link href="/panduan" className={LINK_CLASS}>
                  Panduan
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan — "Residential" removed (redirected to /layanan/*,
              audit finding I1); Facility Care kept (still a live page). */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-6 text-white">Perusahaan</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/tentang" className={LINK_CLASS}>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/facility-care" className={LINK_CLASS}>
                  Facility Care
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={LINK_CLASS}>
                  Portofolio Proyek
                </Link>
              </li>
              <li>
                <Link href="/trust-center" className={LINK_CLASS}>
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/projectview" className={LINK_CLASS}>
                  ProjectView
                </Link>
              </li>
              <li>
                <Link href="/kontak" className={LINK_CLASS}>
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-6 text-white">Newsletter</h4>
            <p className="text-[#C9C3B8] text-sm mb-4">
              Dapatkan panduan tentang pengelolaan proyek konstruksi dan perawatannya.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-[#C9C3B8]">
              <p>&copy; {currentYear} ARKAVENA. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/kebijakan-privasi" className="py-2 -my-2 hover:text-white transition-colors">Kebijakan Privasi</Link>
                <span>•</span>
                <Link href="/syarat-ketentuan" className="py-2 -my-2 hover:text-white transition-colors">Syarat & Ketentuan</Link>
              </div>
            </div>
        </div>
      </Container>
    </footer>
  );
}
