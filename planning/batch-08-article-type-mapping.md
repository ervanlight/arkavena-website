# Batch 08 — articleType vocabulary mapping

`ARCHITECTURE.md` §8.4 documents `articleType` values `pillar | cost-guide | how-to |
checklist | comparison | explainer | risk-guide`. The actual schema enum
(`ARTICLE_TYPES` in `src/config/taxonomies.ts`) only supports
`explainer | cost | comparison | checklist | process | pillar`. This mismatch predates
this batch (already hit in Batch 07) and is not something this batch resolves — per
CLAUDE.md rule 2, schema/content-model changes need explicit owner approval, which
hasn't been requested or given.

Batch 08 guides are mapped as follows, following the Batch 07 precedent
(`how-to → process`, `cost-guide → cost`):

| Guide | Brief's articleType | Schema `articleType` used |
|---|---|---|
| renovasi-total-vs-renovasi-sebagian | pillar | `pillar` |
| biaya-renovasi-rumah | cost-guide | N/A — blocked, see `batch-08-cost-data-required.md` |
| cara-menghitung-anggaran-renovasi-rumah | how-to | `process` |
| checklist-survei-sebelum-renovasi | checklist | `checklist` |
| renovasi-rumah-sambil-dihuni | explainer | `explainer` |
| tanda-rumah-perlu-perkuatan-struktur | risk-guide | `explainer` |
| renovasi-rumah-satu-jadi-dua-lantai | how-to | `process` |
| memperkuat-struktur-rumah-lama | risk-guide | `explainer` |
| renovasi-atap-bocor | risk-guide | `explainer` |
| renovasi-dapur | how-to | `process` |
| renovasi-kamar-mandi | how-to | `process` |
| renovasi-fasad-rumah | how-to | `process` |
| risiko-pembengkakan-biaya-renovasi | risk-guide | `explainer` |
| cara-memilih-kontraktor-renovasi | how-to | `process` |

`risk-guide` has no direct schema counterpart — `explainer` is the nearest fit (a guide
that explains risks/warning signs rather than walking through a linear process or
checklist), consistent with how `comparison`-shaped content would map if it came up.
This mapping does not change `ARTICLE_TYPES` or any validation logic — it only decides
which existing enum value each file's frontmatter uses.
