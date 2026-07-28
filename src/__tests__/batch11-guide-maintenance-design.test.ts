import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { GuideItem, ServiceItem } from "@/schemas/content-types";

const MAINTENANCE_PILLAR_SLUG = "apa-itu-building-maintenance";
const MAINTENANCE_PILLAR_ID = "guide-apa-itu-building-maintenance";
const DESIGN_PILLAR_SLUG = "apa-itu-design-and-build";
const DESIGN_PILLAR_ID = "guide-apa-itu-design-and-build";

const MAINTENANCE_SUPPORTING_SLUGS = [
  "preventive-vs-corrective-maintenance",
  "jadwal-preventive-maintenance-bangunan",
  "checklist-inspeksi-gedung",
  "perawatan-atap-bangunan",
  "perawatan-fasad-bangunan",
  "perawatan-mep-bangunan",
  "kontrak-building-maintenance",
] as const;

const DESIGN_SUPPORTING_SLUGS = [
  "keuntungan-design-and-build",
  "apa-itu-interior-fit-out",
  "shop-drawing-konstruksi",
  "gambar-kerja-vs-gambar-desain",
  "koordinasi-arsitektur-struktur-mep",
] as const;

const MAINTENANCE_ALL_SLUGS = [MAINTENANCE_PILLAR_SLUG, ...MAINTENANCE_SUPPORTING_SLUGS] as const;
const DESIGN_ALL_SLUGS = [DESIGN_PILLAR_SLUG, ...DESIGN_SUPPORTING_SLUGS] as const;
const B11_ALL_SLUGS = [...MAINTENANCE_ALL_SLUGS, ...DESIGN_ALL_SLUGS] as const;

const MANDATORY_TECHNICAL_SLUGS = [
  "jadwal-preventive-maintenance-bangunan",
  "checklist-inspeksi-gedung",
  "perawatan-atap-bangunan",
  "perawatan-fasad-bangunan",
  "perawatan-mep-bangunan",
  "shop-drawing-konstruksi",
  "koordinasi-arsitektur-struktur-mep",
] as const;

const MANDATORY_CONTRACTUAL_SLUGS = [
  "kontrak-building-maintenance",
  "shop-drawing-konstruksi",
  "gambar-kerja-vs-gambar-desain",
] as const;

const GUIDE_SERVICE_PAIRS: { slug: string; service: string }[] = [
  { slug: "apa-itu-building-maintenance", service: "svc-building-maintenance" },
  { slug: "jadwal-preventive-maintenance-bangunan", service: "svc-preventive-maintenance-bangunan" },
  { slug: "apa-itu-design-and-build", service: "svc-design-and-build" },
  { slug: "keuntungan-design-and-build", service: "svc-design-and-build" },
  { slug: "apa-itu-interior-fit-out", service: "svc-interior-fit-out" },
];

const { items, issues } = loadAllContent();
const guides = items.filter((item): item is GuideItem => item.type === "guide");
const services = items.filter((item): item is ServiceItem => item.type === "service");
const b11 = guides.filter((item) =>
  B11_ALL_SLUGS.includes(item.slug as (typeof B11_ALL_SLUGS)[number])
);
const maintenancePillar = b11.find((item) => item.slug === MAINTENANCE_PILLAR_SLUG)!;
const designPillar = b11.find((item) => item.slug === DESIGN_PILLAR_SLUG)!;
const maintenanceSupporting = b11.filter((item) =>
  MAINTENANCE_SUPPORTING_SLUGS.includes(item.slug as (typeof MAINTENANCE_SUPPORTING_SLUGS)[number])
);
const designSupporting = b11.filter((item) =>
  DESIGN_SUPPORTING_SLUGS.includes(item.slug as (typeof DESIGN_SUPPORTING_SLUGS)[number])
);

const publishedServiceIds = new Set(
  items
    .filter((item) => item.type === "service" && item.status === "published" && item.ownerVerified)
    .map((item) => item.id)
);

const readFile = (slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", "guides", `${slug}.mdx`), "utf8");
/** MDX body only — strips YAML frontmatter so hero/FAQ text doesn't skew body-position checks. */
const readBody = (slug: string) => readFile(slug).split(/^---$/m).slice(2).join("---");

/** These guides intentionally name hazardous actions only to prohibit them
 * ("bukan instruksi untuk naik ke atap...") — a bare substring match would
 * flag the correct disclaiming pattern as a violation. Only flag matches
 * that aren't preceded by a negation cue nearby. */
const NEGATION_CUE = /\b(tidak|bukan|jangan|kecuali|dilarang)\b/i;
function hasUnqualifiedHazard(body: string, pattern: RegExp): boolean {
  const matches = [...body.matchAll(new RegExp(pattern, "gi"))];
  return matches.some((match) => {
    const context = body.slice(Math.max(0, match.index! - 80), match.index!);
    return !NEGATION_CUE.test(context);
  });
}

describe("Batch 11 — content validation", () => {
  it("seluruh 14 halaman valid tanpa error schema", () => {
    expect(issues.filter((i) => B11_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)))).toEqual([]);
  });

  it("tepat 14 halaman dibuat (8 maintenance + 6 design)", () => {
    expect(b11.map((i) => i.slug).sort()).toEqual([...B11_ALL_SLUGS].sort());
  });

  it("id menggunakan namespace guide-* dan cocok dengan slug", () => {
    for (const item of b11) {
      expect(item.id).toBe(`guide-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("seluruh halaman Batch 11 masih review/ownerVerified:false/publishedAt:null/reviewedBy:null", () => {
    for (const item of b11) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.reviewedBy).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("seluruh halaman mempunyai sources non-empty", () => {
    for (const item of b11) {
      expect(item.sources.length, `${item.slug}: sources kosong`).toBeGreaterThan(0);
    }
  });

  it("maintenance guide menggunakan cluster building-maintenance; design guide menggunakan cluster design-koordinasi", () => {
    for (const item of maintenanceSupporting.concat([maintenancePillar])) {
      expect(item.cluster).toBe("building-maintenance");
    }
    for (const item of designSupporting.concat([designPillar])) {
      expect(item.cluster).toBe("design-koordinasi");
    }
  });
});

describe("Batch 11 — two-pillar architecture", () => {
  it("maintenance pillar mempunyai article.pillar: null dan articleType: pillar", () => {
    expect(maintenancePillar.article.pillar).toBeNull();
    expect(maintenancePillar.article.articleType).toBe("pillar");
  });

  it("design pillar mempunyai article.pillar: null dan articleType: pillar", () => {
    expect(designPillar.article.pillar).toBeNull();
    expect(designPillar.article.articleType).toBe("pillar");
  });

  it("kedua pillar tidak self-reference", () => {
    expect(maintenancePillar.relationships.guides).not.toContain(MAINTENANCE_PILLAR_ID);
    expect(designPillar.relationships.guides).not.toContain(DESIGN_PILLAR_ID);
  });

  it("maintenance pillar menautkan seluruh 7 supporting guide maintenance", () => {
    const ids = maintenanceSupporting.map((item) => item.id).sort();
    expect([...maintenancePillar.relationships.guides].sort()).toEqual(ids);
  });

  it("design pillar menautkan seluruh 5 supporting guide design", () => {
    const ids = designSupporting.map((item) => item.id).sort();
    expect([...designPillar.relationships.guides].sort()).toEqual(ids);
  });

  it("seluruh maintenance supporting guide menggunakan maintenance pillar, bukan design pillar", () => {
    for (const item of maintenanceSupporting) {
      expect(item.article.pillar).toBe(MAINTENANCE_PILLAR_ID);
      expect(item.relationships.guides).not.toContain(DESIGN_PILLAR_ID);
    }
  });

  it("seluruh design supporting guide menggunakan design pillar, bukan maintenance pillar", () => {
    for (const item of designSupporting) {
      expect(item.article.pillar).toBe(DESIGN_PILLAR_ID);
      expect(item.relationships.guides).not.toContain(MAINTENANCE_PILLAR_ID);
    }
  });

  it("setiap supporting guide mempunyai 2-5 sibling ID di luar pillar sendiri", () => {
    for (const item of maintenanceSupporting.concat(designSupporting)) {
      const pillarId = MAINTENANCE_SUPPORTING_SLUGS.includes(item.slug as (typeof MAINTENANCE_SUPPORTING_SLUGS)[number])
        ? MAINTENANCE_PILLAR_ID
        : DESIGN_PILLAR_ID;
      const siblings = item.relationships.guides.filter((id) => id !== pillarId);
      expect(siblings.length).toBeGreaterThanOrEqual(2);
      expect(siblings.length).toBeLessThanOrEqual(5);
    }
  });

  it("tidak ada guide yang self-link dalam relationships.guides-nya sendiri", () => {
    for (const item of b11) {
      expect(item.relationships.guides).not.toContain(item.id);
    }
  });

  it("seluruh guide ID dalam relationships resolve ke item yang benar-benar ada", () => {
    const relIssues = validateRelationships(items);
    const b11Issues = relIssues.filter((i) => B11_ALL_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)));
    expect(b11Issues).toEqual([]);
  });

  it("tidak ada pillar ketiga atau pillar generik dibuat", () => {
    const pillarCount = b11.filter((item) => item.article.articleType === "pillar").length;
    expect(pillarCount).toBe(2);
  });
});

describe("Batch 11 — service relationships", () => {
  it("setiap guide topic mereferensikan service ID yang sesuai, published+verified", () => {
    for (const { slug, service } of GUIDE_SERVICE_PAIRS) {
      const item = b11.find((i) => i.slug === slug)!;
      expect(item.relationships.services).toContain(service);
      expect(publishedServiceIds.has(service)).toBe(true);
    }
  });

  it("setiap guide menggunakan 1-3 relevant service, bukan seluruh service sekaligus", () => {
    for (const item of b11) {
      expect(item.relationships.services.length).toBeGreaterThanOrEqual(1);
      expect(item.relationships.services.length).toBeLessThanOrEqual(3);
    }
  });

  it("tidak ada halaman yang mereferensikan service yang masih review, draft, atau archived", () => {
    for (const item of b11) {
      for (const serviceId of item.relationships.services) {
        expect(publishedServiceIds.has(serviceId), `service ${serviceId} tidak published+verified`).toBe(true);
      }
    }
  });

  it("relationships.locations dan relationships.projects default kosong", () => {
    for (const item of b11) {
      expect(item.relationships.locations).toEqual([]);
      expect(item.relationships.projects).toEqual([]);
    }
  });
});

describe("Batch 11 — article-type mapping", () => {
  const EXPECTED_TYPES: Record<string, string> = {
    "apa-itu-building-maintenance": "pillar",
    "preventive-vs-corrective-maintenance": "comparison",
    "jadwal-preventive-maintenance-bangunan": "process",
    "checklist-inspeksi-gedung": "checklist",
    "perawatan-atap-bangunan": "explainer",
    "perawatan-fasad-bangunan": "explainer",
    "perawatan-mep-bangunan": "explainer",
    "kontrak-building-maintenance": "explainer",
    "apa-itu-design-and-build": "pillar",
    "keuntungan-design-and-build": "explainer",
    "apa-itu-interior-fit-out": "explainer",
    "shop-drawing-konstruksi": "explainer",
    "gambar-kerja-vs-gambar-desain": "comparison",
    "koordinasi-arsitektur-struktur-mep": "explainer",
  };

  it("articleType sesuai mapping yang didokumentasikan (planning/batch-11-mapping-notes.md)", () => {
    for (const item of b11) {
      expect(item.article.articleType).toBe(EXPECTED_TYPES[item.slug]);
    }
  });
});

describe("Batch 11 — service-guide keyword collision", () => {
  it("tidak ada primary keyword guide yang identik dengan primary keyword service manapun", () => {
    const serviceKeywords = new Set(
      services.map((s) => s.primaryKeyword?.trim().toLowerCase()).filter(Boolean)
    );
    for (const item of b11) {
      const kw = item.primaryKeyword?.trim().toLowerCase();
      expect(serviceKeywords.has(kw!), `${item.slug}: keyword "${kw}" collides with a service keyword`).toBe(false);
    }
  });

  it("primary keyword guide tidak diawali kata 'jasa'", () => {
    for (const item of b11) {
      expect(item.primaryKeyword?.trim().toLowerCase().startsWith("jasa")).toBe(false);
    }
  });

  it("search intent seluruh guide informational", () => {
    for (const item of b11) {
      expect(item.searchIntent).toBe("informational");
    }
  });

  it("primary keyword seluruh halaman Batch 11 tidak duplikat lintas seluruh koleksi (guide + service + sector + location + page)", () => {
    const normalized = items
      .map((item) => item.primaryKeyword)
      .filter((k): k is string => Boolean(k))
      .map((k) => k.trim().toLowerCase());
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it("title/description/excerpt tidak identik satu sama lain lintas seluruh 14 guide", () => {
    const fields: (keyof GuideItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = b11.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("title guide tidak identik dengan title service pasangannya", () => {
    for (const { slug, service } of GUIDE_SERVICE_PAIRS) {
      const guide = b11.find((i) => i.slug === slug)!;
      const svc = services.find((s) => s.id === service)!;
      expect(guide.title).not.toBe(svc.title);
    }
  });
});

describe("Batch 11 — final 78-guide keyword audit report", () => {
  it("reports/batch-11-final-guide-keyword-audit.md ada dan mengonfirmasi zero collision", () => {
    const reportPath = path.join(process.cwd(), "reports", "batch-11-final-guide-keyword-audit.md");
    expect(fs.existsSync(reportPath)).toBe(true);
    const reportBody = fs.readFileSync(reportPath, "utf8");
    expect(reportBody).toMatch(/No exact or normalized primaryKeyword collision exists/i);
    expect(guides.some((item) => item.sourcePath.includes("reports"))).toBe(false);
  });
});

describe("Batch 11 — Arkavena application lens", () => {
  it("setiap guide mempunyai heading 'Bagaimana pendekatan ini digunakan oleh Arkavena'", () => {
    for (const slug of B11_ALL_SLUGS) {
      const body = readBody(slug);
      expect(body).toMatch(/## Bagaimana pendekatan ini digunakan oleh Arkavena/);
    }
  });

  it("application-lens section tidak kosong", () => {
    for (const slug of B11_ALL_SLUGS) {
      const body = readBody(slug);
      const match = body.match(/## Bagaimana pendekatan ini digunakan oleh Arkavena\n\n([\s\S]+?)\n\n##/);
      expect(match, `${slug}: application-lens section not found or malformed`).not.toBeNull();
      expect(match![1].trim().length).toBeGreaterThan(50);
    }
  });

  it("tidak ada klaim SLA, aplikasi proprietary, sensor, CMMS, atau tim spesialis internal yang belum dikonfirmasi", () => {
    const FABRICATED_MAINTENANCE_CLAIMS = [
      /SLA \d/i,
      /emergency hotline/i,
      /24\/7 availability/i,
      /predictive maintenance system/i,
      /sensor monitoring/i,
      /software CMMS/i,
      /aplikasi maintenance (kami|milik Arkavena)/i,
      /dashboard (real-time|proprietary)/i,
    ];
    for (const slug of MAINTENANCE_ALL_SLUGS) {
      const body = readBody(slug);
      for (const pattern of FABRICATED_MAINTENANCE_CLAIMS) {
        expect(pattern.test(body), `${slug}.mdx matched fabricated claim ${pattern}`).toBe(false);
      }
    }
  });

  it("tidak ada klaim BIM capability, software desain tertentu, atau approval authority yang belum dikonfirmasi", () => {
    const FABRICATED_DESIGN_CLAIMS = [
      /kapabilitas BIM/i,
      /software (Revit|AutoCAD|ArchiCAD) (eksklusif|proprietary)/i,
      /approval authority penuh/i,
      /designer of record/i,
      /menjadi (satu-satunya|satu satunya) pihak yang menyetujui/i,
    ];
    for (const slug of DESIGN_ALL_SLUGS) {
      const body = readBody(slug);
      for (const pattern of FABRICATED_DESIGN_CLAIMS) {
        expect(pattern.test(body), `${slug}.mdx matched fabricated claim ${pattern}`).toBe(false);
      }
    }
  });
});

describe("Batch 11 — maintenance safety guardrails", () => {
  const HAZARDOUS_INSTRUCTION_PATTERNS: { pattern: RegExp; message: string }[] = [
    { pattern: /naik ke atap/i, message: "instructs climbing onto the roof" },
    { pattern: /berjalan di atas atap/i, message: "instructs walking on roof surface" },
    { pattern: /buka panel listrik/i, message: "instructs opening electrical panel" },
    { pattern: /perbaiki kabel sendiri/i, message: "instructs self-repairing wiring" },
    { pattern: /bongkar sistem/i, message: "instructs dismantling a system" },
    { pattern: /lepaskan tekanan/i, message: "instructs releasing pressure" },
    { pattern: /isi refrigeran/i, message: "instructs refilling refrigerant" },
    { pattern: /pasang penyangga/i, message: "instructs installing temporary support" },
    { pattern: /gunakan tangga untuk/i, message: "instructs using a ladder for a task" },
    { pattern: /perbaiki saat sistem aktif/i, message: "instructs repairing an active/live system" },
  ];

  it("tidak ada instruksi kerja berbahaya di seluruh guide maintenance", () => {
    for (const slug of MAINTENANCE_ALL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of HAZARDOUS_INSTRUCTION_PATTERNS) {
        expect(hasUnqualifiedHazard(body, pattern), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });

  it("perawatan-atap-bangunan memiliki escalation callout", () => {
    const body = readBody("perawatan-atap-bangunan");
    expect(body).toMatch(/eskalasi segera diperlukan/i);
  });

  it("perawatan-fasad-bangunan memiliki falling-object warning", () => {
    const body = readBody("perawatan-fasad-bangunan");
    expect(body).toMatch(/material jatuh/i);
  });

  it("perawatan-mep-bangunan menegaskan pekerjaan hanya boleh dilakukan tenaga kompeten", () => {
    const body = readBody("perawatan-mep-bangunan");
    expect(body).toMatch(/tenaga kompeten/i);
  });

  it("checklist-inspeksi-gedung tidak menyatakan bangunan 'aman' berdasarkan checklist visual", () => {
    const body = readBody("checklist-inspeksi-gedung");
    expect(body).not.toMatch(/checklist ini menyatakan (bangunan|gedung) aman/i);
    expect(body).toMatch(/bukan status ['"]aman['"]/i);
  });

  it("jadwal-preventive-maintenance-bangunan tidak menggunakan interval universal tanpa penjelasan sumber", () => {
    const body = readBody("jadwal-preventive-maintenance-bangunan");
    expect(body).not.toMatch(/semua atap diperiksa setiap/i);
    expect(body).not.toMatch(/semua panel diperiksa setiap/i);
    expect(body).toMatch(/tidak menggunakan (satu )?interval universal/i);
  });
});

describe("Batch 11 — contract-term guardrails", () => {
  const UNVERIFIED_CONTRACT_TERMS: { pattern: RegExp; message: string }[] = [
    { pattern: /kontrak (satu|1) tahun/i, message: "invents a one-year contract term" },
    { pattern: /kunjungan (setiap|per) bulan/i, message: "invents a monthly-visit term" },
    { pattern: /response time (adalah|sebesar|selama) \d/i, message: "invents a specific response time" },
    { pattern: /SLA (kami|Arkavena) (adalah|sebesar)/i, message: "invents an official SLA" },
    { pattern: /layanan 24 jam/i, message: "invents 24-hour service availability" },
    { pattern: /unlimited call-?out/i, message: "invents unlimited call-out coverage" },
    { pattern: /harga paket (mulai|sebesar) Rp/i, message: "invents a package price" },
    { pattern: /biaya bulanan (sebesar|mulai) Rp/i, message: "invents a monthly fee" },
    { pattern: /termasuk seluruh spare part/i, message: "invents spare-parts inclusion as standard" },
  ];

  it("tidak ada term kontrak resmi yang belum dikonfirmasi owner", () => {
    for (const slug of B11_ALL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of UNVERIFIED_CONTRACT_TERMS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });

  it("kontrak-building-maintenance menyatakan bukan nasihat hukum dan bukan term resmi", () => {
    const body = readBody("kontrak-building-maintenance");
    expect(body).toMatch(/bukan term resmi Arkavena/i);
    expect(body).toMatch(/bukan[^.]{0,60}nasihat hukum/i);
  });
});

describe("Batch 11 — design terminology guardrails", () => {
  it("design and build tidak disamakan dengan guaranteed fixed outcome (selalu lebih murah/cepat)", () => {
    const body = readBody("apa-itu-design-and-build");
    expect(body).toMatch(/tidak selalu lebih murah/i);
    expect(body).toMatch(/tidak selalu lebih cepat/i);
  });

  it("interior fit-out tidak disamakan dengan interior design atau renovasi", () => {
    const body = readBody("apa-itu-interior-fit-out");
    expect(body.toLowerCase()).toContain("berbeda dari interior design");
  });

  it("shop-drawing approval tidak disamakan dengan transfer tanggung jawab", () => {
    const body = readBody("shop-drawing-konstruksi");
    expect(body).toMatch(/tidak (secara otomatis )?mengalihkan tanggung jawab/i);
  });

  it("gambar kerja tidak disamakan dengan seluruh contract documents", () => {
    const body = readBody("gambar-kerja-vs-gambar-desain");
    expect(body).toMatch(/menganggap gambar kerja mewakili seluruh contract documents/i);
    expect(body).toMatch(/kesalahpahaman/i);
  });

  it("coordination tidak disamakan dengan design approval atau design certification", () => {
    const body = readBody("koordinasi-arsitektur-struktur-mep");
    expect(body).not.toMatch(/koordinasi (ini )?(adalah|merupakan|sama dengan) (persetujuan|sertifikasi) desain/i);
  });
});

describe("Batch 11 — confidentiality guardrails", () => {
  const CONFIDENTIAL_PATTERNS: { pattern: RegExp; message: string }[] = [
    { pattern: /berdasarkan proyek klien kami/i, message: "references a specific client project" },
    { pattern: /proyek (senilai|bernilai) Rp/i, message: "discloses a specific project contract value" },
    { pattern: /nomor proyek/i, message: "references a project number" },
  ];

  it("tidak ada referensi nama klien, nilai kontrak, atau data proyek rahasia", () => {
    for (const slug of B11_ALL_SLUGS) {
      const body = readBody(slug);
      for (const { pattern, message } of CONFIDENTIAL_PATTERNS) {
        expect(pattern.test(body), `${slug}.mdx: ${message}`).toBe(false);
      }
    }
  });
});

describe("Batch 11 — technical and contractual review register", () => {
  it("7 artikel mandatory technical review tetap reviewedBy:null dan menyatakan butuh technical review", () => {
    for (const slug of MANDATORY_TECHNICAL_SLUGS) {
      const item = b11.find((i) => i.slug === slug)!;
      expect(item.reviewedBy).toBeNull();
      const body = readBody(slug);
      expect(body).toMatch(/technical (dan contractual )?review terpisah/i);
    }
  });

  it("3 artikel mandatory contractual review tetap reviewedBy:null dan menyatakan butuh contractual/commercial review", () => {
    for (const slug of MANDATORY_CONTRACTUAL_SLUGS) {
      const item = b11.find((i) => i.slug === slug)!;
      expect(item.reviewedBy).toBeNull();
      const body = readBody(slug);
      expect(body).toMatch(/contractual (dan commercial )?review terpisah/i);
    }
  });
});

describe("Batch 11 — metadata", () => {
  it("seluruh 14 halaman menghasilkan noindex,follow (masih review)", () => {
    for (const item of b11) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });

  it("seluruh title unik setelah buildMetadata", () => {
    const titles = b11.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonical menggunakan route /panduan/[slug] yang benar", () => {
    for (const item of b11) {
      expect(item.route).toBe(`/panduan/${item.slug}`);
    }
  });

  it("title guide tidak memakai frasa 'Jasa'", () => {
    for (const item of b11) {
      expect(item.title.toLowerCase()).not.toContain("jasa");
    }
  });
});

describe("Batch 11 — structured data", () => {
  it("seluruh 14 halaman menghasilkan node Article + BreadcrumbList, bukan Service", () => {
    for (const item of b11) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("Article");
      expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("Service");
    }
  });

  it("tidak ada Offer, price, rating, atau review pada guide manapun", () => {
    for (const item of b11) {
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
    for (const item of b11) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("FAQPage");
    }
  });

  it("datePublished tidak muncul untuk halaman review (publishedAt null dihilangkan)", () => {
    for (const item of b11) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const article = graph["@graph"].find((n) => n["@type"] === "Article");
      expect(article).not.toHaveProperty("datePublished");
    }
  });
});

describe("Batch 11 — sitemap and hub", () => {
  it("seluruh halaman Batch 11 (masih review) tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of b11) {
      expect(eligible).not.toContain(item.route);
    }
  });
});
