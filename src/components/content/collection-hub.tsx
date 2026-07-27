import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ContentBreadcrumbs } from "@/components/content/content-shell";
import type { ContentItem } from "@/schemas/content-types";

export interface CollectionHubProps {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  label: string;
  items: ContentItem[];
}

/**
 * Hub listing for a collection. Only indexable content is listed — drafts never
 * surface in navigation or listings.
 */
export function CollectionHub({
  eyebrow,
  title,
  description,
  path,
  label,
  items,
}: CollectionHubProps) {
  return (
    <Container className="py-12 lg:py-16">
      <ContentBreadcrumbs
        trail={[
          { name: "Beranda", path: "/" },
          { name: label, path },
        ]}
      />

      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      {items.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-[#E8DED0] bg-white p-8 text-center text-[#68757D]">
          Belum ada halaman yang dipublikasikan pada koleksi ini.
        </p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
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
      )}
    </Container>
  );
}
