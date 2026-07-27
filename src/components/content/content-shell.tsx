import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { BreadcrumbEntry, ContentItem } from "@/schemas/content-types";

/**
 * Breadcrumb trail for content routes. Deliberately emits no JSON-LD — the
 * BreadcrumbList node is part of the page graph built by schema-builders.
 */
export function ContentBreadcrumbs({ trail }: { trail: BreadcrumbEntry[] }) {
  // Homepage has no breadcrumb (ARCHITECTURE.md Batch 01 §14).
  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#68757D]">
        {trail.map((entry, index) => {
          const isLast = index === trail.length - 1;
          return (
            <React.Fragment key={entry.path}>
              {index > 0 && (
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
              )}
              <li>
                {isLast ? (
                  <span className="font-medium text-[#0E1B26]" aria-current="page">
                    {entry.name}
                  </span>
                ) : (
                  <Link href={entry.path} className="transition-colors hover:text-[#B88A4A]">
                    {entry.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Preview-only marker so unpublished content can never be mistaken for a live
 * page. Hidden on production deployments.
 */
export function DraftBadge({ item }: { item: ContentItem }) {
  const isProductionDeployment = process.env.VERCEL_ENV === "production";
  if (item.status === "published" || isProductionDeployment) return null;

  return (
    <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#A76B1F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#A76B1F]">
      Draft Preview · status {item.status} · noindex
    </p>
  );
}

export function ContentHero({ item }: { item: ContentItem }) {
  return (
    <header className="mb-10">
      <p className="text-xs font-bold uppercase tracking-wider text-[#B88A4A]">
        {item.hero.eyebrow}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-[#0E1B26] sm:text-4xl">
        {item.hero.heading}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#68757D]">
        {item.hero.summary}
      </p>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-[#E8DED0] bg-white">
        <Image
          src={item.hero.image}
          alt={item.hero.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />
      </div>
    </header>
  );
}

/** Key/value strip used by templates to surface collection-specific facts. */
export function FactList({
  title,
  entries,
}: {
  title: string;
  entries: { label: string; value: React.ReactNode }[];
}) {
  const visible = entries.filter((entry) => entry.value);
  if (visible.length === 0) return null;

  return (
    <section className="my-8 rounded-lg border border-[#E8DED0] bg-white p-6">
      <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0E1B26]">
        {title}
      </h2>
      <dl className="grid gap-4 sm:grid-cols-2">
        {visible.map((entry) => (
          <div key={entry.label}>
            <dt className="text-xs font-bold uppercase tracking-wider text-[#68757D]">
              {entry.label}
            </dt>
            <dd className="mt-1 text-[#26333C]">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#68757D]">{label}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((entry) => (
          <li
            key={entry}
            className="rounded-full border border-[#E8DED0] bg-white px-3 py-1 text-sm text-[#26333C]"
          >
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-12 lg:py-16">
      <article className="mx-auto w-full max-w-3xl">{children}</article>
    </Container>
  );
}
