import { describe, expect, it } from "vitest";
import {
  buildWhatsAppUrl,
  normalizeIndonesianNumber,
} from "@/lib/contact/whatsapp";

describe("normalizeIndonesianNumber", () => {
  it("mengubah awalan 0 menjadi 62", () => {
    expect(normalizeIndonesianNumber("081234567890")).toBe("6281234567890");
  });

  it("mempertahankan nomor yang sudah berawalan 62", () => {
    expect(normalizeIndonesianNumber("6281234567890")).toBe("6281234567890");
  });

  it("membuang karakter non-digit", () => {
    expect(normalizeIndonesianNumber("+62 812-3456-7890")).toBe(
      "6281234567890"
    );
  });
});

describe("buildWhatsAppUrl", () => {
  it("menghasilkan URL valid untuk nomor yang benar", () => {
    const url = buildWhatsAppUrl({ number: "081234567890" });
    expect(url).toBe("https://wa.me/6281234567890");
  });

  it("meng-encode prefilled message", () => {
    const url = buildWhatsAppUrl({
      number: "081234567890",
      message: "Halo & terima kasih?",
    });
    expect(url).toContain("text=Halo%20%26%20terima%20kasih%3F");
  });

  it("mengembalikan null ketika nomor kosong", () => {
    expect(buildWhatsAppUrl({ number: "" })).toBeNull();
  });

  it("mengembalikan null ketika nomor null atau undefined", () => {
    expect(buildWhatsAppUrl({ number: null })).toBeNull();
    expect(buildWhatsAppUrl({ number: undefined })).toBeNull();
  });

  it("mengembalikan null untuk nomor yang jelas tidak valid", () => {
    expect(buildWhatsAppUrl({ number: "123" })).toBeNull();
  });

  it("tidak pernah menghasilkan fallback atau nomor dummy", () => {
    // No configuration path in buildWhatsAppUrl can produce a URL without a
    // caller-supplied number — this test documents that contract.
    expect(buildWhatsAppUrl({ number: undefined, message: "apa saja" })).toBeNull();
  });
});
