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
    <section id="instructors" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Marcus Lorenzet Editorial Style */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
            <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
              [ 05 · CERTIFIED FACULTY ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
            {dict.instructors.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
            {dict.instructors.subtitle}
          </p>
        </div>

        {/* Master Asymmetric Stage: Highlighted Chief + Associate Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* HIGHLIGHTED HERO CARD: Chief Instructor & Founder (7 Col) */}
          <div className="lg:col-span-7 rounded-3xl marcus-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#fcc438]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab] text-xs font-black uppercase tracking-wider shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fcc438] animate-pulse" />
                  <span>{CHIEF_INSTRUCTOR.highlightTag?.[locale] || t.chiefTag}</span>
                </span>
                
                <div className="flex items-center gap-1.5 text-xs text-[#a8a295] bg-[#0d0c0a] border border-white/[0.06] px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono font-bold text-[#f5f5f3]">{CHIEF_INSTRUCTOR.licenceNo}</span>
                </div>
              </div>

              {/* Profile Identity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 mb-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#0d0c0a] border border-white/10 shadow-xl shrink-0">
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
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f5f5f3] tracking-tight">
                    {CHIEF_INSTRUCTOR.name}
                  </h3>
                  <div className="text-sm sm:text-base text-[#d0c5ab] font-bold mt-1">
                    {CHIEF_INSTRUCTOR.role[locale]}
                  </div>
                  
                  {/* Trust Metrics Chips */}
                  <div className="flex flex-wrap gap-2 mt-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0d0c0a] border border-white/[0.06] text-[#c7c2b6] font-bold">
                      {CHIEF_INSTRUCTOR.experience}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#1c1a17] border border-white/10 text-[#fcc438] font-bold">
                      {t.chiefStudents}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#1c1a17] border border-white/10 text-[#d0c5ab] font-bold">
                      {t.chiefPassRate}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#c7c2b6] leading-relaxed max-w-2xl font-normal">
                {CHIEF_INSTRUCTOR.bio[locale]}
              </p>

              {/* Founder Quote Card */}
              <div className="mt-5 p-4 rounded-2xl bg-[#0d0c0a] border border-white/[0.06] relative">
                <Quote className="w-5 h-5 text-[#fcc438]/20 absolute top-3.5 right-3.5" />
                <p className="text-xs text-[#d0c5ab] italic leading-relaxed pr-6">
                  &ldquo;{t.chiefQuote}&rdquo;
                </p>
              </div>

              {/* Specialties */}
              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono text-[#a8a295] uppercase tracking-wider block mb-2 font-bold">
                  {dict.instructors.specialty}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CHIEF_INSTRUCTOR.vehicleSpecialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold text-[#eae3d2] bg-[#1a1916] px-3 py-1 rounded-full border border-white/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-xs text-[#a8a295]">
                <span>{dict.instructors.languages}: </span>
                <span className="font-bold text-[#f5f5f3]">{CHIEF_INSTRUCTOR.languages.join(", ")}</span>
              </div>
              
              <a
                href={`https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20would%20like%20to%20request%20driving%20lessons%20with%20Chief%20Instructor%20Mr.%20Sunil%20Jayawardena.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] font-black text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.requestChiefBtn}</span>
              </a>
            </div>
          </div>

          {/* ASSOCIATE INSTRUCTORS SLIDER (5 Col) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Slider Top Bar Controls */}
            <div className="p-4 sm:p-5 rounded-3xl marcus-card flex items-center justify-between shadow-lg">
              <div>
                <h4 className="text-sm sm:text-base font-black text-[#f5f5f3]">
                  {t.sliderTitle}
                </h4>
                <p className="text-[11px] text-[#a8a295]">
                  {t.sliderSubtitle}
                </p>
              </div>

              {/* Slide Arrows & Counter */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#c7c2b6] hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Previous instructor"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-xs font-mono font-bold text-[#fcc438] px-2">
                  0{slideIndex + 1} / 0{totalSlides}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#c7c2b6] hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
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
                  className="h-full rounded-3xl marcus-card p-6 sm:p-7 flex flex-col justify-between shadow-2xl hover:border-[#d0c5ab]/30 transition-colors"
                >
                  <div>
                    {/* Badge & DMT License */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab]">
                        {currentAssociate.highlightTag?.[locale]}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs text-[#a8a295] bg-[#0d0c0a] px-3 py-1 rounded-full border border-white/[0.06]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono text-[#f5f5f3] font-bold">{currentAssociate.licenceNo}</span>
                      </div>
                    </div>

                    {/* Instructor Portrait & Details */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-[#0d0c0a] border border-white/10 shadow-lg shrink-0">
                        <Image
                          src={currentAssociate.imageSrc}
                          alt={currentAssociate.name}
                          fill
                          sizes="88px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h4 className="text-xl font-black text-[#f5f5f3]">
                          {currentAssociate.name}
                        </h4>
                        <div className="text-xs text-[#d0c5ab] font-semibold mt-0.5">
                          {currentAssociate.role[locale]}
                        </div>
                        <div className="text-xs font-mono text-[#a8a295] mt-1 font-bold">
                          {dict.instructors.experience}: <span className="text-[#f5f5f3]">{currentAssociate.experience}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#c7c2b6] leading-relaxed mt-3">
                      {currentAssociate.bio[locale]}
                    </p>

                    {/* Specialties */}
                    <div className="mt-5 pt-4 border-t border-white/[0.06]">
                      <span className="text-[10px] font-mono text-[#a8a295] uppercase tracking-wider block mb-2 font-bold">
                        {dict.instructors.specialty}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentAssociate.vehicleSpecialties.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-[#eae3d2] bg-[#1a1916] px-2.5 py-0.5 rounded-full border border-white/10"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Slide Action Bar */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="text-xs text-[#a8a295]">
                      <span>{dict.instructors.languages}: </span>
                      <span className="font-semibold text-[#c7c2b6]">{currentAssociate.languages.join(", ")}</span>
                    </div>

                    <a
                      href={`https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20would%20like%20to%20request%20lessons%20with%20Instructor%20${encodeURIComponent(currentAssociate.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#d0c5ab] hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#fcc438]" />
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
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === slideIndex ? "w-8 bg-[#fcc438]" : "w-2 bg-[#25231f] hover:bg-[#33302a]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Mandatory Accreditation Footer */}
        <div className="mt-12 text-center text-xs text-[#a8a295] flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-[#fcc438] shrink-0" />
          <span>{t.footerNotice}</span>
        </div>

      </div>
    </section>
  );
}
