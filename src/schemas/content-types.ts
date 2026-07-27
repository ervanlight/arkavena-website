// =========================================
// ARKAVENA — Generated Content Types
// =========================================
// A ContentItem is editor-authored frontmatter PLUS the fields the application
// layer derives. Editors never author the derived half (ARCHITECTURE.md §8.1).

import type { CollectionName, ContentType } from "@/config/collections";
import type { Frontmatter } from "@/schemas/frontmatter";

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export interface DerivedFields {
  /** Directory the file was loaded from — authoritative for collection type. */
  collection: CollectionName;
  /**
   * Public route, generated from collection + slug. Never editor-authored.
   * The absolute canonical URL is deliberately NOT stored here: it is derived
   * at render time from the site origin so the manifest can never disagree
   * with the environment the page is actually served from.
   */
  route: string;
  /** Repository-relative source path, for error messages and audits. */
  sourcePath: string;
  /** Breadcrumb trail derived from route hierarchy. */
  breadcrumb: BreadcrumbEntry[];
  /** Body word count, excluding frontmatter. */
  wordCount: number;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  /** Whether search engines may index this route. */
  isIndexable: boolean;
  /** Whether search engines may follow links on this route. */
  isFollowable: boolean;
  /** Internal links found in the MDX body, used by validate-links. */
  internalLinks: string[];
}

export type ContentItem = Frontmatter & DerivedFields;

export type ContentManifest = ContentItem[];

/** Narrowing helpers — templates rely on these instead of casting. */
export type ContentOfType<T extends ContentType> = Extract<
  ContentItem,
  { type: T }
>;

export type ServiceItem = ContentOfType<"service">;
export type SectorItem = ContentOfType<"sector">;
export type LocationItem = ContentOfType<"location">;
export type GuideItem = ContentOfType<"guide">;
export type ProjectItem = ContentOfType<"project">;
export type LandingItem = ContentOfType<"landing">;
export type PageItem = ContentOfType<"page">;

export interface LinkGraphNode {
  id: string;
  route: string;
  type: ContentType;
  outbound: string[];
  inbound: string[];
  related: { id: string; score: number }[];
}

export interface LinkGraph {
  generatedAt: string;
  nodes: Record<string, LinkGraphNode>;
}
