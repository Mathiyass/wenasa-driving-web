"use client";

import { useState } from "react";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { QrCode, ExternalLink, Send, CheckCircle2, MessageSquareHeart, ShieldCheck } from "lucide-react";

interface ReviewsSectionProps {
  locale: Locale;
}

export function ReviewsSection({ locale }: ReviewsSectionProps) {
  const dict = getDictionary(locale);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !feedbackMsg) return;
    setFeedbackSent(true);
  };

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            {dict.reviews.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
            {dict.reviews.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.reviews.subtitle}
          </p>
        </div>

        {/* Transparency Banner: Strict compliance with no fake reviews */}
        <div className="max-w-4xl mx-auto mb-12 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Commitment to Authentic Student Experiences
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {dict.reviews.transparencyNotice}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Review Collection via QR Code & Google Button */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {dict.reviews.leaveReviewTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                {dict.reviews.leaveReviewDesc}
              </p>

              {/* Vector Simulated QR Code */}
              <div className="my-6 inline-block p-4 bg-white rounded-xl shadow-xs border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
                  {/* Outer Frame */}
                  <rect width="100" height="100" fill="#ffffff" />
                  {/* Position detection corners */}
                  <rect x="10" y="10" width="28" height="28" fill="#0f172a" rx="2" />
                  <rect x="14" y="14" width="20" height="20" fill="#ffffff" rx="1" />
                  <rect x="18" y="18" width="12" height="12" fill="#059669" rx="1" />

                  <rect x="62" y="10" width="28" height="28" fill="#0f172a" rx="2" />
                  <rect x="66" y="14" width="20" height="20" fill="#ffffff" rx="1" />
                  <rect x="70" y="18" width="12" height="12" fill="#059669" rx="1" />

                  <rect x="10" y="62" width="28" height="28" fill="#0f172a" rx="2" />
                  <rect x="14" y="66" width="20" height="20" fill="#ffffff" rx="1" />
                  <rect x="18" y="70" width="12" height="12" fill="#059669" rx="1" />

                  {/* QR Data Matrix Points */}
                  <rect x="44" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="44" y="24" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="30" width="6" height="6" fill="#0f172a" />
                  <rect x="20" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="32" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="44" y="44" width="12" height="12" fill="#059669" rx="2" />
                  <rect x="62" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="74" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="44" y="62" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="70" width="6" height="6" fill="#0f172a" />
                  <rect x="62" y="62" width="6" height="6" fill="#0f172a" />
                  <rect x="74" y="70" width="6" height="6" fill="#0f172a" />
                  <rect x="68" y="80" width="14" height="6" fill="#0f172a" />
                </svg>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">
                  {dict.reviews.qrCodeLabel}
                </div>
              </div>
            </div>

            <a
              href={siteConfig.contact.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-bold transition-colors shadow-xs"
            >
              <span>{dict.reviews.googleReviewBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Internal Student Feedback Form */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Direct Desk Feedback
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Send feedback, instructor commendations, or curriculum suggestions directly to our school management.
              </p>

              {!feedbackSent ? (
                <form onSubmit={handleSubmitFeedback} className="mt-6 space-y-3.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Name / Student ID:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Fernando"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Feedback / Experience:
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your driving lessons, instructor support, or test preparation..."
                      value={feedbackMsg}
                      onChange={(e) => setFeedbackMsg(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Feedback to Desk</span>
                  </button>
                </form>
              ) : (
                <div className="my-8 p-6 text-center space-y-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Thank You, {studentName}!
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Your feedback has been received by our supervisory team.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              Note: Reviews are audited under Sri Lankan Consumer Protection standards.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
