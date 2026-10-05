import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";

export function SchemaJsonLd({ locale }: { locale: Locale }) {
  // 1. Comprehensive LocalBusiness / DrivingSchool Structured Data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "@id": `https://wenasadrivingschool.com/${locale}/#school`,
    "name": `${siteConfig.name.en} - ${siteConfig.name.si}`,
    "alternateName": [siteConfig.name.en, siteConfig.name.si, siteConfig.name.ta],
    "url": `https://wenasadrivingschool.com/${locale}/`,
    "logo": "https://wenasadrivingschool.com/favicon.svg",
    "image": "https://wenasadrivingschool.com/images/hero-car.png",
    "telephone": siteConfig.contact.phoneE164,
    "email": siteConfig.contact.email,
    "priceRange": "$$",
    "currenciesAccepted": "LKR",
    "paymentAccepted": "Cash, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address[locale] || siteConfig.contact.address.en,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.district,
      "postalCode": siteConfig.contact.postalCode,
      "addressCountry": "LK",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.contact.coordinates.latitude,
      "longitude": siteConfig.contact.coordinates.longitude,
    },
    "hasMap": siteConfig.contact.googleMapsDirectionsUrl,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:30",
        "closes": "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "07:30",
        "closes": "14:00",
      },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "420",
    },
    "areaServed": [
      { "@type": "City", "name": "Kirindiwela" },
      { "@type": "AdministrativeArea", "name": "Urapola" },
      { "@type": "AdministrativeArea", "name": "Wathurugama" },
      { "@type": "AdministrativeArea", "name": "Gampaha District" },
    ],
  };

  // 2. BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wenasadrivingschool.com/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": siteConfig.name[locale] || siteConfig.name.en,
        "item": `https://wenasadrivingschool.com/${locale}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
