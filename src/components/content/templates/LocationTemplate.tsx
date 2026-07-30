import * as React from "react";
import {
  ContentBreadcrumbs,
  ContentHero,
  ContentLayout,
  DraftBadge,
  FactList,
} from "@/components/content/content-shell";
import { FAQList } from "@/components/content/blocks/FAQList";
import { SourceNote } from "@/components/content/blocks/SourceNote";
import { RelatedContent } from "@/components/content/blocks/RelatedContent";
import { ContentCTA } from "@/components/content/blocks/CTA";
import { Checklist } from "@/components/content/blocks/Checklist";
import { StickyCtaBar } from "@/components/content/sticky-cta-bar";
import type { ContentItem, LocationItem } from "@/schemas/content-types";

/**
 * A location page describes a service area. It never claims a branch office,
 * address, or separate business entity in that city (ARCHITECTURE.md §9).
 */
export function LocationTemplate({
  item,
  related,
  children,
}: {
  item: LocationItem;
  related: ContentItem[];
  children: React.ReactNode;
}) {
  return (
    <ContentLayout>
      <DraftBadge item={item} />
      <ContentBreadcrumbs trail={item.breadcrumb} />
      <ContentHero item={item} />

      <FactList
        title="Cakupan area"
        entries={[
          { label: "Kota", value: item.location.city },
          { label: "Provinsi", value: item.location.province },
          { label: "Negara", value: item.location.country },
          { label: "Area dilayani", value: item.location.areaServedLabel },
        ]}
      />

      {item.location.localChallenges.length > 0 && (
        <Checklist
          title="Kondisi lokal yang memengaruhi pelaksanaan"
          items={item.location.localChallenges}
        />
      )}

      {item.location.logisticsNotes.length > 0 && (
        <Checklist title="Catatan logistik" items={item.location.logisticsNotes} />
      )}

      <div className="mdx-body">{children}</div>

      <FAQList items={item.faq} />
      <SourceNote sources={item.sources} />
      <ContentCTA item={item} />
      <RelatedContent items={related} title="Layanan di area ini" />
      <StickyCtaBar item={item} />
    </ContentLayout>
  );
}
