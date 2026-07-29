"use client";

import * as React from "react";
import Script from "next/script";
import { CONSENT_CHANGED_EVENT, getConsent } from "@/lib/analytics/consent";

export interface AnalyticsScriptsProps {
  gtmId?: string;
  gaId?: string;
}

/**
 * Loads the configured analytics vendor's script only after the visitor has
 * actually granted cookie consent. Previously the GTM/GA4 scripts in
 * layout.tsx loaded unconditionally the moment an ID was configured — a
 * visitor who pressed "Tolak" on the cookie banner was tracked anyway
 * (audit finding I4, 2026-07-29). Consent is re-checked on every
 * CONSENT_CHANGED_EVENT so accepting the banner starts tracking immediately,
 * with no reload required.
 */
export function AnalyticsScripts({ gtmId, gaId }: AnalyticsScriptsProps) {
  const [granted, setGranted] = React.useState(false);

  React.useEffect(() => {
    const sync = () => setGranted(getConsent() === "granted");
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, []);

  if (!granted) return null;

  // GTM wins if both are configured — same precedence as getAnalyticsMode()
  // in the landing-page adapter, so the two paths can never disagree.
  if (gtmId) {
    return (
      <>
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </>
    );
  }

  if (gaId) {
    return (
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
    );
  }

  return null;
}
