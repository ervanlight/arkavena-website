import { describe, expect, it } from "vitest";
import { redirects } from "@/config/redirects";
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
});
