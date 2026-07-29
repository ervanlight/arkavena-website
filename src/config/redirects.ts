// =========================================
// ARKAVENA — Redirect Map
// =========================================
// ARCHITECTURE.md §6.1 / §13: any published slug change requires a redirect.
// Rules enforced by tests/redirects.test.ts and scripts/generate-redirect-report.ts:
//   - no loops (a source may never equal its own destination, directly or transitively)
//   - no chains (a destination may never itself be a redirect source)
//   - destinations must be real production routes
//
// NOTE: /facility-care/*, /portfolio, /assessment are legacy Arkavena routes
// that are still intentionally NOT redirected — no owner-approved cutover yet.
// /facility-care/* instead carries noindex + a canonical pointing at
// /layanan/building-maintenance (audit finding I1, owner decision 2026-07-29:
// no 1:1 replacement content exists yet for its 4 sub-pages, so a redirect
// would lose real content rather than replace it).
//
// /residential/* WAS in that same intentionally-not-redirected state until
// the owner approved the cutover on 2026-07-29 (audit finding I1) — it now
// redirects to its /layanan equivalents below, and the old page files were
// deleted.

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

export const redirects: RedirectEntry[] = [
  {
    source: "/residential",
    destination: "/layanan",
    permanent: true,
    reason:
      "Legacy residential hub cut over to /layanan (audit finding I1, owner-approved 2026-07-29): duplicated the new services hub with no distinct content of its own.",
  },
  {
    source: "/residential/bangun-rumah-surabaya",
    destination: "/layanan/bangun-rumah",
    permanent: true,
    reason:
      "Cannibalized /layanan/bangun-rumah in search results (audit finding I1, owner-approved 2026-07-29). No content lost: /layanan/bangun-rumah covers the same service with verified, current claims.",
  },
  {
    source: "/residential/renovasi-rumah-surabaya",
    destination: "/layanan/renovasi-rumah",
    permanent: true,
    reason:
      "Cannibalized /layanan/renovasi-rumah in search results (audit finding I1, owner-approved 2026-07-29).",
  },
  {
    source: "/residential/tambah-lantai-rumah",
    destination: "/layanan/renovasi-rumah",
    permanent: true,
    reason:
      "No dedicated 'add a floor' service page exists; svc-renovasi-rumah is the closest real equivalent and already covers this via guide-renovasi-rumah-satu-jadi-dua-lantai (owner-approved 2026-07-29).",
  },
];

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
