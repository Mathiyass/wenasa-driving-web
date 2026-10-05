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
      <footer className="bg-[#0a0908] text-[#a39e93] pt-20 pb-28 sm:pb-24 lg:pb-20 border-t border-white/10 relative overflow-hidden">
        {/* Giant subtle background watermark */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap font-black text-[130px] sm:text-[200px] lg:text-[260px] tracking-tighter text-[#f5f2eb]">
          WENASA · වෙනස
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
            {/* Column 1: School Identity & Bilingual Brand */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#141310] border border-white/10 flex items-center justify-center font-black text-sm text-[#fcc438] shrink-0">
                  W
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-[#f5f2eb] block">
                    {siteConfig.name.en}
                  </span>
                  <span className="text-xs font-mono font-medium text-[#d0c5ab] block mt-0.5">
                    {siteConfig.name.si} · {siteConfig.name.ta}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#78756c] leading-relaxed max-w-sm">
                {dict.footer.about}
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs font-mono text-[#d0c5ab]">
                <ShieldCheck className="w-4 h-4 text-[#fcc438]" />
                <span>{siteConfig.legalEntityName}</span>
              </div>

              {/* Language Switcher in Footer */}
              <div className="pt-2">
                <LanguageSwitcher currentLocale={locale} variant="footer" />
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#d0c5ab]">
                [ DIRECTORY ]
              </div>
              <ul className="space-y-2.5 text-xs text-[#a39e93]">
                <li>
                  <a href="#journey" className="hover:text-[#fcc438] transition-colors">
                    {dict.nav.journey}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#fcc438] transition-colors">
                    {dict.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-[#fcc438] transition-colors">
                    {dict.nav.packages}
                  </a>
                </li>
                <li>
                  <a href="#resources" className="hover:text-[#fcc438] transition-colors">
                    {dict.nav.roadSigns}
                  </a>
                </li>
                <li>
                  <a href="#instructors" className="hover:text-[#fcc438] transition-colors">
                    {dict.nav.instructors}
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#fcc438] transition-colors">
                    {dict.nav.reviews}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#fcc438] transition-colors">
                    {dict.nav.faq}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Working Hours */}
            <div className="lg:col-span-3 space-y-4">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#d0c5ab]">
                [ KIRINDIWELA HQ ]
              </div>
              <div className="space-y-3 text-xs text-[#a39e93]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d0c5ab] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{siteConfig.contact.address[locale]}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#d0c5ab] shrink-0" />
                  <a href={`tel:${siteConfig.contact.phoneE164}`} className="hover:text-[#fcc438] font-mono">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#fcc438] transition-colors"
                  >
                    WhatsApp Helpline
                  </a>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <Clock className="w-4 h-4 text-[#d0c5ab] shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-[11px] font-mono">
                    <div>Mon - Sat: 7:30 AM - 6:00 PM</div>
                    <div>Sunday: 7:30 AM - 2:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Compliance & Legal Policies */}
            <div className="lg:col-span-3 space-y-4">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#d0c5ab]">
                [ REGULATORY ]
              </div>
              <p className="text-[11px] text-[#78756c] leading-relaxed">
                Wenasa operates in compliance with the Sri Lanka Motor Traffic Act and Personal Data Protection Act (PDPA No. 9 of 2022).
              </p>
              <ul className="space-y-2 text-xs text-[#a39e93]">
                <li>
                  <button
                    onClick={() => setActivePolicy("privacy")}
                    className="hover:text-[#fcc438] transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy (PDPA Compliance)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("terms")}
                    className="hover:text-[#fcc438] transition-colors text-left cursor-pointer"
                  >
                    Terms of Service & Training Rules
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("refund")}
                    className="hover:text-[#fcc438] transition-colors text-left cursor-pointer"
                  >
                    Refund & Lesson Cancellation Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("cookie")}
                    className="hover:text-[#fcc438] transition-colors text-left cursor-pointer"
                  >
                    Cookie Notice & Consent
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Regulatory Notice */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#78756c] text-center md:text-left">
            <div className="font-mono">
              <span>{dict.footer.copyright}</span>
            </div>

            <div className="text-[11px] max-w-xl text-[#78756c] leading-relaxed">
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
