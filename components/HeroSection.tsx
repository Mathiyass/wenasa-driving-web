"use client";

import { siteConfig } from "@/src/config/site";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  MessageSquare, 
  Car, 
  Navigation,
  CheckCircle2
} from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background architectural mesh */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#059669 1px, #0f172a 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      {/* Subtle ambient light orb */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{siteConfig.legalEntityName}</span>
              <span aria-hidden="true">·</span>
              <span>{siteConfig.contact.city}</span>
            </div>

            {/* Main Headline */}
            <h1 
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
              style={{ textWrap: "balance" }}
            >
              {dict.hero.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {dict.hero.subheadline}
            </p>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dict.hero.trustBadge1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dict.hero.trustBadge2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dict.hero.trustBadge3}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-900/30 transition-all focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                <span>{dict.hero.ctaRegister}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-emerald-300 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{dict.hero.ctaWhatsApp}</span>
              </a>

              <a
                href={siteConfig.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                title={`Directions to ${siteConfig.contact.address[locale]}`}
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>{dict.common.getDirections}</span>
              </a>
            </div>

            {/* Address & Hours Footnote */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{siteConfig.contact.address[locale]}</span>
            </div>
          </div>

          {/* Right Column: Visual Focal Carrier with Automotive & Training Illustration */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden"
            >
              {/* Corner Watermark Card */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                    W
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">
                      {siteConfig.name.en}
                    </div>
                    <div className="text-xs text-emerald-400 font-medium">
                      {siteConfig.name.si}
                    </div>
                  </div>
                </div>

                {/* "L" plate badge for authentic driving school branding */}
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-red-600 font-black text-2xl leading-none">L</span>
                </div>
              </div>

              {/* Graphic Stage: Dual-Control Car & Road Environment */}
              <div className="my-6 relative py-4">
                <svg
                  viewBox="0 0 420 220"
                  className="w-full h-auto drop-shadow-lg"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Wenasa dual-control driving school training car on roadway"
                >
                  {/* Road Asphalt */}
                  <rect x="10" y="160" width="400" height="50" rx="8" fill="#1e293b" />
                  {/* Road Markings */}
                  <line x1="30" y1="185" x2="80" y2="185" stroke="#f8fafc" strokeWidth="3" strokeDasharray="12 12" />
                  <line x1="120" y1="185" x2="170" y2="185" stroke="#f8fafc" strokeWidth="3" strokeDasharray="12 12" />
                  <line x1="210" y1="185" x2="260" y2="185" stroke="#f8fafc" strokeWidth="3" strokeDasharray="12 12" />
                  <line x1="300" y1="185" x2="350" y2="185" stroke="#f8fafc" strokeWidth="3" strokeDasharray="12 12" />
                  <line x1="390" y1="185" x2="410" y2="185" stroke="#f8fafc" strokeWidth="3" strokeDasharray="12 12" />

                  {/* Dual-Control Training Car Body */}
                  <path
                    d="M 60 155 L 90 100 L 170 85 L 260 85 L 310 115 L 350 125 L 360 155 Z"
                    fill="#f8fafc"
                  />
                  {/* Car Roof & Windows */}
                  <path
                    d="M 100 102 L 165 90 L 255 90 L 295 115 L 100 115 Z"
                    fill="#0f172a"
                    opacity="0.85"
                  />
                  {/* Center Pillar */}
                  <line x1="195" y1="90" x2="195" y2="115" stroke="#f8fafc" strokeWidth="4" />
                  
                  {/* Instructor & Student Silhouettes */}
                  <circle cx="155" cy="104" r="7" fill="#10b981" />
                  <circle cx="230" cy="104" r="7" fill="#60a5fa" />

                  {/* Dual Control Roof Sign ("LEARNER DRIVER - WENASA") */}
                  <rect x="150" y="65" width="110" height="20" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="153" y="68" width="15" height="14" rx="2" fill="#ef4444" />
                  <text x="156" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">L</text>
                  <text x="174" y="79" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="sans-serif">WENASA</text>

                  {/* Car Headlights & Taillights */}
                  <path d="M 350 130 L 360 135 L 358 145 L 348 140 Z" fill="#fef08a" />
                  <path d="M 60 135 L 68 135 L 66 145 L 60 145 Z" fill="#ef4444" />

                  {/* Car Wheels */}
                  <circle cx="115" cy="155" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
                  <circle cx="115" cy="155" r="9" fill="#e2e8f0" />
                  <circle cx="295" cy="155" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
                  <circle cx="295" cy="155" r="9" fill="#e2e8f0" />

                  {/* Dual Pedal Indicator (Instructor Brake + Clutch System) */}
                  <g transform="translate(18, 20)">
                    <rect x="0" y="0" width="105" height="34" rx="6" fill="#0f172a" opacity="0.9" stroke="#10b981" strokeWidth="1" />
                    <text x="8" y="14" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="sans-serif">DUAL CONTROLS</text>
                    <text x="8" y="26" fill="#cbd5e1" fontSize="7" fontFamily="sans-serif">Active Dual Pedals</text>
                  </g>

                  {/* Traffic Signal Icon */}
                  <g transform="translate(365, 30)">
                    <rect x="0" y="0" width="18" height="45" rx="4" fill="#020617" />
                    <circle cx="9" cy="9" r="4" fill="#ef4444" opacity="0.3" />
                    <circle cx="9" cy="22" r="4" fill="#f59e0b" opacity="0.3" />
                    <circle cx="9" cy="35" r="4" fill="#10b981" />
                    <rect x="7" y="45" width="4" height="40" fill="#475569" />
                  </g>
                </svg>
              </div>

              {/* Lower Specs Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/60 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-[11px]">Training Standard</div>
                  <div className="font-bold text-white mt-0.5 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dual-Control Fleet</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-[11px]">Kirindiwela Ground</div>
                  <div className="font-bold text-white mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>DMT Reverse & Hill Bay</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
