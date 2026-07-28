# Batch 12 — Landing vs. Organic Content-Similarity Report

Date: 2026-07-29
Scope: the 4 new `/lp/*` paid landing pages against their declared
`landing.organicEquivalent` organic service page.

## Method

For each pair, compared: word count, section structure, FAQ set, calls to
action, and navigation surface. Landing pages intentionally reuse a small,
already-verified subset of the organic page's claims (same risk lists, same
scope checklist items) rather than restating the business in new language —
this is the same underlying fact set, not independently sourced content, so
overlap in individual sentences is expected and accepted per ARCHITECTURE.md
Batch 12 §20 ("landing copy may reference the same verified facts as its
organic equivalent; it must not duplicate the organic page's full structure").

## Pairwise comparison

| Landing page | Organic equivalent | LP word count | Organic word count | Ratio |
|---|---|---|---|---|
| `/lp/bangun-rumah-surabaya` | `/layanan/bangun-rumah` | 432 | 1,156 | 37% |
| `/lp/renovasi-rumah-surabaya` | `/layanan/renovasi-rumah` | 429 | 1,069 | 40% |
| `/lp/manajemen-konstruksi` | `/layanan/manajemen-konstruksi` | 425 | 1,026 | 41% |
| `/lp/building-maintenance` | `/layanan/building-maintenance` | 422 | 982 | 43% |

## Structural differentiation

Each landing page omits, relative to its organic equivalent:

- "Sistem pengendalian Arkavena" (5-area control framework) section
- "Proses dari konsultasi hingga serah terima" (`ProcessSteps`) section
- "Proyek yang cocok dan yang belum cocok" section
- "Relevansi sektor" section
- "Studi proyek" section
- Secondary CTA ("Pelajari Cara Kerja")
- Full 6-7 item FAQ set (landing pages carry 4 FAQs each, a subset chosen for
  transactional intent rather than the organic page's broader informational
  FAQ set)
- Related-guides cross-links

Each landing page adds, relative to its organic equivalent:

- A campaign-specific hero heading naming the paid-traffic angle (e.g.
  "Bangun Rumah di Surabaya" vs. the organic page's general "Bangun Rumah")
- An above-the-fold primary CTA immediately after the hero (organic pages
  place their CTA after the full content body)
- The `LandingLeadForm` (organic service pages have no on-page form; they
  link out to `/konsultasi-proyek`)
- `landing_view`/`cta_click`/`whatsapp_click`/`form_start`/
  `form_submit_attempt`/`generate_lead`/`form_submit_error` instrumentation

## Search-visibility risk assessment

No cannibalization risk: all four landing pages carry `landing.index: false`
(hard-coded `z.literal(false)` in the schema), are excluded from `sitemap.ts`
by construction (never enter `sitemapEligible()`), and no organic page links
to any `/lp/*` route — `content:links` validation confirms zero internal
links into the landing collection from any published organic page. The
landing pages cannot compete with their organic equivalents in search
results because they are structurally prevented from being indexed.

## Conclusion

Each landing page is ~37-43% the length of its organic equivalent, omits five
of the organic page's nine content sections, and is built for a single paid
click-through-to-lead path rather than organic search coverage. No section is
copied verbatim beyond individual risk/scope checklist items already
established as verified facts on the organic page. No further action needed.
