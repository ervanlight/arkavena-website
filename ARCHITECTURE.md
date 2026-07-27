# ARCHITECTURE.md — Arkavena SEO Content Architecture

**Status:** Implementation contract  
**Version:** 1.0  
**Date:** 2026-07-26  
**Primary domain:** `https://arkavena.com`  
**Previous domain:** `https://manajemenkonstruksi.id`  
**Implementation owner:** Claude Code  
**Business reviewer:** Owner Arkavena  
**Fixed stack:** Next.js App Router, GitHub, Vercel

---

## 1. Purpose

This document is the binding architecture and execution contract for building Arkavena’s website. Claude Code must follow it unless the owner explicitly approves an amendment to this file.

The system must:

1. Support at least 132 fixed, indexable pages without turning the repository into an unmaintainable collection of hand-coded routes.
2. Keep every page easy to locate and edit by filename.
3. Separate content, presentation, SEO metadata, structured data, and internal-linking logic.
4. Build all public content statically where possible.
5. prevent duplicate, thin, doorway-like, or unsupported location pages.
6. Preserve relevant SEO signals from `manajemenkonstruksi.id`.
7. Allow work to be delivered in reviewable batches through Git branches and Vercel Preview Deployments.
8. Make claims, project details, prices, locations, and credentials publishable only after owner verification.

---

## 2. Non-goals

The first implementation phase must not introduce:

- A headless CMS.
- A database-backed page editor.
- A generic catch-all route for every public URL.
- A service-by-city page matrix.
- Automatically invented portfolio projects, testimonials, prices, credentials, or local facts.
- Automatically generated mass content published without human review.
- Multiple competing content hubs such as separate `/blog` and `/knowledge` sections.
- Indexable Google Ads landing pages that duplicate organic pages.
- Separate `LocalBusiness` entities for cities where Arkavena does not operate a verified physical branch.

---

## 3. Final architectural decisions

| Area | Final decision |
|---|---|
| Routing | Use explicit collection routes: `/layanan`, `/sektor`, `/wilayah`, `/panduan`, `/proyek`. |
| Content storage | One local MDX file per page, grouped by typed collection. |
| Rendering | Collection-specific templates and dynamic routes, pre-rendered with `generateStaticParams`. |
| Frontmatter | YAML frontmatter validated with Zod during build. |
| MDX integration | Use the official Next.js MDX pipeline with a generated content manifest; do not depend on an archived remote-MDX content layer. |
| Public language | Indonesian. |
| Blog/knowledge | Merge into one authority hub at `/panduan`. |
| Industry pages | Rename the information architecture concept to **Sektor/Jenis Bangunan**. |
| Location pages | Publish only one East Java hub and seven city pages initially. |
| City-service combinations | Not part of the initial architecture. Add only when a city has adequate unique evidence and search demand. |
| Ads pages | Store under `/lp/[slug]`; default `noindex,follow`; exclude from sitemap. |
| Structured data | Generate from page type and verified business data; do not let editors freely choose arbitrary schema types. |
| Internal linking | Taxonomy-driven related modules plus optional pinned links. |
| Portfolio | Detail pages are data-dependent and may only be published from real, owner-verified projects. |
| Deployment | Pull request → Vercel Preview → owner review → merge to `main` → production. |
| Migration | One-to-one old-to-new URL mapping with permanent server-side redirects. |

Next.js currently provides first-party support for local MDX, dynamic metadata, static parameter generation, and metadata files such as `sitemap.ts` and `robots.ts`. Vercel’s Git integration creates preview deployments from branch pushes and production deployments from the production branch. citeturn281882search1turn281882search7turn281882search12turn281882search24turn281882search6

---

## 4. Evaluation of the baseline

| Baseline proposal | Decision | Required change |
|---|---|---|
| Homepage, About, Portfolio, Blog, Contact | Partially accepted | Replace separate Blog/Knowledge concepts with one `/panduan` hub. |
| Services, Industry, Location, Knowledge clusters | Accepted with revised naming | Use `/layanan`, `/sektor`, `/wilayah`, `/panduan`. |
| MDX frontmatter under `/content` | Accepted and strengthened | Split into typed collections, validate with Zod, and generate a manifest and link graph during build. |
| One dynamic template for all content | Rejected | Use a template per collection to preserve page intent, schema correctness, and editing predictability. |
| Money pages first | Accepted with prerequisites | Business identity, design system, analytics hooks, project proof, and content validation must exist before mass publication. |
| Location pages with unique copy | Accepted as a hard gate | A city page cannot be published merely by replacing the city name. |
| Service × location expansion | Deferred | This creates a high doorway/duplication risk unless each page has real local proof and materially different user value. |
| Ads landing pages after organic pages | Accepted | Store separately under `/lp`, default to `noindex,follow`, and exclude from sitemap. |
| 20–30 articles for one topic immediately | Revised | Publish in controlled clusters and only after each page has a distinct keyword owner and editorial brief. |
| Rebrand from old domain | Missing from baseline | Add a complete migration workstream, redirect map, Search Console Change of Address, and monitoring. |
| Project/case-study system | Underdeveloped | Add a dedicated project model because proof is central to conversion and local-page credibility. |

Google’s spam policies explicitly cover doorway abuse and scaled content abuse involving many similar or unoriginal pages created primarily to manipulate rankings. Therefore, city pages and future city-service pages must be gated by unique evidence and genuine user value rather than templated substitution. citeturn709739search1

---

## 5. URL architecture and keyword ownership

### 5.1 Final top-level routes

```text
/
├── tentang
├── mengapa-arkavena
├── cara-kerja
├── layanan
│   └── [slug]
├── sektor
│   └── [slug]
├── wilayah
│   └── [slug]
├── panduan
│   └── [slug]
├── proyek
│   └── [slug]
├── faq
├── kontak
├── konsultasi-proyek
└── lp
    └── [slug]
```

### 5.2 Intent ownership

| Collection | Primary search intent | Example query ownership |
|---|---|---|
| `/layanan/[slug]` | Transactional/commercial | “jasa manajemen konstruksi”, “jasa bangun rumah” |
| `/sektor/[slug]` | Transactional by building type | “kontraktor gudang”, “jasa bangun klinik” |
| `/wilayah/[slug]` | Local commercial | “kontraktor Surabaya”, “kontraktor Sidoarjo” |
| `/panduan/[slug]` | Informational/commercial investigation | “biaya bangun gudang”, “cara membaca kurva S” |
| `/proyek/[slug]` | Proof/case-study | Branded, sector, location, and project-specific discovery |
| `/lp/[slug]` | Paid acquisition | Campaign-specific conversion intent; not an organic SEO target |

### 5.3 Cannibalization rules

1. Each indexable URL must own exactly one `primaryKeyword`.
2. No two published pages may share the same normalized `primaryKeyword`.
3. A service page owns the transactional head term.
4. A sector page owns the building-type transaction term.
5. A location page owns the broad city transaction term.
6. A guide page owns the informational or comparison query.
7. “Biaya” content belongs under `/panduan`, not under `/layanan`.
8. No initial page may target “jasa [service] [city]” as a separate URL.
9. When two drafts overlap, consolidate them before publication rather than relying on canonical tags to solve weak planning.
10. Redirect retired or merged pages to the closest relevant replacement, never indiscriminately to the homepage.

---

## 6. Repository structure

```text
arkavena/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── tentang/page.tsx
│   │   ├── mengapa-arkavena/page.tsx
│   │   ├── cara-kerja/page.tsx
│   │   ├── layanan/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── sektor/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── wilayah/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── panduan/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── proyek/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── kontak/page.tsx
│   │   ├── konsultasi-proyek/page.tsx
│   │   └── lp/[slug]/page.tsx
│   ├── api/
│   │   └── lead/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   ├── opengraph-image.tsx
│   └── not-found.tsx
├── content/
│   ├── pages/
│   ├── services/
│   ├── sectors/
│   ├── locations/
│   ├── guides/
│   ├── projects/
│   └── landing/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── forms/
│   ├── seo/
│   └── content/
│       ├── templates/
│       │   ├── ServiceTemplate.tsx
│       │   ├── SectorTemplate.tsx
│       │   ├── LocationTemplate.tsx
│       │   ├── GuideTemplate.tsx
│       │   ├── ProjectTemplate.tsx
│       │   └── LandingTemplate.tsx
│       └── blocks/
│           ├── Callout.tsx
│           ├── Checklist.tsx
│           ├── CostTable.tsx
│           ├── ProcessSteps.tsx
│           ├── RiskMatrix.tsx
│           ├── FAQList.tsx
│           ├── ProjectGallery.tsx
│           ├── RelatedContent.tsx
│           └── CTA.tsx
├── config/
│   ├── site.ts
│   ├── business.ts
│   ├── navigation.ts
│   ├── taxonomies.ts
│   ├── redirects.ts
│   └── collections.ts
├── lib/
│   ├── content/
│   │   ├── loaders.ts
│   │   ├── manifest.ts
│   │   ├── queries.ts
│   │   ├── validators.ts
│   │   ├── relationships.ts
│   │   └── link-graph.ts
│   └── seo/
│       ├── metadata.ts
│       ├── canonical.ts
│       ├── jsonld.ts
│       └── schema-builders.ts
├── schemas/
│   ├── frontmatter.ts
│   └── content-types.ts
├── scripts/
│   ├── generate-content-manifest.ts
│   ├── validate-content.ts
│   ├── validate-links.ts
│   ├── generate-redirect-report.ts
│   └── audit-indexability.ts
├── generated/
│   ├── content-manifest.generated.ts
│   └── link-graph.generated.json
├── public/
│   ├── images/
│   │   ├── brand/
│   │   ├── services/
│   │   ├── sectors/
│   │   ├── locations/
│   │   ├── guides/
│   │   └── projects/
│   └── downloads/
├── tests/
│   ├── content.test.ts
│   ├── metadata.test.ts
│   ├── schema.test.ts
│   └── redirects.test.ts
├── ARCHITECTURE.md
├── CLAUDE.md
├── package.json
└── next.config.ts
```

### 6.1 Naming contract

- MDX filename must equal the slug: `bangun-rumah.mdx`.
- Content IDs are immutable and namespaced:
  - `page-*`
  - `svc-*`
  - `sec-*`
  - `loc-*`
  - `guide-*`
  - `project-*`
  - `lp-*`
- Public slugs use lowercase kebab-case.
- Do not use dates in guide URLs.
- Do not use `.html`.
- Renaming a published slug requires:
  1. redirect entry,
  2. internal-link update,
  3. sitemap update through the manifest,
  4. redirect test.

---

## 7. Content build pipeline

```text
MDX files
  ↓
frontmatter parser
  ↓
Zod validation
  ↓
content manifest generation
  ↓
duplicate ID/slug/keyword checks
  ↓
link-graph generation
  ↓
generateStaticParams
  ↓
collection template
  ↓
generateMetadata + JSON-LD
  ↓
static HTML
  ↓
sitemap/robots
  ↓
Vercel Preview/Production
```

### 7.1 Required scripts

```json
{
  "scripts": {
    "predev": "tsx scripts/generate-content-manifest.ts",
    "dev": "next dev",
    "content:manifest": "tsx scripts/generate-content-manifest.ts",
    "content:validate": "tsx scripts/validate-content.ts",
    "content:links": "tsx scripts/validate-links.ts",
    "content:audit": "tsx scripts/audit-indexability.ts",
    "typecheck": "tsc --noEmit",
    "lint": "next lint",
    "prebuild": "npm run content:manifest && npm run content:validate && npm run content:links",
    "build": "next build",
    "test": "vitest run"
  }
}
```

### 7.2 Build must fail when

- A required frontmatter field is absent.
- An ID, slug, canonical path, or primary keyword is duplicated.
- A published page references a missing content ID.
- A published page is orphaned.
- A location page lacks owner verification.
- A project page lacks owner verification.
- A page marked `index: false` appears in the sitemap.
- A draft appears in production navigation or the sitemap.
- A schema type conflicts with the collection.
- An image path or required image alt text is missing.
- An internal link points to a draft, nonexistent page, or old domain.
- A redirect chain is created.
- A published cost article lacks `dataAsOf`.

---

## 8. Content model

## 8.1 Design principle

Editors should manage content and business facts. The application should generate technical details.

### Editor-managed fields

- title
- description
- keyword and intent
- cluster/taxonomy
- publication status and dates
- hero content
- relationship IDs
- CTA
- FAQs
- sources
- page-type-specific business information

### Generated fields

- route and absolute URL
- canonical URL
- breadcrumb trail
- title suffix
- Open Graph URL
- schema graph IDs
- sitemap entry
- reading time
- table of contents
- related-content modules
- robots defaults
- `dateModified` fallback
- JSON-LD wrapper

This separation prevents editors from accidentally creating contradictory canonicals, schema entities, breadcrumb paths, or sitemap URLs.

---

## 8.2 Base frontmatter schema

```yaml
---
schemaVersion: 1

id: svc-bangun-rumah
type: service
status: published

title: "Jasa Bangun Rumah dengan Pengendalian Biaya dan Risiko"
slug: bangun-rumah
description: "Jasa bangun rumah Arkavena untuk perencanaan, pelaksanaan, pengendalian biaya, mutu, dan jadwal proyek di Jawa Timur."
excerpt: "Bangun rumah dengan proses terukur, transparan, dan dikendalikan dari tahap perencanaan hingga serah terima."

seoTitle: "Jasa Bangun Rumah Jawa Timur | Arkavena" # optional override
primaryKeyword: jasa bangun rumah
secondaryKeywords:
  - kontraktor rumah
  - jasa kontraktor rumah
searchIntent: transactional

cluster: bangun-rumah
tags:
  - konstruksi-rumah
  - pengendalian-biaya
  - manajemen-risiko

publishedAt: "2026-08-15"
updatedAt: "2026-08-15"
lastReviewedAt: "2026-08-15"
author: arkavena-editorial
reviewedBy: arkavena-technical

hero:
  eyebrow: "Bangun Rumah"
  heading: "Rumah Dibangun dengan Sistem, Bukan Sekadar Dikerjakan"
  summary: "Arkavena menggabungkan pelaksanaan konstruksi dengan pengendalian biaya, mutu, jadwal, dan risiko."
  image: "/images/services/bangun-rumah/hero.webp"
  imageAlt: "Tim konstruksi Arkavena mengawasi pembangunan rumah"

relationships:
  services: []
  sectors:
    - sec-rumah-tinggal
  locations:
    - loc-jawa-timur
    - loc-surabaya
    - loc-sidoarjo
  guides:
    - guide-biaya-bangun-rumah-per-meter
    - guide-tahapan-bangun-rumah-dari-nol
  projects: []
  pinnedRelated: []
  excludedRelated: []

conversion:
  goal: consultation
  primaryCta:
    label: "Konsultasikan Proyek"
    href: "/konsultasi-proyek"
    whatsappMessage: "Halo Arkavena, saya ingin berkonsultasi tentang rencana bangun rumah."
  secondaryCta:
    label: "Lihat Cara Kerja"
    href: "/cara-kerja"

faq:
  - question: "Apa saja ruang lingkup jasa bangun rumah Arkavena?"
    answer: "Ruang lingkup disesuaikan dengan kontrak dan dapat mencakup perencanaan, estimasi, pelaksanaan, pengendalian biaya, pengawasan mutu, pengendalian jadwal, dan serah terima."

sources: []
ownerVerified: true
---
```

### 8.3 Base-field requirements

| Field | Required | Notes |
|---|---:|---|
| `schemaVersion` | Yes | Begin at `1`; migration required before changing. |
| `id` | Yes | Immutable unique ID. |
| `type` | Yes | Must match its collection. |
| `status` | Yes | `draft`, `review`, `published`, `archived`. |
| `title` | Yes | Human-facing page title. |
| `slug` | Yes | Must match filename. |
| `description` | Yes | Search snippet candidate; concise and page-specific. |
| `excerpt` | Yes | Used in cards and related modules. |
| `seoTitle` | No | Only when default title composition is unsuitable. |
| `primaryKeyword` | Yes for indexable pages | Unique across all published pages. |
| `secondaryKeywords` | Yes | May be an empty array. |
| `searchIntent` | Yes | `transactional`, `commercial`, `informational`, `navigational`. |
| `cluster` | Yes | Must exist in taxonomy config. |
| `tags` | Yes | Minimum two controlled terms. |
| publication dates | Yes | ISO date format. |
| `author` | Yes | Must resolve to an author entity. |
| `reviewedBy` | Yes for technical/cost claims | Must resolve to reviewer entity. |
| `hero` | Yes | Image and alt text required. |
| `relationships` | Yes | Arrays may be empty, but IDs must resolve. |
| `conversion` | Yes | Each page must have one primary conversion goal. |
| `faq` | No | Questions must be visible when present. |
| `sources` | Conditional | Required for external facts, regulations, benchmark figures, and cost data. |
| `ownerVerified` | Yes | Must be `true` before publication. |

---

## 8.4 Collection extensions

### Service extension

```yaml
service:
  serviceType: "Jasa Bangun Rumah"
  audience:
    - pemilik-rumah
    - investor-properti
  deliverables:
    - "Rencana kerja dan lingkup proyek"
    - "RAB atau kontrol anggaran sesuai kontrak"
    - "Laporan progres"
  areaServed:
    - "Jawa Timur"
  pricingMode: consultation
```

Required:

- `service.serviceType`
- `service.audience`
- `service.deliverables`
- `service.areaServed`
- `service.pricingMode`

### Sector extension

```yaml
sector:
  buildingType: "Gudang"
  primaryUseCases:
    - distribusi
    - penyimpanan
    - produksi-ringan
  commonRisks:
    - "Ketidaksesuaian kapasitas lantai"
    - "Alur kendaraan dan bongkar muat"
    - "Koordinasi utilitas dan fire safety"
  relevantServices:
    - svc-bangun-bangunan-komersial
    - svc-design-and-build
    - svc-manajemen-konstruksi
```

### Location extension

```yaml
location:
  city: "Surabaya"
  province: "Jawa Timur"
  country: "Indonesia"
  areaServedLabel: "Surabaya dan area sekitarnya"
  localChallenges:
    - claim: "Tantangan lokal yang telah diverifikasi"
      verification: owner
  logisticsNotes:
    - "Catatan akses, mobilisasi, atau operasional yang benar-benar relevan"
  localProjectRefs:
    - project-contoh-yang-benar-benar-ada
  localFactsVerified: true
```

Publication gate:

- `localFactsVerified` must be `true`.
- At least three materially unique local considerations.
- At least one local project reference **or** a documented operational reason that makes the page useful without a project.
- No copied paragraph from another city page.
- No unsupported claims about soil, flooding, permits, labor, logistics, or pricing.

### Guide extension

```yaml
article:
  articleType: cost-guide
  pillar: guide-tahapan-bangun-rumah-dari-nol
  dataAsOf: "2026-08-01"
  answerFirst: true
  hasCalculator: false
```

`articleType` values:

- `pillar`
- `cost-guide`
- `how-to`
- `checklist`
- `comparison`
- `explainer`
- `risk-guide`

### Project extension

```yaml
project:
  projectName: "Nama proyek yang disetujui"
  disclosureName: "Nama publik atau deskripsi anonim"
  location: "Surabaya"
  sector: sec-gudang
  services:
    - svc-manajemen-konstruksi
    - svc-pengawasan-proyek
  year: 2026
  status: completed
  areaM2: null
  budgetDisclosure: confidential
  clientPermission: true
  factsVerified: true
  outcomes:
    - label: "Hasil terverifikasi"
      value: "Deskripsi tanpa angka yang dibuat-buat"
```

A project page must not be created until the owner supplies or verifies:

- scope,
- location,
- year,
- project type,
- images and publication rights,
- measurable outcomes or an approved qualitative outcome,
- client-name disclosure permission,
- testimonial permission when applicable.

### Landing-page extension

```yaml
landing:
  campaign: "google-ads-bangun-rumah-surabaya"
  organicEquivalent: svc-bangun-rumah
  index: false
  follow: true
  showGlobalNavigation: false
  thankYouPath: "/terima-kasih"
```

All `/lp/*` pages are excluded from the sitemap and default to `noindex,follow`.

---

## 9. Page templates and content requirements

## 9.1 Service template

Required visible sections:

1. Hero and outcome proposition.
2. Customer problem and project risk.
3. Scope of work.
4. Arkavena control system:
   - cost,
   - cashflow,
   - schedule,
   - quality,
   - risk.
5. Process from consultation to handover.
6. Deliverables.
7. Suitable and unsuitable project profiles.
8. Relevant sectors.
9. Relevant projects.
10. Relevant guides.
11. FAQ.
12. Conversion CTA.

Editorial range: approximately 900–1,600 words, depending on complexity.

## 9.2 Sector template

Required visible sections:

1. Sector-specific objective.
2. Typical project use cases.
3. Main technical and commercial risks.
4. Scope and relevant services.
5. Design, structure, MEP, logistics, or operational considerations.
6. Arkavena’s control approach.
7. Relevant projects.
8. Related guides.
9. CTA.

## 9.3 Location template

Required visible sections:

1. City-specific opening written from verified facts.
2. Exact service coverage statement.
3. Locally relevant project types.
4. Verified local risks or operational considerations.
5. Logistics/mobilization notes.
6. Arkavena services available in the area.
7. Local or nearest relevant project proof.
8. Unique local FAQ.
9. CTA with city-specific WhatsApp prefill.

Location pages must not be generated by replacing only the city name. Pages created primarily for similar local queries without distinct value can resemble doorway or scaled-content abuse. citeturn709739search1

## 9.4 Guide template

Required visible sections:

1. Answer-first summary.
2. Table of contents.
3. Clear definition or decision context.
4. Main explanation.
5. Example, checklist, table, or calculation where appropriate.
6. Risks and limitations.
7. “When to involve a professional” section.
8. Sources and data date when relevant.
9. Related service.
10. Related sibling guides.
11. CTA.

## 9.5 Project template

Required visible sections:

1. Verified project overview.
2. Initial challenge.
3. Arkavena scope.
4. Risk and control approach.
5. Execution process.
6. Outcomes.
7. Image gallery.
8. Related service, sector, and location.
9. CTA.

## 9.6 MDX component allowlist

Only approved components may be used in MDX:

- `Callout`
- `Checklist`
- `CostTable`
- `ProcessSteps`
- `RiskMatrix`
- `FAQList`
- `ProjectGallery`
- `BeforeAfter`
- `SourceNote`
- `RelatedContent`
- `CTA`

Prohibited without architecture approval:

- arbitrary `<script>` tags,
- inline JavaScript,
- inline CSS,
- direct data fetching,
- unapproved client components,
- iframe embeds,
- manually authored JSON-LD.

---

## 10. Fixed indexable page inventory

The committed fixed inventory contains **132 indexable pages**:

- 12 corporate and hub pages
- 20 service pages
- 14 sector pages
- 8 location pages
- 78 guide pages

Project-detail pages are additional and data-dependent.

### Priority definitions

- **P0:** Launch blocker.
- **P1:** Direct revenue and proof.
- **P2:** Sector and local demand.
- **P3:** High-intent informational demand.
- **P4:** Supporting authority.
- **P5:** Expansion and long-tail coverage.

---

## 10.1 Corporate and hub pages — 12

| Priority | Slug | Page |
|---|---|---|
| P0 | `/` | Homepage |
| P0 | `/tentang` | Tentang Arkavena |
| P0 | `/mengapa-arkavena` | Positioning and differentiation |
| P0 | `/cara-kerja` | Delivery and control process |
| P0 | `/kontak` | Contact |
| P0 | `/konsultasi-proyek` | Consultation conversion page |
| P1 | `/layanan` | Services hub |
| P1 | `/proyek` | Project/case-study hub |
| P2 | `/sektor` | Building-sector hub |
| P2 | `/wilayah` | Service-area hub |
| P2 | `/faq` | General FAQ |
| P3 | `/panduan` | Knowledge hub |

Utility pages not included in the 132-page index target:

- `/kebijakan-privasi`
- `/syarat-ketentuan`
- `/terima-kasih`
- `/lp/*`

---

## 10.2 Service pages — 20

### P1: primary revenue services

1. `/layanan/bangun-rumah`
2. `/layanan/renovasi-rumah`
3. `/layanan/bangun-bangunan-komersial`
4. `/layanan/design-and-build`
5. `/layanan/building-maintenance`
6. `/layanan/manajemen-konstruksi`
7. `/layanan/pengawasan-proyek`
8. `/layanan/owner-representative`
9. `/layanan/value-engineering`
10. `/layanan/pengendalian-biaya-proyek`

### P2: supporting and specialist services

11. `/layanan/renovasi-bangunan-komersial`
12. `/layanan/interior-fit-out`
13. `/layanan/preventive-maintenance-bangunan`
14. `/layanan/corrective-maintenance-bangunan`
15. `/layanan/pengendalian-cashflow-proyek`
16. `/layanan/audit-biaya-proyek`
17. `/layanan/penyusunan-rab`
18. `/layanan/estimasi-biaya-konstruksi`
19. `/layanan/quality-control-konstruksi`
20. `/layanan/pengendalian-jadwal-proyek`

---

## 10.3 Sector pages — 14

### P1: highest commercial relevance

1. `/sektor/rumah-tinggal`
2. `/sektor/ruko`
3. `/sektor/gudang`
4. `/sektor/pabrik`
5. `/sektor/kantor`
6. `/sektor/kos`

### P2: expansion sectors

7. `/sektor/cafe`
8. `/sektor/restoran`
9. `/sektor/sekolah`
10. `/sektor/masjid`
11. `/sektor/klinik`
12. `/sektor/hotel`
13. `/sektor/villa`
14. `/sektor/showroom-retail`

---

## 10.4 Location pages — 8

### P1

1. `/wilayah/jawa-timur`
2. `/wilayah/surabaya`
3. `/wilayah/sidoarjo`
4. `/wilayah/gresik`

### P2

5. `/wilayah/mojokerto`
6. `/wilayah/pasuruan`
7. `/wilayah/malang`
8. `/wilayah/lamongan`

The location page title may use “Kontraktor Surabaya”, but the slug remains the simpler, stable `/wilayah/surabaya`.

---

## 10.5 Guide cluster: Bangun Rumah — 18

### P3

1. `/panduan/biaya-bangun-rumah-per-meter`
2. `/panduan/cara-menghitung-biaya-bangun-rumah`
3. `/panduan/tahapan-bangun-rumah-dari-nol`
4. `/panduan/checklist-persiapan-bangun-rumah`
5. `/panduan/cara-memilih-kontraktor-rumah`
6. `/panduan/kontrak-kerja-konstruksi-rumah`
7. `/panduan/borongan-vs-harian-bangun-rumah`
8. `/panduan/kontraktor-vs-tukang`
9. `/panduan/cara-membaca-rab-rumah`

### P4

10. `/panduan/komponen-rab-rumah`
11. `/panduan/biaya-tak-terduga-bangun-rumah`
12. `/panduan/pondasi-rumah-sesuai-kondisi-tanah`
13. `/panduan/struktur-rumah-satu-lantai`
14. `/panduan/struktur-rumah-dua-lantai`
15. `/panduan/jadwal-pembangunan-rumah`
16. `/panduan/serah-terima-proyek-rumah`
17. `/panduan/garansi-pekerjaan-konstruksi`
18. `/panduan/kesalahan-umum-saat-bangun-rumah`

---

## 10.6 Guide cluster: Renovasi — 14

### P3

1. `/panduan/biaya-renovasi-rumah`
2. `/panduan/cara-menghitung-anggaran-renovasi-rumah`
3. `/panduan/renovasi-total-vs-renovasi-sebagian`
4. `/panduan/checklist-survei-sebelum-renovasi`
5. `/panduan/renovasi-rumah-sambil-dihuni`
6. `/panduan/tanda-rumah-perlu-perkuatan-struktur`
7. `/panduan/renovasi-rumah-satu-jadi-dua-lantai`

### P4

8. `/panduan/memperkuat-struktur-rumah-lama`
9. `/panduan/renovasi-atap-bocor`
10. `/panduan/renovasi-dapur`
11. `/panduan/renovasi-kamar-mandi`
12. `/panduan/renovasi-fasad-rumah`
13. `/panduan/risiko-pembengkakan-biaya-renovasi`
14. `/panduan/cara-memilih-kontraktor-renovasi`

---

## 10.7 Guide cluster: Bangunan Komersial — 14

### P3

1. `/panduan/biaya-bangun-ruko`
2. `/panduan/biaya-bangun-gudang`
3. `/panduan/biaya-bangun-pabrik`
4. `/panduan/biaya-bangun-kantor`
5. `/panduan/biaya-bangun-kos`
6. `/panduan/biaya-bangun-cafe`
7. `/panduan/biaya-bangun-restoran`

### P4

8. `/panduan/biaya-bangun-klinik`
9. `/panduan/biaya-bangun-sekolah`
10. `/panduan/biaya-bangun-masjid`
11. `/panduan/tahapan-proyek-bangunan-komersial`
12. `/panduan/cara-memilih-kontraktor-bangunan-komersial`
13. `/panduan/perencanaan-utilitas-bangunan-komersial`
14. `/panduan/akses-logistik-proyek-gudang-dan-pabrik`

---

## 10.8 Guide cluster: Manajemen Risiko dan Pengendalian Proyek — 18

### P3

1. `/panduan/apa-itu-manajemen-konstruksi`
2. `/panduan/tugas-manajemen-konstruksi`
3. `/panduan/manajemen-konstruksi-vs-kontraktor`
4. `/panduan/apa-itu-pengawasan-proyek`
5. `/panduan/owner-representative-proyek-konstruksi`
6. `/panduan/apa-itu-value-engineering-konstruksi`
7. `/panduan/value-engineering-untuk-mengendalikan-biaya`
8. `/panduan/pengendalian-biaya-proyek`
9. `/panduan/pengendalian-cashflow-proyek`

### P4

10. `/panduan/cara-membuat-cashflow-proyek-konstruksi`
11. `/panduan/cara-membaca-kurva-s-proyek`
12. `/panduan/pengendalian-jadwal-proyek`
13. `/panduan/risiko-keterlambatan-proyek-konstruksi`
14. `/panduan/change-order-proyek-konstruksi`
15. `/panduan/audit-rab-proyek`
16. `/panduan/quality-control-konstruksi`
17. `/panduan/laporan-progress-proyek-konstruksi`
18. `/panduan/cara-mencegah-pembengkakan-biaya-proyek`

---

## 10.9 Guide cluster: Building Maintenance — 8

### P4

1. `/panduan/apa-itu-building-maintenance`
2. `/panduan/preventive-vs-corrective-maintenance`
3. `/panduan/jadwal-preventive-maintenance-bangunan`
4. `/panduan/checklist-inspeksi-gedung`
5. `/panduan/perawatan-atap-bangunan`
6. `/panduan/perawatan-fasad-bangunan`
7. `/panduan/perawatan-mep-bangunan`
8. `/panduan/kontrak-building-maintenance`

---

## 10.10 Guide cluster: Design, Coordination, and Documentation — 6

### P5

1. `/panduan/apa-itu-design-and-build`
2. `/panduan/keuntungan-design-and-build`
3. `/panduan/apa-itu-interior-fit-out`
4. `/panduan/shop-drawing-konstruksi`
5. `/panduan/gambar-kerja-vs-gambar-desain`
6. `/panduan/koordinasi-arsitektur-struktur-mep`

---

## 10.11 Initial paid landing pages — not indexable

1. `/lp/bangun-rumah-surabaya`
2. `/lp/renovasi-rumah-surabaya`
3. `/lp/manajemen-konstruksi`
4. `/lp/building-maintenance`

These are not counted in the 132-page organic inventory.

---

## 11. Internal-linking system

## 11.1 Principles

1. Internal linking is generated from entity relationships, not loose keyword matching.
2. Automatic modules handle most links.
3. Editors may pin or exclude relationships in frontmatter.
4. Automatic links are placed in visible modules, not injected unnaturally into sentence text.
5. Contextual inline links inside the MDX body remain optional but recommended for the most important explanations.
6. Every link must use the canonical route.
7. Breadcrumbs are generated from the route hierarchy.

Google uses crawlable links to discover pages and interpret relevance, so links must use normal anchor elements with descriptive anchor text. citeturn281882search21

## 11.2 Relationship score

```text
pinnedRelated                                      +100
same cluster                                        +20
candidate explicitly references current service    +14
shared service                                      +12
shared sector                                       +10
shared location                                      +8
article → relevant money page                        +8
money page → supporting article                      +7
project → service/sector/location                     +7
same search intent                                    +2
same page type only                                   +1
excludedRelated                                    -1000
self                                               -1000
draft/non-indexable                                -1000
```

Tie-breakers:

1. pinned order,
2. priority,
3. latest reviewed date,
4. alphabetical slug.

## 11.3 Module rules by page type

### Service page

- parent hub,
- 3–5 sector pages,
- 3–5 guide pages,
- 1–3 project pages,
- up to 4 location pages,
- one consultation CTA.

### Sector page

- 3–5 relevant services,
- 3–5 guides,
- 1–3 projects,
- up to 4 locations.

### Location page

- 4 primary services,
- 2–4 local or nearest verified projects,
- 2–3 sectors,
- 3 guides.

### Guide page

- pillar guide,
- 2–4 sibling guides,
- one primary service,
- one relevant sector or location,
- one consultation CTA.

### Project page

- involved services,
- sector,
- location,
- 2 guides explaining the project’s main risk or solution.

## 11.4 Orphan-page rules

Every published page except the homepage must have:

- at least two inbound internal links,
- at least three outbound internal links,
- a breadcrumb path,
- a link from its collection hub.

The build must produce:

```text
generated/link-graph.generated.json
```

The report must list:

- orphan pages,
- pages with only one inbound link,
- broken references,
- links to old-domain URLs,
- excessive duplicate anchors,
- circular redirects.

---

## 12. Technical SEO plan

## 12.1 Rendering

- Use App Router Server Components by default.
- Pre-render all published MDX pages at build time.
- Use `generateStaticParams` for every collection route.
- Avoid client-side rendering for primary content.
- Use Client Components only for forms, calculators, accordions, or interactions that require state.

Next.js supports statically generating dynamic routes through `generateStaticParams`. citeturn281882search1

## 12.2 Metadata

Use a shared `buildMetadata(contentItem)` utility called by each route’s `generateMetadata`.

Generated metadata must include:

- title,
- description,
- canonical,
- robots,
- Open Graph title,
- Open Graph description,
- Open Graph image,
- Twitter card,
- alternates only when a real language version exists.

Canonical rules:

1. Use absolute `https://arkavena.com/...` URLs.
2. Use a self-referential canonical on indexable pages.
3. Canonicalize UTM/query variants to the clean route.
4. Do not publish conflicting canonical targets.
5. Link internally only to canonical URLs.

Google recommends self-referential canonicals, consistent internal linking to canonical URLs, and canonical alignment with sitemap URLs. citeturn709739search3

## 12.3 Sitemap

Initial implementation:

```text
/app/sitemap.ts → https://arkavena.com/sitemap.xml
```

Include only:

- `status: published`,
- `index: true`,
- canonical production URLs.

Exclude:

- drafts,
- reviews,
- archived content,
- `/lp/*`,
- `/terima-kasih`,
- API routes,
- preview routes,
- parameter variants.

Each entry should provide:

- `url`,
- `lastModified`,
- `changeFrequency` only if meaningful,
- `priority` only as an internal hint, not as a ranking promise.

A single sitemap is sufficient for the initial 132-page inventory. The architecture may split sitemaps by collection when the site becomes materially larger. Next.js supports `sitemap.ts`, and sitemaps help search engines discover important and recently updated URLs. citeturn281882search7turn281882search40

## 12.4 Robots

Production `robots.ts`:

- allow public pages,
- disallow clearly non-public crawl paths such as internal previews and API utility endpoints,
- point to the sitemap.

Do not use `robots.txt` as the mechanism for removing a page from Google. Utility and campaign pages must use page-level `noindex`. Google states that `robots.txt` controls crawling rather than guaranteeing de-indexing. citeturn281882search0turn614918search26

## 12.5 Structured data

All JSON-LD must be generated through schema builders and must describe content visible on the page. Google recommends JSON-LD and requires structured data to represent the actual visible content; valid markup does not guarantee a rich result. citeturn614918search19

### Site entity graph

Use stable IDs:

```text
https://arkavena.com/#organization
https://arkavena.com/#website
https://arkavena.com/#business
```

### Homepage

Use:

- `WebSite`
- `Organization`
- `GeneralContractor` only after verified physical-business data is provided.

`GeneralContractor` is a Schema.org subtype of `HomeAndConstructionBusiness` and `LocalBusiness`. citeturn603219view0

### Service pages

Use:

- `Service`
- `provider` referencing the business entity
- `serviceType`
- `areaServed`
- optional `hasOfferCatalog` only when the visible page genuinely presents an offer catalog

Schema.org defines `provider` and `areaServed` for `Service`. citeturn332795view2turn332795view3

### Sector pages

Use:

- `Service`
- sector-specific `serviceType`
- provider entity
- `areaServed`

Do not create a fictitious organization for each sector.

### Location pages

Use:

- `WebPage`
- `Service`
- `areaServed` as the relevant city
- provider referencing Arkavena’s single verified business entity

Do not emit `LocalBusiness` for Surabaya, Sidoarjo, Gresik, and other cities unless Arkavena has separately verified physical branches there.

### Guide pages

Use:

- `Article`
- `BreadcrumbList`
- author and reviewer entities
- `datePublished`
- `dateModified`
- relevant image

### Project pages

Use:

- `Article` or `CreativeWork`
- `BreadcrumbList`
- project images
- linked service, sector, and location entities where appropriate

### FAQ content

FAQ sections remain useful for users and conversion. However, Google stopped showing FAQ rich results beginning May 7, 2026 and removed the FAQ rich-result documentation in June 2026. Therefore:

- render FAQs visibly,
- keep an optional `FAQPage` schema builder for semantic interoperability,
- set `enableFaqSchema: false` by default,
- do not treat FAQ schema as a Google rich-result tactic. citeturn332795view0

### Breadcrumbs

Use `BreadcrumbList` on all pages below the homepage. Google’s breadcrumb markup communicates a page’s position within site hierarchy. citeturn614918search3

## 12.6 Images and fonts

- Use `next/image`.
- Require dimensions or `fill` with a constrained aspect-ratio container.
- Prefer AVIF/WebP for photography.
- Keep original high-resolution project assets outside the served image folder when needed.
- Use descriptive filenames and alt text.
- Never use alt text as a keyword list.
- Use `next/font`.
- Preload only the main display/body font needed above the fold.

Next.js Image provides automatic image optimization and visual stability, while `next/font` optimizes font loading and removes external font requests. citeturn614918search5turn614918search1

## 12.7 Performance acceptance targets

Field targets at the 75th percentile:

- LCP ≤ 2.5 seconds
- INP ≤ 200 milliseconds
- CLS ≤ 0.1

These are the current Core Web Vitals thresholds. citeturn839979search0

Implementation rules:

- no autoplay hero video,
- no full-resolution image downloads above the fold,
- no unnecessary client-side JavaScript,
- lazy-load below-the-fold media,
- reserve image dimensions,
- keep third-party scripts consent-aware and delayed where possible.

---

## 13. Domain migration from ManajemenKonstruksi.id

This migration is a launch-critical workstream, not an optional cleanup task.

## 13.1 Required deliverables

1. Export every indexable old URL.
2. Export old sitemap URLs.
3. Collect top landing pages from analytics.
4. Collect linked pages from Search Console.
5. Create `migration/redirect-map.csv`:

```csv
old_url,new_url,reason,status,verified
https://manajemenkonstruksi.id/old-page,https://arkavena.com/new-page,closest-equivalent,301,true
```

6. Implement one-to-one `301` or `308` redirects.
7. Avoid redirect chains.
8. Do not redirect unrelated old URLs to the homepage.
9. Update canonical URLs, internal links, images, and sitemap references.
10. Verify old and new domain properties in Search Console.
11. Submit Change of Address.
12. Submit the new sitemap.
13. Monitor 404s, soft 404s, indexed counts, clicks, and impressions.
14. Keep redirects for at least one year; preferably retain valuable redirects longer.

Google recommends permanent server-side redirects, a URL-by-URL mapping, avoiding irrelevant homepage redirects, submitting Change of Address, and retaining redirects generally for at least one year. citeturn664593view0turn664593view2turn664593view3

## 13.2 Migration launch gate

Do not switch the old domain until:

- the new site has passed production QA,
- the redirect map is complete,
- all major old URLs have valid destinations,
- canonicals use Arkavena URLs,
- no production page is accidentally `noindex`,
- analytics and Search Console are ready,
- the owner approves launch.

---

## 14. Batch execution plan

Every batch must be delivered on its own branch and pull request.

Naming:

```text
feature/batch-00-foundation
content/batch-01-core
content/batch-02-services-p1
```

No direct push to `main`.

## Batch 00 — Foundation, old-site audit, and content engine

**Pages:** 0 production content pages  
**Dependencies:** GitHub repository, Vercel project, access to old site URL inventory  
**Work:**

- initialize Next.js App Router and TypeScript,
- establish design tokens and site shell,
- configure MDX,
- create Zod schemas,
- create manifest generator,
- create all collection routes and templates,
- create metadata and schema builders,
- create sitemap and robots,
- create validation scripts,
- create CI checks,
- create redirect map structure,
- create `CLAUDE.md`,
- deploy preview.

**Owner review:**

- route naming,
- navigation,
- brand direction,
- architecture,
- old URL inventory.

**Exit criteria:**

- one sample draft per collection renders,
- validation intentionally fails on malformed content,
- preview deployment works,
- no sample page is indexable.

---

## Batch 01 — Core corporate and hub pages

**Pages:** 12  
**Depends on:** Batch 00  
**Pages:**

- all 12 pages in Section 10.1.

**Owner review:**

- positioning,
- service language,
- CTA wording,
- business facts,
- mobile navigation,
- contact details.

**Exit criteria:**

- all pages pass content validation,
- no placeholder claims remain,
- consultation flow works,
- project hub is hidden from primary navigation if no verified project exists.

---

## Batch 02 — P1 service pages

**Pages:** 10  
**Depends on:** Batch 01  
**Pages:** first 10 service pages in Section 10.2.

**Owner review:**

- service scope,
- exclusions,
- deliverables,
- process,
- risk-control claims,
- CTA and WhatsApp prefill.

**Exit criteria:**

- each page has a unique transactional keyword,
- no unsupported pricing,
- related sectors and guides are mapped.

---

## Batch 03 — P2 specialist service pages

**Pages:** 10  
**Depends on:** Batch 02  
**Pages:** service pages 11–20.

**Owner review:**

- whether every specialist service is genuinely offered,
- terminology for RAB, cashflow, audit, QC, and schedule control,
- whether any page should remain draft.

**Exit criteria:**

- every offered service is operationally real,
- overlapping pages are consolidated,
- all service schema validates.

---

## Batch 04 — Sector pages

**Pages:** 14  
**Depends on:** Batches 02–03  
**Work:**

- create all sector pages,
- map each sector to services,
- add sector-specific risks,
- add relevant project placeholders only by ID, never invented content.

**Owner review:**

- sectors Arkavena truly wants to pursue,
- technical accuracy,
- project-type claims,
- prioritization.

---

## Batch 05 — Location pages and project framework

**Fixed pages:** 8  
**Project pages:** 3–5 recommended, only if verified data is supplied  
**Depends on:** Batches 01–04  
**Work:**

- build all location pages,
- verify local uniqueness,
- implement project-detail template,
- create the first real case studies,
- connect projects to cities, sectors, and services.

**Owner review:**

- local facts,
- service coverage,
- project details,
- image rights,
- client disclosure,
- testimonials.

**Launch blocker:**

- If fewer than three credible projects are available, remove the project hub from the primary navigation until sufficient proof exists.
- No location page may be published with templated city substitution.

---

## Batch 06 — Production launch and domain migration

**Pages:** no new content target  
**Depends on:** Batches 00–05 and owner approval  
**Work:**

- final crawl,
- metadata audit,
- schema audit,
- redirect testing,
- production deployment,
- old-domain redirects,
- Search Console submission support,
- post-launch error report.

**Manual owner actions are required** for DNS, Search Console verification, and Change of Address.

---

## Batch 07 — Bangun Rumah guide cluster

**Pages:** 18  
**Depends on:** Service and sector pages  
**Review focus:**

- distinction between cost, process, contract, structure, and handover intent,
- cost-data dates and sources,
- technical review.

---

## Batch 08 — Renovation guide cluster

**Pages:** 14  
**Depends on:** Renovation service page  
**Review focus:**

- structural-safety claims,
- scope boundaries,
- cost uncertainty,
- homeowner practicality.

---

## Batch 09 — Commercial-building guide cluster

**Pages:** 14  
**Depends on:** Commercial services and sector pages  
**Review focus:**

- sector-specific cost assumptions,
- utility and logistics accuracy,
- business-owner conversion CTAs.

---

## Batch 10 — Project management and risk cluster

**Pages:** 18  
**Depends on:** Management service pages  
**Review focus:**

- theoretical and practical accuracy,
- Arkavena differentiation,
- terminology consistency,
- examples that do not disclose confidential client data.

---

## Batch 11 — Maintenance and design cluster

**Pages:** 14  
**Depends on:** Maintenance, design-and-build, and fit-out services  
**Review focus:**

- maintenance scope,
- MEP boundaries,
- service-contract language,
- design/documentation terminology.

---

## Batch 12 — Paid landing pages and conversion instrumentation

**Pages:** 4 non-indexable landing pages  
**Depends on:** core services, analytics decisions  
**Work:**

- create four landing pages,
- minimal navigation,
- campaign-specific copy,
- form/WhatsApp conversion events,
- thank-you flow,
- UTM preservation,
- noindex validation.

**Owner manual actions:**

- Google Ads account and campaign setup,
- budget,
- audience and location settings,
- conversion-action verification,
- final ad approval.

---

## 15. Review protocol for every batch

Claude Code must provide the owner:

1. Pull-request summary.
2. Page list.
3. Files changed.
4. Vercel Preview URL.
5. Content-validation report.
6. Broken-link report.
7. Metadata/schema report.
8. Items requiring owner verification.
9. Explicit statement that no unapproved scope was added.

The owner reviews:

- factual accuracy,
- brand voice,
- services actually offered,
- project and local claims,
- visual quality,
- CTA destination,
- mobile layout.

A batch may not be merged while any owner-verification marker remains unresolved.

---

## 16. Manual responsibility boundary

## 16.1 Claude Code / AI responsibility

- repository setup,
- page templates,
- MDX files,
- validation,
- metadata generation,
- schema generation,
- sitemap and robots,
- redirect configuration,
- internal-linking engine,
- link graph,
- tests,
- previews,
- technical QA,
- analytics event code after IDs and event requirements are supplied,
- Search Console and migration instructions,
- content drafts based on supplied facts and approved research.

## 16.2 Owner-only or owner-access actions

- DNS changes for `arkavena.com`,
- domain registrar settings,
- GitHub/Vercel account authorization,
- Google Search Console ownership verification,
- Search Console Change of Address submission,
- GA4 property creation and access,
- Google Tag Manager container creation and publishing approval,
- Google Ads billing, campaign, and budget setup,
- Google Business Profile creation/verification,
- final NAP details,
- business license and credential verification,
- client and project publication permission,
- testimonial permission,
- final service and pricing claims,
- backlink outreach,
- partner and directory outreach,
- social-profile updates,
- final merge/launch approval.

## 16.3 Shared responsibility

| Work | Claude Code | Owner |
|---|---|---|
| Keyword architecture | Draft and validate collisions | Approve commercial priorities |
| Location content | Research/draft structure | Verify operational and local facts |
| Project pages | Structure and draft | Supply facts, images, permission |
| Cost guides | Build tables and citations | Approve assumptions and current figures |
| Analytics | Implement events | Create accounts, provide IDs, verify reports |
| Migration | Build redirect map and code | Provide old-site access and submit Change of Address |
| Backlinks | Prepare target lists/templates | Conduct relationship outreach |

---

## 17. Business data required before schema launch

The owner must provide:

```yaml
business:
  brandName: Arkavena
  legalName: null
  previousBrandName: ManajemenKonstruksi.id
  website: https://arkavena.com
  logo: /images/brand/logo.svg
  phone: null
  whatsapp: null
  email: null
  physicalAddress: null
  city: null
  province: Jawa Timur
  postalCode: null
  country: ID
  latitude: null
  longitude: null
  openingHours: null
  priceRange: null
  socialProfiles: []
  serviceAreas:
    - Surabaya
    - Sidoarjo
    - Gresik
    - Mojokerto
    - Pasuruan
    - Malang
    - Lamongan
```

Rules:

- Null fields must be omitted from JSON-LD.
- Do not infer an address or coordinates.
- Do not emit ratings or review counts unless compliant and independently supportable.
- Do not create a branch entity without an actual branch.
- Public NAP data must be consistent across the site and business profiles.

---

## 18. CI and acceptance criteria

A pull request may merge only if all checks pass:

```text
[ ] content manifest generated
[ ] Zod frontmatter validation
[ ] TypeScript typecheck
[ ] lint
[ ] unit tests
[ ] production build
[ ] duplicate keyword check
[ ] broken link check
[ ] orphan page check
[ ] redirect loop/chain check
[ ] indexability audit
[ ] sitemap count audit
[ ] JSON-LD serialization test
[ ] key-template screenshot review
```

### Template-level acceptance

Each indexable page must have:

- exactly one visible H1,
- unique title,
- unique meta description,
- canonical URL,
- indexable robots directive,
- breadcrumb,
- appropriate schema,
- hero image and alt text,
- primary CTA,
- collection-hub link,
- related-content module,
- no broken links,
- no placeholder text.

### Site-level acceptance

- no published page under an old-domain canonical,
- no accidental `noindex` on organic pages,
- no indexable `/lp/*`,
- no old-domain links in body content,
- no fake branch schema,
- no duplicate primary keywords,
- no mass-generated location copy,
- no unpublished or unverified project claims,
- sitemap count equals the content manifest’s indexable count,
- 404 page returns a real 404 status,
- redirects point directly to final destinations.

---

## 19. Claude Code operating contract

Create `CLAUDE.md` containing at least:

```markdown
# Arkavena implementation rules

1. Read ARCHITECTURE.md before every batch.
2. Do not change routes, content models, dependencies, or schema strategy without owner approval.
3. One public page equals one MDX file.
4. Filename must equal slug.
5. Do not invent projects, clients, numbers, prices, testimonials, credentials, addresses, or local facts.
6. Keep unverified content in draft status.
7. Do not publish city-service matrix pages.
8. Do not add a new package when existing architecture can solve the task.
9. Do not manually edit generated files.
10. Run content validation, link validation, tests, and production build before reporting completion.
11. Provide a Vercel Preview URL and page list for each batch.
12. Never push directly to main.
13. Any slug change requires a redirect.
14. Any external factual claim requires a source or owner verification.
15. Ads landing pages must remain noindex and outside the sitemap.
```

---

## 20. Amendment process

Any change to the following requires an explicit update to `ARCHITECTURE.md` before implementation:

- top-level routes,
- content collections,
- frontmatter schema,
- URL naming,
- indexability policy,
- structured-data entity model,
- internal-linking score,
- project verification gate,
- location-page gate,
- build-failure rules,
- deployment workflow.

Amendments must include:

1. reason,
2. affected pages,
3. migration impact,
4. redirect impact,
5. schema impact,
6. implementation batch.

---

## 21. Definition of done

The architecture is fully implemented when:

1. The repository follows the folder contract.
2. All fixed 132 pages exist and have passed review, even if later batches publish them over time.
3. All published pages are represented in the manifest and sitemap.
4. Location pages contain verified unique value.
5. Project pages use only real owner-approved data.
6. Internal-link graph has no orphan pages.
7. Metadata and schema are generated consistently.
8. Ads landing pages remain non-indexable.
9. Old-domain URLs are correctly redirected.
10. Search Console and analytics are operational.
11. The owner can request an edit by naming a collection and slug, for example:

```text
Edit content/services/bangun-rumah.mdx
```

12. Claude Code can make isolated page edits without touching templates unless the requested change genuinely affects all pages of that type.

---

## Final implementation directive

Start with Batch 00 only. Do not generate all 132 pages in the first session. Complete the foundation, validation system, preview deployment, and old-URL inventory first. Continue to the next batch only after owner review and approval.
