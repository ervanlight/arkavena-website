const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://tegakara-website.vercel.app';

export const urls = {
  base: domain,
  canonical: (path: string) => `${domain}${path}`,
  sitemap: `${domain}/sitemap.xml`,
  ogImage: `${domain}/og-image.png`,
  callback: `${domain}/auth/callback`,
  admin: `${domain}/admin`,
  media: (path: string) => `${domain}/media${path}`,
};
