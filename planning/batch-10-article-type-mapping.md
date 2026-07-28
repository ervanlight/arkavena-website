# Batch 10 — articleType vocabulary mapping

Same pre-existing `ARCHITECTURE.md` §8.4 vs schema `ARTICLE_TYPES` enum
mismatch documented in Batch 07/08/09's mapping notes — not resolved here,
no schema change made. Most of Batch 10A's brief-vocabulary types map
directly onto the existing enum (`pillar`, `explainer`, `comparison` are all
already supported); only `how-to` needs mapping, following the established
`how-to → process` precedent.

## P3 (this sub-batch)

| Guide | Brief's articleType | Schema `articleType` used |
|---|---|---|
| apa-itu-manajemen-konstruksi | pillar | `pillar` |
| tugas-manajemen-konstruksi | explainer | `explainer` |
| manajemen-konstruksi-vs-kontraktor | comparison | `comparison` |
| apa-itu-pengawasan-proyek | explainer | `explainer` |
| owner-representative-proyek-konstruksi | explainer | `explainer` |
| apa-itu-value-engineering-konstruksi | explainer | `explainer` |
| value-engineering-untuk-mengendalikan-biaya | how-to | `process` |
| pengendalian-biaya-proyek | explainer | `explainer` |
| pengendalian-cashflow-proyek | explainer | `explainer` |

## P4 (deferred to Batch 10B — documented now for consistency, not yet built)

| Guide | Brief's articleType | Schema `articleType` to use |
|---|---|---|
| cara-membuat-cashflow-proyek-konstruksi | how-to | `process` |
| cara-membaca-kurva-s-proyek | how-to | `process` |
| pengendalian-jadwal-proyek | how-to | `process` |
| risiko-keterlambatan-proyek-konstruksi | risk-guide | `explainer` |
| change-order-proyek-konstruksi | explainer | `explainer` |
| audit-rab-proyek | how-to | `process` |
| quality-control-konstruksi | explainer | `explainer` |
| laporan-progress-proyek-konstruksi | how-to | `process` |
| cara-mencegah-pembengkakan-biaya-proyek | risk-guide | `explainer` |

`risk-guide` maps to `explainer` for the same reason as Batch 08/09's
risk-guide articles: it's a warning/limitations-focused guide, not a linear
process or checklist.
