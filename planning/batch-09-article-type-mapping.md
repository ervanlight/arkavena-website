# Batch 09 — articleType vocabulary mapping

Same pre-existing `ARCHITECTURE.md` §8.4 vs `ARTICLE_TYPES` enum mismatch
documented in `planning/batch-08-article-type-mapping.md` — not resolved
here, no schema change made. Batch 09's brief-vocabulary types map as
follows, following the Batch 07/08 precedent:

| Guide | Brief's articleType | Schema `articleType` used |
|---|---|---|
| tahapan-proyek-bangunan-komersial | pillar | `pillar` |
| biaya-bangun-{ruko,gudang,pabrik,kantor,kos,cafe,restoran,klinik,sekolah,masjid} | cost-guide | `cost` — written as non-numeric cost-driver guides per owner's no-published-pricing policy, see `batch-09-sector-cost-data-required.md` |
| cara-memilih-kontraktor-bangunan-komersial | how-to | `process` |
| perencanaan-utilitas-bangunan-komersial | explainer | `explainer` |
| akses-logistik-proyek-gudang-dan-pabrik | risk-guide | `explainer` |

`risk-guide` maps to `explainer` for the same reason as Batch 08's
structural-safety articles: it is a warning/limitations-focused guide, not a
linear process or checklist, and `explainer` is the nearest existing enum
value.
