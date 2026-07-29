import { describe, expect, it } from "vitest";
import {
  buildBreadcrumbSchema,
  buildBusinessSchema,
  buildFaqSchema,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildSiteEntityGraph,
  stripEmpty,
} from "@/lib/seo/schema-builders";
import { serializeJsonLd } from "@/lib/seo/jsonld";
import { businessFacts, schemaFlags } from "@/config/business";
import {
  asContentItem,
  guideFrontmatter,
  locationFrontmatter,
  publishedFrontmatter,
} from "./fixtures/content";

type Graph = { "@graph": Record<string, unknown>[] };

const typesIn = (graph: Graph) => graph["@graph"].map((node) => node["@type"]);

describe("structured data", () => {
  it("tidak menyerialisasi business field yang masih null, tapi menyertakan yang sudah terverifikasi", () => {
    const organization = buildOrganizationSchema();
    // Verified since the owner supplied telephone/email/address/foundingYear.
    expect(organization).toHaveProperty("address");
    expect(organization).toHaveProperty("telephone");
    expect(organization).toHaveProperty("name");
    // legalName is still unregistered — must stay absent, never guessed.
    expect(organization).not.toHaveProperty("legalName");
  });

  it("stripEmpty membuang null, string kosong, dan array kosong", () => {
    expect(
      stripEmpty({ a: null, b: "", c: [], d: "nilai", e: { f: null } })
    ).toEqual({ d: "nilai" });
  });

  it("halaman layanan menghasilkan node Service", () => {
    const graph = buildJsonLdGraph(
      asContentItem(publishedFrontmatter())
    ) as unknown as Graph;
    expect(typesIn(graph)).toContain("Service");
    expect(typesIn(graph)).toContain("BreadcrumbList");
  });

  it("graph per-halaman tidak pernah menyertakan Organization atau WebSite", () => {
    // Organization/WebSite are rendered exactly once, sitewide, by the root
    // layout (buildSiteEntityGraph). A page-level graph that inlined them too
    // would render two Organization entities on the same document.
    const service = buildJsonLdGraph(
      asContentItem(publishedFrontmatter())
    ) as unknown as Graph;
    expect(typesIn(service)).not.toContain("Organization");
    expect(typesIn(service)).not.toContain("WebSite");

    const guide = buildJsonLdGraph(
      asContentItem({
        ...guideFrontmatter(),
        status: "published",
        primaryKeyword: "fixture panduan dedup",
        publishedAt: "2026-01-01",
        updatedAt: "2026-01-01",
        ownerVerified: true,
      })
    ) as unknown as Graph;
    expect(typesIn(guide)).not.toContain("Organization");
    expect(typesIn(guide)).not.toContain("WebSite");
  });

  it("buildSiteEntityGraph berisi tepat satu Organization dan satu WebSite", () => {
    const graph = buildSiteEntityGraph() as unknown as Graph;
    const types = typesIn(graph);
    expect(types.filter((type) => type === "Organization")).toHaveLength(1);
    expect(types.filter((type) => type === "WebSite")).toHaveLength(1);
  });

  it("panduan menghasilkan node Article", () => {
    const item = asContentItem({
      ...guideFrontmatter(),
      status: "published",
      primaryKeyword: "fixture panduan",
      publishedAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ownerVerified: true,
    });
    expect(typesIn(buildJsonLdGraph(item) as unknown as Graph)).toContain(
      "Article"
    );
  });

  it("halaman wilayah tidak membuat entitas bisnis per kota", () => {
    const item = asContentItem({
      ...locationFrontmatter({
        location: {
          city: "Fixture City",
          province: "Fixture Province",
          country: "Indonesia",
          areaServedLabel: "Fixture City dan sekitarnya",
          localChallenges: [],
          logisticsNotes: [],
          localProjectRefs: [],
          localFactsVerified: true,
        },
      }),
      status: "published",
      primaryKeyword: "fixture wilayah",
      publishedAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ownerVerified: true,
    });

    const types = typesIn(buildJsonLdGraph(item) as unknown as Graph);
    expect(types).toContain("WebPage");
    expect(types).toContain("Service");
    expect(types).not.toContain("LocalBusiness");
    expect(types).not.toContain("GeneralContractor");
  });

  it("breadcrumb mengikuti hierarki route", () => {
    const item = asContentItem(publishedFrontmatter());
    const schema = buildBreadcrumbSchema(item.breadcrumb) as {
      itemListElement: { position: number; name: string }[];
    };
    expect(schema.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Beranda",
    });
    expect(schema.itemListElement.at(-1)?.name).toBe("Fixture Layanan");
  });

  it("FAQ schema nonaktif secara default", () => {
    expect(schemaFlags.enableFaqSchema).toBe(false);
    expect(
      buildFaqSchema([{ question: "Tanya?", answer: "Jawab." }])
    ).toBeNull();
  });

  it("landing page tidak menghasilkan graph organik", () => {
    const graph = buildJsonLdGraph(
      asContentItem({
        schemaVersion: 1,
        ...publishedFrontmatter(),
        id: "lp-fixture",
        type: "landing",
        slug: "fixture-landing",
        service: undefined,
        landing: {
          campaign: "fixture",
          organicEquivalent: null,
          index: false,
          follow: true,
          showGlobalNavigation: false,
          thankYouPath: "/terima-kasih",
        },
      })
    ) as unknown as Graph;
    expect(graph["@graph"]).toHaveLength(0);
  });

  it("business entity ada sekarang karena physicalAddress sudah terverifikasi, tapi geo/identifier tetap tidak diserialisasi selama masih kosong", () => {
    // Current real state: businessFacts.address is verified (office address
    // supplied by the owner), but geo coordinates and registration numbers
    // (NIB/SBU/IUJK) have not been provided yet — those must stay absent
    // from the emitted schema rather than being guessed (Batch 01 §14).
    expect(businessFacts.address).not.toBeNull();
    expect(businessFacts.geo).toBeNull();
    expect(businessFacts.identifiers).toEqual([]);

    const business = buildBusinessSchema();
    expect(business).not.toBeNull();
    expect(business).toHaveProperty("address");
    expect(business).not.toHaveProperty("geo");
    expect(business).not.toHaveProperty("identifier");
  });

  it("business entity, ketika alamat terverifikasi, tidak menyerialisasi fakta lain yang masih null", () => {
    const originalAddress = businessFacts.address;
    businessFacts.address = {
      streetAddress: "Jl. Fixture No. 1",
      addressLocality: "Surabaya",
      addressRegion: "Jawa Timur",
      postalCode: "60111",
      addressCountry: "ID",
    };

    try {
      const business = buildBusinessSchema();
      expect(business).not.toBeNull();
      expect(business).toHaveProperty("address");
      expect(business).not.toHaveProperty("geo");
      expect(business).not.toHaveProperty("openingHoursSpecification");
    } finally {
      businessFacts.address = originalAddress;
    }
  });

  it("JSON-LD diserialisasi dengan aman terhadap tag penutup", () => {
    const output = serializeJsonLd({ evil: "</script><script>alert(1)" });
    expect(output).not.toContain("</script>");
    expect(output).toContain("\\u003c");
  });
});
