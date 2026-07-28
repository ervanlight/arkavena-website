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

/** Only the pillar is active in Batch 09A — all 10 cost guides are blocked. */
const B09A_ALL_SLUGS = [PILLAR_SLUG] as const;

const BLOCKED_COST_SLUGS = [
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

const REQUIRED_SECTOR_IDS = [
  "sec-ruko",
  "sec-gudang",
  "sec-pabrik",
  "sec-kantor",
  "sec-kos",
  "sec-cafe",
  "sec-restoran",
  "sec-klinik",
  "sec-sekolah",
  "sec-masjid",
] as const;

const { items, issues } = loadAllContent();
const guides = items.filter((item): item is GuideItem => item.type === "guide");
const b09a = guides.filter((item) =>
  B09A_ALL_SLUGS.includes(item.slug as (typeof B09A_ALL_SLUGS)[number])
);
const pillar = b09a.find((item) => item.slug === PILLAR_SLUG)!;

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

describe("Batch 09A — cost-data hard gate (all 10 commercial cost guides blocked)", () => {
  it("tidak ada satu pun dari 10 biaya-bangun-[sektor].mdx dibuat sebagai active content", () => {
    for (const slug of BLOCKED_COST_SLUGS) {
      expect(guides.some((item) => item.slug === slug)).toBe(false);
    }
  });

  it("planning/batch-09-sector-cost-data-required.md ada dan mendokumentasikan seluruh 10 blocker, dan tidak dibaca content loader", () => {
    const planningPath = path.join(process.cwd(), "planning", "batch-09-sector-cost-data-required.md");
    expect(fs.existsSync(planningPath)).toBe(true);
    const planningBody = fs.readFileSync(planningPath, "utf8");
    expect(planningBody).toMatch(/BLOCKED/i);
    for (const slug of BLOCKED_COST_SLUGS) {
      expect(planningBody).toContain(slug);
    }
    expect(guides.some((item) => item.sourcePath.includes("planning"))).toBe(false);
  });

  it("pillar tidak mereferensikan guide ID biaya yang belum ada (no-future-ID rule)", () => {
    for (const slug of BLOCKED_COST_SLUGS) {
      expect(pillar.relationships.guides).not.toContain(`guide-${slug}`);
    }
  });

  it("pillar tidak memuat angka harga/persentase yang terlihat sebagai data pasar tanpa sumber", () => {
    const FORBIDDEN_NUMBER_PATTERNS = [/Rp\s?\d/i, /\d+\s?%(?!\s?\))/];
    const body = readBody(PILLAR_SLUG);
    for (const pattern of FORBIDDEN_NUMBER_PATTERNS) {
      expect(pattern.test(body), `pillar matched forbidden pattern ${pattern}`).toBe(false);
    }
  });

  it("pillar tidak menggeneralisasi satu angka biaya dari satu jenis bangunan ke jenis lain", () => {
    const body = readBody(PILLAR_SLUG);
    expect(body).toMatch(/cost driver yang berbeda/i);
    expect(body).toMatch(/tidak dapat menggunakan angka dari jenis bangunan lain/i);
  });
});

describe("Batch 09A — content validation", () => {
  it("pillar valid tanpa error schema", () => {
    expect(issues.filter((i) => i.file.endsWith(`${PILLAR_SLUG}.mdx`))).toEqual([]);
  });

  it("tepat 1 halaman aktif dibuat pada Batch 09A (pillar saja, 10 cost guide blocked, 3 supporting guide P4 deferred ke 09B)", () => {
    expect(b09a.map((i) => i.slug).sort()).toEqual([...B09A_ALL_SLUGS].sort());
  });

  it("id menggunakan namespace guide-* dan cocok dengan slug", () => {
    expect(pillar.id).toBe(`guide-${pillar.slug}`);
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("pillar masih review/ownerVerified:false/publishedAt:null/reviewedBy:null (menunggu review owner)", () => {
    expect(pillar.status).toBe("review");
    expect(pillar.ownerVerified).toBe(false);
    expect(pillar.publishedAt).toBeNull();
    expect(pillar.reviewedBy).toBeNull();
    expect(pillar.isIndexable).toBe(false);
  });

  it("relationships.projects dan relationships.locations kosong untuk pillar", () => {
    expect(pillar.relationships.projects).toEqual([]);
    expect(pillar.relationships.locations).toEqual([]);
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

  it("relationships.guides kosong pada Batch 09A (belum ada supporting guide yang dibuat)", () => {
    expect(pillar.relationships.guides).toEqual([]);
  });

  it("seluruh guide ID dalam relationships (jika ada) resolve ke item yang benar-benar ada", () => {
    const relIssues = validateRelationships(items);
    const b09aIssues = relIssues.filter((i) => i.file.endsWith(`${PILLAR_SLUG}.mdx`));
    expect(b09aIssues).toEqual([]);
  });
});

describe("Batch 09A — service and sector relationships", () => {
  it("pillar mereferensikan svc-bangun-bangunan-komersial, published+verified", () => {
    expect(pillar.relationships.services).toContain("svc-bangun-bangunan-komersial");
    expect(publishedServiceIds.has("svc-bangun-bangunan-komersial")).toBe(true);
  });

  it("pillar mereferensikan seluruh 10 sector komersial, semuanya published+verified", () => {
    for (const sectorId of REQUIRED_SECTOR_IDS) {
      expect(pillar.relationships.sectors).toContain(sectorId);
      expect(publishedSectorIds.has(sectorId)).toBe(true);
    }
  });

  it("pillar tidak mereferensikan service/sector yang masih review, draft, atau archived", () => {
    for (const serviceId of pillar.relationships.services) {
      expect(publishedServiceIds.has(serviceId), `service ${serviceId} tidak published+verified`).toBe(true);
    }
    for (const sectorId of pillar.relationships.sectors) {
      expect(publishedSectorIds.has(sectorId), `sector ${sectorId} tidak published+verified`).toBe(true);
    }
  });

  it("pillar menautkan /layanan/bangun-bangunan-komersial secara inline di body", () => {
    const body = readBody(PILLAR_SLUG);
    expect(body).toMatch(/\/layanan\/bangun-bangunan-komersial/);
  });
});

describe("Batch 09A — article-type mapping", () => {
  it("pillar articleType sesuai mapping yang didokumentasikan (planning/batch-09-article-type-mapping.md)", () => {
    expect(pillar.article.articleType).toBe("pillar");
  });
});

describe("Batch 09A — cannibalization guardrail", () => {
  it("primary keyword pillar tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
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

  it("pillar tidak menjadi ringkasan dangkal cost guide — mencakup business requirement hingga kesiapan operasional, bukan hanya biaya", () => {
    const body = readBody(PILLAR_SLUG);
    expect(body).toMatch(/business requirement/i);
    expect(body).toMatch(/kesiapan operasional/i);
    expect(body).not.toMatch(/mulai dari rp\d/i);
  });
});

describe("Batch 09A — audience and tone guardrail", () => {
  it("CTA business-oriented, bukan homeowner-oriented", () => {
    expect(pillar.conversion.primaryCta.label).not.toMatch(/rumah impian|hunian keluarga/i);
    expect(pillar.conversion.primaryCta.label).toMatch(/proyek komersial|kebutuhan proyek/i);
  });

  it("audiens disebutkan mencakup pemilik usaha, investor, pengembang, dan operator bangunan", () => {
    const body = readBody(PILLAR_SLUG);
    expect(body).toMatch(/pemilik usaha/i);
    expect(body).toMatch(/investor/i);
    expect(body).toMatch(/operator bangunan/i);
  });
});

describe("Batch 09A — metadata", () => {
  it("pillar menghasilkan noindex,follow (masih review)", () => {
    const metadata = buildMetadata(pillar);
    expect(metadata.robots).toMatchObject({ index: false, follow: true });
  });

  it("canonical menggunakan route /panduan/[slug] yang benar", () => {
    expect(pillar.route).toBe(`/panduan/${pillar.slug}`);
  });
});

describe("Batch 09A — structured data", () => {
  it("pillar menghasilkan node Article + BreadcrumbList, bukan Service", () => {
    const graph = buildJsonLdGraph(pillar) as unknown as { "@graph": Record<string, unknown>[] };
    const types = graph["@graph"].map((n) => n["@type"]);
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).not.toContain("Service");
  });

  it("tidak ada Offer, price, rating, atau review pada pillar", () => {
    const graph = buildJsonLdGraph(pillar) as unknown as { "@graph": Record<string, unknown>[] };
    for (const node of graph["@graph"]) {
      expect(node).not.toHaveProperty("offers");
      expect(node).not.toHaveProperty("price");
      expect(node).not.toHaveProperty("aggregateRating");
      expect(node).not.toHaveProperty("review");
    }
  });

  it("FAQPage tetap disabled sitewide untuk pillar", () => {
    const graph = buildJsonLdGraph(pillar) as unknown as { "@graph": Record<string, unknown>[] };
    const types = graph["@graph"].map((n) => n["@type"]);
    expect(types).not.toContain("FAQPage");
  });
});

describe("Batch 09A — sitemap and hub", () => {
  it("pillar (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    expect(eligible).not.toContain(pillar.route);
  });
});
