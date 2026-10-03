"use client";

import { useState } from "react";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  Car, 
  Bike, 
  Truck, 
  CheckCircle2, 
  ExternalLink, 
  Calendar, 
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";

interface ServicesGridProps {
  locale: Locale;
}

export function ServicesGrid({ locale }: ServicesGridProps) {
  const dict = getDictionary(locale);
  const classes = siteConfig.licenceClasses;

  // Interactive Age-Eligibility Checker State
  const [userAge, setUserAge] = useState<number>(18);

  const parsedAge = typeof userAge === "number" ? userAge : 0;
  const eligibleClasses = classes.filter((c) => parsedAge >= c.minimumAge);

  const getClassIcon = (code: string) => {
    switch (code) {
      case "A":
      case "A1":
        return Bike;
      case "B":
      case "B1":
        return Car;
      case "C":
      case "C1":
        return Truck;
      default:
        return Car;
    }
  };

  const classB = classes.find((c) => c.code === "B") || classes[0];
  const classA = classes.find((c) => c.code === "A");
  const classA1 = classes.find((c) => c.code === "A1");
  const classB1 = classes.find((c) => c.code === "B1");
  const classC1 = classes.find((c) => c.code === "C1");
  const classC = classes.find((c) => c.code === "C");
  const companionClasses = [classA, classA1, classB1, classC1, classC].filter(Boolean) as typeof classes;

  const classBTexts = {
    en: {
      badge: "★ #1 Most Popular · Flagship Course",
      fleetTag: "Dual-Control Suzuki Alto & WagonR Fleet",
      f1Title: "Dual-Control Safety",
      f1Desc: "Dual brake & clutch pedals for 100% stress-free training",
      f2Title: "Manual & Auto Options",
      f2Desc: "Master 5-speed manual gears or smooth automatic driving",
      f3Title: "Reverse Box & Hill Starts",
      f3Desc: "Comprehensive mastery of DMT test maneuvers and gradients",
      f4Title: "Kirindiwela DMT Routes",
      f4Desc: "Direct practical sessions on official testing road networks",
      enrollBtn: "Enroll in Class B (Car Course)",
    },
    si: {
      badge: "★ #1 වඩාත්ම ජනප්‍රිය · ප්‍රධාන පාඨමාලාව",
      fleetTag: "ද්විත්ව පාලක Suzuki Alto සහ WagonR රථ පෙළ",
      f1Title: "ද්විත්ව පාලක ආරක්ෂාව",
      f1Desc: "100% බියෙන් තොර පුහුණුව සඳහා ද්විත්ව තිරිංග පද්ධතිය",
      f2Title: "Manual සහ Auto විකල්ප",
      f2Desc: "ගියර් 5 ක්ලච් පාලනය සහ ස්වයංක්‍රීය ඔටෝ රියදුරු පුහුණුව",
      f3Title: "කඳු ආරම්භය & Reverse Box",
      f3Desc: "DMT ප්‍රායෝගික පරීක්ෂණයේ සියලුම අභියෝග ජයගැනීම",
      f4Title: "කිරිඳිවැල පුහුණු මාර්ග",
      f4Desc: "නිල විභාග ධාවන පථයේ සහ මාර්ගවල සෘජු ප්‍රායෝගික පුහුණුව",
      enrollBtn: "Class B (කාර්) පාඨමාලාවට ලියාපදිංචි වන්න",
    },
    ta: {
      badge: "★ #1 அதிகம் தெரிவுசெய்யப்பட்ட முதன்மைப் பயிற்சி",
      fleetTag: "இருவழி கட்டுப்பாட்டு Suzuki Alto & WagonR வாகனங்கள்",
      f1Title: "இருவழி கட்டுப்பாட்டு பாதுகாப்பு",
      f1Desc: "100% பாதுகாப்பான பயிற்சிக்கான இரட்டை பிரேக் & கிளட்ச்",
      f2Title: "Manual & Auto தெரிவுகள்",
      f2Desc: "5-ஸ்பீட் கியர் மற்றும் தானியங்கி கியர் தெரிவுகள்",
      f3Title: "ரிவர்ஸ் பார்க்கிங் & மேட்டுப்பாதை",
      f3Desc: "DMT செய்முறைப் பரீක්ෂைக்கான முழுமையான தேர்ச்சி",
      f4Title: "கிரிந்திவெல DMT வீதிகள்",
      f4Desc: "உத்தியோகபூர்ව பரீட்சை வீதிகளில் நேரடி செய்முறைப் பயிற்சி",
      enrollBtn: "Class B (கார்) பயிற்சிக்கு பதிவு செய்க",
    },
  };

  const bMeta = classBTexts[locale] || classBTexts.en;

  const handleEnrollClassB = () => {
    window.dispatchEvent(
      new CustomEvent("wenasa:select-class", {
        detail: "B",
      })
    );
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isClassBEligible = parsedAge >= classB.minimumAge;
  const classBYearsToWait = classB.minimumAge - parsedAge;

  return (
    <section id="services" className="py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold tracking-wide shadow-xs mb-3">
            <span>{dict.nav.services}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
            {dict.services.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Interactive "Check What You Need" Age Eligibility Box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-14 sm:mb-16 rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-9 relative overflow-hidden shadow-2xl"
        >
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl shrink-0 shadow-xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="w-full">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {dict.services.eligibilityTitle}
                </h3>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Sri Lanka DMT Motor Traffic Act
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                {dict.services.eligibilityDesc}
              </p>

              {/* Slider + Numeric input combo */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <label htmlFor="user-age-input" className="text-xs sm:text-sm font-black text-slate-200 whitespace-nowrap">
                    {dict.services.ageInputLabel}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="user-age-input"
                      type="number"
                      min="15"
                      max="75"
                      value={userAge}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setUserAge(isNaN(val) ? 15 : Math.max(15, Math.min(75, val)));
                      }}
                      className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono font-black text-center text-sm focus:outline-emerald-500 shadow-xs"
                    />
                    <span className="text-xs font-semibold text-slate-400">{dict.modals.yearsOld}</span>
                  </div>
                </div>

                {/* Hardware Tactile Range Slider */}
                <div className="flex-1 max-w-sm flex items-center gap-3">
                  <span className="text-[11px] font-mono font-bold text-slate-500">15</span>
                  <input
                    type="range"
                    min="15"
                    max="75"
                    value={userAge}
                    onChange={(e) => setUserAge(parseInt(e.target.value, 10))}
                    className="tactile-slider w-full"
                  />
                  <span className="text-[11px] font-mono font-bold text-slate-500">75</span>
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setUserAge(17)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      userAge === 17
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500 hover:text-white"
                    }`}
                  >
                    17 (Permit)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserAge(18)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      userAge === 18
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500 hover:text-white"
                    }`}
                  >
                    18 (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserAge(21)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      userAge === 21
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500 hover:text-white"
                    }`}
                  >
                    21 (Heavy)
                  </button>
                </div>
              </div>

              {/* Real-time Eligible Vehicle Badges */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                {eligibleClasses.length > 0 ? (
                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{dict.services.eligibleFor}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {eligibleClasses.map((c) => (
                        <span
                          key={c.code}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 shadow-xs animate-in fade-in duration-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Class {c.code}: {c.name[locale]}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 text-xs text-amber-300 bg-amber-950/40 p-3.5 rounded-xl border border-amber-800/60">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                    <p>{dict.services.underageNotice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Classes Asymmetric Bento Grid: Class B (Main / Large Hero Card) + 5 Compact Companion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          
          {/* ======================================================== */}
          {/* FEATURED HERO CARD: Dual Purpose & Car (Auto / Manual)   */}
          {/* ======================================================== */}
          <div className="lg:col-span-2 lg:row-span-2 relative p-6 sm:p-8 lg:p-9 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/30 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-emerald-400 transition-all duration-300">
            {/* Luminous ambient top-right glow */}
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header: Large Icon + Most Popular Beacon Badge + Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/50">
                    <Car className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{bMeta.badge}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isClassBEligible ? (
                    <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1.5 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{locale === "si" ? "සුදුසුයි" : locale === "ta" ? "தகுதியானது" : "Eligible"}</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-amber-300 border border-amber-900/60">
                      +{classBYearsToWait} {locale === "si" ? "වසරකින්" : "yrs"}
                    </span>
                  )}
                  <span className="text-xs font-mono font-black px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50">
                    Class B
                  </span>
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {classB.name[locale]}
              </h3>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1 flex items-center gap-2">
                <span>{classB.category}</span>
                <span className="text-slate-600">·</span>
                <span>{bMeta.fleetTag}</span>
              </div>

              <p className="mt-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                {classB.description[locale]}
              </p>

              {/* 4 Feature Highlights Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {[
                  { title: bMeta.f1Title, desc: bMeta.f1Desc },
                  { title: bMeta.f2Title, desc: bMeta.f2Desc },
                  { title: bMeta.f3Title, desc: bMeta.f3Desc },
                  { title: bMeta.f4Title, desc: bMeta.f4Desc },
                ].map((feat, i) => (
                  <div key={i} className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">{feat.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{feat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Specs Bar */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px] font-semibold">{dict.services.ageRequirement}:</span>
                  <span className="font-bold text-white text-sm font-mono mt-0.5 block">
                    {classB.minimumAge} {dict.modals.yearsOld}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px] font-semibold">{dict.services.transmission}:</span>
                  <span className="font-bold text-emerald-300 text-xs sm:text-sm mt-0.5 block truncate">
                    Manual & Auto
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px] font-semibold">Training Grounds:</span>
                  <span className="font-bold text-white text-xs mt-0.5 block truncate">
                    Kirindiwela DMT Track
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Direct Apply CTA + DMT Meta */}
            <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleEnrollClassB}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-emerald-glow active:scale-95 transition-all cursor-pointer"
              >
                <span>{bMeta.enrollBtn}</span>
                <span className="text-base">→</span>
              </button>

              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <div className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dict.common.lastVerified}: {classB.lastVerifiedDate}</span>
                </div>

                <a
                  href={classB.dmtUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:text-emerald-300"
                >
                  <span>{dict.modals.dmtInfo}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 5 COMPACT COMPANION CARDS (Small ones)                   */}
          {/* ======================================================== */}
          {companionClasses.map((item) => {
            const Icon = getClassIcon(item.code);
            const isEligible = parsedAge >= item.minimumAge;
            const yearsToWait = item.minimumAge - parsedAge;

            return (
              <div
                key={item.code}
                className={`lg:col-span-1 rounded-3xl border transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 bg-slate-900 shadow-xl ${
                  isEligible
                    ? "border-slate-800 hover:border-emerald-500/60 hover:scale-[1.01] hover:shadow-emerald-950/30"
                    : "border-slate-850 hover:border-slate-750"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`p-2.5 rounded-xl ${
                      isEligible
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-xs"
                        : "bg-slate-800 border border-slate-700/80 text-slate-400"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isEligible ? (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                          <span>{locale === "si" ? "සුදුසුයි" : locale === "ta" ? "தகுதியானது" : "Eligible"}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-900/60">
                          +{yearsToWait} {locale === "si" ? "වසරකින්" : "yrs"}
                        </span>
                      )}
                      <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                        Class {item.code}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {item.name[locale]}
                  </h3>
                  <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                    {item.category}
                  </div>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {item.description[locale]}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>{dict.services.ageRequirement}:</span>
                      <span className="font-bold text-white font-mono">
                        {item.minimumAge} {dict.modals.yearsOld}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>{dict.services.transmission}:</span>
                      <span className="font-bold text-white truncate max-w-[130px] text-right">{item.transmission}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{item.lastVerifiedDate}</span>
                  </div>

                  <a
                    href={item.dmtUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:text-emerald-300 text-xs"
                  >
                    <span>{dict.modals.dmtInfo}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
