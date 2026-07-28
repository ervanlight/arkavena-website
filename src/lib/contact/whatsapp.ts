// =========================================
// ARKAVENA — WhatsApp Link Helper
// =========================================
// Single source of the WhatsApp deep-link contract. The number always comes
// from business config, never from frontmatter, and there is no fallback or
// dummy number (Batch 01 §8.6, §11).

const WHATSAPP_BASE_URL = "https://wa.me/";

/**
 * Normalizes an Indonesian phone number to bare E.164 digits (no "+"), the
 * format wa.me expects: a leading "0" becomes "62", a leading "62" is kept,
 * anything else is returned digit-stripped as-is.
 */
export function normalizeIndonesianNumber(rawNumber: string): string {
  const digitsOnly = rawNumber.replace(/\D/g, "");
  if (digitsOnly.startsWith("0")) return `62${digitsOnly.slice(1)}`;
  return digitsOnly;
}

export interface BuildWhatsAppUrlOptions {
  /** Business WhatsApp number from config, or null/empty when not configured. */
  number: string | null | undefined;
  /** Prefilled message; may be null when the page has none. */
  message?: string | null;
}

/**
 * Builds a wa.me deep link, or returns null when no number is configured.
 * Never invents a number and never returns a broken link — callers must treat
 * `null` as "do not render a WhatsApp CTA".
 */
export function buildWhatsAppUrl({
  number,
  message,
}: BuildWhatsAppUrlOptions): string | null {
  if (!number || number.trim() === "") return null;

  const normalized = normalizeIndonesianNumber(number);
  if (normalized.length < 9) return null;

  const query = message && message.trim() !== ""
    ? `?text=${encodeURIComponent(message)}`
    : "";

  return `${WHATSAPP_BASE_URL}${normalized}${query}`;
}

export const GENERIC_WHATSAPP_PREFILL =
  "Halo Arkavena, saya ingin berkonsultasi mengenai rencana proyek konstruksi. Berikut gambaran singkat kebutuhan saya:";
