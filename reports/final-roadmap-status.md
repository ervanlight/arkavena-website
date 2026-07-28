# Final Roadmap Status — Batch 00–12

Date: 2026-07-29
Scope: ARCHITECTURE.md's full 00–12 batch roadmap, as of Batch 12's PR
(content/batch-12-landing-ads), not yet merged.

## Batch-by-batch status

| Batch | Scope | Status |
|---|---|---|
| 00 | Content-engine scaffold | Merged |
| 01 | Corporate pages, consultation, WhatsApp helper | Merged |
| 02 | 10 P1 services | Merged |
| 03 | 10 P2 services | Merged |
| 04A/04B | Sectors (P1 + P2) | Merged |
| 05 | Projects (portfolio data) | Merged (all 7 project pages remain `review` — see Pending Owner Actions) |
| 06/06A | Locations, launch migration | Merged |
| 07 | Guide cluster: bangun-rumah / renovasi (18 planned, 9 active) | Merged |
| 08 | Guide cluster: sectors P2 promotion + renovasi cost guide | Merged |
| 09 | Guide cluster: bangunan-komersial (14 planned, 11 active) | Merged; 8/11 promoted, 3 held for mandatory technical review |
| 10 | Guide cluster: manajemen-risiko (18 planned, 9 active) | Merged; not promoted, awaiting owner review |
| 11 | Guide cluster: building-maintenance + design-koordinasi (14 planned, 14 active) | Merged; not promoted, 10/14 flagged for mandatory technical/contractual review |
| 12 | Paid landing pages + conversion instrumentation | **This batch — PR open, not merged** |

## Current content inventory (see `reports/final-content-inventory.csv` for the full 126-row breakdown)

| Type | Total | Published | Review | Draft |
|---|---|---|---|---|
| Page | 12 | 11 | 1 | 0 |
| Service | 21 | 20 | 0 | 1 (fixture) |
| Sector | 15 | 14 | 0 | 1 (fixture) |
| Location | 9 | 0 | 8 | 1 (fixture) |
| Guide | 58 | 31 | 26 | 1 (fixture) |
| Project | 7 | 0 | 7 | 0 |
| Landing | 4 | 0 | 4 | 0 |
| **Total** | **126** | **76** | **46** | **4** |

76 pages are in the sitemap (all published + indexable + owner-verified). The
4 fixture drafts (`contoh-*`) are scaffold test fixtures, not real content,
and are never promoted.

## What Batch 12 added

- `/lp/bangun-rumah-surabaya`, `/lp/renovasi-rumah-surabaya`,
  `/lp/manajemen-konstruksi`, `/lp/building-maintenance` — all `status:
  review`, `landing.index: false`, excluded from the sitemap.
- `LandingHeader`/`LandingFooter` minimal navigation, swapped in for `/lp/*`
  via `src/components/site-chrome.tsx`.
- `LandingLeadForm` + `/api/lead` — the first real server-side lead-delivery
  endpoint in the codebase (organic `/konsultasi-proyek` still has none, by
  design — see Pending Owner Actions).
- `src/lib/landing/analytics.ts` — single-mode (`none|ga4|gtm`) conversion
  event adapter, env-driven, no hard-coded IDs.
- `src/lib/landing/attribution.ts` — session-scoped, allowlisted UTM/click-id
  capture, no cookies, no PII.

## Roadmap completion

With Batch 12's PR opened, all 13 batches (00–12) in ARCHITECTURE.md's
roadmap have been built and have open or merged PRs. **Batch 12 is the
terminal batch** — per its own brief, any further work is a maintenance or
amendment task, not an automatic Batch 13.
