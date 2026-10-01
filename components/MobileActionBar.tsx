"use client";

import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { Phone, MessageSquare, UserCheck } from "lucide-react";

interface MobileActionBarProps {
  locale: Locale;
}

export function MobileActionBar({ locale }: MobileActionBarProps) {
  const dict = getDictionary(locale);

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl px-2 py-2"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${siteConfig.contact.phoneE164}`}
          className="flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-xs font-semibold text-white transition-colors"
          aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
        >
          <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-xs font-semibold text-white transition-colors"
          aria-label="Chat with Wenasa on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Apply Now Button */}
        <a
          href="#apply"
          className="flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-xs font-semibold text-slate-950 transition-colors"
          aria-label="Enroll online"
        >
          <UserCheck className="w-4 h-4 shrink-0" />
          <span className="truncate">{dict.common.applyNow}</span>
        </a>
      </div>
    </aside>
  );
}
