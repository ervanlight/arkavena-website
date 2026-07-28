import * as React from "react";
import {
  ContentBreadcrumbs,
  ContentHero,
  ContentLayout,
  DraftBadge,
} from "@/components/content/content-shell";
import { FAQList } from "@/components/content/blocks/FAQList";
import { ContentCTA } from "@/components/content/blocks/CTA";
import { ChildContentGrid } from "@/components/content/child-content-grid";
import { ConsultationChannels } from "@/components/content/blocks/ConsultationChannels";
import { GENERIC_WHATSAPP_PREFILL } from "@/lib/contact/whatsapp";
import type { ContentItem, PageItem } from "@/schemas/content-types";

export interface PageTemplateProps {
  item: PageItem;
  children: React.ReactNode;
  /**
   * Only populated for hub pages (page.kind === "hub"): published, indexable
   * children pulled from the collection named in page.hubCollection. Absent
   * or empty for every other page kind.
   */
  hubChildren?: ContentItem[];
  hubChildrenTitle?: string;
}

/**
 * Shared template for every content/pages entry: home, corporate, contact,
 * consultation, hub, and faq kinds. Collection-specific templates
 * (ServiceTemplate, SectorTemplate, ...) stay separate — this one is for the
 * "pages" collection only (ARCHITECTURE.md §9 / Batch 01 §5).
 */
export function PageTemplate({
  item,
  children,
  hubChildren,
  hubChildrenTitle,
}: PageTemplateProps) {
  return (
    <ContentLayout>
      <DraftBadge item={item} />
      <ContentBreadcrumbs trail={item.breadcrumb} />
      <ContentHero item={item} />

      <div className="mdx-body">{children}</div>

      {(item.page.kind === "contact" || item.page.kind === "consultation") && (
        <ConsultationChannels
          whatsappMessage={
            item.conversion.primaryCta.whatsappMessage ?? GENERIC_WHATSAPP_PREFILL
          }
        />
      )}

      {item.page.kind === "hub" && hubChildren && (
        <ChildContentGrid
          title={hubChildrenTitle ?? "Halaman terkait"}
          items={hubChildren}
        />
      )}

      <FAQList items={item.faq} />
      <ContentCTA item={item} />
    </ContentLayout>
  );
}
