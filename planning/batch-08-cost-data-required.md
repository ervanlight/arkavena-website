# Batch 08 — cost-data gate: `biaya-renovasi-rumah`

**Status:** RESOLVED (2026-07-28) — see resolution below. Original blocker kept for history.
**Article:** `/panduan/biaya-renovasi-rumah` (`guide-biaya-renovasi-rumah`)
**Article type:** `cost` (mapped from brief's `cost-guide`, see `planning/batch-08-article-type-mapping.md`)

## Resolution (2026-07-28)

Owner decided against a single "starting from Rp X" figure (the Batch 07 pattern) because
renovation cost variance is too wide to responsibly represent with one number. Instead,
owner provided a category framework — ringan / sedang / berat-total — with a general
Indonesian-market cost-per-m² range for each category, explicitly framed as market
context rather than an Arkavena quote:

| Kategori | Kisaran per m² | Contoh pekerjaan |
|---|---|---|
| Ringan | Rp1.500.000–3.000.000 | Cat ulang, ganti lantai/plafon, tanpa bongkar struktur |
| Sedang | Rp3.000.000–5.000.000 | Renovasi dapur/kamar mandi, sekat baru, ubin baru |
| Berat/Total | Rp5.000.000–10.000.000 | Bongkar struktur, tambah lantai, renovasi menyeluruh |

`dataAsOf: "2026-07-28"` (date the owner supplied the framework). The `sources` entry
does not cite a specific named external publication — owner explicitly said not to
fabricate a specific external citation — it is labeled as general Indonesian
construction-market context, anchored to Arkavena's own renovation service page rather
than an unverified third-party URL. `content/guides/biaya-renovasi-rumah.mdx` is now an
active MDX file using `CostTable` for the three category rows.

## Original blocker (kept for history)

## Why this is blocked

Batch 07's cost guide (`biaya-bangun-rumah-per-meter`) was unblocked because the owner
proactively supplied a starting-price figure (Rp4.000.000/m², dated 2026-07-28) during
that batch's review. No equivalent figure, range, or dataset has been provided for
renovation costs in this batch's instructions or in any prior conversation.

Renovation costs are also intrinsically harder to generalize than new-build costs — they
depend heavily on existing-condition unknowns (structural condition, hidden utilities,
demolition scope) that a single starting price cannot responsibly represent without the
owner explicitly framing what it covers. Per CLAUDE.md rule 5 ("do not invent numbers,
prices...") and the batch's cost-data hard gate, no active MDX file was created for this
route.

## What's needed before this can be unblocked

Any one of the following, supplied or explicitly approved by the owner:

- A starting price per m² (or per renovation scope tier — e.g. light/medium/heavy
  renovation) for Arkavena's renovation work, with a data date.
- A breakdown of what such a starting price would include/exclude (structural work,
  finishing level, MEP scope, demolition, etc.) — renovation cost tends to need this more
  than new-build cost, since "per m²" is a weaker proxy when structural condition varies.
- Confirmation of whether Arkavena wants to publish a single anchor figure (like Batch 07)
  or explicitly avoid publishing any renovation price point and instead route all
  renovation cost questions to consultation — in which case this route may not need an
  active cost guide at all, and `cara-menghitung-anggaran-renovasi-rumah` (a
  method/process guide, not a cost-figure guide) can carry the cluster's cost-adjacent
  content instead.

## Current state

- No `content/guides/biaya-renovasi-rumah.mdx` file exists.
- No relationship in this batch's other guides points to `guide-biaya-renovasi-rumah`
  (per the no-future-ID rule — sibling lists reference only guides created in this batch
  or already published).
- The pillar (`renovasi-total-vs-renovasi-sebagian`) and other supporting guides in this
  batch do not assume this article exists.

## Batch 08 report cross-reference

This blocker is reflected in Batch 08's report as "PARTIALLY COMPLETE" — 13 of 14
inventory guides were created; this one remains pending owner cost data.
