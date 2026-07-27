import * as React from "react";
import Link from "next/link";
import type { ContentItem } from "@/schemas/content-types";

export interface ChildContentGridProps {
  title: string;
  items: ContentItem[];
}

/**
 * Dynamic child-page grid for hub pages (/layanan, /sektor, /wilayah,
 * /panduan, /proyek). Renders nothing when there are no published, indexable
 * children yet — never an empty grid or a "0 items" placeholder
 * (ARCHITECTURE.md Batch 01 §9). The hub's MDX body supplies the meaningful
 * fallback content (category lists, explanatory copy) while this list is
 * empty; this component starts rendering automatically once real child
 * pages are published in later batches, with no further code changes.
 */
export function ChildContentGrid({ title, items }: ChildContentGridProps) {
  if (items.length === 0) return null;

  return (
    <section className="my-10">
      <h2 className="mb-5 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0E1B26]">
        {title}
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.route}
              className="block h-full rounded-lg border border-[#E8DED0] bg-white p-6 transition-colors hover:border-[#B88A4A]/40"
            >
              <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0E1B26]">
                {item.title}
              </span>
              <span className="mt-2 block leading-relaxed text-[#68757D]">
                {item.excerpt}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
