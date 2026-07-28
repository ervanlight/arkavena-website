import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  checkAdminPassword,
  createSessionToken,
  verifySessionToken,
} from "@/lib/admin-auth";

const ORIGINAL_PASSWORD = process.env.ADMIN_PASSWORD;
const ORIGINAL_SECRET = process.env.ADMIN_SESSION_SECRET;

beforeEach(() => {
  process.env.ADMIN_PASSWORD = "correct-horse-battery-staple";
  process.env.ADMIN_SESSION_SECRET = "test-session-secret-do-not-use-in-prod";
});

afterEach(() => {
  process.env.ADMIN_PASSWORD = ORIGINAL_PASSWORD;
  process.env.ADMIN_SESSION_SECRET = ORIGINAL_SECRET;
});

describe("checkAdminPassword", () => {
  it("menerima password yang benar", () => {
    expect(checkAdminPassword("correct-horse-battery-staple")).toBe(true);
  });

  it("menolak password yang salah", () => {
    expect(checkAdminPassword("wrong-password")).toBe(false);
  });

  it("menolak string kosong", () => {
    expect(checkAdminPassword("")).toBe(false);
  });

  it("tidak pernah menganggap valid ketika ADMIN_PASSWORD belum dikonfigurasi", () => {
    delete process.env.ADMIN_PASSWORD;
    expect(checkAdminPassword("apapun")).toBe(false);
    expect(checkAdminPassword("")).toBe(false);
  });

  it("password dengan panjang berbeda tetap ditolak dengan benar", () => {
    expect(checkAdminPassword("short")).toBe(false);
    expect(checkAdminPassword("this-is-a-much-longer-candidate-password")).toBe(false);
  });
});

describe("session token lifecycle", () => {
  it("token yang baru dibuat lolos verifikasi", async () => {
    const token = await createSessionToken();
    expect(await verifySessionToken(token)).toBe(true);
  });

  it("token kosong/undefined ditolak", async () => {
    expect(await verifySessionToken(undefined)).toBe(false);
    expect(await verifySessionToken(null)).toBe(false);
    expect(await verifySessionToken("")).toBe(false);
  });

  it("token dengan format salah (tanpa titik) ditolak", async () => {
    expect(await verifySessionToken("not-a-valid-token")).toBe(false);
  });

  it("token dengan signature yang dirusak ditolak", async () => {
    const token = await createSessionToken();
    const [payload] = token.split(".");
    const tampered = `${payload}.aW52YWxpZC1zaWduYXR1cmU`;
    expect(await verifySessionToken(tampered)).toBe(false);
  });

  it("token yang ditandatangani dengan secret berbeda ditolak (mencegah forge)", async () => {
    const token = await createSessionToken();
    process.env.ADMIN_SESSION_SECRET = "a-completely-different-secret";
    expect(await verifySessionToken(token)).toBe(false);
  });

  it("token kedaluwarsa ditolak", async () => {
    // Build an already-expired token manually using the same encoding the
    // module uses, without needing to wait 7 real days.
    const past = Math.floor(Date.now() / 1000) - 10;
    const payload = { iat: past - 1000, exp: past };
    const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, payloadBytes);
    const b64 = (bytes: Uint8Array) => {
      let binary = "";
      for (const byte of bytes) binary += String.fromCharCode(byte);
      return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    };
    const expiredToken = `${b64(payloadBytes)}.${b64(new Uint8Array(signature))}`;
    expect(await verifySessionToken(expiredToken)).toBe(false);
  });
});
