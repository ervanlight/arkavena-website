"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, GENERIC_WHATSAPP_PREFILL } from "@/lib/contact/whatsapp";
import { useAnyBottomBarVisible } from "@/lib/ui/floating-ui-coordination";

export function WhatsAppFloatingButton() {
  const bottomBarVisible = useAnyBottomBarVisible();
  const whatsappUrl = buildWhatsAppUrl({
    number: siteConfig.whatsApp,
    message: GENERIC_WHATSAPP_PREFILL,
  });

  // No configured number, no button — never a dummy or fallback number
  // (ARCHITECTURE.md Batch 01 §8.6).
  if (!whatsappUrl) return null;

  // Hidden while the cookie banner or the sticky contextual CTA bar is open
  // (audit findings Q5/Q4): both can span the full viewport width on mobile
  // and their height varies with content, so a fixed offset can't reliably
  // clear them — hiding is simpler and can't under-shoot. WhatsApp remains
  // reachable elsewhere (both bars carry their own WhatsApp CTA too).
  if (bottomBarVisible) return null;

  const handleClick = () => {
    analytics.trackEvent('whatsapp_click', { location: 'floating_button' });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Hubungi ARKAVENA via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle className="w-5 h-5 fill-current shrink-0" />
      <span className="text-sm font-bold font-[family-name:var(--font-inter)] hidden sm:inline-block">
        Chat via WhatsApp
      </span>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
    </a>
  );
}
