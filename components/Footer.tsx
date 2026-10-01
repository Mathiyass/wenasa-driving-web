"use client";

import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Heart } from "lucide-react";
import { useState } from "react";
import { PolicyModal } from "./PolicyModal";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const [activePolicy, setActivePolicy] = useState<"privacy" | "terms" | "refund" | "cookie" | null>(null);

  return (
    <>
      <footer className="bg-slate-950 text-white pt-16 pb-24 lg:pb-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Column 1: School Identity & Bilingual Brand */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {siteConfig.name.en}
                </span>
                <span className="text-sm font-semibold text-emerald-400 block mt-0.5">
                  {siteConfig.name.si}
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  {siteConfig.name.ta}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {dict.footer.about}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{siteConfig.legalEntityName}</span>
              </div>

              {/* Language Switcher in Footer */}
              <div className="pt-2">
                <LanguageSwitcher currentLocale={locale} variant="footer" />
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {dict.footer.quickLinks}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a href="#journey" className="hover:text-emerald-400 transition-colors">
                    {dict.nav.journey}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-emerald-400 transition-colors">
                    {dict.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-emerald-400 transition-colors">
                    {dict.nav.packages}
                  </a>
                </li>
                <li>
                  <a href="#resources" className="hover:text-emerald-400 transition-colors">
                    {dict.nav.roadSigns}
                  </a>
                </li>
                <li>
                  <a href="#instructors" className="hover:text-emerald-400 transition-colors">
                    {dict.nav.instructors}
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-emerald-400 transition-colors">
                    {dict.nav.reviews}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-emerald-400 transition-colors">
                    {dict.nav.faq}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Working Hours */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Kirindiwela Center
              </h4>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address[locale]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${siteConfig.contact.phoneE164}`} className="hover:text-white font-mono">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp Helpline
                  </a>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div>Mon – Sat: 7:30 AM – 6:00 PM</div>
                    <div>Sunday: 7:30 AM – 2:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Compliance & Legal Policies */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {dict.footer.legalPolicies}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Wenasa operates in compliance with the Sri Lanka Motor Traffic Act and Personal Data Protection Act (PDPA No. 9 of 2022).
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => setActivePolicy("privacy")}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    Privacy Policy (PDPA Compliance)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("terms")}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    Terms of Service & Training Rules
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("refund")}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    Refund & Lesson Cancellation Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("cookie")}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    Cookie Notice & Consent
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Regulatory Notice */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
            <div>
              <span>{dict.footer.copyright}</span>
            </div>

            <div className="text-[11px] max-w-xl text-slate-400">
              {dict.footer.dmtDisclaimer}
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Reader Modal */}
      {activePolicy && (
        <PolicyModal policyType={activePolicy} onClose={() => setActivePolicy(null)} />
      )}
    </>
  );
}
