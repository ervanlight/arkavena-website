// =========================================
// ARKAVENA — Admin session auth
// =========================================
// Minimal session-based gate for /admin/*. A single shared password
// (ADMIN_PASSWORD, server-only env var — never NEXT_PUBLIC_) exchanges for a
// signed, expiring session cookie. Uses the Web Crypto API (globalThis.crypto)
// rather than node:crypto so the same code works in both the Node runtime and
// Next.js Edge middleware runtime without a build-time branch.
//
// This is intentionally simple (one shared password, no per-user accounts) —
// scoped to close an active production exposure quickly. If per-user admin
// accounts are ever needed, replace this with real auth (e.g. Supabase Auth,
// whose env var slots already exist in .env.example but were never wired up).

export const ADMIN_SESSION_COOKIE = "arkavena_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

interface SessionPayload {
  iat: number;
  exp: number;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.trim() === "") {
    throw new Error(
      "ADMIN_SESSION_SECRET is not configured — admin session signing is unavailable until it is set."
    );
  }
  return secret;
}

/** Constant-time string comparison — avoids leaking password length/prefix via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  if (aBytes.length !== bBytes.length) {
    // Still walk a fixed number of comparisons so failure on length alone
    // isn't distinguishably faster.
    let diffOnMismatch = 0;
    for (let i = 0; i < aBytes.length; i++) {
      diffOnMismatch |= aBytes[i] ^ (bBytes[i % (bBytes.length || 1)] ?? 0);
    }
    return diffOnMismatch === -1; // always false; forces the loop to run without an unused binding
  }
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
  return diff === 0;
}

/**
 * Checks a submitted password against ADMIN_PASSWORD (server-only env var).
 * Returns false (never throws) if the env var isn't configured — a missing
 * password must never be treated as "any password is valid."
 */
export function checkAdminPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.trim() === "") return false;
  if (!candidate) return false;
  return timingSafeEqual(candidate, expected);
}

/** Issues a signed, expiring session token to store in ADMIN_SESSION_COOKIE. */
export async function createSessionToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { iat: now, exp: now + SESSION_TTL_SECONDS };
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const key = await hmacKey(getSessionSecret());
  const signature = await crypto.subtle.sign("HMAC", key, payloadBytes);
  return `${base64UrlEncode(payloadBytes)}.${base64UrlEncode(new Uint8Array(signature))}`;
}

/** Verifies a session token's signature and expiry. Never throws. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadPart, signaturePart] = parts;

  try {
    const payloadBytes = base64UrlDecode(payloadPart);
    const signatureBytes = base64UrlDecode(signaturePart);
    const key = await hmacKey(getSessionSecret());
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as BufferSource,
      payloadBytes as BufferSource
    );
    if (!valid) return false;

    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    return typeof payload.exp === "number" && payload.exp > now;
  } catch {
    return false;
  }
}
