import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentModules } from "@/generated/content-modules.generated";
import { mdxComponents } from "@/components/content/mdx-components";
import { ServiceTemplate } from "@/components/content/templates/ServiceTemplate";
import { JsonLd } from "@/components/seo/json-ld";
import { bySlug, relatedFor, routableSlugs } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";

export const dynamicParams = false;

export function generateStaticParams() {
  return routableSlugs("services", "service").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = bySlug("services", "service", slug);
  return item ? buildMetadata(item) : {};
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = bySlug("services", "service", slug);
  const loadModule = contentModules[`services/${slug}`];

  if (!item || !loadModule) notFound();

  const { default: MdxContent } = await loadModule();

  return (
    <>
      <JsonLd data={buildJsonLdGraph(item)} />
      <ServiceTemplate item={item} related={relatedFor(item)}>
        <MdxContent components={mdxComponents} />
      </ServiceTemplate>
    </>
  );
}
