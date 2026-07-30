import * as React from "react";
import {
  ContentBreadcrumbs,
  ContentHero,
  ContentLayout,
  DraftBadge,
  FactList,
  TagList,
} from "@/components/content/content-shell";
import { FAQList } from "@/components/content/blocks/FAQList";
import { SourceNote } from "@/components/content/blocks/SourceNote";
import { RelatedContent } from "@/components/content/blocks/RelatedContent";
import { ContentCTA } from "@/components/content/blocks/CTA";
import { Callout } from "@/components/content/blocks/Callout";
import { StickyCtaBar } from "@/components/content/sticky-cta-bar";
import type { ContentItem, SectorItem } from "@/schemas/content-types";

export function SectorTemplate({
  item,
  related,
  children,
}: {
  item: SectorItem;
  related: ContentItem[];
  children: React.ReactNode;
}) {
  return (
    <ContentLayout>
      <DraftBadge item={item} />
      <ContentBreadcrumbs trail={item.breadcrumb} />
      <ContentHero item={item} />

      <FactList
        title="Profil sektor"
        entries={[{ label: "Jenis bangunan", value: item.sector.buildingType }]}
      />

      <div className="my-8">
        <TagList label="Kasus penggunaan utama" items={item.sector.primaryUseCases} />
      </div>

      {item.sector.commonRisks.length > 0 && (
        <Callout tone="risk" title="Risiko yang sering muncul di sektor ini">
          <ul className="list-disc space-y-1 pl-5">
            {item.sector.commonRisks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </Callout>
      )}

      <div className="mdx-body">{children}</div>

      <FAQList items={item.faq} />
      <SourceNote sources={item.sources} />
      <ContentCTA item={item} />
      <RelatedContent items={related} title="Layanan yang relevan untuk sektor ini" />
      <StickyCtaBar item={item} />
    </ContentLayout>
  );
}
