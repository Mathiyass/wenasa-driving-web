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
  priceLkr: string; // e.g. "LKR 38,500 (Sample, verify before publishing)"
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
    category: "Classic Driver",
    priceLkr: "LKR 38,000",
    isPopular: false,
    duration: "6–8 Weeks",
    practicalHours: "20 Hours Practical",
    features: {
      en: [
        "20 hours dedicated manual transmission instruction",
        "Flawless clutch control & stall prevention",
        "Traffic road driving & highway entry techniques",
        "DMT exam question bank + mock trial runs",
        "Wenasa training car provided on trial day",
      ],
      si: [
        "මැනුවල් ගියර් පද්ධතිය සඳහා ප්‍රායෝගික පුහුණුව පැය 20ක්",
        "නොනැවතී ක්ලච් එක පාලනය කිරීමේ නිවැරදි තාක්ෂණය",
        "මහමග රථවාහන තදබදයේ හා අධිවේගී මාර්ගවල ධාවනය",
        "DMT ආදර්ශ ප්‍රශ්න පත්‍ර සහ පෙර-ට්‍රයල් පෙරහුරුව",
        "ට්‍රයල් දින පුහුණු රථය ලබාදීම",
      ],
      ta: [
        "20 மணிநேர கையேடு கியர் பயிற்சி",
        "கிளட்ச் கட்டுப்பாடு மற்றும் ஸ்டால் தடுப்பு",
        "வீதிப் போக்குவரத்து ஓட்டுதல் நுட்பங்கள்",
        "DMT மாதிரி வினாத்தாள்கள்",
        "சோதனை நாளில் வாகனம் வழங்கல்",
      ],
    },
  },
  {
    id: "motorcycle",
    name: {
      en: "Class A / A1 Motorcycle & Scooter",
      si: "යතුරුපැදි සහ ස්කූටර් (A / A1)",
      ta: "மோட்டார் சைக்கிள் & ஸ்கூட்டர் (A/A1)",
    },
    category: "Rider Essentials",
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
      <section id="packages" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              {dict.packages.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
              {dict.packages.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {dict.packages.subtitle}
            </p>
          </div>

          {/* Interactive Package Finder Banner */}
          <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>Smart Course Recommendation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {dict.packages.packageFinderTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {dict.packages.packageFinderDesc}
              </p>
            </div>

            <button
              onClick={() => setShowFinder(true)}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-md"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{dict.packages.packageFinderBtn}</span>
            </button>
          </div>

          {/* Packages Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_DATA.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                  pkg.isPopular
                    ? "border-emerald-600 ring-2 ring-emerald-600/30 bg-white dark:bg-slate-900 shadow-xl"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {dict.packages.popularBadge}
                  </div>
                )}

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {pkg.category}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {pkg.name[locale]}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                      {pkg.priceLkr}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Standard package fee (editable before publishing)
                    </div>
                  </div>

                  <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Duration: {pkg.duration}
                    </div>
                    <div>{pkg.practicalHours}</div>
                  </div>

                  {/* Features list */}
                  <ul className="mt-6 space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {pkg.features[locale].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href="#apply"
                    className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors ${
                      pkg.isPopular
                        ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md"
                        : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800"
                    }`}
                  >
                    <span>{dict.packages.enrollBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
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
