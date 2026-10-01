"use client";

import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { ShieldCheck, Award } from "lucide-react";

interface InstructorsSectionProps {
  locale: Locale;
}

interface Instructor {
  id: string;
  name: string;
  licenceNo: string;
  role: { en: string; si: string; ta: string };
  experience: string;
  languages: string[];
  vehicleSpecialties: string[];
  bio: { en: string; si: string; ta: string };
}

const INSTRUCTORS: Instructor[] = [
  {
    id: "inst-1",
    name: "Sunil Jayawardena",
    licenceNo: "DMT/INS/7821",
    role: {
      en: "Chief Driving Instructor & Founder",
      si: "ප්‍රධාන රියදුරු උපදේශක සහ ආරම්භක",
      ta: "தலைமை ஓட்டுனர் பயிற்றுவிப்பாளர்",
    },
    experience: "16+ Years",
    languages: ["Sinhala", "English"],
    vehicleSpecialties: ["Cars (Manual & Auto)", "Heavy Commercial Trucks"],
    bio: {
      en: "Licensed by DMT Werahera with over 16 years of road instruction experience. Specializes in defensive driving techniques and student confidence building.",
      si: "වසර 16 කට අධික මඟපෙන්වීමේ පළපුරුද්දක් සහිත DMT බලපත්‍රලාභී ප්‍රධාන උපදේශකවරයා. ආරක්ෂිත රිය පැදවීම පිළිබඳ විශේෂඥයෙකි.",
      ta: "16 ஆண்டுகளுக்கும் மேலான அனுபவமுள்ள DMT உரிமம் பெற்ற தலைமை பயிற்றுவிப்பாளர்.",
    },
  },
  {
    id: "inst-2",
    name: "Nirosha Perera",
    licenceNo: "DMT/INS/9104",
    role: {
      en: "Senior Instructor - Light Vehicles",
      si: "ජ්‍යෙෂ්ඨ උපදේශිකා - සැහැල්ලු වාහන",
      ta: "சிரேஷ்ட பயிற்றுவிப்பாளர் - இலகு வாகனங்கள்",
    },
    experience: "8+ Years",
    languages: ["Sinhala", "English"],
    vehicleSpecialties: ["Automatic Cars", "Manual Cars", "Scooters"],
    bio: {
      en: "Expert in patient instruction for beginners and nervous first-time drivers. Leads our dedicated training sessions for female learners.",
      si: "පළමු වරට රියදුරු අසුනට පැමිණෙන නවක සිසුන් සහ කාන්තා සිසුවියන් ඉවසීමෙන් පුහුණු කිරීම පිළිබඳ විශිෂ්ට උපදේශිකාවකි.",
      ta: "தொடக்கநிலை மாணவர்களுக்கு பொறுமையுடன் கற்பிப்பதில் வல்லவர்.",
    },
  },
  {
    id: "inst-3",
    name: "K. Selvaratnam",
    licenceNo: "DMT/INS/8432",
    role: {
      en: "Dual-Control & Motorbike Instructor",
      si: "ද්විත්ව පාලක සහ යතුරුපැදි උපදේශක",
      ta: "இரட்டை கட்டுப்பாட்டு மற்றும் மோட்டார் சைக்கிள் பயிற்றுவிப்பாளர்",
    },
    experience: "11+ Years",
    languages: ["Tamil", "Sinhala", "English"],
    vehicleSpecialties: ["Motorcycles (Class A)", "Three-Wheelers", "Cars"],
    bio: {
      en: "Trilingual certified instructor covering Sinhala, Tamil, and English learners. Master of motorcycle slalom balancing and parking geometry.",
      si: "සිංහල, දෙමළ හා ඉංග්‍රීසි භාෂා ත්‍රිත්වයෙන්ම උපදෙස් ලබාදෙන පළපුරුදු සහතිකලත් උපදේශකවරයෙකි.",
      ta: "தமிழ், சிங்களம் மற்றும் ஆங்கிலத்தில் கற்பிக்கும் மும்மொழி பயிற்றுவிப்பாளர்.",
    },
  },
];

export function InstructorsSection({ locale }: InstructorsSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section id="instructors" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            {dict.instructors.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
            {dict.instructors.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.instructors.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSTRUCTORS.map((inst) => (
            <div
              key={inst.id}
              className="bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* Stylized monogram avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg border border-slate-800 shrink-0">
                    {inst.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {inst.name}
                    </h3>
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      {inst.role[locale]}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>{inst.licenceNo}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  {inst.bio[locale]}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>{dict.instructors.experience}:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{inst.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>{dict.instructors.languages}:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{inst.languages.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                {inst.vehicleSpecialties.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>All instructors undergo periodic DMT qualification renewals and mandatory defensive driving refresher training.</span>
        </div>
      </div>
    </section>
  );
}
