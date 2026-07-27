import type { MetadataRoute } from "next";
import { absoluteUrl, siteOrigin } from "@/lib/seo/canonical";

/**
 * robots.txt blocks only non-public surfaces. Indexability of drafts and paid
 * landing pages is handled by page metadata, never here (ARCHITECTURE.md §12.4).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/_next/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteOrigin(),
  };
}
