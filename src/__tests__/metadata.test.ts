import { describe, expect, it } from "vitest";
import {
  DEFAULT_OG_IMAGE,
  buildMetadata,
  buildTitle,
  resolveOgImage,
} from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import {
  asContentItem,
  baseFrontmatter,
  guideFrontmatter,
  landingFrontmatter,
  publishedFrontmatter,
} from "./fixtures/content";

describe("buildMetadata", () => {
  it("halaman published organik menghasilkan index, follow", () => {
    const metadata = buildMetadata(asContentItem(publishedFrontmatter()));
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("halaman draft menghasilkan noindex", () => {
    const metadata = buildMetadata(asContentItem(baseFrontmatter()));
    expect(metadata.robots).toMatchObject({ index: false });
  });

  it("landing page tidak pernah indexable", () => {
    const item = asContentItem(landingFrontmatter(), {
      isIndexable: false,
      isFollowable: true,
    });
    expect(buildMetadata(item).robots).toMatchObject({
      index: false,
      follow: true,
    });
  });

  it("canonical mengikuti route koleksi", () => {
    const metadata = buildMetadata(asContentItem(publishedFrontmatter()));
    expect(metadata.alternates?.canonical).toBe(
      `${siteConfig.domain}/layanan/fixture-layanan`
    );
  });

  it("seoTitle menimpa judul default", () => {
    expect(
      buildTitle({ seoTitle: "Judul Override", title: "Judul Asli" })
    ).toBe("Judul Override");
  });

  it("judul default memakai suffix brand sekali saja", () => {
    const title = buildTitle({ seoTitle: null, title: "Judul Asli" });
    expect(title).toBe(`Judul Asli | ${siteConfig.brandName}`);
    expect(title.split(siteConfig.brandName).length - 1).toBe(1);
  });

  it("judul memakai bentuk absolute agar template layout tidak ganda", () => {
    const metadata = buildMetadata(asContentItem(publishedFrontmatter()));
    expect(metadata.title).toEqual({
      absolute: `Fixture Layanan | ${siteConfig.brandName}`,
    });
  });

  it("OG image jatuh ke default ketika gambar khusus tidak tersedia", () => {
    expect(resolveOgImage(null)).toBe(DEFAULT_OG_IMAGE);
    expect(resolveOgImage("   ")).toBe(DEFAULT_OG_IMAGE);
    expect(resolveOgImage("/images/services/foo.webp")).toBe(
      "/images/services/foo.webp"
    );
  });

  it("panduan published menyertakan waktu publikasi pada Open Graph", () => {
    const item = asContentItem({
      ...guideFrontmatter(),
      status: "published",
      primaryKeyword: "fixture panduan",
      publishedAt: "2026-01-01",
      updatedAt: "2026-02-01",
      ownerVerified: true,
    });
    const openGraph = buildMetadata(item).openGraph as Record<string, unknown>;
    expect(openGraph.type).toBe("article");
    expect(openGraph.publishedTime).toBe("2026-01-01");
    expect(openGraph.modifiedTime).toBe("2026-02-01");
  });
});
