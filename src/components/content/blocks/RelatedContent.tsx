import * as React from "react";
import Link from "next/link";
import { collectionForType } from "@/config/collections";
import { byId } from "@/lib/content/queries";
import type { ContentItem } from "@/schemas/content-types";

export interface RelatedContentProps {
  title?: string;
  /** Pre-computed items, supplied by a template. */
  items?: ContentItem[];
  /** Explicit content IDs, used when the block is placed inside MDX. */
  ids?: string[];
}

/**
 * Related links are rendered as crawlable anchors with descriptive text.
 * Nothing is injected into body paragraphs automatically (ARCHITECTURE.md §11).
 */
export function RelatedContent({
  title = "Konten terkait",
  items,
  ids,
}: RelatedContentProps) {
  const resolved =
    items ??
    (ids ?? [])
      .map((id) => byId(id))
      .filter((item): item is ContentItem => Boolean(item) && item!.isIndexable);

  if (resolved.length === 0) return null;

  return (
    <nav aria-label={title} className="my-10">
      <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0E1B26]">
        {title}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {resolved.map((item) => (
          <li key={item.id}>
            <Link
              href={item.route}
              className="block h-full rounded-lg border border-[#E8DED0] bg-white p-5 transition-colors hover:border-[#B88A4A]/40"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#B88A4A]">
                {collectionForType(item.type).label}
              </span>
              <span className="mt-1 block font-semibold text-[#0E1B26]">
                {item.title}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-[#68757D]">
                {item.excerpt}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
