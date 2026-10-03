"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/src/config/i18n";
import { 
  X, 
  UserCheck, 
  Search, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  Car, 
  PhoneCall, 
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";

interface StudentPortalModalProps {
  locale: Locale;
  onClose: () => void;
}

const copy = {
  en: {
    badge: "Official Learner Desk",
    title: "Student Portal & Progress Hub",
    subtitle: "Check your live training hours, upcoming dual-control practice sessions, and official DMT trial schedule.",
    searchPlaceholder: "Enter Student Reg No (e.g., WN-2026-881) or Phone...",
    searchBtn: "Check Status",
    demoBtn: "Load Demo Student Record",
    studentName: "Kasun Jayawardena",
    studentId: "WN-2026-881",
    enrolledClass: "Dual Purpose & Car (Auto + Manual) · Class B",
    branch: "Kirindiwela Center",
    statHours: "Hours Completed",
    statTheory: "DMT Written Test",
    statTrial: "DMT Practical Trial",
    statStatus: "Permit Status",
    passed: "Passed (36/40)",
    permitActive: "L-Plate Active (Month 2 of 3)",
    trialDate: "Nov 14, 2026 · Gampaha DMT",
    nextLessonTitle: "Next Scheduled Dual-Control Lesson",
    nextLessonDetails: "Tomorrow, 8:30 AM – 10:30 AM · Kirindiwela Test Ground",
    instructorLabel: "Assigned Senior Instructor",
    instructorName: "Mr. Jagath Perera (DMT Cert. #1428)",
    bookSlotBtn: "Request Lesson Reschedule",
    whatsappBtn: "Chat with Student Desk",
    helpNotice: "Need immediate assistance with test dates or lesson rescheduling? Call our Kirindiwela desk directly.",
  },
  si: {
    badge: "නිල ශිෂ්‍ය තොරතුරු පද්ධතිය",
    title: "ශිෂ්‍ය පෝටලය සහ ප්‍රගති සමාලෝචනය",
    subtitle: "ධාවනය කළ පැය ගණන, ඉදිරි පුහුණු කාලසටහන සහ DMT විභාග දින පහසුවෙන් පරික්ෂා කරන්න.",
    searchPlaceholder: "ශිෂ්‍ය අංකය (උදා: WN-2026-881) හෝ දුරකථන අංකය ඇතුළත් කරන්න...",
    searchBtn: "පරීක්ෂා කරන්න",
    demoBtn: "ආදර්ශ ශිෂ්‍ය තොරතුරු පෙන්වන්න",
    studentName: "කසුන් ජයවර්ධන",
    studentId: "WN-2026-881",
    enrolledClass: "ද්විත්ව කාර්ය සහ මෝටර් රථ (Auto + Manual) · Class B",
    branch: "කිරිඳිවැල මධ්‍යස්ථානය",
    statHours: "සම්පූර්ණ කළ පැය",
    statTheory: "DMT ලිඛිත විභාගය",
    statTrial: "ප්‍රායෝගික ට්‍රයල් විභාගය",
    statStatus: "බලපත්‍ර තත්ත්වය",
    passed: "සමත් (36/40)",
    permitActive: "L-බෝඩ් වලංගුයි (මාස 2/3)",
    trialDate: "2026 නොවැ 14 · ගම්පහ DMT",
    nextLessonTitle: "මීළඟ ප්‍රායෝගික පුහුණු සැසිය",
    nextLessonDetails: "හෙට, පෙ.ව. 8:30 – පෙ.ව. 10:30 · කිරිඳිවැල ධාවන පථය",
    instructorLabel: "පැවරුණු ජ්‍යෙෂ්ඨ උපදේශක",
    instructorName: "ජගත් පෙරේරා මහතා (DMT සහතික අංක 1428)",
    bookSlotBtn: "පුහුණු වේලාව වෙනස් කරන්න",
    whatsappBtn: "ශිෂ්‍ය මධ්‍යස්ථානයට WhatsApp කරන්න",
    helpNotice: "විභාග දින හෝ වේලාවන් පිළිබඳ ගැටලු ඇත්නම් කිරිඳිවැල කාර්යාලය අමතන්න.",
  },
  ta: {
    badge: "மாணவர் தகவல் தளம்",
    title: "மாணவர் போர்டல் மற்றும் முன்னேற்றப் பதிவு",
    subtitle: "உங்கள் பயிற்சி மணிநேரங்கள், வரவிருக்கும் வகுப்புகள் மற்றும் DMT பரீட்சை விபரங்களை அறியுங்கள்.",
    searchPlaceholder: "பதிவு இலக்கம் (உதா: WN-2026-881) அல்லது தொலைபேசி எண்...",
    searchBtn: "சரிபார்க்க",
    demoBtn: "மாதிரி மாணவர் விபரம்",
    studentName: "கசுன் ஜெயவர்தன",
    studentId: "WN-2026-881",
    enrolledClass: "கார் (Auto + Manual) · Class B",
    branch: "கிரிந்திவெல மையம்",
    statHours: "முடித்த மணிநேரம்",
    statTheory: "DMT எழுத்துத் தேர்வு",
    statTrial: "DMT செய்முறைத் தேர்வு",
    statStatus: "அனுமதி நிலை",
    passed: "தேர்ச்சி (36/40)",
    permitActive: "L-Plate செயலில் உள்ளது",
    trialDate: "நவ 14, 2026 · கம்பஹா DMT",
    nextLessonTitle: "அடுத்த செய்முறைப் பயிற்சி வகுப்பு",
    nextLessonDetails: "நாளை, காலை 8:30 – 10:30 · கிரிந்திவெல மைதானம்",
    instructorLabel: "மூத்த பயிற்றுவிப்பாளர்",
    instructorName: "திரு. ஜகத் பெரேரா (DMT சான்றிதழ் #1428)",
    bookSlotBtn: "நேரத்தை மாற்ற கோரிக்கை",
    whatsappBtn: "WhatsApp இல் தொடர்பு கொள்க",
    helpNotice: "பரீட்சை திகதிகள் அல்லது மாற்றங்களுக்கு உடனடியாக கிரிந்திவெல அலுவலகத்தை அழையுங்கள்.",
  },
};

export function StudentPortalModal({ locale, onClose }: StudentPortalModalProps) {
  const [query, setQuery] = useState("WN-2026-881");
  const [showResult, setShowResult] = useState(true);
  const t = copy[locale] || copy.en;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResult(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>{t.badge}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {t.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm cursor-pointer transition-all active:scale-95 shrink-0"
            >
              {t.searchBtn}
            </button>
          </form>

          {showResult && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Student Overview Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-sky-950/20 border border-slate-800 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-base">
                      KJ
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-black text-white">
                          {t.studentName}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        ID: {t.studentId} · {t.branch}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-sky-300 bg-sky-950/60 px-3 py-1.5 rounded-xl border border-sky-800/60 self-start sm:self-auto">
                    {t.enrolledClass}
                  </div>
                </div>

                {/* 4 Status Metric Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">{t.statHours}</span>
                    <span className="text-base font-extrabold text-white font-mono">14 / 20 hrs</span>
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
                      <div className="bg-sky-500 h-full w-[70%] rounded-full" />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">{t.statTheory}</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t.passed}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">{t.statStatus}</span>
                    <span className="text-xs font-bold text-sky-300 block mt-1">
                      {t.permitActive}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">{t.statTrial}</span>
                    <span className="text-xs font-bold text-amber-400 block mt-1">
                      {t.trialDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Lesson Appointment */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider block mb-0.5">
                    {t.nextLessonTitle}
                  </span>
                  <p className="font-bold text-white text-xs sm:text-sm">
                    {t.nextLessonDetails}
                  </p>
                  <p className="text-slate-400 mt-0.5 text-[11px]">
                    {t.instructorLabel}: <span className="text-slate-200 font-semibold">{t.instructorName}</span>
                  </p>
                </div>

                <a
                  href="https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20am%20student%20Kasun%20Jayawardena%20(WN-2026-881).%20I%20would%20like%20to%20reschedule%20my%20lesson."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold border border-sky-800/40 text-center transition-all cursor-pointer"
                >
                  {t.bookSlotBtn}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-400 text-center sm:text-left text-[11px] sm:text-xs">
            {t.helpNotice}
          </p>
          <a
            href="https://wa.me/94707076029?text=Hello%20Wenasa%20Student%20Desk,%20I%20need%20help%20with%20my%20training%20portal."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.whatsappBtn}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
