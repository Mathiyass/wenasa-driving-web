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
    <section id="apply" className="py-20 sm:py-28 relative overflow-hidden scroll-mt-20">
      {/* Background ambient gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-[#fcc438]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d0c5ab] uppercase mb-3">
            <span className="text-[#fcc438]">■</span>
            <span>[ 11 · {dict.apply.badge} ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5f2eb] tracking-tight" style={{ textWrap: "balance" }}>
            {dict.apply.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a39e93] leading-relaxed max-w-xl mx-auto">
            {dict.apply.subtitle}
          </p>
        </div>

        <div className="bg-[#141310] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl relative">
          {/* Subtle top edge gold highlight */}
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#fcc438]/30 to-transparent" />

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
                    <label className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#d0c5ab] block mb-2">
                      {dict.apply.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={dict.apply.fullNamePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl bg-[#0d0c0a] border border-white/10 text-[#f5f2eb] placeholder-[#6b675e] focus:outline-none focus:border-[#fcc438] focus:ring-1 focus:ring-[#fcc438]/40 transition-all"
                    />
                  </div>

                  {/* NIC Number */}
                  <div>
                    <label className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#d0c5ab] block mb-2">
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
                      className={`w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl bg-[#0d0c0a] border text-[#f5f2eb] placeholder-[#6b675e] focus:outline-none focus:border-[#fcc438] focus:ring-1 focus:ring-[#fcc438]/40 transition-all font-mono ${
                        nicError ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20" : "border-white/10"
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
                    <label className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#d0c5ab] block mb-2">
                      {dict.apply.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="07X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl bg-[#0d0c0a] border border-white/10 text-[#f5f2eb] placeholder-[#6b675e] focus:outline-none focus:border-[#fcc438] focus:ring-1 focus:ring-[#fcc438]/40 transition-all font-mono"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#d0c5ab] block mb-2">
                      {dict.apply.whatsapp}
                    </label>
                    <input
                      type="tel"
                      placeholder="07X XXX XXXX"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl bg-[#0d0c0a] border border-white/10 text-[#f5f2eb] placeholder-[#6b675e] focus:outline-none focus:border-[#fcc438] focus:ring-1 focus:ring-[#fcc438]/40 transition-all font-mono"
                    />
                  </div>

                  {/* Licence Class */}
                  <div>
                    <label className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#d0c5ab] block mb-2">
                      {dict.apply.licenceClass}
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl bg-[#0d0c0a] border border-white/10 text-[#f5f2eb] focus:outline-none focus:border-[#fcc438] focus:ring-1 focus:ring-[#fcc438]/40 transition-all cursor-pointer"
                    >
                      <option value="B" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.classOptions.B}</option>
                      <option value="A" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.classOptions.A}</option>
                      <option value="BA" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.classOptions.BA}</option>
                      <option value="B1" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.classOptions.B1}</option>
                      <option value="C" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.classOptions.C}</option>
                    </select>
                  </div>

                  {/* Practice Slot */}
                  <div>
                    <label className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#d0c5ab] block mb-2">
                      {dict.apply.preferredSlot}
                    </label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-xl bg-[#0d0c0a] border border-white/10 text-[#f5f2eb] focus:outline-none focus:border-[#fcc438] focus:ring-1 focus:ring-[#fcc438]/40 transition-all cursor-pointer"
                    >
                      <option value="morning" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.slots.morning}</option>
                      <option value="day" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.slots.day}</option>
                      <option value="evening" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.slots.evening}</option>
                      <option value="weekend" className="bg-[#141310] text-[#f5f2eb]">{dict.apply.slots.weekend}</option>
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
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-[#0d0c0a] text-[#fcc438] focus:ring-[#fcc438] accent-[#fcc438] cursor-pointer"
                    />
                    <span className="text-xs text-[#a39e93] leading-relaxed group-hover:text-[#f5f2eb] transition-colors">
                      {dict.apply.pdpaConsent}
                    </span>
                  </label>
                </div>

                {/* Submit Row */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#78756c]">
                    <ShieldCheck className="w-4 h-4 text-[#d0c5ab] shrink-0" />
                    <span>{dict.apply.encryptedNote}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !pdpaConsent || !!nicError}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0d0c0a] bg-[#d0c5ab] hover:bg-[#e4dcce] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? dict.apply.submitting : dict.apply.submitBtn}</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#fcc438]/10 text-[#fcc438] border border-[#fcc438]/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#f5f2eb] tracking-tight">
                    {dict.apply.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a39e93] max-w-lg mx-auto leading-relaxed">
                    {dict.apply.successMessage}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0d0c0a] bg-[#25D366] hover:bg-[#20ba59] active:scale-95 shadow-md transition-all"
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
                    className="px-5 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#d0c5ab] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
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
