import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader, SiteFooter, SiteWhatsAppButton } from "@/components/site-chrome";
import { CookieConsent } from "@/components/shared/cookie-consent";
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

import Script from "next/script";

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
        {/* Google Tag Manager */}
        {gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        
        {/* Google Analytics 4 */}
        {gaId && !gtmId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { page_path: window.location.pathname });`,
              }}
            />
          </>
        )}

        {/*
          Single sitewide source of Organization/WebSite JSON-LD. Content
          pages (buildJsonLdGraph) reference these by @id rather than
          re-declaring them, so no route ever renders two Organization nodes.
        */}
        <JsonLd data={siteEntityGraph} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#ECE8E1] text-[#14171B] antialiased">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <a href="#main-content" className="skip-to-content">
          Langsung ke konten utama
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SiteWhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
