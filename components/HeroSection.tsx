"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { soundManager } from "@/lib/sound";
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight,
  ArrowDown,
  Sparkles, 
  Users, 
  Award, 
  ChevronRight,
  Car,
  Activity,
  Gauge,
  Zap,
  Timer,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  locale: Locale;
}

const VEHICLE_PRESETS = [
  { id: "b-auto", label: { en: "🚗 Car (Auto)", si: "🚗 මෝටර් රථ (Auto)", ta: "🚗 கார் (Auto)" } },
  { id: "b-manual", label: { en: "🚗 Car (Manual)", si: "🚗 මෝටර් රථ (Manual)", ta: "🚗 கார் (Manual)" } },
  { id: "a-bike", label: { en: "🏍️ Motorcycle", si: "🏍️ යතුරුපැදි", ta: "🏍️ மோட்டார்சைக்கிள்" } },
  { id: "combo", label: { en: "⚡ Car + Bike Combo", si: "⚡ රථ + යතුරුපැදි", ta: "⚡ கார் + பைக்" } },
];

const FLEET_SPECS: Record<string, {
  name: string;
  classType: string;
  transmission: string;
  dualControl: string;
  safetyRating: string;
  features: string[];
}> = {
  "b-manual": {
    name: "Suzuki Alto 800 (Manual)",
    classType: "Class B · Light Motor Vehicle",
    transmission: "5-Speed Synchromesh Manual",
    dualControl: "Master Cylinder Secondary Foot Brake + Cable Clutch Override",
    safetyRating: "100% Instructor Override",
    features: ["Dual Foot Pedals", "Parallel Bay Mirrors", "Tachometer Calibration", "Werahera Track Spec"],
  },
  "b-auto": {
    name: "Suzuki Wagon R (Automatic)",
    classType: "Class B Auto · Luxury Hatchback",
    transmission: "Continuous Variable Transmission (CVT)",
    dualControl: "Independent Mechanical Secondary Brake Assembly",
    safetyRating: "Zero Rollback System",
    features: ["Dual Control Brake", "Hill Hold Assist", "Rear Camera Assist", "Climate Controlled"],
  },
  "a-bike": {
    name: "Bajaj Boxer / TVS Metro",
    classType: "Class A · Motorcycle",
    transmission: "4-Speed Foot Shift",
    dualControl: "Crash Bar Protection + Enclosed Practice Track",
    safetyRating: "Full Safety Rigging",
    features: ["Low Center of Gravity", "Slalom Cones Setup", "Balance Support Training", "Helmets Included"],
  },
  "combo": {
    name: "Suzuki Dual Fleet + Boxer Bike",
    classType: "Dual Class A + B Comprehensive",
    transmission: "Manual & Auto Driving Fleet",
    dualControl: "Certified DMT Secondary Controls",
    safetyRating: "Highest Practical Pass Rate (98%)",
    features: ["Both Vehicles on Trial Day", "Unlimited Mock Exams", "Reverse S Practice", "MTA 30 Included"],
  },
};

export function HeroSection({ locale }: HeroSectionProps) {
  const dict = getDictionary(locale);
  const [selectedPreset, setSelectedPreset] = useState("combo");
  const [activeHeroTab, setActiveHeroTab] = useState<"fleet" | "simulator">("fleet");

  // Reaction simulator state
  const [simState, setSimState] = useState<"idle" | "waiting" | "ready" | "stopped" | "too_early">("idle");
  const [reactionTimeMs, setReactionTimeMs] = useState<number | null>(null);
  const [bestTimeMs, setBestTimeMs] = useState<number | null>(null);
  const timerStartRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulator = () => {
    soundManager.playClick();
    setSimState("waiting");
    setReactionTimeMs(null);

    const randomDelay = Math.floor(Math.random() * 2500) + 1500;
    timeoutRef.current = setTimeout(() => {
      timerStartRef.current = performance.now();
      setSimState("ready");
      soundManager.playHover();
    }, randomDelay);
  };

  const handleSimBrake = () => {
    if (simState === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setSimState("too_early");
      soundManager.playClick();
      return;
    }

    if (simState === "ready") {
      const elapsed = Math.round(performance.now() - timerStartRef.current);
      setReactionTimeMs(elapsed);
      setSimState("stopped");
      soundManager.playSuccessChime();

      if (!bestTimeMs || elapsed < bestTimeMs) {
        setBestTimeMs(elapsed);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollToPackage = (id: string) => {
    soundManager.playClick();
    setSelectedPreset(id);
    const element = document.getElementById("packages") || document.getElementById("apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentFleet = FLEET_SPECS[selectedPreset] || FLEET_SPECS["combo"];

  // Calculated stopping distances based on reaction time
  const userReactionSec = (reactionTimeMs || 300) / 1000;
  const stoppingDist40 = Math.round(((40 * 1000) / 3600) * userReactionSec + 8.5);
  const stoppingDist60 = Math.round(((60 * 1000) / 3600) * userReactionSec + 19.5);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 text-center bg-[#070706]">
      {/* Stitch Obsidian Atelier Signature Ambient Warm Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[38rem] marcus-ambient-glow pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[44rem] h-72 marcus-subtle-glow pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Bracketed Metadata Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131210] border border-white/[0.08] text-xs mb-6 sm:mb-8 shadow-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
            [ {siteConfig.legalEntityName} · DMT/WP/G/1174 · {siteConfig.contact.city} ]
          </span>
        </motion.div>

        {/* Monumental Editorial Headline (Google Stitch "Obsidian Atelier" Typography) */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-black tracking-tight text-[#f5f5f3] leading-[1.02] max-w-5xl mx-auto select-none uppercase"
        >
          <span>{dict.hero.editorialPrefix} </span>
          <span className="text-[#d0c5ab]">{dict.hero.editorialSuffix}</span>
          <span className="block mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-[#f59e0b] tracking-tight">
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
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
            className="btn-shimmer group px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#070706] font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2.5"
          >
            <Car className="w-4 h-4" />
            <span>{dict.hero.ctaRegister}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary Action: Translucent Titanium Glass Pill */}
          <a
            href="#packages"
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
            className="group px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#131210] hover:bg-[#1f1e1a] text-[#d0c5ab] hover:text-[#f5f5f3] border border-white/10 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:border-[#f59e0b]/40 active:scale-95 flex items-center gap-2"
          >
            <span>{dict.hero.viewCourses}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Interactive Vehicle Category Chips with Spring Physics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {VEHICLE_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <motion.button
                key={preset.id}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => scrollToPackage(preset.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#d0c5ab] text-[#070706] border-[#d0c5ab] shadow-md"
                    : "bg-[#131210] text-[#c7c2b6] border-white/[0.08] hover:border-[#f59e0b]/40 hover:text-white"
                }`}
              >
                <span>{preset.label[locale]}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Masterpiece Driving Cockpit & Live Telemetry HUD Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="mt-12 sm:mt-16 relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#131210] shadow-2xl spotlight-card text-left"
        >
          {/* Top Cockpit Mode Switcher Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-[#0a0908] border-b border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#d0c5ab] font-bold">WENASA COCKPIT TELEMETRY</span>
              <span className="text-[#94a3b8] hidden sm:inline">· DMT/WP/G/1174</span>
            </div>

            {/* Interactive Module Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#171613] border border-white/[0.06] text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveHeroTab("fleet");
                }}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  activeHeroTab === "fleet"
                    ? "bg-[#f59e0b] text-[#070706] shadow-sm"
                    : "text-[#94a3b8] hover:text-[#f5f5f3]"
                }`}
              >
                Fleet & Controls
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveHeroTab("simulator");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  activeHeroTab === "simulator"
                    ? "bg-[#f59e0b] text-[#070706] shadow-sm"
                    : "text-[#94a3b8] hover:text-[#f5f5f3]"
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Brake Test</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeHeroTab === "fleet" ? (
              <motion.div
                key="fleet-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Visual Viewport with Training Image & Telemetry HUD */}
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
                  
                  {/* Interactive Top Live Telemetry Bar */}
                  <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-10">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070706]/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#d0c5ab] shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-white uppercase tracking-wider">DUAL CONTROL:</span>
                      <span className="text-emerald-400">ARMED</span>
                      <span className="text-[#a8a295] hidden sm:inline">· 0.08s OVERRIDE</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#070706]/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#f59e0b] shadow-lg">
                      <span>KIRINDIWELA TRACK</span>
                      <span className="text-[#a8a295]">· 28°C DRY ASPHALT</span>
                    </div>
                  </div>

                  {/* Floating Credentials Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171613]/90 backdrop-blur-md border border-white/10 text-[#f59e0b] text-xs font-bold shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                        98% First-Attempt Pass Rate
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171613]/90 backdrop-blur-md border border-white/10 text-[#d0c5ab] text-xs font-bold shadow-lg">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Suzuki Dual-Control Fleet
                      </span>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d0c5ab] text-[#070706] text-xs font-extrabold shadow-lg">
                      <Users className="w-3.5 h-3.5" />
                      5,000+ Alumni
                    </span>
                  </div>
                </div>

                {/* Sub-HUD Fleet Telemetry Specs Bar */}
                <div className="p-4 sm:p-5 bg-[#0a0908] border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider block">VEHICLE CLASS</span>
                    <span className="font-bold text-[#f5f5f3]">{currentFleet.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider block">TRANSMISSION</span>
                    <span className="font-bold text-[#d0c5ab]">{currentFleet.transmission}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider block">SAFETY CONTROLS</span>
                    <span className="font-bold text-emerald-400">{currentFleet.safetyRating}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider block">DMT VERIFICATION</span>
                    <span className="font-bold text-[#f59e0b]">Passed Gampaha & Werahera</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="simulator-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 bg-[#0a0908] min-h-[340px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-[10px] font-mono text-[#f59e0b] tracking-widest uppercase block">
                        [ REACTION SPEED & STOPPING DISTANCE SIMULATOR ]
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                        How Fast Can You React to a Road Hazard?
                      </h3>
                      <p className="text-xs text-[#a8a295] mt-1 max-w-xl">
                        Click "Start Test", then hit "HIT BRAKE" the instant the signal turns RED. Tests your neurological reaction speed vs. vehicle physics.
                      </p>
                    </div>

                    {bestTimeMs && (
                      <div className="px-3.5 py-1.5 rounded-xl bg-[#171613] border border-white/10 text-xs font-mono text-right">
                        <span className="text-[10px] text-[#94a3b8] block">SESSION BEST</span>
                        <span className="text-sm font-bold text-emerald-400">{bestTimeMs} ms</span>
                      </div>
                    )}
                  </div>

                  {/* Simulator Traffic Signal & Actuator Zone */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Visual Signal Column (5 Cols) */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#131210] border border-white/10 text-center">
                      <div className="flex items-center gap-3 p-3 rounded-full bg-[#070706] border border-white/[0.08] mb-4">
                        <div
                          className={`w-7 h-7 rounded-full border transition-all duration-200 ${
                            simState === "ready"
                              ? "bg-rose-500 border-rose-400 shadow-[0_0_24px_rgba(244,63,94,0.8)] scale-110"
                              : "bg-rose-950/40 border-white/10 opacity-30"
                          }`}
                        />
                        <div
                          className={`w-7 h-7 rounded-full border transition-all duration-200 ${
                            simState === "waiting"
                              ? "bg-amber-400 border-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.8)] animate-pulse"
                              : "bg-amber-950/40 border-white/10 opacity-30"
                          }`}
                        />
                        <div
                          className={`w-7 h-7 rounded-full border transition-all duration-200 ${
                            simState === "idle" || simState === "stopped"
                              ? "bg-emerald-400 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                              : "bg-emerald-950/40 border-white/10 opacity-30"
                          }`}
                        />
                      </div>

                      <div className="font-mono text-sm">
                        {simState === "idle" && <span className="text-[#94a3b8]">READY TO INITIALIZE</span>}
                        {simState === "waiting" && <span className="text-amber-400 font-bold animate-pulse">STANDBY FOR RED SIGNAL...</span>}
                        {simState === "ready" && <span className="text-rose-400 font-black animate-ping text-base">BRAKE NOW!</span>}
                        {simState === "too_early" && <span className="text-rose-400 font-bold">TOO EARLY! WAIT FOR RED</span>}
                        {simState === "stopped" && (
                          <div className="text-center">
                            <span className="text-emerald-400 font-extrabold text-2xl block">{reactionTimeMs} ms</span>
                            <span className="text-[10px] text-[#94a3b8]">Reaction Time Recorded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interactive Button & Physics Readout (7 Cols) */}
                    <div className="md:col-span-7 space-y-4">
                      {simState === "idle" || simState === "stopped" || simState === "too_early" ? (
                        <button
                          type="button"
                          onClick={startSimulator}
                          className="w-full py-4 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#070706] font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Zap className="w-4 h-4" />
                          <span>{simState === "idle" ? "Start Reaction Test" : "Test Again"}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSimBrake}
                          className={`w-full py-5 rounded-xl font-black text-base uppercase tracking-wider transition-all duration-150 shadow-2xl cursor-pointer flex items-center justify-center gap-2 ${
                            simState === "ready"
                              ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
                              : "bg-[#171613] hover:bg-rose-950 text-rose-300 border border-rose-500/30"
                          }`}
                        >
                          <AlertTriangle className="w-5 h-5" />
                          <span>HIT EMERGENCY BRAKE</span>
                        </button>
                      )}

                      {/* Stopping distance calculated physics */}
                      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#131210] border border-white/[0.06] text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-[#94a3b8] block">STOPPING AT 40 KM/H</span>
                          <span className="text-sm font-bold text-[#d0c5ab]">~{stoppingDist40} meters</span>
                          <span className="text-[10px] text-[#a8a295] block mt-0.5">Reaction: {Math.round(((40 * 1000) / 3600) * userReactionSec)}m</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#94a3b8] block">STOPPING AT 60 KM/H</span>
                          <span className="text-sm font-bold text-[#f59e0b]">~{stoppingDist60} meters</span>
                          <span className="text-[10px] text-[#a8a295] block mt-0.5">Reaction: {Math.round(((60 * 1000) / 3600) * userReactionSec)}m</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#a8a295] leading-relaxed">
                        <span className="text-emerald-400 font-bold">Wenasa Instructor Advantage:</span> While you learn, our certified dual-control pedals provide instantaneous secondary reaction (0.08s), ensuring 100% collision prevention during city traffic and junction turns.
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Minimalist Editorial Authority Bar & "Scroll" Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-18 pt-6 sm:pt-8 border-t border-white/[0.08]"
        >
          <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-xs font-bold uppercase tracking-widest text-[#a8a295]">
            {/* Left: Authority Points */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2 text-[#d0c5ab]">
                <Award className="w-4 h-4 text-[#f59e0b]" />
                <span>DMT SRI LANKA</span>
              </div>
              <div className="flex items-center gap-2 text-[#d0c5ab]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NTMI MEDICALS</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[#d0c5ab]">
                <Users className="w-4 h-4 text-[#f59e0b]" />
                <span>5,000+ LICENSED</span>
              </div>
            </div>

            {/* Right: Scroll Indicator */}
            <a
              href="#services"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-3 text-[#c7c2b6] hover:text-[#f59e0b] transition-colors group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#f59e0b] rounded-full"
            >
              <span className="text-[11px] tracking-widest uppercase">Explore Courses · Scroll</span>
              <span className="w-7 h-7 rounded-full border border-white/10 group-hover:border-[#f59e0b] group-hover:bg-[#1a1916] flex items-center justify-center transition-all">
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
              </span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
