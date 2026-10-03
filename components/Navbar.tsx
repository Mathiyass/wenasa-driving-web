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

  // Concise multilingual labels tailored for the top navbar to prevent i18n text expansion overflow
  const conciseNav = {
    en: {
      journey: "Journey",
      services: "Classes",
      packages: "Packages",
      roadSigns: "Signs",
      branch: "Branch",
      faq: "FAQ",
      applyNow: "Register",
    },
    si: {
      journey: "ගමන්මඟ",
      services: "කාණ්ඩ",
      packages: "පැකේජ",
      roadSigns: "සංඥා",
      branch: "ශාඛාව",
      faq: "ප්‍රශ්න",
      applyNow: "ලියාපදිංචිය",
    },
    ta: {
      journey: "பயணம்",
      services: "வகுப்புகள்",
      packages: "தொகுப்புகள்",
      roadSigns: "சைகைகள்",
      branch: "கிளை",
      faq: "வினாக்கள்",
      applyNow: "பதிவு செய்க",
    },
  };

  const nav = conciseNav[locale] || conciseNav.en;

  const navLinks = [
    { href: `#journey`, label: nav.journey },
    { href: `#services`, label: nav.services },
    { href: `#packages`, label: nav.packages },
    { href: `#resources`, label: nav.roadSigns },
    { href: `#branch`, label: nav.branch },
    { href: `#faq`, label: nav.faq },
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

      {/* Main Top Header - Sleek Floating Glass Island */}
      <header className="sticky top-0 z-40 w-full pt-2 sm:pt-3 px-3 sm:px-6 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto rounded-full pl-3.5 pr-2.5 sm:pl-5 sm:pr-3.5 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl transition-all duration-300">
          
          {/* Zone 1: Geometric Logo + Brand Wordmark */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus-visible:outline-2 focus-visible:outline-emerald-500 rounded-full py-1 pr-1 shrink-0"
            aria-label="Wenasa Driving School Home"
          >
            {/* Geometric emblem with subtle halo */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm shadow-md group-hover:scale-105 transition-transform shrink-0">
              <span className="font-black tracking-tighter">W</span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                {siteConfig.name[locale] || siteConfig.name.en}
              </span>
              <span className="text-[9px] text-emerald-400 font-bold tracking-wider uppercase whitespace-nowrap">
                Reg. DMT/WP/G/1174
              </span>
            </div>
          </Link>

          {/* Zone 2: Uppercase Spaced Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 2xl:px-3 py-1.5 rounded-full hover:bg-slate-800 hover:text-white transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Circular Phone Button + Language Switcher + Compact Emerald CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Phone Icon in Circular Pill */}
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-700/80 bg-slate-800/90 flex items-center justify-center text-slate-200 hover:border-emerald-500 hover:text-emerald-400 hover:bg-slate-800 transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              title={`Call ${siteConfig.contact.phoneDisplay}`}
              aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            <LanguageSwitcher currentLocale={locale} variant="header" />

            {/* Compact Non-overflowing Emerald CTA */}
            <a
              href={`#apply`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-emerald-glow active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <span>{nav.applyNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full text-slate-300 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-emerald-500 cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-2 mx-auto max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 backdrop-blur-2xl p-5 shadow-2xl space-y-4 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-emerald-glow active:scale-[0.98] transition-all"
              >
                {dict.nav.applyNow}
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-2.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 rounded-full border border-emerald-800/80 hover:bg-emerald-900/40"
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
