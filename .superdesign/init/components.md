# Components

Framework: **Next.js 16.3.1 (App Router, static export)** · React 19.2.8 · TypeScript
CSS: **Tailwind CSS v4** (CSS-first, `@theme` in `app/globals.css` — there is NO `tailwind.config.*`)
Component library: **none** — hand-rolled. No shadcn/Radix/MUI.

The project is a single-page trilingual coming-soon site. There is exactly one
reusable UI component; everything else is inline JSX on the page.

## KnotRule
- Source: `app/knot-net.tsx`
- Description: Decorative horizontal rule drawn as a macrame diamond-net chain, with a brass "bead" that animates along the cord on a loop.
- Props: `delay?: number` (seconds, staggers the draw-on animation)

```tsx
/**
 * A chain of macramé net diamonds, used as a horizontal rule.
 *
 * The logo is already a hanging, so this doesn't repeat one — it borrows the
 * structure instead. Two cords leave each knot, one arcing over and one under,
 * and meet again at the next knot: the diamond net you get from rows of square
 * knots.
 *
 * Each chain is a single continuous subpath, which matters: stroke dashing
 * restarts at every `M`, so the travelling brass bead below would stutter if
 * the arcs were separate subpaths. `pathLength` normalises both chains to 1000
 * units so the dash maths is independent of the real geometry.
 */

const VB_W = 1200;
const PERIOD = 60;
const COUNT = VB_W / PERIOD;
const AMP = 11;
const MID = 15;
const VB_H = MID * 2;
const PATH_LEN = 1000;
/** Bead length as a fraction of the normalised path — roughly one diamond. */
const BEAD = 52;

/** `dir` -1 arcs over each gap, +1 arcs under it. */
function chain(dir: number) {
  let d = `M 0 ${MID}`;
  for (let i = 0; i < COUNT; i++) {
    d += ` Q ${i * PERIOD + PERIOD / 2} ${MID + dir * AMP * 1.9} ${(i + 1) * PERIOD} ${MID}`;
  }
  return d;
}

export function KnotRule({ delay = 0 }: { delay?: number }) {
  const beadStart = delay + 1.6;

  return (
    <svg
      viewBox={`-4 0 ${VB_W + 8} ${VB_H}`}
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {[-1, 1].map((dir) => (
        <g key={dir}>
          {/* The cord itself, drawn on in one pass */}
          <path
            className="cord"
            d={chain(dir)}
            pathLength={PATH_LEN}
            fill="none"
            stroke="var(--color-cord)"
            strokeWidth={1.7}
            strokeLinecap="round"
            opacity={0.4}
            style={{
              strokeDasharray: PATH_LEN,
              strokeDashoffset: PATH_LEN,
              animationDelay: `${delay}s`,
              animationDuration: "2s",
            }}
          />
          {/* A brass bead sliding along it, forever */}
          <path
            className="bead"
            d={chain(dir)}
            pathLength={PATH_LEN}
            fill="none"
            stroke="var(--color-brass)"
            strokeWidth={2.1}
            strokeLinecap="round"
            style={{
              strokeDasharray: `${BEAD} ${PATH_LEN - BEAD}`,
              animationDelay: `${beadStart}s`,
            }}
          />
        </g>
      ))}

      {/* Interior crossings only — a knot on the open ends reads as a stray dot. */}
      {Array.from({ length: COUNT + 1 }, (_, i) => i)
        .filter((i) => i > 0 && i < COUNT)
        .map((i) => (
          <rect
            key={i}
            className="knot"
            x={i * PERIOD - 2.6}
            y={MID - 2.6}
            width={5.2}
            height={5.2}
            rx={1.2}
            transform={`rotate(45 ${i * PERIOD} ${MID})`}
            fill="var(--color-cord)"
            opacity={0.6}
            style={{ animationDelay: `${delay + 0.85 + i * 0.015}s` }}
          />
        ))}
    </svg>
  );
}
```
