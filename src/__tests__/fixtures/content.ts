// Shared test fixtures. These describe imaginary content used only to exercise
// the content engine — they are never written to /content and never published.

import {
  collectionForType,
  routeForContent,
  type ContentType,
} from "@/config/collections";
import type { ContentItem, DerivedFields } from "@/schemas/content-types";

type Raw = Record<string, unknown>;

export function baseFrontmatter(overrides: Raw = {}): Raw {
  return {
    schemaVersion: 1,
    id: "svc-fixture",
    type: "service",
    status: "draft",
    title: "Fixture Layanan",
    slug: "fixture-layanan",
    description:
      "Deskripsi fixture untuk pengujian schema dengan panjang yang memenuhi batas minimum karakter.",
    excerpt: "Ringkasan fixture.",
    seoTitle: null,
    primaryKeyword: null,
    secondaryKeywords: [],
    searchIntent: "transactional",
    cluster: "contoh-cluster",
    tags: ["contoh-tag", "scaffold"],
    publishedAt: null,
    updatedAt: null,
    lastReviewedAt: null,
    author: "arkavena-editorial",
    reviewedBy: null,
    hero: {
      eyebrow: "Fixture",
      heading: "Fixture Heading",
      summary: "Ringkasan hero fixture.",
      image: "/images/placeholders/hero.png",
      imageAlt: "Gambar placeholder untuk fixture pengujian",
    },
    relationships: {
      services: [],
      sectors: [],
      locations: [],
      guides: [],
      projects: [],
      pinnedRelated: [],
      excludedRelated: [],
    },
    conversion: {
      goal: "consultation",
      primaryCta: {
        label: "Konsultasikan Proyek",
        href: "/kontak",
        whatsappMessage: null,
      },
      secondaryCta: null,
    },
    faq: [],
    sources: [],
    ownerVerified: false,
    service: {
      serviceType: "Fixture service",
      audience: [],
      deliverables: [],
      areaServed: [],
      pricingMode: "consultation",
    },
    ...overrides,
  };
}

export function publishedFrontmatter(overrides: Raw = {}): Raw {
  return baseFrontmatter({
    status: "published",
    primaryKeyword: "fixture keyword",
    publishedAt: "2026-01-01",
    updatedAt: "2026-01-02",
    lastReviewedAt: "2026-01-02",
    ownerVerified: true,
    ...overrides,
  });
}

export function guideFrontmatter(overrides: Raw = {}): Raw {
  const { service: _service, ...rest } = baseFrontmatter();
  void _service;
  return {
    ...rest,
    id: "guide-fixture",
    type: "guide",
    slug: "fixture-panduan",
    title: "Fixture Panduan",
    searchIntent: "informational",
    article: {
      articleType: "explainer",
      pillar: null,
      dataAsOf: null,
      answerFirst: true,
      hasCalculator: false,
    },
    ...overrides,
  };
}

export function locationFrontmatter(overrides: Raw = {}): Raw {
  const { service: _service, ...rest } = baseFrontmatter();
  void _service;
  return {
    ...rest,
    id: "loc-fixture",
    type: "location",
    slug: "fixture-wilayah",
    title: "Fixture Wilayah",
    location: {
      city: "Fixture City",
      province: "Fixture Province",
      country: "Indonesia",
      areaServedLabel: "Fixture City dan sekitarnya",
      localChallenges: [],
      logisticsNotes: [],
      localProjectRefs: [],
      localFactsVerified: false,
    },
    ...overrides,
  };
}

export function projectFrontmatter(overrides: Raw = {}): Raw {
  const { service: _service, ...rest } = baseFrontmatter();
  void _service;
  return {
    ...rest,
    id: "project-fixture",
    type: "project",
    slug: "fixture-proyek",
    title: "Fixture Proyek",
    project: {
      projectName: "Fixture internal name",
      disclosureName: "Proyek anonim untuk pengujian",
      location: "Fixture City",
      sector: null,
      services: [],
      year: 2025,
      status: "completed",
      areaM2: null,
      budgetDisclosure: "confidential",
      clientPermission: false,
      factsVerified: false,
      outcomes: [],
    },
    ...overrides,
  };
}

export function landingFrontmatter(overrides: Raw = {}): Raw {
  const { service: _service, ...rest } = baseFrontmatter();
  void _service;
  return {
    ...rest,
    id: "lp-fixture",
    type: "landing",
    slug: "fixture-landing",
    title: "Fixture Landing",
    landing: {
      campaign: "fixture-campaign",
      organicEquivalent: null,
      index: false,
      follow: true,
      showGlobalNavigation: false,
      thankYouPath: "/terima-kasih",
    },
    ...overrides,
  };
}

/** Attach the derived half so fixtures can stand in for a manifest entry. */
export function asContentItem(
  frontmatter: Raw,
  derived: Partial<DerivedFields> = {}
): ContentItem {
  const type = frontmatter.type as ContentType;
  const slug = frontmatter.slug as string;
  const route = routeForContent(type, slug);
  const status = frontmatter.status as string;
  const ownerVerified = frontmatter.ownerVerified as boolean;
  const collection = collectionForType(type).dir;

  return {
    ...(frontmatter as unknown as ContentItem),
    collection,
    route,
    sourcePath: `content/${collection}/${slug}.mdx`,
    breadcrumb: [
      { name: "Beranda", path: "/" },
      { name: frontmatter.title as string, path: route },
    ],
    wordCount: 200,
    readingMinutes: 1,
    internalLinks: [],
    isIndexable: status === "published" && ownerVerified,
    isFollowable: status !== "archived",
    ...derived,
  };
}
