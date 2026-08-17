@AGENTS.md

# Hanga Macrame

Coming-soon site for a working handmade-macramé business in Cluj-Napoca,
Romania. Live at https://hangamacrame.com. The business is already trading —
only the website is new, so nothing here should imply she is not yet open.

Phase 1 of three: 1) this page, 2) a presentation site with a gallery,
3) a Shopify webshop.

## Commands

```bash
npm run dev      # localhost:3000 — note / 404s here, see "Two root layouts"
npm run build    # also the only real check; writes out/
npm run lint     # eslint; currently clean, keep it that way
```

There are no tests. `npm run build` failing is the signal that something broke.

## Hard constraints

**Static export.** `output: "export"` in `next.config.ts`, because it deploys
to GitHub Pages. That rules out route handlers, middleware, server actions,
ISR, revalidation, and `next/image` optimization (hence `images.unoptimized`).
If a task needs a server, the answer is not to add one — it is to say so.

**`trailingSlash: true`.** Every internal href ends in `/`. Dropping it breaks
links on Pages.

**GitHub Pages, not Vercel.** Vercel's free tier forbids commercial use, and
this is a business. Pages has no such restriction. Don't "helpfully" migrate.

## Two root layouts

There is deliberately **no `app/layout.tsx`**. Two route groups each own a root
layout, which is what lets each locale set its own `<html lang>`:

- `app/(redirect)/` → `/` — a `noindex` meta-refresh stub to `/en/`
- `app/[lang]/` → `/en/`, `/ro/`, `/hu/`

Adding `app/layout.tsx` would collapse this and break per-locale `lang`.

`/` returns 404 under `npm run dev` in some setups but works in the build —
verify routing against `npm run build && npx serve out`, not just dev.

## `app/dictionaries.ts` is the content file

All three locales' copy, the social links, and the `GBP` block live here.

**The `GBP` values must stay byte-identical to the Google Business Profile.**
Name, address, phone and hours are mirrored into JSON-LD; a mismatch between
site and listing actively damages local ranking, so it is worse than having no
markup. Changing one side only is the bug.

Copy is idiomatic per language, not translated. Hungarian uses **Kolozsvár**
for the city. Have a native speaker check RO/HU before shipping copy changes.

## SEO is product surface here, not boilerplate

The rendered page is **~19 words**. Confirm with:

```bash
curl -s https://hangamacrame.com/en/ | node -e '…strip tags…'
```

Because there is almost no text, the JSON-LD `@graph` in `app/[lang]/layout.tsx`
is the only thing telling a machine what this business is. Treat it as content.
It is intentionally fuller than a normal marketing page's.

Deliberately absent, do not "complete" them:

- `aggregateRating` — the 5.0/15 belongs to Google's reviews. Restating it as
  first-party markup breaches Google's guidelines and risks a manual action.
- email, price range — not verified.

No amount of metadata makes a 19-word page rank. That is phase 2's job.

## Adding a locale

1. `LOCALES` and `DICTIONARIES` in `app/dictionaries.ts`
2. `alternates.languages` in `app/[lang]/layout.tsx` **and** `app/(redirect)/layout.tsx`
3. `openGraph.locale` map in `app/[lang]/layout.tsx`
4. Generate `public/og-<lang>.png` (1200×630, rendered in a browser so it uses
   real Fraunces — see git history for the script)
5. `urlList` in `.github/workflows/deploy.yml`

## Design

`.superdesign/design-system.md` is the source of truth: palette, the three
type roles, motion. Tokens live in the `@theme` block of `app/globals.css`.

- Ground `#203732` is sampled from the client's own logo — 97% of its ink.
- Brass `#c9a76b` is the only accent and is rationed on purpose.
- Fraunces is the headline **only**. Space Mono for small caps labels.
- Every animation needs a `prefers-reduced-motion` fallback.
- The page must fit one viewport with no scrolling; the big gaps clamp against
  `vh` because short laptops are a height problem, not a width one.

Comments in this codebase record **rejected** alternatives — a removed
feTurbulence grain layer, the omitted `aggregateRating`, why the redirect stub
uses a plain `<a>`. Read them before overriding a decision that looks odd.

## Deploy

Push to `main` → Actions builds → GitHub Pages → IndexNow pings Bing.

`public/` carries `CNAME`, `.nojekyll` (without it Pages' Jekyll drops
`_next/`), the IndexNow key file, and `llms.txt`.

The IndexNow job is `continue-on-error` on purpose: it is a notification about
the site, not part of shipping it.

DNS is on Cloudflare, records **grey-cloud (DNS only)** — proxying would break
GitHub's TLS certificate issuance. Analytics is therefore the manual Cloudflare
snippet, not proxy injection.
