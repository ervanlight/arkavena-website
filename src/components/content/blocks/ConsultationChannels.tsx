import * as React from "react";
import { siteConfig, isConfigured } from "@/config/site";
import { temporaryFallbackEmail } from "@/config/temporary-contact";
import { buildWhatsAppUrl } from "@/lib/contact/whatsapp";
import { Callout } from "@/components/content/blocks/Callout";

export interface ConsultationChannelsProps {
  whatsappMessage: string;
}

interface Channel {
  label: string;
  href: string;
  value: string;
  temporary?: boolean;
}

/**
 * Renders only the contact channels that are actually configured. No channel
 * is ever rendered with a placeholder or empty value (ARCHITECTURE.md Batch
 * 01 §8.5: "Jangan menampilkan teks kosong seperti WhatsApp: -").
 *
 * When no verified channel exists, this falls back to
 * `temporaryFallbackEmail` (config/temporary-contact.ts) — an explicit,
 * owner-requested stopgap, clearly labeled "sementara" in the UI. When that
 * is also unset, it renders an honest "belum tersedia" notice instead of a
 * broken or fake contact option.
 */
export function ConsultationChannels({ whatsappMessage }: ConsultationChannelsProps) {
  const whatsappUrl = buildWhatsAppUrl({
    number: siteConfig.whatsApp,
    message: whatsappMessage,
  });
  const hasPhone = isConfigured(siteConfig.phone);
  const hasEmail = isConfigured(siteConfig.businessEmail);

  const channels: Channel[] = [];
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

  // Only reached when no verified channel exists — never displaces a real one.
  if (channels.length === 0 && temporaryFallbackEmail) {
    channels.push({
      label: "Email (sementara)",
      href: `mailto:${temporaryFallbackEmail}`,
      value: temporaryFallbackEmail,
      temporary: true,
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
    <>
      {channels.some((channel) => channel.temporary) && (
        <p className="mb-3 text-xs font-medium text-[#A76B1F]">
          Kontak WhatsApp resmi belum tersedia. Untuk saat ini, gunakan email
          di bawah — halaman ini akan diperbarui begitu nomor WhatsApp resmi
          aktif.
        </p>
      )}
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
    </>
  );
}
