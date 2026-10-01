"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { siteConfig, getLiveBusinessStatus } from "@/src/config/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, Phone, Clock, ArrowRight } from "lucide-react";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const dict = getDictionary(locale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveStatus, setLiveStatus] = useState(getLiveBusinessStatus());

  useEffect(() => {
    // Update live status periodically
    const interval = setInterval(() => {
      setLiveStatus(getLiveBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: `#journey`, label: dict.nav.journey },
    { href: `#services`, label: dict.nav.services },
    { href: `#packages`, label: dict.nav.packages },
    { href: `#resources`, label: dict.nav.roadSigns },
    { href: `#branch`, label: dict.nav.branch },
    { href: `#faq`, label: dict.nav.faq },
  ];

  return (
    <>
      {/* Top subtle utility ticker */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Live business hours status badge */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  liveStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="font-medium text-white">
                {liveStatus.statusText[locale]}
              </span>
              <span className="hidden sm:inline text-slate-400">· {liveStatus.nextChangeText[locale]}</span>
            </div>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="hidden md:flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{siteConfig.hours.displaySummary[locale]}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-mono">{siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Sticky Navbar adhering to Top Bar Contract */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Single element Brand Wordmark (showing English & Sinhala names) */}
          <Link
            href={`/${locale}`}
            className="flex flex-col group text-left focus-visible:outline-2 focus-visible:outline-emerald-600 rounded-md"
            aria-label="Wenasa Driving School Home"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors whitespace-nowrap">
              {siteConfig.name.en}
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium tracking-normal whitespace-nowrap">
              {siteConfig.name.si}
            </span>
          </Link>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary actions + Language Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <LanguageSwitcher currentLocale={locale} variant="header" />

            <a
              href={`#apply`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <span>{dict.nav.applyNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-emerald-600"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3">
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                {dict.nav.applyNow}
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800"
              >
                {dict.common.whatsappUs}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
