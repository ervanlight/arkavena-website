import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
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
 * Marker so unpublished content can never be mistaken for a live, verified
 * page. Batch 05 defect fix: this used to hide itself on production
 * deployments (`VERCEL_ENV === "production"`), on the assumption that draft
 * content would only ever be reached through a Vercel Preview URL. That
 * assumption breaks once a batch merges review-status pages to `main` and
 * deploys them to production directly-accessible-but-noindex (as opposed to
 * indexed/published) — the badge must render in every environment whenever
 * the page is not published, so a draft is never visually indistinguishable
 * from an approved page.
 */
export function DraftBadge({ item }: { item: ContentItem }) {
  if (item.status === "published") return null;

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

/**
 * Key/value strip used by templates to surface collection-specific facts,
 * with an optional set of tag groups (audience, coverage area, use cases…)
 * folded into the same card. Facts and tags describe the same "at a glance"
 * summary; rendering them as two visually unrelated blocks (one boxed, one
 * not) read as two different kinds of information when they are not.
 */
export function FactList({
  title,
  entries,
  tags,
}: {
  title: string;
  entries: { label: string; value: React.ReactNode }[];
  tags?: { label: string; items: readonly string[] }[];
}) {
  const visibleEntries = entries.filter((entry) => entry.value);
  const visibleTags = (tags ?? []).filter((tag) => tag.items.length > 0);
  if (visibleEntries.length === 0 && visibleTags.length === 0) return null;

  return (
    <section className="my-8 rounded-lg border border-[#E8DED0] bg-white p-6">
      <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0E1B26]">
        {title}
      </h2>
      {visibleEntries.length > 0 && (
        <dl className="grid gap-4 sm:grid-cols-2">
          {visibleEntries.map((entry) => (
            <div key={entry.label}>
              <dt className="text-xs font-bold uppercase tracking-wider text-[#68757D]">
                {entry.label}
              </dt>
              <dd className="mt-1 text-[#26333C]">{entry.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {visibleTags.length > 0 && (
        <div
          className={cn(
            "grid gap-4",
            visibleTags.length > 1 && "sm:grid-cols-2",
            visibleEntries.length > 0 && "mt-6 border-t border-[#E8DED0] pt-6"
          )}
        >
          {visibleTags.map((tag) => (
            <TagList key={tag.label} label={tag.label} items={tag.items} />
          ))}
        </div>
      )}
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
    // pt-24/lg:pt-28 clears the fixed header (~64-72px tall depending on
    // breakpoint) with margin to spare — without this, the header overlapped
    // the breadcrumb and hero on every content page (audit finding C5).
    <Container className="pt-24 pb-12 lg:pt-28 lg:pb-16">
      <article className="mx-auto w-full max-w-3xl">{children}</article>
    </Container>
  );
}
