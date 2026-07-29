import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

/**
 * Minimal navigation for /lp/* paid landing pages (Batch 12 §14). Deliberately
 * excludes the global mega-menu (Layanan/Sektor/Wilayah/Panduan) so paid
 * traffic stays on the single conversion path instead of exiting to organic
 * content. Logo links to "/" only — the one way out of the funnel.
 */
export function LandingHeader() {
  return (
    <header className="border-b border-[#E8DED0] bg-[#ECE8E1]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="ARKAVENA">
          <Image
            src="/logo.png"
            alt="ARKAVENA Construction & Facility Care"
            width={160}
            height={48}
            className="h-9 w-auto object-contain"
            unoptimized
          />
        </Link>
      </Container>
    </header>
  );
}
