// =========================================
// ARKAVENA — Content Collection Registry
// =========================================
// Single source of truth mapping content directories to public routes.
// ARCHITECTURE.md §5.1, §6, §6.1. Adding a collection here is the ONLY
// supported way to introduce a new public content route.

export const COLLECTION_NAMES = [
  "pages",
  "services",
  "sectors",
  "locations",
  "guides",
  "projects",
  "landing",
] as const;

export type CollectionName = (typeof COLLECTION_NAMES)[number];

export const CONTENT_TYPES = [
  "page",
  "service",
  "sector",
  "location",
  "guide",
  "project",
  "landing",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export interface CollectionDefinition {
  /** Directory name under /content */
  dir: CollectionName;
  /** Value the `type` frontmatter field must carry for this directory */
  type: ContentType;
  /** Route prefix. Empty string means the slug sits at the site root. */
  routeBase: string;
  /** Immutable ID namespace (ARCHITECTURE.md §6.1) */
  idPrefix: string;
  /** Human label used in breadcrumbs and hub pages */
  label: string;
  /** Whether a hub page (/layanan, /sektor, ...) exists for this collection */
  hasHub: boolean;
  /** Collections that can never be indexed regardless of status */
  neverIndexable: boolean;
}

export const COLLECTIONS: Record<CollectionName, CollectionDefinition> = {
  pages: {
    dir: "pages",
    type: "page",
    routeBase: "",
    idPrefix: "page-",
    label: "Halaman",
    hasHub: false,
    neverIndexable: false,
  },
  services: {
    dir: "services",
    type: "service",
    routeBase: "/layanan",
    idPrefix: "svc-",
    label: "Layanan",
    hasHub: true,
    neverIndexable: false,
  },
  sectors: {
    dir: "sectors",
    type: "sector",
    routeBase: "/sektor",
    idPrefix: "sec-",
    label: "Sektor",
    hasHub: true,
    neverIndexable: false,
  },
  locations: {
    dir: "locations",
    type: "location",
    routeBase: "/wilayah",
    idPrefix: "loc-",
    label: "Wilayah",
    hasHub: true,
    neverIndexable: false,
  },
  guides: {
    dir: "guides",
    type: "guide",
    routeBase: "/panduan",
    idPrefix: "guide-",
    label: "Panduan",
    hasHub: true,
    neverIndexable: false,
  },
  projects: {
    dir: "projects",
    type: "project",
    routeBase: "/proyek",
    idPrefix: "project-",
    label: "Proyek",
    hasHub: true,
    neverIndexable: false,
  },
  landing: {
    dir: "landing",
    type: "landing",
    routeBase: "/lp",
    idPrefix: "lp-",
    label: "Landing",
    hasHub: false,
    neverIndexable: true,
  },
};

const TYPE_TO_COLLECTION = Object.fromEntries(
  COLLECTION_NAMES.map((name) => [COLLECTIONS[name].type, name])
) as Record<ContentType, CollectionName>;

export function collectionForType(type: ContentType): CollectionDefinition {
  return COLLECTIONS[TYPE_TO_COLLECTION[type]];
}

/**
 * Canonical path for a content item. Route is derived by the application
 * layer only — editors may never author a canonical path (ARCHITECTURE.md §8.1).
 */
export function routeForContent(type: ContentType, slug: string): string {
  const { routeBase } = collectionForType(type);
  return `${routeBase}/${slug}`;
}

/** Directory on disk, relative to the repository root. */
export const CONTENT_ROOT = "content";
