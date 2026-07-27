// =========================================
// ARKAVENA — Typed Content Queries
// =========================================

import type { CollectionName, ContentType } from "@/config/collections";
import type { ContentItem, ContentOfType } from "@/schemas/content-types";
import { getManifest } from "@/lib/content/manifest";
import { getRelatedContent } from "@/lib/content/relationships";
import { selectSitemapItems } from "@/lib/content/sitemap";

export function allContent(): ContentItem[] {
  return getManifest();
}

/** Everything in a collection, newest review first, then alphabetical. */
export function byCollection<T extends ContentType>(
  collection: CollectionName,
  type: T
): ContentOfType<T>[] {
  return getManifest()
    .filter(
      (item): item is ContentOfType<T> =>
        item.collection === collection && item.type === type
    )
    .sort((a, b) => {
      const reviewed = (b.lastReviewedAt ?? "").localeCompare(
        a.lastReviewedAt ?? ""
      );
      return reviewed !== 0 ? reviewed : a.slug.localeCompare(b.slug);
    });
}

export function bySlug<T extends ContentType>(
  collection: CollectionName,
  type: T,
  slug: string
): ContentOfType<T> | undefined {
  return byCollection(collection, type).find((item) => item.slug === slug);
}

export function byId(id: string): ContentItem | undefined {
  return getManifest().find((item) => item.id === id);
}

/** Routable slugs. Archived content stops being built. */
export function routableSlugs(
  collection: CollectionName,
  type: ContentType
): string[] {
  return byCollection(collection, type)
    .filter((item) => item.status !== "archived")
    .map((item) => item.slug);
}

/** Pages that may appear in listings, navigation and the sitemap. */
export function publicListing(
  collection: CollectionName,
  type: ContentType
): ContentItem[] {
  return byCollection(collection, type).filter((item) => item.isIndexable);
}

export function sitemapEligible(): ContentItem[] {
  return selectSitemapItems(getManifest());
}

export function relatedFor(item: ContentItem, limit = 4): ContentItem[] {
  return getRelatedContent(item, getManifest(), limit);
}
