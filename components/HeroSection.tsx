"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight,
  ArrowDown,
  CheckCircle2,
  Award,
  Sparkles,
  Users,
  ChevronRight,
  Navigation
} from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  locale: Locale;
}

const VEHICLE_PRESETS = [
  { id: "b-auto", label: { en: "🚗 Car (Auto)", si: "🚗 මෝටර් රථ (Auto)", ta: "🚗 கார் (Auto)" } },
  { id: "b-manual", label: { en: "🚗 Car (Manual)", si: "🚗 මෝටර් රථ (Manual)", ta: "🚗 கார் (Manual)" } },
  { id: "a-bike", label: { en: "🏍️ Motorcycle", si: "🏍️ යතුරුපැදි", ta: "🏍️ மோட்டார்சைக்கிள்" } },
  { id: "combo", label: { en: "⚡ Car + Bike Combo", si: "⚡ රථ + යතුරුපැදි", ta: "⚡ கார் + பைக்" } },
];

export function HeroSection({ locale }: HeroSectionProps) {
  const dict = getDictionary(locale);
  const [selectedPreset, setSelectedPreset] = useState("combo");

  const scrollToPackage = (id: string) => {
    setSelectedPreset(id);
    const element = document.getElementById("packages") || document.getElementById("apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-16 text-center">
      {/* Subtle ambient warm lighting matching HopeRise canvas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[32rem] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top HopeRise Eyebrow Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider shadow-xs mb-6 sm:mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-500/20" />
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{siteConfig.legalEntityName}</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span>{siteConfig.contact.city}</span>
        </motion.div>

        {/* Clean, Commanding Masterpiece Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-5xl mx-auto select-none"
        >
          <span>{dict.hero.editorialPrefix} {dict.hero.editorialSuffix}</span>
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            {dict.hero.editorialTagline}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mt-5 sm:mt-7 font-normal"
        >
          {dict.hero.subheadline}
        </motion.p>

        {/* Button-in-Button Centered Action Cluster */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary: Nested Button-in-Button Emerald Pill */}
          <a
            href="#apply"
            className="btn-nested group pl-7 sm:pl-8 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-emerald-glow active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            <span>{dict.hero.ctaRegister}</span>
            <span className="btn-nested-icon bg-white/20 text-white border border-white/25 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          {/* Secondary: Nested Button-in-Button Glass Pill */}
          <a
            href="#packages"
            className="btn-nested group pl-6 sm:pl-7 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-300/90 dark:border-slate-700 shadow-xs hover:border-emerald-500/80 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            <span>{dict.hero.viewCourses}</span>
            <span className="btn-nested-icon bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </motion.div>

        {/* Interactive Vehicle Category Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {VEHICLE_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => scrollToPackage(preset.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border flex items-center gap-2 cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md"
                    : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:border-emerald-400/80 hover:text-emerald-700 dark:hover:text-emerald-400 shadow-xs"
                }`}
              >
                <span>{preset.label[locale]}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </motion.div>

        {/* Dedicated Hero Visual Showcase Card with High-Res Fleet & Floating Proof Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 sm:mt-12 relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-900 shadow-2xl group"
        >
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/hero-training-car.jpg"
              alt="Wenasa Driving Training Session with certified instructor"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Soft cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            
            {/* Floating credentials overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/95 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  98% First-Attempt Pass Rate
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-bold shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Suzuki Dual-Control Fleet
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/95 backdrop-blur-md text-slate-950 text-xs font-bold shadow-lg">
                <Users className="w-3.5 h-3.5" />
                5,000+ Alumni
              </span>
            </div>
          </div>
        </motion.div>

        {/* HopeRise Full-Width Authority & Partner Ticker Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-14 sm:mt-18 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            {/* Left: Quick Action badge */}
            <a
              href="#apply"
              className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-extrabold">{dict.hero.quickEnroll}</span>
            </a>

            {/* Center: Partner & Authority Proof Points */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>DMT SRI LANKA</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>NTMI MEDICALS</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold">
                <Users className="w-4 h-4 text-amber-500" />
                <span>5,000+ ALUMNI</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>98% PASS RATE</span>
              </div>
            </div>

            {/* Right: Scroll Down Action with Arrow */}
            <a
              href="#services"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
              aria-label="Scroll down to courses"
            >
              <span>{dict.hero.scrollDown}</span>
              <span className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 flex items-center justify-center transition-all">
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
