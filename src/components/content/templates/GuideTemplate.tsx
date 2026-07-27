import * as React from "react";
import {
  ContentBreadcrumbs,
  ContentHero,
  ContentLayout,
  DraftBadge,
} from "@/components/content/content-shell";
import { FAQList } from "@/components/content/blocks/FAQList";
import { SourceNote } from "@/components/content/blocks/SourceNote";
import { RelatedContent } from "@/components/content/blocks/RelatedContent";
import { ContentCTA } from "@/components/content/blocks/CTA";
import { Callout } from "@/components/content/blocks/Callout";
import type { ContentItem, GuideItem } from "@/schemas/content-types";

const ARTICLE_TYPE_LABELS: Record<string, string> = {
  explainer: "Penjelasan",
  cost: "Panduan biaya",
  comparison: "Perbandingan",
  checklist: "Checklist",
  process: "Proses",
  pillar: "Panduan utama",
};

export function GuideTemplate({
  item,
  related,
  children,
}: {
  item: GuideItem;
  related: ContentItem[];
  children: React.ReactNode;
}) {
  return (
    <ContentLayout>
      <DraftBadge item={item} />
      <ContentBreadcrumbs trail={item.breadcrumb} />
      <ContentHero item={item} />

      <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#68757D]">
        <span>{ARTICLE_TYPE_LABELS[item.article.articleType]}</span>
        <span aria-hidden="true">·</span>
        <span>{item.readingMinutes} menit baca</span>
        {item.updatedAt && (
          <>
            <span aria-hidden="true">·</span>
            <span>Diperbarui {item.updatedAt}</span>
          </>
        )}
        {item.article.dataAsOf && (
          <>
            <span aria-hidden="true">·</span>
            <span>Data per {item.article.dataAsOf}</span>
          </>
        )}
      </p>

      {item.article.answerFirst && (
        <Callout tone="info" title="Ringkasan jawaban">
          <p>{item.excerpt}</p>
        </Callout>
      )}

      <div className="mdx-body">{children}</div>

      <FAQList items={item.faq} />
      <SourceNote sources={item.sources} />
      <ContentCTA item={item} />
      <RelatedContent items={related} title="Baca juga" />
    </ContentLayout>
  );
}
