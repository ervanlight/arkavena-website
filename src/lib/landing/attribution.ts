// =========================================
// ARKAVENA — Campaign Attribution Store
// =========================================
// Captures and preserves campaign attribution across a landing-page session
// (Batch 12 §17-18). sessionStorage only — no cookies, since no separate
// consent decision for cookie-based tracking has been made. Only an
// allowlisted set of non-PII parameters is ever stored.

const STORAGE_KEY = "arkavena_lp_attribution";

/** Allowlisted query params. Anything else is dropped, never stored. */
const ALLOWED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type AllowedParam = (typeof ALLOWED_PARAMS)[number];

export type CampaignAttribution = Partial<Record<AllowedParam, string>> & {
  /** Landing slug the session first entered on. */
  landingPage?: string;
  /** ISO timestamp of first capture. */
  firstSeenAt?: string;
};

/**
 * Reads allowlisted params from a URL's query string and merges them into
 * whatever attribution is already stored for this session — first-touch
 * values win for each field so mid-session navigation never overwrites the
 * original campaign attribution.
 */
export function captureAttribution(
  search: string,
  landingPage: string
): CampaignAttribution {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(search);
  const captured: CampaignAttribution = {};

  for (const key of ALLOWED_PARAMS) {
    const value = params.get(key);
    if (value && value.trim() !== "") {
      captured[key] = value.trim();
    }
  }

  const existing = readAttribution();

  const merged: CampaignAttribution = {
    ...captured,
    ...existing,
    landingPage: existing.landingPage ?? landingPage,
    firstSeenAt: existing.firstSeenAt ?? new Date().toISOString(),
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage unavailable (private mode, quota) — attribution is
    // best-effort only and never blocks the page from working.
  }

  return merged;
}

export function readAttribution(): CampaignAttribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CampaignAttribution) : {};
  } catch {
    return {};
  }
}

export { ALLOWED_PARAMS };
