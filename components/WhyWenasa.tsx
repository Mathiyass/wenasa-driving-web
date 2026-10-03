"use client";

import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Clock, 
  Users, 
  FileCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Gauge,
  Car
} from "lucide-react";

interface WhyWenasaProps {
  locale: Locale;
}

const localizedMeta = {
  en: {
    eyebrow: "Why Choose Wenasa · Official Standards",
    badge1: "Certified Secondary Controls · 0.08s Response",
    badge2: "Exclusive Kirindiwela Closed Track",
    metricFleetTitle: "Dual-Control Safety System",
    metricFleetDesc: "Independent instructor pedals guarantee 100% emergency override on city roads and ramps.",
    metricTrackTitle: "DMT Practical Trial Ground",
    metricTrackDesc: "Exact Gampaha & Werahera examination specifications for hill starts, reverse S, and parallel parking.",
    tag3: "DMT Registered",
    chip3a: "10+ Years Teaching Experience",
    chip3b: "Patient & Supportive Demeanor",
    tag4: "Dawn-to-Dusk",
    chip4a: "6:30 AM to 6:00 PM Sessions",
    chip4b: "Weekend & Twilight Batches",
    tag5: "1-on-1 Coaching",
    chip5a: "Licensed Lady Instructors",
    chip5b: "Private & Supportive Learning",
    tag6: "Zero Bureaucracy",
    chip6a: "NTMI Medical Fast-Tracking",
    chip6b: "MTA 30 Paperwork Handled",
    trustBarPrefix: "Official Accreditation:",
    trustBarText: "Reg. No. DMT/WP/G/1174 · NTMI Medical Fit Certificate Verified · Serving Kirindiwela & Gampaha District",
    ctaBtn: "Enroll with Confidence",
  },
  si: {
    eyebrow: "වෙනස ඇයි? · නිල ප්‍රමිතීන්",
    badge1: "ද්විත්ව පාලක පද්ධතිය · ක්ෂණික ආරක්ෂාව",
    badge2: "කිරිඳිවැල පෞද්ගලික පුහුණු ධාවන පථය",
    metricFleetTitle: "ද්විත්ව පාලක සුරක්ෂිතතා පද්ධතිය",
    metricFleetDesc: "උපදේශකවරයා සතු අතිරේක තිරිංග හා ක්ලච් මගින් ඕනෑම හදිසි අවස්ථාවකදී රථය පාලනය කළ හැක.",
    metricTrackTitle: "DMT ප්‍රායෝගික ට්‍රයල් පුහුණු භූමිය",
    metricTrackDesc: "ගම්පහ සහ වේරහැර විභාග මට්ටමේ කඳු ආරම්භය, 'S' හැරවුම සහ පාක් කිරීමේ සැබෑ පුහුණුව.",
    tag3: "DMT ලියාපදිංචි",
    chip3a: "වසර 10කට වැඩි පළපුරුද්ද",
    chip3b: "ඉවසිලිවන්ත මිත්‍රශීලී ගුරු මණ්ඩලය",
    tag4: "උදෑසන සිට සවස",
    chip4a: "පෙ.ව. 6:30 සිට පුහුණු සැසි",
    chip4b: "සති අන්ත සහ සවස කණ්ඩායම්",
    tag5: "පෞද්ගලික පුහුණුව",
    chip5a: "කාන්තා උපදේශකවරියන්ගේ සේවය",
    chip5b: "සුවපහසු ඉගෙනුම් පරිසරය",
    tag6: "පූර්ණ සහයෝගය",
    chip6a: "NTMI වෛද්‍ය වේලාවන් වෙන්කිරීම",
    chip6b: "MTA 30 ලේඛන සියල්ල සකස් කිරීම",
    trustBarPrefix: "නිල ලියාපදිංචිය:",
    trustBarText: "ලියාපදිංචි අංකය DMT/WP/G/1174 · NTMI වෛද්‍ය අනුමැතිය · කිරිඳිවැල සහ ගම්පහ දිස්ත්‍රික්කය",
    ctaBtn: "අදම ලියාපදිංචි වන්න",
  },
  ta: {
    eyebrow: "ஏன் வெனசா? · உத்தியோகபூர்வ தரம்",
    badge1: "இரட்டை கட்டுப்பாட்டு முறை · உடனடி பாதுகாப்பு",
    badge2: "கிரிந்திவெல பிரத்தியேக பயிற்சி மைதானம்",
    metricFleetTitle: "இரட்டை கட்டுப்பாட்டு அமைப்பு",
    metricFleetDesc: "பயிற்றுவிப்பாளரின் கூடுதல் பிரேக் மற்றும் கிளட்ச் மூலம் எந்த அவசர நிலையிலும் பாதுகாப்பான ஓட்டம்.",
    metricTrackTitle: "DMT செய்முறைப் பயிற்சி மைதானம்",
    metricTrackDesc: "கம்பஹா மற்றும் வேரஹெர DMT தரத்திலான ஹில்-ஸ்டார்ட், ரிவர்ஸ் 'S' மற்றும் பார்க்கிங் பயிற்சி.",
    tag3: "DMT பதிவு பெற்றது",
    chip3a: "10+ வருட கற்பித்தல் அனுபவம்",
    chip3b: "பொறுமையான மற்றும் ஆதரவான முறை",
    tag4: "காலை முதல் மாலை",
    chip4a: "காலை 6:30 முதல் பயிற்சி அமர்வுகள்",
    chip4b: "வார இறுதி மற்றும் மாலை வகுப்புகள்",
    tag5: "தனிப்பயிற்சி",
    chip5a: "பெண் பயிற்றுனர் வழிகாட்டல்",
    chip5b: "வசதியான மற்றும் பாதுகாப்பான சூழல்",
    tag6: "முழு உதவி",
    chip6a: "NTMI மருத்துவ முன்பதிவு",
    chip6b: "MTA 30 ஆவண ஏற்பாடுகள்",
    trustBarPrefix: "உத்தியோகபூர்வ அங்கீகாரம்:",
    trustBarText: "பதிவு எண்: DMT/WP/G/1174 · NTMI மருத்துவ சான்றிதழ் · கிரிந்திவெல மற்றும் கம்பஹா மாவட்டம்",
    ctaBtn: "இன்றே பதிவு செய்யுங்கள்",
  },
};

export function WhyWenasa({ locale }: WhyWenasaProps) {
  const dict = getDictionary(locale);
  const m = localizedMeta[locale] || localizedMeta.en;

  return (
    <section id="why-us" className="py-20 sm:py-24 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{m.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
            {dict.why.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.why.subtitle}
          </p>
        </div>

        {/* Bento Trust Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          
          {/* ======================================================== */}
          {/* SPOTLIGHT HERO 1: Dual-Control Safety Fleet (2 Cols)     */}
          {/* ======================================================== */}
          <div className="col-span-1 md:col-span-2 rounded-[2.25rem] p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500/25 via-slate-800/40 to-slate-900/80 border border-emerald-500/30 shadow-2xl transition-all duration-300 hover:border-emerald-400/80 group">
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/20 p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              {/* Atmospheric emerald glow */}
              <div className="absolute -top-16 -right-16 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/40">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{m.badge1}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {dict.why.point1Title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  {dict.why.point1Desc}
                </p>

                {/* Interactive Dual-Control Dashboard Simulation */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-3 border-b border-slate-800/80 pb-2.5">
                    <span className="text-white flex items-center gap-2">
                      <Car className="w-4 h-4 text-emerald-400" />
                      <span>{m.metricFleetTitle}</span>
                    </span>
                    <span className="text-emerald-400">DMT/WP/G/1174</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Student Pedals</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Throttle · Brake · Clutch
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-900/50">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Instructor Pedals</span>
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Dual Brake & Clutch Sync
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
                    {m.metricFleetDesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Suzuki Wagon R & Alto Fleet</span>
                <span className="text-emerald-400 font-bold">100% Dual-Pedal Equipped</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SPOTLIGHT HERO 2: Private Practical Grounds (2 Cols)     */}
          {/* ======================================================== */}
          <div className="col-span-1 md:col-span-2 rounded-[2.25rem] p-1.5 sm:p-2 bg-gradient-to-br from-teal-500/25 via-slate-800/40 to-slate-900/80 border border-teal-500/30 shadow-2xl transition-all duration-300 hover:border-teal-400/80 group">
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-br from-slate-900 via-slate-900/95 to-teal-950/20 p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              {/* Atmospheric teal glow */}
              <div className="absolute -top-16 -right-16 w-60 h-60 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center shadow-lg shadow-teal-950/40">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/40 text-teal-300 text-[11px] font-black uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span>{m.badge2}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {dict.why.point3Title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  {dict.why.point3Desc}
                </p>

                {/* Practical Trial Track Simulator Preview */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-3 border-b border-slate-800/80 pb-2.5">
                    <span className="text-white flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-teal-400" />
                      <span>{m.metricTrackTitle}</span>
                    </span>
                    <span className="text-teal-400">Kirindiwela Ground</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-teal-400 font-bold block text-sm">Zone 1</span>
                      <span className="text-[11px] text-slate-300">Hill Start Ramp</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-teal-400 font-bold block text-sm">Zone 2</span>
                      <span className="text-[11px] text-slate-300">Reverse &lsquo;S&rsquo; Track</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-teal-400 font-bold block text-sm">Zone 3</span>
                      <span className="text-[11px] text-slate-300">Parallel Parking</span>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
                    {m.metricTrackDesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Private Closed Facility</span>
                <span className="text-teal-400 font-bold">Hanwella - Urapola Road</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COMPANION PILLAR 3: DMT Certified Instructors (1 Col)    */}
          {/* ======================================================== */}
          <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-900/50">
                  {m.tag3}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                {dict.why.point2Title}
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {dict.why.point2Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{m.chip3a}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{m.chip3b}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Govt Licenced Staff
            </div>
          </div>

          {/* ======================================================== */}
          {/* COMPANION PILLAR 4: Flexible Timing & Hours (1 Col)      */}
          {/* ======================================================== */}
          <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl flex flex-col justify-between hover:border-sky-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-sky-900/50">
                  {m.tag4}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                {dict.why.point4Title}
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {dict.why.point4Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{m.chip4a}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{m.chip4b}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              7 Days · Zero Conflict
            </div>
          </div>

          {/* ======================================================== */}
          {/* COMPANION PILLAR 5: Female Instructor Option (1 Col)     */}
          {/* ======================================================== */}
          <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl flex flex-col justify-between hover:border-rose-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-rose-900/50">
                  {m.tag5}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                {dict.why.point5Title}
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {dict.why.point5Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{m.chip5a}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{m.chip5b}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Empowering & Safe
            </div>
          </div>

          {/* ======================================================== */}
          {/* COMPANION PILLAR 6: Complete Admin Support (1 Col)       */}
          {/* ======================================================== */}
          <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-emerald-900/50">
                  {m.tag6}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                {dict.why.point6Title}
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {dict.why.point6Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{m.chip6a}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{m.chip6b}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Zero Queue Hassle
            </div>
          </div>

        </div>

        {/* Bottom Institutional Trust Banner */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-300 text-center sm:text-left">
            <span className="font-bold text-emerald-400 shrink-0">{m.trustBarPrefix}</span>
            <span>{m.trustBarText}</span>
          </div>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <span>{m.ctaBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
