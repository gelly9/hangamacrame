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
