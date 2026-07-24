import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  href: string;
  imageUrl?: string;
  className?: string;
}

export function ProjectCard({ title, category, location, href, imageUrl, className }: ProjectCardProps) {
  return (
    <Link href={href} className={cn("group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg", className)}>
      <article className="h-full flex flex-col border border-[#C9C3B8] rounded-lg overflow-hidden bg-white hover:border-zinc-300 transition-colors">
        <div className="aspect-[4/3] w-full bg-[#C9C3B8]/20 relative overflow-hidden border-b border-zinc-100">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover"
             sizes="(max-width: 1200px) 100vw, 50vw" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#5B6570] text-sm">
              No image
            </div>
          )}
          {/* Subtle category badge overlaid */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-[#C9C3B8]/50 px-2.5 py-1 rounded text-[11px] font-medium text-zinc-700 tracking-wide uppercase">
            {category}
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#14171B] mb-1 leading-snug group-hover:text-[#5B6570] transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-[#5B6570] mb-4">{location}</p>
          
          <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center text-sm font-medium text-[#14171B]">
            View Case Study 
            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
