import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/card';
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
    <Link href={href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A4A] rounded-[24px]">
      <Card className={cn('overflow-hidden h-full border-transparent transition-all duration-300', className)}>
        <div className="aspect-[4/3] w-full bg-[#1C2D38] relative overflow-hidden">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(#E8DED0 1px, transparent 1px), linear-gradient(90deg, #E8DED0 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B26]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-[#0E1B26] tracking-wide">
            {category}
          </div>
          
          <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-manrope text-xl font-semibold text-[#0E1B26] mb-2 group-hover:text-[#B88A4A] transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-sm text-[#68757D]">
            <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
