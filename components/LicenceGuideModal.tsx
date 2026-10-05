"use client";

import { Locale } from "@/src/config/i18n";
import { X, ExternalLink, FileText, CheckCircle, ShieldCheck } from "lucide-react";

interface LicenceGuideModalProps {
  locale: Locale;
  onClose: () => void;
}

export function LicenceGuideModal({ locale, onClose }: LicenceGuideModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0d0c0a]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141310] rounded-3xl max-w-3xl w-full border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0d0c0a] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#d0c5ab] font-bold uppercase tracking-wider">
              <span className="text-[#fcc438]">■</span>
              <span>[ DMT REGULATORY GUIDE ]</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black mt-1 text-[#f5f2eb]">
              {locale === "si" ? "ශ්‍රී ලංකා රියැදුරු බලපත්‍ර නිල මාර්ගෝපදේශය" : locale === "ta" ? "சாரதி அனுமதிப்பத்திர உத்தியோகபூர்வ வழிகாட்டி" : "Sri Lanka Driving Licence Information Guide"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#a8a295] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-[#a39e93]">
          {/* Section 1: Overview */}
          <div className="p-4 rounded-2xl bg-[#1c1a17] border border-white/10">
            <h4 className="font-bold text-[#f5f2eb] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#fcc438]" />
              <span>Official Regulatory Framework</span>
            </h4>
            <p className="mt-1 text-xs text-[#a39e93] leading-relaxed">
              Driving licences in Sri Lanka are governed by the Motor Traffic Act (Chapter 203) and issued exclusively by the Department of Motor Traffic (DMT). All applicants must be citizens or valid visa holders over the statutory minimum age limit.
            </p>
          </div>

          {/* Section 2: Mandatory Checklist */}
          <div>
            <h4 className="font-bold text-[#f5f2eb] text-base mb-3 flex items-center gap-2 font-mono uppercase text-xs tracking-wider">
              <FileText className="w-4 h-4 text-[#fcc438]" />
              <span>[ Mandatory Document Checklist for New Applicants ]</span>
            </h4>
            <ul className="space-y-2.5">
              {[
                "Original National Identity Card (NIC) with verified number (or valid Sri Lankan Passport).",
                "Original Birth Certificate with clear stamp, plus certified photostat copies.",
                "Original Medical Fitness Certificate obtained from the National Transport Medical Institute (NTMI).",
                "Two copies of recent passport-size colour photographs (only if manual application is processed).",
                "Completed MTA 30 Application for Driving Licence form.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[#a39e93]">
                  <CheckCircle className="w-4 h-4 text-[#fcc438] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Key Deadlines & Validity Periods */}
          <div>
            <h4 className="font-bold text-[#f5f2eb] text-xs font-mono uppercase tracking-wider mb-3">
              [ Key Deadlines & Regulatory Timelines ]
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d0c0a]">
                <span className="font-bold text-[#f5f2eb] block mb-0.5">NTMI Medical Certificate:</span>
                <span className="text-[#a8a295]">Valid strictly for 6 months from issue date.</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d0c0a]">
                <span className="font-bold text-[#f5f2eb] block mb-0.5">Learner&apos;s Permit (L-Plate):</span>
                <span className="text-[#a8a295]">Valid for 6 months; minimum 3 months hold period before trial.</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d0c0a]">
                <span className="font-bold text-[#f5f2eb] block mb-0.5">Written Theory Test:</span>
                <span className="text-[#a8a295]">40 Questions, 60 minutes duration, 30 correct to pass.</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d0c0a]">
                <span className="font-bold text-[#f5f2eb] block mb-0.5">Driving Licence Renewal:</span>
                <span className="text-[#a8a295]">Standard smart cards valid for 8 years from issue date.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#0d0c0a] border-t border-white/10 flex items-center justify-between text-xs">
          <a
            href="https://dmt.gov.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#fcc438] font-mono font-semibold hover:underline"
          >
            <span>Open Official DMT Website (dmt.gov.lk)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#d0c5ab] hover:bg-[#e4dcce] text-[#0d0c0a] rounded-xl font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
