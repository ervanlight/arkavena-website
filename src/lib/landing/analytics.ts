// =========================================
// ARKAVENA — Landing Conversion Analytics Adapter
// =========================================
// Single source of truth for paid-landing-page instrumentation (Batch 12).
// Distinct from src/lib/analytics.ts, which is legacy dual-push instrumentation
// for the pre-content-engine pages. This adapter is strict single-mode: it
// never pushes to both GTM and GA4 for the same event.
//
// Mode is derived from the SAME env vars the root layout already uses to
// decide which analytics script (if any) to load
// (src/app/layout.tsx), so the adapter and the loaded script can never
// disagree about which vendor is active. No ID is ever hard-coded here.

export type AnalyticsMode = "none" | "ga4" | "gtm";

export function getAnalyticsMode(): AnalyticsMode {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  // Mirrors src/app/layout.tsx's own precedence: GTM wins if both are set,
  // so the adapter's mode always matches the script actually injected.
  if (gtmId) return "gtm";
  if (gaId) return "ga4";
  return "none";
}

/**
 * Strict conversion-event taxonomy for paid landing pages. No other event
 * name may be fired through this adapter (ARCHITECTURE.md Batch 12 §16).
 */
export const LANDING_EVENTS = [
  "landing_view",
  "cta_click",
  "whatsapp_click",
  "form_start",
  "form_submit_attempt",
  "generate_lead",
  "form_submit_error",
] as const;

export type LandingEventName = (typeof LANDING_EVENTS)[number];

export interface LandingEventParams {
  campaign?: string;
  page_path?: string;
  cta_label?: string;
  error_reason?: string;
  [key: string]: string | number | boolean | undefined;
}

// generate_lead must fire at most once per successfully delivered lead, even
// if a caller mistakenly invokes it twice for the same submission.
const dedupedEvents = new Set<string>();

function pushToGtm(eventName: LandingEventName, params: LandingEventParams) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, ...params });
}

function pushToGa4(eventName: LandingEventName, params: LandingEventParams) {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", eventName, params);
}

/**
 * Fires exactly one landing-page conversion event through whichever single
 * vendor is configured. In "none" mode (no ID configured — the current
 * production state), this only logs to the console in development so the
 * event flow can still be verified locally.
 *
 * `dedupeKey`: pass a stable, unique value (e.g. the server-confirmed lead
 * id) for events that must never double-fire, such as `generate_lead`.
 */
export function trackLandingEvent(
  eventName: LandingEventName,
  params: LandingEventParams = {},
  dedupeKey?: string
): void {
  if (typeof window === "undefined") return;

  if (dedupeKey) {
    const key = `${eventName}:${dedupeKey}`;
    if (dedupedEvents.has(key)) return;
    dedupedEvents.add(key);
  }

  const mode = getAnalyticsMode();

  if (process.env.NODE_ENV !== "production") {
    console.log(`[landing-analytics:${mode}] ${eventName}`, params);
  }

  if (mode === "gtm") {
    pushToGtm(eventName, params);
  } else if (mode === "ga4") {
    pushToGa4(eventName, params);
  }
  // mode === "none": no vendor call, event flow already logged above in dev.
}
