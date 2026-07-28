import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { GuideItem } from "@/schemas/content-types";

const PILLAR_SLUG = "tahapan-bangun-rumah-dari-nol";
const PILLAR_ID = "guide-tahapan-bangun-rumah-dari-nol";
const COST_SLUG = "biaya-bangun-rumah-per-meter";

const P3_SUPPORTING_SLUGS = [
  "biaya-bangun-rumah-per-meter",
  "cara-menghitung-biaya-bangun-rumah",
  "checklist-persiapan-bangun-rumah",
  "cara-memilih-kontraktor-rumah",
  "kontrak-kerja-konstruksi-rumah",
  "borongan-vs-harian-bangun-rumah",
  "kontraktor-vs-tukang",
  "cara-membaca-rab-rumah",
] as const;

const P3_ALL_SLUGS = [PILLAR_SLUG, ...P3_SUPPORTING_SLUGS] as const;

const { items, issues } = loadAllContent();
const guides = items.filter((item): item is GuideItem => item.type === "guide");
const p3 = guides.filter((item) =>
  P3_ALL_SLUGS.includes(item.slug as (typeof P3_ALL_SLUGS)[number])
);
const pillar = p3.find((item) => item.slug === PILLAR_SLUG)!;
const supporting = p3.filter((item) => item.slug !== PILLAR_SLUG);
const costGuide = p3.find((item) => item.slug === COST_SLUG)!;

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

describe("Batch 07A — cost-data hard gate (biaya-bangun-rumah-per-meter, resolved 2026-07-28)", () => {
  it("cost guide sekarang dibuat sebagai active MDX dengan articleType cost", () => {
    expect(costGuide).toBeDefined();
    expect(costGuide.article.articleType).toBe("cost");
  });

  it("dataAsOf terisi dengan tanggal owner memberi data (bukan null, bukan sembarang tanggal)", () => {
    expect(costGuide.article.dataAsOf).toBe("2026-07-28");
  });

  it("sources tidak kosong dan mencatat sumber sebagai estimasi internal, bukan sumber eksternal fiktif", () => {
    expect(costGuide.sources.length).toBeGreaterThan(0);
    const labels = costGuide.sources.map((s) => s.label.toLowerCase());
    expect(labels.some((l) => l.includes("internal") || l.includes("arkavena"))).toBe(true);
  });

  it("harga di-frame sebagai 'mulai dari', bukan quote pasti/final", () => {
    const body = readBody(COST_SLUG);
    expect(body).toMatch(/mulai dari/i);
    // FAQ legitimately asks "Apakah ... harga final?" and answers "Tidak" —
    // that's the correct disclaiming pattern, not an unqualified claim.
    expect(body).toMatch(/bukan (quote|harga) final/i);
  });

  it("angka yang muncul adalah persis Rp4.000.000 (angka dari owner) — tidak ada angka breakdown lain yang dikarang", () => {
    const body = readBody(COST_SLUG);
    const rpMatches = [...body.matchAll(/Rp\s?[\d.,]+/g)].map((m) => m[0].replace(/\s/g, ""));
    for (const match of rpMatches) {
      expect(match).toBe("Rp4.000.000");
    }
  });

  it("CTA ditempatkan segera setelah angka harga pertama kali disebutkan di body", () => {
    const body = readBody(COST_SLUG);
    const priceIndex = body.search(/Rp4\.000\.000/);
    const ctaIndex = body.indexOf("<CTA");
    expect(priceIndex).toBeGreaterThan(-1);
    expect(ctaIndex).toBeGreaterThan(-1);
    // CTA should appear shortly after the first price mention — the callout
    // that immediately follows the price counts as part of that framing, so
    // the threshold covers "price + disclaimer callout + CTA", not just a
    // bare adjacent placement.
    expect(ctaIndex - priceIndex).toBeLessThan(800);
    expect(ctaIndex).toBeGreaterThan(priceIndex);
  });

  it("tidak mencampur luas tanah dan luas bangunan", () => {
    const body = readBody(COST_SLUG);
    expect(body).toMatch(/luas bangunan/i);
  });

  it("menjelaskan cakupan geografis (bukan diklaim berlaku nasional tanpa batas)", () => {
    const body = readBody(COST_SLUG);
    expect(body).toMatch(/area layanan/i);
  });

  it("planning/batch-07-cost-data-required.md mencatat resolusi, bukan lagi blocker aktif, dan tetap tidak dibaca content loader", () => {
    const planningPath = path.join(process.cwd(), "planning", "batch-07-cost-data-required.md");
    expect(fs.existsSync(planningPath)).toBe(true);
    const planningBody = fs.readFileSync(planningPath, "utf8");
    expect(planningBody).toMatch(/Resolved/i);
    expect(guides.some((item) => item.sourcePath.includes("planning"))).toBe(false);
  });

  it("guide lain (bukan cost guide) tetap tidak memuat angka harga/persentase yang terlihat sebagai data pasar tanpa sumber", () => {
    const FORBIDDEN_NUMBER_PATTERNS = [/Rp\s?\d/i, /\d+\s?%(?!\s?\))/];
    for (const slug of P3_ALL_SLUGS) {
      if (slug === PILLAR_SLUG || slug === COST_SLUG) continue;
      const body = readBody(slug);
      for (const pattern of FORBIDDEN_NUMBER_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx matched forbidden pattern ${pattern}`).toBe(false);
      }
    }
  });
});

describe("Batch 07A — content validation", () => {
  it("seluruh 9 file P3 valid tanpa error schema", () => {
    expect(issues.filter((i) => P3_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)))).toEqual([]);
  });

  it("tepat 9 halaman P3 dibuat (batch sekarang lengkap 9/9)", () => {
    expect(p3.map((i) => i.slug).sort()).toEqual([...P3_ALL_SLUGS].sort());
  });

  it("id menggunakan namespace guide-* dan cocok dengan slug", () => {
    for (const item of p3) {
      expect(item.id).toBe(`guide-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("seluruh halaman P3 review/ownerVerified:false/publishedAt:null/noindex", () => {
    for (const item of p3) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("relationships.projects kosong dan relationships.locations kosong untuk seluruh P3", () => {
    for (const item of p3) {
      expect(item.relationships.projects).toEqual([]);
      expect(item.relationships.locations).toEqual([]);
    }
  });
});

describe("Batch 07A — pillar architecture", () => {
  it("pillar article mempunyai article.pillar: null dan articleType: pillar", () => {
    expect(pillar.article.pillar).toBeNull();
    expect(pillar.article.articleType).toBe("pillar");
  });

  it("pillar tidak self-reference dalam relationships.guides", () => {
    expect(pillar.relationships.guides).not.toContain(PILLAR_ID);
  });

  it("seluruh supporting guide mempunyai article.pillar mengarah ke pillar ID", () => {
    for (const item of supporting) {
      expect(item.article.pillar).toBe(PILLAR_ID);
    }
  });

  it("pillar menautkan ke seluruh 8 supporting guide P3", () => {
    const supportingIds = supporting.map((item) => item.id).sort();
    expect([...pillar.relationships.guides].sort()).toEqual(supportingIds);
  });

  it("setiap supporting guide mempunyai minimal 1 sibling guide ID di luar pillar sendiri", () => {
    for (const item of supporting) {
      const siblingsExcludingPillar = item.relationships.guides.filter((id) => id !== PILLAR_ID);
      expect(siblingsExcludingPillar.length).toBeGreaterThanOrEqual(1);
      expect(item.relationships.guides.length).toBeLessThanOrEqual(6); // pillar + up to 5 siblings
    }
  });

  it("seluruh guide ID dalam relationships resolve ke item yang benar-benar ada", () => {
    const relIssues = validateRelationships(items);
    const p3Issues = relIssues.filter((i) => P3_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)));
    expect(p3Issues).toEqual([]);
  });

  it("tidak ada guide yang self-link dalam relationships.guides-nya sendiri", () => {
    for (const item of p3) {
      expect(item.relationships.guides).not.toContain(item.id);
    }
  });

  it("cost guide terhubung sebagai sibling di pillar, cara-menghitung-biaya, dan cara-membaca-rab", () => {
    const costId = costGuide.id;
    expect(pillar.relationships.guides).toContain(costId);
    const menghitung = p3.find((i) => i.slug === "cara-menghitung-biaya-bangun-rumah")!;
    const membaca = p3.find((i) => i.slug === "cara-membaca-rab-rumah")!;
    expect(menghitung.relationships.guides).toContain(costId);
    expect(membaca.relationships.guides).toContain(costId);
  });
});

describe("Batch 07A — service and sector relationships", () => {
  it("seluruh P3 guide mereferensikan svc-bangun-rumah dan sec-rumah-tinggal, keduanya published+verified", () => {
    for (const item of p3) {
      expect(item.relationships.services).toContain("svc-bangun-rumah");
      expect(item.relationships.sectors).toContain("sec-rumah-tinggal");
      expect(publishedServiceIds.has("svc-bangun-rumah")).toBe(true);
      expect(publishedSectorIds.has("sec-rumah-tinggal")).toBe(true);
    }
  });

  it("setiap guide menautkan /layanan/bangun-rumah secara inline di body", () => {
    for (const slug of P3_ALL_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/\/layanan\/bangun-rumah/);
    }
  });
});

describe("Batch 07A — article-type mapping", () => {
  const EXPECTED_TYPES: Record<string, string> = {
    "tahapan-bangun-rumah-dari-nol": "pillar",
    "biaya-bangun-rumah-per-meter": "cost",
    "checklist-persiapan-bangun-rumah": "checklist",
    "cara-memilih-kontraktor-rumah": "process",
    "kontrak-kerja-konstruksi-rumah": "explainer",
    "borongan-vs-harian-bangun-rumah": "comparison",
    "kontraktor-vs-tukang": "comparison",
    "cara-menghitung-biaya-bangun-rumah": "process",
    "cara-membaca-rab-rumah": "process",
  };

  it("articleType sesuai mapping yang didokumentasikan (brief's how-to -> schema's process, cost-guide -> schema's cost)", () => {
    for (const item of p3) {
      expect(item.article.articleType).toBe(EXPECTED_TYPES[item.slug]);
    }
  });
});

describe("Batch 07A — cannibalization guardrail", () => {
  it("primary keyword P3 tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("tidak ada guide P3 yang memakai keyword transactional service/sector", () => {
    const forbidden = ["jasa bangun rumah", "kontraktor rumah tinggal"];
    const keywords = p3.map((item) => item.primaryKeyword?.trim().toLowerCase());
    for (const term of forbidden) {
      expect(keywords).not.toContain(term);
    }
  });

  it("title/description/excerpt tidak identik satu sama lain", () => {
    const fields: (keyof GuideItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = p3.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("biaya per meter vs cara menghitung biaya: distinct intent (starting-price benchmark vs calculation method)", () => {
    const biayaPerMeter = readBody(COST_SLUG);
    const menghitung = readBody("cara-menghitung-biaya-bangun-rumah");
    expect(biayaPerMeter).toMatch(/mulai dari/i);
    expect(menghitung).toMatch(/metode|work breakdown|unit rate/i);
  });

  it("cara-menghitung-biaya vs cara-membaca-rab: distinct primary intent (calculation method vs document interpretation)", () => {
    const menghitung = readBody("cara-menghitung-biaya-bangun-rumah");
    const membaca = readBody("cara-membaca-rab-rumah");
    expect(menghitung).toMatch(/metode|work breakdown|unit rate/i);
    expect(membaca).toMatch(/membaca|RAB yang (Anda|diterima)/i);
  });

  it("borongan-vs-harian vs kontraktor-vs-tukang: distinct comparison axis (payment/work model vs provider type)", () => {
    const borongan = readBody("borongan-vs-harian-bangun-rumah");
    const kontraktorTukang = readBody("kontraktor-vs-tukang");
    expect(borongan.toLowerCase()).toContain("model kerja");
    expect(kontraktorTukang.toLowerCase()).toContain("organisasi");
  });

  it("tahapan (pillar) vs checklist-persiapan: distinct scope (full lifecycle vs pre-start readiness)", () => {
    const tahapan = readBody(PILLAR_SLUG);
    const checklist = readBody("checklist-persiapan-bangun-rumah");
    expect(tahapan).toMatch(/serah terima|perawatan awal/i);
    expect(checklist).toMatch(/sebelum (konstruksi dimulai|memulai konstruksi)/i);
  });
});

describe("Batch 07A — technical and legal guardrails", () => {
  const PROHIBITED_CLAIMS: { pattern: RegExp; message: string }[] = [
    { pattern: /pasti aman/i, message: "pasti aman" },
    { pattern: /pasti sesuai anggaran/i, message: "pasti sesuai anggaran" },
    { pattern: /tahan gempa/i, message: "klaim tahan gempa" },
    { pattern: /garansi wajib selama/i, message: "durasi garansi universal" },
    { pattern: /biaya pasti/i, message: "klaim biaya pasti" },
    { pattern: /berlaku untuk semua kota/i, message: "klaim berlaku semua kota" },
    { pattern: /tanpa risiko/i, message: "klaim tanpa risiko" },
  ];

  it("body MDX tidak memuat klaim terlarang", () => {
    for (const slug of P3_ALL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of PROHIBITED_CLAIMS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });

  it("kontrak-kerja-konstruksi-rumah menyatakan secara eksplisit bukan nasihat hukum", () => {
    const body = readBody("kontrak-kerja-konstruksi-rumah");
    expect(body).toMatch(/bukan nasihat hukum/i);
  });

  it("kontrak-kerja-konstruksi-rumah mengarahkan area berisiko ke notaris/profesional hukum", () => {
    const body = readBody("kontrak-kerja-konstruksi-rumah");
    expect(body).toMatch(/notaris/i);
  });

  it("kontrak-kerja-konstruksi-rumah tidak menentukan tanggung jawab hukum final", () => {
    const body = readBody("kontrak-kerja-konstruksi-rumah");
    expect(body).not.toMatch(/tanggung jawab hukum (adalah|ditentukan sebagai)/i);
  });

  it("kontrak-kerja-konstruksi-rumah framing murni informasional (bukan checklist tindakan verifikasi)", () => {
    const body = readBody("kontrak-kerja-konstruksi-rumah");
    expect(body).toMatch(/informasional umum/i);
  });
});

describe("Batch 07A — metadata", () => {
  it("seluruh 9 halaman P3 menghasilkan noindex,follow (masih review)", () => {
    for (const item of p3) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });

  it("seluruh title P3 unik setelah buildMetadata", () => {
    const titles = p3.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /panduan/[slug] yang benar", () => {
    for (const item of p3) {
      expect(item.route).toBe(`/panduan/${item.slug}`);
    }
  });
});

describe("Batch 07A — structured data", () => {
  it("seluruh 9 halaman P3 menghasilkan node Article + BreadcrumbList, bukan Service", () => {
    for (const item of p3) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Article");
      expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("Service");
    }
  });

  it("tidak ada Offer, price, rating, atau review pada guide manapun, termasuk cost guide", () => {
    for (const item of p3) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
      }
    }
  });

  it("FAQPage tetap disabled sitewide untuk P3", () => {
    for (const item of p3) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("FAQPage");
    }
  });
});

describe("Batch 07A — sitemap and hub", () => {
  it("halaman P3 (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of p3) {
      expect(eligible).not.toContain(item.route);
    }
  });
});
