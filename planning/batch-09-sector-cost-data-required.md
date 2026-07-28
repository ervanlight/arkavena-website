# Batch 09 — commercial cost guides: resolved via no-published-pricing policy

**Status:** RESOLVED (2026-07-28) — owner decision, not a data gap. Original
blocker (below) kept for history.

## Resolution (2026-07-28)

Owner decided Arkavena should not publish commercial-construction price
figures or ranges at all, regardless of whether internal cost data exists —
construction cost variance is too high across commercial building types to
represent responsibly with public numbers, and the business prefers routing
cost questions to personal consultation.

This is different from Batch 07/08's cost guides, which stayed blocked only
until the owner supplied a figure or framework. Here, the owner explicitly
does not want a published price point for any of the 10 commercial sectors —
so instead of waiting for data, all 10 `biaya-bangun-[sektor].mdx` guides
were written as **cost-driver guides**: they explain what affects cost per
sector (scope, specification level, MEP, site conditions, etc. — the
qualitative content already anticipated in the batch brief §15) without any
`Rp` figure, percentage, or `CostTable`. Each opens with an explicit Callout
stating the no-published-pricing policy and closes with a consultation CTA
as the primary conversion driver.

This resolution is **scoped to Batch 09 (commercial) only** per explicit
owner confirmation — it does not apply retroactively to
`biaya-bangun-rumah-per-meter` (Batch 07) or `biaya-renovasi-rumah` (Batch
08), which keep their published figures/framework.

`article.articleType` stays `cost` (per the brief's mapping) and
`article.dataAsOf`/`sources` stay `null`/`[]` — there is no numeric data to
audit or date. `CostTable` (which requires `dataAsOf` and `sources` props)
is not used in any of the 10 guides.

## Files created

- `content/guides/biaya-bangun-ruko.mdx`
- `content/guides/biaya-bangun-gudang.mdx`
- `content/guides/biaya-bangun-pabrik.mdx` (mandatory technical review — see below)
- `content/guides/biaya-bangun-kantor.mdx`
- `content/guides/biaya-bangun-kos.mdx`
- `content/guides/biaya-bangun-cafe.mdx`
- `content/guides/biaya-bangun-restoran.mdx` (mandatory technical review — see below)
- `content/guides/biaya-bangun-klinik.mdx` (mandatory technical review — see below)
- `content/guides/biaya-bangun-sekolah.mdx`
- `content/guides/biaya-bangun-masjid.mdx`

## Mandatory technical review (brief §17.1, unaffected by this resolution)

`biaya-bangun-pabrik`, `biaya-bangun-restoran`, and `biaya-bangun-klinik`
remain in the brief's mandatory technical-review list regardless of content
— removing numeric claims lowers risk but does not remove the requirement.
Each has an additional warning Callout noting technical review is required
before publication, and `reviewedBy` stays `null` pending that review (same
convention as Batch 08's structural-safety articles).

## Original blocker (kept for history)

Before this policy decision, all 10 guides were BLOCKED under the standard
cost-data hard gate — no cost figure, range, or dataset for any of the 10
commercial sectors had been provided by the owner. That blocker is now moot:
the resolution above means no numeric data will ever be requested for these
routes, since the guides are intentionally non-numeric by design, not
pending data collection.
