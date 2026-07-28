# Final Conversion Instrumentation Report — Batch 12

Date: 2026-07-29

## Architecture

- **Adapter:** `src/lib/landing/analytics.ts` — `trackLandingEvent(name,
  params, dedupeKey?)`. Single exported entry point for all `/lp/*`
  instrumentation.
- **Mode resolution:** `getAnalyticsMode()` reads `NEXT_PUBLIC_GTM_ID` and
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` — the same two env vars the root layout
  (`src/app/layout.tsx`) already uses to decide which vendor script to load,
  so the adapter's mode can never disagree with what script is actually on
  the page. GTM wins if both are set; only one vendor call fires per event,
  never both.
- **Modes:** `none` (current production state — no ID configured, dev-only
  console logging), `ga4` (`gtag('event', ...)`), `gtm`
  (`dataLayer.push({event, ...})`). No IDs are hard-coded anywhere in the
  adapter or its tests.

## Event taxonomy (7 events, no others permitted through this adapter)

| Event | Fires when | Fired from |
|---|---|---|
| `landing_view` | Landing page mounts | `LandingViewTracker` (in `LandingTemplate`) |
| `cta_click` | Hero CTA clicked | `LandingCTA` |
| `whatsapp_click` | Hero CTA resolves to a wa.me link (only when a WhatsApp number is configured) | `LandingCTA` |
| `form_start` | Lead form gains focus for the first time | `LandingLeadForm` |
| `form_submit_attempt` | Form submitted, before the server call | `LandingLeadForm` |
| `generate_lead` | `/api/lead` returns `{ delivered: true }` — i.e. only after real server-confirmed delivery | `LandingLeadForm`, deduplicated per submission id |
| `form_submit_error` | `/api/lead` returns a non-success response, or the request fails | `LandingLeadForm` |

`generate_lead` is the only event with a dedupe key (`submissionId`, a
`crypto.randomUUID()` generated once per form mount), so a retried network
call or an accidental double-fire cannot count as two leads.

## Attribution

`src/lib/landing/attribution.ts` — `captureAttribution(search, landingPage)`
reads only an allowlist of 7 non-PII query parameters (`utm_source`,
`utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`),
stores them in `sessionStorage` only (no cookies — no separate cookie-consent
decision has been made), and preserves first-touch values across in-session
navigation. Attribution is attached to every lead payload sent to
`/api/lead` and to the delivered webhook payload, so a delivered lead
carries its campaign source without ever storing PII in the attribution
store itself.

## Lead delivery

`/api/lead` (`src/app/api/lead/route.ts`) is the first real lead-delivery
endpoint in the codebase. It validates every submission server-side
(`src/lib/lead/schema.ts`, Zod) independent of client-side validation,
rejects honeypot-filled submissions, and — only when `LEAD_WEBHOOK_URL` is
configured — POSTs the validated lead to that webhook and waits for a 2xx
response before reporting `delivered: true`. When the webhook is unset or
fails, it returns an honest failure status; `LandingLeadForm` never shows a
fake success state, and `generate_lead` never fires on a failed delivery.

## What's implemented vs. what's pending

**Implemented and tested** (see `src/__tests__/batch12-landing.test.ts`):
mode resolution, taxonomy shape, attribution allowlist/no-PII, lead schema
validation, noindex/sitemap-exclusion gates.

**Pending owner input** (see `reports/final-pending-owner-actions.md` for
full detail):
- `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_MEASUREMENT_ID` — analytics mode
  is currently `none` in production.
- `LEAD_WEBHOOK_URL` — lead delivery currently returns `not_configured` in
  production; forms fall back to `ConsultationChannels`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — no WhatsApp CTA renders anywhere on the
  site yet, so `whatsapp_click` cannot fire until this is set.

**Status: TRACKING IMPLEMENTED — PRODUCTION ID PENDING.**
