// =========================================
// ARKAVENA — Structured Data Builders
// =========================================
// Editors never choose a schema type. The page type determines the graph
// (ARCHITECTURE.md §9, §12.5). Unverified business facts are omitted, never
// guessed, and there is exactly one business entity for the whole site —
// never one LocalBusiness per city.

import { businessFacts, SCHEMA_IDS, schemaFlags } from "@/config/business";
import { siteConfig } from "@/config/site";
import { absoluteUrl, canonicalOf, siteOrigin } from "@/lib/seo/canonical";
import type {
  BreadcrumbEntry,
  ContentItem,
  GuideItem,
  LocationItem,
  ProjectItem,
  SectorItem,
  ServiceItem,
} from "@/schemas/content-types";

export type JsonLdNode = Record<string, unknown>;

/** Drop null, undefined, empty strings and empty arrays before serializing. */
export function stripEmpty<T>(value: T): T {
  if (Array.isArray(value)) {
    const cleaned = value
      .map((entry) => stripEmpty(entry))
      .filter((entry) => entry !== undefined);
    return cleaned as unknown as T;
  }

  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const [key, raw] of Object.entries(source)) {
      if (raw === null || raw === undefined) continue;
      if (typeof raw === "string" && raw.trim() === "") continue;
      if (Array.isArray(raw) && raw.length === 0) continue;

      const cleaned = stripEmpty(raw);
      if (
        cleaned &&
        typeof cleaned === "object" &&
        !Array.isArray(cleaned) &&
        Object.keys(cleaned).length === 0
      ) {
        continue;
      }
      result[key] = cleaned;
    }

    return result as unknown as T;
  }

  return value;
}

const organizationRef = { "@id": `${siteOrigin()}${SCHEMA_IDS.organization}` };
const websiteRef = { "@id": `${siteOrigin()}${SCHEMA_IDS.website}` };

export function buildOrganizationSchema(): JsonLdNode {
  return stripEmpty({
    "@type": "Organization",
    "@id": `${siteOrigin()}${SCHEMA_IDS.organization}`,
    name: siteConfig.brandName,
    legalName: businessFacts.legalName,
    url: siteOrigin(),
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    email: businessFacts.email,
    telephone: businessFacts.telephone,
    foundingDate: businessFacts.foundingYear
      ? String(businessFacts.foundingYear)
      : null,
    address: businessFacts.address
      ? { "@type": "PostalAddress", ...businessFacts.address }
      : null,
    sameAs: businessFacts.sameAs,
  });
}

export function buildWebsiteSchema(): JsonLdNode {
  return stripEmpty({
    "@type": "WebSite",
    "@id": `${siteOrigin()}${SCHEMA_IDS.website}`,
    url: siteOrigin(),
    name: siteConfig.brandName,
    description: siteConfig.description,
    inLanguage: "id-ID",
    publisher: organizationRef,
  });
}

/**
 * The single business entity. Returns null when the owner has not verified
 * enough facts to describe a real business.
 */
export function buildBusinessSchema(): JsonLdNode | null {
  if (!schemaFlags.enableBusinessEntity) return null;

  return stripEmpty({
    "@type": "GeneralContractor",
    "@id": `${siteOrigin()}${SCHEMA_IDS.business}`,
    name: businessFacts.legalName ?? businessFacts.name,
    url: siteOrigin(),
    parentOrganization: organizationRef,
    telephone: businessFacts.telephone,
    email: businessFacts.email,
    address: businessFacts.address
      ? { "@type": "PostalAddress", ...businessFacts.address }
      : null,
    geo: businessFacts.geo
      ? { "@type": "GeoCoordinates", ...businessFacts.geo }
      : null,
    openingHoursSpecification: businessFacts.openingHours,
    identifier: businessFacts.identifiers.map((entry) => ({
      "@type": "PropertyValue",
      name: entry.name,
      value: entry.value,
    })),
    areaServed: businessFacts.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  });
}

export function buildServiceSchema(
  item: ServiceItem | SectorItem | LocationItem
): JsonLdNode {
  const serviceType =
    item.type === "service"
      ? item.service.serviceType
      : item.type === "sector"
        ? item.sector.buildingType
        : item.location.areaServedLabel;

  const areaServed =
    item.type === "service"
      ? item.service.areaServed
      : item.type === "location"
        ? [item.location.city]
        : businessFacts.areaServed;

  return stripEmpty({
    "@type": "Service",
    "@id": `${canonicalOf(item)}#service`,
    name: item.title,
    serviceType,
    description: item.description,
    url: canonicalOf(item),
    provider: organizationRef,
    areaServed: areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  });
}

export function buildArticleSchema(item: GuideItem): JsonLdNode {
  return stripEmpty({
    "@type": "Article",
    "@id": `${canonicalOf(item)}#article`,
    headline: item.title,
    description: item.description,
    url: canonicalOf(item),
    inLanguage: "id-ID",
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
    author: organizationRef,
    publisher: organizationRef,
    isPartOf: websiteRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalOf(item) },
  });
}

export function buildProjectSchema(item: ProjectItem): JsonLdNode {
  return stripEmpty({
    "@type": "CreativeWork",
    "@id": `${canonicalOf(item)}#project`,
    name: item.project.disclosureName,
    description: item.description,
    url: canonicalOf(item),
    inLanguage: "id-ID",
    dateCreated: item.project.year ? String(item.project.year) : null,
    creator: organizationRef,
    isPartOf: websiteRef,
  });
}

export function buildWebPageSchema(item: ContentItem): JsonLdNode {
  return stripEmpty({
    "@type": "WebPage",
    "@id": canonicalOf(item),
    url: canonicalOf(item),
    name: item.title,
    description: item.description,
    inLanguage: "id-ID",
    isPartOf: websiteRef,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
  });
}

export function buildBreadcrumbSchema(trail: BreadcrumbEntry[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

/**
 * FAQ markup is disabled by default. It may only be enabled once the answers
 * are visible on the page and verified (ARCHITECTURE.md §12.5).
 */
export function buildFaqSchema(
  faq: { question: string; answer: string }[]
): JsonLdNode | null {
  if (!schemaFlags.enableFaqSchema) return null;
  if (faq.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/**
 * Assemble the @graph for a content page. Organization and WebSite are
 * deliberately NOT inlined here — they are rendered exactly once sitewide by
 * the root layout (see buildSiteEntityGraph). Page-specific nodes reference
 * them by @id instead, so no page ever carries two Organization entities.
 */
export function buildJsonLdGraph(item: ContentItem): JsonLdNode {
  const nodes: JsonLdNode[] = [];

  switch (item.type) {
    case "service":
    case "sector":
      nodes.push(buildServiceSchema(item));
      break;
    case "location":
      nodes.push(buildWebPageSchema(item), buildServiceSchema(item));
      break;
    case "guide":
      nodes.push(buildArticleSchema(item));
      break;
    case "project":
      nodes.push(buildProjectSchema(item));
      break;
    case "page":
      nodes.push(buildWebPageSchema(item));
      break;
    case "landing":
      // Paid landing pages are not an organic SEO surface — no graph beyond
      // what is genuinely relevant (ARCHITECTURE.md §9).
      return { "@context": "https://schema.org", "@graph": [] };
  }

  nodes.push(buildBreadcrumbSchema(item.breadcrumb));

  const faq = buildFaqSchema(item.faq);
  if (faq) nodes.push(faq);

  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * Sitewide entity graph: Organization and WebSite only. Rendered once, in the
 * root layout, on every route. This is the single source of Organization
 * JSON-LD for the whole site — no other file may emit an Organization node.
 */
export function buildSiteEntityGraph(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [buildWebsiteSchema(), buildOrganizationSchema()],
  };
}

/** Homepage graph: WebSite, Organization and the verified business entity. */
export function buildHomepageGraph(): JsonLdNode {
  const business = buildBusinessSchema();
  const nodes = [buildWebsiteSchema(), buildOrganizationSchema()];
  if (business) nodes.push(business);
  return { "@context": "https://schema.org", "@graph": nodes };
}
