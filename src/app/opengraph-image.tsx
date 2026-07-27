import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.brandName} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card for every route that does not supply its own image.
 * Rendered at build time with no external font or asset fetches.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#14171B",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 12,
              color: "#B88A4A",
              fontWeight: 700,
            }}
          >
            {siteConfig.brandName}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 68,
              lineHeight: 1.15,
              color: "#FFFFFF",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#9AA5AC",
          }}
        >
          <span>{siteConfig.englishDescriptor}</span>
          <span>{siteConfig.domain.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size
  );
}
