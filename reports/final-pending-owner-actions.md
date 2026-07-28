# Final Pending Owner Actions — Batch 00–12

Date: 2026-07-29

This is the consolidated list of everything across the 00–12 roadmap that is
built and validated but blocked on an owner decision, verification, or piece
of data that only the owner can supply. Nothing in this list is a code defect.

## 1. Business facts (`src/config/business.ts`, `src/config/site.ts`)

- `businessFacts.telephone`, `.email`, `.address`, `.geo`,
  `.identifiers` (NIB/SBU/IUJK), `.foundingYear`, `.sameAs` — all `null`.
  Stripped from JSON-LD rather than guessed, per rule.
- `siteConfig.whatsApp` (`NEXT_PUBLIC_WHATSAPP_NUMBER`) — unset. No WhatsApp
  CTA renders anywhere on the site (organic or landing) until this is set.
- `temporaryFallbackEmail` (`admin@arkavena.com`) is the only working contact
  channel site-wide until a verified phone/WhatsApp number is provided.

**Impact:** every `whatsapp_click` event in Batch 12's taxonomy is currently
unreachable — the WhatsApp CTA never renders, so the event never fires. This
is by design (no fabricated contact channel), not a bug.

## 2. Lead delivery (`LEAD_WEBHOOK_URL`)

`/api/lead` (new in Batch 12) is fully built and server-validates every
submission, but has nowhere to deliver a confirmed lead until
`LEAD_WEBHOOK_URL` is set in production. Until then, `LandingLeadForm` shows
the honest fallback (`ConsultationChannels` — currently the temporary email)
instead of a fake success state, and `generate_lead` never fires.

**Action needed:** provide a webhook endpoint (Zapier, Make, a CRM inbox
endpoint, etc.) that accepts a `POST` with `{ name, phone, message, campaign,
pagePath, attribution, submittedAt, source }` and returns 2xx on receipt.

## 3. Analytics instrumentation ID

`NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID` are both unset.
`src/lib/landing/analytics.ts` resolves to mode `none` — no vendor script
loads, and `trackLandingEvent` only console-logs in development. The full
taxonomy and adapter are implemented and tested; only the ID is missing.

**Status:** TRACKING IMPLEMENTED — PRODUCTION ID PENDING.

**Action needed:** decide GTM vs. GA4 (not both — the adapter is single-mode
by design) and supply the container/measurement ID.

## 4. Google Ads campaign setup

Out of scope for Batch 12 by explicit instruction. No campaign, budget,
bidding, targeting, ad creative, or approval was created or touched. This
remains entirely the owner's action once the 4 landing pages are reviewed.

## 5. Content still in `review`, pending owner sign-off

- **7 project pages** (`/proyek/*`) — need `factsVerified: true` and
  `clientPermission: true` before they can publish.
- **8 location pages** (`/wilayah/*`) — need `location.localFactsVerified:
  true`.
- **26 guides** across Batch 09 (3), Batch 10 (9), Batch 11 (14) — see below
  for the subset needing more than a routine promotion.
- **4 landing pages** (this batch) — need review of campaign copy, CTA
  wording, and the lead-form fallback behavior before promotion.

## 6. Guides requiring mandatory technical/contractual review (not a routine promotion)

These must **not** be promoted just because their batch is approved — each
needs a separate, explicit sign-off (ARCHITECTURE.md convention established
in Batch 08):

- Batch 09: `biaya-bangun-pabrik`, `biaya-bangun-restoran`, `biaya-bangun-klinik`
- Batch 10: `manajemen-konstruksi-vs-kontraktor`, `owner-representative-proyek-konstruksi`
- Batch 11: `jadwal-preventive-maintenance-bangunan`,
  `checklist-inspeksi-gedung`, `perawatan-atap-bangunan`,
  `perawatan-fasad-bangunan`, `perawatan-mep-bangunan`,
  `kontrak-building-maintenance`, `shop-drawing-konstruksi`,
  `gambar-kerja-vs-gambar-desain`, `koordinasi-arsitektur-struktur-mep`

## 7. Legacy `/terima-kasih` copy

Pre-dates the content engine and is reused as-is by Batch 12 (see
CLAUDE.md's legacy-route table — not to be edited without approval). It
currently states a "1x24 jam kerja" response commitment and lists BOQ
preparation as a next step. These are pre-existing claims, not introduced by
this batch; flagging here since real leads may now reach this page once
`LEAD_WEBHOOK_URL` is configured, so the owner may want to review the
copy's accuracy at that point.
