import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentModules } from "@/generated/content-modules.generated";
import { mdxComponents } from "@/components/content/mdx-components";
import { PageTemplate } from "@/components/content/templates/PageTemplate";
import { JsonLd } from "@/components/seo/json-ld";
import { bySlug, publicListing } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";

const SLUG = "wilayah";

export async function generateMetadata(): Promise<Metadata> {
  const item = bySlug("pages", "page", SLUG);
  return item ? buildMetadata(item) : {};
}

export default async function WilayahHubPage() {
  const item = bySlug("pages", "page", SLUG);
  const loadModule = contentModules[`pages/${SLUG}`];

  if (!item || !loadModule) notFound();

  const { default: MdxContent } = await loadModule();

  return (
    <>
      <JsonLd data={buildJsonLdGraph(item)} />
      <PageTemplate
        item={item}
        hubChildren={publicListing("locations", "location")}
        hubChildrenTitle="Wilayah yang tersedia"
      >
        <MdxContent components={mdxComponents} />
      </PageTemplate>
    </>
  );
}
