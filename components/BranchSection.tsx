"use client";

import { useState, useEffect } from "react";
import { siteConfig, getLiveBusinessStatus } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { MapPin, Phone, Clock, Navigation, CheckCircle, ExternalLink } from "lucide-react";

interface BranchSectionProps {
  locale: Locale;
}

export function BranchSection({ locale }: BranchSectionProps) {
  const dict = getDictionary(locale);
  const [liveStatus, setLiveStatus] = useState(getLiveBusinessStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStatus(getLiveBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="branch" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            {dict.branch.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
            {dict.branch.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.branch.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Branch Details Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Live Open / Closed Indicator */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    liveStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {liveStatus.statusText[locale]}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {liveStatus.nextChangeText[locale]}
              </span>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{dict.branch.addressTitle}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                {siteConfig.contact.address[locale]}
              </p>
              <p className="text-xs text-slate-500">
                Landmark: {siteConfig.contact.landmark}
              </p>
            </div>

            {/* Phone & WhatsApp */}
            <div className="space-y-1 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{dict.branch.phoneTitle}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="text-base font-bold text-slate-900 dark:text-white font-mono hover:text-emerald-600 transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <span className="text-xs text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Direct Line
                </span>
              </div>
            </div>

            {/* Opening Hours Schedule */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{dict.branch.hoursTitle}</span>
              </div>
              <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span>{dict.branch.hoursWeekday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{dict.branch.hoursSunday}</span>
                </div>
              </div>
            </div>

            {/* Local Areas Served */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{dict.branch.servingTitle}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {dict.branch.servingAreas}
              </p>
            </div>

            {/* Navigation Button */}
            <a
              href={siteConfig.contact.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>{dict.branch.directionsBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col h-[480px]">
            <iframe
              title="Wenasa Driving School Kirindiwela Location Map"
              src={siteConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full grayscale-[20%] contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
