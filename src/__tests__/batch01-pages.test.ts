import { describe, expect, it } from "vitest";
import { loadAllContent } from "@/lib/content/loaders";
import { validateUniqueness } from "@/lib/content/validators";
import { selectSitemapItems } from "@/lib/content/sitemap";
import { navItems } from "@/components/layout/header";

const REQUIRED_PAGE_SLUGS = [
  "home",
  "tentang",
  "mengapa-arkavena",
  "cara-kerja",
  "kontak",
  "konsultasi-proyek",
  "layanan",
  "proyek",
  "sektor",
  "wilayah",
  "faq",
  "panduan",
] as const;

const { items, issues } = loadAllContent();
const pages = items.filter((item) => item.type === "page");

describe("Batch 01 — content/pages schema", () => {
  it("seluruh 12 file MDX lolos schema tanpa error", () => {
    expect(issues).toEqual([]);
  });

  it("keduabelas halaman wajib ada", () => {
    const slugs = pages.map((item) => item.slug).sort();
    expect(slugs).toEqual([...REQUIRED_PAGE_SLUGS].sort());
  });

  it("semua id unik di seluruh manifest", () => {
    const issues = validateUniqueness(items);
    expect(issues.filter((issue) => issue.rule === "duplicate-id")).toEqual([]);
  });

  it("semua slug unik dalam koleksi pages", () => {
    const issues = validateUniqueness(items);
    expect(issues.filter((issue) => issue.rule === "duplicate-slug")).toEqual(
      []
    );
  });

  it("primary keyword unik antar halaman", () => {
    // Keywords are set even while status is "review" so promotion to
    // "published" later doesn't collide — uniqueness only bites published
    // pages today, so this asserts on the raw set directly.
    const keywords = pages
      .map((item) => item.primaryKeyword)
      .filter((keyword): keyword is string => Boolean(keyword))
      .map((keyword) => keyword.trim().toLowerCase());
    expect(new Set(keywords).size).toBe(keywords.length);
  });

  it("home.mdx dipetakan ke route /", () => {
    const home = pages.find((item) => item.slug === "home");
    expect(home?.route).toBe("/");
    expect(home?.breadcrumb).toEqual([]);
  });

  it("setiap halaman non-home memiliki breadcrumb dua tingkat", () => {
    for (const item of pages.filter((p) => p.slug !== "home")) {
      expect(item.breadcrumb.length).toBeGreaterThanOrEqual(2);
      expect(item.breadcrumb[0]).toEqual({ name: "Beranda", path: "/" });
    }
  });

  it("owner-approved corporate/hub pages are published and indexable", () => {
    // Approved 2026-07-28: all 12 pages except /proyek, which stays in
    // review per its own documented exception (no verified projects yet).
    for (const item of pages.filter((p) => p.slug !== "proyek")) {
      expect(item.status).toBe("published");
      expect(item.ownerVerified).toBe(true);
      expect(item.isIndexable).toBe(true);
      expect(item.isFollowable).toBe(true);
    }
  });

  it("/proyek tetap review dan noindex meskipun batch lain sudah dipromosikan", () => {
    const proyek = pages.find((item) => item.slug === "proyek");
    expect(proyek?.status).toBe("review");
    expect(proyek?.ownerVerified).toBe(false);
    expect(proyek?.isIndexable).toBe(false);
    expect(proyek?.type).toBe("page");
    if (proyek?.type === "page") {
      expect(proyek.page.index).toBe(false);
      expect(proyek.page.showInPrimaryNavigation).toBe(false);
    }
  });

  it("/proyek akan tetap memaksa noindex melalui page.index seandainya dipromosikan tanpa mengubah flag ini", () => {
    // Guards the safety net itself, independent of current status.
    const proyek = pages.find((item) => item.slug === "proyek");
    if (proyek?.type === "page") {
      expect(proyek.page.index).toBe(false);
    }
  });

  it("halaman hub memiliki hubCollection yang sesuai", () => {
    const expected: Record<string, string> = {
      layanan: "services",
      sektor: "sectors",
      wilayah: "locations",
      panduan: "guides",
      proyek: "projects",
    };
    for (const [slug, collection] of Object.entries(expected)) {
      const item = pages.find((p) => p.slug === slug);
      expect(item?.type).toBe("page");
      if (item?.type === "page") {
        expect(item.page.kind).toBe("hub");
        expect(item.page.hubCollection).toBe(collection);
      }
    }
  });

  it("published+ownerVerified pages masuk sitemap; /proyek tidak", () => {
    const eligible = selectSitemapItems(items).map((item) => item.route);
    for (const slug of REQUIRED_PAGE_SLUGS.filter((s) => s !== "proyek")) {
      const item = pages.find((p) => p.slug === slug);
      expect(eligible).toContain(item?.route);
    }
    const proyek = pages.find((item) => item.slug === "proyek");
    expect(eligible).not.toContain(proyek?.route);
  });
});

describe("Batch 01 — navigation contract", () => {
  it("/proyek tidak muncul di primary navigation", () => {
    expect(navItems.some((item) => item.href === "/proyek")).toBe(false);
  });

  it("primary navigation berisi enam route yang diwajibkan", () => {
    const hrefs = navItems.map((item) => item.href).sort();
    expect(hrefs).toEqual(
      ["/kontak", "/layanan", "/panduan", "/sektor", "/tentang", "/wilayah"].sort()
    );
  });

  it("setiap item navigasi menunjuk ke halaman nyata di manifest", () => {
    const knownRoutes = new Set(items.map((item) => item.route));
    for (const item of navItems) {
      expect(knownRoutes.has(item.href)).toBe(true);
    }
  });
});

describe("Batch 01 — hub empty-state", () => {
  it("location/project masih kosong (belum ada batch untuk itu); service, sector, dan guide P3 sudah published sejak Batch 02+03+04A+04B+07A", () => {
    // Snapshot at Batch 01 time was "all empty" — Batch 02 (P1) and Batch 03
    // (P2) published all 20 services, Batch 04A (2026-07-28) published 6 P1
    // sectors, Batch 04B (2026-07-28) published 8 P2 sectors, Batch 07A
    // (2026-07-28) published 9 P3 Bangun Rumah guides, so only
    // location/project are still expected empty pending later batches.
    const publishedChildren = items.filter(
      (item) =>
        ["location", "project"].includes(item.type) &&
        item.isIndexable
    );
    expect(publishedChildren).toEqual([]);

    const publishedServices = items.filter(
      (item) => item.type === "service" && item.isIndexable
    );
    expect(publishedServices.length).toBe(20);

    const publishedSectors = items.filter(
      (item) => item.type === "sector" && item.isIndexable
    );
    expect(publishedSectors.length).toBe(14);

    const publishedGuides = items.filter(
      (item) => item.type === "guide" && item.isIndexable
    );
    expect(publishedGuides.length).toBe(9);
  });

  it("draft/review child tidak pernah indexable", () => {
    const draftChildren = items.filter(
      (item) =>
        ["service", "sector", "location", "guide", "project"].includes(
          item.type
        ) && item.status !== "published"
    );
    for (const child of draftChildren) {
      expect(child.isIndexable).toBe(false);
    }
  });
});
