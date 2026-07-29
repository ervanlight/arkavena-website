"use client";

import * as React from "react";
import { trackLandingEvent } from "@/lib/landing/analytics";

/**
 * Fires `landing_view` exactly once per mount. Kept as its own tiny client
 * component so LandingTemplate itself can stay a server component.
 */
export function LandingViewTracker({
  campaign,
  pagePath,
}: {
  campaign: string;
  pagePath: string;
}) {
  React.useEffect(() => {
    trackLandingEvent("landing_view", { campaign, page_path: pagePath });
    // Intentionally fires once on mount only — not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
