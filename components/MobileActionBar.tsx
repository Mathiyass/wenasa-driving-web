"use client";

import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { Phone, MessageSquare, Car } from "lucide-react";

interface MobileActionBarProps {
  locale: Locale;
}

export function MobileActionBar({ locale }: MobileActionBarProps) {
  const dict = getDictionary(locale);

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-3 left-3 right-3 z-40 sm:hidden marcus-dock rounded-full px-2 py-1.5 shadow-2xl"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1.5">
        {/* Call Button */}
        <a
          href={`tel:${siteConfig.contact.phoneE164}`}
          className="flex items-center justify-center gap-1.5 min-h-[42px] px-2.5 py-2 rounded-full bg-[#1c1a17] hover:bg-[#25231f] active:scale-95 text-xs font-semibold text-[#d0c5ab] transition-all border border-white/[0.06]"
          aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
        >
          <Phone className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
          <span className="truncate">
            {locale === "si" ? "අමතන්න" : locale === "ta" ? "அழைக்க" : "Call"}
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 min-h-[42px] px-2.5 py-2 rounded-full bg-[#1c1a17] hover:bg-[#25231f] active:scale-95 text-xs font-semibold text-[#f5f5f3] transition-all border border-white/[0.06]"
          aria-label="Chat with Wenasa on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Apply Now Button */}
        <a
          href="#apply"
          className="flex items-center justify-center gap-1.5 min-h-[42px] px-2.5 py-2 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] active:scale-95 text-xs font-black text-[#11100d] uppercase tracking-wider transition-all shadow-md"
          aria-label="Enroll online"
        >
          <Car className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{dict.common.applyNow}</span>
        </a>
      </div>
    </aside>
  );
}
