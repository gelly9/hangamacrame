export const LOCALES = ["en", "ro", "hu"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = {
  htmlTitle: string;
  htmlDescription: string;
  eyebrow: string;
  /** Split across two lines in the display face. */
  headline: [string, string];
  linksLabel: string;
  footer: string;
};

/**
 * Each language keeps the knot metaphor, but idiomatically rather than
 * translated word for word. Hungarian uses Kolozsvár for the city.
 */
export const DICTIONARIES: Record<Locale, Dictionary> = {
  en: {
    htmlTitle: "Hanga Macrame — hand-knotted wall art from Cluj-Napoca",
    htmlDescription:
      "Handmade macramé wall art, patterns and tutorials by Hanga. A new home for the work is being built.",
    eyebrow: "New website coming soon",
    headline: ["Something is being", "tied together."],
    linksLabel: "In the meantime",
    footer: "Hand-knotted",
  },
  ro: {
    htmlTitle: "Hanga Macrame — artă murală înnodată manual, din Cluj-Napoca",
    htmlDescription:
      "Macrame lucrat manual, modele și tutoriale de Hanga. Se construiește o casă nouă pentru toate acestea.",
    eyebrow: "Noul site, în curând",
    headline: ["Se înnoadă", "ceva nou."],
    linksLabel: "Până atunci",
    footer: "Înnodat manual",
  },
  hu: {
    htmlTitle: "Hanga Macrame — kézzel csomózott faldísz Kolozsvárról",
    htmlDescription:
      "Kézzel készült makramé faldíszek, minták és útmutatók Hangától. Épül az új otthonuk.",
    eyebrow: "Hamarosan új weboldal",
    headline: ["Csomóról csomóra", "készül valami."],
    linksLabel: "Addig is",
    footer: "Kézzel csomózva",
  },
};

export const LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/hanga.macrame/" },
  { name: "YouTube", href: "https://www.youtube.com/@hangamacrame" },
  { name: "Facebook", href: "https://www.facebook.com/hanga.macrame" },
  { name: "Patreon", href: "https://www.patreon.com/HangaMacrame" },
];

export const SITE = "https://hangamacrame.com";
