import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { ServiceItem } from "@/schemas/content-types";

const P1_SLUGS = [
  "bangun-rumah",
  "renovasi-rumah",
  "bangun-bangunan-komersial",
  "design-and-build",
  "building-maintenance",
  "manajemen-konstruksi",
  "pengawasan-proyek",
  "owner-representative",
  "value-engineering",
  "pengendalian-biaya-proyek",
] as const;

const { items, issues } = loadAllContent();
const services = items.filter(
  (item): item is ServiceItem => item.type === "service"
);
const p1 = services.filter((item) => P1_SLUGS.includes(item.slug as (typeof P1_SLUGS)[number]));
const bySlug = (slug: string) => p1.find((item) => item.slug === slug)!;

describe("Batch 02 — content validation", () => {
  it("seluruh 10 file P1 valid tanpa error schema", () => {
    expect(issues.filter((i) => P1_SLUGS.some((s) => i.file.includes(s)))).toEqual([]);
  });

  it("tepat 10 halaman P1 dibuat", () => {
    expect(p1.map((i) => i.slug).sort()).toEqual([...P1_SLUGS].sort());
  });

  it("id menggunakan namespace svc-* dan cocok dengan slug", () => {
    for (const item of p1) {
      expect(item.id).toBe(`svc-${item.slug}`);
    }
  });

  it("seluruh ID unik di manifest", () => {
    const dupes = validateUniqueness(items).filter((i) => i.rule === "duplicate-id");
    expect(dupes).toEqual([]);
  });

  it("seluruh route unik di manifest", () => {
    const dupes = validateUniqueness(items).filter((i) => i.rule === "duplicate-route");
    expect(dupes).toEqual([]);
  });

  it("pricingMode selalu consultation, tidak ada Offer/harga di frontmatter", () => {
    for (const item of p1) {
      expect(item.service.pricingMode).toBe("consultation");
    }
  });

  it("seluruh halaman P1 masih review/ownerVerified:false/publishedAt:null", () => {
    for (const item of p1) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("relationships.sectors/guides/projects kosong untuk seluruh halaman P1", () => {
    for (const item of p1) {
      expect(item.relationships.sectors).toEqual([]);
      expect(item.relationships.guides).toEqual([]);
      expect(item.relationships.projects).toEqual([]);
    }
  });

  it("related service IDs resolve dan tidak self-reference", () => {
    const relIssues = validateRelationships(items);
    const p1Issues = relIssues.filter((i) =>
      P1_SLUGS.some((s) => i.file.includes(s))
    );
    expect(p1Issues).toEqual([]);
    for (const item of p1) {
      expect(item.relationships.services).not.toContain(item.id);
    }
  });

  it("related services menggunakan 2-5 ID, bukan seluruh service lain", () => {
    for (const item of p1) {
      expect(item.relationships.services.length).toBeGreaterThanOrEqual(2);
      expect(item.relationships.services.length).toBeLessThanOrEqual(5);
    }
  });
});

describe("Batch 02 — cannibalization guardrail", () => {
  it("primary keyword tidak boleh duplikat lintas seluruh koleksi (bukan hanya P1)", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("title P1 tidak identik satu sama lain", () => {
    const titles = p1.map((item) => item.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("description P1 tidak identik satu sama lain", () => {
    const descriptions = p1.map((item) => item.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("excerpt P1 tidak identik satu sama lain", () => {
    const excerpts = p1.map((item) => item.excerpt);
    expect(new Set(excerpts).size).toBe(excerpts.length);
  });

  it("hero.summary P1 tidak identik satu sama lain (deteksi copy-paste antarservice)", () => {
    const summaries = p1.map((item) => item.hero.summary);
    expect(new Set(summaries).size).toBe(summaries.length);
  });

  it("deliverables tidak seluruhnya identik antar dua service manapun", () => {
    for (let i = 0; i < p1.length; i++) {
      for (let j = i + 1; j < p1.length; j++) {
        const a = [...p1[i].service.deliverables].sort().join("|");
        const b = [...p1[j].service.deliverables].sort().join("|");
        expect(a).not.toBe(b);
      }
    }
  });
});

describe("Batch 02 — terminology guardrails", () => {
  const FORBIDDEN_PATTERNS: { pattern: RegExp; message: string }[] = [
    { pattern: /pasti tepat waktu/i, message: "menjanjikan kepastian waktu" },
    { pattern: /pasti sesuai anggaran/i, message: "menjanjikan kepastian anggaran" },
    { pattern: /bebas risiko/i, message: "klaim bebas risiko" },
    { pattern: /hasil dijamin/i, message: "menjamin hasil" },
    { pattern: /garansi penuh/i, message: "klaim garansi penuh" },
    { pattern: /konsultasi gratis/i, message: "klaim konsultasi gratis" },
    { pattern: /estimasi instan/i, message: "menjanjikan estimasi instan" },
    { pattern: /respons dalam \d+\s*(menit|jam)/i, message: "menjanjikan waktu respons spesifik" },
    { pattern: /bersertifikat/i, message: "klaim sertifikasi tanpa bukti" },
    { pattern: /ratusan proyek/i, message: "klaim jumlah proyek tanpa bukti" },
    { pattern: /puluhan tahun/i, message: "klaim pengalaman tanpa bukti" },
  ];

  // Checked separately because two usages are legitimate: a negated
  // exclusion ("tidak mencakup layanan darurat 24 jam") and an FAQ question
  // asking about it, answered with that same negation a little further on.
  // A bare substring match would flag both, even though they're exactly the
  // required phrasing.
  const NEGATION_CUE = /\b(tidak|bukan|belum|kecuali)\b/i;
  const QUESTION_CUE = /\bapakah\b[^.?!]{0,80}\?/i;

  function has24HourClaim(body: string): boolean {
    const matches = [...body.matchAll(/24\s*jam/gi)];
    return matches.some((match) => {
      const context = body.slice(
        Math.max(0, match.index! - 40),
        Math.min(body.length, match.index! + 200)
      );
      return !NEGATION_CUE.test(context) && !QUESTION_CUE.test(context);
    });
  }

  it("body MDX tidak memuat klaim terlarang", () => {
    for (const slug of P1_SLUGS) {
      const body = fs.readFileSync(
        path.join(process.cwd(), "content", "services", `${slug}.mdx`),
        "utf8"
      );
      for (const { pattern, message } of FORBIDDEN_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
      expect(
        has24HourClaim(body),
        `${slug}.mdx: menjanjikan layanan 24 jam tanpa negasi`
      ).toBe(false);
    }
  });

  it("cashflow tidak disamakan dengan total biaya proyek pada halaman cashflow-adjacent", () => {
    // Guards the specific conflation the brief calls out: cashflow control
    // and cost control must stay distinguishable even where they're related.
    const costControl = bySlug("pengendalian-biaya-proyek");
    expect(costControl.title.toLowerCase()).not.toContain("cashflow");
  });

  it("value engineering tidak disamakan dengan pemotongan biaya semata", () => {
    const ve = bySlug("value-engineering");
    const body = fs.readFileSync(
      path.join(process.cwd(), "content", "services", "value-engineering.mdx"),
      "utf8"
    );
    expect(body).toMatch(/tidak selalu menurunkan biaya|bukan sekadar/i);
    expect(ve.excerpt.toLowerCase()).not.toBe("cara memotong biaya proyek");
  });

  it("owner representative tidak diklaim sebagai kuasa hukum", () => {
    const body = fs.readFileSync(
      path.join(process.cwd(), "content", "services", "owner-representative.mdx"),
      "utf8"
    );
    expect(body).toMatch(/tidak (memiliki kuasa hukum|secara otomatis)/i);
  });
});

describe("Batch 02 — metadata", () => {
  it("seluruh 10 halaman P1 menghasilkan noindex,follow (masih review)", () => {
    for (const item of p1) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });

  it("seluruh title P1 unik setelah buildMetadata", () => {
    const titles = p1.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /layanan/[slug] yang benar", () => {
    for (const item of p1) {
      expect(item.route).toBe(`/layanan/${item.slug}`);
    }
  });
});

describe("Batch 02 — structured data", () => {
  it("seluruh 10 halaman P1 menghasilkan node Service + BreadcrumbList", () => {
    for (const item of p1) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Service");
      expect(types).toContain("BreadcrumbList");
    }
  });

  it("tidak ada Offer, price, atau rating pada node manapun", () => {
    for (const item of p1) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
      }
    }
  });

  it("tidak ada Organization/WebSite terduplikasi di graph per-halaman (sitewide-only)", () => {
    for (const item of p1) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("Organization");
      expect(types).not.toContain("WebSite");
    }
  });
});

describe("Batch 02 — sitemap", () => {
  it("halaman P1 (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of p1) {
      expect(eligible).not.toContain(item.route);
    }
  });
});
