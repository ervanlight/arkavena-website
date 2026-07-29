"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConsultationChannels } from "@/components/content/blocks/ConsultationChannels";
import { trackLandingEvent } from "@/lib/landing/analytics";
import { captureAttribution, readAttribution } from "@/lib/landing/attribution";
import { GENERIC_WHATSAPP_PREFILL } from "@/lib/contact/whatsapp";

export interface LandingLeadFormProps {
  campaign: string;
  pagePath: string;
  thankYouPath: string;
  whatsappMessage: string | null;
}

type FormState = "idle" | "submitting" | "error";

/**
 * Reusable lead-capture form for /lp/* landing pages (Batch 12 §17).
 *
 * `generate_lead` fires only after the server confirms delivery
 * (`{ delivered: true }` from /api/lead) — never on click, never on page
 * view. When delivery is unavailable (no LEAD_WEBHOOK_URL configured yet,
 * or the request fails), this shows the same honest fallback used
 * elsewhere on the site (ConsultationChannels) instead of a fake success
 * message.
 */
export function LandingLeadForm({
  campaign,
  pagePath,
  thankYouPath,
  whatsappMessage,
}: LandingLeadFormProps) {
  const router = useRouter();
  const [state, setState] = React.useState<FormState>("idle");
  const [hasStarted, setHasStarted] = React.useState(false);
  const submissionId = React.useRef(crypto.randomUUID()).current;

  React.useEffect(() => {
    captureAttribution(window.location.search, pagePath);
  }, [pagePath]);

  const handleFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackLandingEvent("form_start", { campaign, page_path: pagePath });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");

    const form = new FormData(event.currentTarget);
    trackLandingEvent("form_submit_attempt", { campaign, page_path: pagePath });

    const attribution = readAttribution();

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          message: form.get("message") ?? "",
          campaign,
          pagePath,
          attribution,
          companyWebsite: form.get("companyWebsite") ?? "",
        }),
      });

      const result = (await response.json()) as { delivered: boolean; reason?: string };

      if (response.ok && result.delivered) {
        trackLandingEvent(
          "generate_lead",
          { campaign, page_path: pagePath },
          submissionId
        );
        router.push(thankYouPath);
        return;
      }

      setState("error");
      trackLandingEvent("form_submit_error", {
        campaign,
        page_path: pagePath,
        error_reason: result.reason ?? "unknown",
      });
    } catch {
      setState("error");
      trackLandingEvent("form_submit_error", {
        campaign,
        page_path: pagePath,
        error_reason: "network_error",
      });
    }
  };

  if (state === "error") {
    return (
      <div className="rounded-lg border border-[#E8DED0] bg-white p-6">
        <p className="mb-4 text-sm text-[#0E1B26]">
          Formulir belum dapat dikirim otomatis saat ini. Silakan hubungi kami
          langsung melalui salah satu jalur berikut — kebutuhan Anda tetap
          kami tindaklanjuti.
        </p>
        <ConsultationChannels whatsappMessage={whatsappMessage ?? GENERIC_WHATSAPP_PREFILL} />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      className="flex flex-col gap-4 rounded-lg border border-[#E8DED0] bg-white p-6"
    >
      {/* Honeypot — hidden from real users, never rendered visibly. */}
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <Input name="name" label="Nama" placeholder="Nama Anda" required maxLength={120} />
      <Input
        name="phone"
        type="tel"
        label="Nomor Telepon / WhatsApp"
        placeholder="08xxxxxxxxxx"
        required
        maxLength={20}
      />
      <div className="w-full">
        <label htmlFor="lead-message" className="mb-2 block text-sm font-medium text-[#0E1B26]">
          Kebutuhan Anda (opsional)
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          maxLength={1000}
          placeholder="Ceritakan singkat rencana proyek Anda"
          className="flex w-full rounded-md border border-[#E8DED0] bg-white px-3 py-2 text-sm text-[#0E1B26] placeholder:text-[#68757D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A]"
        />
      </div>
      <Button type="submit" size="lg" isLoading={state === "submitting"}>
        Konsultasikan Sekarang
      </Button>
    </form>
  );
}
