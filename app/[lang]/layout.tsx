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
