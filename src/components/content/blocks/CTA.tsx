import * as React from "react";
import Link from "next/link";
import type { ContentItem } from "@/schemas/content-types";

export interface CTAProps {
  heading?: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
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
        <Link
          href={primary.href}
          className="inline-flex items-center rounded-md bg-[#B88A4A] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#a2793f]"
        >
          {primary.label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className="inline-flex items-center rounded-md border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  );
}

/** CTA driven by the page's own conversion frontmatter. */
export function ContentCTA({ item }: { item: ContentItem }) {
  return (
    <CTA
      heading="Bahas kebutuhan proyek Anda"
      body="Diskusikan ruang lingkup, target biaya, dan jadwal sebelum pekerjaan dimulai."
      primary={item.conversion.primaryCta}
      secondary={item.conversion.secondaryCta}
    />
  );
}
