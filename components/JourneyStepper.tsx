"use client";

import { useState } from "react";
import { siteConfig, RegulatoryStep } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  FileCheck2, 
  Lightbulb, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Stethoscope,
  Fingerprint,
  GraduationCap,
  Car,
  Award,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JourneyStepperProps {
  locale: Locale;
}

const STEP_ICONS: Record<string, React.ElementType> = {
  MEDICAL_EXAM: Stethoscope,
  DMT_APPLICATION: Fingerprint,
  THEORY_EXAM: GraduationCap,
  LEARNER_PERMIT_ISSUED: FileCheck2,
  PRACTICAL_TRAINING: Car,
  PRACTICAL_TRIAL: Award,
  LICENCE_ISSUED: Sparkles,
};

export function JourneyStepper({ locale }: JourneyStepperProps) {
  const dict = getDictionary(locale);
  const steps: RegulatoryStep[] = siteConfig.journeySteps;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = steps[activeStepIndex] || steps[0];
  const StepIcon = STEP_ICONS[activeStep.stageCode] || Car;

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <section id="journey" className="py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold tracking-wide shadow-xs mb-3">
            <span>{dict.nav.journey}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
            {dict.journey.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.journey.subtitle}
          </p>
        </div>

        {/* Stepper Navigation Bar */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="min-w-[760px] px-2 sm:px-4">
            
            {/* Stage Progress Overview Pill */}
            <div className="flex items-center justify-between mb-8 px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xs">
                  {activeStepIndex + 1}
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                    {dict.journey.stepLabel} {activeStep.stepNumber} of {steps.length} · {activeStep.stageCode}
                  </div>
                  <div className="text-sm font-black text-white leading-tight">
                    {activeStep.title[locale]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400 hidden sm:inline">
                  {Math.round(((activeStepIndex + 1) / steps.length) * 100)}% Complete
                </span>
                <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stepper Nodes with Centered Connecting Line */}
            <div className="relative">
              {/* Connecting background line: centered at top-6 (24px) passing through the center of 48px circles */}
              <div className="absolute left-8 right-8 top-6 -translate-y-1/2 h-1 bg-slate-800 z-0" />
              {/* Active connecting line fill */}
              <div 
                className="absolute left-8 top-6 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300 z-0"
                style={{
                  width: `${(activeStepIndex / (steps.length - 1)) * 92}%`
                }}
              />

              <div className="relative z-10 flex items-start justify-between">
                {steps.map((step, idx) => {
                  const isCurrent = idx === activeStepIndex;
                  const isCompleted = idx < activeStepIndex;
                  const Icon = STEP_ICONS[step.stageCode] || Car;

                  const stepShortTitles: Record<Locale, string[]> = {
                    en: [
                      "Medical Check",
                      "DMT Registration",
                      "Theory Exam",
                      "Learner Permit",
                      "Road Training",
                      "Driving Trial",
                      "Smart Licence",
                    ],
                    si: [
                      "වෛද්‍ය පරීක්ෂාව",
                      "DMT ලියාපදිංචිය",
                      "ලිඛිත විභාගය",
                      "L-බලපත්‍රය",
                      "ප්‍රායෝගික පුහුණුව",
                      "රියදුරු පරීක්ෂණය",
                      "ස්මාර්ට් බලපත්‍රය",
                    ],
                    ta: [
                      "மருத்துவ பரிசோதனை",
                      "DMT பதிவு",
                      "கோட்பாட்டுப் பரீட்சை",
                      "L-அனுமதிப்பத்திரம்",
                      "செயன்முறைப் பயிற்சி",
                      "சாரதிப் பரீක්ෂை",
                      "ஸ்மார்ட் அனுமதி",
                    ],
                  };

                  const shortLabel = (stepShortTitles[locale] || stepShortTitles.en)[idx] || step.title[locale];

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStepIndex(idx)}
                      className="group flex flex-col items-center focus-visible:outline-2 focus-visible:outline-emerald-500 cursor-pointer w-24 sm:w-28 text-center"
                      aria-label={`${dict.journey.stepLabel} ${step.stepNumber}: ${step.title[locale]}`}
                    >
                      {/* Circle Indicator */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 shrink-0 ${
                          isCurrent
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 ring-4 ring-emerald-500/30 scale-110"
                            : isCompleted
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/60 shadow-xs"
                            : "bg-slate-900 text-slate-400 border-2 border-slate-800 group-hover:border-emerald-500/60 group-hover:text-slate-200 shadow-xs"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>

                      {/* Step Number Tag */}
                      <span className={`mt-3 text-[10px] font-black uppercase tracking-wider transition-colors ${
                        isCurrent ? "text-emerald-400 font-extrabold" : "text-slate-400 group-hover:text-slate-300"
                      }`}>
                        {dict.journey.stepLabel} {step.stepNumber}
                      </span>

                      {/* Non-truncated 2-line Step Title */}
                      <span className={`mt-0.5 text-xs text-center leading-tight transition-colors line-clamp-2 ${
                        isCurrent ? "font-black text-white" : "font-medium text-slate-300 group-hover:text-white"
                      }`}>
                        {shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Step Content Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
          >
            <div>
              {/* Step Top Bar */}
              <div className="bg-slate-950/80 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shrink-0 shadow-xs">
                    <StepIcon className="w-7 h-7" />
                  </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold tracking-wide uppercase">
                    <span>{dict.journey.stepLabel} {activeStep.stepNumber} of {steps.length}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeStep.stageCode}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                    {activeStep.title[locale]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    {activeStep.subtitle[locale]}
                  </p>
                </div>
              </div>

              {/* Regulatory Verification Metadata */}
              <div className="text-xs text-slate-300 sm:text-right shrink-0 bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-xs">
                <div className="flex items-center sm:justify-end gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{dict.common.verifiedBadge}</span>
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5 flex items-center sm:justify-end gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{dict.common.lastVerified}: {activeStep.lastVerifiedDate}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1 max-w-[200px]">
                  {activeStep.verificationNotice}
                </div>
              </div>
            </div>

            {/* Step Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Detailed Overview */}
              <div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStep.description[locale]}
                </p>
              </div>

              {/* Grid: Required Documents and Practical Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Documents Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" />
                    <h4>{dict.journey.documentsTitle}</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {activeStep.requiredDocuments[locale].map((doc, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Tips Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/20 border border-amber-800/60">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-300 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <h4>{dict.journey.tipsTitle}</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {activeStep.practicalTips[locale].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How Wenasa Helps You Callout */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-300">
                      {dict.journey.wenasaHelpsTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                      {activeStep.howWenasaHelps[locale]}
                    </p>
                  </div>
                </div>

                <a
                  href={activeStep.officialDmtUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-emerald-300 bg-slate-900 border border-emerald-800/80 rounded-full hover:bg-slate-800 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-500 shadow-xs"
                >
                  <span>{dict.journey.officialLinkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Bottom Stepper Controls */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={activeStepIndex === 0}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    activeStepIndex === 0
                      ? "opacity-40 cursor-not-allowed text-slate-500"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{dict.journey.previousStep}</span>
                </button>

                <div className="text-xs font-medium text-slate-400">
                  {dict.journey.stepLabel} {activeStep.stepNumber} / {steps.length}
                </div>

                <button
                  onClick={handleNext}
                  disabled={activeStepIndex === steps.length - 1}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    activeStepIndex === steps.length - 1
                      ? "opacity-40 cursor-not-allowed text-slate-500"
                      : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg active:scale-95"
                  }`}
                >
                  <span>{dict.journey.nextStep}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    </section>
  );
}
