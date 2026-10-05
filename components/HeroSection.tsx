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
  Sparkles,
  Users,
  Award,
  ChevronRight,
  Car
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
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 text-center bg-[#0d0c0a]">
      {/* Marcus Lorenzet Signature Ambient Warm Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[36rem] marcus-ambient-glow pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-72 marcus-subtle-glow pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Bracketed Metadata Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs mb-6 sm:mb-8 shadow-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#fcc438] animate-pulse" />
          <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
            [ {siteConfig.legalEntityName} · DMT/WP/G/1174 · {siteConfig.contact.city} ]
          </span>
        </motion.div>

        {/* Monumental Editorial Headline (Marcus Lorenzet Masterpiece Typography) */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-black tracking-tight text-[#f5f5f3] leading-[1.02] max-w-5xl mx-auto select-none uppercase"
        >
          <span>{dict.hero.editorialPrefix} </span>
          <span className="text-[#d0c5ab]">{dict.hero.editorialSuffix}</span>
          <span className="block mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-[#fcc438] tracking-tight">
            {dict.hero.editorialTagline}
          </span>
        </motion.h1>

        {/* Clean Editorial Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base sm:text-lg text-[#c7c2b6] max-w-2xl mx-auto leading-relaxed mt-6 sm:mt-8 font-normal"
        >
          {dict.hero.subheadline}
        </motion.p>

        {/* High-Contrast Action Pill Cluster */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary Action: Warm Champagne Pill */}
          <a
            href="#apply"
            className="group px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2.5"
          >
            <Car className="w-4 h-4" />
            <span>{dict.hero.ctaRegister}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary Action: Obsidian Glass Pill */}
          <a
            href="#packages"
            className="group px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#161513] hover:bg-[#1f1e1a] text-[#d0c5ab] hover:text-[#f5f5f3] border border-white/10 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:border-[#d0c5ab]/30 active:scale-95 flex items-center gap-2"
          >
            <span>{dict.hero.viewCourses}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Interactive Vehicle Category Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
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
                    ? "bg-[#d0c5ab] text-[#11100d] border-[#d0c5ab] shadow-md"
                    : "bg-[#141310] text-[#c7c2b6] border-white/[0.08] hover:border-[#d0c5ab]/40 hover:text-white"
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="mt-12 sm:mt-16 relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#141310] shadow-2xl group"
        >
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/hero-training-car.jpg"
              alt="Wenasa Driving Training Session with certified instructor"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Cinematic dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/40 to-transparent" />
            
            {/* Floating Credentials Overlay (Marcus Style Badges) */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1916]/90 backdrop-blur-md border border-white/10 text-[#fcc438] text-xs font-bold shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#fcc438]" />
                  98% First-Attempt Pass Rate
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1916]/90 backdrop-blur-md border border-white/10 text-[#d0c5ab] text-xs font-bold shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Suzuki Dual-Control Fleet
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d0c5ab] text-[#11100d] text-xs font-extrabold shadow-lg">
                <Users className="w-3.5 h-3.5" />
                5,000+ Alumni
              </span>
            </div>
          </div>
        </motion.div>

        {/* Minimalist Editorial Authority Bar & "Pixel by pixel / Scroll" Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-18 pt-6 sm:pt-8 border-t border-white/[0.08]"
        >
          <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-xs font-bold uppercase tracking-widest text-[#8c877a]">
            {/* Left: Authority Points */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2 text-[#d0c5ab]">
                <Award className="w-4 h-4 text-[#fcc438]" />
                <span>DMT SRI LANKA</span>
              </div>
              <div className="flex items-center gap-2 text-[#d0c5ab]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NTMI MEDICALS</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[#d0c5ab]">
                <Users className="w-4 h-4 text-[#fcc438]" />
                <span>5,000+ LICENSED</span>
              </div>
            </div>

            {/* Right: Marcus Lorenzet "Pixel by pixel / Scroll" indicator */}
            <a
              href="#services"
              className="flex items-center gap-3 text-[#c7c2b6] hover:text-[#fcc438] transition-colors group cursor-pointer"
              aria-label="Scroll down to explore courses"
            >
              <span className="text-[11px] tracking-widest uppercase">Explore Courses · Scroll</span>
              <span className="w-7 h-7 rounded-full border border-white/10 group-hover:border-[#fcc438] group-hover:bg-[#1a1916] flex items-center justify-center transition-all">
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
