"use client";

import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/contact/whatsapp";
import { trackLandingEvent } from "@/lib/landing/analytics";

export interface LandingCTAProps {
  campaign: string;
  pagePath: string;
  label: string;
  href: string;
  whatsappMessage: string | null;
}

/**
 * Landing-page CTA button. When a WhatsApp number is configured, opens
 * WhatsApp with the page's prefilled message and fires `whatsapp_click`;
 * otherwise falls back to the frontmatter href and fires only `cta_click`
 * (ARCHITECTURE.md Batch 01 §11: the number always comes from business
 * config, never invented).
 */
export function LandingCTA({ campaign, pagePath, label, href, whatsappMessage }: LandingCTAProps) {
  const whatsAppUrl = buildWhatsAppUrl({
    number: siteConfig.whatsApp,
    message: whatsappMessage,
  });

  const finalHref = whatsAppUrl ?? href;
  const isWhatsApp = Boolean(whatsAppUrl);

  const handleClick = () => {
    trackLandingEvent("cta_click", { campaign, page_path: pagePath, cta_label: label });
    if (isWhatsApp) {
      trackLandingEvent("whatsapp_click", { campaign, page_path: pagePath });
    }
  };

  return (
    <a
      href={finalHref}
      target={isWhatsApp ? "_blank" : undefined}
      rel={isWhatsApp ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-md bg-[#B88A4A] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#a2793f]"
    >
      {label}
    </a>
  );
}
