// =========================================
// ARKAVENA — Centralized Site Configuration
// =========================================
// Change these values to update company information across the entire website.
// No other files need to be edited for routine identity changes.

export const siteConfig = {
  // Brand Identity
  brandName: "ARKAVENA",
  legalCompanyName: "", // Fill when company is legally registered
  tagline: "Karya Terukur. Aset Terjaga.",
  englishDescriptor: "Construction & Facility Care",
  description:
    "ARKAVENA mengelola ruang lingkup, biaya, progres, mutu, dan perubahan pekerjaan secara terdokumentasi — untuk rumah, sekolah, gedung komersial, dan fasilitas operasional di Surabaya dan sekitarnya.",

  // Contact Information — leave empty string to hide from public website
  businessEmail: "",
  phone: "",
  whatsApp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  officeAddress: "", // Fill when office address is confirmed

  // Service Areas
  primaryServiceAreas: ["Surabaya", "Sidoarjo", "Gresik"],
  secondaryServiceAreas: [
    "Mojokerto",
    "Pasuruan",
    "Lamongan",
  ],
  serviceAreaNote:
    "Area lain di Jawa Timur untuk proyek yang memenuhi kualifikasi.",

  // External Links — leave empty string to hide from public website
  googleMapsUrl: "",
  googleBusinessProfileUrl: "",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",

  // Social Media — leave empty string to hide from public website
  socialUrls: {
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
  },

  // Domain Configuration
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://arkavena.com",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "",
  clientPortalUrl: process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || "",
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || "",

  // Operating Hours — leave empty string to hide from public website
  operatingHours: "",

  // Project Value Range
  maxProjectValue: "IDR 2 miliar",

  // Ecosystem Product Names
  ecosystem: {
    platform: "BuildTrust OS",
    clientPortal: "ProjectView",
    fieldApp: "SiteFlow",
    facilityRecord: "Facility Passport",
    scopeControl: "ScopeLock",
    qualityControl: "Quality Hold Point",
  },
} as const;

// Type for site config
export type SiteConfig = typeof siteConfig;

// Helper to check if a config value is available for public display
export function isConfigured(value: string | undefined): boolean {
  return Boolean(value && value.trim() !== "");
}
