# Launch runbook — manual owner actions

Written 2026-07-28 as part of Batch 06A. Reflects the *actual* current state
of the Vercel project and domains (checked via `vercel domains ls` / `vercel
project inspect` / `vercel env ls` on 2026-07-28), not a generic template —
several steps below are already done.

`arkavena.com` is the only domain this site has ever run on — there is no
prior live domain to migrate from, so this runbook covers new-domain
readiness only.

## Current state (verified, not assumed)

- **Vercel project:** `arkavena-website` (ID `prj_QwD2IjAbbKOwpo3wBAa72JGJJ1VM`), owner `Ervan's projects`.
- **Production branch:** `main` — confirmed by every merge-to-main in this project triggering a production deployment (Batch 04A, 04B pending, Batch 05, homepage restore all observed this directly).
- **Domain (`arkavena.com`):** already registered under this Vercel account and already serving production. `https://arkavena.com/` returns 200 with valid SSL today.
- **`www.arkavena.com`:** not confirmed attached as a separate domain entry — only `arkavena.com` (apex) appears in `vercel domains ls`. Needs a manual check in the Vercel dashboard (Settings → Domains) to confirm whether `www` redirects to apex or is unconfigured.
- **Environment variables (Vercel, Production + Preview):** `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WHATSAPP_NUMBER` (085128071580, added 2026-07-28) are set. GA4 and other optional variables from `.env.example` remain unconfigured.

## Step 1 — www.arkavena.com (owner, ~5 minutes)

1. Log into Vercel → `arkavena-website` project → Settings → Domains.
2. Check whether `www.arkavena.com` is listed.
3. If not listed, add it and set it to redirect to the apex `arkavena.com` (Vercel does this automatically when you add both and mark one as primary).
4. Confirm SSL provisions for `www` as well.

## Step 2 — WhatsApp number — DONE (2026-07-28)

`NEXT_PUBLIC_WHATSAPP_NUMBER=085128071580` is set in Vercel (Production +
Preview) and in local `.env.local`. Production was redeployed to pick it up
and verified live: every WhatsApp CTA sitewide now links to
`wa.me/6285128071580` with the correct prefilled message. Number is never
hardcoded in MDX or components — it flows through `siteConfig.whatsApp` →
`buildWhatsAppUrl()` only.

## Step 3 — Google Search Console (owner, after go-live approval — do not do yet)

1. Add `arkavena.com` as a **Domain** property (not URL-prefix) in Search Console.
2. Add the DNS TXT verification record Search Console gives you — don't touch other TXT records.
3. Verify.
4. Once `sitemap.xml` is confirmed reachable, submit `sitemap.xml` under Sitemaps.

## Step 4 — GA4 (owner, when ready — not a launch blocker)

1. Check whether an old GA4 property already exists for the business before creating a new one (`.env.example` has a `NEXT_PUBLIC_GA4_ID` slot ready — nothing wired to render it yet; that's separate implementation work, not covered by this batch).
2. If reusing an old property, update its web stream URL to `https://arkavena.com`.
3. If new, create a property + web data stream for `https://arkavena.com`, copy the Measurement ID into Vercel env as `NEXT_PUBLIC_GA4_ID`.
4. This is not implemented in code yet — flagging as deferred work, not a Batch 06 blocker, since the owner explicitly scoped this launch to the 37 already-live pages.

## Step 5 — rollback plan (reference, hopefully unused)

- **Bad deployment:** Vercel dashboard → Deployments → find last known-good deployment → "Promote to Production" (or `vercel rollback` via CLI). Do not hand-edit `main`.
- **Domain misconfiguration:** apex/`www` domain settings live entirely in Vercel's dashboard — removing/re-adding the domain there is the fix, no DNS changes needed on the registrar side since the domain is already correctly pointed at Vercel.
- **Post-launch defects:** roll back via a `hotfix/batch-06-post-launch` branch, never a direct edit to `main`.

## Step 6 — monitoring (owner, ongoing)

- Launch day: check `https://arkavena.com/`, `/sitemap.xml`, `/robots.txt` load correctly; check Vercel deployment is "Ready"; check no errors in Vercel's Runtime Logs.
- First week: check Search Console for crawl errors once verified (Step 3).
- Ongoing: keep an eye on any 404s that have external backlinks.
