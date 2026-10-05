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
    <section id="reviews" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Marcus Lorenzet Editorial Style */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
            <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
              [ 06 · TESTIMONIALS ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
            RESULTS SPEAK LOUDER
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
            {dict.reviews.subtitle}
          </p>
        </div>

        {/* Feature 1: Verified Student Testimonial Spotlight Card */}
        <div className="max-w-4xl mx-auto mb-14 sm:mb-18">
          <div className="rounded-3xl marcus-card p-6 sm:p-9 relative shadow-2xl overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#fcc438]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Trust Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-4">
              
              {/* Google Logo & Rating */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0c0a] border border-white/10">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <div className="flex items-center gap-1 text-[#fcc438]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#fcc438] text-[#fcc438]" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#f5f5f3]">5.0</span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab] text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fcc438] animate-pulse" />
                  <span>Verified DMT Licence Holder</span>
                </span>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevReview}
                  className="w-8 h-8 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#c7c2b6] hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-[#fcc438] px-1">
                  0{activeReviewIdx + 1} / 0{totalReviews}
                </span>
                <button
                  type="button"
                  onClick={handleNextReview}
                  className="w-8 h-8 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#c7c2b6] hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
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
                <p className="text-base sm:text-xl text-[#f5f5f3] font-medium leading-relaxed italic">
                  &ldquo;{currentReview.text[locale]}&rdquo;
                </p>

                {/* Student Profile & Result Attribution */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] font-black text-sm flex items-center justify-center shadow-lg shrink-0">
                      {currentReview.initials}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-black text-[#f5f5f3]">
                          {currentReview.name}
                        </h4>
                        <span className="text-[11px] font-mono text-[#8c877a]">
                          ({currentReview.location[locale]})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#d0c5ab] font-semibold mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
                        <span>{currentReview.licenceClass[locale]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Result Tag & Date */}
                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="px-3 py-1 rounded-xl bg-[#0d0c0a] border border-white/[0.06] text-xs font-semibold text-[#c7c2b6]">
                      {currentReview.outcomeTag[locale]}
                    </span>
                    <span className="text-[11px] font-mono text-[#8c877a]">
                      {currentReview.date[locale]}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Feature 2: Authentic Google Reviews & Direct Student Feedback Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          {/* Card A: Official Google Profile & QR Review Card */}
          <div className="rounded-3xl marcus-card p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#d0c5ab]">
                  <QrCode className="w-4 h-4 text-[#fcc438]" />
                  <span>Google Maps Review</span>
                </div>
                <div className="flex items-center gap-1 text-[#fcc438]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#fcc438] text-[#fcc438]" />
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-black text-[#f5f5f3]">
                {dict.reviews.leaveReviewTitle}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed">
                {dict.reviews.leaveReviewDesc}
              </p>

              <div className="mt-5 p-3.5 rounded-2xl bg-[#0d0c0a] border border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1c1a17] border border-white/10 flex items-center justify-center text-[#d0c5ab] shrink-0 font-bold text-xs">
                  5.0 ★
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#f5f5f3]">Wenasa Driving School Kirindiwela</div>
                  <div className="text-[11px] text-[#8c877a]">100% Genuine Student Reviews</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <a
                href={siteConfig.contact.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#d0c5ab] hover:text-white font-black text-xs uppercase tracking-wider transition-all border border-white/10 active:scale-95 shadow-sm"
              >
                <span>{dict.reviews.googleReviewBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card B: In-House Direct Feedback Collection Form */}
          <div className="rounded-3xl marcus-card p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#d0c5ab]">
                  <MessageSquareHeart className="w-4 h-4 text-[#fcc438]" />
                  <span>Direct Feedback</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#1c1a17] text-[#8c877a]">
                  Alumni Form
                </span>
              </div>

              <h3 className="text-lg font-black text-[#f5f5f3]">
                {dict.reviews.deskTitle}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed">
                {dict.reviews.deskSubtitle}
              </p>

              {feedbackSent ? (
                <div className="mt-6 p-4 rounded-2xl bg-[#1c1a17] border border-white/10 text-center animate-in fade-in duration-300">
                  <CheckCircle2 className="w-8 h-8 text-[#fcc438] mx-auto mb-2" />
                  <div className="text-sm font-bold text-[#f5f5f3]">{dict.reviews.thankYou}</div>
                  <div className="text-xs text-[#c7c2b6] mt-1">{dict.reviews.thankYouDesc}</div>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="mt-4 space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={dict.reviews.namePlaceholder}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#0d0c0a] text-xs text-[#f5f5f3] placeholder-[#8c877a] focus:outline-[#fcc438]"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder={dict.reviews.feedbackPlaceholder}
                      value={feedbackMsg}
                      onChange={(e) => setFeedbackMsg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#0d0c0a] text-xs text-[#f5f5f3] placeholder-[#8c877a] focus:outline-[#fcc438] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] font-black text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    <span>{dict.reviews.submitBtn}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
