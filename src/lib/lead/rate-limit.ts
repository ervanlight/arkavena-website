// =========================================
// ARKAVENA — Lead Endpoint Rate Limiter
// =========================================
// In-memory sliding-window limiter for /api/lead (audit finding I8,
// 2026-07-29: the form had a honeypot but nothing stopped a script from
// submitting thousands of requests back to back).
//
// This is intentionally dependency-free (CLAUDE.md rule 8) rather than a
// distributed limiter backed by Redis/Upstash: the counters live in the
// serverless function instance's memory, so they reset on cold start and
// aren't shared across concurrent instances. That's a real limitation, not
// a full defense — but it stops the common case (a single script hammering
// the endpoint from one connection) without adding infrastructure, and can
// be swapped for a shared store later if abuse patterns justify it.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map<string, number[]>();

/**
 * Returns true if `key` (typically a client IP) is still under the limit,
 * and records this call as one of its requests. Evicts timestamps older
 * than the window on every call so the map never grows unbounded.
 */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return true;
}

/** Best-effort client identifier from standard proxy headers (Vercel sets x-forwarded-for). */
export function clientKeyFromHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
