import { describe, expect, it } from "vitest";
import { frontmatterSchema } from "@/schemas/frontmatter";
import {
  validateRelationships,
  validateUniqueness,
} from "@/lib/content/validators";
import {
  asContentItem,
  baseFrontmatter,
  guideFrontmatter,
  landingFrontmatter,
  locationFrontmatter,
  projectFrontmatter,
  publishedFrontmatter,
} from "./fixtures/content";

const messagesOf = (result: ReturnType<typeof frontmatterSchema.safeParse>) =>
  result.success ? [] : result.error.issues.map((issue) => issue.message);

describe("frontmatter schema", () => {
  it("menerima fixture service yang valid", () => {
    expect(frontmatterSchema.safeParse(baseFrontmatter()).success).toBe(true);
  });

  it("menolak required field yang hilang", () => {
    const { title: _title, ...withoutTitle } = baseFrontmatter();
    void _title;
    expect(frontmatterSchema.safeParse(withoutTitle).success).toBe(false);
  });

  it("menolak tag di bawah dua controlled terms", () => {
    const result = frontmatterSchema.safeParse(
      baseFrontmatter({ tags: ["scaffold"] })
    );
    expect(result.success).toBe(false);
    expect(messagesOf(result).join()).toMatch(/dua controlled tag/);
  });

  it("menolak id tanpa prefix koleksi", () => {
    const result = frontmatterSchema.safeParse(
      baseFrontmatter({ id: "wrong-prefix" })
    );
    expect(result.success).toBe(false);
    expect(messagesOf(result).join()).toMatch(/harus diawali "svc-"/);
  });

  it("menolak published tanpa owner verification", () => {
    const result = frontmatterSchema.safeParse(
      publishedFrontmatter({ ownerVerified: false })
    );
    expect(result.success).toBe(false);
    expect(messagesOf(result).join()).toMatch(/ownerVerified/);
  });

  it("menolak published tanpa primaryKeyword", () => {
    const result = frontmatterSchema.safeParse(
      publishedFrontmatter({ primaryKeyword: null })
    );
    expect(result.success).toBe(false);
    expect(messagesOf(result).join()).toMatch(/primaryKeyword/);
  });

  it("menolak halaman wilayah published tanpa verifikasi fakta lokal", () => {
    const result = frontmatterSchema.safeParse({
      ...locationFrontmatter(),
      status: "published",
      primaryKeyword: "fixture wilayah",
      publishedAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ownerVerified: true,
    });
    expect(result.success).toBe(false);
    expect(messagesOf(result).join()).toMatch(/localFactsVerified/);
  });

  it("menolak panduan biaya published tanpa dataAsOf", () => {
    const result = frontmatterSchema.safeParse({
      ...guideFrontmatter({
        article: {
          articleType: "cost",
          pillar: null,
          dataAsOf: null,
          answerFirst: true,
          hasCalculator: false,
        },
      }),
      status: "published",
      primaryKeyword: "fixture biaya",
      publishedAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ownerVerified: true,
    });
    expect(result.success).toBe(false);
    expect(messagesOf(result).join()).toMatch(/dataAsOf/);
  });

  it("menolak proyek published tanpa izin klien dan verifikasi fakta", () => {
    const result = frontmatterSchema.safeParse({
      ...projectFrontmatter(),
      status: "published",
      primaryKeyword: "fixture proyek",
      publishedAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ownerVerified: true,
    });
    expect(result.success).toBe(false);
    const messages = messagesOf(result).join();
    expect(messages).toMatch(/factsVerified/);
    expect(messages).toMatch(/clientPermission/);
  });

  it("menerima extension landing page dan memaksa index: false", () => {
    expect(frontmatterSchema.safeParse(landingFrontmatter()).success).toBe(true);
    const indexed = frontmatterSchema.safeParse(
      landingFrontmatter({
        landing: {
          campaign: "fixture-campaign",
          organicEquivalent: null,
          index: true,
          follow: true,
          showGlobalNavigation: false,
          thankYouPath: "/terima-kasih",
        },
      })
    );
    expect(indexed.success).toBe(false);
  });

  it("menolak alt text yang terlalu pendek", () => {
    const result = frontmatterSchema.safeParse(
      baseFrontmatter({
        hero: {
          eyebrow: "Fixture",
          heading: "Fixture Heading",
          summary: "Ringkasan",
          image: "/images/placeholders/hero.png",
          imageAlt: "pendek",
        },
      })
    );
    expect(result.success).toBe(false);
  });
});

describe("cross-file validation", () => {
  it("menolak duplicate id", () => {
    const items = [
      asContentItem(baseFrontmatter()),
      asContentItem(baseFrontmatter({ slug: "fixture-lain" })),
    ];
    const issues = validateUniqueness(items);
    expect(issues.some((issue) => issue.rule === "duplicate-id")).toBe(true);
  });

  it("menolak duplicate slug dalam satu koleksi", () => {
    const items = [
      asContentItem(baseFrontmatter()),
      asContentItem(baseFrontmatter({ id: "svc-fixture-dua" })),
    ];
    const issues = validateUniqueness(items);
    expect(issues.some((issue) => issue.rule === "duplicate-slug")).toBe(true);
    expect(issues.some((issue) => issue.rule === "duplicate-route")).toBe(true);
  });

  it("menolak primaryKeyword ganda antar halaman published", () => {
    const items = [
      asContentItem(publishedFrontmatter()),
      asContentItem(
        publishedFrontmatter({
          id: "guide-fixture-dua",
          type: "guide",
          slug: "fixture-panduan-dua",
          primaryKeyword: "Fixture  Keyword",
          article: {
            articleType: "explainer",
            pillar: null,
            dataAsOf: null,
            answerFirst: true,
            hasCalculator: false,
          },
          service: undefined,
        })
      ),
    ];
    const issues = validateUniqueness(items);
    expect(
      issues.some((issue) => issue.rule === "duplicate-primary-keyword")
    ).toBe(true);
  });

  it("menolak relationship yang tidak resolve pada halaman published", () => {
    const item = asContentItem(
      publishedFrontmatter({
        relationships: {
          services: ["svc-tidak-ada"],
          sectors: [],
          locations: [],
          guides: [],
          projects: [],
          pinnedRelated: [],
          excludedRelated: [],
        },
      })
    );
    const issues = validateRelationships([item]);
    expect(issues[0].severity).toBe("error");
    expect(issues[0].rule).toBe("unresolved-relationship");
  });

  it("hanya memberi warning untuk relationship menggantung pada draft", () => {
    const item = asContentItem(
      baseFrontmatter({
        relationships: {
          services: ["svc-tidak-ada"],
          sectors: [],
          locations: [],
          guides: [],
          projects: [],
          pinnedRelated: [],
          excludedRelated: [],
        },
      })
    );
    expect(validateRelationships([item])[0].severity).toBe("warning");
  });
});
