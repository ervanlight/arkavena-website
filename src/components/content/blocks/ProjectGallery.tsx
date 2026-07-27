import * as React from "react";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectGalleryProps {
  title?: string;
  images: GalleryImage[];
}

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section className="my-8">
      {title && (
        <h3 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0E1B26]">
          {title}
        </h3>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-lg border border-[#E8DED0] bg-white">
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {image.caption && (
              <figcaption className="px-4 py-3 text-sm text-[#68757D]">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
