"use client";

import * as React from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/contact/whatsapp";
import { analytics } from "@/lib/analytics";
import { announceBottomBarVisibility } from "@/lib/ui/floating-ui-coordination";
import type { ContentItem } from "@/schemas/content-types";

const READ_THRESHOLD = 0.4;

/**
 * Thin bottom bar that appears once the visitor has scrolled through about
 * 40% of the article, with a CTA worded for this specific page rather than
 * a generic one (audit finding Q4). Only makes sense on long-form content
 * pages (guide/service/sector/location) — landing pages already have their
 * own persistent lead form, and hub/corporate pages aren't "articles" in
 * the same sense.
 *
 * Progress is approximated from how much of the page's single <article>
 * element has scrolled above the viewport top, as a fraction of its total
 * height — not scientifically exact, but a reasonable proxy for "how far
 * into this page has the visitor read" without instrumenting every MDX
 * block.
 */
export function StickyCtaBar({ item }: { item: ContentItem }) {
  const [pastThreshold, setPastThreshold] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    let ticking = false;
    const checkProgress = () => {
      ticking = false;
      const rect = article.getBoundingClientRect();
      if (rect.height <= 0) return;
      const scrolledPast = Math.min(Math.max(-rect.top, 0), rect.height);
      const progress = scrolledPast / rect.height;
      setPastThreshold(progress >= READ_THRESHOLD);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkProgress);
    };

    checkProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visible = pastThreshold && !dismissed;

  React.useEffect(() => {
    announceBottomBarVisibility("sticky-cta", visible);
    return () => announceBottomBarVisibility("sticky-cta", false);
  }, [visible]);

  if (!visible) return null;

  const whatsAppUrl = buildWhatsAppUrl({
    number: siteConfig.whatsApp,
    message: item.conversion.primaryCta.whatsappMessage,
  });
  const href = whatsAppUrl ?? item.conversion.primaryCta.href;
  const isWhatsApp = Boolean(whatsAppUrl);

  const handleClick = () => {
    analytics.trackEvent("cta_click", { location: "sticky_bar", page: item.slug });
    if (isWhatsApp) {
      analytics.trackEvent("whatsapp_click", { location: "sticky_bar" });
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8DED0] bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom-3">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#0E1B26]">
          <span className="text-[#805A22]">{item.hero.eyebrow}.</span>{" "}
          <span className="hidden sm:inline">Butuh bantuan mewujudkannya?</span>
          <span className="sm:hidden">Butuh bantuan?</span>
        </p>
        <a
          href={href}
          target={isWhatsApp ? "_blank" : undefined}
          rel={isWhatsApp ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          className="shrink-0 rounded-md bg-[#B88A4A] px-4 py-2 text-sm font-semibold text-[#14171B] transition-colors hover:bg-[#a2793f]"
        >
          {item.conversion.primaryCta.label}
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Tutup"
          className="shrink-0 rounded-md p-2 text-[#68757D] hover:bg-[#ECE8E1] hover:text-[#0E1B26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
