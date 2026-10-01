"use client";

import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { ShieldCheck, Award, MapPin, Clock, Users, FileCheck } from "lucide-react";

interface WhyWenasaProps {
  locale: Locale;
}

export function WhyWenasa({ locale }: WhyWenasaProps) {
  const dict = getDictionary(locale);

  const points = [
    {
      icon: ShieldCheck,
      title: dict.why.point1Title,
      description: dict.why.point1Desc,
    },
    {
      icon: Award,
      title: dict.why.point2Title,
      description: dict.why.point2Desc,
    },
    {
      icon: MapPin,
      title: dict.why.point3Title,
      description: dict.why.point3Desc,
    },
    {
      icon: Clock,
      title: dict.why.point4Title,
      description: dict.why.point4Desc,
    },
    {
      icon: Users,
      title: dict.why.point5Title,
      description: dict.why.point5Desc,
    },
    {
      icon: FileCheck,
      title: dict.why.point6Title,
      description: dict.why.point6Desc,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            {dict.why.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
            {dict.why.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.why.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {pt.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
