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
  ArrowRight,
  ExternalLink
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
    
    // Card 1: Mock Exams (Hero 2-col)
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

    // Card 2: Road Signs (Hero 2-col)
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

    // Card 3: Licence Guide (1-col)
    guideBadge: "7-Step Guide",
    guideTitle: "Licence Information Guide",
    guideDesc: "Official document checklists, NTMI medical requirements, L-plate hold timelines, and testing center details.",
    guideBtn: "Read Licence Guide",

    // Card 4: Packages & Finder (1-col)
    finderBadge: "30-Sec Matcher",
    finderTitle: "Training Packages",
    finderDesc: "Compare beginner, refresher, manual, and automatic comprehensive course bundles or take our interactive quiz.",
    finderBtn: "Find My Package",

    // Card 5: Video Lessons (1-col)
    videoBadge: "3 Masterclasses",
    videoTitle: "Video Lessons",
    videoDesc: "Step-by-step video tutorials on clutch bite point control, parallel parking between flags, and reverse 'S' tracks.",
    videoBtn: "Watch Video Lessons",

    // Card 6: Student Portal (1-col)
    portalBadge: "Learner Desk",
    portalTitle: "Student Portal",
    portalDesc: "Track your driven hours, lesson schedules, skill scores, upcoming test dates, and contact your instructor.",
    portalBtn: "Open Student Desk",

    // Card 7: Educational Blog (Wide 2-col)
    blogBadge: "Examiner Secrets",
    blogTitle: "Educational Blog & Practical Trial Secrets",
    blogDesc: "Expert articles written by senior DMT-certified instructors on passing your practical trial on the first attempt, hill starts, and defensive driving on Sri Lankan roads.",
    blogBtn: "Read All Articles",
    blogPreviewTag: "Featured Guide",
    blogPreviewTitle: "10 Common Mistakes on the DMT Practical Trial & How to Avoid Them",

    // Card 8: Student Shop (Wide 2-col)
    shopBadge: "Kirindiwela Stock",
    shopTitle: "Student Shop & Test-Day Starter Kits",
    shopDesc: "Official magnetic DMT-regulation L-plates, highway code handbooks, driver logbooks, and test-day kits available at our Kirindiwela office or via courier.",
    shopBtn: "Browse Starter Kits & Gear",
    shopPreviewTag: "Counter Collection",
    shopPreviewTitle: "Official Weatherproof Magnetic L-Plates & Illustrated Highway Code Manuals",
  },
  si: {
    badge: "ඩිජිටල් ඉගෙනුම් සහ තොරතුරු කේන්ද්‍රය",
    title: "DMT විභාග සහ මාර්ග නීති පෙරහුරු මධ්‍යස්ථානය",
    subtitle: "DMT ලිඛිත විභාගය සහ ප්‍රායෝගික පරීක්ෂණය පළමු වරින්ම විශිෂ්ට ලෙස සමත් වීමට අවශ්‍ය සියලුම ඩිජිටල් පහසුකම් මෙහිදී ලබාගන්න.",

    examBadge: "නිල DMT පරිගණක විභාගය · ප්‍රශ්න 40",
    examTitle: "DMT ලිඛිත පුහුණු විභාග පද්ධතිය",
    examDesc: "වේරහැර සහ ගම්පහ DMT පරිගණක ප්‍රශ්න පත්‍ර ආකෘතියට අනුව සකස් කළ නිල බහුවරණ ප්‍රශ්නාවලිය සමගින් පෙරහුරු විභාගයට මුහුණ දෙන්න.",
    examChips: [
      "විනාඩි 60ක කාල ගණකය",
      "30/40ක සමත් ලකුණු සීමාව",
      "ක්ෂණික ප්‍රතිඵල සහ නිවැරදි කිරීම්",
      "භාෂා ත්‍රිත්වයෙන්ම: සිංහල · දෙමළ · ඉංග්‍රීසි",
    ],
    examBtn: "පෙරහුරු විභාගය ආරම්භ කරන්න",

    signsBadge: "නිල මාර්ග සංඥා 21 · අධ්‍යයන පහසුකම",
    signsTitle: "නිල DMT මාර්ග සංඥා නාමාවලිය",
    signsDesc: "ශ්‍රී ලංකා DMT මාර්ග නීති සංග්‍රහයට අනුකූල පාලන, අනතුරු ඇඟවීමේ සහ තොරතුරු සංඥා 21ක් ෆ්ලෑෂ් කාඩ් ආකෘතියෙන් පහසුවෙන් අධ්‍යයනය කරන්න.",
    signsChips: [
      "නිල DMT දෛශික සංඥා 21ක්",
      "ෆ්ලෑෂ් කාඩ් ස්වයං-පරීක්ෂණ ක්‍රමය",
      "පාලන හා අනතුරු පෙරහන්",
      "ද්විභාෂික මාර්ග නීති විස්තර",
    ],
    signsBtn: "සංඥා නාමාවලිය බලන්න",

    guideBadge: "පියවර 7ක මගපෙන්වීම",
    guideTitle: "බලපත්‍ර තොරතුරු මාර්ගෝපදේශය",
    guideDesc: "NTMI වෛද්‍ය සහතික අවශ්‍යතා, L-බෝඩ් කාලසීමා සහ MTA 30 අයදුම්පත් විස්තර.",
    guideBtn: "මාර්ගෝපදේශය කියවන්න",

    finderBadge: "තත්පර 30 ප්‍රශ්නාවලිය",
    finderTitle: "පුහුණු පාඨමාලා පැකේජ",
    finderDesc: "ආරම්භකයින්, පුහුණු වූවන්, මැනුවල් සහ ඔටෝ සියලුම පුහුණු පාඨමාලා ගාස්තු විනිවිදභාවයෙන් සසඳන්න.",
    finderBtn: "පාඨමාලාව තෝරාගන්න",

    videoBadge: "ප්‍රායෝගික පාඩම් 3ක්",
    videoTitle: "වීඩියෝ පාඩම් මාලාව",
    videoDesc: "ක්ලච් පාලනය, සමාන්තර පාක් කිරීම සහ 'S' ධාවන පථය පිළිබඳ සවිස්තරාත්මක වීඩියෝ මගපෙන්වීම.",
    videoBtn: "වීඩියෝ පාඩම් බලන්න",

    portalBadge: "ශිෂ්‍ය අංශය",
    portalTitle: "ශිෂ්‍ය පෝටලය",
    portalDesc: "ධාවනය කළ පැය ගණන, දින දර්ශනය, උපදේශක ලකුණු සහ විභාග දින පහසුවෙන් පරීක්ෂා කරන්න.",
    portalBtn: "ශිෂ්‍ය පෝටලය අරින්න",

    blogBadge: "විභාග රහස්",
    blogTitle: "දැනුවත් කිරීමේ ලිපි සහ ට්‍රයල් විභාග රහස්",
    blogDesc: "ට්‍රයල් එක පළමු වරෙන්ම පාස් කරගන්නා රහස්, කඳු ආරම්භය සහ ආරක්ෂිත රිය පැදවීම පිළිබඳ ජ්‍යෙෂ්ඨ උපදේශක ලිපි.",
    blogBtn: "සියලුම ලිපි කියවන්න",
    blogPreviewTag: "විශේෂාංග ලිපිය",
    blogPreviewTitle: "DMT ප්‍රායෝගික ට්‍රයල් විභාගයේදී සිදුවන ප්‍රධාන වැරදි 10 සහ ඒවා වළක්වා ගන්නා අයුරු",

    shopBadge: "කිරිඳිවැල සංචිතය",
    shopTitle: "ශිෂ්‍ය අත්වැල සහ විභාග පුහුණු උපකරණ",
    shopDesc: "නිල චුම්භක L-තහඩු, මාර්ග නීති අත්පොත්, රියැදුරු වාර්තා පොත් සහ විභාග ආරක්ෂිත උපාංග කිරිඳිවැල ශාඛාවෙන් ලබාගන්න.",
    shopBtn: "ශිෂ්‍ය උපාංග බලන්න",
    shopPreviewTag: "කාර්යාලයෙන් ලබාගැනීම",
    shopPreviewTitle: "නිල කාලගුණ ප්‍රතිරෝධී චුම්භක L-තහඩු සහ මාර්ග නීති අත්පොත්",
  },
  ta: {
    badge: "டிஜிட்டல் கற்றல் தளம்",
    title: "உத்தியோகபூர்வ DMT பரீட்சை மற்றும் வழிகாட்டல் மையம்",
    subtitle: "DMT கோட்பாட்டு மற்றும் செய்முறைப் பரීட்சைகளில் முதல் முயற்சியிலேயே சித்தியடைவதற்கான முழுமையான டிஜிட்டல் கருவிகள்.",

    examBadge: "உத்தியோகபூர்வ DMT கணினிப் பரீட்சை · 40 வினாக்கள்",
    examTitle: "DMT கோட்பாட்டு மாதிரிப் பரීட்சை",
    examDesc: "வேரஹெர மற்றும் கம்பஹா DMT கணினிப் பரீட்சை மாதிரியிலான 40 வினாக்களைக் கொண்ட மாதிரிப் பரீட்சையை எதிர்கொள்ளுங்கள்.",
    examChips: [
      "60 நிமிட நேரக் கணிப்பான்",
      "30/40 தேர்ச்சி புள்ளிகள்",
      "உடனடி முடிவுகள் மற்றும் விளக்கங்கள்",
      "மும்மொழிகளிலும்: தமிழ் · சிங்களம் · ஆங்கிலம்",
    ],
    examBtn: "மாதிரிப் பரீட்சையைத் தொடங்குக",

    signsBadge: "21 உத்தியோகபூர்வ DMT சைகைகள்",
    signsTitle: "உத்தியோகபூர்வ DMT வீதி சைகைகள்",
    signsDesc: "இலங்கை DMT வீதி ஒழுங்குமுறை, எச்சரிக்கை மற்றும் தகவல் சைகைகள் அடங்கிய முழுமையான வழிகாட்டி.",
    signsChips: [
      "21 துல்லியமான DMT சைகைகள்",
      "சுய பரிசோதனை முறை",
      "வகைப்படுத்தப்பட்ட சைகைகள்",
      "விதிமுறை சுருக்கங்கள்",
    ],
    signsBtn: "சைகைகள் வழிகாட்டியைப் பார்க்க",

    guideBadge: "7-படி வழிகாட்டி",
    guideTitle: "அனுமதிப்பத்திர வழிகாட்டி",
    guideDesc: "NTMI மருத்துவ பரிசோதனை விதிகள், L-Plate கால அவகாசம் மற்றும் சட்ட வழிகாட்டல்கள்.",
    guideBtn: "வழிகாட்டியைப் படிக்க",

    finderBadge: "30 வினாடி வினாடி-வினா",
    finderTitle: "பயிற்சிப் தொகுப்புகள்",
    finderDesc: "ஆரம்ப, மேம்பட்ட, மெனுவல் மற்றும் ஒட்டோ பயிற்சிப் தொகுப்புகளின் கட்டணங்களை ஒப்பிட்டுப் பாருங்கள்.",
    finderBtn: "பயிற்சியைத் தெரிவு செய்க",

    videoBadge: "3 விரிவுரைகள்",
    videoTitle: "வீடியோ பாடங்கள்",
    videoDesc: "கிளட்ச் கன்ட்ரோல், இணையான பார்க்கிங் மற்றும் 'S' தடம் பற்றிய செய்முறை வீடியோ வழிகாட்டல்.",
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
      <section id="resources" className="py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
              {t.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Golden Bento Command Hub (All 8 Tools in 3 Harmonious Tiers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            
            {/* ======================================================== */}
            {/* TIER 1 - HERO 1: DMT Mock Exam Simulator (2 Cols)        */}
            {/* ======================================================== */}
            <div className="col-span-1 md:col-span-2 relative p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/30 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-emerald-400 transition-all duration-300">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/40">
                    <FileQuestion className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.examBadge}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t.examTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  {t.examDesc}
                </p>

                {/* 4 Feature Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {t.examChips.map((chip, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold truncate">{chip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModal("exam")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-emerald-glow active:scale-95 transition-all cursor-pointer"
                >
                  <span>{t.examBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TIER 1 - HERO 2: Road Signs Directory (2 Cols)           */}
            {/* ======================================================== */}
            <div className="col-span-1 md:col-span-2 relative p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/20 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-amber-400/80 transition-all duration-300">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-950/40">
                    <Compass className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-black uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>{t.signsBadge}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t.signsTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  {t.signsDesc}
                </p>

                {/* 4 Feature Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {t.signsChips.map((chip, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-semibold truncate">{chip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModal("signs")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-amber-500/40 font-extrabold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>{t.signsBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TIER 2 - CARD 3: Licence Information Guide (1 Col)       */}
            {/* ======================================================== */}
            <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-blue-300 border border-blue-900/50">
                    {t.guideBadge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t.guideTitle}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {t.guideDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveModal("guide")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  <span>{t.guideBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-blue-950/60 border border-blue-800/80 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TIER 2 - CARD 4: Training Packages & Finder (1 Col)      */}
            {/* ======================================================== */}
            <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-purple-900/50">
                    {t.finderBadge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                  {t.finderTitle}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {t.finderDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveModal("finder")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                  <span>{t.finderBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-purple-950/60 border border-purple-800/80 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TIER 2 - CARD 5: Practical Video Lessons (1 Col)         */}
            {/* ======================================================== */}
            <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-rose-500/50 hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-rose-900/50">
                    {t.videoBadge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                  {t.videoTitle}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {t.videoDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveModal("video")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-rose-400 hover:text-rose-300 cursor-pointer"
                >
                  <span>{t.videoBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-rose-950/60 border border-rose-800/80 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TIER 2 - CARD 6: Student Portal Desk (1 Col)             */}
            {/* ======================================================== */}
            <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-sky-500/50 hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-sky-900/50">
                    {t.portalBadge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                  {t.portalTitle}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {t.portalDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveModal("portal")}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-sky-400 hover:text-sky-300 cursor-pointer"
                >
                  <span>{t.portalBtn}</span>
                  <span className="w-6 h-6 rounded-full bg-sky-950/60 border border-sky-800/80 flex items-center justify-center">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TIER 3 - CARD 7: Educational Blog & Trial Secrets (2 Cols)*/}
            {/* ======================================================== */}
            <div className="col-span-1 md:col-span-2 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                    {t.blogBadge}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {t.blogTitle}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.blogDesc}
                </p>

                {/* Preview pill */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold shrink-0">
                    {t.blogPreviewTag}
                  </span>
                  <span className="truncate font-medium">{t.blogPreviewTitle}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={scrollToBlog}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  <span>{t.blogBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TIER 3 - CARD 8: Student Shop & Starter Kits (2 Cols)    */}
            {/* ======================================================== */}
            <div className="col-span-1 md:col-span-2 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300">
                    {t.shopBadge}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  {t.shopTitle}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.shopDesc}
                </p>

                {/* Preview pill */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                  <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 font-mono text-[10px] font-bold shrink-0">
                    {t.shopPreviewTag}
                  </span>
                  <span className="truncate font-medium">{t.shopPreviewTitle}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModal("shop")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-400 hover:text-orange-300 cursor-pointer"
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
