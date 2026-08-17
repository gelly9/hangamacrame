# Pages — dependency trees

## /[lang]  (/en/, /ro/, /hu/) — the design target
Entry: `app/[lang]/page.tsx`
Dependencies:
- `app/knot-net.tsx`            (KnotRule — decorative SVG rule)
- `app/dictionaries.ts`         (all copy for en/ro/hu, LINKS array, SITE const)
- `app/globals.css`             (via the layout — tokens + keyframes)
- `app/[lang]/layout.tsx`       (root layout: html/body, fonts, metadata)
- `public/logo.webp`            (brand lockup, rendered through next/image)

Context bundle for design calls (all files < 900 lines, pass whole):
`app/[lang]/page.tsx`, `app/knot-net.tsx`, `app/dictionaries.ts`,
`app/[lang]/layout.tsx`, `app/globals.css`, `.superdesign/design-system.md`

## /  (redirect stub — not a design target)
Entry: `app/(redirect)/page.tsx`
Dependencies:
- `app/(redirect)/layout.tsx`
- `app/dictionaries.ts` (SITE only)
