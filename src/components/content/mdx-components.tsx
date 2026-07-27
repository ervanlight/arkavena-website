// =========================================
// ARKAVENA — MDX Component Allowlist
// =========================================
// This map IS the allowlist (ARCHITECTURE.md §9.6 / §13 of the phase brief).
// Anything absent from ALLOWED_MDX_COMPONENTS is unavailable inside MDX, and
// scripts/validate-content.ts additionally rejects raw <script>, <iframe>,
// inline styles and hand-written JSON-LD in content bodies.

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";

import type { AllowedMdxComponent } from "@/config/mdx-allowlist";
import { Callout } from "@/components/content/blocks/Callout";
import { Checklist } from "@/components/content/blocks/Checklist";
import { CostTable } from "@/components/content/blocks/CostTable";
import { ProcessSteps } from "@/components/content/blocks/ProcessSteps";
import { RiskMatrix } from "@/components/content/blocks/RiskMatrix";
import { FAQList } from "@/components/content/blocks/FAQList";
import { ProjectGallery } from "@/components/content/blocks/ProjectGallery";
import { BeforeAfter } from "@/components/content/blocks/BeforeAfter";
import { SourceNote } from "@/components/content/blocks/SourceNote";
import { RelatedContent } from "@/components/content/blocks/RelatedContent";
import { CTA } from "@/components/content/blocks/CTA";

const allowedBlocks: Record<AllowedMdxComponent, React.ComponentType<never>> = {
  Callout: Callout as React.ComponentType<never>,
  Checklist: Checklist as React.ComponentType<never>,
  CostTable: CostTable as React.ComponentType<never>,
  ProcessSteps: ProcessSteps as React.ComponentType<never>,
  RiskMatrix: RiskMatrix as React.ComponentType<never>,
  FAQList: FAQList as React.ComponentType<never>,
  ProjectGallery: ProjectGallery as React.ComponentType<never>,
  BeforeAfter: BeforeAfter as React.ComponentType<never>,
  SourceNote: SourceNote as React.ComponentType<never>,
  RelatedContent: RelatedContent as React.ComponentType<never>,
  CTA: CTA as React.ComponentType<never>,
};

type AnchorProps = React.ComponentPropsWithoutRef<"a">;

function MdxLink({ href = "", children, ...props }: AnchorProps) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className="font-medium text-[#0E1B26] underline underline-offset-2 hover:text-[#B88A4A]"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      rel="nofollow noopener noreferrer"
      target="_blank"
      className="font-medium text-[#0E1B26] underline underline-offset-2 hover:text-[#B88A4A]"
      {...props}
    >
      {children}
    </a>
  );
}

/** Typography for plain markdown output. */
const typography: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 mb-4 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#0E1B26]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-3 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0E1B26]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#0E1B26]"
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold text-[#0E1B26]" {...props} />
  ),
  p: (props) => (
    <p className="my-4 leading-relaxed text-[#26333C]" {...props} />
  ),
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-[#26333C]" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-[#26333C]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-[#B88A4A] pl-5 italic text-[#26333C]"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[#ECE8E1] px-1.5 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#0E1B26]"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-[#E8DED0] bg-white">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-[#E8DED0] px-4 py-3 font-semibold text-[#0E1B26]" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-[#E8DED0] px-4 py-3 text-[#26333C]" {...props} />
  ),
  a: MdxLink,
  img: (props) => {
    const { src, alt } = props as React.ComponentPropsWithoutRef<"img">;
    if (typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={800}
        className="my-6 h-auto w-full rounded-lg"
      />
    );
  },
};

export const mdxComponents: MDXComponents = {
  ...typography,
  ...(allowedBlocks as unknown as MDXComponents),
};
