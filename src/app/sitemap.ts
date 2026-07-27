import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/canonical";
import { sitemapEligible } from "@/lib/content/queries";

/**
 * Routes that still serve hand-built pages entirely outside the content
 * manifest. "/" moved into content/pages/home.mdx in Batch 01 and must NOT
 * be listed here — a hardcoded entry would bypass its own published/
 * ownerVerified gate. Same reasoning applies to /layanan, /sektor, /wilayah,
 * /panduan, /proyek: they are now real "pages" collection entries and are
 * only ever included via sitemapEligible() below, never via a "has children"
 * heuristic — a hub with unpublished child content is not itself published.
 */
const LEGACY_ROUTES: { path: string; priority: number }[] = [
  { path: "/portfolio", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const legacy: MetadataRoute.Sitemap = LEGACY_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  /**
   * Content entries. `sitemapEligible` already enforces the three gates from
   * ARCHITECTURE.md §12.3: published, indexable, owner-verified. Drafts,
   * review, archived and every /lp/* route are excluded by construction —
   * this covers the homepage, every corporate page, and every hub uniformly.
   */
  const content: MetadataRoute.Sitemap = sitemapEligible().map((item) => ({
    url: absoluteUrl(item.route),
    lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
    changeFrequency: item.type === "guide" ? "monthly" : "weekly",
    priority: item.route === "/" ? 1 : item.type === "service" ? 0.9 : 0.7,
  }));

  return [...legacy, ...content];
}
