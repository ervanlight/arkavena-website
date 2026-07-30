"use client";

import * as React from "react";

// =========================================
// ARKAVENA — Floating UI Coordination
// =========================================
// Several elements are `fixed` at the bottom of the viewport and can appear
// at the same time: the cookie-consent banner, the WhatsApp floating
// button, and the sticky contextual CTA bar (audit findings Q5/Q4). Rather
// than wiring each pair together directly, every occupant announces its own
// visibility under a name, and anything that needs to yield the bottom-right
// corner (currently just the WhatsApp button) asks whether any occupant is
// currently showing.

export type BottomBarName = "cookie-banner" | "sticky-cta";

const BOTTOM_BAR_EVENT = "arkavena:bottom-bar-visibility";

interface BottomBarEventDetail {
  name: BottomBarName;
  visible: boolean;
}

export function announceBottomBarVisibility(
  name: BottomBarName,
  visible: boolean
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<BottomBarEventDetail>(BOTTOM_BAR_EVENT, {
      detail: { name, visible },
    })
  );
}

/** True while any registered bottom bar is visible. */
export function useAnyBottomBarVisible(): boolean {
  const [visibleBars, setVisibleBars] = React.useState<Set<BottomBarName>>(
    () => new Set()
  );

  React.useEffect(() => {
    const handler = (event: Event) => {
      const { name, visible } = (event as CustomEvent<BottomBarEventDetail>).detail;
      setVisibleBars((prev) => {
        const next = new Set(prev);
        if (visible) next.add(name);
        else next.delete(name);
        return next;
      });
    };
    window.addEventListener(BOTTOM_BAR_EVENT, handler);
    return () => window.removeEventListener(BOTTOM_BAR_EVENT, handler);
  }, []);

  return visibleBars.size > 0;
}

// Back-compat aliases for the cookie-banner-specific names used elsewhere.
export function announceBannerVisibility(visible: boolean): void {
  announceBottomBarVisibility("cookie-banner", visible);
}

export function useCookieBannerVisible(): boolean {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<BottomBarEventDetail>).detail;
      if (detail.name === "cookie-banner") setVisible(detail.visible);
    };
    window.addEventListener(BOTTOM_BAR_EVENT, handler);
    return () => window.removeEventListener(BOTTOM_BAR_EVENT, handler);
  }, []);

  return visible;
}
