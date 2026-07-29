import { NextRequest, NextResponse } from "next/server";
import { leadPayloadSchema } from "@/lib/lead/schema";
import { checkRateLimit, clientKeyFromHeaders } from "@/lib/lead/rate-limit";

/**
 * Server-side lead delivery for /lp/* landing pages (Batch 12 §17).
 *
 * This is the first and only lead-delivery endpoint in the codebase — the
 * organic /konsultasi-proyek page has none (ARCHITECTURE.md Batch 01 §16
 * left it BLOCKED pending a verified contact channel). Do not create a
 * second one; point future lead forms here.
 *
 * Delivery target is LEAD_WEBHOOK_URL (.env.example), which is currently
 * unset in production. When unset, this returns an honest 503 rather than a
 * fake success — the client falls back to ConsultationChannels (WhatsApp /
 * email) instead of claiming the lead was sent (ARCHITECTURE.md §16:
 * "Jangan menampilkan fake success state").
 *
 * Rate-limited per client IP (src/lib/lead/rate-limit.ts, audit finding I8)
 * on top of the honeypot field below — neither is a substitute for the
 * other, a scripted submitter can fill the honeypot and stay under the
 * rate limit just as easily as it can skip both.
 */
export async function POST(request: NextRequest) {
  const clientKey = clientKeyFromHeaders(request.headers);
  if (!checkRateLimit(clientKey)) {
    return NextResponse.json(
      { delivered: false, reason: "rate_limited" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { delivered: false, reason: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = leadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { delivered: false, reason: "validation_error", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const lead = parsed.data;

  // Honeypot: bots fill every field, including ones hidden from real users.
  if (lead.companyWebsite.trim() !== "") {
    return NextResponse.json({ delivered: false, reason: "rejected" }, { status: 422 });
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { delivered: false, reason: "not_configured" },
      { status: 503 }
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        message: lead.message,
        campaign: lead.campaign,
        pagePath: lead.pagePath,
        attribution: lead.attribution,
        submittedAt: new Date().toISOString(),
        source: "landing_lead_form",
      }),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { delivered: false, reason: "delivery_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ delivered: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { delivered: false, reason: "delivery_failed" },
      { status: 502 }
    );
  }
}
