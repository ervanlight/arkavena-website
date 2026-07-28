import { describe, expect, it } from "vitest";
import { loadAllContent } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  buildHomepageGraph,
  buildJsonLdGraph,
  buildSiteEntityGraph,
} from "@/lib/seo/schema-builders";
import { siteConfig } from "@/config/site";
import type { PageItem } from "@/schemas/content-types";

const { items } = loadAllContent();
const pages = items.filter((item): item is PageItem => item.type === "page");
const bySlug = (slug: string) => pages.find((item) => item.slug === slug)!;

type Graph = { "@graph": Record<string, unknown>[] };
const typesIn = (graph: Graph) => graph["@graph"].map((node) => node["@type"]);

describe("Batch 01 — metadata", () => {
  it("homepage canonical adalah domain root", () => {
    const metadata = buildMetadata(bySlug("home"));
    expect(metadata.alternates?.canonical).toBe(siteConfig.domain);
  });

  it("seluruh title 12 halaman unik", () => {
    const titles = pages.map((item) => buildMetadata(item).title);
    const serialized = titles.map((t) => JSON.stringify(t));
    expect(new Set(serialized).size).toBe(serialized.length);
  });

  it("seluruh description 12 halaman unik", () => {
    const descriptions = pages.map((item) => item.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("/proyek menghasilkan noindex,follow", () => {
    const metadata = buildMetadata(bySlug("proyek"));
    expect(metadata.robots).toMatchObject({ index: false, follow: true });
  });

  it("published+ownerVerified pages menghasilkan index,follow; /proyek tetap noindex", () => {
    for (const item of pages.filter((p) => p.slug !== "proyek")) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: true, follow: true });
    }
  });

  it("Open Graph image selalu berupa URL absolut yang valid untuk semua 12 halaman", () => {
    for (const item of pages) {
      const openGraph = buildMetadata(item).openGraph as {
        images: { url: string }[];
      };
      expect(openGraph.images[0].url).toMatch(/^https?:\/\//);
    }
  });
});

describe("Batch 01 — structured data mapping", () => {
  it("homepage tidak menghasilkan LocalBusiness/GeneralContractor karena address null", () => {
    const graph = buildHomepageGraph() as unknown as Graph;
    expect(typesIn(graph)).not.toContain("GeneralContractor");
    expect(typesIn(graph)).not.toContain("LocalBusiness");
    expect(graph["@graph"]).toEqual([]);
  });

  it("sitewide graph tetap hanya satu Organization dan satu WebSite", () => {
    const graph = buildSiteEntityGraph() as unknown as Graph;
    const types = typesIn(graph);
    expect(types.filter((t) => t === "Organization")).toHaveLength(1);
    expect(types.filter((t) => t === "WebSite")).toHaveLength(1);
  });

  it("/tentang dipetakan ke AboutPage", () => {
    const graph = buildJsonLdGraph(bySlug("tentang")) as unknown as Graph;
    expect(typesIn(graph)).toContain("AboutPage");
  });

  it("/kontak dipetakan ke ContactPage", () => {
    const graph = buildJsonLdGraph(bySlug("kontak")) as unknown as Graph;
    expect(typesIn(graph)).toContain("ContactPage");
  });

  it("/konsultasi-proyek dipetakan ke ContactPage", () => {
    const graph = buildJsonLdGraph(bySlug("konsultasi-proyek")) as unknown as Graph;
    expect(typesIn(graph)).toContain("ContactPage");
  });

  it("hub pages (layanan/sektor/wilayah/panduan/proyek) dipetakan ke CollectionPage", () => {
    for (const slug of ["layanan", "sektor", "wilayah", "panduan", "proyek"]) {
      const graph = buildJsonLdGraph(bySlug(slug)) as unknown as Graph;
      expect(typesIn(graph)).toContain("CollectionPage");
    }
  });

  it("mengapa-arkavena dan faq dipetakan ke WebPage generik", () => {
    for (const slug of ["mengapa-arkavena", "faq"]) {
      const graph = buildJsonLdGraph(bySlug(slug)) as unknown as Graph;
      expect(typesIn(graph)).toContain("WebPage");
    }
  });

  it("homepage tidak menghasilkan node BreadcrumbList", () => {
    const graph = buildJsonLdGraph(bySlug("home")) as unknown as Graph;
    expect(typesIn(graph)).not.toContain("BreadcrumbList");
  });

  it("halaman non-home menghasilkan BreadcrumbList", () => {
    const graph = buildJsonLdGraph(bySlug("tentang")) as unknown as Graph;
    expect(typesIn(graph)).toContain("BreadcrumbList");
  });

  it("FAQ visible di /faq tetapi FAQPage schema tetap disabled by default", () => {
    const faqPage = bySlug("faq");
    expect(faqPage.faq.length).toBeGreaterThan(0);
    const graph = buildJsonLdGraph(faqPage) as unknown as Graph;
    expect(typesIn(graph)).not.toContain("FAQPage");
  });

  it("proyek hub tidak menghasilkan CreativeWork/Article palsu", () => {
    const graph = buildJsonLdGraph(bySlug("proyek")) as unknown as Graph;
    expect(typesIn(graph)).not.toContain("CreativeWork");
    expect(typesIn(graph)).not.toContain("Article");
  });
});
