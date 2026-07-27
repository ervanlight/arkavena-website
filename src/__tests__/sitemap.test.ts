import { describe, expect, it } from "vitest";
import { selectSitemapItems } from "@/lib/content/sitemap";
import {
  asContentItem,
  baseFrontmatter,
  landingFrontmatter,
  publishedFrontmatter,
} from "./fixtures/content";

const routesOf = (items: ReturnType<typeof selectSitemapItems>) =>
  items.map((item) => item.route);

describe("sitemap selection", () => {
  const published = asContentItem(publishedFrontmatter());
  const draft = asContentItem(baseFrontmatter({ id: "svc-draft", slug: "draft" }));
  const archived = asContentItem(
    publishedFrontmatter({
      id: "svc-arsip",
      slug: "arsip",
      status: "archived",
    }),
    { isIndexable: false, isFollowable: false }
  );
  const landing = asContentItem(landingFrontmatter(), {
    isIndexable: false,
    isFollowable: true,
  });

  const selected = selectSitemapItems([published, draft, archived, landing]);

  it("memasukkan halaman organik yang published", () => {
    expect(routesOf(selected)).toContain("/layanan/fixture-layanan");
  });

  it("tidak memasukkan draft", () => {
    expect(routesOf(selected)).not.toContain("/layanan/draft");
  });

  it("tidak memasukkan halaman archived", () => {
    expect(routesOf(selected)).not.toContain("/layanan/arsip");
  });

  it("tidak memasukkan landing page", () => {
    expect(routesOf(selected).some((route) => route.startsWith("/lp/"))).toBe(
      false
    );
  });

  it("menolak halaman published yang belum ownerVerified", () => {
    const unverified = asContentItem(
      publishedFrontmatter({ id: "svc-unverified", slug: "unverified" }),
      { isIndexable: true }
    );
    unverified.ownerVerified = false;
    expect(routesOf(selectSitemapItems([unverified]))).toHaveLength(0);
  });

  it("urutan deterministik berdasarkan route", () => {
    const a = asContentItem(publishedFrontmatter({ id: "svc-a", slug: "aaa" }));
    const z = asContentItem(publishedFrontmatter({ id: "svc-z", slug: "zzz" }));
    expect(routesOf(selectSitemapItems([z, a]))).toEqual([
      "/layanan/aaa",
      "/layanan/zzz",
    ]);
  });
});
