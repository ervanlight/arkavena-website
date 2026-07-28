# Batch 07 — Cost data required

Not read by the content loader (`content/guides/` only). Tracks guide pages
blocked on missing verifiable cost data, per Batch 07's cost-data hard gate.

## Resolved: biaya-bangun-rumah-per-meter (2026-07-28)

**Route:** `/panduan/biaya-bangun-rumah-per-meter`
**ID:** `guide-biaya-bangun-rumah-per-meter`
**Article type:** `cost`
**Status:** Created as active MDX, `status: review` — no longer blocked.

### What unblocked it

Owner provided a starting price (2026-07-28): **Rp4.000.000/m²**, explicitly
positioned as a deliberate starting/filter price for the mid-upper segment,
not a market-average or budget figure. No detailed component breakdown
(structure/MEP/finishing split) was provided — the article explains the
*variables* that affect the final figure instead of fabricating a breakdown
table, per the owner's explicit instruction not to invent line-item numbers.

- `dataAsOf`: `2026-07-28` (the date the owner gave this figure — not an
  arbitrary file-creation date)
- `sources`: recorded as an internal Arkavena estimate (not an external
  source, and not fabricated as one) — `label: "Estimasi internal Arkavena
  berdasarkan pengalaman proyek"`, `publisher: "Arkavena"`
- Framing: "mulai dari" (starting price) throughout, never presented as a
  final quote or as a low/cheap price — tone explicitly ties the price point
  to Arkavena's quality/risk-control differentiation, per owner instruction
- A `<CTA>` block is placed immediately after the price is first stated in
  the body, in addition to the template's standard end-of-article CTA
- Sibling relationships backfilled into `tahapan-bangun-rumah-dari-nol`
  (pillar), `cara-menghitung-biaya-bangun-rumah`, and
  `cara-membaca-rab-rumah` — the three closest guides per the cannibalization
  audit — with matching inline body links added

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
