# Batch 08 — cost-data gate: `biaya-renovasi-rumah`

**Status:** BLOCKED — SECTOR/TOPIC COST DATA REQUIRED
**Article:** `/panduan/biaya-renovasi-rumah` (`guide-biaya-renovasi-rumah`)
**Article type:** would be `cost` (mapped from brief's `cost-guide`, see `planning/batch-08-article-type-mapping.md`)

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
