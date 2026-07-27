import * as React from "react";
import { siteConfig, isConfigured } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/contact/whatsapp";
import { Callout } from "@/components/content/blocks/Callout";

export interface ConsultationChannelsProps {
  whatsappMessage: string;
}

/**
 * Renders only the contact channels that are actually configured. No channel
 * is ever rendered with a placeholder or empty value (ARCHITECTURE.md Batch
 * 01 §8.5: "Jangan menampilkan teks kosong seperti WhatsApp: -").
 *
 * When zero channels are configured — the current real state (no verified
 * WhatsApp number, email, or lead-delivery provider) — this renders an
 * honest notice instead of a broken or fake contact option. This is the
 * BLOCKED state referenced in the Batch 01 report: consultation and contact
 * pages have no working delivery destination until the owner supplies one.
 */
export function ConsultationChannels({ whatsappMessage }: ConsultationChannelsProps) {
  const whatsappUrl = buildWhatsAppUrl({
    number: siteConfig.whatsApp,
    message: whatsappMessage,
  });
  const hasPhone = isConfigured(siteConfig.phone);
  const hasEmail = isConfigured(siteConfig.businessEmail);

  const channels: { label: string; href: string; value: string }[] = [];
  if (whatsappUrl) {
    channels.push({ label: "WhatsApp", href: whatsappUrl, value: siteConfig.whatsApp });
  }
  if (hasPhone) {
    channels.push({ label: "Telepon", href: `tel:${siteConfig.phone}`, value: siteConfig.phone });
  }
  if (hasEmail) {
    channels.push({
      label: "Email",
      href: `mailto:${siteConfig.businessEmail}`,
      value: siteConfig.businessEmail,
    });
  }

  if (channels.length === 0) {
    return (
      <Callout tone="warning" title="Jalur kontak langsung belum tersedia">
        <p>
          Nomor WhatsApp, telepon, dan email resmi Arkavena belum
          dikonfigurasi di situs ini. Halaman ini akan diperbarui begitu jalur
          kontak resmi tersedia.
        </p>
      </Callout>
    );
  }

  return (
    <ul className="my-6 flex flex-col gap-3">
      {channels.map((channel) => (
        <li key={channel.label}>
          <a
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-md border border-[#E8DED0] bg-white px-4 py-2.5 font-medium text-[#0E1B26] transition-colors hover:border-[#B88A4A]/40"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#B88A4A]">
              {channel.label}
            </span>
            <span>{channel.value}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
