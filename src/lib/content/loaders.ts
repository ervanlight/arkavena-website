// =========================================
// ARKAVENA — MDX Loaders (Node only)
// =========================================
// Filesystem access lives here and nowhere else. The Next.js app never reads
// MDX at request time — it consumes the generated manifest instead.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  COLLECTIONS,
  COLLECTION_NAMES,
  CONTENT_ROOT,
  type CollectionName,
  collectionForType,
  routeForContent,
} from "@/config/collections";
import { frontmatterSchema } from "@/schemas/frontmatter";
import type {
  BreadcrumbEntry,
  ContentItem,
  DerivedFields,
} from "@/schemas/content-types";

export interface LoadIssue {
  file: string;
  field: string;
  message: string;
}

export interface LoadResult {
  items: ContentItem[];
  issues: LoadIssue[];
}

export const contentDir = (collection: CollectionName) =>
  path.join(process.cwd(), CONTENT_ROOT, collection);

/** Markdown links and raw anchors pointing at an internal path. */
const MARKDOWN_LINK = /\]\((\/[^)\s]*)\)/g;
const HREF_ATTRIBUTE = /href=["'](\/[^"']*)["']/g;

function extractInternalLinks(body: string): string[] {
  const found = new Set<string>();
  for (const match of body.matchAll(MARKDOWN_LINK)) found.add(match[1]);
  for (const match of body.matchAll(HREF_ATTRIBUTE)) found.add(match[1]);
  return [...found].map((href) => href.split("#")[0].split("?")[0]).filter(Boolean);
}

function buildBreadcrumb(
  type: ContentItem["type"],
  slug: string,
  title: string
): BreadcrumbEntry[] {
  const definition = collectionForType(type);
  const trail: BreadcrumbEntry[] = [{ name: "Beranda", path: "/" }];

  if (definition.routeBase) {
    trail.push({ name: definition.label, path: definition.routeBase });
  }

  trail.push({ name: title, path: routeForContent(type, slug) });
  return trail;
}

function deriveIndexability(
  data: ContentItem | (ContentItem & Record<string, unknown>)
): { isIndexable: boolean; isFollowable: boolean } {
  const definition = collectionForType(data.type);

  if (definition.neverIndexable) {
    return {
      isIndexable: false,
      isFollowable: data.type === "landing" ? data.landing.follow : true,
    };
  }

  let indexable = data.status === "published" && data.ownerVerified;

  if (data.type === "location" && !data.location.localFactsVerified) {
    indexable = false;
  }
  if (
    data.type === "project" &&
    (!data.project.factsVerified || !data.project.clientPermission)
  ) {
    indexable = false;
  }

  return { isIndexable: indexable, isFollowable: data.status !== "archived" };
}

/**
 * Read and validate a single MDX file. Returns either a fully derived
 * ContentItem or the list of reasons it was rejected.
 */
export function loadContentFile(
  collection: CollectionName,
  fileName: string
): { item?: ContentItem; issues: LoadIssue[] } {
  const relativePath = path.join(CONTENT_ROOT, collection, fileName);
  const absolutePath = path.join(process.cwd(), relativePath);
  const raw = fs.readFileSync(absolutePath, "utf8");
  const parsed = matter(raw);

  const result = frontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    return {
      issues: result.error.issues.map((issue) => ({
        file: relativePath,
        field: issue.path.join(".") || "(root)",
        message: issue.message,
      })),
    };
  }

  const frontmatter = result.data;
  const issues: LoadIssue[] = [];
  const expectedType = COLLECTIONS[collection].type;
  const fileSlug = fileName.replace(/\.mdx$/, "");

  if (frontmatter.type !== expectedType) {
    issues.push({
      file: relativePath,
      field: "type",
      message: `Folder "${collection}" mengharuskan type "${expectedType}", ditemukan "${frontmatter.type}"`,
    });
  }

  if (frontmatter.slug !== fileSlug) {
    issues.push({
      file: relativePath,
      field: "slug",
      message: `Nama file harus sama dengan slug. File "${fileSlug}", slug "${frontmatter.slug}"`,
    });
  }

  if (issues.length > 0) return { issues };

  const stats = readingTime(parsed.content);
  const route = routeForContent(frontmatter.type, frontmatter.slug);
  const indexability = deriveIndexability(frontmatter as ContentItem);

  const derived: DerivedFields = {
    collection,
    route,
    sourcePath: relativePath,
    breadcrumb: buildBreadcrumb(
      frontmatter.type,
      frontmatter.slug,
      frontmatter.title
    ),
    wordCount: stats.words,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    internalLinks: extractInternalLinks(parsed.content),
    ...indexability,
  };

  return { item: { ...frontmatter, ...derived } as ContentItem, issues: [] };
}

/** Read every MDX file across every collection. */
export function loadAllContent(): LoadResult {
  const items: ContentItem[] = [];
  const issues: LoadIssue[] = [];

  for (const collection of COLLECTION_NAMES) {
    const dir = contentDir(collection);
    if (!fs.existsSync(dir)) continue;

    const files = fs
      .readdirSync(dir)
      .filter((name) => name.endsWith(".mdx"))
      .sort();

    for (const fileName of files) {
      const result = loadContentFile(collection, fileName);
      if (result.item) items.push(result.item);
      issues.push(...result.issues);
    }
  }

  return { items, issues };
}
