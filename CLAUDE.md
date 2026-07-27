@AGENTS.md

# Arkavena implementation rules

1. Read `ARCHITECTURE.md` before every batch.
2. Do not change routes, content models, dependencies, or schema strategy without owner approval.
3. One public page equals one MDX file.
4. Filename must equal slug.
5. Do not invent projects, clients, numbers, prices, testimonials, credentials, addresses, or local facts.
6. Keep unverified content in `draft` status.
7. Do not publish city-service matrix pages.
8. Do not add a new package when the existing architecture can solve the task.
9. Do not manually edit generated files.
10. Run content validation, link validation, tests, typecheck, and production build before reporting completion.
11. Provide a Vercel Preview URL and page list for every batch.
12. Never push directly to `main`.
13. Any published slug change requires a redirect.
14. Any external factual claim requires a source or owner verification.
15. Ads landing pages must remain `noindex` and outside the sitemap.

## Repository facts that override the diagrams in ARCHITECTURE.md

`ARCHITECTURE.md` §6 describes a greenfield layout. This repository is a live
production site, so the scaffold was fitted to what already exists:

| ARCHITECTURE.md §6 | Actual location |
|---|---|
| `app/` | `src/app/` |
| `components/`, `lib/`, `config/`, `schemas/` | `src/components/`, `src/lib/`, `src/config/`, `src/schemas/` |
| `generated/` | `src/generated/` (so the `@/` alias resolves) |
| `tests/` | `src/__tests__/` |
| `content/` | `content/` at the repository root — unchanged |

`src/content/` already existed and holds hand-written TypeScript data modules
for the legacy pages. It is **not** the MDX directory. MDX lives in the
root-level `content/`.

## Live routes that predate the content engine

These are hand-built TSX pages still serving production traffic, and are not
part of the content manifest:

`/`, `/tentang`, `/cara-kerja`, `/kontak`, `/portfolio`, `/portfolio/[slug]`,
`/assessment`, `/trust-center`, `/projectview`, `/terima-kasih`,
`/kebijakan-privasi`, `/syarat-ketentuan`, `/residential/*`,
`/facility-care/*`, `/admin/*`.

Do not delete, move, or redirect any of them without explicit owner approval.
Their eventual migration into `/layanan`, `/sektor` and `/proyek` is a separate
batch with its own redirect map.

## Working commands

```bash
npm run content:manifest    # regenerate manifest, module registry, link graph
npm run content:validate    # schema, uniqueness, relationships, MDX allowlist, orphans
npm run content:links       # internal links, legacy domains, redirect sanity
npm run content:audit       # robots + sitemap membership per route
npm run content:redirects   # write migration/redirect-report.md
npm run typecheck
npm run lint                # `eslint` — Next 16 removed `next lint`
npm run test                # Vitest unit tests
npm run test:e2e            # Playwright
npm run build               # runs prebuild: manifest + validate + links
```

## Non-negotiables specific to this codebase

- Never read the filesystem or import MDX from inside `src/app/`. Routes read
  `src/lib/content/queries.ts`, which reads the generated manifest.
- Never write to `src/generated/`. Regenerate it.
- Canonical URLs are derived at render time from the site origin. Never store an
  absolute URL in the manifest and never accept one from frontmatter.
- `NEXT_PUBLIC_SITE_URL` must be `https://arkavena.com` on the production
  deployment. Canonicals, the sitemap, Open Graph URLs and JSON-LD `@id`s all
  derive from it.
- New MDX components must be added to `src/config/mdx-allowlist.ts` **and**
  `src/components/content/mdx-components.tsx`. Anything else is rejected by
  `npm run content:validate`.
- `businessFacts` in `src/config/business.ts` may only be filled by the owner.
  Null fields are stripped from JSON-LD rather than guessed.
