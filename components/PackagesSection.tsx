"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { soundManager } from "@/lib/sound";
import { 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  Calendar,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { PackageFinderModal } from "./PackageFinderModal";

interface PackagesSectionProps {
  locale: Locale;
}

interface CoursePackage {
  id: string;
  name: { en: string; si: string; ta: string };
  category: string;
  priceLkr: string;
  priceNum: number;
  isPopular: boolean;
  duration: string;
  practicalHours: string;
  features: { en: string[]; si: string[]; ta: string[] };
}

const PACKAGES_DATA: CoursePackage[] = [
  {
    id: "car-auto",
    name: {
      en: "Class B Car - Automatic",
      si: "කාර් රථ - ස්වයංක්‍රීය (Auto)",
      ta: "கார் - தானியங்கி (Auto)",
    },
    category: "Most Convenient",
    priceLkr: "LKR 36,000",
    priceNum: 36000,
    isPopular: false,
    duration: "6–8 Weeks",
    practicalHours: "18 Hours Practical",
    features: {
      en: [
        "18 hours of one-on-one dual-control driving",
        "DMT reverse bay & parallel parking training",
        "Hill start & slope maneuver sessions",
        "Free theory question paper pack in 3 languages",
        "Wenasa training car provided on trial day",
      ],
      si: [
        "ද්විත්ව පාලක රථ මඟින් තනි පුද්ගල ප්‍රායෝගික පුහුණුව පැය 18ක්",
        "DMT රිවර්ස් සහ සමාන්තර පාක් කිරීමේ ප්‍රායෝගික පුහුණුව",
        "කඳු ආරම්භය (Hill start) ප්‍රගුණ කිරීමේ සැසි",
        "භාෂා ත්‍රිත්වයෙන්ම ආදර්ශ ප්‍රශ්න පත්‍ර කට්ටලය නොමිලේ",
        "ට්‍රයල් දිනයේදී පුහුණු රථය නොමිලේ ලබාදීම",
      ],
      ta: [
        "18 மணிநேர தனிப்பட்ட இரட்டை கட்டுப்பாட்டு பயிற்சி",
        "DMT ரிவர்ஸ் மற்றும் பார்க்கிங் பயிற்சி",
        "ஹில்-ஸ்டார்ட் பயிற்சி அமர்வுகள்",
        "இலவச மாதிரி வினாத்தாள் தொகுப்பு",
        "சோதனை நாளில் வெனசா பயிற்சி வாகனம்",
      ],
    },
  },
  {
    id: "car-manual-combo",
    name: {
      en: "Combo: Car (Manual) + Bike",
      si: "ද්විත්ව පැකේජය: කාර් (Manual) + බයික්",
      ta: "இரட்டை தொகுப்பு: கார் + பைக்",
    },
    category: "Best Value",
    priceLkr: "LKR 44,500",
    priceNum: 44500,
    isPopular: true,
    duration: "8–10 Weeks",
    practicalHours: "24 Hours Combined",
    features: {
      en: [
        "Complete Class B (Manual) + Class A (Motorcycle)",
        "Master clutch balance, gears & motorcycle slalom",
        "Dedicated Kirindiwela practice track sessions",
        "Full unlimited access to DMT online mock tests",
        "Both vehicles provided on official trial day",
        "Free administrative processing for MTA 30",
      ],
      si: [
        "B (Manual කාර්) සහ A (යතුරුපැදි) පූර්ණ පුහුණුව",
        "ක්ලච් පාලනය, ගියර් මාරු කිරීම සහ බයික් සමබරතාවය ප්‍රගුණ කිරීම",
        "කිරිඳිවැල විශේෂ පුහුණු ධාවන පථයේ පුහුණුවීම්",
        "අන්තර්ජාල DMT ආදර්ශ විභාග පද්ධතියට අසීමිත ප්‍රවේශය",
        "ට්‍රයල් දින වාහන දෙකම නොමිලේ ලබාදීම",
        "MTA 30 ලියාපදිංචි ලියකියවිලි සකස් කරදීම",
      ],
      ta: [
        "முழுமையான கார் (Manual) + மோட்டார் சைக்கிள் பயிற்சி",
        "கிளட்ச் சமநிலை, கியர் மற்றும் பைக் பயிற்சி",
        "கிரிந்திவெல பயிற்சி மைதான அமர்வுகள்",
        "இணைய மாதிரி தேர்வுகளுக்கான வரம்பற்ற அணுகல்",
        "சோதனை நாளில் இரண்டு வாகனங்களும் வழங்கல்",
        "விண்ணப்ப படிவங்களை நிரப்புவதற்கான இலவச உதவி",
      ],
    },
  },
  {
    id: "car-manual",
    name: {
      en: "Class B Car - Manual",
      si: "කාර් රථ - අතින් ක්‍රියාත්මක (Manual)",
      ta: "கார் - கையேடு (Manual)",
    },
    category: "Full Versatility",
    priceLkr: "LKR 38,000",
    priceNum: 38000,
    isPopular: false,
    duration: "6–8 Weeks",
    practicalHours: "20 Hours Practical",
    features: {
      en: [
        "20 hours dedicated manual transmission training",
        "In-depth clutch bite point & gear coordination",
        "Hill restart without rollback mastery",
        "Heavy traffic & highway driving modules",
        "DMT exam paper pack & pre-trial rehearsal",
        "Dual-control car provided on trial day",
      ],
      si: [
        "මැනුවල් ගියර් පද්ධතිය සඳහා ප්‍රායෝගික පුහුණුව පැය 20ක්",
        "නොනැවතී ක්ලච් එක පාලනය කිරීමේ නිවැරදි තාක්ෂණය",
        "කඳු බෑවුම්වල වාහනය පස්සට නොයා ගැනීමේ ප්‍රවීණත්වය",
        "මහාමග රථවාහන තදබදයේ හා අධිවේගී මාර්ගවල ධාවනය",
        "DMT ආදර්ශ ප්‍රශ්න පත්‍ර සහ පෙර-ට්‍රයල් පෙරහුරුව",
        "ට්‍රයල් දින පුහුණු රථය ලබාදීම",
      ],
      ta: [
        "20 மணிநேர கையேடு கியர் பயிற்சி",
        "கிளட்ச் கட்டுப்பாடு மற்றும் துல்லியமான பயிற்சி",
        "ஹில் ரீஸ்டார்ட் முழுமையான பயிற்சி",
        "போக்குவரத்து நெரிசல் மற்றும் நெடுஞ்சாலை ஓட்டுதல்",
        "DMT மாதிரி வினாத்தாள் மற்றும் ஒத்திகை",
        "சோதனைக்கு இரட்டை கட்டுப்பாட்டு வாகனம்",
      ],
    },
  },
  {
    id: "bike-scooter",
    name: {
      en: "Class A / A1 - Motorcycle",
      si: "යතුරුපැදි සහ ස්කූටර් (A / A1)",
      ta: "மோட்டார் சைக்கிள் (A / A1)",
    },
    category: "Quickest Completion",
    priceLkr: "LKR 16,500",
    priceNum: 16500,
    isPopular: false,
    duration: "3–4 Weeks",
    practicalHours: "10 Hours Training",
    features: {
      en: [
        "Figure-8 balance maneuvers & emergency braking",
        "Road signaling, helmet safety & mirror discipline",
        "Low-speed balancing in simulated traffic",
        "Training motorcycle provided for practical trial",
      ],
      si: [
        "අටේ (8) හැඩය කැපීම, සමබරතාවය සහ හදිසි තිරිංග පුහුණුව",
        "මාර්ග සංඥා, හෙල්මට් ආරක්ෂාව සහ කණ්ණාඩි බැලීමේ විනය",
        "මන්දගාමී තදබදයේ බයිසිකලය සමබරව ධාවනය",
        "ප්‍රායෝගික ට්‍රයල් පරීක්ෂණයට යතුරුපැදිය ලබාදීම",
      ],
      ta: [
        "எட்டு வடிவில் ஓட்டுதல் மற்றும் அவசர பிரேக்கிங்",
        "வீதி சமிக்ஞைகள் மற்றும் தலைக்கவசம் பாதுகாப்பு",
        "குறைந்த வேகத்தில் சமநிலை பேணல்",
        "சோதனைக்கு மோட்டார் சைக்கிள் வழங்கல்",
      ],
    },
  },
];

export function PackagesSection({ locale }: PackagesSectionProps) {
  const dict = getDictionary(locale);
  const [showFinder, setShowFinder] = useState(false);

  // Interactive Tuition Configurator state
  const [calcCourseId, setCalcCourseId] = useState("car-manual-combo");
  const [calcExperience, setCalcExperience] = useState<"beginner" | "refresher">("beginner");
  const [addNtmiFastTrack, setAddNtmiFastTrack] = useState(true);
  const [addTrackExtra, setAddTrackExtra] = useState(false);

  const selectedPkg = PACKAGES_DATA.find((p) => p.id === calcCourseId) || PACKAGES_DATA[1];
  const basePrice = selectedPkg.priceNum;
  const expDiscount = calcExperience === "refresher" ? 5000 : 0;
  const ntmiFee = addNtmiFastTrack ? 2500 : 0;
  const trackFee = addTrackExtra ? 3000 : 0;

  const totalCalculated = Math.max(12000, basePrice - expDiscount + ntmiFee + trackFee);
  const stage1Deposit = Math.round(totalCalculated * 0.5);
  const stage2Balance = totalCalculated - stage1Deposit;

  const handleEnrollWithCustomPlan = () => {
    soundManager.playSuccessChime();
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="packages" className="py-20 sm:py-28 scroll-mt-20 bg-[#070706]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Google Stitch "Obsidian Atelier" Editorial Style */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131210] border border-white/[0.08] text-xs font-semibold mb-4">
              <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
                [ 03 · TRANSPARENT TUITION & FINANCIAL CLARITY ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
              {dict.packages.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
              {dict.packages.subtitle}
            </p>
          </div>

          {/* Interactive Package Finder Banner */}
          <div className="rounded-3xl marcus-card p-6 sm:p-9 mb-14 sm:mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1.5 z-10">
              <div className="flex items-center gap-2 text-xs font-black text-[#f59e0b] uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                <span>{dict.modals.smartRecommendation}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#f5f5f3]">
                {dict.packages.packageFinderTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#c7c2b6] max-w-xl leading-relaxed">
                {dict.packages.packageFinderDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowFinder(true);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="btn-shimmer group shrink-0 px-6 py-3.5 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#070706] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer z-10 hover:scale-105"
            >
              <span>{dict.packages.packageFinderBtn}</span>
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Masterpiece Interactive Tuition & Installment Configurator */}
          <div className="rounded-3xl bg-[#131210] border border-white/10 p-6 sm:p-9 mb-16 shadow-2xl spotlight-card">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#f59e0b] uppercase tracking-widest">
                  <Calculator className="w-4 h-4 text-[#f59e0b]" />
                  <span>Interactive Tuition & Installment Calculator</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-black text-white mt-1">
                  Configure Your Learning Schedule & Deposit
                </h3>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0908] border border-white/10 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>No Hidden Exam Fees Guarantee</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Configuration Form (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Vehicle Course Selection */}
                <div>
                  <label className="text-xs font-mono text-[#d0c5ab] uppercase tracking-wider block mb-2">
                    1. Select Training Course & Class
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PACKAGES_DATA.map((p) => {
                      const isSelected = p.id === calcCourseId;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setCalcCourseId(p.id);
                          }}
                          onMouseEnter={() => soundManager.playHover()}
                          className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1f1e1a] border-[#f59e0b] shadow-md"
                              : "bg-[#0a0908] border-white/[0.06] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{p.name[locale]}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#f59e0b]" />}
                          </div>
                          <div className="text-[11px] font-mono text-[#d0c5ab] mt-1">{p.priceLkr}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Prior Experience Tier */}
                <div>
                  <label className="text-xs font-mono text-[#d0c5ab] uppercase tracking-wider block mb-2">
                    2. Your Current Driving Experience
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setCalcExperience("beginner");
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        calcExperience === "beginner"
                          ? "bg-[#1f1e1a] border-[#f59e0b]"
                          : "bg-[#0a0908] border-white/[0.06] hover:border-white/20"
                      }`}
                    >
                      <div className="text-xs font-bold text-white">Complete Beginner</div>
                      <div className="text-[10px] text-[#94a3b8] mt-0.5">Full 18–24 Hours Practical</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setCalcExperience("refresher");
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        calcExperience === "refresher"
                          ? "bg-[#1f1e1a] border-[#f59e0b]"
                          : "bg-[#0a0908] border-white/[0.06] hover:border-white/20"
                      }`}
                    >
                      <div className="text-xs font-bold text-white">Refresher / Some Exp.</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Saves LKR 5,000 (10 hrs)</div>
                    </button>
                  </div>
                </div>

                {/* 3. Add-on Services */}
                <div>
                  <label className="text-xs font-mono text-[#d0c5ab] uppercase tracking-wider block mb-2">
                    3. Optional Add-ons & Fast-Tracking
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 rounded-2xl bg-[#0a0908] border border-white/[0.06] cursor-pointer hover:border-white/20 transition-all">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={addNtmiFastTrack}
                          onChange={(e) => {
                            soundManager.playClick();
                            setAddNtmiFastTrack(e.target.checked);
                          }}
                          className="w-4 h-4 rounded text-[#f59e0b] focus:ring-[#f59e0b] cursor-pointer"
                        />
                        <span className="text-xs font-semibold text-white">
                          NTMI Medical Examination Fast-Tracking & Booking Support
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#d0c5ab]">+LKR 2,500</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-2xl bg-[#0a0908] border border-white/[0.06] cursor-pointer hover:border-white/20 transition-all">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={addTrackExtra}
                          onChange={(e) => {
                            soundManager.playClick();
                            setAddTrackExtra(e.target.checked);
                          }}
                          className="w-4 h-4 rounded text-[#f59e0b] focus:ring-[#f59e0b] cursor-pointer"
                        />
                        <span className="text-xs font-semibold text-white">
                          Kirindiwela Private Closed Track Weekend Rehearsal Session
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#d0c5ab]">+LKR 3,000</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Financial Summary & Installments (5 Cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0a0908] border border-white/10 space-y-5">
                <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider">
                  [ TOTAL TUITION & SCHEDULE BREAKDOWN ]
                </div>

                <div>
                  <div className="text-xs text-[#d0c5ab]">Total All-Inclusive Course Fee</div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight mt-1">
                    LKR {totalCalculated.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#94a3b8] mt-1">
                    Includes training vehicle on official DMT trial day
                  </div>
                </div>

                {/* 50/50 Official Installment Split */}
                <div className="p-4 rounded-xl bg-[#131210] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#d0c5ab] text-[#070706] font-black text-[10px] flex items-center justify-center">
                        1
                      </div>
                      <div>
                        <div className="font-bold text-white">Stage 1: Deposit</div>
                        <div className="text-[10px] text-[#94a3b8]">At registration & MTA 30 filing</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#d0c5ab]">
                      LKR {stage1Deposit.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full h-px bg-white/[0.06]" />

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-[#070706] font-black text-[10px] flex items-center justify-center">
                        2
                      </div>
                      <div>
                        <div className="font-bold text-white">Stage 2: Balance</div>
                        <div className="text-[10px] text-[#94a3b8]">Prior to official DMT practical trial</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#f59e0b]">
                      LKR {stage2Balance.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEnrollWithCustomPlan}
                  onMouseEnter={() => soundManager.playHover()}
                  className="btn-shimmer w-full py-3.5 px-4 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#070706] font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <span>Enroll with This Configured Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Standard Course Tier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            {PACKAGES_DATA.map((pkg, idx) => {
              if (pkg.isPopular) {
                return (
                  <div
                    key={pkg.id}
                    className="rounded-3xl p-1 bg-gradient-to-b from-[#d0c5ab]/60 via-white/10 to-[#f59e0b]/20 shadow-2xl relative lg:-translate-y-3 transition-all duration-300 group z-10"
                  >
                    <div className="rounded-[calc(1.5rem-4px)] bg-[#131210] p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden">
                      {/* Ambient glow */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />

                      {/* Floating Popular Badge */}
                      <div className="absolute top-4 right-4 bg-[#f59e0b] text-[#070706] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#070706]" />
                        <span>{dict.packages.popularBadge}</span>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-[#a8a295] uppercase tracking-wider mb-1">
                          [ 02 · FEATURED TIER ]
                        </div>

                        <div className="text-xs font-black uppercase tracking-wider text-[#d0c5ab]">
                          {pkg.category}
                        </div>

                        <h3 className="text-lg sm:text-xl font-black text-[#f5f5f3] mt-1 pr-16 tracking-tight">
                          {pkg.name[locale]}
                        </h3>

                        {/* Price with tabular numerals */}
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <div className="text-3xl sm:text-4xl font-black text-[#f5f5f3] font-mono tabular-nums tracking-tight">
                            {pkg.priceLkr}
                          </div>
                          <div className="text-[11px] font-medium text-[#d0c5ab] mt-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                            <span>{dict.modals.standardFee} · All-Inclusive</span>
                          </div>
                        </div>

                        <div className="mt-4 p-3 rounded-2xl bg-[#0a0908] border border-white/10 space-y-1 text-xs">
                          <div className="font-bold text-[#f5f5f3] flex items-center justify-between">
                            <span>Duration:</span>
                            <span className="font-mono text-[#d0c5ab]">{pkg.duration}</span>
                          </div>
                          <div className="font-bold text-[#f59e0b] flex items-center justify-between">
                            <span>Practical:</span>
                            <span className="font-mono">{pkg.practicalHours}</span>
                          </div>
                        </div>

                        {/* Features list */}
                        <ul className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.06]">
                          {pkg.features[locale].map((feat, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-[#c7c2b6] leading-snug">
                              <Check className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/[0.06]">
                        <a
                          href="#apply"
                          onClick={() => soundManager.playClick()}
                          onMouseEnter={() => soundManager.playHover()}
                          className="btn-shimmer w-full group py-3 px-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#d0c5ab] text-[#070706] hover:bg-[#e4dbc6] shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <span>{dict.packages.enrollBtn}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={pkg.id}
                  className="rounded-3xl marcus-card spotlight-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 relative shadow-xl group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#a8a295] uppercase tracking-wider mb-1">
                      [ 0{idx + 1} · COURSE ]
                    </div>

                    <div className="text-xs font-black uppercase tracking-wider text-[#a8a295] group-hover:text-[#d0c5ab] transition-colors">
                      {pkg.category}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#f5f5f3] mt-1.5">
                      {pkg.name[locale]}
                    </h3>

                    {/* Price with tabular numerals */}
                    <div className="mt-4 pt-4 border-t border-white/[0.06]">
                      <div className="text-2xl sm:text-3xl font-black text-[#f5f5f3] font-mono tabular-nums tracking-tight">
                        {pkg.priceLkr}
                      </div>
                      <div className="text-[11px] font-medium text-[#a8a295] mt-1">
                        {dict.modals.standardFee}
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-2xl bg-[#0a0908] border border-white/[0.06] space-y-1 text-xs">
                      <div className="font-bold text-[#f5f5f3] flex items-center justify-between">
                        <span>Duration:</span>
                        <span className="font-mono text-[#c7c2b6]">{pkg.duration}</span>
                      </div>
                      <div className="font-semibold text-[#d0c5ab] flex items-center justify-between">
                        <span>Practical:</span>
                        <span className="font-mono">{pkg.practicalHours}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.06]">
                      {pkg.features[locale].map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#c7c2b6] leading-snug">
                          <Check className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.06]">
                    <a
                      href="#apply"
                      onClick={() => soundManager.playClick()}
                      onMouseEnter={() => soundManager.playHover()}
                      className="btn-shimmer w-full group py-3 px-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#171613] hover:bg-[#1f1e1a] text-[#d0c5ab] hover:text-white border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span>{dict.packages.enrollBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center text-xs text-[#a8a295] max-w-2xl mx-auto leading-relaxed">
            Note: Government DMT test fees and NTMI medical test fees are paid directly to government authorities or included via official receipt upon enrollment.
          </div>
        </div>
      </section>

      {/* Package Finder Modal */}
      {showFinder && (
        <PackageFinderModal
          locale={locale}
          onClose={() => setShowFinder(false)}
        />
      )}
    </>
  );
}
