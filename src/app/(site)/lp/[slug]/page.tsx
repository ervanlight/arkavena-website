import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentModules } from "@/generated/content-modules.generated";
import { mdxComponents } from "@/components/content/mdx-components";
import { LandingTemplate } from "@/components/content/templates/LandingTemplate";
import { bySlug, routableSlugs } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return routableSlugs("landing", "landing").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = bySlug("landing", "landing", slug);
  return item ? buildMetadata(item) : {};
}

/**
 * Paid landing pages carry no organic structured-data graph and are excluded
 * from the sitemap by construction (ARCHITECTURE.md §10.2, §12.3).
 */
export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = bySlug("landing", "landing", slug);
  const loadModule = contentModules[`landing/${slug}`];

  if (!item || !loadModule) notFound();

  const { default: MdxContent } = await loadModule();

  return (
    <LandingTemplate item={item}>
      <MdxContent components={mdxComponents} />
    </LandingTemplate>
  );
}
