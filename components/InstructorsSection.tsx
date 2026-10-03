"use client";

import { useState } from "react";
import Image from "next/image";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  ShieldCheck, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  GraduationCap,
  Quote
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InstructorsSectionProps {
  locale: Locale;
}

interface Instructor {
  id: string;
  name: string;
  licenceNo: string;
  role: { en: string; si: string; ta: string };
  experience: string;
  languages: string[];
  vehicleSpecialties: string[];
  imageSrc: string;
  bio: { en: string; si: string; ta: string };
  highlightTag?: { en: string; si: string; ta: string };
}

const CHIEF_INSTRUCTOR: Instructor = {
  id: "inst-1",
  name: "Sunil Jayawardena",
  licenceNo: "DMT/INS/7821",
  role: {
    en: "Chief Driving Instructor & Founder",
    si: "ප්‍රධාන රියදුරු උපදේශක සහ ආරම්භක",
    ta: "தலைமை ஓட்டுனர் பயிற்றுவிப்பாளர் மற்றும் நிறுவனர்",
  },
  experience: "16+ Years",
  languages: ["Sinhala", "English"],
  vehicleSpecialties: ["Cars (Manual & Auto)", "Heavy Commercial Trucks", "Defensive Road Tactics"],
  imageSrc: "/images/instructors/sunil-jayawardena.jpg",
  bio: {
    en: "Licensed by DMT Werahera with over 16 years of road instruction experience. Specializes in defensive driving techniques, hill starts, and student confidence building.",
    si: "වසර 16 කට අධික මඟපෙන්වීමේ පළපුරුද්දක් සහිත DMT බලපත්‍රලාභී ප්‍රධාන උපදේශකවරයා. ආරක්ෂිත රිය පැදවීම සහ මානසික බිය දුරුකිරීම පිළිබඳ විශේෂඥයෙකි.",
    ta: "16 ஆண்டுகளுக்கும் மேலான அனுபவமுள்ள DMT உரிமம் பெற்ற தலைமை பயிற்றுவிப்பாளர். தற்காப்பு ஓட்டுநர் நுட்பங்களில் நிபுணர்.",
  },
  highlightTag: {
    en: "Founder & Head of Training",
    si: "ආරම්භක සහ පුහුණු ප්‍රධානී",
    ta: "நிறுவனர் மற்றும் பயிற்சித் தலைவர்",
  },
};

const ASSOCIATE_INSTRUCTORS: Instructor[] = [
  {
    id: "inst-2",
    name: "Nirosha Perera",
    licenceNo: "DMT/INS/9104",
    role: {
      en: "Senior Instructor - Light Vehicles",
      si: "ජ්‍යෙෂ්ඨ උපදේශිකා - සැහැල්ලු වාහන",
      ta: "சிரேஷ்ட பயிற்றுவிப்பாளர் - இலகு வாகனங்கள்",
    },
    experience: "8+ Years",
    languages: ["Sinhala", "English"],
    vehicleSpecialties: ["Automatic Cars", "Manual Cars", "Scooters"],
    imageSrc: "/images/instructors/nirosha-perera.jpg",
    bio: {
      en: "Expert in patient instruction for beginners and nervous first-time drivers. Leads our dedicated training sessions for female learners with a calming approach.",
      si: "පළමු වරට රියදුරු අසුනට පැමිණෙන නවක සිසුන් සහ කාන්තා සිසුවියන් ඉවසීමෙන් පුහුණු කිරීම පිළිබඳ විශිෂ්ට උපදේශිකාවකි.",
      ta: "தொடக்கநிலை மாணவர்களுக்கு பொறுமையுடன் கற்பிப்பதில் வல்லவர். பெண் மாணவர்களுக்கான பிரத்தியேக அமர்வுகளை வழிநடத்துகிறார்.",
    },
    highlightTag: {
      en: "Female Training Specialist",
      si: "කාන්තා පුහුණු විශේෂඥ",
      ta: "பெண் பயிற்சி நிபுணர்",
    },
  },
  {
    id: "inst-3",
    name: "K. Selvaratnam",
    licenceNo: "DMT/INS/8432",
    role: {
      en: "Dual-Control & Motorbike Instructor",
      si: "ද්විත්ව පාලක සහ යතුරුපැදි උපදේශක",
      ta: "இரட்டை கட்டுப்பாட்டு மற்றும் மோட்டார் சைக்கிள் பயிற்றுவிப்பாளர்",
    },
    experience: "11+ Years",
    languages: ["Tamil", "Sinhala", "English"],
    vehicleSpecialties: ["Motorcycles (Class A)", "Three-Wheelers", "Cars"],
    imageSrc: "/images/instructors/k-selvaratnam.jpg",
    bio: {
      en: "Trilingual certified instructor covering Sinhala, Tamil, and English learners. Master of motorcycle slalom balancing and parking geometry.",
      si: "සිංහල, දෙමළ හා ඉංග්‍රීසි භාෂා ත්‍රිත්වයෙන්ම උපදෙස් ලබාදෙන පළපුරුදු සහතිකලත් උපදේශකවරයෙකි. යතුරුපැදි සහ කාර් විභාග විශේෂඥයෙකි.",
      ta: "தமிழ், சிங்களம் மற்றும் ஆங்கிலத்தில் கற்பிக்கும் மும்மொழி பயிற்றுவிப்பாளர். மோட்டார் சைக்கிள் மற்றும் கார் பயிற்சி நிபுணர்.",
    },
    highlightTag: {
      en: "Trilingual Specialist",
      si: "ත්‍රිභාෂා විශේෂඥ",
      ta: "மும்மொழி நிபுணர்",
    },
  },
];

const copy = {
  en: {
    badge: "Government Licensed Faculty",
    chiefTag: "Featured Leadership",
    chiefStudents: "4,500+ Licensed Students",
    chiefPassRate: "98.4% First-Time Pass",
    chiefQuote: "Defensive driving isn't just about passing a 15-minute trial — it's about making patience and road safety second nature for life.",
    requestChiefBtn: "Request Lessons with Mr. Sunil",
    sliderTitle: "Senior Instructor Faculty",
    sliderSubtitle: "Certified teachers guiding your practical dual-control hours",
    slideCount: "Instructor",
    requestInstructorBtn: "Request Lessons with",
    footerNotice: "All instructors hold active Department of Motor Traffic licences with mandatory annual defensive driving renewals.",
  },
  si: {
    badge: "රජයේ ලියාපදිංචි ගුරු මණ්ඩලය",
    chiefTag: "ප්‍රධාන නායකත්වය",
    chiefStudents: "බලපත්‍රලාභී සිසුන් 4,500+",
    chiefPassRate: "98.4% පළමු වර සමත්",
    chiefQuote: "රිය පැදවීම යනු විනාඩි 15ක විභාගයක් සමත්වීම පමණක් නොවේ. එය ජීවිත කාලය පුරාම විනය, ඉවසීම සහ මාර්ග ගෞරවය සුරැකීමයි.",
    requestChiefBtn: "සුනිල් මහතා සමඟ පුහුණුව වෙන්කරන්න",
    sliderTitle: "ජ්‍යෙෂ්ඨ උපදේශක මණ්ඩලය",
    sliderSubtitle: "ද්විත්ව පාලක ප්‍රායෝගික පුහුණුව මෙහෙයවන සහතිකලත් ගුරු මණ්ඩලය",
    slideCount: "උපදේශක",
    requestInstructorBtn: "පුහුණුව වෙන්කරන්න",
    footerNotice: "සියලුම උපදේශකවරුන් මෝටර් රථ ප්‍රවාහන දෙපාර්තමේන්තුවේ වලංගු බලපත්‍රලාභී වෘත්තිකයන් වේ.",
  },
  ta: {
    badge: "அரசாங்க பதிவு பெற்ற ஆசிரியர்கள்",
    chiefTag: "தலைமை பயிற்றுவிப்பாளர்",
    chiefStudents: "4,500+ தேர்ச்சி பெற்ற மாணவர்கள்",
    chiefPassRate: "98.4% முதல் முயற்சி தேர்ச்சி",
    chiefQuote: "வாகனம் ஓட்டுதல் என்பது 15 நிமிட தேர்வில் தேர்ச்சி பெறுவது மட்டுமல்ல, வாழ்நாள் முழுவதும் பொறுமை மற்றும் பாதுகாப்பைப் பேணுதலாகும்.",
    requestChiefBtn: "திரு. சுனில் அவர்களிடம் பயிற்சி பெற",
    sliderTitle: "சிரேஷ்ட பயிற்றுனர்கள்",
    sliderSubtitle: "செய்முறைப் பயிற்சியை வழிநடத்தும் சான்றளிக்கப்பட்ட ஆசிரியர்கள்",
    slideCount: "பயிற்றுனர்",
    requestInstructorBtn: "பயிற்சி பெறுக",
    footerNotice: "அனைத்து பயிற்றுனர்களும் மோட்டார் போக்குவரத்துத் திணைக்களத்தின் உத்தியோகபூர்வ அனுமதி பெற்றவர்கள்.",
  },
};

export function InstructorsSection({ locale }: InstructorsSectionProps) {
  const dict = getDictionary(locale);
  const t = copy[locale] || copy.en;
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const totalSlides = ASSOCIATE_INSTRUCTORS.length;
  const currentAssociate = ASSOCIATE_INSTRUCTORS[slideIndex];

  const handleNext = () => {
    setSlideDirection(1);
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (idx: number) => {
    setSlideDirection(idx > slideIndex ? 1 : -1);
    setSlideIndex(idx);
  };

  return (
    <section id="instructors" className="py-20 sm:py-24 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
            {dict.instructors.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.instructors.subtitle}
          </p>
        </div>

        {/* Master Asymmetric Stage: Highlighted Chief + Associate Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ======================================================== */}
          {/* HIGHLIGHTED HERO CARD: Chief Instructor & Founder (7 Col) */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 rounded-[2.25rem] p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500/35 via-slate-800/50 to-slate-900 border-2 border-emerald-500/60 shadow-2xl relative overflow-hidden group">
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/30 p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {/* Atmospheric emerald halo */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Header Badge Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{CHIEF_INSTRUCTOR.highlightTag?.[locale] || t.chiefTag}</span>
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono font-bold text-white">{CHIEF_INSTRUCTOR.licenceNo}</span>
                  </div>
                </div>

                {/* Profile Identity */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 mb-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500/80 shadow-xl shrink-0">
                    <Image
                      src={CHIEF_INSTRUCTOR.imageSrc}
                      alt={CHIEF_INSTRUCTOR.name}
                      fill
                      sizes="112px"
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {CHIEF_INSTRUCTOR.name}
                    </h3>
                    <div className="text-sm sm:text-base text-emerald-400 font-bold mt-1">
                      {CHIEF_INSTRUCTOR.role[locale]}
                    </div>
                    
                    {/* Trust Metrics Chips */}
                    <div className="flex flex-wrap gap-2 mt-3 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-bold">
                        {CHIEF_INSTRUCTOR.experience}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-bold">
                        {t.chiefStudents}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-teal-950/60 border border-teal-800/60 text-teal-300 font-bold">
                        {t.chiefPassRate}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
                  {CHIEF_INSTRUCTOR.bio[locale]}
                </p>

                {/* Founder Quote Card */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-950/80 border border-emerald-900/40 relative">
                  <Quote className="w-5 h-5 text-emerald-400/40 absolute top-3.5 right-3.5" />
                  <p className="text-xs text-slate-300 italic leading-relaxed pr-6">
                    &ldquo;{t.chiefQuote}&rdquo;
                  </p>
                </div>

                {/* Specialties */}
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                    {dict.instructors.specialty}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {CHIEF_INSTRUCTOR.vehicleSpecialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold text-emerald-200 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/50"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  <span>{dict.instructors.languages}: </span>
                  <span className="font-bold text-white">{CHIEF_INSTRUCTOR.languages.join(", ")}</span>
                </div>
                
                <a
                  href={`https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20would%20like%20to%20request%20driving%20lessons%20with%20Chief%20Instructor%20Mr.%20Sunil%20Jayawardena.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-emerald-glow active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.requestChiefBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* ASSOCIATE INSTRUCTORS SLIDER (5 Col - "Simply Slide")    */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Slider Top Bar Controls */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg">
              <div>
                <h4 className="text-sm sm:text-base font-black text-white">
                  {t.sliderTitle}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {t.sliderSubtitle}
                </p>
              </div>

              {/* Slide Arrows & Counter */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Previous instructor"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-xs font-mono font-bold text-emerald-400 px-2">
                  0{slideIndex + 1} / 0{totalSlides}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Next instructor"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sliding Card Container */}
            <div className="flex-1 relative min-h-[380px] sm:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAssociate.id}
                  initial={{ opacity: 0, x: slideDirection * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 40 }}
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="h-full rounded-[2.25rem] border border-slate-800 bg-slate-900/95 p-6 sm:p-7 flex flex-col justify-between shadow-2xl hover:border-emerald-500/40 transition-colors"
                >
                  <div>
                    {/* Badge & DMT License */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                        {currentAssociate.highlightTag?.[locale]}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono text-white font-bold">{currentAssociate.licenceNo}</span>
                      </div>
                    </div>

                    {/* Instructor Portrait & Details */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500/60 shadow-lg shrink-0">
                        <Image
                          src={currentAssociate.imageSrc}
                          alt={currentAssociate.name}
                          fill
                          sizes="88px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h4 className="text-xl font-black text-white">
                          {currentAssociate.name}
                        </h4>
                        <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                          {currentAssociate.role[locale]}
                        </div>
                        <div className="text-xs font-mono text-slate-300 mt-1 font-bold">
                          {dict.instructors.experience}: <span className="text-white">{currentAssociate.experience}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                      {currentAssociate.bio[locale]}
                    </p>

                    {/* Specialties */}
                    <div className="mt-5 pt-4 border-t border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                        {dict.instructors.specialty}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentAssociate.vehicleSpecialties.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Slide Action Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-400">
                      <span>{dict.instructors.languages}: </span>
                      <span className="font-semibold text-slate-200">{currentAssociate.languages.join(", ")}</span>
                    </div>

                    <a
                      href={`https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20would%20like%20to%20request%20lessons%20with%20Instructor%20${encodeURIComponent(currentAssociate.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t.requestInstructorBtn} {currentAssociate.name.split(" ")[0]}</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {ASSOCIATE_INSTRUCTORS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === slideIndex ? "w-8 bg-emerald-400" : "w-2 bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Mandatory Accreditation Footer */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.footerNotice}</span>
        </div>

      </div>
    </section>
  );
}
