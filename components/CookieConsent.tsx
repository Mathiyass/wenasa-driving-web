"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Check, Settings2, X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    const consent = localStorage.getItem("WENASA_PDPA_CONSENT");
    if (!consent) {
      // Delay display slightly for clean page load experience
      const timer = setTimeout(() => setIsVisible(true), 1500);
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
    <div className="fixed bottom-16 lg:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-xl shrink-0 mt-0.5 border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Privacy & Consent (PDPA Sri Lanka)
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              We process minimal data necessary for course management and language preference. You can choose your optional cookie preferences below. No pre-ticked consent.
            </p>

            {showPreferences && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-xs">
                {/* Essential */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Strictly Necessary Cookies</span>
                    <span className="text-[11px] text-slate-400">Language preference & session security</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Always Active
                  </span>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Analytics Cookies</span>
                    <span className="text-[11px] text-slate-400">Help us count visits and lesson demand</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 bg-slate-800 border-slate-700"
                  />
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Marketing Cookies</span>
                    <span className="text-[11px] text-slate-400">Special seasonal discount alerts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketingAllowed}
                    onChange={(e) => setMarketingAllowed(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
              {!showPreferences ? (
                <>
                  <button
                    onClick={handleAcceptAll}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleAcceptEssentialOnly}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>Customize</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveCustom}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white"
                  >
                    Save My Choices
                  </button>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-400"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
