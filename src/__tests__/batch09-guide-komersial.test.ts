import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { GuideItem } from "@/schemas/content-types";

const PILLAR_SLUG = "tahapan-proyek-bangunan-komersial";
const PILLAR_ID = "guide-tahapan-proyek-bangunan-komersial";

const COST_GUIDE_SLUGS = [
  "biaya-bangun-ruko",
  "biaya-bangun-gudang",
  "biaya-bangun-pabrik",
  "biaya-bangun-kantor",
  "biaya-bangun-kos",
  "biaya-bangun-cafe",
  "biaya-bangun-restoran",
  "biaya-bangun-klinik",
  "biaya-bangun-sekolah",
  "biaya-bangun-masjid",
] as const;

/** Mandatory technical-review articles per brief §17.1, regardless of content. */
const MANDATORY_REVIEW_SLUGS = ["biaya-bangun-pabrik", "biaya-bangun-restoran", "biaya-bangun-klinik"] as const;

const COST_GUIDE_SECTOR_MAP: Record<(typeof COST_GUIDE_SLUGS)[number], string> = {
  "biaya-bangun-ruko": "sec-ruko",
  "biaya-bangun-gudang": "sec-gudang",
  "biaya-bangun-pabrik": "sec-pabrik",
  "biaya-bangun-kantor": "sec-kantor",
  "biaya-bangun-kos": "sec-kos",
  "biaya-bangun-cafe": "sec-cafe",
  "biaya-bangun-restoran": "sec-restoran",
  "biaya-bangun-klinik": "sec-klinik",
  "biaya-bangun-sekolah": "sec-sekolah",
  "biaya-bangun-masjid": "sec-masjid",
};

const B09A_ALL_SLUGS = [PILLAR_SLUG, ...COST_GUIDE_SLUGS] as const;

const REQUIRED_SECTOR_IDS = Object.values(COST_GUIDE_SECTOR_MAP);

const { items, issues } = loadAllContent();
const guides = items.filter((item): item is GuideItem => item.type === "guide");
const b09a = guides.filter((item) =>
  B09A_ALL_SLUGS.includes(item.slug as (typeof B09A_ALL_SLUGS)[number])
);
const pillar = b09a.find((item) => item.slug === PILLAR_SLUG)!;
const costGuides = b09a.filter((item) => item.slug !== PILLAR_SLUG);

const publishedServiceIds = new Set(
  items
    .filter((item) => item.type === "service" && item.status === "published" && item.ownerVerified)
    .map((item) => item.id)
);
const publishedSectorIds = new Set(
  items
    .filter((item) => item.type === "sector" && item.status === "published" && item.ownerVerified)
    .map((item) => item.id)
);
const readFile = (slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", "guides", `${slug}.mdx`), "utf8");
/** MDX body only — strips YAML frontmatter so hero/FAQ text doesn't skew body-position checks. */
const readBody = (slug: string) => readFile(slug).split(/^---$/m).slice(2).join("---");

describe("Batch 09A — no-published-pricing policy (owner decision 2026-07-28, commercial only)", () => {
  it("planning/batch-09-sector-cost-data-required.md mencatat resolusi sebagai kebijakan, bukan lagi data blocker aktif", () => {
    const planningPath = path.join(process.cwd(), "planning", "batch-09-sector-cost-data-required.md");
    expect(fs.existsSync(planningPath)).toBe(true);
    const planningBody = fs.readFileSync(planningPath, "utf8");
    expect(planningBody).toMatch(/RESOLVED/i);
    expect(guides.some((item) => item.sourcePath.includes("planning"))).toBe(false);
  });

  it("seluruh 10 cost guide dibuat sebagai active content (bukan blocked)", () => {
    for (const slug of COST_GUIDE_SLUGS) {
      expect(guides.some((item) => item.slug === slug)).toBe(true);
    }
  });

  it("tidak ada satu pun cost guide yang memuat angka Rp atau persentase (kebijakan tidak expose harga)", () => {
    const FORBIDDEN_NUMBER_PATTERNS = [/Rp\s?\d/i, /\d+\s?%(?!\s?\))/];
    for (const slug of COST_GUIDE_SLUGS) {
      const body = readBody(slug);
      for (const pattern of FORBIDDEN_NUMBER_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx matched forbidden pattern ${pattern}`).toBe(false);
      }
    }
  });

  it("setiap cost guide menyatakan eksplisit kebijakan tidak mempublikasikan kisaran harga", () => {
    for (const slug of COST_GUIDE_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/tidak mempublikasikan kisaran harga/i);
    }
  });

  it("tidak ada CostTable dipakai pada cost guide manapun (tidak ada data numerik untuk ditampilkan)", () => {
    for (const slug of COST_GUIDE_SLUGS) {
      const body = readBody(slug);
      expect(body).not.toContain("<CostTable");
    }
  });

  it("dataAsOf dan sources: published cost guides mencantumkan tanggal kebijakan dan sumber kebijakan (bukan data numerik); guide yang masih review tetap null/kosong", () => {
    for (const item of costGuides) {
      if (item.status === "published") {
        expect(item.article.dataAsOf).toBe("2026-07-28");
        expect(item.sources.length).toBeGreaterThan(0);
        expect(item.sources[0].label.toLowerCase()).toContain("kebijakan");
      } else {
        expect(item.article.dataAsOf).toBeNull();
        expect(item.sources).toEqual([]);
      }
    }
  });

  it("pillar tidak menggeneralisasi satu angka biaya dari satu jenis bangunan ke jenis lain", () => {
    const body = readBody(PILLAR_SLUG);
    expect(body).toMatch(/cost driver yang berbeda/i);
  });
});

describe("Batch 09A — mandatory technical-review register", () => {
  it("biaya-bangun-pabrik, biaya-bangun-restoran, dan biaya-bangun-klinik tetap wajib technical review meski tanpa klaim numerik", () => {
    for (const slug of MANDATORY_REVIEW_SLUGS) {
      const item = costGuides.find((i) => i.slug === slug)!;
      expect(item.reviewedBy).toBeNull();
      expect(item.status).toBe("review");
      const body = readBody(slug);
      expect(body).toMatch(/memerlukan technical review terpisah/i);
    }
  });
});

describe("Batch 09A — content validation", () => {
  it("seluruh 11 halaman (pillar + 10 cost guide) valid tanpa error schema", () => {
    expect(issues.filter((i) => B09A_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)))).toEqual([]);
  });

  it("tepat 11 halaman aktif dibuat pada Batch 09A (pillar + 10 cost-driver guide; 3 supporting guide P4 deferred ke 09B)", () => {
    expect(b09a.map((i) => i.slug).sort()).toEqual([...B09A_ALL_SLUGS].sort());
  });

  it("id menggunakan namespace guide-* dan cocok dengan slug untuk seluruh halaman", () => {
    for (const item of b09a) {
      expect(item.id).toBe(`guide-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("pillar + 7 non-flagged cost guides published/ownerVerified:true (approved 2026-07-28); 3 mandatory-review cost guides tetap review", () => {
    for (const item of b09a) {
      if (MANDATORY_REVIEW_SLUGS.includes(item.slug as (typeof MANDATORY_REVIEW_SLUGS)[number])) {
        expect(item.status).toBe("review");
        expect(item.ownerVerified).toBe(false);
        expect(item.publishedAt).toBeNull();
        expect(item.reviewedBy).toBeNull();
        expect(item.isIndexable).toBe(false);
      } else {
        expect(item.status).toBe("published");
        expect(item.ownerVerified).toBe(true);
        expect(item.publishedAt).not.toBeNull();
        expect(item.isIndexable).toBe(true);
      }
    }
  });

  it("relationships.projects dan relationships.locations kosong untuk seluruh halaman", () => {
    for (const item of b09a) {
      expect(item.relationships.projects).toEqual([]);
      expect(item.relationships.locations).toEqual([]);
    }
  });
});

describe("Batch 09A — pillar architecture", () => {
  it("pillar article mempunyai article.pillar: null dan articleType: pillar", () => {
    expect(pillar.article.pillar).toBeNull();
    expect(pillar.article.articleType).toBe("pillar");
  });

  it("pillar tidak self-reference dalam relationships.guides", () => {
    expect(pillar.relationships.guides).not.toContain(PILLAR_ID);
  });

  it("pillar menautkan seluruh 10 cost guide dalam relationships.guides", () => {
    const costGuideIds = costGuides.map((item) => item.id).sort();
    expect([...pillar.relationships.guides].sort()).toEqual(costGuideIds);
  });

  it("seluruh cost guide mempunyai article.pillar mengarah ke pillar ID", () => {
    for (const item of costGuides) {
      expect(item.article.pillar).toBe(PILLAR_ID);
    }
  });

  it("setiap cost guide mempunyai minimal 1 sibling guide ID di luar pillar sendiri", () => {
    for (const item of costGuides) {
      const siblingsExcludingPillar = item.relationships.guides.filter((id) => id !== PILLAR_ID);
      expect(siblingsExcludingPillar.length).toBeGreaterThanOrEqual(1);
      expect(item.relationships.guides.length).toBeLessThanOrEqual(6);
    }
  });

  it("tidak ada guide yang self-link dalam relationships.guides-nya sendiri", () => {
    for (const item of b09a) {
      expect(item.relationships.guides).not.toContain(item.id);
    }
  });

  it("seluruh guide ID dalam relationships resolve ke item yang benar-benar ada", () => {
    const relIssues = validateRelationships(items);
    const b09aIssues = relIssues.filter((i) => B09A_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)));
    expect(b09aIssues).toEqual([]);
  });

  it("tidak ada cost guide yang mereferensikan guide Batch 09B yang belum ada (no-future-ID rule)", () => {
    const futureIds = [
      "guide-cara-memilih-kontraktor-bangunan-komersial",
      "guide-perencanaan-utilitas-bangunan-komersial",
      "guide-akses-logistik-proyek-gudang-dan-pabrik",
    ];
    for (const item of b09a) {
      for (const futureId of futureIds) {
        expect(item.relationships.guides).not.toContain(futureId);
      }
    }
  });
});

describe("Batch 09A — service and sector relationships", () => {
  it("seluruh halaman mereferensikan svc-bangun-bangunan-komersial, published+verified", () => {
    for (const item of b09a) {
      expect(item.relationships.services).toContain("svc-bangun-bangunan-komersial");
    }
    expect(publishedServiceIds.has("svc-bangun-bangunan-komersial")).toBe(true);
  });

  it("pillar mereferensikan seluruh 10 sector komersial, semuanya published+verified", () => {
    for (const sectorId of REQUIRED_SECTOR_IDS) {
      expect(pillar.relationships.sectors).toContain(sectorId);
      expect(publishedSectorIds.has(sectorId)).toBe(true);
    }
  });

  it("setiap cost guide mempunyai tepat satu primary sector sesuai mapping, published+verified", () => {
    for (const item of costGuides) {
      const expectedSector = COST_GUIDE_SECTOR_MAP[item.slug as keyof typeof COST_GUIDE_SECTOR_MAP];
      expect(item.relationships.sectors).toEqual([expectedSector]);
      expect(publishedSectorIds.has(expectedSector)).toBe(true);
    }
  });

  it("tidak ada halaman yang mereferensikan service/sector yang masih review, draft, atau archived", () => {
    for (const item of b09a) {
      for (const serviceId of item.relationships.services) {
        expect(publishedServiceIds.has(serviceId), `service ${serviceId} tidak published+verified`).toBe(true);
      }
      for (const sectorId of item.relationships.sectors) {
        expect(publishedSectorIds.has(sectorId), `sector ${sectorId} tidak published+verified`).toBe(true);
      }
    }
  });

  it("seluruh halaman menautkan /layanan/bangun-bangunan-komersial secara inline di body", () => {
    for (const slug of B09A_ALL_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/\/layanan\/bangun-bangunan-komersial/);
    }
  });
});

describe("Batch 09A — article-type mapping", () => {
  it("pillar articleType: pillar, seluruh cost guide articleType: cost", () => {
    expect(pillar.article.articleType).toBe("pillar");
    for (const item of costGuides) {
      expect(item.article.articleType).toBe("cost");
    }
  });
});

describe("Batch 09A — cannibalization guardrail", () => {
  it("primary keyword seluruh halaman Batch 09A tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("tidak ada cost guide yang memakai keyword transactional sector (mis. 'kontraktor ruko')", () => {
    const forbidden = COST_GUIDE_SLUGS.map((slug) => {
      const sectorSlug = slug.replace("biaya-bangun-", "");
      return `kontraktor ${sectorSlug}`;
    });
    const keywords = costGuides.map((item) => item.primaryKeyword?.trim().toLowerCase());
    for (const term of forbidden) {
      expect(keywords).not.toContain(term);
    }
  });

  it("pillar tidak memakai keyword transactional service (mis. 'jasa bangun bangunan komersial')", () => {
    expect(pillar.primaryKeyword?.trim().toLowerCase()).not.toBe("jasa bangun bangunan komersial");
  });

  it("pillar vs tahapan-bangun-rumah-dari-nol (Batch 07) dan renovasi-total-vs-renovasi-sebagian (Batch 08): distinct cluster/audience, tidak duplikat keyword", () => {
    const otherPillarKeywords = guides
      .filter((g) =>
        ["tahapan-bangun-rumah-dari-nol", "renovasi-total-vs-renovasi-sebagian"].includes(g.slug)
      )
      .map((g) => g.primaryKeyword?.trim().toLowerCase());
    expect(otherPillarKeywords).not.toContain(pillar.primaryKeyword?.trim().toLowerCase());
  });

  it("title/description/excerpt tidak identik satu sama lain lintas seluruh 10 cost guide", () => {
    const fields: (keyof GuideItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = costGuides.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("biaya-bangun-cafe vs biaya-bangun-restoran: distinct scale framing (peralatan dapur ringan vs dapur produksi skala besar)", () => {
    const cafe = readBody("biaya-bangun-cafe");
    const restoran = readBody("biaya-bangun-restoran");
    expect(cafe.toLowerCase()).toContain("peralatan dapur ringan");
    expect(restoran.toLowerCase()).toContain("dapur produksi");
  });

  it("biaya-bangun-gudang vs biaya-bangun-pabrik: distinct scope (pabrik bukan hanya biaya shell)", () => {
    const gudang = readBody("biaya-bangun-gudang");
    const pabrik = readBody("biaya-bangun-pabrik");
    expect(pabrik.toLowerCase()).toContain("proses produksi");
    expect(gudang.toLowerCase()).not.toContain("proses produksi");
  });

  it("pillar tidak menjadi ringkasan dangkal cost guide — mencakup business requirement hingga kesiapan operasional", () => {
    const body = readBody(PILLAR_SLUG);
    expect(body).toMatch(/business requirement/i);
    expect(body).toMatch(/kesiapan operasional/i);
  });
});

describe("Batch 09A — audience and tone guardrail", () => {
  it("CTA business-oriented di seluruh halaman, bukan homeowner-oriented", () => {
    for (const item of b09a) {
      expect(item.conversion.primaryCta.label).not.toMatch(/rumah impian|hunian keluarga/i);
    }
  });

  it("audiens pillar disebutkan mencakup pemilik usaha, investor, pengembang, dan operator bangunan", () => {
    const body = readBody(PILLAR_SLUG);
    expect(body).toMatch(/pemilik usaha/i);
    expect(body).toMatch(/investor/i);
    expect(body).toMatch(/operator bangunan/i);
  });
});

describe("Batch 09A — metadata", () => {
  it("published pages menghasilkan index,follow; 3 mandatory-review guide tetap noindex,follow", () => {
    for (const item of b09a) {
      const metadata = buildMetadata(item);
      if (MANDATORY_REVIEW_SLUGS.includes(item.slug as (typeof MANDATORY_REVIEW_SLUGS)[number])) {
        expect(metadata.robots).toMatchObject({ index: false, follow: true });
      } else {
        expect(metadata.robots).toMatchObject({ index: true, follow: true });
      }
    }
  });

  it("seluruh title unik setelah buildMetadata", () => {
    const titles = b09a.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /panduan/[slug] yang benar", () => {
    for (const item of b09a) {
      expect(item.route).toBe(`/panduan/${item.slug}`);
    }
  });
});

describe("Batch 09A — structured data", () => {
  it("seluruh halaman menghasilkan node Article + BreadcrumbList, bukan Service", () => {
    for (const item of b09a) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Article");
      expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("Service");
    }
  });

  it("tidak ada Offer, price, rating, atau review pada halaman manapun", () => {
    for (const item of b09a) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
      }
    }
  });

  it("FAQPage tetap disabled sitewide", () => {
    for (const item of b09a) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("FAQPage");
    }
  });
});

describe("Batch 09A — sitemap and hub", () => {
  it("published pages masuk sitemap; 3 mandatory-review guide (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of b09a) {
      if (MANDATORY_REVIEW_SLUGS.includes(item.slug as (typeof MANDATORY_REVIEW_SLUGS)[number])) {
        expect(eligible).not.toContain(item.route);
      } else {
        expect(eligible).toContain(item.route);
      }
    }
  });
});
