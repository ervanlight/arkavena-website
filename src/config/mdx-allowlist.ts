// =========================================
// ARKAVENA — MDX Component Allowlist (data only)
// =========================================
// Kept free of React imports so validation scripts can read it in plain Node.
// The actual component mapping lives in components/content/mdx-components.tsx.

export const ALLOWED_MDX_COMPONENTS = [
  "Callout",
  "Checklist",
  "CostTable",
  "ProcessSteps",
  "RiskMatrix",
  "FAQList",
  "ProjectGallery",
  "BeforeAfter",
  "SourceNote",
  "RelatedContent",
  "CTA",
] as const;

export type AllowedMdxComponent = (typeof ALLOWED_MDX_COMPONENTS)[number];
