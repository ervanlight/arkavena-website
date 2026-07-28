# Batch 07 — Cost data required

Not read by the content loader (`content/guides/` only). Tracks guide pages
blocked on missing verifiable cost data, per Batch 07's cost-data hard gate.

## Blocked: biaya-bangun-rumah-per-meter

**Planned route:** `/panduan/biaya-bangun-rumah-per-meter`
**Planned ID:** `guide-biaya-bangun-rumah-per-meter`
**Article type:** `cost` (schema vocabulary — see note on article-type mapping below)
**Status:** BLOCKED — not created as active MDX

### Why this is blocked

This article's entire purpose is explaining and illustrating per-m² cost
figures for house construction. Per the cost-data hard gate, no price per m²,
material price, labor price, or cost range may be filled from training data,
memory, old articles, search snippets, assumptions, other-city data, or any
number without a source and date. No such data was provided for this batch.

### Required data (owner-provided, before this article can be drafted)

| Field | Needed |
|---|---|
| Price range(s) per m² | Yes — at minimum one verified range |
| Geographic scope | City/province the range applies to |
| Specification level | What finish/quality level the range assumes (basic/standard/premium etc.) |
| Included components | e.g. structure, MEP rough-in, finishing — explicitly listed |
| Excluded components | e.g. land cost, permits, furniture, design fees — explicitly listed |
| Data date (`dataAsOf`) | The date the price data itself reflects — not today's date, not file-creation date |
| Source | Where the range comes from — Arkavena's own anonymized estimate register, a government reference, a supplier quote with date/region, or another source the owner explicitly approves |
| Publication approval | Owner confirmation this specific data may be published publicly |

### What happens once data is available

1. Owner provides the data above (ideally as an owner-input record, e.g. `data/owner-input/costs/bangun-rumah-YYYY-MM-DD.yml`, if/when that mechanism is adopted).
2. Draft `content/guides/biaya-bangun-rumah-per-meter.mdx` using only that data, `articleType: cost`, `dataAsOf` set to the real data date, and `sources` populated and non-empty.
3. Use `CostTable` with explicit unit/currency/location/date/inclusion/exclusion/limitation, never a bare figure in prose.
4. Backfill sibling relationships from the other 8 P3 guides that currently list this article as a planned (but not yet created) sibling — see the P3 guide files' `relationships.guides` arrays for the exact `guide-biaya-bangun-rumah-per-meter` references that will need to resolve once this file exists.

### Note on article-type vocabulary

This batch's brief uses `cost-guide` / `how-to` / `risk-guide` as article
types, but the actual implemented schema (`src/config/taxonomies.ts`
`ARTICLE_TYPES`) only allows `explainer | cost | comparison | checklist |
process | pillar`. Extending that enum is a content-model change requiring
owner approval per CLAUDE.md — not done in this batch. The 8 P3 guides that
were created use the nearest existing type instead:

| Brief's type | Schema type used |
|---|---|
| `cost-guide` | `cost` |
| `how-to` | `process` |
| `pillar` | `pillar` (exact match) |
| `checklist` | `checklist` (exact match) |
| `explainer` | `explainer` (exact match) |
| `comparison` | `comparison` (exact match) |

This mapping is flagged for owner awareness, not a way to dodge the
`dataAsOf`/`sources` gate — the schema's `cost` type carries the exact same
publish-time requirement (`frontmatter.ts` already enforces `dataAsOf` on any
published guide with `articleType === "cost"`).
