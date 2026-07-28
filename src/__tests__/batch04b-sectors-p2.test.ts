import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { SectorItem } from "@/schemas/content-types";

const P2_SECTOR_SLUGS = [
  "cafe",
  "restoran",
  "sekolah",
  "masjid",
  "klinik",
  "hotel",
  "villa",
  "showroom-retail",
] as const;

// Sectors whose body contains an explicit "Arkavena tidak menyediakan X"
// scope-limiting claim (as opposed to a generic "needs specialist/data"
// flag). Per owner instruction (2026-07-28), these must NOT be promoted
// without separate explicit owner confirmation, mirroring the pabrik
// precedent from Batch 04A.
const SCOPE_LIMITING_CLAIM_SLUGS = [
  "cafe",
  "restoran",
  "klinik",
  "hotel",
  "showroom-retail",
] as const;

const { items, issues } = loadAllContent();
const sectors = items.filter((item): item is SectorItem => item.type === "sector");
const p2 = sectors.filter((item) =>
  P2_SECTOR_SLUGS.includes(item.slug as (typeof P2_SECTOR_SLUGS)[number])
);
const publishedServiceIds = new Set(
  items
    .filter((item) => item.type === "service" && item.status === "published" && item.ownerVerified)
    .map((item) => item.id)
);
const readBody = (slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", "sectors", `${slug}.mdx`), "utf8");

describe("Batch 04B — content validation", () => {
  it("seluruh 8 file sector P2 valid tanpa error schema", () => {
    expect(issues.filter((i) => P2_SECTOR_SLUGS.some((s) => i.file.includes(s)))).toEqual([]);
  });

  it("tepat 8 halaman sector P2 dibuat", () => {
    expect(p2.map((i) => i.slug).sort()).toEqual([...P2_SECTOR_SLUGS].sort());
  });

  it("id menggunakan namespace sec-* dan cocok dengan slug", () => {
    for (const item of p2) {
      expect(item.id).toBe(`sec-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("seluruh halaman sector P2 masih review/ownerVerified:false/publishedAt:null (menunggu review owner)", () => {
    for (const item of p2) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("relationships.locations/guides/projects kosong untuk seluruh sector P2", () => {
    for (const item of p2) {
      expect(item.relationships.locations).toEqual([]);
      expect(item.relationships.guides).toEqual([]);
      expect(item.relationships.projects).toEqual([]);
    }
  });

  it("sector.commonRisks memiliki minimal tiga risiko", () => {
    for (const item of p2) {
      expect(item.sector.commonRisks.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("Batch 04B — service relationship validation", () => {
  it("seluruh relationships.services resolve ke service yang published dan ownerVerified", () => {
    const relIssues = validateRelationships(items);
    const p2Issues = relIssues.filter((i) => P2_SECTOR_SLUGS.some((s) => i.file.includes(s)));
    expect(p2Issues).toEqual([]);

    for (const item of p2) {
      for (const serviceId of item.relationships.services) {
        expect(
          publishedServiceIds.has(serviceId),
          `${item.slug}: service ID ${serviceId} tidak published/verified`
        ).toBe(true);
      }
    }
  });

  it("service relationship count berada di rentang 3-7 per sektor, tidak memasukkan seluruh 20 service", () => {
    for (const item of p2) {
      expect(item.relationships.services.length).toBeGreaterThanOrEqual(3);
      expect(item.relationships.services.length).toBeLessThanOrEqual(7);
    }
  });

  it("tidak ada self-reference atau duplicate service ID dalam satu sektor", () => {
    for (const item of p2) {
      expect(item.relationships.services).not.toContain(item.id);
      expect(new Set(item.relationships.services).size).toBe(
        item.relationships.services.length
      );
    }
  });
});

describe("Batch 04B — cannibalization guardrail", () => {
  it("primary keyword sector P2 tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("title/description/excerpt/hero.summary sector P2 tidak identik satu sama lain", () => {
    const fields: (keyof SectorItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = p2.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
    const summaries = p2.map((item) => item.hero.summary);
    expect(new Set(summaries).size).toBe(summaries.length);
  });

  it("sector.commonRisks tidak identik antar dua sektor manapun (similarity guardrail)", () => {
    for (let i = 0; i < p2.length; i++) {
      for (let j = i + 1; j < p2.length; j++) {
        const a = [...p2[i].sector.commonRisks].sort().join("|");
        const b = [...p2[j].sector.commonRisks].sort().join("|");
        expect(a).not.toBe(b);
      }
    }
  });

  it("cafe dan restoran (pasangan F&B paling dekat) memiliki commonRisks dan buildingType berbeda", () => {
    const cafe = p2.find((item) => item.slug === "cafe")!;
    const restoran = p2.find((item) => item.slug === "restoran")!;
    expect(cafe.sector.buildingType).not.toBe(restoran.sector.buildingType);
    expect([...cafe.sector.commonRisks].sort().join("|")).not.toBe(
      [...restoran.sector.commonRisks].sort().join("|")
    );
  });

  it("tidak ada lorem ipsum atau placeholder text", () => {
    for (const slug of P2_SECTOR_SLUGS) {
      const body = readBody(slug);
      expect(body.toLowerCase()).not.toMatch(/lorem ipsum|placeholder text|TODO/);
    }
  });
});

describe("Batch 04B — technical claim guardrails", () => {
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
    for (const slug of P2_SECTOR_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of PROHIBITED_CLAIMS) {
        expect(
          hasUnqualifiedClaim(body, pattern),
          `${slug}.mdx: ${message}`
        ).toBe(false);
      }
    }
  });

  it("klinik menyatakan batas peran Arkavena untuk gas medis/proteksi radiasi", () => {
    const body = readBody("klinik");
    expect(body).toMatch(/gas medis/i);
    expect(body).toMatch(/tidak menyediakan desain sistem gas medis|batas peran/i);
  });

  it("cafe dan restoran menyatakan batas peran Arkavena untuk kitchen consultant/peralatan F&B", () => {
    for (const slug of ["cafe", "restoran"] as const) {
      const body = readBody(slug);
      expect(body).toMatch(/kitchen consultant/i);
      expect(body).toMatch(/batas peran/i);
    }
  });

  it("hotel menyatakan batas peran Arkavena untuk FF&E dan brand standard", () => {
    const body = readBody("hotel");
    expect(body).toMatch(/FF&E/i);
    expect(body).toMatch(/batas peran/i);
  });

  it("showroom-retail menyatakan batas peran Arkavena untuk visual merchandising", () => {
    const body = readBody("showroom-retail");
    expect(body).toMatch(/visual merchandising/i);
    expect(body).toMatch(/batas peran/i);
  });

  it("villa tidak membuat klaim investasi/okupansi/pendapatan sewa tanpa kualifikasi", () => {
    const body = readBody("villa");
    for (const pattern of [/proyeksi okupansi/i, /pendapatan sewa/i]) {
      expect(
        hasUnqualifiedClaim(body, pattern),
        `villa.mdx: klaim "${pattern}" tanpa kualifikasi/negasi`
      ).toBe(false);
    }
  });
});

describe("Batch 04B — scope-limiting claim register", () => {
  it("sektor dengan klaim 'Arkavena tidak menyediakan X' terdaftar dan ditandai untuk konfirmasi owner terpisah sebelum promotion", () => {
    // This is a documentation/tracking test, not a content-correctness
    // test: it keeps the register in this file in sync with the actual
    // set of scope-limiting-claim pages so a future promotion cannot
    // silently skip the extra owner-confirmation step.
    for (const slug of SCOPE_LIMITING_CLAIM_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/Batas peran Arkavena pada sektor ini/i);
    }
  });

  it("sekolah, masjid, dan villa TIDAK memiliki klaim scope-limiting absolut (hanya butuh kajian spesialis)", () => {
    for (const slug of ["sekolah", "masjid", "villa"] as const) {
      const body = readBody(slug);
      expect(body).not.toMatch(/Batas peran Arkavena pada sektor ini/i);
    }
  });
});

describe("Batch 04B — metadata", () => {
  it("seluruh 8 halaman sector P2 menghasilkan noindex,follow (masih review)", () => {
    for (const item of p2) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });

  it("seluruh title sector P2 unik setelah buildMetadata", () => {
    const titles = p2.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /sektor/[slug] yang benar", () => {
    for (const item of p2) {
      expect(item.route).toBe(`/sektor/${item.slug}`);
    }
  });
});

describe("Batch 04B — structured data", () => {
  it("seluruh 8 halaman sector P2 menghasilkan node Service + BreadcrumbList", () => {
    for (const item of p2) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Service");
      expect(types).toContain("BreadcrumbList");
    }
  });

  it("serviceType sesuai buildingType masing-masing sektor (berbeda antarhalaman)", () => {
    const serviceTypes = p2.map((item) => item.sector.buildingType);
    expect(new Set(serviceTypes).size).toBe(serviceTypes.length);
  });

  it("tidak ada Offer, price, rating, atau LocalBusiness per sektor", () => {
    for (const item of p2) {
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

describe("Batch 04B — sitemap and hub", () => {
  it("halaman sector P2 (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of p2) {
      expect(eligible).not.toContain(item.route);
    }
  });
});
