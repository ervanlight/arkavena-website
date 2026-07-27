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
}

export const redirects: RedirectEntry[] = [];

/**
 * Domains the site has moved away from. Internal links must never point at
 * these — link validation treats a hit as a build failure (ARCHITECTURE.md §7.2).
 */
export const LEGACY_DOMAINS = [
  "manajemenkonstruksi.id",
  "www.manajemenkonstruksi.id",
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
