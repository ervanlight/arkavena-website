// =========================================
// ARKAVENA — Redirect Map
// =========================================
// ARCHITECTURE.md §6.1 / §13: any published slug change requires a redirect.
// Rules enforced by tests/redirects.test.ts and scripts/generate-redirect-report.ts:
//   - no loops (a source may never equal its own destination, directly or transitively)
//   - no chains (a destination may never itself be a redirect source)
//   - destinations must be real production routes
//
// NOTE: legacy Arkavena routes that are currently live (/residential/*,
// /facility-care/*, /portfolio, /assessment) are intentionally NOT redirected
// yet. They keep serving their existing pages until replacement content exists
// and the owner approves the cutover.

export interface RedirectEntry {
  source: string;
  destination: string;
  permanent: boolean;
  /** Why this redirect exists — kept for the migration audit trail. */
  reason: string;
  /**
   * Batch 06 §10.2: old-domain path redirects must be host-scoped, or a rule
   * like `/jasa-bangun-rumah -> /layanan/bangun-rumah` would also fire for
   * that path on arkavena.com itself if it were ever requested there. Leave
   * unset for same-domain slug-rename redirects, which should apply
   * regardless of host.
   */
  host?: (typeof LEGACY_DOMAINS)[number];
}

export const redirects: RedirectEntry[] = [];

/**
 * Domains the site has moved away from. Internal links must never point at
 * these — link validation treats a hit as a build failure (ARCHITECTURE.md §7.2).
 */
export const LEGACY_DOMAINS = [
  "tegakara-website.vercel.app",
  "tegakara.com",
] as const;

/** Routes that exist outside the content manifest but are valid redirect targets. */
export const STATIC_ROUTES = [
  "/",
  "/tentang",
  "/cara-kerja",
  "/kontak",
  "/portfolio",
  "/assessment",
  "/trust-center",
  "/projectview",
  "/residential",
  "/facility-care",
  "/terima-kasih",
  "/kebijakan-privasi",
  "/syarat-ketentuan",
] as const;

/**
 * Shape Next.js's `redirects()` expects. Shared by next.config.ts and tests
 * so there is exactly one place that turns a `host` field into the `has`
 * matcher (ARCHITECTURE.md Batch 06 §10.2/§10.5 — no hand-edited duplicate
 * of the generated config).
 */
export function toNextRedirect(entry: RedirectEntry): {
  source: string;
  destination: string;
  permanent: boolean;
  has?: { type: "host"; value: string }[];
} {
  const { source, destination, permanent, host } = entry;
  return {
    source,
    destination,
    permanent,
    ...(host ? { has: [{ type: "host" as const, value: host }] } : {}),
  };
}
