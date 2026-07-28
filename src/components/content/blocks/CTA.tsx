import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/contact/whatsapp";
import type { ContentItem } from "@/schemas/content-types";

export interface CTALink {
  label: string;
  href: string;
  external?: boolean;
}

export interface CTAProps {
  heading?: string;
  body?: string;
  primary: CTALink;
  secondary?: CTALink | null;
}

function CTAButton({
  link,
  className,
}: {
  link: CTALink;
  className: string;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function CTA({ heading, body, primary, secondary }: CTAProps) {
  return (
    <section className="my-10 rounded-lg bg-[#1C2D38] px-6 py-8 text-white sm:px-8">
      {heading && (
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
          {heading}
        </h2>
      )}
      {body && <p className="mt-2 max-w-2xl text-white/80">{body}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <CTAButton
          link={primary}
          className="inline-flex items-center rounded-md bg-[#B88A4A] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#a2793f]"
        />
        {secondary && (
          <CTAButton
            link={secondary}
            className="inline-flex items-center rounded-md border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          />
        )}
      </div>
    </section>
  );
}

/**
 * CTA driven by the page's own conversion frontmatter. When a WhatsApp
 * number is configured, the primary button opens WhatsApp with the page's
 * prefilled message; the frontmatter href is only ever used as the fallback
 * when no number is configured (ARCHITECTURE.md Batch 01 §11: the number
 * always comes from business config, never from frontmatter).
 */
export function ContentCTA({ item }: { item: ContentItem }) {
  const whatsAppUrl = buildWhatsAppUrl({
    number: siteConfig.whatsApp,
    message: item.conversion.primaryCta.whatsappMessage,
  });

  const primary: CTALink = whatsAppUrl
    ? { label: item.conversion.primaryCta.label, href: whatsAppUrl, external: true }
    : item.conversion.primaryCta;

  return (
    <CTA
      heading="Bahas kebutuhan proyek Anda"
      body="Diskusikan ruang lingkup, target biaya, dan jadwal sebelum pekerjaan dimulai."
      primary={primary}
      secondary={item.conversion.secondaryCta}
    />
  );
}
