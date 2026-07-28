# Redirect gap report

Generated manually as part of Batch 06A (2026-07-28). Not auto-generated —
`migration/redirect-map.csv` and `migration/redirect-report.md` remain the
generated/validated files; this document explains *why* the map is empty.

## Old-domain reachability — CRITICAL FINDING

`manajemenkonstruksi.id` does **not currently resolve in DNS**:

```
$ nslookup manajemenkonstruksi.id
** server can't find manajemenkonstruksi.id: NXDOMAIN
```

Checked via `curl` (https and http) and `nslookup` from this environment on
2026-07-28 — all attempts failed to resolve the host at all (not a 4xx/5xx,
not a hosting-level error: the domain has no A/AAAA/CNAME record answering).
It is also **not attached to the `arkavena-website` Vercel project** — `vercel
domains ls` shows only `arkavena.com` registered under this account.

This means the old domain is either expired, its DNS has been removed, or it
was never fully set up under this Vercel account. I cannot determine which
from here — only the owner has registrar access to check.

## Old-URL source coverage

| Source | Status | URL count | Gap |
|---|---|---|---|
| Old sitemap | NOT AVAILABLE | 0 | Domain doesn't resolve — cannot fetch `manajemenkonstruksi.id/sitemap.xml` |
| Crawl (live site) | ACCESS BLOCKED | 0 | Domain doesn't resolve — nothing to crawl |
| Analytics landing pages | NOT AVAILABLE | 0 | No export provided by owner |
| Search Console pages | NOT AVAILABLE | 0 | No export provided by owner |
| Search Console links | NOT AVAILABLE | 0 | No export provided by owner |
| Owner manual list | NOT AVAILABLE | 0 | Not provided |
| Repository/backup of old site | NOT APPLICABLE | 0 | This repo's own git history goes back to the pre-rebrand TEGAKARA codebase, but that was a different site structure (see `AGENTS.md`/git log commits before `bc14f4d`) — it does not represent `manajemenkonstruksi.id`'s actual URL structure, and using it would be guessing, not verifying |

**Result: `migration/redirect-map.csv` contains zero rows.** I have no verified
old-URL data to map from any source, and per the batch rules I will not invent
plausible-looking old URLs to fill it in.

## What this blocks

- Old-domain → new-domain path redirects (Section 9–11): cannot be built or
  tested — there is nothing to redirect *from* yet.
- Old-domain cutover (Section 29): cannot proceed at all until the domain
  resolves again.
- Google Search Console Change of Address (Section 32.5): requires the old
  property and working redirects — not reachable yet.

## What this does NOT block

- The new-domain launch itself. `arkavena.com` is already live, already the
  Vercel production domain, and already serving the 37 pages the owner
  approved for this launch. The redirect/migration gap is about **preserving
  SEO signal from the old domain**, not about whether the new site can go
  live — those are separable per ARCHITECTURE.md's own batch design ("Batch
  ini sangat bergantung pada data owner. Penyelesaian sebagian merupakan hasil
  yang valid").

## Owner action required before old-domain redirect work can proceed

1. Log into the domain registrar for `manajemenkonstruksi.id` and confirm:
   - Is the domain still registered/owned, or has it expired?
   - If registered, why does it not resolve — no DNS zone configured, or a
     zone with no records?
2. If the domain is confirmed alive, provide at least one of:
   - An export of the old sitemap.xml (if the origin server still exists
     somewhere, even off the domain).
   - A Google Analytics/Search Console export of top landing pages.
   - A manual list of URLs the owner knows are still linked-to or valuable.
3. If the domain is expired and not being renewed, say so explicitly — in
   that case the redirect workstream should be marked **NOT APPLICABLE**
   rather than pending, and the launch can proceed without it (any inbound
   links to the old domain will simply 404/NXDOMAIN, same as today).

## Accepted gaps requiring explicit owner sign-off before any go-live decision that includes old-domain migration

- **Gap:** Zero old URLs mapped; old-domain redirect layer does not exist yet.
  **Risk:** Any remaining inbound links or bookmarks pointing at
  `manajemenkonstruksi.id` will continue to fail (NXDOMAIN) rather than
  redirect to the equivalent new page.
  **Owner decision needed:** Confirm whether this is acceptable (e.g. the old
  domain was already down before this project started, so there is no
  regression) or whether domain recovery is a prerequisite.
