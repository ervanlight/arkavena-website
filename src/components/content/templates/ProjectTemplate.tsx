import * as React from "react";
import {
  ContentBreadcrumbs,
  ContentHero,
  ContentLayout,
  DraftBadge,
  FactList,
} from "@/components/content/content-shell";
import { SourceNote } from "@/components/content/blocks/SourceNote";
import { RelatedContent } from "@/components/content/blocks/RelatedContent";
import { ContentCTA } from "@/components/content/blocks/CTA";
import type { ContentItem, ProjectItem } from "@/schemas/content-types";

const STATUS_LABELS: Record<string, string> = {
  planned: "Direncanakan",
  ongoing: "Berjalan",
  completed: "Selesai",
  maintained: "Dalam perawatan",
};

const BUDGET_LABELS: Record<string, string> = {
  confidential: "Tidak dipublikasikan",
  range: "Rentang nilai",
  exact: "Nilai pasti",
};

/**
 * Project pages use `disclosureName`, never the raw client or project name,
 * unless the owner has recorded explicit client permission.
 */
export function ProjectTemplate({
  item,
  related,
  children,
}: {
  item: ProjectItem;
  related: ContentItem[];
  children: React.ReactNode;
}) {
  return (
    <ContentLayout>
      <DraftBadge item={item} />
      <ContentBreadcrumbs trail={item.breadcrumb} />
      <ContentHero item={item} />

      <FactList
        title="Data proyek"
        entries={[
          { label: "Proyek", value: item.project.disclosureName },
          { label: "Lokasi", value: item.project.location },
          { label: "Tahun", value: item.project.year },
          { label: "Status", value: STATUS_LABELS[item.project.status] },
          {
            label: "Luas",
            value: item.project.areaM2 ? `${item.project.areaM2} m²` : null,
          },
          {
            label: "Nilai kontrak",
            value: BUDGET_LABELS[item.project.budgetDisclosure],
          },
        ]}
      />

      {item.project.outcomes.length > 0 && (
        <section className="my-8">
          <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0E1B26]">
            Hasil yang terukur
          </h2>
          <ul className="space-y-3">
            {item.project.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-[#26333C]">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B88A4A]"
                />
                <span className="leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mdx-body">{children}</div>

      <SourceNote sources={item.sources} />
      <ContentCTA item={item} />
      <RelatedContent items={related} title="Layanan yang dipakai di proyek ini" />
    </ContentLayout>
  );
}
