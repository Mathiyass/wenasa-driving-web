"use client";

import { useState } from "react";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { Send, CheckCircle2, ShieldCheck, Phone, AlertCircle } from "lucide-react";

interface ApplySectionProps {
  locale: Locale;
}

export function ApplySection({ locale }: ApplySectionProps) {
  const dict = getDictionary(locale);

  const [fullName, setFullName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedClass, setSelectedClass] = useState("B");
  const [preferredTime, setPreferredTime] = useState("morning");
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [nicError, setNicError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate Old (9 digits + V/X) and New (12 digits) Sri Lankan NIC
  const validateNic = (val: string) => {
    const clean = val.trim().toUpperCase();
    const oldNicRegex = /^[0-9]{9}[VX]$/;
    const newNicRegex = /^[0-9]{12}$/;
    if (!clean) {
      setNicError("");
      return;
    }
    if (oldNicRegex.test(clean) || newNicRegex.test(clean)) {
      setNicError("");
    } else {
      setNicError("NIC must be 9 digits followed by V/X or 12 modern numeric digits.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nicError || !pdpaConsent) return;
    setIsSubmitted(true);
  };

  return (
    <section id="apply" className="py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Online Enrollment
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: "balance" }}>
            Start Your Driving Journey With Wenasa
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300">
            Fill out the official online registration form. Our Kirindiwela admissions desk will verify your details and reserve your initial theory kit.
          </p>
        </div>

        <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Full Legal Name (as in NIC / Birth Certificate) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Chamara Fernando"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-emerald-500"
                  />
                </div>

                {/* NIC Number */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    National Identity Card (NIC) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 200112345678 or 981234567V"
                    value={nicNumber}
                    onChange={(e) => {
                      setNicNumber(e.target.value);
                      validateNic(e.target.value);
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-emerald-500 ${
                      nicError ? "border-red-500" : "border-slate-700"
                    }`}
                  />
                  {nicError && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{nicError}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 077 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-emerald-500"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    WhatsApp Number (for schedule updates)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 070 707 6029"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-emerald-500"
                  />
                </div>

                {/* Licence Category */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Preferred Licence Category *
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-emerald-500"
                  >
                    <option value="B">Class B: Car (Manual & Auto)</option>
                    <option value="A_B">Combo: Car (Manual) + Motorcycle (Class A)</option>
                    <option value="A">Class A: Motorcycle & Scooter</option>
                    <option value="B1">Class B1: Three-Wheeler</option>
                    <option value="C">Class C: Heavy Commercial Truck</option>
                  </select>
                </div>

                {/* Preferred Training Time */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Preferred Practice Slot *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-emerald-500"
                  >
                    <option value="morning">Early Morning (6:30 AM – 9:00 AM)</option>
                    <option value="midday">Daytime (9:00 AM – 2:00 PM)</option>
                    <option value="evening">Late Afternoon (2:00 PM – 6:00 PM)</option>
                    <option value="weekend">Weekends Only (Saturday & Sunday)</option>
                  </select>
                </div>
              </div>

              {/* PDPA Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={pdpaConsent}
                    onChange={(e) => setPdpaConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    I consent to Wenasa Driving School processing my personal data strictly for driver registration, NTMI scheduling, and DMT application management in accordance with the Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022).
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Your information is encrypted & protected.</span>
                </div>

                <button
                  type="submit"
                  disabled={!pdpaConsent || Boolean(nicError)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all shadow-lg shadow-emerald-950/40"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Registration</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Registration Received Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{fullName}</span>. Our student coordinator will contact you at{" "}
                <span className="font-mono text-emerald-400">{phone}</span> to schedule your preliminary medical appointment and welcome you to the center.
              </p>
              <div className="pt-6">
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700 text-white text-xs font-semibold hover:bg-slate-600"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Admissions: {siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
