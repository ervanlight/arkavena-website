import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { validateRelationships, validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { buildMetadata } from "@/lib/seo/metadata";
import type { LocationItem, ProjectItem } from "@/schemas/content-types";

const LOCATION_SLUGS = [
  "jawa-timur",
  "surabaya",
  "sidoarjo",
  "gresik",
  "mojokerto",
  "pasuruan",
  "lamongan",
  "malang",
] as const;

const PROJECT_SLUGS = [
  "perumahan-karangploso-malang-2018",
  "rumah-tinggal-malang-kota-2019",
  "kos-dau-malang-2020",
  "rumah-tinggal-solo-2024",
  "hunian-lamongan-2022",
  "kos-surabaya-2023-2026",
  "kos-sidoarjo-2023-2026",
] as const;

const { items, issues } = loadAllContent();
const locations = items.filter(
  (item): item is LocationItem =>
    item.type === "location" && LOCATION_SLUGS.includes(item.slug as (typeof LOCATION_SLUGS)[number])
);
const projects = items.filter(
  (item): item is ProjectItem =>
    item.type === "project" && PROJECT_SLUGS.includes(item.slug as (typeof PROJECT_SLUGS)[number])
);
const publishedServiceIds = new Set(
  items
    .filter((item) => item.type === "service" && item.status === "published" && item.ownerVerified)
    .map((item) => item.id)
);
const readLocationBody = (slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", "locations", `${slug}.mdx`), "utf8");
const readProjectBody = (slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", "projects", `${slug}.mdx`), "utf8");

describe("Batch 05 — location content validation", () => {
  it("seluruh 8 file lokasi valid tanpa error schema", () => {
    expect(issues.filter((i) => LOCATION_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)))).toEqual([]);
  });

  it("tepat 8 halaman lokasi dibuat", () => {
    expect(locations.map((i) => i.slug).sort()).toEqual([...LOCATION_SLUGS].sort());
  });

  it("id menggunakan namespace loc-* dan cocok dengan slug", () => {
    for (const item of locations) {
      expect(item.id).toBe(`loc-${item.slug}`);
    }
  });

  it("seluruh ID dan route unik di manifest", () => {
    const dupeIssues = validateUniqueness(items);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-id")).toEqual([]);
    expect(dupeIssues.filter((i) => i.rule === "duplicate-route")).toEqual([]);
  });

  it("seluruh halaman lokasi review/ownerVerified:false/localFactsVerified:false/publishedAt:null", () => {
    for (const item of locations) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.location.localFactsVerified).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("relationships.guides kosong untuk seluruh lokasi (guide collection belum ada sampai Batch 07-11)", () => {
    for (const item of locations) {
      expect(item.relationships.guides).toEqual([]);
    }
  });

  it("service IDs pada relationships hanya menunjuk service published dan ownerVerified", () => {
    const relIssues = validateRelationships(items);
    const locIssues = relIssues.filter((i) => LOCATION_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)));
    expect(locIssues).toEqual([]);

    for (const item of locations) {
      for (const serviceId of item.relationships.services) {
        expect(
          publishedServiceIds.has(serviceId),
          `${item.slug}: service ID ${serviceId} tidak published/verified`
        ).toBe(true);
      }
    }
  });
});

describe("Batch 05 — location publication gate", () => {
  it("tidak ada halaman lokasi yang published (semua masih draft menunggu owner)", () => {
    for (const item of locations) {
      expect(item.status).not.toBe("published");
    }
  });

  it("localChallenges pada 7 kota (selain jawa-timur regional) memuat placeholder eksplisit, bukan klaim lokal yang dikarang", () => {
    for (const slug of LOCATION_SLUGS.filter((s) => s !== "jawa-timur")) {
      const item = locations.find((i) => i.slug === slug)!;
      for (const claim of item.location.localChallenges) {
        expect(claim.toUpperCase()).toContain("PENDING");
      }
    }
  });

  it("localProjectRefs hanya berisi kota dengan data proyek nyata (surabaya, sidoarjo, lamongan, malang); kota lain kosong", () => {
    const withRefs = ["surabaya", "sidoarjo", "lamongan", "malang"];
    const withoutRefs = ["gresik", "mojokerto", "pasuruan"];
    for (const slug of withRefs) {
      const item = locations.find((i) => i.slug === slug)!;
      expect(item.location.localProjectRefs.length).toBeGreaterThan(0);
    }
    for (const slug of withoutRefs) {
      const item = locations.find((i) => i.slug === slug)!;
      expect(item.location.localProjectRefs).toEqual([]);
    }
  });

  it("malang secara eksplisit menandai bahwa status area layanan resmi belum dikonfirmasi owner", () => {
    const body = readLocationBody("malang");
    expect(body).toMatch(/belum dikonfirmasi|belum tercantum|OWNER DATA REQUIRED|owner perlu/i);
  });
});

describe("Batch 05 — location uniqueness", () => {
  it("title/description/excerpt/hero.summary tidak identik satu sama lain", () => {
    const fields: (keyof LocationItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = locations.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
    const summaries = locations.map((item) => item.hero.summary);
    expect(new Set(summaries).size).toBe(summaries.length);
  });

  it("tidak ada FAQ list identik antar kota", () => {
    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const a = JSON.stringify(locations[i].faq);
        const b = JSON.stringify(locations[j].faq);
        expect(a).not.toBe(b);
      }
    }
  });

  it("tidak ada full-paragraph body identik antar dua halaman kota (city-name substitution guardrail)", () => {
    // The final "Panduan terkait" paragraph is a standard closing CTA shared
    // across pages by design (same pattern as sector/service pages) — it is
    // exempted here, same as ARCHITECTURE.md's "kecuali legal atau standard
    // CTA component" carve-out.
    const STANDARD_CTA_PARAGRAPH =
      "Panduan seputar proses kerja Arkavena dapat dibaca di halaman [Cara Kerja](/cara-kerja). Untuk gambaran wilayah layanan lain, kunjungi halaman [Wilayah Jawa Timur](/wilayah/jawa-timur).";
    const bodies = LOCATION_SLUGS.map((slug) => ({
      slug,
      paragraphs: readLocationBody(slug)
        .split("---")
        .slice(2)
        .join("---")
        .split("\n\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 80 && !p.startsWith("<") && p !== STANDARD_CTA_PARAGRAPH),
    }));
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const shared = bodies[i].paragraphs.filter((p) => bodies[j].paragraphs.includes(p));
        expect(
          shared,
          `${bodies[i].slug} vs ${bodies[j].slug} share identical paragraph(s): ${shared.join(" | ")}`
        ).toEqual([]);
      }
    }
  });

  it("tidak ada lorem ipsum atau placeholder generik yang menyamar sebagai fakta", () => {
    for (const slug of LOCATION_SLUGS) {
      const body = readLocationBody(slug);
      expect(body.toLowerCase()).not.toMatch(/lorem ipsum|placeholder text/);
    }
  });
});

describe("Batch 05 — location structured data", () => {
  it("seluruh halaman lokasi menghasilkan WebPage/Service + BreadcrumbList, tanpa LocalBusiness per kota", () => {
    for (const item of locations) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("LocalBusiness");
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
      }
    }
  });
});

describe("Batch 05 — project content validation", () => {
  it("seluruh 7 file proyek valid tanpa error schema", () => {
    expect(issues.filter((i) => PROJECT_SLUGS.some((s) => i.file.endsWith(`${s}.mdx`)))).toEqual([]);
  });

  it("tepat 7 halaman proyek dibuat", () => {
    expect(projects.map((i) => i.slug).sort()).toEqual([...PROJECT_SLUGS].sort());
  });

  it("id menggunakan namespace project-* dan cocok dengan slug", () => {
    for (const item of projects) {
      expect(item.id).toBe(`project-${item.slug}`);
    }
  });

  it("seluruh halaman proyek review/ownerVerified:false/factsVerified:false/clientPermission:false", () => {
    for (const item of projects) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
      expect(item.project.factsVerified).toBe(false);
      expect(item.project.clientPermission).toBe(false);
      expect(item.publishedAt).toBeNull();
      expect(item.isIndexable).toBe(false);
    }
  });

  it("tidak ada nama klien asli di frontmatter atau slug — hanya disclosureName anonim", () => {
    // Real given client aliases (Pak Haris, Pak Rizaldy, Pak Satya, Pak Mulyanto)
    // must never appear in slug, id, disclosureName, or title.
    const clientAliases = ["haris", "rizaldy", "satya", "mulyanto"];
    for (const item of projects) {
      const publicFields = [item.slug, item.id, item.project.disclosureName, item.title].join(" ").toLowerCase();
      for (const alias of clientAliases) {
        expect(publicFields).not.toContain(alias);
      }
    }
  });

  it("outcomes berisi placeholder eksplisit PENDING, bukan hasil yang terlihat seperti fakta", () => {
    for (const item of projects) {
      expect(item.project.outcomes.length).toBeGreaterThan(0);
      for (const outcome of item.project.outcomes) {
        expect(outcome.toUpperCase()).toContain("PENDING");
      }
      // Guardrail against generic-sounding fake outcomes even inside a "temporary" wrapper.
      for (const outcome of item.project.outcomes) {
        expect(outcome).not.toMatch(/selesai tepat waktu|kepuasan tinggi|hasil memuaskan/i);
      }
    }
  });

  it("budgetDisclosure adalah confidential untuk seluruh proyek (tidak ada angka anggaran yang dikarang)", () => {
    for (const item of projects) {
      expect(item.project.budgetDisclosure).toBe("confidential");
      expect(item.project.areaM2).toBeNull();
    }
  });

  it("sector belum di-mapping (null) untuk seluruh proyek — menunggu konfirmasi owner, bukan tebakan", () => {
    for (const item of projects) {
      expect(item.project.sector).toBeNull();
    }
  });
});

describe("Batch 05 — project location scoping", () => {
  it("6 dari 7 proyek terhubung ke loc-* yang valid dan ada dalam batch ini", () => {
    const withLocationRelationship = projects.filter((item) => item.slug !== "rumah-tinggal-solo-2024");
    for (const item of withLocationRelationship) {
      expect(item.relationships.locations.length).toBeGreaterThan(0);
      for (const locId of item.relationships.locations) {
        expect(items.some((i) => i.id === locId)).toBe(true);
      }
    }
  });

  it("proyek Solo TIDAK terhubung ke halaman wilayah manapun (di luar 7 kota Jawa Timur batch ini)", () => {
    const solo = projects.find((item) => item.slug === "rumah-tinggal-solo-2024")!;
    expect(solo.relationships.locations).toEqual([]);
    expect(solo.project.location).toBe("Solo");
  });

  it("tidak ada halaman /wilayah/solo yang dibuat", () => {
    expect(fs.existsSync(path.join(process.cwd(), "content", "locations", "solo.mdx"))).toBe(false);
  });
});

describe("Batch 05 — project uniqueness", () => {
  it("title/description/excerpt tidak identik satu sama lain", () => {
    const fields: (keyof ProjectItem)[] = ["title", "description", "excerpt"];
    for (const field of fields) {
      const values = projects.map((item) => item[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("tidak ada lorem ipsum atau placeholder generik yang menyamar sebagai fakta", () => {
    for (const slug of PROJECT_SLUGS) {
      const body = readProjectBody(slug);
      expect(body.toLowerCase()).not.toMatch(/lorem ipsum|placeholder text/);
    }
  });
});

describe("Batch 05 — project structured data", () => {
  it("seluruh halaman proyek menghasilkan BreadcrumbList, tanpa price/rating/fake client entity", () => {
    for (const item of projects) {
      const graph = buildJsonLdGraph(item) as unknown as {
        "@graph": Record<string, unknown>[];
      };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).toContain("BreadcrumbList");
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
      }
    }
  });
});

describe("Batch 05 — metadata (draft, noindex regardless of environment)", () => {
  it("seluruh halaman lokasi dan proyek menghasilkan noindex,follow", () => {
    for (const item of [...locations, ...projects]) {
      const metadata = buildMetadata(item);
      expect(metadata.robots).toMatchObject({ index: false, follow: true });
    }
  });
});

describe("Batch 05 — sitemap exclusion", () => {
  it("tidak satu pun halaman lokasi atau proyek Batch 05 masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const item of [...locations, ...projects]) {
      expect(eligible).not.toContain(item.route);
    }
  });

  it("/proyek hub tetap tidak masuk sitemap", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    expect(eligible).not.toContain("/proyek");
  });
});

describe("Batch 05 — DraftBadge visible in every environment (production-leak defect fix)", () => {
  it("DraftBadge source no longer special-cases VERCEL_ENV=production", () => {
    // Regression guard for the Batch 05 defect fix: DraftBadge used to hide
    // itself whenever VERCEL_ENV === "production", which would have made
    // every review-status location/project page in this batch visually
    // indistinguishable from a published page once merged and deployed to
    // production. The badge must now render in every environment for any
    // non-published item.
    const source = fs.readFileSync(
      path.join(process.cwd(), "src", "components", "content", "content-shell.tsx"),
      "utf8"
    );
    expect(source).not.toMatch(/process\.env\.VERCEL_ENV/);
    expect(source).toMatch(/if \(item\.status === "published"\) return null;/);
  });
});
