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
import type { ContentItem, ServiceItem } from "@/schemas/content-types";

const PRICING_LABELS: Record<string, string> = {
  consultation: "Ditentukan setelah konsultasi dan survei",
  quote: "Penawaran per proyek",
  fixed: "Harga tetap sesuai paket",
};

export function ServiceTemplate({
  item,
  related,
  children,
}: {
  item: ServiceItem;
  related: ContentItem[];
  children: React.ReactNode;
}) {
  return (
    <ContentLayout>
      <DraftBadge item={item} />
      <ContentBreadcrumbs trail={item.breadcrumb} />
      <ContentHero item={item} />

      <FactList
        title="Ringkasan layanan"
        entries={[
          { label: "Jenis layanan", value: item.service.serviceType },
          {
            label: "Model penetapan biaya",
            value: PRICING_LABELS[item.service.pricingMode],
          },
        ]}
        tags={[
          { label: "Untuk siapa", items: item.service.audience },
          { label: "Area layanan", items: item.service.areaServed },
        ]}
      />

      {item.service.deliverables.length > 0 && (
        <section className="my-8">
          <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0E1B26]">
            Yang Anda terima
          </h2>
          <ul className="space-y-3">
            {item.service.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex gap-3 text-[#26333C]">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B88A4A]"
                />
                <span className="leading-relaxed">{deliverable}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mdx-body">{children}</div>

      <FAQList items={item.faq} />
      <SourceNote sources={item.sources} />
      <ContentCTA item={item} />
      <RelatedContent items={related} title="Layanan dan panduan terkait" />
    </ContentLayout>
  );
}
