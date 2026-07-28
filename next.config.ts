import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { redirects as contentRedirects, toNextRedirect } from "./src/config/redirects";

const nextConfig: NextConfig = {
  // `output: "standalone"` was removed together with the Dockerfile — it only
  // existed to feed the container image and is a no-op on Vercel.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [];
  },
  async redirects() {
    return contentRedirects.map(toNextRedirect);
  },
};

// MDX files live in /content and are imported as modules through the generated
// registry — they are never routed directly, so `pageExtensions` stays untouched.
const withMDX = createMDX({
  options: {
    // Plugin names are passed as strings so Turbopack can serialize them.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
