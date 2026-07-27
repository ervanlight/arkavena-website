// =========================================
// ARKAVENA — Sitemap Selection
// =========================================
// Pure selector so the sitemap contract can be tested without rendering a route.

import type { ContentItem } from "@/schemas/content-types";

/**
 * The three gates from ARCHITECTURE.md §12.3. Landing pages and unverified
 * location/project pages are already non-indexable, so they never reach here.
 */
export function selectSitemapItems(items: ContentItem[]): ContentItem[] {
  return items
    .filter((item) => item.status === "published")
    .filter((item) => item.isIndexable)
    .filter((item) => item.ownerVerified)
    .sort((a, b) => a.route.localeCompare(b.route));
}
