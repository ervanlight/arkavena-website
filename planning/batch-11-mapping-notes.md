# Batch 11 — vocabulary mapping notes

Same pre-existing `ARCHITECTURE.md` vs schema-enum mismatches documented in
Batch 07–10's mapping notes — not resolved here, no schema change made.

## articleType (brief §6 vs `ARTICLE_TYPES`)

`how-to` and `risk-guide` are not in the schema's `ARTICLE_TYPES` enum
(`explainer | cost | comparison | checklist | process | pillar`). Following
the Batch 07–10 precedent:

| Guide | Brief's articleType | Schema `articleType` used |
|---|---|---|
| apa-itu-building-maintenance | pillar | `pillar` |
| preventive-vs-corrective-maintenance | comparison | `comparison` |
| jadwal-preventive-maintenance-bangunan | how-to | `process` |
| checklist-inspeksi-gedung | checklist | `checklist` |
| perawatan-atap-bangunan | risk-guide | `explainer` |
| perawatan-fasad-bangunan | risk-guide | `explainer` |
| perawatan-mep-bangunan | risk-guide | `explainer` |
| kontrak-building-maintenance | explainer | `explainer` |
| apa-itu-design-and-build | pillar | `pillar` |
| keuntungan-design-and-build | explainer | `explainer` |
| apa-itu-interior-fit-out | explainer | `explainer` |
| shop-drawing-konstruksi | explainer | `explainer` |
| gambar-kerja-vs-gambar-desain | comparison | `comparison` |
| koordinasi-arsitektur-struktur-mep | explainer | `explainer` |

`risk-guide` maps to `explainer` for the same reason as prior batches: a
warning/limitations-focused guide, not a linear process or checklist.

## cluster (brief §4 vs `CLUSTERS`)

The brief specifies `cluster: maintenance-bangunan` and
`cluster: design-and-documentation`. The schema's `CLUSTERS` enum instead
has `building-maintenance` and `design-koordinasi` (already defined when the
content-engine scaffold was built in Batch 00, before this batch's brief was
written). Mapped as:

| Brief's cluster name | Schema `cluster` used |
|---|---|
| maintenance-bangunan | `building-maintenance` |
| design-and-documentation | `design-koordinasi` |

This does not change the two-pillar architecture the brief requires — it
only picks the existing enum value with the closest meaning, consistent
with how `ARTICLE_TYPES` mismatches were handled in Batch 07–10. No new
cluster value was added to the schema.
