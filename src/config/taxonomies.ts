// =========================================
// ARKAVENA — Controlled Taxonomies
// =========================================
// Tags and clusters are a controlled vocabulary, not free text.
// ARCHITECTURE.md §8.2: every page needs at least two controlled tags.

export const SEARCH_INTENTS = [
  "informational",
  "commercial",
  "transactional",
  "navigational",
] as const;

export type SearchIntent = (typeof SEARCH_INTENTS)[number];

export const CONVERSION_GOALS = [
  "consultation",
  "assessment",
  "contact",
  "download",
  "quote",
] as const;

export type ConversionGoal = (typeof CONVERSION_GOALS)[number];

export const CONTENT_STATUSES = [
  "draft",
  "review",
  "published",
  "archived",
] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

/**
 * Topic clusters. A cluster groups a pillar page with its supporting content
 * and drives the +20 same-cluster relationship score (ARCHITECTURE.md §11.2).
 */
export const CLUSTERS = [
  "bangun-rumah",
  "renovasi",
  "bangunan-komersial",
  "manajemen-risiko",
  "building-maintenance",
  "design-koordinasi",
  "korporat",
  "wilayah",
  "proyek",
  // Reserved for scaffold fixtures and dummy drafts only.
  "contoh-cluster",
] as const;

export type Cluster = (typeof CLUSTERS)[number];

/** Controlled tag vocabulary. Extend deliberately — not per article. */
export const TAGS = [
  "biaya",
  "perencanaan",
  "pelaksanaan",
  "pengawasan",
  "kontrak",
  "material",
  "struktur",
  "arsitektur",
  "mep",
  "finishing",
  "perizinan",
  "jadwal",
  "mutu",
  "risiko",
  "dokumentasi",
  "perawatan",
  "renovasi",
  "komersial",
  "residensial",
  "industri",
  "institusi",
  "surabaya",
  "sidoarjo",
  "gresik",
  // Reserved for scaffold fixtures and dummy drafts only.
  "contoh-tag",
  "scaffold",
] as const;

export type Tag = (typeof TAGS)[number];

export const ARTICLE_TYPES = [
  "explainer",
  "cost",
  "comparison",
  "checklist",
  "process",
  "pillar",
] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

export const PRICING_MODES = ["consultation", "quote", "fixed"] as const;
export type PricingMode = (typeof PRICING_MODES)[number];

export const PROJECT_STATUSES = [
  "planned",
  "ongoing",
  "completed",
  "maintained",
] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const BUDGET_DISCLOSURES = ["confidential", "range", "exact"] as const;
export type BudgetDisclosure = (typeof BUDGET_DISCLOSURES)[number];
