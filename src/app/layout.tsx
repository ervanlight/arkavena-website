import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader, SiteFooter, SiteWhatsAppButton } from "@/components/site-chrome";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
import { PageTransition } from "@/components/shared/page-transition";
import { JsonLd } from "@/components/seo/json-ld";
import { buildSiteEntityGraph } from "@/lib/seo/schema-builders";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["500"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://arkavena-website.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#14171B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteEntityGraph = buildSiteEntityGraph();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/*
          Single sitewide source of Organization/WebSite JSON-LD. Content
          pages (buildJsonLdGraph) reference these by @id rather than
          re-declaring them, so no route ever renders two Organization nodes.
        */}
        <JsonLd data={siteEntityGraph} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#ECE8E1] text-[#14171B] antialiased">
        <AnalyticsScripts gtmId={gtmId} gaId={gaId} />
        <a href="#main-content" className="skip-to-content">
          Langsung ke konten utama
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <SiteWhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
