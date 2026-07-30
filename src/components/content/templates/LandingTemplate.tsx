import * as React from "react";
import { Container } from "@/components/ui/container";
import { DraftBadge } from "@/components/content/content-shell";
import { FAQList } from "@/components/content/blocks/FAQList";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingLeadForm } from "@/components/landing/LandingLeadForm";
import { LandingViewTracker } from "@/components/landing/LandingViewTracker";
import { routeForContent } from "@/config/collections";
import type { LandingItem } from "@/schemas/content-types";

/**
 * Paid landing pages are always noindex and never appear in the sitemap.
 *
 * Global site navigation is suppressed on /lp/* by src/components/site-chrome.tsx
 * (a pathname-based swap in the root layout), matching
 * `landing.showGlobalNavigation: false` without a second root layout.
 */
export function LandingTemplate({
  item,
  children,
}: {
  item: LandingItem;
  children: React.ReactNode;
}) {
  const pagePath = routeForContent("landing", item.slug);

  return (
    <Container className="py-12 lg:py-16">
      <LandingViewTracker campaign={item.landing.campaign} pagePath={pagePath} />
      <article className="mx-auto w-full max-w-3xl">
        <DraftBadge item={item} />

        <header className="mb-10">
          {/* Contrast fixes matching content-shell.tsx's ContentHero — audit
              finding I7. */}
          <p className="text-xs font-bold uppercase tracking-wider text-[#805A22]">
            {item.hero.eyebrow}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-[1.75rem] font-bold tracking-tight text-[#0E1B26] sm:text-4xl">
            {item.hero.heading}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#576067]">
            {item.hero.summary}
          </p>
          <div className="mt-6">
            <LandingCTA
              campaign={item.landing.campaign}
              pagePath={pagePath}
              label={item.conversion.primaryCta.label}
              href={item.conversion.primaryCta.href}
              whatsappMessage={item.conversion.primaryCta.whatsappMessage}
            />
          </div>
        </header>

        <div className="mdx-body">{children}</div>

        <FAQList items={item.faq} />

        <section className="my-10">
          <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0E1B26]">
            {item.conversion.primaryCta.label}
          </h2>
          <LandingLeadForm
            campaign={item.landing.campaign}
            pagePath={pagePath}
            thankYouPath={item.landing.thankYouPath}
            whatsappMessage={item.conversion.primaryCta.whatsappMessage}
          />
        </section>
      </article>
    </Container>
  );
}
