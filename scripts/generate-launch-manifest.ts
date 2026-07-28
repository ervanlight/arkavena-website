/**
 * Launch manifest generator (Batch 06 §6).
 *
 * Produces migration/launch-manifest.csv from the content manifest plus the
 * documented static/legacy routes that live outside it. This is the single
 * source of truth for "which pages are approved for the first production
 * launch" — never hand-edit the CSV.
 *
 * Indexability predicate mirrors src/lib/content/sitemap.ts exactly:
 *   status === "published" && isIndexable === true && ownerVerified === true
 *
 * Launch scope (owner decision, 2026-07-28, superseded incrementally by
 * subsequent owner approvals): the original first launch was the 37 pages
 * that were published+indexable+ownerVerified at the time — corporate/hub
 * pages, all 20 services, and the 6 P1 sectors. Since then the owner has
 * separately approved and promoted Batch 04B (8 P2 sectors), Batch 07A (9
 * Bangun Rumah guides), and Batch 08 (14 Renovasi Rumah guides), all of
 * which are already live in production. This script always reflects the
 * *current* published+indexable+ownerVerified set, not the original 37 —
 * "approved" here means "published and owner-verified right now", not "was
 * part of the original 2026-07-28 launch batch". Batch 05's location/project
 * drafts stay noindex regardless of this manifest.
 */

import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "../src/lib/content/loaders";
import { selectSitemapItems } from "../src/lib/content/sitemap";
import { STATIC_ROUTES } from "../src/config/redirects";

const MIGRATION_DIR = path.join(process.cwd(), "migration");
const MANIFEST_PATH = path.join(MIGRATION_DIR, "launch-manifest.csv");

/**
 * Static routes with hand-built pages entirely outside the content
 * manifest. Only "/portfolio" currently appears in sitemap.xml
 * (src/app/sitemap.ts LEGACY_ROUTES) — the rest have no explicit robots
 * directive (so they default to indexable) but are NOT sitemap-declared.
 * This is a documented pre-existing gap (see redirect-gap-report.md),
 * not something this script silently fixes — CLAUDE.md scopes their
 * eventual migration into /layanan, /sektor, /proyek as a separate batch.
 */
const STATIC_ROUTE_NOTES: Record<string, { indexable: boolean; inSitemap: boolean; note: string }> = {
  "/": { indexable: true, inSitemap: true, note: "Now served by src/app/page.tsx custom component (homepage restore); content/pages/home.mdx still drives metadata/sitemap." },
  "/portfolio": { indexable: true, inSitemap: true, note: "Legacy page, explicitly listed in src/app/sitemap.ts LEGACY_ROUTES." },
  "/residential": { indexable: true, inSitemap: false, note: "Pre-content-engine legacy page. No robots directive set (defaults indexable). NOT in sitemap.xml — pre-existing gap, owner decision needed. Migration into /layanan|/sektor is a separate future batch per CLAUDE.md." },
  "/assessment": { indexable: true, inSitemap: false, note: "Pre-content-engine legacy page. No robots directive set (defaults indexable). NOT in sitemap.xml — pre-existing gap." },
  "/trust-center": { indexable: true, inSitemap: false, note: "Pre-content-engine legacy page. No robots directive set (defaults indexable). NOT in sitemap.xml — pre-existing gap." },
  "/projectview": { indexable: true, inSitemap: false, note: "Pre-content-engine legacy demo page. No robots directive set (defaults indexable). NOT in sitemap.xml — pre-existing gap." },
  "/facility-care": { indexable: true, inSitemap: false, note: "Pre-content-engine legacy page. No robots directive set (defaults indexable). NOT in sitemap.xml — pre-existing gap. Migration into /layanan|/sektor is a separate future batch per CLAUDE.md." },
  "/terima-kasih": { indexable: false, inSitemap: false, note: "Thank-you page. Explicit robots noindex,follow — correct, excluded from sitemap by design." },
  "/kebijakan-privasi": { indexable: true, inSitemap: false, note: "Legal page. No robots directive set (defaults indexable). NOT in sitemap.xml." },
  "/syarat-ketentuan": { indexable: true, inSitemap: false, note: "Legal page. No robots directive set (defaults indexable). NOT in sitemap.xml." },
};

function csvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function main() {
  const { items } = loadAllContent();
  const sitemapRoutes = new Set(selectSitemapItems(items).map((item) => item.route));

  const rows: string[] = [
    "route,type,status,owner_verified,index_flag,collection_gate,sitemap_expected,navigation_visible,launch_decision,notes",
  ];

  const primaryNavHubs = new Set(["/layanan", "/sektor", "/wilayah", "/panduan", "/tentang", "/kontak"]);

  for (const item of [...items].sort((a, b) => a.route.localeCompare(b.route))) {
    const indexFlag = item.isIndexable;
    const inSitemap = sitemapRoutes.has(item.route);

    let collectionGate = "pass";
    if (item.type === "location" && item.status === "published" && !item.location.localFactsVerified) {
      collectionGate = "fail";
    }
    if (
      item.type === "project" &&
      item.status === "published" &&
      (!item.project.factsVerified || !item.project.clientPermission)
    ) {
      collectionGate = "fail";
    }

    const navVisible = primaryNavHubs.has(item.route) || (item.route === "/" ? true : false);

    let launchDecision = "excluded";
    let notes = "";
    if (item.status === "published" && item.ownerVerified && indexFlag && inSitemap) {
      launchDecision = "approved";
      notes = "Published and owner-verified — live in production.";
    } else if (item.type === "sector" && item.status === "review") {
      notes = "Sector still in review — excluded from launch until published and owner-verified.";
    } else if (item.type === "location" || item.type === "project") {
      notes = "Batch 05 draft — status: review, localFactsVerified/factsVerified false, stays noindex regardless of launch scope.";
    } else if (item.slug.startsWith("contoh-")) {
      notes = "Scaffold/example fixture, never intended to publish.";
    } else if (item.status === "review" || item.status === "draft") {
      notes = "Draft/review content, not owner-approved for launch.";
    }

    rows.push(
      [
        item.route,
        item.type,
        item.status,
        String(item.ownerVerified),
        String(indexFlag),
        collectionGate,
        String(inSitemap),
        String(navVisible),
        launchDecision,
        notes,
      ]
        .map(csvField)
        .join(",")
    );
  }

  // Static/legacy routes outside the content manifest (Batch 06 §16: must be
  // documented and included in the launch manifest and count equation).
  for (const route of STATIC_ROUTES) {
    if (route === "/") continue; // now content-manifest-backed (page-home)
    const info = STATIC_ROUTE_NOTES[route];
    if (!info) continue;
    rows.push(
      [
        route,
        "static-legacy",
        "live",
        "n/a",
        String(info.indexable),
        "n/a",
        String(info.inSitemap),
        String(primaryNavHubs.has(route)),
        info.indexable ? "approved" : "excluded",
        info.note,
      ]
        .map(csvField)
        .join(",")
    );
  }

  fs.mkdirSync(MIGRATION_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, rows.join("\n") + "\n", "utf8");

  const approved = rows.slice(1).filter((r) => r.includes(",approved,")).length;
  console.log(`✔ Launch manifest ditulis ke ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  console.log(`  ${rows.length - 1} baris total, ${approved} approved for launch`);
}

main();
