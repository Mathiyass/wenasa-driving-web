import { notFound } from "next/navigation";
import { isValidLocale, Locale, locales } from "@/src/config/i18n";
import { siteConfig } from "@/src/config/site";
import { getDictionary } from "@/src/i18n";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { JourneyStepper } from "@/components/JourneyStepper";
import { ServicesGrid } from "@/components/ServicesGrid";
import { DigitalResourcesGrid } from "@/components/DigitalResourcesGrid";
import { PackagesSection } from "@/components/PackagesSection";
import { WhyWenasa } from "@/components/WhyWenasa";
import { InstructorsSection } from "@/components/InstructorsSection";
import { BranchSection } from "@/components/BranchSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FaqSection } from "@/components/FaqSection";
import { GallerySection } from "@/components/GallerySection";
import { ApplySection } from "@/components/ApplySection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { CookieConsent } from "@/components/CookieConsent";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale: Locale = isValidLocale(locale) ? locale : "si";
  const dict = getDictionary(currentLocale);

  const title = `${siteConfig.name.en} | ${siteConfig.name.si} - Kirindiwela`;
  const description = `${dict.hero.subheadline} Serving Kirindiwela, Urapola, Wathurugama & Gampaha District.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.appUrl}/${currentLocale}`,
      languages: {
        si: `${siteConfig.appUrl}/si`,
        en: `${siteConfig.appUrl}/en`,
        ta: `${siteConfig.appUrl}/ta`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.appUrl}/${currentLocale}`,
      siteName: `${siteConfig.name.en} - ${siteConfig.name.si}`,
      locale: currentLocale === "si" ? "si_LK" : currentLocale === "ta" ? "ta_LK" : "en_LK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-600 selection:text-white">
      {/* Schema.org Structured Data */}
      <SchemaJsonLd locale={currentLocale} />

      {/* Top Header & Sticky Navigation adhering to Top Bar Contract */}
      <Navbar locale={currentLocale} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection locale={currentLocale} />

        {/* 2. Animated Stats Bar from configuration */}
        <StatsBar locale={currentLocale} />

        {/* 3. Services Grid by Licence Class with Age Eligibility Helper */}
        <ServicesGrid locale={currentLocale} />

        {/* 4. Interactive "Your Journey to a Licence" Stepper */}
        <JourneyStepper locale={currentLocale} />

        {/* 5. Digital Resources Grid */}
        <DigitalResourcesGrid locale={currentLocale} />

        {/* 6. Packages Section with 3-Question Package Finder */}
        <PackagesSection locale={currentLocale} />

        {/* 7. Why Choose Wenasa */}
        <WhyWenasa locale={currentLocale} />

        {/* 8. Instructors Section */}
        <InstructorsSection locale={currentLocale} />

        {/* 9. Kirindiwela Branch & Live Map Section */}
        <BranchSection locale={currentLocale} />

        {/* 10. Reviews & Authentic Feedback Collection Flow */}
        <ReviewsSection locale={currentLocale} />

        {/* 11. Frequently Asked Questions with FAQPage Schema */}
        <FaqSection locale={currentLocale} />

        {/* 12. Filterable Gallery & Lightbox */}
        <GallerySection locale={currentLocale} />

        {/* 13. Expert Educational Blog Articles */}
        <BlogSection locale={currentLocale} />

        {/* 14. Online Enrollment & Application */}
        <ApplySection locale={currentLocale} />
      </main>

      {/* Footer with Bilingual branding & Legal Policies */}
      <Footer locale={currentLocale} />

      {/* Mobile-first Sticky Action Bar (Call | WhatsApp | Apply) */}
      <MobileActionBar locale={currentLocale} />

      {/* Sri Lanka PDPA Compliant Granular Cookie Consent */}
      <CookieConsent />
    </div>
  );
}
