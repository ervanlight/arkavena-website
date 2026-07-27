import { serializeJsonLd } from "@/lib/seo/jsonld";

/** Renders a structured-data graph as an escaped ld+json script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
