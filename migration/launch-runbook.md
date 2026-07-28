# Launch runbook — manual owner actions

Written 2026-07-28 as part of Batch 06A. Reflects the *actual* current state
of the Vercel project and domains (checked via `vercel domains ls` / `vercel
project inspect` / `vercel env ls` on 2026-07-28), not a generic template —
several steps below are already done.

## Current state (verified, not assumed)

- **Vercel project:** `arkavena-website` (ID `prj_QwD2IjAbbKOwpo3wBAa72JGJJ1VM`), owner `Ervan's projects`.
- **Production branch:** `main` — confirmed by every merge-to-main in this project triggering a production deployment (Batch 04A, 04B pending, Batch 05, homepage restore all observed this directly).
- **New domain (`arkavena.com`):** already registered under this Vercel account and already serving production. `https://arkavena.com/` returns 200 with valid SSL today.
- **`www.arkavena.com`:** not confirmed attached as a separate domain entry — only `arkavena.com` (apex) appears in `vercel domains ls`. Needs a manual check in the Vercel dashboard (Settings → Domains) to confirm whether `www` redirects to apex or is unconfigured.
- **Old domain (`manajemenkonstruksi.id`):** does **not resolve in DNS** (NXDOMAIN) and is not attached to this Vercel project at all. See `redirect-gap-report.md` for full detail — this is the main blocker for the old-domain half of this migration.
- **Environment variables (Vercel, Production + Preview):** only `NEXT_PUBLIC_SITE_URL` is set. `NEXT_PUBLIC_WHATSAPP_NUMBER`, GA4, and other optional variables from `.env.example` are **not configured** — this is why WhatsApp CTAs sitewide currently fall back to `/konsultasi-proyek` instead of a real wa.me link.

## Step 1 — www.arkavena.com (owner, ~5 minutes)

1. Log into Vercel → `arkavena-website` project → Settings → Domains.
2. Check whether `www.arkavena.com` is listed.
3. If not listed, add it and set it to redirect to the apex `arkavena.com` (Vercel does this automatically when you add both and mark one as primary).
4. Confirm SSL provisions for `www` as well.

## Step 2 — old-domain registrar check (owner, required before any old-domain work)

See `redirect-gap-report.md` §"Owner action required" — this is the actual
blocking step, not a DNS record copy exercise (there's nothing to copy from a
domain that doesn't resolve).

1. Log into whichever registrar holds `manajemenkonstruksi.id`.
2. Confirm registration status (active / expired / not found).
3. If active but not resolving, check the DNS zone — is there a zone at all,
   are there any records in it?
4. Report back what you find. I cannot proceed on the old-domain redirect
   workstream without this.
5. **Do not let the domain lapse further** if it's still renewable and you
   want to preserve any old SEO signal — but this is your call; if the old
   site has been down a while already, there may be nothing left to
   preserve.

## Step 3 — WhatsApp number (owner, when ready)

1. In Vercel → Settings → Environment Variables, add `NEXT_PUBLIC_WHATSAPP_NUMBER` with the real business WhatsApp number (E.164-ish format, e.g. `081234567890` or `6281234567890` — `normalizeIndonesianNumber()` in `src/lib/contact/whatsapp.ts` handles either).
2. Set it for both Preview and Production.
3. Redeploy (or wait for the next deployment) for it to take effect.
4. Until this is set, every WhatsApp CTA sitewide correctly falls back to `/konsultasi-proyek` — this is working as designed, not broken, but it's not the final experience.

## Step 4 — Google Search Console (owner, after go-live approval — do not do yet)

Standard flow, unchanged from ARCHITECTURE.md's own instructions:
1. Add `arkavena.com` as a **Domain** property (not URL-prefix) in Search Console.
2. Add the DNS TXT verification record Search Console gives you — don't touch other TXT records.
3. Verify.
4. Once `sitemap.xml` is confirmed reachable, submit `sitemap.xml` under Sitemaps.
5. Leave the old `manajemenkonstruksi.id` property alone for now — do not touch it or submit Change of Address until the domain resolves again and redirects exist (see Step 2).

## Step 5 — GA4 (owner, when ready — not a launch blocker)

1. Check whether an old GA4 property already exists for the business before creating a new one (`.env.example` has a `NEXT_PUBLIC_GA4_ID` slot ready — nothing wired to render it yet; that's separate implementation work, not covered by this batch).
2. If reusing an old property, update its web stream URL to `https://arkavena.com`.
3. If new, create a property + web data stream for `https://arkavena.com`, copy the Measurement ID into Vercel env as `NEXT_PUBLIC_GA4_ID`.
4. This is not implemented in code yet — flagging as deferred work, not a Batch 06 blocker, since the owner explicitly scoped this launch to the 37 already-live pages.

## Step 6 — rollback plan (reference, hopefully unused)

- **Bad deployment:** Vercel dashboard → Deployments → find last known-good deployment → "Promote to Production" (or `vercel rollback` via CLI). Do not hand-edit `main`.
- **Domain misconfiguration:** apex/`www` domain settings live entirely in Vercel's dashboard — removing/re-adding the domain there is the fix, no DNS changes needed on the registrar side since the domain is already correctly pointed at Vercel.
- **Old-domain redirect errors (once that workstream exists):** roll back via a `hotfix/batch-06-post-launch` branch, never a direct edit to `main`.

## Step 7 — monitoring (owner, ongoing)

- Launch day: check `https://arkavena.com/`, `/sitemap.xml`, `/robots.txt` load correctly; check Vercel deployment is "Ready"; check no errors in Vercel's Runtime Logs.
- First week: check Search Console for crawl errors once verified (Step 4).
- Ongoing: don't remove any redirect once the old-domain workstream exists, keep an eye on 404s that have external backlinks.
