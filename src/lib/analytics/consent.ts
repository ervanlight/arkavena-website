// =========================================
// ARKAVENA — Cookie Consent State
// =========================================
// Single source of truth for the site's analytics consent decision. Used by
// CookieConsent (the banner) and AnalyticsScripts (the actual GTM/GA4
// loader) so the two never disagree about whether the visitor has consented
// (audit finding I4, 2026-07-29).

export const CONSENT_STORAGE_KEY = "arkavena_cookie_consent";
export const CONSENT_CHANGED_EVENT = "arkavena:consent-changed";

export type ConsentState = "granted" | "denied" | "unset";

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw === "true") return "granted";
  if (raw === "false") return "denied";
  return "unset";
}

/**
 * Persists the visitor's choice and notifies same-tab listeners (like
 * AnalyticsScripts) immediately — a plain localStorage write only fires the
 * "storage" event in *other* tabs, so a same-tab listener would otherwise
 * never see "Terima" take effect without a page reload.
 */
export function setConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, granted ? "true" : "false");
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

/**
 * Whether any analytics vendor is configured at all. Mirrors the exact
 * precedence root layout.tsx uses to decide which script to load — GTM wins
 * if both are set, and only one is ever loaded (never both).
 */
export function isAnalyticsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_GTM_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  );
}
