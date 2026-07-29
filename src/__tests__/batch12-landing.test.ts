import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { loadAllContent } from "@/lib/content/loaders";
import { selectSitemapItems } from "@/lib/content/sitemap";
import type { LandingItem } from "@/schemas/content-types";
import { getAnalyticsMode, LANDING_EVENTS } from "@/lib/landing/analytics";
import { ALLOWED_PARAMS } from "@/lib/landing/attribution";
import { leadPayloadSchema } from "@/lib/lead/schema";
import { checkRateLimit, clientKeyFromHeaders } from "@/lib/lead/rate-limit";

const LANDING_SLUGS = [
  "bangun-rumah-surabaya",
  "renovasi-rumah-surabaya",
  "manajemen-konstruksi",
  "building-maintenance",
] as const;

const { items, issues } = loadAllContent();
const landingPages = items.filter((item): item is LandingItem => item.type === "landing");

function readRawMdx(slug: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "content", "landing", `${slug}.mdx`),
    "utf-8"
  );
}

describe("Batch 12 — content pipeline", () => {
  it("loads all four landing pages with no loader issues touching /lp", () => {
    const lpIssues = issues.filter((issue) => issue.file.includes("landing/"));
    expect(lpIssues).toEqual([]);
    expect(landingPages).toHaveLength(4);
  });

  it("declares exactly the four planned landing slugs", () => {
    const slugs = landingPages.map((item) => item.slug).sort();
    expect(slugs).toEqual([...LANDING_SLUGS].sort());
  });
});

describe("Batch 12 — noindex and sitemap-exclusion hard gate", () => {
  it.each(LANDING_SLUGS)("landing.index is false for %s", (slug) => {
    const item = landingPages.find((p) => p.slug === slug)!;
    expect(item).toBeDefined();
    expect(item.landing.index).toBe(false);
  });

  it("no /lp/* route ever appears in sitemapEligible output", () => {
    const sitemapRoutes = selectSitemapItems(items).map((item) => item.route);
    expect(sitemapRoutes.some((route) => route.startsWith("/lp/"))).toBe(false);
  });

  it("every landing page has a valid internal thankYouPath", () => {
    for (const item of landingPages) {
      expect(item.landing.thankYouPath.startsWith("/")).toBe(true);
    }
  });

  it("every landing page names its organic-equivalent service", () => {
    for (const item of landingPages) {
      expect(item.landing.organicEquivalent).toMatch(/^\/layanan\//);
    }
  });

  it("no landing page is published/ownerVerified without owner sign-off", () => {
    for (const item of landingPages) {
      expect(item.status).toBe("review");
      expect(item.ownerVerified).toBe(false);
    }
  });
});

describe("Batch 12 — no fabricated proof elements", () => {
  const PROHIBITED_PROOF_PATTERNS = [
    /testimoni/i,
    /rating\s*\d/i,
    /\d+\s*bintang/i,
    /★{2,}/,
    /klien kami.*puas/i,
    /(ratusan|ribuan) (klien|proyek) (telah|sudah)/i,
  ];

  it.each(LANDING_SLUGS)("%s contains no fake testimonial/rating/logo claims", (slug) => {
    const raw = readRawMdx(slug);
    for (const pattern of PROHIBITED_PROOF_PATTERNS) {
      expect(raw).not.toMatch(pattern);
    }
  });

  it.each(LANDING_SLUGS)("%s has an empty sources array (no invented external claims)", (slug) => {
    const item = landingPages.find((p) => p.slug === slug)!;
    expect(item.sources).toEqual([]);
  });
});

describe("Batch 12 — conversion event taxonomy", () => {
  it("taxonomy contains exactly the seven approved events, generate_lead included", () => {
    expect([...LANDING_EVENTS].sort()).toEqual(
      [
        "landing_view",
        "cta_click",
        "whatsapp_click",
        "form_start",
        "form_submit_attempt",
        "generate_lead",
        "form_submit_error",
      ].sort()
    );
  });
});

describe("Batch 12 — analytics mode (no dual-mode)", () => {
  it("resolves to exactly one of none|ga4|gtm, never both", () => {
    const mode = getAnalyticsMode();
    expect(["none", "ga4", "gtm"]).toContain(mode);
  });

  it("GTM takes precedence over GA4 when both env vars are set (single mode only)", () => {
    const originalGtm = process.env.NEXT_PUBLIC_GTM_ID;
    const originalGa = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    process.env.NEXT_PUBLIC_GTM_ID = "GTM-TEST";
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST";
    expect(getAnalyticsMode()).toBe("gtm");
    process.env.NEXT_PUBLIC_GTM_ID = originalGtm;
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalGa;
  });

  it("resolves to none when no ID is configured (current production state)", () => {
    const originalGtm = process.env.NEXT_PUBLIC_GTM_ID;
    const originalGa = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    delete process.env.NEXT_PUBLIC_GTM_ID;
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    expect(getAnalyticsMode()).toBe("none");
    if (originalGtm) process.env.NEXT_PUBLIC_GTM_ID = originalGtm;
    if (originalGa) process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalGa;
  });
});

describe("Batch 12 — attribution allowlist and PII safety", () => {
  it("only allowlists known non-PII campaign parameters", () => {
    expect([...ALLOWED_PARAMS].sort()).toEqual(
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"].sort()
    );
  });

  it("does not allowlist any parameter name resembling PII", () => {
    const piiPatterns = [/email/i, /phone/i, /name/i, /address/i, /ip$/i];
    for (const param of ALLOWED_PARAMS) {
      for (const pattern of piiPatterns) {
        expect(param).not.toMatch(pattern);
      }
    }
  });
});

describe("Batch 12 — lead payload server-side validation", () => {
  it("rejects a payload missing required fields", () => {
    const result = leadPayloadSchema.safeParse({ name: "A" });
    expect(result.success).toBe(false);
  });

  it("accepts a valid, well-formed payload", () => {
    const result = leadPayloadSchema.safeParse({
      name: "Budi Santoso",
      phone: "081234567890",
      message: "Ingin konsultasi",
      campaign: "bangun-rumah-surabaya",
      pagePath: "/lp/bangun-rumah-surabaya",
      attribution: { utm_source: "google" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects a phone number with letters (basic anti-junk validation)", () => {
    const result = leadPayloadSchema.safeParse({
      name: "Budi",
      phone: "not-a-phone",
      campaign: "bangun-rumah-surabaya",
      pagePath: "/lp/bangun-rumah-surabaya",
    });
    expect(result.success).toBe(false);
  });

  it("silently accepts an empty honeypot but the field exists in the schema", () => {
    const result = leadPayloadSchema.safeParse({
      name: "Budi",
      phone: "081234567890",
      campaign: "bangun-rumah-surabaya",
      pagePath: "/lp/bangun-rumah-surabaya",
      companyWebsite: "",
    });
    expect(result.success).toBe(true);
  });
});

describe("Batch 12 — /api/lead rate limiting (audit finding I8)", () => {
  it("allows requests under the limit and blocks once the limit is exceeded", () => {
    const key = `test-key-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(key)).toBe(true);
    }
    expect(checkRateLimit(key)).toBe(false);
  });

  it("tracks each client key independently", () => {
    const keyA = `test-key-a-${Math.random()}`;
    const keyB = `test-key-b-${Math.random()}`;
    for (let i = 0; i < 5; i++) checkRateLimit(keyA);
    expect(checkRateLimit(keyA)).toBe(false);
    expect(checkRateLimit(keyB)).toBe(true);
  });

  it("reads the first IP from a comma-separated x-forwarded-for header", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178" });
    expect(clientKeyFromHeaders(headers)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip, then 'unknown', when x-forwarded-for is absent", () => {
    expect(clientKeyFromHeaders(new Headers({ "x-real-ip": "203.0.113.9" }))).toBe(
      "203.0.113.9"
    );
    expect(clientKeyFromHeaders(new Headers())).toBe("unknown");
  });
});

describe("Batch 12 — landing pages reference only real, published organic services", () => {
  const services = items.filter((item) => item.type === "service");

  it.each(LANDING_SLUGS)("%s's organicEquivalent points to a published service", (slug) => {
    const item = landingPages.find((p) => p.slug === slug)!;
    const targetSlug = item.landing.organicEquivalent!.replace("/layanan/", "");
    const match = services.find((s) => s.slug === targetSlug);
    expect(match).toBeDefined();
    expect(match!.status).toBe("published");
  });
});
