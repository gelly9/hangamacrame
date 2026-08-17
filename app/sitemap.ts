import type { MetadataRoute } from "next";
import { LOCALES, SITE } from "./dictionaries";

export const dynamic = "force-static";

/**
 * Only the three locale pages. `/` is a noindex redirect stub, so listing it
 * would invite Google to index a page that immediately bounces.
 *
 * Each entry declares the full alternates set so the hreflang cluster is
 * stated in the sitemap as well as in the page head — Google prefers both
 * agreeing, and it is how it resolves which locale to serve to whom.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    LOCALES.map((code) => [code, `${SITE}/${code}/`]),
  );

  return LOCALES.map((lang) => ({
    url: `${SITE}/${lang}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: lang === "en" ? 1 : 0.8,
    alternates: { languages: { ...languages, "x-default": `${SITE}/en/` } },
  }));
}
