"use client";

import * as React from "react";

// =========================================
// ARKAVENA — Floating UI Coordination
// =========================================
// The cookie-consent banner and the WhatsApp floating button are both
// `fixed` at the bottom of the viewport. On mobile the banner's wrapper
// spans the full width (audit finding Q5), so while it's open it visually
// covers the WhatsApp button in the bottom-right corner. This is a small
// pub-sub so WhatsAppFloatingButton can react to the banner's visibility
// without the two components needing to share a parent state.

const BANNER_VISIBLE_EVENT = "arkavena:cookie-banner-visible";

export function announceBannerVisibility(visible: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BANNER_VISIBLE_EVENT, { detail: visible }));
}

export function useCookieBannerVisible(): boolean {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: Event) => {
      setVisible((event as CustomEvent<boolean>).detail);
    };
    window.addEventListener(BANNER_VISIBLE_EVENT, handler);
    return () => window.removeEventListener(BANNER_VISIBLE_EVENT, handler);
  }, []);

  return visible;
}
