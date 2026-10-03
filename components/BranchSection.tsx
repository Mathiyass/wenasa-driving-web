"use client";

import { useState, useEffect } from "react";
import { siteConfig, getLiveBusinessStatus } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles,
  Compass
} from "lucide-react";

interface BranchSectionProps {
  locale: Locale;
}

export function BranchSection({ locale }: BranchSectionProps) {
  const dict = getDictionary(locale);
  const [liveStatus, setLiveStatus] = useState(getLiveBusinessStatus());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStatus(getLiveBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    const fullAddress = `${siteConfig.contact.address[locale]}, Kirindiwela 11740`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isSunday = new Date().getDay() === 0;

  return (
    <section id="branch" className="py-20 sm:py-24 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{dict.nav.branch}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
            {dict.branch.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.branch.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Branch Details Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 rounded-[2.25rem] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Live Open / Closed Indicator */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      liveStatus.isOpen ? "bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" : "bg-amber-500"
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {liveStatus.statusText[locale]}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {liveStatus.nextChangeText[locale]}
                </span>
              </div>

              {/* Address with 1-Click Copy */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{dict.branch.addressTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition-colors cursor-pointer active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm font-bold text-white leading-relaxed">
                  {siteConfig.contact.address[locale]}
                </p>
                <p className="text-xs text-slate-400">
                  {locale === "si" ? "සළකුණ" : locale === "ta" ? "அடையாளம்" : "Landmark"}: <span className="text-slate-200">{siteConfig.contact.landmark}</span>
                </p>
              </div>

              {/* Practice Track Proximity Pill */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-2.5 text-xs text-emerald-200">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white">Kirindiwela Practice Track:</strong> Private closed testing grounds located just 400m along Hanwella-Urapola Rd.
                </p>
              </div>

              {/* Phone & Direct Desk */}
              <div className="space-y-1.5 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{dict.branch.phoneTitle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${siteConfig.contact.phoneE164}`}
                    className="text-base sm:text-lg font-black text-white font-mono hover:text-emerald-400 transition-colors"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <span className="text-xs text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-800/80 font-bold shadow-xs">
                    {locale === "si" ? "ක්ෂණික ඇමතුම්" : locale === "ta" ? "நேரடி அழைப்பு" : "Direct Hotline"}
                  </span>
                </div>
              </div>

              {/* Opening Hours Schedule with Today Highlight */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{dict.branch.hoursTitle}</span>
                </div>
                <div className="text-xs space-y-1.5">
                  <div className={`p-2 rounded-xl flex items-center justify-between transition-colors ${
                    !isSunday ? "bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 font-bold" : "text-slate-300"
                  }`}>
                    <span>{dict.branch.hoursWeekday}</span>
                    {!isSunday && <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Today</span>}
                  </div>
                  <div className={`p-2 rounded-xl flex items-center justify-between transition-colors ${
                    isSunday ? "bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 font-bold" : "text-slate-300"
                  }`}>
                    <span>{dict.branch.hoursSunday}</span>
                    {isSunday && <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Today</span>}
                  </div>
                </div>
              </div>

              {/* Local Communities Served */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{dict.branch.servingTitle}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {dict.branch.servingAreas}
                </p>
              </div>

            </div>

            {/* Navigation Action Button */}
            <div className="pt-4 border-t border-slate-800">
              <a
                href={siteConfig.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nested w-full group py-3.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-emerald-glow active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-200" />
                  <span>{dict.branch.directionsBtn}</span>
                </span>
                <span className="btn-nested-icon bg-white/20 text-white group-hover:translate-x-0.5 transition-transform">
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-[2.25rem] border border-slate-800 overflow-hidden shadow-2xl flex flex-col min-h-[480px]">
            <iframe
              title="Wenasa Driving School Kirindiwela Location Map"
              src={siteConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full grayscale-[15%] contrast-[1.05]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
