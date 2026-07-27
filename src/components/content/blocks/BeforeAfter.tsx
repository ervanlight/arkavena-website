import * as React from "react";
import Image from "next/image";

export interface BeforeAfterProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption?: string;
}

/**
 * Deliberately a static side-by-side comparison rather than an interactive
 * slider — MDX content stays server-rendered and free of client components.
 */
export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  return (
    <figure className="my-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Sebelum", image: before },
          { label: "Sesudah", image: after },
        ].map(({ label, image }) => (
          <div
            key={label}
            className="overflow-hidden rounded-lg border border-[#E8DED0] bg-white"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#68757D]">
              {label}
            </p>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-[#68757D]">{caption}</figcaption>
      )}
    </figure>
  );
}
