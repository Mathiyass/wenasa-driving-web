"use client";

import { Locale } from "@/src/config/i18n";
import { X, ExternalLink, FileText, CheckCircle, ShieldCheck } from "lucide-react";

interface LicenceGuideModalProps {
  locale: Locale;
  onClose: () => void;
}

export function LicenceGuideModal({ locale, onClose }: LicenceGuideModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase">
              <span>Department of Motor Traffic (DMT) Guide</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-white">
              {locale === "si" ? "ශ්‍රී ලංකා රියැදුරු බලපත්‍ර නිල මාර්ගෝපදේශය" : locale === "ta" ? "சாரதி அனுமதிப்பத்திர உத்தியோகபூர்வ வழிகாட்டி" : "Sri Lanka Driving Licence Information Guide"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {/* Section 1: Overview */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <h4 className="font-bold text-blue-950 dark:text-blue-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Official Regulatory Framework</span>
            </h4>
            <p className="mt-1 text-xs text-blue-900/80 dark:text-blue-200 leading-relaxed">
              Driving licences in Sri Lanka are governed by the Motor Traffic Act (Chapter 203) and issued exclusively by the Department of Motor Traffic (DMT). All applicants must be citizens or valid visa holders over the statutory minimum age limit.
            </p>
          </div>

          {/* Section 2: Mandatory Checklist */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Document Checklist for New Applicants</span>
            </h4>
            <ul className="space-y-2">
              {[
                "Original National Identity Card (NIC) with verified number (or valid Sri Lankan Passport).",
                "Original Birth Certificate with clear stamp, plus certified photostat copies.",
                "Original Medical Fitness Certificate obtained from the National Transport Medical Institute (NTMI).",
                "Two copies of recent passport-size colour photographs (only if manual application is processed).",
                "Completed MTA 30 Application for Driving Licence form.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Key Deadlines & Validity Periods */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3">
              Key Deadlines & Regulatory Timelines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="font-bold text-slate-900 dark:text-white block">NTMI Medical Certificate:</span>
                <span className="text-slate-500">Valid strictly for 6 months from issue date.</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="font-bold text-slate-900 dark:text-white block">Learner&apos;s Permit (L-Plate):</span>
                <span className="text-slate-500">Valid for 6 months; minimum 3 months hold period before trial.</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="font-bold text-slate-900 dark:text-white block">Written Theory Test:</span>
                <span className="text-slate-500">40 Questions, 60 minutes duration, 30 correct to pass.</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="font-bold text-slate-900 dark:text-white block">Driving Licence Renewal:</span>
                <span className="text-slate-500">Standard smart cards valid for 8 years from issue date.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <a
            href="https://dmt.gov.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
          >
            <span>Open Official DMT Website (dmt.gov.lk)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
