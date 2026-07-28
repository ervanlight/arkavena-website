import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { ServiceItem } from "@/schemas/content-types";

const P2_SLUGS = [
  "renovasi-bangunan-komersial",
  "interior-fit-out",
  "preventive-maintenance-bangunan",
  "corrective-maintenance-bangunan",
  "pengendalian-cashflow-proyek",
  "audit-biaya-proyek",
  "penyusunan-rab",
  "estimasi-biaya-konstruksi",
  "quality-control-konstruksi",
  "pengendalian-jadwal-proyek",
] as const;

const P1_KEYWORDS = [
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
];

const { items, issues } = loadAllContent();
const services = items.filter(
  (item): item is ServiceItem => item.type === "service"
);
const p2 = services.filter((item) =>
  P2_SLUGS.includes(item.slug as (typeof P2_SLUGS)[number])
);
const readBody = (slug: string) =>
  fs.readFileSync(
    path.join(process.cwd(), "content", "services", `${slug}.mdx`),
    "utf8"
  );

describe("Batch 03 — content validation", () => {
  it("seluruh 10 file P2 valid tanpa error schema", () => {
    expect(issues.filter((i) => P2_SLUGS.some((s) => i.file.includes(s)))).toEqual([]);
  });

  it("tepat 10 halaman P2 dibuat", () => {
    expect(p2.map((i) => i.slug).sort()).toEqual([...P2_SLUGS].sort());
  });

  it("id menggunakan namespace svc-* dan cocok dengan slug", () => {
    for (const item of p2) {
      expect(item.id).toBe(`svc-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("pricingMode selalu consultation, tidak ada Offer/harga di frontmatter", () => {
    for (const item of p2) {
      expect(item.service.pricingMode).toBe("consultation");
    }
  });

  it("owner-approved P2 pages are published, verified, and indexable", () => {
    // Approved 2026-07-28 — owner reviewed all 10, including the three
    // flagged overlap pairs (preventive/corrective-maintenance vs building-
    // maintenance, quality-control vs pengawasan-proyek, schedule-control vs
    // manajemen-konstruksi) and confirmed KEEP SEPARATE for each.
    for (const item of p2) {
      expect(item.status).toBe("published");
      expect(item.ownerVerified).toBe(true);
      expect(item.publishedAt).toBe("2026-07-28");
      expect(item.isIndexable).toBe(true);
    }
  });

  it("relationships.sectors/guides/projects kosong untuk seluruh halaman P2", () => {
    for (const item of p2) {
      expect(item.relationships.sectors).toEqual([]);
      expect(item.relationships.guides).toEqual([]);
      expect(item.relationships.projects).toEqual([]);
    }
  });

  it("related service IDs (P1 dan P2) resolve dan tidak self-reference", () => {
    const relIssues = validateRelationships(items);
    const p2Issues = relIssues.filter((i) =>
      P2_SLUGS.some((s) => i.file.includes(s))
    );
    expect(p2Issues).toEqual([]);
    for (const item of p2) {
      expect(item.relationships.services).not.toContain(item.id);
      expect(item.relationships.services.length).toBeGreaterThanOrEqual(2);
      expect(item.relationships.services.length).toBeLessThanOrEqual(5);
    }
  });
});

describe("Batch 03 — cannibalization guardrail", () => {
  it("primary keyword P2 tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("keyword P1 tidak digunakan sebagai primary keyword P2", () => {
    const p2Keywords = p2.map((item) => item.primaryKeyword?.trim().toLowerCase());
    for (const p1Keyword of P1_KEYWORDS) {
      expect(p2Keywords).not.toContain(p1Keyword);
    }
  });

  it("title/description/excerpt/hero.summary P2 tidak identik satu sama lain", () => {
    const fields: (keyof ServiceItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = p2.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
    const summaries = p2.map((item) => item.hero.summary);
    expect(new Set(summaries).size).toBe(summaries.length);
  });

  it("deliverables tidak seluruhnya identik antar dua service P2 manapun", () => {
    for (let i = 0; i < p2.length; i++) {
      for (let j = i + 1; j < p2.length; j++) {
        const a = [...p2[i].service.deliverables].sort().join("|");
        const b = [...p2[j].service.deliverables].sort().join("|");
        expect(a).not.toBe(b);
      }
    }
  });

  it("slug P2 tidak identik dengan slug P1 manapun", () => {
    const p1Slugs = services
      .filter((item) => !P2_SLUGS.includes(item.slug as (typeof P2_SLUGS)[number]))
      .map((item) => item.slug);
    for (const item of p2) {
      expect(p1Slugs).not.toContain(item.slug);
    }
  });
});

describe("Batch 03 — terminology guardrails", () => {
  const FORBIDDEN_PATTERNS: { pattern: RegExp; message: string }[] = [
    { pattern: /pasti tepat waktu/i, message: "menjanjikan kepastian waktu" },
    { pattern: /pasti sesuai anggaran/i, message: "menjanjikan kepastian anggaran" },
    { pattern: /bebas risiko/i, message: "klaim bebas risiko" },
    { pattern: /hasil dijamin/i, message: "menjamin hasil" },
    { pattern: /garansi penuh/i, message: "klaim garansi penuh" },
    { pattern: /konsultasi gratis/i, message: "klaim konsultasi gratis" },
    { pattern: /estimasi instan/i, message: "menjanjikan estimasi instan" },
    { pattern: /respons dalam \d+\s*(menit|jam)/i, message: "menjanjikan waktu respons spesifik" },
    { pattern: /ratusan proyek/i, message: "klaim jumlah proyek tanpa bukti" },
    { pattern: /puluhan tahun/i, message: "klaim pengalaman tanpa bukti" },
  ];

  const NEGATION_CUE = /\b(tidak|bukan|belum|kecuali)\b/i;
  const QUESTION_CUE = /\bapakah\b[^.?!]{0,80}\?/i;
  // "bersertifikat" is legitimate when referring the client to a third-party
  // professional outside Arkavena's scope (e.g. "Anda memerlukan ... auditor
  // forensik bersertifikat") — only a self-claim of certification is forbidden.
  const REFERRAL_CUE = /\b(anda memerlukan|di luar ruang lingkup|pihak lain)\b/i;

  function hasUnqualifiedClaim(
    body: string,
    phrase: RegExp,
    extraCues: RegExp[] = []
  ): boolean {
    const matches = [...body.matchAll(phrase)];
    return matches.some((match) => {
      const context = body.slice(
        Math.max(0, match.index! - 40),
        Math.min(body.length, match.index! + 200)
      );
      return (
        !NEGATION_CUE.test(context) &&
        !QUESTION_CUE.test(context) &&
        !extraCues.some((cue) => cue.test(context))
      );
    });
  }

  it("body MDX tidak memuat klaim terlarang generik", () => {
    for (const slug of P2_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of FORBIDDEN_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
      expect(
        hasUnqualifiedClaim(body, /24\s*jam/gi),
        `${slug}.mdx: menjanjikan layanan 24 jam tanpa negasi`
      ).toBe(false);
      expect(
        hasUnqualifiedClaim(body, /bersertifikat/gi, [REFERRAL_CUE]),
        `${slug}.mdx: klaim sertifikasi tanpa bukti atau rujukan pihak lain`
      ).toBe(false);
    }
  });

  it("cashflow tidak disamakan dengan total project cost", () => {
    const body = readBody("pengendalian-cashflow-proyek");
    expect(body).toMatch(/bukan|berbeda|tidak sama/i);
    expect(body.toLowerCase()).not.toMatch(/cashflow (adalah|merupakan|sama dengan) total biaya/);
  });

  it("RAB tidak disamakan dengan quotation/harga final tanpa kualifikasi", () => {
    const body = readBody("penyusunan-rab");
    expect(
      hasUnqualifiedClaim(body, /rab (selalu )?sama dengan harga (tender|kontrak)/gi)
    ).toBe(false);
    expect(body).toMatch(/tidak selalu sama dengan harga tender/i);
  });

  it("estimasi tidak disamakan dengan contract price / quotation tanpa kualifikasi", () => {
    const body = readBody("estimasi-biaya-konstruksi");
    expect(hasUnqualifiedClaim(body, /estimasi (adalah|merupakan) (penawaran harga|quotation)/gi)).toBe(
      false
    );
    expect(body).toMatch(/bukan penawaran harga/i);
  });

  it("audit biaya tidak disamakan dengan statutory audit", () => {
    const body = readBody("audit-biaya-proyek");
    expect(body).toMatch(/bukan (statutory|audit keuangan resmi)/i);
  });

  it("quality control tidak disamakan dengan guarantee/jaminan bebas defect", () => {
    const body = readBody("quality-control-konstruksi");
    expect(hasUnqualifiedClaim(body, /qc menjamin|quality control menjamin/gi)).toBe(false);
    expect(body).toMatch(/tidak menghilangkan seluruh defect|tidak dapat menjamin nol defect/i);
  });

  it("schedule control tidak disamakan dengan guarantee/jaminan tepat waktu", () => {
    const body = readBody("pengendalian-jadwal-proyek");
    expect(hasUnqualifiedClaim(body, /menjamin (proyek )?selesai tepat waktu/gi)).toBe(false);
  });

  it("preventive dan corrective maintenance tidak dikonflasikan satu sama lain", () => {
    const preventive = readBody("preventive-maintenance-bangunan");
    const corrective = readBody("corrective-maintenance-bangunan");
    expect(preventive).toMatch(/sebelum kerusakan|sebelum failure/i);
    expect(corrective).toMatch(/setelah kerusakan|sudah teridentifikasi|sudah dilaporkan/i);
  });

  it("interior fit-out tidak disamakan dengan seluruh renovasi bangunan", () => {
    const body = readBody("interior-fit-out");
    expect(body).toMatch(/bukan sekadar pekerjaan kosmetik|berbeda dari.*renovasi/i);
  });
});

describe("Batch 03 — metadata", () => {
  it("owner-approved P2 pages menghasilkan index,follow", () => {
    for (const item of p2) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: true, follow: true });
    }
  });

  it("seluruh title P2 unik setelah buildMetadata", () => {
    const titles = p2.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /layanan/[slug] yang benar", () => {
    for (const item of p2) {
      expect(item.route).toBe(`/layanan/${item.slug}`);
    }
  });
});

describe("Batch 03 — structured data", () => {
  it("seluruh 10 halaman P2 menghasilkan node Service + BreadcrumbList", () => {
    for (const item of p2) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Service");
      expect(types).toContain("BreadcrumbList");
    }
  });

  it("tidak ada Offer, price, rating, atau sertifikasi palsu pada node manapun", () => {
    for (const item of p2) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
        expect(node).not.toHaveProperty("hasCredential");
      }
    }
  });

  it("tidak ada Organization/WebSite terduplikasi di graph per-halaman (sitewide-only)", () => {
    for (const item of p2) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("Organization");
      expect(types).not.toContain("WebSite");
    }
  });
});

describe("Batch 03 — sitemap and hub", () => {
  it("owner-approved P2 pages masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of p2) {
      expect(eligible).toContain(item.route);
    }
  });
});
