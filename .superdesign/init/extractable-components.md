# Extractable components

This project has **no layout components** in the usual sense — no NavBar, Sidebar,
Header or Footer components exist. The header and footer are inline JSX in
`app/[lang]/page.tsx`, so there is nothing worth extracting as a shared
`DraftComponent`. Component extraction (SOP Step 2.5) should be SKIPPED.

## Basic Components

### KnotRule
- Source: `app/knot-net.tsx`
- Category: basic
- Description: Decorative macrame diamond-net horizontal rule with a looping brass bead
- Extractable props: `delay` (number, default: 0)
- Hardcoded: all SVG geometry (COLS/PERIOD/AMP/MID), stroke colors via CSS vars, animation class names

## Not components, but the design target

The social links row is a plain `<ul>` built from the `LINKS` array in
`app/dictionaries.ts` and rendered inline in `app/[lang]/page.tsx`. It is the
element the user wants redesigned.
