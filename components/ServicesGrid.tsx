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

interface ServicesGridProps {
  locale: Locale;
}

export function ServicesGrid({ locale }: ServicesGridProps) {
  const dict = getDictionary(locale);
  const classes = siteConfig.licenceClasses;

  // Interactive Age-Eligibility Checker State
  const [userAge, setUserAge] = useState<number | "">(18);

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

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            {dict.services.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
            {dict.services.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Interactive "Check What You Need" Age Eligibility Box */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {dict.services.eligibilityTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {dict.services.eligibilityDesc}
              </p>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="user-age-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {dict.services.ageInputLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="user-age-input"
                    type="number"
                    min="15"
                    max="80"
                    value={userAge}
                    onChange={(e) => {
                      const val = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                      setUserAge(val);
                    }}
                    className="w-24 px-3 py-1.5 text-sm font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-2 focus:outline-emerald-600"
                  />
                  <span className="text-xs text-slate-500">years old</span>
                </div>
              </div>

              {/* Instant Eligibility Feedback */}
              <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800/60">
                {parsedAge < 18 ? (
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-300">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{dict.services.underageNotice}</span>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                      {dict.services.eligibleFor}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {eligibleClasses.map((cls) => (
                        <span
                          key={cls.code}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-emerald-300 dark:border-emerald-700 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Class {cls.code}: {cls.name[locale]}</span>
                        </span>
                      ))}
                    </div>
                    {parsedAge < 21 && (
                      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        {dict.services.heavyAgeNotice}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((item) => {
            const Icon = getClassIcon(item.code);
            return (
              <div
                key={item.code}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/50 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-emerald-600/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono">
                      Class {item.code}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.name[locale]}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.category}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description[locale]}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>{dict.services.ageRequirement}:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.minimumAge} Years</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>{dict.services.transmission}:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.transmission}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{dict.common.lastVerified}: {item.lastVerifiedDate}</span>
                  </div>

                  <a
                    href={item.dmtUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
                  >
                    <span>DMT Info</span>
                    <ExternalLink className="w-3 h-3" />
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
