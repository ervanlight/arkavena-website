// =========================================
// ARKAVENA — Feature Flags
// =========================================
// Controls which features are enabled/disabled.
// Default values are configured for zero-cost free mode.

export const features = {
  // Core modes
  FREE_MODE: process.env.FREE_MODE !== "false", // Default: true
  DEMO_MODE: process.env.DEMO_MODE === "true", // Default: false in production

  // External services
  ENABLE_AI: process.env.ENABLE_AI === "true",
  ENABLE_EMAIL_NOTIFICATIONS:
    process.env.ENABLE_EMAIL_NOTIFICATIONS === "true",
  ENABLE_VIDEO_UPLOAD: process.env.ENABLE_VIDEO_UPLOAD === "true",
  ENABLE_ORIGINAL_IMAGE_ARCHIVE:
    process.env.ENABLE_ORIGINAL_IMAGE_ARCHIVE === "true",
  ENABLE_EXTERNAL_STORAGE: process.env.ENABLE_EXTERNAL_STORAGE === "true",
  ENABLE_CUSTOM_DOMAIN: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN_ENABLED === "true",
  ENABLE_LIVE_PROJECTVIEW: process.env.ENABLE_LIVE_PROJECTVIEW === "true",
  ENABLE_PUBLIC_REGISTRATION:
    process.env.ENABLE_PUBLIC_REGISTRATION === "true",
  ENABLE_ADVANCED_ANALYTICS:
    process.env.ENABLE_ADVANCED_ANALYTICS === "true",

  // Database
  SUPABASE_CONFIGURED: Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),

  // Analytics — the actual vendor scripts (src/app/layout.tsx,
  // src/components/shared/analytics-scripts.tsx) read NEXT_PUBLIC_GTM_ID and
  // NEXT_PUBLIC_GA_MEASUREMENT_ID directly; these flags exist only for code
  // that needs a plain boolean without importing the layout logic.
  GTM_CONFIGURED: Boolean(process.env.NEXT_PUBLIC_GTM_ID),
  GA4_CONFIGURED: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  GOOGLE_ADS_CONFIGURED: Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  META_PIXEL_CONFIGURED: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),

  // Contact
  WHATSAPP_CONFIGURED: Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  BOOKING_CONFIGURED: Boolean(process.env.NEXT_PUBLIC_BOOKING_URL),
} as const;

// Storage limits
export const storageLimits = {
  maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB || "5", 10),
  maxImageDimension: parseInt(process.env.MAX_IMAGE_DIMENSION || "4096", 10),
  maxFilesPerProject: parseInt(process.env.MAX_FILES_PER_PROJECT || "50", 10),
  maxTotalProjectMediaMB: parseInt(
    process.env.MAX_TOTAL_PROJECT_MEDIA_MB || "200",
    10
  ),
  maxVideoSizeMB: parseInt(process.env.MAX_VIDEO_SIZE_MB || "50", 10),
  acceptedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  acceptedDocumentTypes: ["application/pdf"],
  acceptedVideoTypes: ["video/mp4", "video/webm"],
} as const;

// Check if running in demo/mock mode
export function isDemoMode(): boolean {
  return features.DEMO_MODE || !features.SUPABASE_CONFIGURED;
}
