import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

// Scoped to Batch 01's own surface: the 12 new content/pages files and the
// shared contact components it introduced. Pre-existing legacy pages
// (residential/*, facility-care/*, kebijakan-privasi, AssessmentLoadingFallback)
// still hardcode a dummy WhatsApp number and are out of this batch's scope —
// see the Batch 01 report for that finding.
const SCOPED_FILES = [
  "content/pages/home.mdx",
  "content/pages/tentang.mdx",
  "content/pages/mengapa-arkavena.mdx",
  "content/pages/cara-kerja.mdx",
  "content/pages/kontak.mdx",
  "content/pages/konsultasi-proyek.mdx",
  "content/pages/layanan.mdx",
  "content/pages/proyek.mdx",
  "content/pages/sektor.mdx",
  "content/pages/wilayah.mdx",
  "content/pages/faq.mdx",
  "content/pages/panduan.mdx",
  "src/components/content/blocks/CTA.tsx",
  "src/components/content/blocks/ConsultationChannels.tsx",
  "src/components/shared/whatsapp-floating-button.tsx",
  "src/lib/contact/whatsapp.ts",
];

// A bare Indonesian mobile number pattern (08xx / 62xx followed by 8+ digits),
// which is what a hardcoded dummy or real number would look like in source.
const PHONE_LIKE = /\b(?:\+?62|0)8\d{8,11}\b/;

describe("Batch 01 — no hardcoded phone/WhatsApp numbers", () => {
  for (const relativePath of SCOPED_FILES) {
    it(`${relativePath} tidak berisi nomor yang di-hardcode`, () => {
      const body = fs.readFileSync(
        path.join(process.cwd(), relativePath),
        "utf8"
      );
      expect(PHONE_LIKE.test(body)).toBe(false);
    });
  }
});
