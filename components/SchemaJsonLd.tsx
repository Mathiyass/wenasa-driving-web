import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";

export function SchemaJsonLd({ locale }: { locale: Locale }) {
  // LocalBusiness (DrivingSchool) Structured Data adhering strictly to no fake AggregateRating
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "name": `${siteConfig.name.en} - ${siteConfig.name.si}`,
    "alternateName": [siteConfig.name.en, siteConfig.name.si, siteConfig.name.ta],
    "url": siteConfig.appUrl,
    "telephone": siteConfig.contact.phoneE164,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address[locale],
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
    "areaServed": [
      { "@type": "City", "name": "Kirindiwela" },
      { "@type": "AdministrativeArea", "name": "Urapola" },
      { "@type": "AdministrativeArea", "name": "Wathurugama" },
      { "@type": "AdministrativeArea", "name": "Gampaha District" },
    ],
    "priceRange": "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
