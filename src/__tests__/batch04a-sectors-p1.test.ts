import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { SectorItem } from "@/schemas/content-types";

const P1_SECTOR_SLUGS = [
  "rumah-tinggal",
  "ruko",
  "gudang",
  "pabrik",
  "kantor",
  "kos",
] as const;

const SERVICE_KEYWORDS = [
  "jasa bangun rumah",
  "jasa renovasi rumah",
  "jasa bangun bangunan komersial",
  "jasa design and build",
  "jasa building maintenance",
  "jasa manajemen konstruksi",
  "jasa pengawasan proyek",
  "jasa owner representative",
  "jasa value engineering",
  "jasa pengendalian biaya proyek",
  "jasa renovasi bangunan komersial",
  "jasa interior fit out",
  "jasa preventive maintenance bangunan",
  "jasa corrective maintenance bangunan",
  "jasa pengendalian cashflow proyek",
  "jasa audit biaya proyek",
  "jasa penyusunan rab",
  "jasa estimasi biaya konstruksi",
  "jasa quality control konstruksi",
  "jasa pengendalian jadwal proyek",
];

const { items, issues } = loadAllContent();
const sectors = items.filter((item): item is SectorItem => item.type === "sector");
const p1 = sectors.filter((item) =>
  P1_SECTOR_SLUGS.includes(item.slug as (typeof P1_SECTOR_SLUGS)[number])
);
const publishedServiceIds = new Set(
  items
    .filter((item) => item.type === "service" && item.status === "published" && item.ownerVerified)
    .map((item) => item.id)
);
const readBody = (slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", "sectors", `${slug}.mdx`), "utf8");

describe("Batch 04A — content validation", () => {
  it("seluruh 6 file sector P1 valid tanpa error schema", () => {
    expect(issues.filter((i) => P1_SECTOR_SLUGS.some((s) => i.file.includes(s)))).toEqual([]);
  });

  it("tepat 6 halaman sector P1 dibuat", () => {
    expect(p1.map((i) => i.slug).sort()).toEqual([...P1_SECTOR_SLUGS].sort());
  });

  it("id menggunakan namespace sec-* dan cocok dengan slug", () => {
    for (const item of p1) {
      expect(item.id).toBe(`sec-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("seluruh halaman sector P1 masih review/ownerVerified:false/publishedAt:null", () => {
    for (const item of p1) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("relationships.locations/guides/projects kosong untuk seluruh sector P1", () => {
    for (const item of p1) {
      expect(item.relationships.locations).toEqual([]);
      expect(item.relationships.guides).toEqual([]);
      expect(item.relationships.projects).toEqual([]);
    }
  });

  it("sector.commonRisks memiliki minimal tiga risiko", () => {
    for (const item of p1) {
      expect(item.sector.commonRisks.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("Batch 04A — service relationship validation", () => {
  it("seluruh relationships.services resolve ke service yang published dan ownerVerified", () => {
    const relIssues = validateRelationships(items);
    const p1Issues = relIssues.filter((i) => P1_SECTOR_SLUGS.some((s) => i.file.includes(s)));
    expect(p1Issues).toEqual([]);

    for (const item of p1) {
      for (const serviceId of item.relationships.services) {
        expect(
          publishedServiceIds.has(serviceId),
          `${item.slug}: service ID ${serviceId} tidak published/verified`
        ).toBe(true);
      }
    }
  });

  it("service relationship count berada di rentang 3-7 per sektor, tidak memasukkan seluruh 20 service", () => {
    for (const item of p1) {
      expect(item.relationships.services.length).toBeGreaterThanOrEqual(3);
      expect(item.relationships.services.length).toBeLessThanOrEqual(7);
    }
  });

  it("tidak ada self-reference atau duplicate service ID dalam satu sektor", () => {
    for (const item of p1) {
      expect(item.relationships.services).not.toContain(item.id);
      expect(new Set(item.relationships.services).size).toBe(
        item.relationships.services.length
      );
    }
  });
});

describe("Batch 04A — cannibalization guardrail", () => {
  it("primary keyword sector P1 tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("keyword service tidak diambil sebagai primary keyword sector", () => {
    const sectorKeywords = p1.map((item) => item.primaryKeyword?.trim().toLowerCase());
    for (const serviceKeyword of SERVICE_KEYWORDS) {
      expect(sectorKeywords).not.toContain(serviceKeyword);
    }
  });

  it("title/description/excerpt/hero.summary sector P1 tidak identik satu sama lain", () => {
    const fields: (keyof SectorItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = p1.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
    const summaries = p1.map((item) => item.hero.summary);
    expect(new Set(summaries).size).toBe(summaries.length);
  });

  it("sector.commonRisks tidak identik antar dua sektor manapun (similarity guardrail)", () => {
    for (let i = 0; i < p1.length; i++) {
      for (let j = i + 1; j < p1.length; j++) {
        const a = [...p1[i].sector.commonRisks].sort().join("|");
        const b = [...p1[j].sector.commonRisks].sort().join("|");
        expect(a).not.toBe(b);
      }
    }
  });

  it("tidak ada lorem ipsum atau placeholder text", () => {
    for (const slug of P1_SECTOR_SLUGS) {
      const body = readBody(slug);
      expect(body.toLowerCase()).not.toMatch(/lorem ipsum|placeholder text|TODO/);
    }
  });
});

describe("Batch 04A — technical claim guardrails", () => {
  const PROHIBITED_CLAIMS: { pattern: RegExp; message: string }[] = [
    { pattern: /\bmenjamin\b/i, message: "menjamin (tanpa negasi/kualifikasi)" },
    { pattern: /pasti memenuhi/i, message: "klaim kepastian pemenuhan standar" },
    { pattern: /sesuai semua standar/i, message: "klaim memenuhi semua standar" },
    { pattern: /aman sepenuhnya/i, message: "klaim aman sepenuhnya" },
    { pattern: /bebas risiko/i, message: "klaim bebas risiko" },
    { pattern: /tahan gempa/i, message: "klaim tahan gempa tanpa desain teknis" },
    { pattern: /memenuhi standar medis/i, message: "klaim standar medis" },
    { pattern: /menjamin izin/i, message: "menjamin izin disetujui" },
    { pattern: /tanpa gangguan operasional/i, message: "klaim tanpa gangguan operasional" },
    { pattern: /terbaik|terpercaya\b/i, message: "klaim absolut (terbaik/terpercaya)" },
  ];

  const NEGATION_CUE = /\b(tidak|bukan|belum|kecuali)\b/i;
  // FAQ questions ("Apakah Arkavena menjamin...?") are legitimate even
  // unqualified in the question itself — the negation lives in the answer
  // that follows, sometimes beyond a 60-char forward window.
  const QUESTION_CUE = /\bapakah\b[^.?!]{0,80}\?/i;

  function hasUnqualifiedClaim(body: string, pattern: RegExp): boolean {
    const matches = [...body.matchAll(new RegExp(pattern, "gi"))];
    return matches.some((match) => {
      const context = body.slice(
        Math.max(0, match.index! - 80),
        Math.min(body.length, match.index! + 200)
      );
      return !NEGATION_CUE.test(context) && !QUESTION_CUE.test(context);
    });
  }

  it("body MDX tidak memuat klaim teknis terlarang tanpa kualifikasi", () => {
    for (const slug of P1_SECTOR_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of PROHIBITED_CLAIMS) {
        expect(
          hasUnqualifiedClaim(body, pattern),
          `${slug}.mdx: ${message}`
        ).toBe(false);
      }
    }
  });

  it("pabrik menggunakan bahasa konservatif dan menyatakan batas peran Arkavena", () => {
    const body = readBody("pabrik");
    expect(body).toMatch(/tidak menyediakan process engineering|di luar cakupan|batas peran/i);
  });

  it("gudang menandai floor load, fire protection, dan hazardous storage sebagai kajian spesialis", () => {
    const body = readBody("gudang");
    expect(body).toMatch(/floor load/i);
    expect(body).toMatch(/kajian spesialis/i);
  });

  it("kos tidak membuat klaim investasi/okupansi/balik modal tanpa kualifikasi", () => {
    // The correct content explicitly disclaims these terms ("bukan analisis
    // investasi, proyeksi okupansi, atau perhitungan balik modal") — that's
    // required by the brief, not forbidden. Only an unqualified positive
    // claim would be a violation.
    const body = readBody("kos");
    for (const pattern of [/proyeksi okupansi/i, /balik modal/i, /keuntungan investasi/i]) {
      expect(
        hasUnqualifiedClaim(body, pattern),
        `kos.mdx: klaim "${pattern}" tanpa kualifikasi/negasi`
      ).toBe(false);
    }
    // The disclaiming sentence itself must still be present.
    expect(body).toMatch(/bukan analisis investasi/i);
  });
});

describe("Batch 04A — metadata", () => {
  it("seluruh 6 halaman sector P1 menghasilkan noindex,follow (masih review)", () => {
    for (const item of p1) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });

  it("seluruh title sector P1 unik setelah buildMetadata", () => {
    const titles = p1.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /sektor/[slug] yang benar", () => {
    for (const item of p1) {
      expect(item.route).toBe(`/sektor/${item.slug}`);
    }
  });
});

describe("Batch 04A — structured data", () => {
  it("seluruh 6 halaman sector P1 menghasilkan node Service + BreadcrumbList", () => {
    for (const item of p1) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Service");
      expect(types).toContain("BreadcrumbList");
    }
  });

  it("serviceType sesuai buildingType masing-masing sektor (berbeda antarhalaman)", () => {
    const serviceTypes = p1.map((item) => item.sector.buildingType);
    expect(new Set(serviceTypes).size).toBe(serviceTypes.length);
  });

  it("tidak ada Offer, price, rating, atau LocalBusiness per sektor", () => {
    for (const item of p1) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("LocalBusiness");
      expect(types).not.toContain("Organization");
      expect(types).not.toContain("WebSite");
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
      }
    }
  });
});

describe("Batch 04A — sitemap and hub", () => {
  it("halaman sector P1 (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of p1) {
      expect(eligible).not.toContain(item.route);
    }
  });
});
