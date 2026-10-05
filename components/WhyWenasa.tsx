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
    <section id="why-us" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Marcus Lorenzet Editorial Style */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
            <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
              [ 04 · WHY CHOOSE WENASA ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
            {dict.why.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
            {dict.why.subtitle}
          </p>
        </div>

        {/* Bento Trust Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          
          {/* SPOTLIGHT HERO 1: Dual-Control Safety Fleet (2 Cols) */}
          <div className="col-span-1 md:col-span-2 rounded-3xl marcus-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#fcc438]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#fcc438] flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab] text-[11px] font-black uppercase tracking-wider shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fcc438] animate-pulse" />
                  <span>{m.badge1}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#f5f5f3] tracking-tight">
                {dict.why.point1Title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed max-w-xl">
                {dict.why.point1Desc}
              </p>

              {/* Interactive Dual-Control Dashboard Simulation */}
              <div className="mt-6 p-4 rounded-2xl bg-[#0d0c0a] border border-white/[0.06] shadow-inner">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#a8a295] mb-3 border-b border-white/[0.06] pb-2.5">
                  <span className="text-[#f5f5f3] flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#fcc438]" />
                    <span>{m.metricFleetTitle}</span>
                  </span>
                  <span className="text-[#d0c5ab]">DMT/WP/G/1174</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#141310] border border-white/[0.06]">
                    <span className="text-[11px] text-[#a8a295] block mb-0.5">Student Pedals</span>
                    <span className="text-xs font-bold text-[#f5f5f3] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Throttle · Brake · Clutch
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#141310] border border-white/10">
                    <span className="text-[11px] text-[#a8a295] block mb-0.5">Instructor Pedals</span>
                    <span className="text-xs font-bold text-[#d0c5ab] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fcc438] animate-pulse" />
                      Dual Brake & Clutch Sync
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-[#a8a295] leading-relaxed">
                  {m.metricFleetDesc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#a8a295]">
              <span className="font-semibold text-[#c7c2b6]">Suzuki Wagon R & Alto Fleet</span>
              <span className="text-[#d0c5ab] font-bold">100% Dual-Pedal Equipped</span>
            </div>
          </div>

          {/* SPOTLIGHT HERO 2: Private Practical Grounds (2 Cols) */}
          <div className="col-span-1 md:col-span-2 rounded-3xl marcus-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#d0c5ab]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center shadow-lg">
                  <MapPin className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1a17] border border-white/10 text-[#d0c5ab] text-[11px] font-black uppercase tracking-wider shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{m.badge2}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#f5f5f3] tracking-tight">
                {dict.why.point3Title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed max-w-xl">
                {dict.why.point3Desc}
              </p>

              {/* Practical Trial Track Simulator Preview */}
              <div className="mt-6 p-4 rounded-2xl bg-[#0d0c0a] border border-white/[0.06] shadow-inner">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#a8a295] mb-3 border-b border-white/[0.06] pb-2.5">
                  <span className="text-[#f5f5f3] flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-[#fcc438]" />
                    <span>{m.metricTrackTitle}</span>
                  </span>
                  <span className="text-[#d0c5ab]">Kirindiwela Ground</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-[#141310] border border-white/[0.06]">
                    <span className="text-[#fcc438] font-bold block text-sm">Zone 1</span>
                    <span className="text-[11px] text-[#c7c2b6]">Hill Start Ramp</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141310] border border-white/[0.06]">
                    <span className="text-[#fcc438] font-bold block text-sm">Zone 2</span>
                    <span className="text-[11px] text-[#c7c2b6]">Reverse &lsquo;S&rsquo; Track</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141310] border border-white/[0.06]">
                    <span className="text-[#fcc438] font-bold block text-sm">Zone 3</span>
                    <span className="text-[11px] text-[#c7c2b6]">Parallel Parking</span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-[#a8a295] leading-relaxed">
                  {m.metricTrackDesc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#a8a295]">
              <span className="font-semibold text-[#c7c2b6]">Private Closed Facility</span>
              <span className="text-[#d0c5ab] font-bold">Hanwella - Urapola Road</span>
            </div>
          </div>

          {/* COMPANION PILLAR 3: DMT Certified Instructors (1 Col) */}
          <div className="col-span-1 rounded-3xl marcus-card p-6 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#fcc438] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-[#d0c5ab] border border-white/10">
                  {m.tag3}
                </span>
              </div>

              <div className="text-[10px] font-mono text-[#a8a295] uppercase tracking-wider mb-1">
                [ 01 · EXPERTISE ]
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#f5f5f3] group-hover:text-[#fcc438] transition-colors">
                {dict.why.point2Title}
              </h3>
              <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                {dict.why.point2Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3 text-[11px] text-[#c7c2b6]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
                  <span>{m.chip3a}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
                  <span>{m.chip3b}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] text-[#a8a295] font-mono">
              Govt Licenced Staff
            </div>
          </div>

          {/* COMPANION PILLAR 4: Flexible Timing & Hours (1 Col) */}
          <div className="col-span-1 rounded-3xl marcus-card p-6 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-[#d0c5ab] border border-white/10">
                  {m.tag4}
                </span>
              </div>

              <div className="text-[10px] font-mono text-[#a8a295] uppercase tracking-wider mb-1">
                [ 02 · FLEXIBILITY ]
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                {dict.why.point4Title}
              </h3>
              <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                {dict.why.point4Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3 text-[11px] text-[#c7c2b6]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{m.chip4a}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{m.chip4b}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] text-[#a8a295] font-mono">
              7 Days · Zero Conflict
            </div>
          </div>

          {/* COMPANION PILLAR 5: Female Instructor Option (1 Col) */}
          <div className="col-span-1 rounded-3xl marcus-card p-6 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1a17] border border-white/10 text-[#d0c5ab] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-[#d0c5ab] border border-white/10">
                  {m.tag5}
                </span>
              </div>

              <div className="text-[10px] font-mono text-[#a8a295] uppercase tracking-wider mb-1">
                [ 03 · INCLUSION ]
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                {dict.why.point5Title}
              </h3>
              <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                {dict.why.point5Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3 text-[11px] text-[#c7c2b6]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
                  <span>{m.chip5a}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
                  <span>{m.chip5b}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] text-[#a8a295] font-mono">
              Empowering & Safe
            </div>
          </div>

          {/* COMPANION PILLAR 6: Complete Admin Support (1 Col) */}
          <div className="col-span-1 rounded-3xl marcus-card p-6 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#1c1a17] border border-white/10 text-emerald-400 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c1a17] text-emerald-300 border border-white/10">
                  {m.tag6}
                </span>
              </div>

              <div className="text-[10px] font-mono text-[#a8a295] uppercase tracking-wider mb-1">
                [ 04 · SUPPORT ]
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#f5f5f3] group-hover:text-emerald-400 transition-colors">
                {dict.why.point6Title}
              </h3>
              <p className="mt-2 text-xs text-[#c7c2b6] leading-relaxed">
                {dict.why.point6Desc}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3 text-[11px] text-[#c7c2b6]">
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

            <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] text-[#a8a295] font-mono">
              Zero Queue Hassle
            </div>
          </div>

        </div>

        {/* Bottom Institutional Trust Banner */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-6 rounded-3xl marcus-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#c7c2b6] text-center sm:text-left">
            <span className="font-bold text-[#fcc438] shrink-0">{m.trustBarPrefix}</span>
            <span>{m.trustBarText}</span>
          </div>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] font-black text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-95 shrink-0 shadow-md"
          >
            <span>{m.ctaBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
