"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { Check, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { PackageFinderModal } from "./PackageFinderModal";

interface PackagesSectionProps {
  locale: Locale;
}

interface CoursePackage {
  id: string;
  name: { en: string; si: string; ta: string };
  category: string;
  priceLkr: string;
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

  return (
    <>
      <section id="packages" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Marcus Lorenzet Editorial Style */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
              <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
                [ 03 · TRANSPARENT TUITION ]
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
          <div className="rounded-3xl marcus-card p-6 sm:p-9 mb-14 sm:mb-18 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#fcc438]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1.5 z-10">
              <div className="flex items-center gap-2 text-xs font-black text-[#fcc438] uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#fcc438]" />
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
              onClick={() => setShowFinder(true)}
              className="group shrink-0 px-6 py-3.5 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer z-10"
            >
              <span>{dict.packages.packageFinderBtn}</span>
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Packages Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            {PACKAGES_DATA.map((pkg, idx) => {
              if (pkg.isPopular) {
                return (
                  <div
                    key={pkg.id}
                    className="rounded-3xl p-1 bg-gradient-to-b from-[#d0c5ab]/60 via-white/10 to-[#fcc438]/20 shadow-2xl relative lg:-translate-y-3 transition-all duration-300 group z-10"
                  >
                    <div className="rounded-[calc(1.5rem-4px)] bg-[#141310] p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden">
                      {/* Ambient glow */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#fcc438]/10 rounded-full blur-3xl pointer-events-none" />

                      {/* Floating Popular Badge */}
                      <div className="absolute top-4 right-4 bg-[#fcc438] text-[#11100d] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#11100d]" />
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
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fcc438]" />
                            <span>{dict.modals.standardFee} · All-Inclusive</span>
                          </div>
                        </div>

                        <div className="mt-4 p-3 rounded-2xl bg-[#1c1a17] border border-white/10 space-y-1 text-xs">
                          <div className="font-bold text-[#f5f5f3] flex items-center justify-between">
                            <span>Duration:</span>
                            <span className="font-mono text-[#d0c5ab]">{pkg.duration}</span>
                          </div>
                          <div className="font-bold text-[#fcc438] flex items-center justify-between">
                            <span>Practical:</span>
                            <span className="font-mono">{pkg.practicalHours}</span>
                          </div>
                        </div>

                        {/* Features list */}
                        <ul className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.06]">
                          {pkg.features[locale].map((feat, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-[#c7c2b6] leading-snug">
                              <Check className="w-3.5 h-3.5 text-[#fcc438] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/[0.06]">
                        <a
                          href="#apply"
                          className="w-full group py-3 px-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#d0c5ab] text-[#11100d] hover:bg-[#e4dbc6] shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
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
                  className="rounded-3xl marcus-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 relative shadow-xl group"
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

                    <div className="mt-4 p-3 rounded-2xl bg-[#0d0c0a] border border-white/[0.06] space-y-1 text-xs">
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
                          <Check className="w-3.5 h-3.5 text-[#fcc438] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.06]">
                    <a
                      href="#apply"
                      className="w-full group py-3 px-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#1c1a17] hover:bg-[#25231f] text-[#d0c5ab] hover:text-white border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
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
