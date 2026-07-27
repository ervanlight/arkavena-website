// =========================================
// ARKAVENA — Canonical URL Construction
// =========================================
// Canonicals are derived from the collection route and slug. Editors may not
// author a canonical path (ARCHITECTURE.md §8.1, §12.2).

import { routeForContent, type ContentType } from "@/config/collections";
import { siteConfig } from "@/config/site";

export function siteOrigin(): string {
  return siteConfig.domain.replace(/\/+$/, "");
}

export function absoluteUrl(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteOrigin()}${normalized === "/" ? "" : normalized}` || siteOrigin();
}

export function canonicalFor(type: ContentType, slug: string): string {
  return absoluteUrl(routeForContent(type, slug));
}

/**
 * Canonical URL for a manifest entry. Always derived at render time so the
 * generated manifest can never carry a stale origin.
 */
export function canonicalOf(item: { route: string }): string {
  return absoluteUrl(item.route);
}
