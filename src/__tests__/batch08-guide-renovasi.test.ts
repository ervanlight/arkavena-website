import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { GuideItem } from "@/schemas/content-types";

const PILLAR_SLUG = "renovasi-total-vs-renovasi-sebagian";
const PILLAR_ID = "guide-renovasi-total-vs-renovasi-sebagian";

const B08_SUPPORTING_SLUGS = [
  "cara-menghitung-anggaran-renovasi-rumah",
  "checklist-survei-sebelum-renovasi",
  "renovasi-rumah-sambil-dihuni",
  "tanda-rumah-perlu-perkuatan-struktur",
  "renovasi-rumah-satu-jadi-dua-lantai",
  "memperkuat-struktur-rumah-lama",
  "renovasi-atap-bocor",
  "renovasi-dapur",
  "renovasi-kamar-mandi",
  "renovasi-fasad-rumah",
  "risiko-pembengkakan-biaya-renovasi",
  "cara-memilih-kontraktor-renovasi",
] as const;

const B08_ALL_SLUGS = [PILLAR_SLUG, ...B08_SUPPORTING_SLUGS] as const;

/** Three articles under the mandatory structural-safety hard gate. */
const STRUCTURAL_SLUGS = [
  "tanda-rumah-perlu-perkuatan-struktur",
  "renovasi-rumah-satu-jadi-dua-lantai",
  "memperkuat-struktur-rumah-lama",
] as const;

const { items, issues } = loadAllContent();
const guides = items.filter((item): item is GuideItem => item.type === "guide");
const b08 = guides.filter((item) =>
  B08_ALL_SLUGS.includes(item.slug as (typeof B08_ALL_SLUGS)[number])
);
const pillar = b08.find((item) => item.slug === PILLAR_SLUG)!;
const supporting = b08.filter((item) => item.slug !== PILLAR_SLUG);

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

describe("Batch 08 — cost-data hard gate (biaya-renovasi-rumah, blocked)", () => {
  it("biaya-renovasi-rumah.mdx tidak dibuat sebagai active content", () => {
    expect(guides.some((item) => item.slug === "biaya-renovasi-rumah")).toBe(false);
  });

  it("planning/batch-08-cost-data-required.md ada dan mendokumentasikan blocker, dan tidak dibaca content loader", () => {
    const planningPath = path.join(process.cwd(), "planning", "batch-08-cost-data-required.md");
    expect(fs.existsSync(planningPath)).toBe(true);
    const planningBody = fs.readFileSync(planningPath, "utf8");
    expect(planningBody).toMatch(/BLOCKED/i);
    expect(guides.some((item) => item.sourcePath.includes("planning"))).toBe(false);
  });

  it("tidak ada guide Batch 08 yang mereferensikan guide-biaya-renovasi-rumah yang belum ada (no-future-ID rule)", () => {
    for (const item of b08) {
      expect(item.relationships.guides).not.toContain("guide-biaya-renovasi-rumah");
    }
  });

  it("guide lain (bukan cost guide) tidak memuat angka harga/persentase yang terlihat sebagai data pasar tanpa sumber", () => {
    const FORBIDDEN_NUMBER_PATTERNS = [/Rp\s?\d/i, /\d+\s?%(?!\s?\))/];
    for (const slug of B08_ALL_SLUGS) {
      const body = readBody(slug);
      for (const pattern of FORBIDDEN_NUMBER_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx matched forbidden pattern ${pattern}`).toBe(false);
      }
    }
  });
});

describe("Batch 08 — content validation", () => {
  it("seluruh 13 file Batch 08 valid tanpa error schema", () => {
    expect(issues.filter((i) => B08_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)))).toEqual([]);
  });

  it("tepat 13 halaman aktif dibuat (14 target dikurangi 1 blocked cost guide)", () => {
    expect(b08.map((i) => i.slug).sort()).toEqual([...B08_ALL_SLUGS].sort());
  });

  it("id menggunakan namespace guide-* dan cocok dengan slug", () => {
    for (const item of b08) {
      expect(item.id).toBe(`guide-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("seluruh halaman Batch 08 masih review/ownerVerified:false/publishedAt:null/reviewedBy:null (menunggu review owner)", () => {
    for (const item of b08) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.reviewedBy).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("relationships.projects kosong dan relationships.locations kosong untuk seluruh Batch 08", () => {
    for (const item of b08) {
      expect(item.relationships.projects).toEqual([]);
      expect(item.relationships.locations).toEqual([]);
    }
  });
});

describe("Batch 08 — pillar architecture", () => {
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

  it("setiap supporting guide mempunyai antara 2-5 sibling guide ID di luar pillar sendiri", () => {
    for (const item of supporting) {
      const siblingsExcludingPillar = item.relationships.guides.filter((id) => id !== PILLAR_ID);
      expect(siblingsExcludingPillar.length).toBeGreaterThanOrEqual(1);
      expect(item.relationships.guides.length).toBeLessThanOrEqual(6); // pillar + up to 5 siblings
    }
  });

  it("seluruh guide ID dalam relationships resolve ke item yang benar-benar ada", () => {
    const relIssues = validateRelationships(items);
    const b08Issues = relIssues.filter((i) => B08_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)));
    expect(b08Issues).toEqual([]);
  });

  it("tidak ada guide yang self-link dalam relationships.guides-nya sendiri", () => {
    for (const item of b08) {
      expect(item.relationships.guides).not.toContain(item.id);
    }
  });
});

describe("Batch 08 — service and sector relationships", () => {
  it("seluruh guide Batch 08 mereferensikan svc-renovasi-rumah dan sec-rumah-tinggal, keduanya published+verified", () => {
    for (const item of b08) {
      expect(item.relationships.services).toContain("svc-renovasi-rumah");
      expect(item.relationships.sectors).toContain("sec-rumah-tinggal");
      expect(publishedServiceIds.has("svc-renovasi-rumah")).toBe(true);
      expect(publishedSectorIds.has("sec-rumah-tinggal")).toBe(true);
    }
  });

  it("setiap guide menautkan /layanan/renovasi-rumah secara inline di body", () => {
    for (const slug of B08_ALL_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/\/layanan\/renovasi-rumah/);
    }
  });
});

describe("Batch 08 — article-type mapping", () => {
  const EXPECTED_TYPES: Record<string, string> = {
    "renovasi-total-vs-renovasi-sebagian": "pillar",
    "cara-menghitung-anggaran-renovasi-rumah": "process",
    "checklist-survei-sebelum-renovasi": "checklist",
    "renovasi-rumah-sambil-dihuni": "explainer",
    "tanda-rumah-perlu-perkuatan-struktur": "explainer",
    "renovasi-rumah-satu-jadi-dua-lantai": "process",
    "memperkuat-struktur-rumah-lama": "explainer",
    "renovasi-atap-bocor": "explainer",
    "renovasi-dapur": "process",
    "renovasi-kamar-mandi": "process",
    "renovasi-fasad-rumah": "process",
    "risiko-pembengkakan-biaya-renovasi": "explainer",
    "cara-memilih-kontraktor-renovasi": "process",
  };

  it("articleType sesuai mapping yang didokumentasikan (risk-guide/how-to -> explainer/process, per planning/batch-08-article-type-mapping.md)", () => {
    for (const item of b08) {
      expect(item.article.articleType).toBe(EXPECTED_TYPES[item.slug]);
    }
  });
});

describe("Batch 08 — cannibalization guardrail", () => {
  it("primary keyword Batch 08 tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("tidak ada guide Batch 08 yang memakai keyword transactional service/sector", () => {
    const forbidden = ["jasa renovasi rumah", "kontraktor renovasi rumah"];
    const keywords = b08.map((item) => item.primaryKeyword?.trim().toLowerCase());
    for (const term of forbidden) {
      expect(keywords).not.toContain(term);
    }
  });

  it("title/description/excerpt tidak identik satu sama lain", () => {
    const fields: (keyof GuideItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = b08.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("Batch 08 (renovasi) vs Batch 07 (bangun rumah): tidak ada duplikat primary keyword lintas cluster", () => {
    const b07Slugs = [
      "tahapan-bangun-rumah-dari-nol",
      "biaya-bangun-rumah-per-meter",
      "checklist-persiapan-bangun-rumah",
      "cara-memilih-kontraktor-rumah",
      "kontrak-kerja-konstruksi-rumah",
      "borongan-vs-harian-bangun-rumah",
      "kontraktor-vs-tukang",
      "cara-menghitung-biaya-bangun-rumah",
      "cara-membaca-rab-rumah",
    ];
    const b07Keywords = guides
      .filter((g) => b07Slugs.includes(g.slug))
      .map((g) => g.primaryKeyword?.trim().toLowerCase());
    const b08Keywords = b08.map((g) => g.primaryKeyword?.trim().toLowerCase());
    for (const kw of b08Keywords) {
      expect(b07Keywords).not.toContain(kw);
    }
  });

  it("checklist-persiapan-bangun-rumah (Batch 07) vs checklist-survei-sebelum-renovasi (Batch 08): distinct project type (new build vs existing condition)", () => {
    const bangunChecklist = readBody("checklist-persiapan-bangun-rumah");
    const renovasiChecklist = readBody("checklist-survei-sebelum-renovasi");
    expect(bangunChecklist.toLowerCase()).not.toContain("kondisi eksisting");
    expect(renovasiChecklist.toLowerCase()).toContain("kondisi eksisting");
  });

  it("cara-memilih-kontraktor-rumah (Batch 07) vs cara-memilih-kontraktor-renovasi (Batch 08): distinct scope emphasis (new build vs renovation-specific experience)", () => {
    const bangun = readBody("cara-memilih-kontraktor-rumah");
    const renovasi = readBody("cara-memilih-kontraktor-renovasi");
    expect(renovasi.toLowerCase()).toContain("kondisi eksisting");
    expect(renovasi).not.toEqual(bangun);
  });

  it("cara-menghitung-biaya-bangun-rumah (Batch 07) vs cara-menghitung-anggaran-renovasi-rumah (Batch 08): distinct cost model (area-based vs scope/condition-based)", () => {
    const bangun = readBody("cara-menghitung-biaya-bangun-rumah");
    const renovasi = readBody("cara-menghitung-anggaran-renovasi-rumah");
    expect(renovasi.toLowerCase()).toContain("kondisi eksisting");
    expect(bangun).not.toEqual(renovasi);
  });

  it("renovasi-dapur vs renovasi-kamar-mandi: distinct area boundary (kitchen utility routing vs waterproofing/plumbing)", () => {
    const dapur = readBody("renovasi-dapur");
    const kamarMandi = readBody("renovasi-kamar-mandi");
    expect(dapur.toLowerCase()).toContain("dapur");
    expect(kamarMandi.toLowerCase()).toContain("waterproofing");
  });

  it("tanda-rumah-perlu-perkuatan-struktur vs memperkuat-struktur-rumah-lama: distinct decision stage (recognition/escalation vs post-decision process)", () => {
    const tanda = readBody("tanda-rumah-perlu-perkuatan-struktur");
    const perkuatan = readBody("memperkuat-struktur-rumah-lama");
    expect(tanda.toLowerCase()).toContain("indikasi");
    expect(perkuatan.toLowerCase()).toContain("proses");
  });
});

describe("Batch 08 — structural-safety hard gate", () => {
  const DIAGNOSTIC_LANGUAGE_PATTERNS: { pattern: RegExp; message: string }[] = [
    { pattern: /retak berarti/i, message: "diagnostic claim tying a symptom directly to a cause" },
    { pattern: /pasti (rusak|aman|kuat|stabil)/i, message: "absolute structural-condition claim" },
    { pattern: /dijamin (aman|kuat|stabil)/i, message: "guaranteed-safety claim" },
    { pattern: /100%\s?(aman|kuat)/i, message: "absolute percentage safety claim" },
    { pattern: /tidak (perlu|butuh) insinyur/i, message: "claim that discourages engineer involvement" },
  ];

  const DIY_INSTRUCTION_PATTERNS: { pattern: RegExp; message: string }[] = [
    { pattern: /tambahkan tulangan/i, message: "DIY rebar instruction" },
    { pattern: /bongkar bagian/i, message: "DIY demolition instruction" },
    { pattern: /pasang penyangga/i, message: "DIY shoring instruction" },
    { pattern: /Anda (bisa|dapat) memperbaiki sendiri/i, message: "self-repair instruction" },
    { pattern: /perbaiki sendiri/i, message: "self-repair instruction" },
  ];

  const DIMENSION_PATTERNS = [/\d+\s?(cm|mm)\b/i, /\d+\s?kg\b/i, /\d+\s?ton\b/i];

  it("ketiga artikel struktural memiliki reviewedBy: null dan status: review (belum ada technical review)", () => {
    for (const slug of STRUCTURAL_SLUGS) {
      const item = b08.find((i) => i.slug === slug)!;
      expect(item.reviewedBy).toBeNull();
      expect(item.status).toBe("review");
    }
  });

  it("ketiga artikel struktural tidak memuat bahasa diagnostik (menyimpulkan penyebab/kondisi tanpa kajian langsung)", () => {
    for (const slug of STRUCTURAL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of DIAGNOSTIC_LANGUAGE_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });

  it("ketiga artikel struktural tidak memuat instruksi perbaikan struktur mandiri (DIY)", () => {
    for (const slug of STRUCTURAL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of DIY_INSTRUCTION_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });

  it("ketiga artikel struktural tidak memuat dimensi atau nilai kapasitas struktur (cm/mm/kg/ton)", () => {
    for (const slug of STRUCTURAL_SLUGS) {
      const body = readBody(slug);
      for (const pattern of DIMENSION_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx matched dimension pattern ${pattern}`).toBe(false);
      }
    }
  });

  it("ketiga artikel struktural menempatkan Callout keselamatan (tone warning) di awal body, sebelum heading pertama", () => {
    for (const slug of STRUCTURAL_SLUGS) {
      const body = readBody(slug);
      const trimmed = body.trimStart();
      expect(trimmed.startsWith("<Callout tone=\"warning\"")).toBe(true);
      const calloutIndex = body.indexOf("<Callout tone=\"warning\"");
      const firstHeadingIndex = body.indexOf("\n## ");
      expect(calloutIndex).toBeGreaterThanOrEqual(0);
      expect(calloutIndex).toBeLessThan(firstHeadingIndex);
    }
  });

  it("ketiga artikel struktural mengarahkan pembaca ke insinyur struktur, bukan menyimpulkan sendiri", () => {
    for (const slug of STRUCTURAL_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/insinyur struktur/i);
    }
  });

  it("renovasi-atap-bocor memuat escalation section untuk indikasi serius yang perlu penanganan segera", () => {
    const body = readBody("renovasi-atap-bocor");
    expect(body).toMatch(/penanganan segera/i);
    expect(body).toMatch(/jangan menunda/i);
  });
});

describe("Batch 08 — technical and legal guardrails", () => {
  const PROHIBITED_CLAIMS: { pattern: RegExp; message: string }[] = [
    { pattern: /pasti aman/i, message: "pasti aman" },
    { pattern: /pasti sesuai anggaran/i, message: "pasti sesuai anggaran" },
    { pattern: /tahan gempa/i, message: "klaim tahan gempa" },
    { pattern: /garansi wajib selama/i, message: "durasi garansi universal" },
    { pattern: /biaya pasti/i, message: "klaim biaya pasti" },
    { pattern: /berlaku untuk semua (kota|rumah)/i, message: "klaim generalisasi berlebihan" },
    { pattern: /tanpa risiko/i, message: "klaim tanpa risiko" },
  ];

  it("body MDX tidak memuat klaim terlarang", () => {
    for (const slug of B08_ALL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of PROHIBITED_CLAIMS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });
});

describe("Batch 08 — metadata", () => {
  it("seluruh 13 halaman Batch 08 menghasilkan noindex,follow (masih review)", () => {
    for (const item of b08) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });

  it("seluruh title Batch 08 unik setelah buildMetadata", () => {
    const titles = b08.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /panduan/[slug] yang benar", () => {
    for (const item of b08) {
      expect(item.route).toBe(`/panduan/${item.slug}`);
    }
  });
});

describe("Batch 08 — structured data", () => {
  it("seluruh 13 halaman Batch 08 menghasilkan node Article + BreadcrumbList, bukan Service", () => {
    for (const item of b08) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Article");
      expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("Service");
    }
  });

  it("tidak ada Offer, price, rating, atau review pada guide manapun", () => {
    for (const item of b08) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
      }
    }
  });

  it("FAQPage tetap disabled sitewide untuk Batch 08", () => {
    for (const item of b08) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("FAQPage");
    }
  });

  it("datePublished tidak muncul untuk halaman review (publishedAt null dihilangkan)", () => {
    for (const item of b08) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const article = graph["@graph"].find((n) => n["@type"] === "Article");
      expect(article).not.toHaveProperty("datePublished");
    }
  });
});

describe("Batch 08 — sitemap and hub", () => {
  it("halaman Batch 08 (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of b08) {
      expect(eligible).not.toContain(item.route);
    }
  });
});
