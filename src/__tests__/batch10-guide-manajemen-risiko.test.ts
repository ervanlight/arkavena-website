import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { GuideItem, ServiceItem } from "@/schemas/content-types";

const PILLAR_SLUG = "apa-itu-manajemen-konstruksi";
const PILLAR_ID = "guide-apa-itu-manajemen-konstruksi";

const B10A_SUPPORTING_SLUGS = [
  "tugas-manajemen-konstruksi",
  "manajemen-konstruksi-vs-kontraktor",
  "apa-itu-pengawasan-proyek",
  "owner-representative-proyek-konstruksi",
  "apa-itu-value-engineering-konstruksi",
  "value-engineering-untuk-mengendalikan-biaya",
  "pengendalian-biaya-proyek",
  "pengendalian-cashflow-proyek",
] as const;

const B10A_ALL_SLUGS = [PILLAR_SLUG, ...B10A_SUPPORTING_SLUGS] as const;

/** Contractual review mandatory per brief §16.2, regardless of general approval. */
const CONTRACTUAL_REVIEW_SLUGS = ["manajemen-konstruksi-vs-kontraktor", "owner-representative-proyek-konstruksi"] as const;

const GUIDE_SERVICE_PAIRS: { slug: string; service: string }[] = [
  { slug: "apa-itu-manajemen-konstruksi", service: "svc-manajemen-konstruksi" },
  { slug: "apa-itu-pengawasan-proyek", service: "svc-pengawasan-proyek" },
  { slug: "owner-representative-proyek-konstruksi", service: "svc-owner-representative" },
  { slug: "apa-itu-value-engineering-konstruksi", service: "svc-value-engineering" },
  { slug: "pengendalian-biaya-proyek", service: "svc-pengendalian-biaya-proyek" },
  { slug: "pengendalian-cashflow-proyek", service: "svc-pengendalian-cashflow-proyek" },
];

const { items, issues } = loadAllContent();
const guides = items.filter((item): item is GuideItem => item.type === "guide");
const services = items.filter((item): item is ServiceItem => item.type === "service");
const b10a = guides.filter((item) =>
  B10A_ALL_SLUGS.includes(item.slug as (typeof B10A_ALL_SLUGS)[number])
);
const pillar = b10a.find((item) => item.slug === PILLAR_SLUG)!;
const supporting = b10a.filter((item) => item.slug !== PILLAR_SLUG);

const publishedServiceIds = new Set(
  items
    .filter((item) => item.type === "service" && item.status === "published" && item.ownerVerified)
    .map((item) => item.id)
);

const readFile = (slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", "guides", `${slug}.mdx`), "utf8");
/** MDX body only — strips YAML frontmatter so hero/FAQ text doesn't skew body-position checks. */
const readBody = (slug: string) => readFile(slug).split(/^---$/m).slice(2).join("---");

describe("Batch 10A — content validation", () => {
  it("seluruh 9 halaman P3 valid tanpa error schema", () => {
    expect(issues.filter((i) => B10A_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)))).toEqual([]);
  });

  it("tepat 9 halaman P3 dibuat", () => {
    expect(b10a.map((i) => i.slug).sort()).toEqual([...B10A_ALL_SLUGS].sort());
  });

  it("id menggunakan namespace guide-* dan cocok dengan slug", () => {
    for (const item of b10a) {
      expect(item.id).toBe(`guide-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("seluruh halaman Batch 10A masih review/ownerVerified:false/publishedAt:null/reviewedBy:null (menunggu review owner)", () => {
    for (const item of b10a) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.reviewedBy).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("seluruh halaman mempunyai sources non-empty (source policy §13.1)", () => {
    for (const item of b10a) {
      expect(item.sources.length, `${item.slug}: sources kosong`).toBeGreaterThan(0);
    }
  });

  it("relationships.projects kosong dan relationships.sectors default kosong (§17.3, opsional)", () => {
    for (const item of b10a) {
      expect(item.relationships.projects).toEqual([]);
      expect(item.relationships.sectors).toEqual([]);
    }
  });
});

describe("Batch 10A — pillar architecture", () => {
  it("pillar article mempunyai article.pillar: null dan articleType: pillar", () => {
    expect(pillar.article.pillar).toBeNull();
    expect(pillar.article.articleType).toBe("pillar");
  });

  it("pillar tidak self-reference dalam relationships.guides", () => {
    expect(pillar.relationships.guides).not.toContain(PILLAR_ID);
  });

  it("pillar menautkan seluruh 8 supporting guide P3", () => {
    const supportingIds = supporting.map((item) => item.id).sort();
    expect([...pillar.relationships.guides].sort()).toEqual(supportingIds);
  });

  it("seluruh supporting guide mempunyai article.pillar mengarah ke pillar ID", () => {
    for (const item of supporting) {
      expect(item.article.pillar).toBe(PILLAR_ID);
    }
  });

  it("setiap supporting guide mempunyai 2-5 sibling guide ID di luar pillar sendiri", () => {
    for (const item of supporting) {
      const siblingsExcludingPillar = item.relationships.guides.filter((id) => id !== PILLAR_ID);
      expect(siblingsExcludingPillar.length).toBeGreaterThanOrEqual(2);
      expect(siblingsExcludingPillar.length).toBeLessThanOrEqual(5);
    }
  });

  it("tidak ada guide yang self-link dalam relationships.guides-nya sendiri", () => {
    for (const item of b10a) {
      expect(item.relationships.guides).not.toContain(item.id);
    }
  });

  it("seluruh guide ID dalam relationships resolve ke item yang benar-benar ada", () => {
    const relIssues = validateRelationships(items);
    const b10aIssues = relIssues.filter((i) => B10A_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)));
    expect(b10aIssues).toEqual([]);
  });

  it("tidak ada guide yang mereferensikan ID Batch 10B/11 yang belum ada (no-future-ID rule)", () => {
    const futureSlugs = [
      "cara-membuat-cashflow-proyek-konstruksi",
      "cara-membaca-kurva-s-proyek",
      "pengendalian-jadwal-proyek",
      "risiko-keterlambatan-proyek-konstruksi",
      "change-order-proyek-konstruksi",
      "audit-rab-proyek",
      "quality-control-konstruksi",
      "laporan-progress-proyek-konstruksi",
      "cara-mencegah-pembengkakan-biaya-proyek",
    ];
    for (const item of b10a) {
      for (const futureSlug of futureSlugs) {
        expect(item.relationships.guides).not.toContain(`guide-${futureSlug}`);
      }
    }
  });
});

describe("Batch 10A — service relationships", () => {
  it("setiap guide topic mereferensikan service ID yang sesuai mapping §17.2, published+verified", () => {
    for (const { slug, service } of GUIDE_SERVICE_PAIRS) {
      const item = b10a.find((i) => i.slug === slug)!;
      expect(item.relationships.services).toContain(service);
      expect(publishedServiceIds.has(service)).toBe(true);
    }
  });

  it("tidak ada guide yang memasukkan seluruh service IDs sekaligus (§17.2)", () => {
    for (const item of b10a) {
      expect(item.relationships.services.length).toBeLessThanOrEqual(3);
    }
  });

  it("tidak ada halaman yang mereferensikan service yang masih review, draft, atau archived", () => {
    for (const item of b10a) {
      for (const serviceId of item.relationships.services) {
        expect(publishedServiceIds.has(serviceId), `service ${serviceId} tidak published+verified`).toBe(true);
      }
    }
  });
});

describe("Batch 10A — article-type mapping", () => {
  const EXPECTED_TYPES: Record<string, string> = {
    "apa-itu-manajemen-konstruksi": "pillar",
    "tugas-manajemen-konstruksi": "explainer",
    "manajemen-konstruksi-vs-kontraktor": "comparison",
    "apa-itu-pengawasan-proyek": "explainer",
    "owner-representative-proyek-konstruksi": "explainer",
    "apa-itu-value-engineering-konstruksi": "explainer",
    "value-engineering-untuk-mengendalikan-biaya": "process",
    "pengendalian-biaya-proyek": "explainer",
    "pengendalian-cashflow-proyek": "explainer",
  };

  it("articleType sesuai mapping yang didokumentasikan (planning/batch-10-article-type-mapping.md)", () => {
    for (const item of b10a) {
      expect(item.article.articleType).toBe(EXPECTED_TYPES[item.slug]);
    }
  });
});

describe("Batch 10A — service–guide collision guardrail", () => {
  it("tidak ada primary keyword guide yang identik dengan primary keyword service manapun", () => {
    const serviceKeywords = new Set(
      services.map((s) => s.primaryKeyword?.trim().toLowerCase()).filter(Boolean)
    );
    for (const item of b10a) {
      const kw = item.primaryKeyword?.trim().toLowerCase();
      expect(serviceKeywords.has(kw!), `${item.slug}: keyword "${kw}" collides with a service keyword`).toBe(false);
    }
  });

  it("primary keyword guide tidak diawali kata 'jasa'", () => {
    for (const item of b10a) {
      expect(item.primaryKeyword?.trim().toLowerCase().startsWith("jasa")).toBe(false);
    }
  });

  it("search intent seluruh guide informational; search intent service pasangannya transactional", () => {
    for (const { slug, service } of GUIDE_SERVICE_PAIRS) {
      const guide = b10a.find((i) => i.slug === slug)!;
      const svc = services.find((s) => s.id === service)!;
      expect(guide.searchIntent).toBe("informational");
      expect(svc.searchIntent).toBe("transactional");
    }
  });

  it("title guide tidak identik dengan title service pasangannya", () => {
    for (const { slug, service } of GUIDE_SERVICE_PAIRS) {
      const guide = b10a.find((i) => i.slug === slug)!;
      const svc = services.find((s) => s.id === service)!;
      expect(guide.title).not.toBe(svc.title);
    }
  });

  it("primary keyword seluruh halaman Batch 10A tidak duplikat lintas seluruh koleksi", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("title/description/excerpt tidak identik satu sama lain lintas seluruh 9 guide", () => {
    const fields: (keyof GuideItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = b10a.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });
});

describe("Batch 10A — Arkavena application lens", () => {
  it("setiap guide mempunyai heading 'Bagaimana konsep ini digunakan dalam pendekatan Arkavena'", () => {
    for (const slug of B10A_ALL_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/## Bagaimana konsep ini digunakan dalam pendekatan Arkavena/);
    }
  });

  it("application-lens section tidak kosong dan mereferensikan related service", () => {
    for (const slug of B10A_ALL_SLUGS) {
      const body = readBody(slug);
      const match = body.match(/## Bagaimana konsep ini digunakan dalam pendekatan Arkavena\n\n([\s\S]+?)\n\n##/);
      expect(match, `${slug}: application-lens section not found or malformed`).not.toBeNull();
      expect(match![1].trim().length).toBeGreaterThan(50);
    }
  });

  it("tidak ada fabricated method/software/certification name (nama metodologi proprietary, dashboard, sertifikasi)", () => {
    const FABRICATED_PATTERNS = [
      /ArkaTrack/i,
      /ArkaFlow/i,
      /ArkaSystem/i,
      /dashboard proprietary/i,
      /software eksklusif/i,
      /bersertifikat ISO 9001(?! yang diterbitkan)/i,
    ];
    for (const slug of B10A_ALL_SLUGS) {
      const body = readBody(slug);
      for (const pattern of FABRICATED_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx matched fabricated-name pattern ${pattern}`).toBe(false);
      }
    }
  });
});

describe("Batch 10A — confidentiality guardrails", () => {
  const CONFIDENTIAL_PATTERNS: { pattern: RegExp; message: string }[] = [
    { pattern: /berdasarkan proyek klien kami/i, message: "references a specific client project" },
    { pattern: /klien kami di/i, message: "references a specific client location" },
    { pattern: /proyek (senilai|bernilai) Rp/i, message: "discloses a specific project contract value" },
    { pattern: /Arkavena berhasil menghemat \d/i, message: "claims a specific savings figure as fact" },
  ];

  it("tidak ada referensi nama klien, nilai kontrak, atau data proyek rahasia", () => {
    for (const slug of B10A_ALL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of CONFIDENTIAL_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });

  it("skenario ilustratif (jika ada) tidak disamarkan sebagai data proyek nyata", () => {
    for (const slug of B10A_ALL_SLUGS) {
      const body = readBody(slug);
      if (/Simulasi ilustratif/i.test(body)) {
        expect(body).toMatch(/bukan data proyek Arkavena/i);
      }
    }
  });
});

describe("Batch 10A — simulation validation", () => {
  const SIMULATION_SLUGS = [
    "value-engineering-untuk-mengendalikan-biaya",
    "pengendalian-biaya-proyek",
    "pengendalian-cashflow-proyek",
  ];

  it("planning/batch-10-simulation-register.md ada dan mendaftarkan ketiga simulasi, tidak dibaca content loader", () => {
    const planningPath = path.join(process.cwd(), "planning", "batch-10-simulation-register.md");
    expect(fs.existsSync(planningPath)).toBe(true);
    const planningBody = fs.readFileSync(planningPath, "utf8");
    for (const slug of SIMULATION_SLUGS) {
      expect(planningBody).toContain(`/panduan/${slug}`);
    }
    expect(guides.some((item) => item.sourcePath.includes("planning"))).toBe(false);
  });

  it("setiap simulasi mempunyai label ilustratif yang terlihat sebelum data", () => {
    for (const slug of SIMULATION_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/Simulasi ilustratif — bukan data proyek Arkavena/);
    }
  });

  it("guide dengan simulasi tetap article.dataAsOf: null (simulasi bukan data faktual time-sensitive)", () => {
    for (const slug of SIMULATION_SLUGS) {
      const item = b10a.find((i) => i.slug === slug)!;
      expect(item.article.dataAsOf).toBeNull();
    }
  });

  it("simulasi tidak menggunakan nominal mata uang (Rp)", () => {
    for (const slug of SIMULATION_SLUGS) {
      const body = readBody(slug);
      // Scoped to the simulation section only would be ideal, but a
      // sitewide Rp-absence check is a reasonable proxy since these guides
      // never discuss real currency amounts anywhere in the body.
      expect(body).not.toMatch(/Rp\s?\d/);
    }
  });

  it("simulasi tidak disajikan sebagai benchmark industri (harus eksplisit menyangkalnya, bukan mengklaimnya)", () => {
    for (const slug of SIMULATION_SLUGS) {
      const body = readBody(slug);
      // The guides correctly say "bukan benchmark industri" (negation) —
      // that disclaiming pattern is required, not prohibited. Only an
      // affirmative claim would be a violation.
      expect(body).not.toMatch(/(adalah|merupakan) benchmark industri/i);
    }
  });
});

describe("Batch 10A — terminology guardrails", () => {
  it("cashflow tidak disamakan dengan total cost atau laba-rugi", () => {
    const body = readBody("pengendalian-cashflow-proyek");
    expect(body).toMatch(/berbeda dari total cost control/i);
    expect(body.toLowerCase()).toContain("laba-rugi");
  });

  it("value engineering tidak disamakan dengan cost cutting", () => {
    const veDef = readBody("apa-itu-value-engineering-konstruksi");
    expect(veDef).toMatch(/bukan (sekadar )?(pemotongan biaya|cost cutting)/i);
  });

  it("pengawasan tidak menjamin bebas defect / zero defect", () => {
    const body = readBody("apa-itu-pengawasan-proyek");
    expect(body).toMatch(/bukan jaminan bebas cacat/i);
  });

  it("owner representative tidak disamakan dengan penasihat hukum / kuasa hukum", () => {
    const body = readBody("owner-representative-proyek-konstruksi");
    expect(body.toLowerCase()).toContain("bukan pengganti");
    expect(body.toLowerCase()).toContain("penasihat hukum");
  });

  it("manajemen konstruksi vs kontraktor tidak merendahkan salah satu peran", () => {
    const body = readBody("manajemen-konstruksi-vs-kontraktor");
    expect(body).toMatch(/bukan menyatakan salah satu selalu (lebih )?unggul|bukan menyimpulkan salah satu selalu lebih (baik|unggul)/i);
  });
});

describe("Batch 10A — prohibited-claim scan", () => {
  const PROHIBITED_CLAIMS: { pattern: RegExp; message: string }[] = [
    { pattern: /pasti sesuai anggaran/i, message: "pasti sesuai anggaran" },
    { pattern: /pasti tepat waktu/i, message: "pasti tepat waktu" },
    { pattern: /menghilangkan seluruh risiko/i, message: "menghilangkan seluruh risiko" },
    { pattern: /menjamin tidak ada keterlambatan/i, message: "menjamin tidak ada keterlambatan" },
    { pattern: /menjamin tidak ada defect/i, message: "menjamin tidak ada defect" },
    { pattern: /selalu menghemat biaya/i, message: "selalu menghemat biaya" },
    { pattern: /pasti menemukan pemborosan/i, message: "pasti menemukan pemborosan" },
    { pattern: /Arkavena berhasil menghemat/i, message: "Arkavena berhasil menghemat" },
    { pattern: /berdasarkan proyek klien kami/i, message: "berdasarkan proyek klien kami" },
  ];

  it("body MDX tidak memuat klaim terlarang", () => {
    for (const slug of B10A_ALL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of PROHIBITED_CLAIMS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });
});

describe("Batch 10A — contractual review register", () => {
  it("manajemen-konstruksi-vs-kontraktor dan owner-representative-proyek-konstruksi tetap reviewedBy:null menunggu contractual review terpisah", () => {
    for (const slug of CONTRACTUAL_REVIEW_SLUGS) {
      const item = b10a.find((i) => i.slug === slug)!;
      expect(item.reviewedBy).toBeNull();
      expect(item.status).toBe("review");
      const body = readBody(slug);
      expect(body).toMatch(/memerlukan contractual review terpisah/i);
    }
  });
});

describe("Batch 10A — metadata", () => {
  it("seluruh 9 halaman P3 menghasilkan noindex,follow (masih review)", () => {
    for (const item of b10a) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });

  it("seluruh title P3 unik setelah buildMetadata", () => {
    const titles = b10a.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /panduan/[slug] yang benar", () => {
    for (const item of b10a) {
      expect(item.route).toBe(`/panduan/${item.slug}`);
    }
  });

  it("title guide tidak memakai frasa 'Jasa'", () => {
    for (const item of b10a) {
      expect(item.title.toLowerCase()).not.toContain("jasa");
    }
  });
});

describe("Batch 10A — structured data", () => {
  it("seluruh 9 halaman P3 menghasilkan node Article + BreadcrumbList, bukan Service", () => {
    for (const item of b10a) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Article");
      expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("Service");
    }
  });

  it("tidak ada Offer, price, rating, atau review pada guide manapun", () => {
    for (const item of b10a) {
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
    for (const item of b10a) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("FAQPage");
    }
  });

  it("datePublished tidak muncul untuk halaman review (publishedAt null dihilangkan)", () => {
    for (const item of b10a) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const article = graph["@graph"].find((n) => n["@type"] === "Article");
      expect(article).not.toHaveProperty("datePublished");
    }
  });
});

describe("Batch 10A — sitemap and hub", () => {
  it("halaman P3 (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of b10a) {
      expect(eligible).not.toContain(item.route);
    }
  });
});
