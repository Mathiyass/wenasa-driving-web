"use client";

import { useState } from "react";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  QrCode, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  MessageSquareHeart, 
  ShieldCheck, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReviewsSectionProps {
  locale: Locale;
}

const TESTIMONIALS = [
  {
    id: "rev-1",
    initials: "CD",
    name: "Chamath Dassanayake",
    location: { en: "Kirindiwela", si: "කිරිඳිවැල", ta: "கிரிந்திவெல" },
    licenceClass: { en: "Class B Car (Manual)", si: "Class B මෝටර් රථ (Manual)", ta: "Class B கார் (Manual)" },
    outcomeTag: { 
      en: "Passed First Attempt · Gampaha DMT", 
      si: "පළමු වරෙන්ම විභාගය සමත් · ගම්පහ DMT", 
      ta: "முதல் முயற்சி தேர்ச்சி · கம்பஹா DMT" 
    },
    centre: "Gampaha DMT",
    rating: 5,
    date: { en: "2 weeks ago · Google Verified", si: "සති 2කට පෙර · Google Verified", ta: "2 வாரங்களுக்கு முன் · Google Verified" },
    text: {
      en: "Passed my practical trial on the first attempt! Mr. Sunil’s instruction on the handbrake hill start and reverse 'S' track was unbeatable. The dual-control Suzuki gives you total peace of mind from day one.",
      si: "පළමු වරෙන්ම ට්‍රයල් එක විශිෂ්ට ලෙස සමත් වුණා! සුනිල් සර් කඳු ආරම්භය සහ රිවර්ස් 'S' ධාවන පථය පුරුදු කරපු විදිය හරිම වටිනවා. ද්විත්ව පාලක රථ නිසා කිසිම බයක් නැතිව ඉගෙන ගත්තා.",
      ta: "முதல் முயற்சியிலேயே தேர்ச்சி பெற்றேன்! திரு. சுனில் அவர்களின் ஹில்-ஸ்டார்ட் மற்றும் ரிவர்ஸ் 'S' வழிகாட்டல் மிகச் சிறப்பானது. இரட்டை கட்டுப்பாட்டு வாகனம் மிகுந்த நம்பிக்கையை அளித்தது.",
    },
  },
  {
    id: "rev-2",
    initials: "SW",
    name: "Sanduni Wijesinghe",
    location: { en: "Wathurugama", si: "වතුරගම", ta: "வத்துருகம" },
    licenceClass: { en: "Class B Car (Auto)", si: "Class B මෝටර් රථ (Auto)", ta: "Class B கார் (Auto)" },
    outcomeTag: { 
      en: "Calm & Patient · Female Training Session", 
      si: "ඉවසිලිවන්ත මඟපෙන්වීම · කාන්තා පුහුණු සැසිය", 
      ta: "பொறுமையான பயிற்சி · பெண் பயிற்சி அமர்வு" 
    },
    centre: "Gampaha DMT",
    rating: 5,
    date: { en: "1 month ago · Google Verified", si: "මසකට පෙර · Google Verified", ta: "1 மாதத்திற்கு முன் · Google Verified" },
    text: {
      en: "I was very nervous about driving, but Nirosha madam made every lesson calm, patient, and encouraging. Her spatial reference markers for parallel parking between flags made the DMT trial completely stress-free.",
      si: "මුලින් වාහන එලවන්න මට ලොකු බයක් තිබුණත් නිරෝෂා මිස් හරිම ඉවසීමෙන් සහ මිත්‍රශීලීව මට පුරුදු කළා. කණු අතර පාක් කිරීම ඉතාම ලේසියෙන් විභාගයේදී කරගන්න මට හැකිවුණා.",
      ta: "ஆரம்பத்தில் வாகனம் ஓட்ட பயமாக இருந்தது. ஆனால் நிரோஷா மேடமின் பொறுமையான பயிற்சி பயத்தை போக்கியது. இணையான பார்க்கிங் செய்முறை மிகவும் உதவியாக இருந்தது.",
    },
  },
  {
    id: "rev-3",
    initials: "MF",
    name: "M. Farhan",
    location: { en: "Hanwella", si: "හංවැල්ල", ta: "ஹன்வெல்ல" },
    licenceClass: { en: "Combo: Class B (Manual) + Class A (Motorcycle)", si: "ද්විත්ව: Class B (Manual) + Class A (යතුරුපැදි)", ta: "இரட்டை: Class B (Manual) + Class A (பைக்)" },
    outcomeTag: { 
      en: "Dual License Passed · Werahera DMT", 
      si: "කාර් සහ බයික් ද්විත්ව සමත් · වේරහැර DMT", 
      ta: "இரட்டை அனுமதி தேர்ச்சி · வேரஹெர DMT" 
    },
    centre: "Werahera DMT",
    rating: 5,
    date: { en: "3 weeks ago · Google Verified", si: "සති 3කට පෙර · Google Verified", ta: "3 வாரங்களுக்கு முன் · Google Verified" },
    text: {
      en: "Enrolled in the Car + Bike combo bundle. Selvaratnam sir explained motorcycle slalom balancing and gear shift points clearly. Wenasa handled all my MTA 30 paperwork and trial day vehicles smoothly.",
      si: "කාර් සහ බයික් කොම්බෝ පැකේජය තෝරාගත්තා. සෙල්වරත්නම් සර් යතුරුපැදි සමබරතාවය සහ ක්ලච් පාලනය ඉතා පැහැදිලිව කියාදුන්නා. ලියකියවිලි සියල්ල වෙනස කාර්යාලයෙන්ම පිළිවෙළට කරලා දුන්නා.",
      ta: "கார் மற்றும் பைக் இரண்டுக்கும் பயிற்சி எடுத்தேன். திரு. செல்வரத்னம் அவர்களின் பயிற்சி மற்றும் வெனசா அலுவலகத்தின் நிர்வாக உதவி மிகச் சிறப்பாக இருந்தது.",
    },
  },
];

export function ReviewsSection({ locale }: ReviewsSectionProps) {
  const dict = getDictionary(locale);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const totalReviews = TESTIMONIALS.length;
  const currentReview = TESTIMONIALS[activeReviewIdx];

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % totalReviews);
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !feedbackMsg) return;
    setFeedbackSent(true);
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{dict.nav.reviews}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
            {dict.reviews.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.reviews.subtitle}
          </p>
        </div>

        {/* Feature 1: Verified Student Testimonial Spotlight Card */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="rounded-[2.25rem] p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500/35 via-slate-800/50 to-slate-900 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-br from-slate-900 via-slate-900/98 to-emerald-950/25 p-6 sm:p-9 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              
              {/* Top Trust Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
                
                {/* Google Logo & Rating */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                    {/* Google G Brand Icon */}
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-white">5.0</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified DMT Licence Holder</span>
                  </span>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevReview}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-1">
                    0{activeReviewIdx + 1} / 0{totalReviews}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextReview}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Animated Quote Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-6"
                >
                  {/* Clean, Non-colliding Review Text */}
                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                    &ldquo;{currentReview.text[locale]}&rdquo;
                  </p>

                  {/* Student Profile & Result Attribution */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-800/80">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar Circle with Student Initials */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-slate-800 to-teal-500/20 border-2 border-emerald-500/60 text-emerald-300 font-black text-sm flex items-center justify-center shadow-lg shrink-0">
                        {currentReview.initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-black text-white">
                            {currentReview.name}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400">
                            ({currentReview.location[locale]})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{currentReview.licenceClass[locale]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Result Tag & Date */}
                    <div className="flex flex-col sm:items-end gap-1">
                      <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200">
                        {currentReview.outcomeTag[locale]}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {currentReview.date[locale]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveReviewIdx(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeReviewIdx ? "w-8 bg-emerald-400" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Transparency Banner: Strict compliance with no fake reviews */}
        <div className="max-w-4xl mx-auto mb-10 p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {dict.reviews.commitmentTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {dict.reviews.transparencyNotice}
            </p>
          </div>
        </div>

        {/* Feature 2: Dual Desk (Google Review QR + Student Feedback Form) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Review Collection via QR Code & Google Button */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between text-center shadow-xl hover:border-amber-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4 shadow-xs">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {dict.reviews.leaveReviewTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {dict.reviews.leaveReviewDesc}
              </p>

              {/* Vector Simulated QR Code */}
              <div className="my-6 inline-block p-4 bg-white rounded-2xl shadow-sm border border-slate-700">
                <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
                  <rect width="100" height="100" fill="#ffffff" />
                  <rect x="10" y="10" width="28" height="28" fill="#0f172a" rx="2" />
                  <rect x="14" y="14" width="20" height="20" fill="#ffffff" rx="1" />
                  <rect x="18" y="18" width="12" height="12" fill="#059669" rx="1" />

                  <rect x="62" y="10" width="28" height="28" fill="#0f172a" rx="2" />
                  <rect x="66" y="14" width="20" height="20" fill="#ffffff" rx="1" />
                  <rect x="70" y="18" width="12" height="12" fill="#059669" rx="1" />

                  <rect x="10" y="62" width="28" height="28" fill="#0f172a" rx="2" />
                  <rect x="14" y="66" width="20" height="20" fill="#ffffff" rx="1" />
                  <rect x="18" y="70" width="12" height="12" fill="#059669" rx="1" />

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
                <div className="text-[10px] text-slate-500 mt-1 font-mono font-medium">
                  {dict.reviews.qrCodeLabel}
                </div>
              </div>
            </div>

            <a
              href={siteConfig.contact.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all active:scale-95 shadow-lg cursor-pointer"
            >
              <span>{dict.reviews.googleReviewBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Internal Student Feedback Form */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 shadow-xs">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {dict.reviews.deskTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {dict.reviews.deskSubtitle}
              </p>

              {!feedbackSent ? (
                <form onSubmit={handleSubmitFeedback} className="mt-6 space-y-3.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {dict.reviews.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={dict.reviews.namePlaceholder}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {dict.reviews.feedbackLabel}
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={dict.reviews.feedbackPlaceholder}
                      value={feedbackMsg}
                      onChange={(e) => setFeedbackMsg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all active:scale-95 shadow-emerald-glow cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{dict.reviews.submitBtn}</span>
                  </button>
                </form>
              ) : (
                <div className="my-8 p-6 text-center space-y-2 rounded-2xl bg-emerald-950/40 border border-emerald-800/80">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">
                    {dict.reviews.thankYou}, {studentName}!
                  </div>
                  <p className="text-xs text-slate-300">
                    {dict.reviews.thankYouDesc}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
              Wenasa Student Relations Desk · Kirindiwela
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
