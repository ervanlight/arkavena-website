import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD for breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://arkavena.com${item.href}`, // replace with actual domain config later
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-[#68757D]">
          <li>
            <Link href="/" className="hover:text-[#B88A4A] transition-colors focus-visible:outline-none focus-visible:underline">
              Beranda
            </Link>
          </li>
          {items.map((item, index) => (
            <React.Fragment key={item.href}>
              <li>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </li>
              <li>
                {index === items.length - 1 ? (
                  <span className="text-[#0E1B26] font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-[#B88A4A] transition-colors focus-visible:outline-none focus-visible:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  );
}
