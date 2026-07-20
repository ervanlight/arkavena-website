export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "TEGAKARA Construction & Facility Care",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://tegakara.id",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    "description": "Jasa Kontraktor Sipil, Arsitektur, dan Perawatan Fasilitas Berpengalaman.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
      "contactType": "customer service"
    }
  };
}

export function getServiceSchema(serviceName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "GeneralContractor",
      "name": "TEGAKARA Construction & Facility Care"
    },
    "name": serviceName,
    "description": description
  };
}
