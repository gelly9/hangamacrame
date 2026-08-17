# Layouts

There is no nav, sidebar, header component, or footer component. The header and
footer are inline JSX inside `app/[lang]/page.tsx`.

Two ROOT layouts coexist via a route group, so each locale owns its own
`<html lang>` while `/` still resolves. There is deliberately no `app/layout.tsx`.

## Locale root layout
- Source: `app/[lang]/layout.tsx`
- Renders `<html lang={lang}>` + `<body>`, loads the three Google fonts, emits per-locale metadata, hreflang, icons and OG tags.

```tsx
import type { Metadata, Viewport } from "next";
import { Fraunces, Karla, Space_Mono } from "next/font/google";
import { DICTIONARIES, LOCALES, SITE, type Locale } from "../dictionaries";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#203732",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = DICTIONARIES[lang];

  return {
    metadataBase: new URL(SITE),
    title: t.htmlTitle,
    description: t.htmlDescription,
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        en: "/en/",
        ro: "/ro/",
        hu: "/hu/",
        "x-default": "/en/",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-64.png", type: "image/png", sizes: "64x64" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      url: `${SITE}/${lang}/`,
      siteName: "Hanga Macrame",
      locale: { en: "en_GB", ro: "ro_RO", hu: "hu_HU" }[lang],
      title: t.htmlTitle,
      description: t.htmlDescription,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hanga Macrame" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.htmlTitle,
      description: t.htmlDescription,
      images: ["/og.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${karla.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

## Redirect root layout (`/` only)
- Source: `app/(redirect)/layout.tsx`

```tsx
import type { Metadata } from "next";
import { SITE } from "../dictionaries";

/**
 * A second root layout, for `/` only. Route groups let this coexist with
 * app/[lang]/layout.tsx so each locale still owns its own <html lang>.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Hanga Macrame",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/en/",
    languages: {
      en: "/en/",
      ro: "/ro/",
      hu: "/hu/",
      "x-default": "/en/",
    },
  },
};

export default function RedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#203732",
          color: "#93a79f",
          font: "14px/1.5 ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
```

```tsx
/**
 * `/` always lands on English, the default language. Visitors switch to
 * Romanian or Hungarian from the language nav. The inline script makes the
 * hop instant; the meta refresh covers no-JS and is the path crawlers follow.
 */
export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <script
        dangerouslySetInnerHTML={{ __html: `location.replace("/en/");` }}
      />
      <a href="/en/" style={{ color: "#ede6da" }}>
        Continue to hangamacrame.com
      </a>
    </>
  );
}
```
