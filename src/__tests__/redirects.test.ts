import { describe, expect, it } from "vitest";
import { LEGACY_DOMAINS, redirects, toNextRedirect } from "@/config/redirects";
import { knownRoutes, validateRedirects } from "@/lib/content/validators";
import { asContentItem, publishedFrontmatter } from "./fixtures/content";

const routes = knownRoutes([asContentItem(publishedFrontmatter())]);

describe("redirect map", () => {
  it("konfigurasi saat ini valid", () => {
    expect(validateRedirects(redirects, routes)).toHaveLength(0);
  });

  it("mendeteksi loop langsung", () => {
    const issues = validateRedirects(
      [{ source: "/a", destination: "/a", permanent: true, reason: "test" }],
      new Set(["/a"])
    );
    expect(issues.some((issue) => issue.rule === "redirect-loop")).toBe(true);
  });

  it("mendeteksi loop tidak langsung", () => {
    const issues = validateRedirects(
      [
        { source: "/a", destination: "/b", permanent: true, reason: "test" },
        { source: "/b", destination: "/a", permanent: true, reason: "test" },
      ],
      new Set(["/a", "/b"])
    );
    expect(issues.some((issue) => issue.rule === "redirect-loop")).toBe(true);
  });

  it("mendeteksi rantai redirect", () => {
    const issues = validateRedirects(
      [
        { source: "/a", destination: "/b", permanent: true, reason: "test" },
        { source: "/b", destination: "/c", permanent: true, reason: "test" },
      ],
      new Set(["/a", "/b", "/c"])
    );
    expect(issues.some((issue) => issue.rule === "redirect-chain")).toBe(true);
  });

  it("menolak destination yang bukan route produksi", () => {
    const issues = validateRedirects(
      [
        {
          source: "/lama",
          destination: "/tidak-ada",
          permanent: true,
          reason: "test",
        },
      ],
      routes
    );
    expect(
      issues.some((issue) => issue.rule === "redirect-destination-missing")
    ).toBe(true);
  });

  it("menerima destination berupa route konten yang valid", () => {
    const issues = validateRedirects(
      [
        {
          source: "/lama",
          destination: "/layanan/fixture-layanan",
          permanent: true,
          reason: "test",
        },
      ],
      routes
    );
    expect(issues).toHaveLength(0);
  });

  it("seluruh redirect terkonfigurasi bersifat permanent (301/308, bukan 302/307)", () => {
    for (const entry of redirects) {
      expect(entry.permanent, `${entry.source} harus permanent: true`).toBe(true);
    }
  });

  it("field host, jika diisi, harus salah satu dari LEGACY_DOMAINS", () => {
    for (const entry of redirects) {
      if (entry.host) {
        expect(LEGACY_DOMAINS as readonly string[]).toContain(entry.host);
      }
    }
  });
});

describe("toNextRedirect (host-aware shape)", () => {
  it("redirect tanpa host tidak menghasilkan matcher `has`", () => {
    const result = toNextRedirect({
      source: "/lama",
      destination: "/baru",
      permanent: true,
      reason: "slug rename",
    });
    expect(result.has).toBeUndefined();
  });

  it("redirect dengan host menghasilkan matcher `has: [{ type: 'host', value }]`", () => {
    const result = toNextRedirect({
      source: "/jasa-bangun-rumah",
      destination: "/layanan/bangun-rumah",
      permanent: true,
      reason: "old-domain path migration",
      host: "manajemenkonstruksi.id",
    });
    expect(result.has).toEqual([{ type: "host", value: "manajemenkonstruksi.id" }]);
  });

  it("host-scoped redirect tidak pernah diam-diam berlaku untuk arkavena.com", () => {
    // Regression guard for ARCHITECTURE.md Batch 06 §10.2: a rule scoped to
    // the old domain must never omit the `has` matcher, which is what would
    // let it fire on the same path if it were ever requested on arkavena.com.
    const result = toNextRedirect({
      source: "/jasa-bangun-rumah",
      destination: "/layanan/bangun-rumah",
      permanent: true,
      reason: "old-domain path migration",
      host: "manajemenkonstruksi.id",
    });
    expect(result.has).toBeDefined();
    expect(result.has!.length).toBeGreaterThan(0);
  });
});
