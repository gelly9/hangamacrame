import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Mono } from "next/font/google";
import {
  DICTIONARIES,
  GBP,
  LINKS,
  LOCALES,
  SITE,
  type Locale,
} from "../dictionaries";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
      images: [
        { url: `/og-${lang}.png`, width: 1200, height: 630, alt: "Hanga Macrame" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.htmlTitle,
      description: t.htmlDescription,
      images: [`/og-${lang}.png`],
    },
  };
}

/**
 * Structured data — and on this site, the load-bearing part of the page.
 *
 * The rendered page contains 19 words of text. Everything a machine can learn
 * about the business comes from this graph, so it is deliberately fuller than
 * a marketing page's would be.
 *
 * Every value is verified against the Google Business Profile or the public
 * channels in `sameAs`. Still deliberately absent:
 *   - aggregateRating: the 5.0/15 belongs to Google's reviews. Restating it as
 *     first-party markup breaches Google's guidelines and risks a penalty.
 *   - email, price range: not known, and inventing them is worse than omitting.
 */
function jsonLd(lang: Locale) {
  const t = DICTIONARIES[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // LocalBusiness rather than plain Organization now that the Business
        // Profile confirms a street address, phone and opening hours.
        "@type": "LocalBusiness",
        "@id": `${SITE}/#organization`,
        name: "Hanga Macrame",
        url: SITE,
        description: t.htmlDescription,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/icon-512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE}/og-${lang}.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: GBP.street,
          postalCode: GBP.postalCode,
          addressLocality: GBP.locality,
          addressCountry: GBP.country,
        },
        telephone: GBP.telephone,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: GBP.opens,
          closes: GBP.closes,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GBP.lat,
          longitude: GBP.lng,
        },
        knowsLanguage: ["en", "ro", "hu"],
        // The visible page carries 19 words, so this graph is the only thing
        // telling a machine what the business actually is. Every term below is
        // verifiable from the public channels linked in sameAs.
        knowsAbout: [
          "Macramé",
          "Macramé wall hangings",
          "Macramé plant hangers",
          "Macramé patterns",
          "Macramé tutorials",
          "Fibre art",
          "Handmade home decor",
        ],
        founder: {
          "@type": "Person",
          "@id": `${SITE}/#hanga`,
          name: "Hanga",
          jobTitle: "Macramé artist",
          worksFor: { "@id": `${SITE}/#organization` },
          sameAs: LINKS.map((l) => l.href),
        },
        // The Google Business Profile is listed alongside the social profiles
        // so Google can resolve site, socials and map listing to one entity.
        sameAs: [...LINKS.map((l) => l.href), GBP.url],
        hasMap: GBP.url,
        location: {
          "@type": "Place",
          name: "Hanga Macrame",
          hasMap: GBP.url,
          address: {
            "@type": "PostalAddress",
            streetAddress: GBP.street,
            postalCode: GBP.postalCode,
            addressLocality: GBP.locality,
            addressCountry: GBP.country,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: GBP.lat,
            longitude: GBP.lng,
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Hanga Macrame",
        inLanguage: lang,
        publisher: { "@id": `${SITE}/#organization` },
      },
    ],
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
      className={`${fraunces.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd(lang as Locale)),
          }}
        />
        {/* Cloudflare Web Analytics. Installed manually rather than injected by
            the proxy: the DNS records are grey-cloud so GitHub can hold the TLS
            certificate, which means Cloudflare never sees the HTML. No cookies,
            so no consent banner is needed. The token is public by design. */}
        {/* type="module" is deferred by spec, so this is not actually a
            render-blocking sync script — the rule does not account for it. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "b30928836df946e99499b8564a09d4f9"}'
        />
      </body>
    </html>
  );
}
