"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { Users, GraduationCap, Car, CheckCircle } from "lucide-react";
import { motion, useInView } from "motion/react";

interface StatsBarProps {
  locale: Locale;
}

function AnimatedCounter({ endValue, durationMs = 1800, suffix = "" }: { endValue: number; durationMs?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, endValue, durationMs]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBar({ locale }: StatsBarProps) {
  const dict = getDictionary(locale);
  const { studentsTrained, instructorsCount, dualControlVehicles, firstTimePassRate } = siteConfig.stats;

  const statItems = [
    {
      id: "students",
      value: studentsTrained.value,
      suffix: studentsTrained.suffix,
      label: studentsTrained.label[locale],
      icon: Users,
      sourceNote: studentsTrained.sourceNote,
    },
    {
      id: "pass-rate",
      value: firstTimePassRate.value,
      suffix: firstTimePassRate.suffix,
      label: firstTimePassRate.label[locale],
      icon: CheckCircle,
      sourceNote: firstTimePassRate.sourceNote,
    },
    {
      id: "instructors",
      value: instructorsCount.value,
      suffix: instructorsCount.suffix,
      label: instructorsCount.label[locale],
      icon: GraduationCap,
      sourceNote: instructorsCount.sourceNote,
    },
    {
      id: "vehicles",
      value: dualControlVehicles.value,
      suffix: dualControlVehicles.suffix,
      label: dualControlVehicles.label[locale],
      icon: Car,
      sourceNote: dualControlVehicles.sourceNote,
    },
  ];

  return (
    <section className="relative -mt-8 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 p-6 sm:p-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex flex-col items-center text-center ${
                  idx > 0 && idx % 2 === 0 ? "pt-6 lg:pt-0" : ""
                } ${idx > 1 ? "pt-6 lg:pt-0" : ""}`}
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  <AnimatedCounter endValue={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 max-w-[200px]">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Source & Verification Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400 dark:text-slate-500">
          <span>{dict.stats.disclaimer}</span>
        </div>
      </motion.div>
    </section>
  );
}
