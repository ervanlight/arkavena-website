// =========================================
// ARKAVENA — Verified Business Entity Facts
// =========================================
// ARCHITECTURE.md §9 / §12.5: nothing here may be invented. Every field is
// nullable, and null fields are stripped from JSON-LD rather than guessed.
// Only the owner may fill these values. Do not populate from marketing copy.

export interface PostalAddressFacts {
  streetAddress: string | null;
  addressLocality: string | null;
  addressRegion: string | null;
  postalCode: string | null;
  addressCountry: string;
}

export interface BusinessFacts {
  /** Registered legal entity name. Null until legally registered. */
  legalName: string | null;
  /** Public brand name — always present. */
  name: string;
  /** Verified physical address. Null until the owner confirms it. */
  address: PostalAddressFacts | null;
  /** E.164 telephone, e.g. "+6281234567890". Null until verified. */
  telephone: string | null;
  email: string | null;
  /** Verified geo coordinates. Never estimate these from a city name. */
  geo: { latitude: number; longitude: number } | null;
  /** Schema.org openingHoursSpecification entries. Empty until verified. */
  openingHours: string[];
  /** Business registration numbers (NIB, SBU, IUJK). Empty until documented. */
  identifiers: { name: string; value: string }[];
  /** Year founded. Null until confirmed. */
  foundingYear: number | null;
  /** Named areas served. Safe: these are service-area claims, not branches. */
  areaServed: string[];
  /** Verified social profiles used as schema.org sameAs. */
  sameAs: string[];
}

export const businessFacts: BusinessFacts = {
  legalName: null,
  name: "ARKAVENA",
  address: null,
  telephone: null,
  email: null,
  geo: null,
  openingHours: [],
  identifiers: [],
  foundingYear: null,
  areaServed: ["Surabaya", "Sidoarjo", "Gresik"],
  sameAs: [],
};

/**
 * Structured-data feature switches.
 * FAQ markup stays off until the owner confirms the FAQ blocks are visible on
 * the page and the answers are verified (ARCHITECTURE.md §12.5).
 */
export const schemaFlags = {
  enableFaqSchema: false,
  /**
   * A single business entity for the whole site. Never one LocalBusiness per
   * city — that is an explicit prohibition in ARCHITECTURE.md §9.
   */
  enableBusinessEntity: true,
} as const;

/** Stable JSON-LD node identifiers (ARCHITECTURE.md §12.5). */
export const SCHEMA_IDS = {
  organization: "#organization",
  website: "#website",
  business: "#business",
} as const;
