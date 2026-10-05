"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { 
  FileQuestion, 
  Compass, 
  BookOpen, 
  Sparkles,
  Video,
  Users,
  GraduationCap,
  ShoppingBag,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { MockExamModal } from "./MockExamModal";
import { RoadSignsModal } from "./RoadSignsModal";
import { LicenceGuideModal } from "./LicenceGuideModal";
import { PackageFinderModal } from "./PackageFinderModal";
import { VideoLessonsModal } from "./VideoLessonsModal";
import { StudentPortalModal } from "./StudentPortalModal";
import { StudentKitModal } from "./StudentKitModal";

interface DigitalResourcesGridProps {
  locale: Locale;
}

const hubContent = {
  en: {
    badge: "Digital Learning & Resource Suite",
    title: "Official DMT Exam & Learning Center",
    subtitle: "Everything you need to master your theory exam and practical road rules. Prepare anytime on your phone or computer.",
    
    examBadge: "Official DMT Computer Exam · 40 Questions",
    examTitle: "DMT Theory Mock Exam Simulator",
    examDesc: "Practice with authentic multiple-choice questions modeled exactly after the official Department of Motor Traffic computer test in Werahera and Gampaha.",
    examChips: [
      "60-Minute Countdown Clock",
      "30/40 Passing Standard",
      "Instant Score & Explanations",
      "Trilingual: EN · SI · TA",
    ],
    examBtn: "Launch Mock Exam Simulator",

    signsBadge: "21 DMT Vector Signs · Study Mode",
    signsTitle: "Official DMT Road Signs Directory",
    signsDesc: "Interactive visual catalog of Sri Lankan regulatory, warning, and informational road signs rendered with reflective enamel finish and flashcard test mode.",
    signsChips: [
      "21 Authentic DMT Vector Signs",
      "Interactive Flashcard Study Mode",
      "Regulatory & Warning Filters",
      "Bilingual Rule Explanations",
    ],
    signsBtn: "Explore Road Signs Catalog",

    guideBadge: "7-Step Guide",
    guideTitle: "Licence Information Guide",
    guideDesc: "Official document checklists, NTMI medical requirements, L-plate hold timelines, and testing center details.",
    guideBtn: "Read Licence Guide",

    finderBadge: "30-Sec Matcher",
    finderTitle: "Training Packages",
    finderDesc: "Compare beginner, refresher, manual, and automatic comprehensive course bundles or take our interactive quiz.",
    finderBtn: "Find My Package",

    videoBadge: "3 Masterclasses",
    videoTitle: "Video Lessons",
    videoDesc: "Step-by-step video tutorials on clutch bite point control, parallel parking between flags, and reverse 'S' tracks.",
    videoBtn: "Watch Video Lessons",

    portalBadge: "Learner Desk",
    portalTitle: "Student Portal",
    portalDesc: "Track your driven hours, lesson schedules, skill scores, upcoming test dates, and contact your instructor.",
    portalBtn: "Open Student Desk",

    blogBadge: "Examiner Secrets",
    blogTitle: "Educational Blog & Practical Trial Secrets",
    blogDesc: "Expert articles written by senior DMT-certified instructors on passing your practical trial on the first attempt, hill starts, and defensive driving on Sri Lankan roads.",
    blogBtn: "Read All Articles",
    blogPreviewTag: "Featured Guide",
    blogPreviewTitle: "10 Common Mistakes on the DMT Practical Trial & How to Avoid Them",

    shopBadge: "Kirindiwela Stock",
    shopTitle: "Student Shop & Test-Day Starter Kits",
    shopDesc: "Official magnetic DMT-regulation L-plates, highway code handbooks, driver logbooks, and test-day kits available at our Kirindiwela office or via courier.",
    shopBtn: "Browse Starter Kits & Gear",
    shopPreviewTag: "Counter Collection",
    shopPreviewTitle: "Official Weatherproof Magnetic L-Plates & Illustrated Highway Code Manuals",
  },
  si: {
    badge: "ඩිජිටල් ඉගෙනුම් පද්ධතිය",
    title: "නිල DMT විභාග සහ ඉගෙනුම් මධ්‍යස්ථානය",
    subtitle: "ලිඛිත විභාගය සහ ප්‍රායෝගික මාර්ග නීති පහසුවෙන්ම ප්‍රගුණ කිරීමට අවශ්‍ය සියලුම ඩිජිටල් මෙවලම් මෙහිදී ලබාගන්න.",
    
    examBadge: "නිල DMT පරිගණක විභාගය · ප්‍රශ්න 40",
    examTitle: "DMT ලිඛිත ආදර්ශ විභාග පද්ධතිය",
    examDesc: "වේරහැර සහ ගම්පහ දිස්ත්‍රික් කාර්යාලවල පවත්වන පරිගණක විභාගයට සමාන සැබෑ ප්‍රශ්න පත්‍රවලින් පුහුණු වන්න.",
    examChips: [
      "විනාඩි 60ක කාල ගණකය",
      "සමත්වීමට ලකුණු 30/40",
      "ක්ෂණික පිළිතුරු සහ විවරණ",
      "භාෂා ත්‍රිත්වයෙන්ම: SI · EN · TA",
    ],
    examBtn: "ආදර්ශ විභාගය අරඹන්න",

    signsBadge: "DMT මාර්ග සංඥා 21 · අධ්‍යයන ක්‍රමය",
    signsTitle: "නිල මාර්ග සංඥා නාමාවලිය",
    signsDesc: "ශ්‍රී ලංකාවේ නියෝග, අනතුරු ඇඟවීම් සහ තොරතුරු සංඥා සියල්ල සවිස්තරාත්මකව හා Flashcard ක්‍රමයෙන් ඉගෙන ගන්න.",
    signsChips: [
      "සැබෑ DMT දෛශික සංඥා 21ක්",
      "Flashcard අභ්‍යාස ක්‍රමය",
      "නියෝග සහ අනතුරු පෙරහන්",
      "ද්විභාෂා නීති පැහැදිලි කිරීම්",
    ],
    signsBtn: "සංඥා නාමාවලිය බලන්න",

    guideBadge: "පියවර 7ක මඟපෙන්වීම",
    guideTitle: "බලපත්‍ර තොරතුරු අත්පොත",
    guideDesc: "අවශ්‍ය ලියකියවිලි, NTMI වෛද්‍ය පරීක්ෂණ, L-තහඩු කාලසීමා සහ විභාග මධ්‍යස්ථාන තොරතුරු.",
    guideBtn: "අත්පොත කියවන්න",

    finderBadge: "තත්පර 30 තේරීම",
    finderTitle: "පාඨමාලා පැකේජ",
    finderDesc: "ඔබට වඩාත් ගැළපෙන මෝටර් රථ හෝ යතුරුපැදි පාඨමාලාව පහසුවෙන්ම තෝරාගන්න.",
    finderBtn: "පැකේජය සොයන්න",

    videoBadge: "ප්‍රායෝගික වීඩියෝ 3",
    videoTitle: "වීඩියෝ පාඩම් මාලාව",
    videoDesc: "ක්ලච් පාලනය, කණු අතර පාක් කිරීම සහ රිවර්ස් S අභ්‍යාස පිළිබඳ වීඩියෝ මඟපෙන්වීම්.",
    videoBtn: "වීඩියෝ නරඹන්න",

    portalBadge: "සිසු පිවිසුම",
    portalTitle: "ශිෂ්‍ය කළමනාකරණ පද්ධතිය",
    portalDesc: "පුහුණු වූ පැය ගණන, ඉදිරි කාලසටහන සහ DMT විභාග දිනයන් පරීක්ෂා කරගන්න.",
    portalBtn: "සිසු පිවිසුම විවෘත කරන්න",

    blogBadge: "විභාග රහස්",
    blogTitle: "අධ්‍යාපනික ලිපි සහ ට්‍රයල් රහස්",
    blogDesc: "පළමු වරෙන්ම ප්‍රායෝගික පරීක්ෂණය සමත්වීමට සහ ආරක්ෂිත රිය පැදවීමට ජ්‍යෙෂ්ඨ උපදේශකවරුන්ගේ උපදෙස්.",
    blogBtn: "ලිපි සියල්ල කියවන්න",
    blogPreviewTag: "විශේෂ ලිපිය",
    blogPreviewTitle: "DMT ප්‍රායෝගික පරීක්ෂණයේදී සිදුවන ප්‍රධාන වැරදි 10ක් සහ ඒවා මඟහරවා ගැනීම",

    shopBadge: "කිරිඳිවැල ගබඩාව",
    shopTitle: "ශිෂ්‍ය අවශ්‍යතා සහ ආරක්ෂිත කට්ටල",
    shopDesc: "නිල චුම්භක L-තහඩු, මාර්ග නීති සංග්‍රහ පොත් සහ විභාග කට්ටල කාර්යාලයෙන් හෝ නිවසටම ගෙන්වා ගන්න.",
    shopBtn: "අවශ්‍ය දෑ බලන්න",
    shopPreviewTag: "සෘජු බෙදාහැරීම",
    shopPreviewTitle: "නියමිත ප්‍රමිතියෙන් යුත් චුම්භක L-තහඩු සහ වර්ණවත් මාර්ග සංඥා අත්පොත්",
  },
  ta: {
    badge: "டிஜிட்டல் கற்றல் தளம்",
    title: "உத்தியோகபூர்வ DMT பரீட்சை மற்றும் கற்றல் மையம்",
    subtitle: "கோட்பாட்டுப் பரீட்சை மற்றும் செய்முறைப் பயிற்சிகளுக்கு தேவையான அனைத்து டிஜிட்டல் வளங்களும் இங்கே.",
    
    examBadge: "உத்தியோகபூர்வ DMT கணினி பரீட்சை · 40 வினாக்கள்",
    examTitle: "DMT கோட்பாட்டு மாதிரி பரீட்சை",
    examDesc: "வேரஹெர மற்றும் கம்பஹா பரீட்சை நிலையங்களின் உத்தியோகபூர்வ வினாக்கள் போன்ற மாதிரி வினாத்தாள்கள் மூலம் பயிற்சி பெறுக.",
    examChips: [
      "60 நிமிட நேரக் கணிப்பான்",
      "30/40 தேர்ச்சி தரம்",
      "உடனடி புள்ளிகள் மற்றும் விளக்கம்",
      "மும்மொழி தெரிவு: TA · EN · SI",
    ],
    examBtn: "மாதிரிப் பரீட்சையைத் தொடங்க",

    signsBadge: "21 DMT வீதி சமிக்ஞைகள் · கற்றல் முறை",
    signsTitle: "உத்தியோகபூர்வ வீதி சமிக்ஞைகள் விபரம்",
    signsDesc: "இலங்கையின் ஒழுங்குமுறை, எச்சரிக்கை மற்றும் தகவல் சமிக்ஞைகளை எளிதாகக் கற்றுக் கொள்ளுங்கள்.",
    signsChips: [
      "21 உத்தியோகபூர்வ DMT சமிக்ஞைகள்",
      "Flashcard ஊடாடும் கற்றல்",
      "ஒழுங்குமுறை & எச்சரிக்கை பிரிவுகள்",
      "இருமொழி விதிமுறை விளக்கங்கள்",
    ],
    signsBtn: "சமிக்ஞைகளைப் பார்வையிட",

    guideBadge: "7-படி வழிகாட்டி",
    guideTitle: "அனுமதிப்பத்திர தகவல் வழிகாட்டி",
    guideDesc: "தேவையான ஆவணங்கள், NTMI மருத்துவ பரிசோதனை விபரங்கள் மற்றும் கால அட்டவணைகள்.",
    guideBtn: "வழிகாட்டியைப் படிக்க",

    finderBadge: "30-வினாடி தெரிவு",
    finderTitle: "பயிற்சித் தொகுப்புகள்",
    finderDesc: "உங்களுக்கான சிறந்த பயிற்சித் தொகுப்பை எளிதாகத் தேர்ந்தெடுங்கள்.",
    finderBtn: "தொகுப்பைத் தேட",

    videoBadge: "3 வீடியோ வகுப்புகள்",
    videoTitle: "வீடியோ பாடங்கள்",
    videoDesc: "கிளட்ச் கட்டுப்பாடு, பார்க்கிங் மற்றும் ரிவர்ஸ் 'S' பயிற்சிக்கான செய்முறை வீடியோக்கள்.",
    videoBtn: "வீடியோக்களைப் பார்க்க",

    portalBadge: "மாணவர் தளம்",
    portalTitle: "மாணவர் போர்டல்",
    portalDesc: "பயிற்சி மணிநேரங்கள், வரவிருக்கும் வகுப்புகள் மற்றும் DMT பரீட்சை விபரங்களை அறியுங்கள்.",
    portalBtn: "போர்டலைத் திறக்க",

    blogBadge: "பரீட்சை ரகசியங்கள்",
    blogTitle: "கற்றல் கட்டுரைகள் மற்றும் சோதனை ரகசியங்கள்",
    blogDesc: "செய்முறைப் பரீட்சையில் முதல் முயற்சியிலேயே தேர்ச்சி பெறுவதற்கான முக்கிய ஆலோசனைகள் மற்றும் பாதுகாப்பு விதிகள்.",
    blogBtn: "கட்டுரைகளைப் படிக்க",
    blogPreviewTag: "சிறப்புக் கட்டுரை",
    blogPreviewTitle: "DMT செய்முறைப் பரீட்சையில் தவிர்க்க வேண்டிய 10 முக்கிய தவறுகள்",

    shopBadge: "கிரிந்திவெல இருப்பு",
    shopTitle: "மாணவர் அங்காடி மற்றும் பாதுகாப்பு கருவிகள்",
    shopDesc: "உத்தியோகபூர்வ காந்த L-அட்டைகள், வீதி விதிமுறை புத்தகங்கள் மற்றும் பரீட்சை பாதுகாப்பு உபகரணங்கள்.",
    shopBtn: "உபகரணங்களைப் பார்க்க",
    shopPreviewTag: "நேரடி விநியோகம்",
    shopPreviewTitle: "உத்தியோகபூர்வ காந்த L-அட்டைகள் மற்றும் முழுமையான வீதி விதிமுறை கையேடுகள்",
  },
};

export function DigitalResourcesGrid({ locale }: DigitalResourcesGridProps) {
  const [activeModal, setActiveModal] = useState<"exam" | "signs" | "guide" | "finder" | "video" | "portal" | "shop" | null>(null);
  const t = hubContent[locale] || hubContent.en;

  const scrollToBlog = () => {
    const el = document.getElementById("blog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="resources" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Marcus Lorenzet Editorial Style */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
              <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
                [ 08 · DIGITAL EXAM & LEARNING SUITE ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
              {t.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Golden Bento Command Hub (All 8 Tools in 3 Harmonious Tiers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            
            {/* TIER 1 - HERO 1: DMT Mock Exam Simulator (2 Cols) */}
            <div className="col-span-1 md:col-span-2 relative p-6 sm:p-8 rounded-3xl marcus-card shadow-2xl flex flex-col justify-between overflow-hidden group">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#fcc438]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#fcc438] flex items-center justify-center shadow-lg">
                    <FileQuestion className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab] text-[11px] font-black uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fcc438] animate-pulse" />
                    <span>{t.examBadge}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#f5f5f3] tracking-tight">
                  {t.examTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed max-w-xl">
                  {t.examDesc}
                </p>

                {/* 4 Feature Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {t.examChips.map((chip, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-white/[0.06] bg-[#0d0c0a] flex items-center gap-2 text-xs text-[#c7c2b6]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
                      <span className="font-semibold truncate">{chip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModal("exam")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] font-black text-xs sm:text-sm uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span>{t.examBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TIER 1 - HERO 2: Road Signs Directory (2 Cols) */}
            <div className="col-span-1 md:col-span-2 relative p-6 sm:p-8 rounded-3xl marcus-card shadow-2xl flex flex-col justify-between overflow-hidden group">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#d0c5ab]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center shadow-lg">
                    <Compass className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab] text-[11px] font-black uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.signsBadge}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#f5f5f3] tracking-tight">
                  {t.signsTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed max-w-xl">
                  {t.signsDesc}
                </p>

                {/* 4 Feature Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {t.signsChips.map((chip, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-white/[0.06] bg-[#0d0c0a] flex items-center gap-2 text-xs text-[#c7c2b6]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d0c5ab] shrink-0" />
                      <span className="font-semibold truncate">{chip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModal("signs")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#d0c5ab] hover:text-white border border-white/10 font-black text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
                >
                  <span>{t.signsBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TIER 2 - CARD 3: Licence Information Guide (1 Col) */}
            <div className="col-span-1 rounded-3xl marcus-card p-5 sm:p-6 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-[#d0c5ab] border border-white/10">
                    {t.guideBadge}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#8c877a] uppercase tracking-wider mb-1">
                  [ 01 · GUIDE ]
                </div>

                <h4 className="text-base font-bold text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                  {t.guideTitle}
                </h4>
                <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                  {t.guideDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveModal("guide")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#d0c5ab] hover:text-white cursor-pointer"
                >
                  <span>{t.guideBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-[#1c1a17] border border-white/10 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* TIER 2 - CARD 4: Training Packages & Finder (1 Col) */}
            <div className="col-span-1 rounded-3xl marcus-card p-5 sm:p-6 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1a17] border border-white/10 text-[#fcc438] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-[#fcc438] border border-white/10">
                    {t.finderBadge}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#8c877a] uppercase tracking-wider mb-1">
                  [ 02 · MATCH ]
                </div>

                <h4 className="text-base font-bold text-[#f5f5f3] group-hover:text-[#fcc438] transition-colors">
                  {t.finderTitle}
                </h4>
                <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                  {t.finderDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveModal("finder")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#fcc438] hover:text-white cursor-pointer"
                >
                  <span>{t.finderBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-[#1c1a17] border border-white/10 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* TIER 2 - CARD 5: Practical Video Lessons (1 Col) */}
            <div className="col-span-1 rounded-3xl marcus-card p-5 sm:p-6 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-[#d0c5ab] border border-white/10">
                    {t.videoBadge}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#8c877a] uppercase tracking-wider mb-1">
                  [ 03 · VIDEO ]
                </div>

                <h4 className="text-base font-bold text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                  {t.videoTitle}
                </h4>
                <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                  {t.videoDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveModal("video")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#d0c5ab] hover:text-white cursor-pointer"
                >
                  <span>{t.videoBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-[#1c1a17] border border-white/10 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* TIER 2 - CARD 6: Student Portal Desk (1 Col) */}
            <div className="col-span-1 rounded-3xl marcus-card p-5 sm:p-6 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-[#d0c5ab] border border-white/10">
                    {t.portalBadge}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#8c877a] uppercase tracking-wider mb-1">
                  [ 04 · DESK ]
                </div>

                <h4 className="text-base font-bold text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                  {t.portalTitle}
                </h4>
                <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                  {t.portalDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveModal("portal")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#d0c5ab] hover:text-white cursor-pointer"
                >
                  <span>{t.portalBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-[#1c1a17] border border-white/10 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* TIER 3 - CARD 7: Educational Blog & Trial Secrets (2 Cols) */}
            <div className="col-span-1 md:col-span-2 rounded-3xl marcus-card p-6 sm:p-7 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#fcc438] flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab]">
                    {t.blogBadge}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#f5f5f3] group-hover:text-[#fcc438] transition-colors">
                  {t.blogTitle}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed">
                  {t.blogDesc}
                </p>

                {/* Preview pill */}
                <div className="mt-4 p-3 rounded-xl bg-[#0d0c0a] border border-white/[0.06] flex items-center gap-2.5 text-xs text-[#c7c2b6]">
                  <span className="px-2 py-0.5 rounded-md bg-[#1c1a17] text-[#fcc438] font-mono text-[10px] font-bold shrink-0">
                    {t.blogPreviewTag}
                  </span>
                  <span className="truncate font-medium">{t.blogPreviewTitle}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={scrollToBlog}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#d0c5ab] hover:text-[#fcc438] cursor-pointer"
                >
                  <span>{t.blogBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TIER 3 - CARD 8: Student Shop & Starter Kits (2 Cols) */}
            <div className="col-span-1 md:col-span-2 rounded-3xl marcus-card p-6 sm:p-7 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab]">
                    {t.shopBadge}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                  {t.shopTitle}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed">
                  {t.shopDesc}
                </p>

                {/* Preview pill */}
                <div className="mt-4 p-3 rounded-xl bg-[#0d0c0a] border border-white/[0.06] flex items-center gap-2.5 text-xs text-[#c7c2b6]">
                  <span className="px-2 py-0.5 rounded-md bg-[#1c1a17] text-[#d0c5ab] font-mono text-[10px] font-bold shrink-0">
                    {t.shopPreviewTag}
                  </span>
                  <span className="truncate font-medium">{t.shopPreviewTitle}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModal("shop")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#d0c5ab] hover:text-white cursor-pointer"
                >
                  <span>{t.shopBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Feature Modals */}
      {activeModal === "exam" && (
        <MockExamModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "signs" && (
        <RoadSignsModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "guide" && (
        <LicenceGuideModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "finder" && (
        <PackageFinderModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "video" && (
        <VideoLessonsModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "portal" && (
        <StudentPortalModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "shop" && (
        <StudentKitModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
