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
    <section id="journey" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            {dict.journey.sectionBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
            {dict.journey.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.journey.subtitle}
          </p>
        </div>

        {/* Stepper Navigation Bar */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[760px] relative px-4">
            {/* Background connecting line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
            {/* Active connecting line fill */}
            <div 
              className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 transition-all duration-300 -z-0"
              style={{
                width: `${(activeStepIndex / (steps.length - 1)) * 92}%`
              }}
            />

            {steps.map((step, idx) => {
              const isCurrent = idx === activeStepIndex;
              const isCompleted = idx < activeStepIndex;
              const Icon = STEP_ICONS[step.stageCode] || Car;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className="group relative z-10 flex flex-col items-center focus-visible:outline-2 focus-visible:outline-emerald-600 cursor-pointer"
                  aria-label={`${dict.journey.stepLabel} ${step.stepNumber}: ${step.title[locale]}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                      isCurrent
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100 dark:ring-emerald-950 scale-110"
                        : isCompleted
                        ? "bg-emerald-700 text-white"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-2 border-slate-300 dark:border-slate-700 group-hover:border-emerald-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {dict.journey.stepLabel} {step.stepNumber}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[90px] text-center truncate">
                    {step.title[locale]}
                  </span>
                </button>
              );
            })}
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
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            {/* Step Top Bar */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-emerald-400 shrink-0">
                  <StepIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium tracking-wide uppercase">
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
              <div className="text-xs text-slate-300 sm:text-right shrink-0 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <div className="flex items-center sm:justify-end gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{dict.common.verifiedBadge}</span>
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5 flex items-center sm:justify-end gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{dict.common.lastVerified}: {activeStep.lastVerifiedDate}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                  {activeStep.verificationNotice}
                </div>
              </div>
            </div>

            {/* Step Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Detailed Overview */}
              <div>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStep.description[locale]}
                </p>
              </div>

              {/* Grid: Required Documents & Practical Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Documents Card */}
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-3">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h4>{dict.journey.documentsTitle}</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {activeStep.requiredDocuments[locale].map((doc, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Tips Card */}
                <div className="p-5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-300 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4>{dict.journey.tipsTitle}</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {activeStep.practicalTips[locale].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mt-2 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How Wenasa Helps You Callout */}
              <div className="p-5 sm:p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      {dict.journey.wenasaHelpsTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-1 max-w-3xl">
                      {activeStep.howWenasaHelps[locale]}
                    </p>
                  </div>
                </div>

                <a
                  href={activeStep.officialDmtUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-600"
                >
                  <span>{dict.journey.officialLinkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Bottom Stepper Controls */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={activeStepIndex === 0}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeStepIndex === 0
                      ? "opacity-40 cursor-not-allowed text-slate-400"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{dict.journey.previousStep}</span>
                </button>

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {dict.journey.stepLabel} {activeStep.stepNumber} / {steps.length}
                </div>

                <button
                  onClick={handleNext}
                  disabled={activeStepIndex === steps.length - 1}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeStepIndex === steps.length - 1
                      ? "opacity-40 cursor-not-allowed text-slate-400"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                  }`}
                >
                  <span>{dict.journey.nextStep}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
