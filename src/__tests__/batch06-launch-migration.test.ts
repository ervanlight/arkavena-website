import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildJsonLdGraph } from "@/lib/seo/schema-builders";
import { siteConfig } from "@/config/site";

const { items } = loadAllContent();
const launchApproved = selectSitemapItems(items);

describe("Batch 06 — sitewide metadata audit", () => {
  it("seluruh launch-approved page mempunyai title unik", () => {
    const titles = launchApproved.map((item) => JSON.stringify(buildMetadata(item).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("seluruh launch-approved page mempunyai description unik dan tidak kosong", () => {
    for (const item of launchApproved) {
      expect(item.description.trim().length).toBeGreaterThan(0);
    }
    const descriptions = launchApproved.map((item) => item.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("canonical seluruh launch-approved page menggunakan arkavena.com, tanpa query parameter", () => {
    for (const item of launchApproved) {
      const canonical = buildMetadata(item).alternates?.canonical;
      expect(canonical).toContain(siteConfig.domain);
      expect(String(canonical)).not.toMatch(/\?/);
    }
  });

  it("seluruh launch-approved page menghasilkan index,follow", () => {
    for (const item of launchApproved) {
      expect(buildMetadata(item).robots).toMatchObject({ index: true, follow: true });
    }
  });

  it("seluruh review/draft page menghasilkan noindex meskipun dibuka langsung", () => {
    const nonLaunch = items.filter((item) => item.status !== "published");
    for (const item of nonLaunch) {
      expect(buildMetadata(item).robots).toMatchObject({ index: false });
    }
  });

  it("OG image seluruh launch-approved page adalah URL absolut", () => {
    for (const item of launchApproved) {
      const og = buildMetadata(item).openGraph as { images: { url: string }[] };
      expect(og.images[0].url).toMatch(/^https?:\/\//);
    }
  });
});

describe("Batch 06 — structured-data audit", () => {
  it("JSON-LD serialization tidak error untuk seluruh launch-approved page", () => {
    for (const item of launchApproved) {
      expect(() => JSON.stringify(buildJsonLdGraph(item))).not.toThrow();
    }
  });

  it("tidak ada LocalBusiness, price, rating, atau review pada launch-approved page manapun", () => {
    for (const item of launchApproved) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("LocalBusiness");
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("offers");
        expect(node).not.toHaveProperty("price");
        expect(node).not.toHaveProperty("aggregateRating");
        expect(node).not.toHaveProperty("review");
      }
    }
  });

  it("seluruh launch-approved page selain homepage menghasilkan BreadcrumbList", () => {
    for (const item of launchApproved) {
      if (item.route === "/") continue;
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types, `${item.route} missing BreadcrumbList`).toContain("BreadcrumbList");
    }
  });

  it("FAQPage schema tetap disabled sitewide (schemaFlags.enableFaqSchema)", () => {
    for (const item of launchApproved) {
      const graph = buildJsonLdGraph(item) as unknown as { "@graph": Record<string, unknown>[] };
      const types = graph["@graph"].map((n) => n["@type"]);
      expect(types).not.toContain("FAQPage");
    }
  });
});

describe("Batch 06 — sitemap reconciliation", () => {
  it("sitemap predicate (published+indexable+ownerVerified) menghasilkan tepat 68 halaman dari content manifest", () => {
    // Original scope (2026-07-28): corporate/hub pages + 20 services + 6 P1
    // sectors = 37. Since then, owner approved and promoted Batch 04B (8 P2
    // sectors), Batch 07A (9 Bangun Rumah guides), and Batch 08 (14 Renovasi
    // Rumah guides) — all already deployed to production. This count tracks
    // the content manifest's sitemap-eligible set, not a fixed launch-day
    // number. If this changes, regenerate migration/launch-manifest.csv and
    // update this number deliberately, don't just bump it to make the test pass.
    expect(launchApproved.length).toBe(68);
  });

  it("tidak ada draft, review, atau archived page dalam sitemap predicate", () => {
    for (const item of launchApproved) {
      expect(item.status).toBe("published");
    }
  });

  it("tidak ada /wilayah/* atau /proyek/* selain hub dalam sitemap predicate (Batch 05 tetap noindex)", () => {
    const leaked = launchApproved.filter(
      (item) => /^\/wilayah\/.+/.test(item.route) || /^\/proyek\/.+/.test(item.route)
    );
    expect(leaked).toEqual([]);
  });

  it("/proyek hub tetap tidak masuk sitemap predicate sampai owner menyetujui", () => {
    expect(launchApproved.some((item) => item.route === "/proyek")).toBe(false);
  });
});

describe("Batch 06 — launch manifest audit", () => {
  const csvPath = path.join(process.cwd(), "migration", "launch-manifest.csv");
  const csv = fs.readFileSync(csvPath, "utf8");
  const lines = csv.trim().split("\n");
  const header = lines[0];
  const rows = lines.slice(1).map((line) => {
    // Simple CSV split good enough for this generated, comma-in-quotes file.
    const fields: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === "," && !inQuotes) {
        fields.push(cur);
        cur = "";
      } else cur += char;
    }
    fields.push(cur);
    return fields;
  });

  it("header sesuai kolom yang disepakati", () => {
    expect(header).toBe(
      "route,type,status,owner_verified,index_flag,collection_gate,sitemap_expected,navigation_visible,launch_decision,notes"
    );
  });

  it("tidak ada baris dengan leading space pada route", () => {
    for (const row of rows) {
      expect(row[0].startsWith(" ")).toBe(false);
    }
  });

  it("setiap halaman indexable (content manifest) ada di launch manifest dengan launch_decision approved", () => {
    const manifestRoutes = new Set(rows.map((r) => r[0]));
    for (const item of launchApproved) {
      expect(manifestRoutes.has(item.route), `${item.route} missing from launch manifest`).toBe(true);
      const row = rows.find((r) => r[0] === item.route)!;
      expect(row[8]).toBe("approved");
    }
  });

  it("tidak ada baris noindex yang launch_decision-nya approved dengan sitemap_expected true secara kontradiktif", () => {
    for (const row of rows) {
      const [, , , , indexFlag, , sitemapExpected, , launchDecision] = row;
      if (sitemapExpected === "true") {
        expect(indexFlag).toBe("true");
      }
      if (launchDecision === "approved" && row[2] === "review") {
        // A review-status row must never be marked approved.
        expect(true).toBe(false);
      }
    }
  });

  it("halaman Batch 04B (sektor P2, PR #6, owner-approved dan merged 2026-07-28) tercatat approved, sudah live di production", () => {
    const p2Slugs = ["cafe", "restoran", "sekolah", "masjid", "klinik", "hotel", "villa", "showroom-retail"];
    for (const slug of p2Slugs) {
      const row = rows.find((r) => r[0] === `/sektor/${slug}`);
      expect(row).toBeDefined();
      expect(row?.[8]).toBe("approved");
    }
  });
});

describe("Batch 06 — placeholder and unsupported-claim scan", () => {
  const FORBIDDEN_STRINGS = [
    "lorem ipsum",
    "TODO",
    "TBD",
    "example@example.com",
    "coming soon",
    "replace this",
    "owner to confirm",
  ];

  it("tidak ada placeholder generik pada body MDX halaman launch-approved", () => {
    for (const item of launchApproved) {
      const fullPath = item.sourcePath;
      if (!fs.existsSync(fullPath)) continue;
      const body = fs.readFileSync(fullPath, "utf8");
      for (const needle of FORBIDDEN_STRINGS) {
        expect(
          body.toLowerCase().includes(needle.toLowerCase()),
          `${item.route} contains forbidden placeholder "${needle}"`
        ).toBe(false);
      }
    }
  });
});
