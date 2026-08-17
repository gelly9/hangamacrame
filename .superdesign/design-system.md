# Hanga Macrame — Design System

## Product context

A coming-soon page for **Hanga Macrame**, a working handmade-macramé business in
Cluj-Napoca, Romania. The business is **already trading** — only the website is new.
Hanga sells finished hand-knotted wall art and sells/teaches patterns, with a large
existing audience: ~136k on Facebook, ~50k on Instagram, a YouTube tutorial channel,
and a paid Patreon.

**The page's single job:** hold the brand with dignity for a few months, and send
existing and new visitors to the places where the work actually lives.

Live at https://hangamacrame.com — trilingual at `/en/`, `/ro/`, `/hu/`.
Roadmap: phase 2 = presentation site with gallery; phase 3 = Shopify webshop.

## Brand

The logo is hand-drawn line art: a macramé wall hanging (triangular frame, beads,
fringe) above a handwritten "Hanga Macrame" wordmark. **Always use the real white
logo** (`/logo.webp`) — never substitute a generic mark or set the name as type.

Everything about the visual language should read as **hand-made, quiet, and
material**: cord, knots, natural fibre, raking light on a workshop wall. It is
deliberately NOT the beige/cream/terracotta "boho macramé" cliché.

## Color — hard constraint

| Token | Hex | Role |
|---|---|---|
| `--color-ground` | `#203732` | page background. Brand green, sampled from the logo (97% of its ink) |
| `--color-ground-deep` | `#1a2e29` | deeper green for optional layering |
| `--color-cord` | `#ede6da` | primary text — warm cotton white. 9.7:1 (AAA) |
| `--color-cord-dim` | `#93a79f` | secondary text. 4.9:1 (AA) |
| `--color-brass` | `#c9a76b` | the ONLY accent. 5.6:1 (AA) |

**Do not introduce any other colour.** No gradients, no second accent, no
pink/purple/neon. Brass is rationed on purpose: eyebrow text, the travelling bead,
hover states, focus rings. If brass appears in more than ~3 places the page is wrong.

## Typography — hard constraint

- **Display: Fraunces** (variable serif). Headline only. Large, tight (`-0.02em`), leading ~1.06.
- **Body: Karla.** Default on `<body>`.
- **Utility: Space Mono.** All small labels: uppercase, 10–11px, letter-spacing `0.2em`–`0.28em`.

**Do not introduce any other typeface.** Reserve Fraunces for the headline — using
it for small utility text dilutes the one place it carries emotion.

## Layout

Single centered column, `max-w-2xl` (672px), `px-6` / `sm:px-10`, `text-center`.
Whole page fits one screen at 1280×860 with no scrolling. Only the `sm` (640px)
breakpoint is used. No cards, no borders, no shadows, no border-radius — flat
shapes on flat green. Generous vertical rhythm; whitespace is the main structural device.

## Motion

Restrained, one orchestrated entrance, then near-stillness:
- `.rise` — fade + 14px translate, staggered by inline `animationDelay` (logo 0.1s → footer).
- `.cord` — SVG `stroke-dashoffset` draw-on for the knot rule.
- `.knot` — small scale-in pop on each knot.
- `.bead` — the single ambient loop: a brass segment slides along the cord, 11s linear infinite.

**Everything must be neutralised under `prefers-reduced-motion: reduce`** — the bead
parks mid-rule rather than disappearing.

## Current page structure

header (language nav EN/RO/HU) → logo lockup → mono brass eyebrow → Fraunces
headline (2 lines) → KnotRule → mono dim label → **social links row** → mono footer.

## Known problem to solve

The **social links row** (Instagram / YouTube / Facebook / Patreon) is weak:

1. It is set in **Fraunces**, competing with the headline and reading as "more headline" rather than as actions.
2. Four identical items with four identical `↗` glyphs — repetitive, no hierarchy.
3. **No brand icons.** These are the most recognisable glyphs on the internet, rendered as words that must be read.
4. The four are weighted equally although they are not equal: Facebook ~136k, Instagram ~50k, YouTube = tutorials, Patreon = paid.

Any redesign must keep the palette, the three typefaces, the centered single-column
layout, and the real logo. Only the links row's form is in question.

## Accessibility floor

- Text contrast never below 4.5:1 on `#203732`.
- Visible brass focus ring (`:focus-visible`, 2px, 3px offset).
- Icon-only controls need accessible names.
- Reduced motion respected.
- `<html lang>` correct per locale; the language nav marks the current item with `aria-current`.
