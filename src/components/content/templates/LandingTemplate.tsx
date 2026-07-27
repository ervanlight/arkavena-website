import * as React from "react";
import { Container } from "@/components/ui/container";
import { DraftBadge } from "@/components/content/content-shell";
import { CTA } from "@/components/content/blocks/CTA";
import { FAQList } from "@/components/content/blocks/FAQList";
import type { LandingItem } from "@/schemas/content-types";

/**
 * Paid landing pages are always noindex and never appear in the sitemap.
 *
 * `landing.showGlobalNavigation: false` is not honoured yet: the site header
 * and footer are rendered by the single root layout in src/app/layout.tsx, and
 * suppressing them requires moving the live pages into a route group. That
 * restructure touches production pages and is deferred pending owner approval.
 */
export function LandingTemplate({
  item,
  children,
}: {
  item: LandingItem;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12 lg:py-16">
      <article className="mx-auto w-full max-w-3xl">
        <DraftBadge item={item} />

        <header className="mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#B88A4A]">
            {item.hero.eyebrow}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-[#0E1B26] sm:text-4xl">
            {item.hero.heading}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#68757D]">
            {item.hero.summary}
          </p>
        </header>

        <div className="mdx-body">{children}</div>

        <FAQList items={item.faq} />

        <CTA
          heading={item.conversion.primaryCta.label}
          primary={item.conversion.primaryCta}
          secondary={item.conversion.secondaryCta}
        />
      </article>
    </Container>
  );
}
