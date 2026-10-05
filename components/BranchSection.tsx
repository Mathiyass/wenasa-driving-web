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
    <section id="branch" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Marcus Lorenzet Editorial Style */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
            <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
              [ 07 · HEADQUARTERS & TEST TRACK ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
            {dict.branch.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
            {dict.branch.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Branch Details Card (5 Cols) */}
          <div className="lg:col-span-5 marcus-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Live Open / Closed Indicator */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0d0c0a] border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      liveStatus.isOpen ? "bg-emerald-400 animate-pulse ring-4 ring-emerald-500/20" : "bg-amber-400"
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-bold text-[#f5f5f3]">
                    {liveStatus.statusText[locale]}
                  </span>
                </div>
                <span className="text-xs text-[#a8a295] font-mono">
                  {liveStatus.nextChangeText[locale]}
                </span>
              </div>

              {/* Address with 1-Click Copy */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#a8a295] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#fcc438]" />
                    <span>{dict.branch.addressTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1c1a17] hover:bg-[#25231f] text-[#d0c5ab] text-[11px] font-semibold border border-white/10 transition-colors cursor-pointer active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#fcc438]" />
                        <span className="text-[#fcc438]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#a8a295]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm font-bold text-[#f5f5f3] leading-relaxed">
                  {siteConfig.contact.address[locale]}
                </p>
                <p className="text-xs text-[#a8a295]">
                  {locale === "si" ? "සළකුණ" : locale === "ta" ? "அடையாளம்" : "Landmark"}: <span className="text-[#c7c2b6]">{siteConfig.contact.landmark}</span>
                </p>
              </div>

              {/* Practice Track Proximity Pill */}
              <div className="p-3.5 rounded-2xl bg-[#0d0c0a] border border-white/[0.06] flex items-start gap-2.5 text-xs text-[#c7c2b6]">
                <Compass className="w-4 h-4 text-[#fcc438] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#f5f5f3]">Kirindiwela Practice Track:</strong> Private closed testing grounds located just 400m along Hanwella-Urapola Rd.
                </p>
              </div>

              {/* Phone & Direct Desk */}
              <div className="space-y-1.5 pt-4 border-t border-white/[0.06]">
                <div className="text-xs font-bold text-[#a8a295] uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#fcc438]" />
                  <span>{dict.branch.phoneTitle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${siteConfig.contact.phoneE164}`}
                    className="text-base sm:text-lg font-black text-[#f5f5f3] font-mono hover:text-[#fcc438] transition-colors"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <span className="text-xs text-[#d0c5ab] bg-[#1c1a17] px-2.5 py-0.5 rounded-full border border-white/10 font-bold shadow-xs">
                    {locale === "si" ? "ක්ෂණික ඇමතුම්" : locale === "ta" ? "நேரடி அழைப்பு" : "Direct Hotline"}
                  </span>
                </div>
              </div>

              {/* Opening Hours Schedule */}
              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                <div className="text-xs font-bold text-[#a8a295] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#fcc438]" />
                  <span>{dict.branch.hoursTitle}</span>
                </div>
                <div className="text-xs space-y-1.5">
                  <div className={`p-2 rounded-xl flex items-center justify-between transition-colors ${
                    !isSunday ? "bg-[#1c1a17] border border-white/10 text-[#d0c5ab] font-bold" : "text-[#a8a295]"
                  }`}>
                    <span>{dict.branch.hoursWeekday}</span>
                    {!isSunday && <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#fcc438]/20 text-[#fcc438]">Today</span>}
                  </div>
                  <div className={`p-2 rounded-xl flex items-center justify-between transition-colors ${
                    isSunday ? "bg-[#1c1a17] border border-white/10 text-[#d0c5ab] font-bold" : "text-[#a8a295]"
                  }`}>
                    <span>{dict.branch.hoursSunday}</span>
                    {isSunday && <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#fcc438]/20 text-[#fcc438]">Today</span>}
                  </div>
                </div>
              </div>

              {/* Local Communities Served */}
              <div className="p-3.5 rounded-2xl bg-[#0d0c0a] border border-white/[0.06]">
                <div className="text-xs font-bold text-[#d0c5ab] mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#fcc438]" />
                  <span>{dict.branch.servingTitle}</span>
                </div>
                <p className="text-xs text-[#a8a295] leading-relaxed">
                  {dict.branch.servingAreas}
                </p>
              </div>

            </div>

            {/* Navigation Action Button */}
            <div className="pt-4 border-t border-white/[0.06]">
              <a
                href={siteConfig.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>{dict.branch.directionsBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col min-h-[480px] bg-[#141310]">
            <iframe
              title="Wenasa Driving School Kirindiwela Location Map"
              src={siteConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full grayscale-[25%] contrast-[1.1] opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
