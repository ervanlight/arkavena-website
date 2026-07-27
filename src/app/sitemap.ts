import type { MetadataRoute } from "next";
import { COLLECTIONS } from "@/config/collections";
import { absoluteUrl } from "@/lib/seo/canonical";
import { publicListing, sitemapEligible } from "@/lib/content/queries";

/**
 * Legacy routes that still serve hand-built pages and are not part of the
 * content manifest yet. They move into the manifest as they are migrated.
 */
const LEGACY_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
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

  // A hub only enters the sitemap once it actually lists published content.
  const hubs: MetadataRoute.Sitemap = Object.values(COLLECTIONS)
    .filter((definition) => definition.hasHub && definition.routeBase)
    .filter(
      (definition) => publicListing(definition.dir, definition.type).length > 0
    )
    .map((definition) => ({
      url: absoluteUrl(definition.routeBase),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  /**
   * Content entries. `sitemapEligible` already enforces the three gates from
   * ARCHITECTURE.md §12.3: published, indexable, owner-verified. Drafts,
   * review, archived and every /lp/* route are excluded by construction.
   */
  const content: MetadataRoute.Sitemap = sitemapEligible().map((item) => ({
    url: absoluteUrl(item.route),
    lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
    changeFrequency: item.type === "guide" ? "monthly" : "weekly",
    priority: item.type === "service" ? 0.9 : 0.7,
  }));

  return [...legacy, ...hubs, ...content];
}
