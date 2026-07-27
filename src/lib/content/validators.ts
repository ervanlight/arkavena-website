// =========================================
// ARKAVENA — Cross-file Content Validation
// =========================================
// Zod validates one file in isolation. Everything that requires seeing the
// whole corpus lives here (ARCHITECTURE.md §7.2).

import { COLLECTIONS } from "@/config/collections";
import { LEGACY_DOMAINS, STATIC_ROUTES, type RedirectEntry } from "@/config/redirects";
import type { ContentItem } from "@/schemas/content-types";

export type IssueSeverity = "error" | "warning";

export interface ValidationIssue {
  severity: IssueSeverity;
  rule: string;
  file: string;
  message: string;
}

const error = (
  rule: string,
  file: string,
  message: string
): ValidationIssue => ({ severity: "error", rule, file, message });

const warning = (
  rule: string,
  file: string,
  message: string
): ValidationIssue => ({ severity: "warning", rule, file, message });

/** Keywords are compared case- and whitespace-insensitively. */
export function normalizeKeyword(keyword: string): string {
  return keyword.trim().toLowerCase().replace(/\s+/g, " ");
}

export function validateUniqueness(items: ContentItem[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const byId = new Map<string, ContentItem>();
  const bySlug = new Map<string, ContentItem>();
  const byRoute = new Map<string, ContentItem>();
  const byKeyword = new Map<string, ContentItem>();

  for (const item of items) {
    const existingId = byId.get(item.id);
    if (existingId) {
      issues.push(
        error(
          "duplicate-id",
          item.sourcePath,
          `id "${item.id}" sudah dipakai oleh ${existingId.sourcePath}`
        )
      );
    } else {
      byId.set(item.id, item);
    }

    const slugKey = `${item.collection}:${item.slug}`;
    const existingSlug = bySlug.get(slugKey);
    if (existingSlug) {
      issues.push(
        error(
          "duplicate-slug",
          item.sourcePath,
          `slug "${item.slug}" sudah dipakai di koleksi ${item.collection} oleh ${existingSlug.sourcePath}`
        )
      );
    } else {
      bySlug.set(slugKey, item);
    }

    const existingRoute = byRoute.get(item.route);
    if (existingRoute) {
      issues.push(
        error(
          "duplicate-route",
          item.sourcePath,
          `canonical route "${item.route}" bentrok dengan ${existingRoute.sourcePath}`
        )
      );
    } else {
      byRoute.set(item.route, item);
    }

    if (item.status === "published" && item.primaryKeyword) {
      const key = normalizeKeyword(item.primaryKeyword);
      const existingKeyword = byKeyword.get(key);
      if (existingKeyword) {
        issues.push(
          error(
            "duplicate-primary-keyword",
            item.sourcePath,
            `primaryKeyword "${item.primaryKeyword}" sudah dimiliki ${existingKeyword.sourcePath} — kanibalisasi tidak diizinkan`
          )
        );
      } else {
        byKeyword.set(key, item);
      }
    }
  }

  return issues;
}

const RELATIONSHIP_FIELDS = [
  "services",
  "sectors",
  "locations",
  "guides",
  "projects",
  "pinnedRelated",
  "excludedRelated",
] as const;

export function validateRelationships(items: ContentItem[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const knownIds = new Set(items.map((item) => item.id));

  for (const item of items) {
    for (const field of RELATIONSHIP_FIELDS) {
      for (const referencedId of item.relationships[field]) {
        if (knownIds.has(referencedId)) continue;

        const message = `relationships.${field} menunjuk id "${referencedId}" yang tidak ada`;
        // Drafts are allowed to reference content that has not been written yet;
        // published pages are not (ARCHITECTURE.md §7.2).
        issues.push(
          item.status === "published"
            ? error("unresolved-relationship", item.sourcePath, message)
            : warning("unresolved-relationship", item.sourcePath, message)
        );
      }
    }

    if (item.relationships.pinnedRelated.includes(item.id)) {
      issues.push(
        error(
          "self-reference",
          item.sourcePath,
          "pinnedRelated tidak boleh berisi halaman itu sendiri"
        )
      );
    }
  }

  return issues;
}

/**
 * Every route the site can legitimately serve: manifest routes, collection
 * hubs, and the legacy static routes that are still live.
 */
export function knownRoutes(items: ContentItem[]): Set<string> {
  const routes = new Set<string>(STATIC_ROUTES);

  for (const definition of Object.values(COLLECTIONS)) {
    if (definition.hasHub && definition.routeBase) {
      routes.add(definition.routeBase);
    }
  }

  for (const item of items) routes.add(item.route);
  return routes;
}

export function validateInternalLinks(items: ContentItem[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const routes = knownRoutes(items);
  const routeById = new Map(items.map((item) => [item.route, item]));

  for (const item of items) {
    for (const link of item.internalLinks) {
      const target = link.replace(/\/$/, "") || "/";

      if (!routes.has(target)) {
        issues.push(
          error(
            "broken-internal-link",
            item.sourcePath,
            `Link internal "${link}" tidak menuju route yang tersedia`
          )
        );
        continue;
      }

      const targetItem = routeById.get(target);
      if (item.status === "published" && targetItem && !targetItem.isIndexable) {
        issues.push(
          warning(
            "link-to-non-indexable",
            item.sourcePath,
            `Halaman published menautkan "${link}" yang berstatus non-indexable`
          )
        );
      }
    }
  }

  return issues;
}

export function validateLegacyDomainLinks(
  items: ContentItem[],
  rawBodies: Map<string, string>
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const item of items) {
    const body = rawBodies.get(item.sourcePath);
    if (!body) continue;

    for (const domain of LEGACY_DOMAINS) {
      if (body.includes(domain)) {
        issues.push(
          error(
            "legacy-domain-link",
            item.sourcePath,
            `Konten menautkan domain lama "${domain}" — gunakan route Arkavena`
          )
        );
      }
    }
  }

  return issues;
}

/** Published pages must be reachable from at least one other published page. */
export function validateOrphans(
  items: ContentItem[],
  inboundCounts: Map<string, number>
): ValidationIssue[] {
  return items
    .filter((item) => item.isIndexable)
    .filter((item) => (inboundCounts.get(item.id) ?? 0) === 0)
    .map((item) =>
      error(
        "orphan-page",
        item.sourcePath,
        "Halaman published tidak memiliki inbound internal link"
      )
    );
}

export function validateRedirects(
  entries: RedirectEntry[],
  routes: Set<string>
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const sources = new Map<string, RedirectEntry>();

  for (const entry of entries) {
    if (sources.has(entry.source)) {
      issues.push(
        error(
          "duplicate-redirect",
          "config/redirects.ts",
          `Source "${entry.source}" didefinisikan lebih dari sekali`
        )
      );
    }
    sources.set(entry.source, entry);
  }

  for (const entry of entries) {
    if (entry.source === entry.destination) {
      issues.push(
        error(
          "redirect-loop",
          "config/redirects.ts",
          `Redirect "${entry.source}" menunjuk ke dirinya sendiri`
        )
      );
      continue;
    }

    if (sources.has(entry.destination)) {
      issues.push(
        error(
          "redirect-chain",
          "config/redirects.ts",
          `Destination "${entry.destination}" juga merupakan source redirect — rantai tidak diizinkan`
        )
      );
    }

    // Walk the chain to catch indirect loops.
    const seen = new Set<string>([entry.source]);
    let cursor = sources.get(entry.destination);
    while (cursor) {
      if (seen.has(cursor.source)) {
        issues.push(
          error(
            "redirect-loop",
            "config/redirects.ts",
            `Redirect loop terdeteksi mulai dari "${entry.source}"`
          )
        );
        break;
      }
      seen.add(cursor.source);
      cursor = sources.get(cursor.destination);
    }

    if (!routes.has(entry.destination)) {
      issues.push(
        error(
          "redirect-destination-missing",
          "config/redirects.ts",
          `Destination "${entry.destination}" bukan route produksi yang valid`
        )
      );
    }
  }

  return issues;
}

/** Guards the sitemap contract itself, independent of how it is built. */
export function validateSitemapEligibility(
  items: ContentItem[],
  sitemapRoutes: string[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const byRoute = new Map(items.map((item) => [item.route, item]));

  for (const route of sitemapRoutes) {
    const item = byRoute.get(route);
    if (!item) continue;

    if (item.status !== "published") {
      issues.push(
        error(
          "sitemap-includes-unpublished",
          item.sourcePath,
          `Route "${route}" berstatus ${item.status} tetapi masuk sitemap`
        )
      );
    }

    if (!item.isIndexable) {
      issues.push(
        error(
          "sitemap-includes-noindex",
          item.sourcePath,
          `Route "${route}" non-indexable tetapi masuk sitemap`
        )
      );
    }
  }

  return issues;
}
