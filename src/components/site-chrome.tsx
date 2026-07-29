"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloatingButton } from "@/components/shared/whatsapp-floating-button";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

/**
 * Swaps the global site chrome for the minimal landing-page chrome on
 * /lp/* paths (ARCHITECTURE.md Batch 12 §14, `landing.showGlobalNavigation`).
 *
 * The root layout renders a single component tree for every route, so this
 * is a pathname-based swap rather than a second root layout — it changes
 * only what wraps `children`, never `children` itself, and touches no
 * existing route's markup.
 */
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/lp/")) return <LandingHeader />;
  return <Header />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/lp/")) return <LandingFooter />;
  return <Footer />;
}

/**
 * The floating WhatsApp button is a distinct organic-site conversion path;
 * landing pages have their own on-page CTA and lead form, so this stays
 * suppressed on /lp/* to keep the single conversion path uncluttered.
 */
export function SiteWhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/lp/")) return null;
  return <WhatsAppFloatingButton />;
}
