import { Container } from "@/components/ui/container";

/**
 * Minimal footer for /lp/* paid landing pages (Batch 12 §14). No sitewide
 * navigation, no newsletter form — just the legal minimum and a way back to
 * the organic site, kept out of the primary conversion path.
 */
export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E8DED0] bg-[#ECE8E1] py-8">
      <Container className="flex flex-col items-center gap-3 text-center text-xs text-[#68757D] sm:flex-row sm:justify-between">
        <p>&copy; {currentYear} ARKAVENA. Seluruh hak cipta dilindungi.</p>
        <nav className="flex gap-4">
          <a href="/kebijakan-privasi">Kebijakan Privasi</a>
          <a href="/syarat-ketentuan">Syarat &amp; Ketentuan</a>
        </nav>
      </Container>
    </footer>
  );
}
