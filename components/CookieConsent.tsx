"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Check, Settings2, X } from "lucide-react";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";

interface CookieConsentProps {
  locale?: Locale;
}

export function CookieConsent({ locale = "si" }: CookieConsentProps) {
  const dict = getDictionary(locale);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("WENASA_PDPA_CONSENT");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "WENASA_PDPA_CONSENT",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const handleAcceptEssentialOnly = () => {
    localStorage.setItem(
      "WENASA_PDPA_CONSENT",
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(
      "WENASA_PDPA_CONSENT",
      JSON.stringify({
        essential: true,
        analytics: analyticsAllowed,
        marketing: marketingAllowed,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-20 lg:bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-xl text-white rounded-3xl border border-slate-800 shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20 shadow-xs">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {dict.cookie.title}
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {dict.cookie.desc}
          </p>
        </div>
      </div>

      {showPreferences && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Essential Services</span>
              <span className="text-[11px] text-slate-400">Strictly required for site navigation</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800/80">
              Required
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Analytics Preference</span>
              <span className="text-[11px] text-slate-400">Anonymous visitor metrics</span>
            </div>
            <input
              id="pdpa-analytics-toggle"
              aria-label="Allow anonymous analytics"
              type="checkbox"
              checked={analyticsAllowed}
              onChange={(e) => setAnalyticsAllowed(e.target.checked)}
              className="w-4 h-4 rounded text-[#fcc438] focus:ring-[#fcc438] border-slate-700 bg-slate-900"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveCustom}
              className="w-full py-2.5 rounded-full text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              Save Custom Preferences
            </button>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-full text-xs font-bold text-[#0d0c0a] bg-[#fcc438] hover:bg-[#fdd867] active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            {dict.cookie.acceptAll}
          </button>
          <button
            onClick={handleAcceptEssentialOnly}
            className="px-3.5 py-2 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
          >
            {dict.cookie.essentialOnly}
          </button>
        </div>

        <button
          onClick={() => setShowPreferences(!showPreferences)}
          className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>{dict.cookie.customize}</span>
        </button>
      </div>
    </aside>
  );
}
