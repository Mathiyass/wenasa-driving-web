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
    <section id="journey" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Marcus Lorenzet Editorial Aesthetic */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
            <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
              [ 02 · STEP BY STEP ROADMAP ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
            {dict.journey.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
            {dict.journey.subtitle}
          </p>
        </div>

        {/* Stepper Navigation Bar */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="min-w-[760px] px-2 sm:px-4">
            
            {/* Stage Progress Overview Pill */}
            <div className="flex items-center justify-between mb-8 px-5 py-3 rounded-2xl bg-[#141310] border border-white/10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#1c1a17] border border-white/10 text-[#fcc438] flex items-center justify-center font-black text-xs">
                  {activeStepIndex + 1}
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#d0c5ab]">
                    {dict.journey.stepLabel} {activeStep.stepNumber} of {steps.length} · {activeStep.stageCode}
                  </div>
                  <div className="text-sm font-black text-[#f5f5f3] leading-tight">
                    {activeStep.title[locale]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#fcc438] hidden sm:inline">
                  {Math.round(((activeStepIndex + 1) / steps.length) * 100)}% Complete
                </span>
                <div className="w-24 h-2 rounded-full bg-[#25231f] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#d0c5ab] to-[#fcc438] transition-all duration-300"
                    style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stepper Nodes with Centered Connecting Line */}
            <div className="relative">
              {/* Connecting background line */}
              <div className="absolute left-8 right-8 top-6 -translate-y-1/2 h-[2px] bg-white/[0.08] z-0" />
              {/* Active connecting line fill */}
              <div 
                className="absolute left-8 top-6 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#d0c5ab] to-[#fcc438] transition-all duration-300 z-0"
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
                      className="group flex flex-col items-center focus-visible:outline-2 focus-visible:outline-[#fcc438] cursor-pointer w-24 sm:w-28 text-center"
                      aria-label={`${dict.journey.stepLabel} ${step.stepNumber}: ${step.title[locale]}`}
                    >
                      {/* Circle Indicator */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 shrink-0 ${
                          isCurrent
                            ? "bg-[#d0c5ab] text-[#11100d] shadow-lg ring-4 ring-[#fcc438]/25 scale-110"
                            : isCompleted
                            ? "bg-[#1c1a17] text-[#fcc438] border border-white/10"
                            : "bg-[#141310] text-[#a8a295] border border-white/[0.08] group-hover:border-white/20 group-hover:text-white"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-[#fcc438]" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>

                      {/* Step Number Tag */}
                      <span className={`mt-3 text-[10px] font-black uppercase tracking-wider transition-colors ${
                        isCurrent ? "text-[#fcc438]" : "text-[#a8a295] group-hover:text-[#c7c2b6]"
                      }`}>
                        {dict.journey.stepLabel} 0{step.stepNumber}
                      </span>

                      {/* Step Title */}
                      <span className={`mt-0.5 text-xs text-center leading-tight transition-colors line-clamp-2 ${
                        isCurrent ? "font-black text-[#f5f5f3]" : "font-medium text-[#c7c2b6] group-hover:text-white"
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
            className="rounded-3xl marcus-card overflow-hidden"
          >
            <div>
              {/* Step Top Bar */}
              <div className="bg-[#161513] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06]">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-[#1c1a17] border border-white/10 rounded-2xl text-[#fcc438] shrink-0 shadow-xs">
                    <StepIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#d0c5ab] font-bold tracking-wide uppercase">
                      <span>{dict.journey.stepLabel} 0{activeStep.stepNumber} of {steps.length}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeStep.stageCode}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#f5f5f3] mt-1">
                      {activeStep.title[locale]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#c7c2b6] mt-1 max-w-2xl">
                      {activeStep.subtitle[locale]}
                    </p>
                  </div>
                </div>

                {/* Regulatory Verification Metadata */}
                <div className="text-xs text-[#c7c2b6] sm:text-right shrink-0 bg-[#141310] p-3 rounded-2xl border border-white/[0.08] shadow-xs">
                  <div className="flex items-center sm:justify-end gap-1.5 text-[#d0c5ab] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{dict.common.verifiedBadge}</span>
                  </div>
                  <div className="text-[#a8a295] text-[11px] mt-0.5 flex items-center sm:justify-end gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{dict.common.lastVerified}: {activeStep.lastVerifiedDate}</span>
                  </div>
                  <div className="text-[10px] text-[#a8a295] mt-1 max-w-[200px]">
                    {activeStep.verificationNotice}
                  </div>
                </div>
              </div>

              {/* Step Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Detailed Overview */}
                <div>
                  <p className="text-[#c7c2b6] text-sm sm:text-base leading-relaxed">
                    {activeStep.description[locale]}
                  </p>
                </div>

                {/* Grid: Required Documents and Practical Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Documents Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0c0a] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#f5f5f3] mb-3">
                      <FileCheck2 className="w-4 h-4 text-[#fcc438]" />
                      <h4>{dict.journey.documentsTitle}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {activeStep.requiredDocuments[locale].map((doc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#c7c2b6]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#fcc438] mt-2 shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Tips Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#1c1a17] border border-white/10">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#d0c5ab] mb-3">
                      <Lightbulb className="w-4 h-4 text-[#fcc438]" />
                      <h4>{dict.journey.tipsTitle}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {activeStep.practicalTips[locale].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#eae3d2]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d0c5ab] mt-2 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* How Wenasa Helps You Callout */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#161513] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#d0c5ab] text-[#11100d] rounded-xl shrink-0 mt-0.5 shadow-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#f5f5f3]">
                        {dict.journey.wenasaHelpsTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#c7c2b6] mt-1 max-w-3xl leading-relaxed">
                        {activeStep.howWenasaHelps[locale]}
                      </p>
                    </div>
                  </div>

                  <a
                    href={activeStep.officialDmtUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#d0c5ab] bg-[#1a1916] border border-white/10 rounded-full hover:bg-[#25231f] hover:text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#fcc438] shadow-xs"
                  >
                    <span>{dict.journey.officialLinkText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#fcc438]" />
                  </a>
                </div>

                {/* Bottom Stepper Controls */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={activeStepIndex === 0}
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      activeStepIndex === 0
                        ? "opacity-30 cursor-not-allowed text-[#a8a295]"
                        : "text-[#c7c2b6] hover:bg-[#1a1916] hover:text-white"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{dict.journey.previousStep}</span>
                  </button>

                  <div className="text-xs font-mono font-bold text-[#a8a295]">
                    [ PHASE 0{activeStep.stepNumber} / 0{steps.length} ]
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={activeStepIndex === steps.length - 1}
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                      activeStepIndex === steps.length - 1
                        ? "opacity-30 cursor-not-allowed text-[#a8a295]"
                        : "bg-[#d0c5ab] text-[#11100d] hover:bg-[#e4dbc6] shadow-md active:scale-95"
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
