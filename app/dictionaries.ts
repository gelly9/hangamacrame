export const LOCALES = ["en", "ro", "hu"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = {
  htmlTitle: string;
  htmlDescription: string;
  eyebrow: string;
  /** Split across two lines in the display face. */
  headline: [string, string];
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
      "Handmade macramé wall art, plant hangers and patterns by Hanga, hand-knotted in Cluj-Napoca. Tutorials on YouTube and Patreon. The new website is on its way.",
    eyebrow: "New website coming soon",
    headline: ["Something is being", "tied together."],
    footer: "Hand-knotted",
  },
  ro: {
    htmlTitle: "Hanga Macrame — artă murală înnodată manual, din Cluj-Napoca",
    htmlDescription:
      "Artă murală macrame lucrată manual, suporturi pentru plante și modele de Hanga, înnodate la Cluj-Napoca. Tutoriale pe YouTube și Patreon. Noul site vine curând.",
    eyebrow: "Noul site, în curând",
    headline: ["Se înnoadă", "ceva nou."],
    footer: "Înnodat manual",
  },
  hu: {
    htmlTitle: "Hanga Macrame — kézzel csomózott faldísz Kolozsvárról",
    htmlDescription:
      "Kézzel csomózott makramé faldíszek, növénytartók és minták Hangától, Kolozsváron. Útmutatók a YouTube-on és a Patreonon. Az új weboldal hamarosan érkezik.",
    eyebrow: "Hamarosan új weboldal",
    headline: ["Csomóról csomóra", "készül valami."],
    footer: "Kézzel csomózva",
  },
};

export const LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/hanga.macrame/",
    icon: "instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@hangamacrame",
    icon: "youtube",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/hanga.macrame",
    icon: "facebook",
  },
  {
    name: "Patreon",
    href: "https://www.patreon.com/HangaMacrame",
    icon: "patreon",
  },
] as const;

export const SITE = "https://hangamacrame.com";

/**
 * Verified from the Google Business Profile. These MUST stay byte-identical
 * to what the profile shows — mismatched name/address/phone between a site and
 * its listing actively harms local ranking, which is the opposite of the point.
 */
export const GBP = {
  url: "https://maps.app.goo.gl/xFu1bfcvhmfS2C3cA",
  lat: 46.7767743,
  lng: 23.6086345,
  street: "Bulevardul 21 Decembrie 1989 140",
  postalCode: "400689",
  locality: "Cluj-Napoca",
  country: "RO",
  telephone: "+40754336703",
  /** Identical every day on the profile, so one specification covers the week. */
  opens: "09:00",
  closes: "22:00",
} as const;
