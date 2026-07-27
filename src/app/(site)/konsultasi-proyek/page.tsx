import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentModules } from "@/generated/content-modules.generated";
import { mdxComponents } from "@/components/content/mdx-components";
import { PageTemplate } from "@/components/content/templates/PageTemplate";
import { JsonLd } from "@/components/seo/json-ld";
import { bySlug } from "@/lib/content/queries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";

const SLUG = "konsultasi-proyek";

export async function generateMetadata(): Promise<Metadata> {
  const item = bySlug("pages", "page", SLUG);
  return item ? buildMetadata(item) : {};
}

/**
 * No lead-capture form is wired here: there is currently no verified
 * WhatsApp number, email receiver, or lead-delivery provider to send
 * submissions to. Faking a working form or a success state is explicitly
 * prohibited (ARCHITECTURE.md Batch 01 §16). ConsultationChannels (rendered
 * by PageTemplate for kind "consultation") surfaces this honestly instead of
 * silently doing nothing. See the Batch 01 report for the BLOCKED status.
 */
export default async function KonsultasiProyekPage() {
  const item = bySlug("pages", "page", SLUG);
  const loadModule = contentModules[`pages/${SLUG}`];

  if (!item || !loadModule) notFound();

  const { default: MdxContent } = await loadModule();

  return (
    <>
      <JsonLd data={buildJsonLdGraph(item)} />
      <PageTemplate item={item}>
        <MdxContent components={mdxComponents} />
      </PageTemplate>
    </>
  );
}
