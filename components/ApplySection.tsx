"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { Send, CheckCircle2, ShieldCheck, Phone, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  const [preferredSlot, setPreferredSlot] = useState("morning");
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [nicError, setNicError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail && ["B", "A", "BA", "B1", "C"].includes(custom.detail)) {
        setSelectedClass(custom.detail);
      }
    };
    window.addEventListener("wenasa:select-class", handler);
    return () => window.removeEventListener("wenasa:select-class", handler);
  }, []);

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
      setNicError(dict.apply.nicError);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nicError || !pdpaConsent) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const buildWhatsAppMessage = () => {
    const text = encodeURIComponent(
      `Hello Wenasa Driving School! I just submitted my online registration:\n\nName: ${fullName}\nNIC: ${nicNumber}\nPhone: ${phone}\nClass: ${selectedClass}\nPreferred Slot: ${preferredSlot}`
    );
    return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="apply" className="py-16 sm:py-20 relative overflow-hidden scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{dict.apply.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight" style={{ textWrap: "balance" }}>
            {dict.apply.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.apply.subtitle}
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1.5">
                      {dict.apply.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={dict.apply.fullNamePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  {/* NIC Number */}
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1.5">
                      {dict.apply.nic}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={dict.apply.nicPlaceholder}
                      value={nicNumber}
                      onChange={(e) => {
                        setNicNumber(e.target.value);
                        validateNic(e.target.value);
                      }}
                      className={`w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-950/70 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono ${
                        nicError ? "border-red-500 focus:ring-red-500" : "border-slate-700/80"
                      }`}
                    />
                    {nicError && (
                      <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{nicError}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1.5">
                      {dict.apply.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="07X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1.5">
                      {dict.apply.whatsapp}
                    </label>
                    <input
                      type="tel"
                      placeholder="07X XXX XXXX"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                    />
                  </div>

                  {/* Licence Class */}
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1.5">
                      {dict.apply.licenceClass}
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-950/70 border border-slate-700/80 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    >
                      <option value="B" className="bg-slate-900 text-white">{dict.apply.classOptions.B}</option>
                      <option value="A" className="bg-slate-900 text-white">{dict.apply.classOptions.A}</option>
                      <option value="BA" className="bg-slate-900 text-white">{dict.apply.classOptions.BA}</option>
                      <option value="B1" className="bg-slate-900 text-white">{dict.apply.classOptions.B1}</option>
                      <option value="C" className="bg-slate-900 text-white">{dict.apply.classOptions.C}</option>
                    </select>
                  </div>

                  {/* Practice Slot */}
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1.5">
                      {dict.apply.preferredSlot}
                    </label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-950/70 border border-slate-700/80 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    >
                      <option value="morning" className="bg-slate-900 text-white">{dict.apply.slots.morning}</option>
                      <option value="day" className="bg-slate-900 text-white">{dict.apply.slots.day}</option>
                      <option value="evening" className="bg-slate-900 text-white">{dict.apply.slots.evening}</option>
                      <option value="weekend" className="bg-slate-900 text-white">{dict.apply.slots.weekend}</option>
                    </select>
                  </div>
                </div>

                {/* PDPA Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 bg-white"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {dict.apply.pdpaConsent}
                    </span>
                  </label>
                </div>

                {/* Submit Row */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{dict.apply.encryptedNote}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !pdpaConsent || !!nicError}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-hoperise-emerald transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? dict.apply.submitting : dict.apply.submitBtn}</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {dict.apply.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                    {dict.apply.successMessage}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 shadow-hoperise-emerald transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{dict.apply.confirmWhatsApp}</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName("");
                      setNicNumber("");
                      setPhone("");
                    }}
                    className="px-5 py-3.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Register Another Student
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
