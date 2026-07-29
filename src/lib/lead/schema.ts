import { z } from "zod";
import { ALLOWED_PARAMS } from "@/lib/landing/attribution";

/**
 * Server-side validation contract for landing-page lead submissions
 * (Batch 12 §17). Every field here is re-validated on the server — the
 * client form must never be trusted alone.
 */
export const attributionSchema = z
  .object(
    Object.fromEntries(
      ALLOWED_PARAMS.map((key) => [key, z.string().max(200).optional()])
    ) as Record<(typeof ALLOWED_PARAMS)[number], z.ZodOptional<z.ZodString>>
  )
  .extend({
    landingPage: z.string().max(200).optional(),
    firstSeenAt: z.string().max(64).optional(),
  })
  .partial();

export const leadPayloadSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(120),
  phone: z
    .string()
    .trim()
    .min(9, "Nomor telepon tidak valid")
    .max(20)
    .regex(/^[0-9+()\s-]+$/, "Nomor telepon tidak valid"),
  message: z.string().trim().max(1000).optional().default(""),
  campaign: z.string().trim().min(1).max(120),
  pagePath: z.string().trim().min(1).max(200),
  attribution: attributionSchema.optional().default({}),
  // Honeypot field: real users never fill this in. Any non-empty value is
  // treated as a bot submission and silently rejected server-side.
  companyWebsite: z.string().max(200).optional().default(""),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;
