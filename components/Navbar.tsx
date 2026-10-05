"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { siteConfig, getLiveBusinessStatus } from "@/src/config/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Phone, Clock, ArrowUpRight, Car, Compass } from "lucide-react";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const dict = getDictionary(locale);
  const [liveStatus, setLiveStatus] = useState(getLiveBusinessStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStatus(getLiveBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const conciseNav = {
    en: {
      journey: "Journey",
      services: "Classes",
      packages: "Packages",
      reviews: "Reviews",
      faq: "FAQ",
      applyNow: "Enroll Now",
    },
    si: {
      journey: "ගමන්මඟ",
      services: "කාණ්ඩ",
      packages: "පැකේජ",
      reviews: "ඇගයීම්",
      faq: "ප්‍රශ්න",
      applyNow: "ලියාපදිංචිය",
    },
    ta: {
      journey: "பயணம்",
      services: "வகுப்புகள்",
      packages: "தொகுப்புகள்",
      reviews: "மதிப்புரைகள்",
      faq: "வினாக்கள்",
      applyNow: "பதிவு செய்க",
    },
  };

  const nav = conciseNav[locale] || conciseNav.en;

  const navLinks = [
    { href: `#journey`, label: nav.journey },
    { href: `#services`, label: nav.services },
    { href: `#packages`, label: nav.packages },
    { href: `#reviews`, label: nav.reviews },
    { href: `#faq`, label: nav.faq },
  ];

  return (
    <>
      {/* 1. Minimalist Editorial Top Status Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#0d0c0a]/80 backdrop-blur-xl border-b border-white/[0.06] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Brand Mark & Legal DMT Accreditation */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[#fcc438] rounded-lg py-1"
            aria-label="Wenasa Driving School Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1a1916] border border-white/10 flex items-center justify-center font-black text-xs text-[#d0c5ab] group-hover:border-[#fcc438]/50 group-hover:text-[#fcc438] transition-colors">
              <span>W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                {siteConfig.name[locale] || siteConfig.name.en}
              </span>
              <span className="text-[9px] text-[#8c877a] font-semibold tracking-wider uppercase">
                DMT/WP/G/1174 · Kirindiwela
              </span>
            </div>
          </Link>

          {/* Right Status Indicators & Direct Contact */}
          <div className="flex items-center gap-3 sm:gap-5 text-xs">
            {/* Live business hours status badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161513] border border-white/[0.07] text-[#c7c2b6]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  liveStatus.isOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="font-medium text-[11px] text-[#d0c5ab]">
                {liveStatus.statusText[locale]}
              </span>
              <span className="text-[#8c877a] text-[10px]">· {liveStatus.nextChangeText[locale]}</span>
            </div>

            {/* Direct Call Link */}
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="flex items-center gap-1.5 text-[#d0c5ab] hover:text-[#fcc438] transition-colors text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#fcc438]" />
              <span className="hidden md:inline font-mono text-[11px]">{siteConfig.contact.phoneDisplay}</span>
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} variant="header" />
          </div>
        </div>
      </header>

      {/* 2. Signature Marcus Lorenzet Floating Island Dock Navigation */}
      <nav
        aria-label="Quick navigation dock"
        className="hidden sm:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="marcus-dock rounded-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2">
          {/* Section Anchor Links */}
          <div className="flex items-center gap-0.5 sm:gap-1 text-[11px] font-bold uppercase tracking-wider text-[#9e988a]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 sm:px-3.5 py-1.5 rounded-full hover:text-[#f5f5f3] hover:bg-white/[0.06] transition-all whitespace-nowrap active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="w-[1px] h-4 bg-white/10 mx-0.5 sm:mx-1" />

          {/* Standout Warm Champagne Action Pill (Marcus Signature CTA) */}
          <a
            href="#apply"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-95 shrink-0"
          >
            <Car className="w-3.5 h-3.5" />
            <span>{nav.applyNow}</span>
            <ArrowUpRight className="w-3 h-3 text-[#11100d]/70" />
          </a>
        </div>
      </nav>
    </>
  );
}
