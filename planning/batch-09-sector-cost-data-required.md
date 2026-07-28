# Batch 09 — sector cost-data gate: all 10 commercial cost guides

**Status:** BLOCKED — SECTOR COST DATA REQUIRED (all 10)

No cost figure, range, or dataset for any of the 10 commercial-building
sectors has been provided by the owner in this batch's instructions or in
any prior conversation. Per the cost-data hard gate (brief §4), no active
MDX file was created for any of the 10 planned cost guides. This mirrors
Batch 08's `biaya-renovasi-rumah` blocker, but affects the entire cost
inventory for this cluster since zero sectors have data — not "some sectors
missing data."

Batch 07's `biaya-bangun-rumah-per-meter` and Batch 08's
`biaya-renovasi-rumah` were unblocked because the owner proactively supplied
a figure or framework during those batches' review. No equivalent figure has
been supplied for any commercial-building sector.

## Blocked guides (10)

| Route | Sector | Required data |
|---|---|---|
| `/panduan/biaya-bangun-ruko` | sec-ruko | Cost-per-m² or category range for ruko construction, with scope/inclusion breakdown (shell vs finished, MEP, facade, signage) |
| `/panduan/biaya-bangun-gudang` | sec-gudang | Cost-per-m² or category range for warehouse construction, with structural-span/floor/loading-area scope breakdown |
| `/panduan/biaya-bangun-pabrik` | sec-pabrik | Cost-per-m² or category range for factory construction, with process/utility/support-building scope breakdown |
| `/panduan/biaya-bangun-kantor` | sec-kantor | Cost-per-m² or category range for office construction, with shell-vs-fit-out distinction |
| `/panduan/biaya-bangun-kos` | sec-kos | Cost-per-m² or category range for boarding-house construction, with unit-count/shared-facility scope breakdown |
| `/panduan/biaya-bangun-cafe` | sec-cafe | Cost-per-m² or category range for cafe construction/fit-out, with equipment/utility scope breakdown |
| `/panduan/biaya-bangun-restoran` | sec-restoran | Cost-per-m² or category range for restaurant construction/fit-out, with kitchen/utility scope breakdown |
| `/panduan/biaya-bangun-klinik` | sec-klinik | Cost-per-m² or category range for clinic construction, with specialist-utility/fit-out scope breakdown |
| `/panduan/biaya-bangun-sekolah` | sec-sekolah | Cost-per-m² or category range for school construction, with classroom/support-facility scope breakdown |
| `/panduan/biaya-bangun-masjid` | sec-masjid | Cost-per-m² or category range for mosque construction, with worship-space/ablution-area scope breakdown |

Each sector's data must be sector-specific — per brief §4.4/§4.1, one
sector's range cannot be reused for another (gudang cost cannot stand in for
pabrik, cafe cannot stand in for restoran, etc.) even though several of
these sectors share a "commercial building" classification.

## What's needed before any of these can be unblocked

For each sector, one of:

- A starting price or category range (e.g. shell/finished, or
  light/medium/heavy scope) with a data date, analogous to Batch 08's
  `biaya-renovasi-rumah` category framework.
- An approved, anonymized Arkavena RAB/estimate for that building type.
- A supplier/professional benchmark with methodology, location, and date.
- Explicit confirmation the owner does not want a published price point for
  that sector at all (in which case that route stays permanently out of
  scope rather than blocked-pending-data).

## Current state

- No `content/guides/biaya-bangun-{ruko,gudang,pabrik,kantor,kos,cafe,restoran,klinik,sekolah,masjid}.mdx`
  files exist.
- The pillar (`tahapan-proyek-bangunan-komersial`) and the 3 non-cost
  supporting guides in this batch do not assume any of these cost guides
  exist (no-future-ID rule).

## Batch 09 report cross-reference

This is why Batch 09A contains only the pillar, and Batch 09B (once
undertaken) is expected to contain only the 3 non-cost supporting guides
(`cara-memilih-kontraktor-bangunan-komersial`,
`perencanaan-utilitas-bangunan-komersial`,
`akses-logistik-proyek-gudang-dan-pabrik`) rather than the originally
planned 7 P4 pages. Batch 09's overall status is
`PARTIALLY COMPLETE — SECTOR COST DATA REQUIRED`, per brief §26.3 — not
`COMPLETE`, since 10 of 14 target pages remain blocked.
