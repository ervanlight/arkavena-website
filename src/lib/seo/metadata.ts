// =========================================
// ARKAVENA — Metadata Generator
// =========================================
// One function owns <title>, description, canonical, robots, Open Graph and
// Twitter for every content route (ARCHITECTURE.md §12.2).

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl, canonicalOf } from "@/lib/seo/canonical";
import type { ContentItem } from "@/schemas/content-types";

/** Rendered by app/opengraph-image.tsx when a page has no dedicated image. */
export const DEFAULT_OG_IMAGE = "/opengraph-image";

export function resolveOgImage(image?: string | null): string {
  return image && image.trim() !== "" ? image : DEFAULT_OG_IMAGE;
}

export function buildTitle(item: {
  seoTitle?: string | null;
  title: string;
}): string {
  const override = item.seoTitle?.trim();
  return override && override !== ""
    ? override
    : `${item.title} | ${siteConfig.brandName}`;
}

export interface RobotsDirective {
  index: boolean;
  follow: boolean;
}

export function buildRobots(item: Pick<ContentItem, "isIndexable" | "isFollowable">): RobotsDirective {
  return { index: item.isIndexable, follow: item.isFollowable };
}

export function buildMetadata(item: ContentItem): Metadata {
  const title = buildTitle(item);
  const canonical = canonicalOf(item);
  const robots = buildRobots(item);
  const ogImage = resolveOgImage(item.hero.image);

  return {
    // `absolute` bypasses the root layout title template so the brand suffix
    // is never applied twice.
    title: { absolute: title },
    description: item.description,
    alternates: { canonical },
    robots: {
      index: robots.index,
      follow: robots.follow,
      googleBot: { index: robots.index, follow: robots.follow },
    },
    openGraph: {
      type: item.type === "guide" ? "article" : "website",
      locale: "id_ID",
      siteName: siteConfig.brandName,
      title,
      description: item.description,
      url: canonical,
      images: [
        {
          url: absoluteUrl(ogImage),
          alt: item.hero.imageAlt,
        },
      ],
      ...(item.type === "guide" && item.publishedAt
        ? {
            publishedTime: item.publishedAt,
            modifiedTime: item.updatedAt ?? item.publishedAt,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: item.description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

/** Metadata for collection hub pages, which are not backed by an MDX file. */
export function buildHubMetadata(options: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const index = options.index ?? true;
  const url = absoluteUrl(options.path);

  return {
    title: { absolute: `${options.title} | ${siteConfig.brandName}` },
    description: options.description,
    alternates: { canonical: url },
    robots: {
      index,
      follow: true,
      googleBot: { index, follow: true },
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: siteConfig.brandName,
      title: `${options.title} | ${siteConfig.brandName}`,
      description: options.description,
      url,
      images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), alt: siteConfig.brandName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${options.title} | ${siteConfig.brandName}`,
      description: options.description,
    },
  };
}
