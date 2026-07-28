// =========================================
// ARKAVENA — TEMPORARY Conversion Fallback
// =========================================
// TEMPORARY. Owner-requested stopgap so /kontak and /konsultasi-proyek have
// at least one working conversion channel while no verified WhatsApp
// business number exists yet.
//
// This is deliberately NOT part of `businessFacts` (config/business.ts):
// that file feeds JSON-LD structured data, and this email has not been
// verified as a business fact in the same sense (address, phone, etc.) —
// it is only a manual inbox check, not a claim about the business entity.
// Keeping it separate means it is never accidentally emitted in schema.org
// markup.
//
// TO REMOVE ONCE WHATSAPP IS READY: set `temporaryFallbackEmail` to null.
// ConsultationChannels will then fall back to the honest
// "belum tersedia" notice automatically — no other code changes needed.
export const temporaryFallbackEmail: string | null = "admin@arkavena.com";
