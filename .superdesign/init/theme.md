# Theme

## Part 1 — Compact token summary

Palette derived from the client's own logo: `#203732` is 97% of the logo artwork's ink.

| Token | Value | Role | Contrast vs ground |
|---|---|---|---|
| `--color-ground` | `#203732` | page background (brand green) | — |
| `--color-ground-deep` | `#1a2e29` | deeper green, currently unused | 1.4 |
| `--color-cord` | `#ede6da` | primary text, cord white | **9.7 (AAA)** |
| `--color-cord-dim` | `#93a79f` | secondary/dim text | **4.9 (AA)** |
| `--color-brass` | `#c9a76b` | the ONLY accent; eyebrow, bead, hover, focus | **5.6 (AA)** |

Tailwind class names: `bg-ground text-cord text-cord-dim text-brass` etc.

**Fonts** (next/font/google, exposed as CSS vars):
- `--font-display` = **Fraunces** (variable serif) — h1 and the social links
- `--font-body` = **Karla** — body text, default on `<body>`
- `--font-mono` = **Space Mono** 400/700 — all small uppercase labels

**Type usage:** display 2.4rem→3.4rem, tracking `-0.02em`, leading 1.06. Mono labels are 10–11px, `uppercase`, tracking `0.2em`–`0.28em`.

**Layout:** single centered column, `max-w-2xl` (672px), `px-6` (`sm:px-10`), `text-center`.

**Radius:** essentially none. **Shadows:** none. **Breakpoint used:** `sm` (640px) only.

**Motion:** `.rise` (fade + 14px translate) staggered by inline `animationDelay`; `.cord` draw-on via `stroke-dashoffset`; `.knot` scale-in; `.bead` loops `bead-travel` 11s linear infinite. All neutralised under `prefers-reduced-motion: reduce`.

## Part 2 — Raw source

`app/globals.css` (full):

```css
@import "tailwindcss";

@theme {
  /* Built on the logo's own green (#203732, 97% of its ink). Natural cotton
     cord for text, and one brass thread as the only warm note. Contrast vs
     ground: cord 9.7 (AAA), dim 4.9 (AA), brass 5.6 (AA). */
  --color-ground: #203732;
  --color-ground-deep: #1a2e29;
  --color-cord: #ede6da;
  --color-cord-dim: #93a79f;
  --color-brass: #c9a76b;

  --font-display: var(--font-fraunces);
  --font-body: var(--font-karla);
  --font-mono: var(--font-space-mono);
}

html {
  background-color: var(--color-ground);
}

body {
  background-color: var(--color-ground);
  color: var(--color-cord);
  font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--color-brass);
  color: var(--color-ground);
}

:focus-visible {
  outline: 2px solid var(--color-brass);
  outline-offset: 3px;
  border-radius: 2px;
}

/* --- The knot rule: cords cross once, tie, and fray out. --- */

.cord {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: cord-draw 1.5s cubic-bezier(0.33, 0.9, 0.4, 1) forwards;
}

.knot {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: knot-tie 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* A bead sliding along the cord. Fades in once, then travels on a loop. */
.bead {
  opacity: 0;
  stroke-dashoffset: 0;
  animation:
    bead-appear 1.2s ease-out forwards,
    bead-travel 11s linear infinite;
}

.rise {
  opacity: 0;
  animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes cord-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes knot-tie {
  from {
    opacity: 0;
    scale: 0.2;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}

@keyframes bead-appear {
  to {
    opacity: 0.9;
  }
}

@keyframes bead-travel {
  to {
    stroke-dashoffset: -1000;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    translate: 0 14px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cord,
  .knot,
  .rise {
    animation: none;
    opacity: 1;
    scale: 1;
    translate: 0;
    stroke-dashoffset: 0;
  }

  /* Keep the brass accent, but park it mid-rule instead of travelling. */
  .bead {
    animation: none;
    opacity: 0.9;
    stroke-dashoffset: -474;
  }
}
```

There is **no `tailwind.config.ts`** — Tailwind v4 CSS-first. PostCSS:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phase 1 ships as a static site on GitHub Pages, which has no server.
  // Remove this (and `images.unoptimized`) when we move to a host with
  // serverless functions for the phase 3 shop.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```
