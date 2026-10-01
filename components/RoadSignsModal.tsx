"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { X, Search, ShieldAlert, AlertTriangle, Info } from "lucide-react";

interface RoadSignsModalProps {
  locale: Locale;
  onClose: () => void;
}

interface RoadSign {
  id: string;
  category: "REGULATORY" | "WARNING" | "INFORMATION";
  name: { en: string; si: string; ta: string };
  meaning: { en: string; si: string; ta: string };
  signType: string;
}

const ROAD_SIGNS_DATA: RoadSign[] = [
  {
    id: "sign-stop",
    category: "REGULATORY",
    name: { en: "Stop Sign", si: "නවතින්න සංඥාව", ta: "நிறுத்து அடையாளம்" },
    meaning: {
      en: "Drivers must come to a complete standstill before the stop line and give right of way to all conflicting traffic.",
      si: "නැවතුම් ඉරට පෙර වාහනය සම්පූර්ණයෙන්ම නවත්වා ප්‍රධාන මාර්ගයේ සියලුම වාහනවලට ප්‍රමුඛතාවය දිය යුතුය.",
      ta: "நிறுத்தக் கோட்டிற்கு முன் முற்றிலும் நிறுத்தி பிற வாகனங்களுக்கு முன்னுரிமை அளிக்க வேண்டும்.",
    },
    signType: "STOP",
  },
  {
    id: "sign-give-way",
    category: "REGULATORY",
    name: { en: "Give Way", si: "ප්‍රමුඛතාවය දෙන්න", ta: "முன்னுரிமை அளிக்கவும்" },
    meaning: {
      en: "Yield right of way to vehicles on the major road you are joining or crossing.",
      si: "ඔබ ඇතුළු වන ප්‍රධාන මාර්ගයේ ගමන් කරන වාහනවලට ප්‍රමුඛතාවය ලබාදී ආරක්ෂිතව ඇතුළු වන්න.",
      ta: "முதன்மை வீதியில் செல்லும் வாகனங்களுக்கு முன்னுரிமை வழங்க வேண்டும்.",
    },
    signType: "GIVE_WAY",
  },
  {
    id: "sign-no-entry",
    category: "REGULATORY",
    name: { en: "No Entry", si: "ඇතුළුවීම තහනම්", ta: "உள்நுழைய தடை" },
    meaning: {
      en: "Entry strictly forbidden for all vehicles from this direction.",
      si: "මෙම දිශාවෙන් සියලුම වාහනවලට ඇතුළුවීම සම්පූර්ණයෙන්ම තහනම් වේ.",
      ta: "அனைத்து வாகனங்களும் இந்த திசையிலிருந்து நுழைய தடை செய்யப்பட்டுள்ளது.",
    },
    signType: "NO_ENTRY",
  },
  {
    id: "sign-speed-50",
    category: "REGULATORY",
    name: { en: "Maximum Speed Limit 50 km/h", si: "උපරිම වේග සීමාව පැයට කි.මී. 50", ta: "அதிகபட்ச வேகம் 50 கி.மீ." },
    meaning: {
      en: "Mandatory maximum legal speed within this sector is 50 kilometers per hour.",
      si: "මෙම මාර්ග කොටසේ ධාවනය කළ හැකි උපරිම වේගය පැයට කිලෝමීටර් 50කි.",
      ta: "அனுமதிக்கப்பட்ட அதிகபட்ச வேகம் மணிக்கு 50 கிலோமீட்டர்.",
    },
    signType: "SPEED_50",
  },
  {
    id: "sign-no-overtaking",
    category: "REGULATORY",
    name: { en: "No Overtaking", si: "ඉස්සර කිරීම තහනම්", ta: "முந்த தடை" },
    meaning: {
      en: "Drivers must not overtake or pass other four-wheeled motor vehicles in this zone.",
      si: "මෙම කලාපය තුළ වෙනත් කිසිදු වාහනයක් ඉස්සර කිරීම තහනම් වේ.",
      ta: "இந்த பகுதியில் பிற வாகனங்களை முந்திச் செல்லக்கூடாது.",
    },
    signType: "NO_OVERTAKING",
  },
  {
    id: "sign-pedestrian-crossing",
    category: "WARNING",
    name: { en: "Pedestrian Crossing Ahead", si: "ඉදිරියෙන් පදික මාරුවක්", ta: "முன்னால் பாதசாரி கடவை" },
    meaning: {
      en: "Warns of a designated zebra pedestrian crossing ahead; prepare to slow down and stop.",
      si: "ඉදිරියෙන් පදික මාරුවක් ඇති බැවින් වේගය අඩු කර නතර කිරීමට සූදානම් වන්න.",
      ta: "முன்னால் பாதசாரி கடவை உள்ளது, வேகத்தைக் குறைத்து நிறுத்த தயாராகுங்கள்.",
    },
    signType: "PED_CROSSING",
  },
  {
    id: "sign-roundabout",
    category: "WARNING",
    name: { en: "Roundabout Ahead", si: "ඉදිරියෙන් රවුම්මංසලක්", ta: "முன்னால் வட்டவடிவ சந்தி" },
    meaning: {
      en: "Traffic circle ahead; prepare to yield to circulating vehicles from your right.",
      si: "ඉදිරියෙන් රවුම්මංසලක් ඇති බැවින් දකුණෙන් එන වාහනවලට ප්‍රමුඛතාවය දීමට සූදානම් වන්න.",
      ta: "முன்னால் வட்டவடிவ சந்தி உள்ளது, வலதுபுற வாகனங்களுக்கு முன்னுரிமை அளிக்க தயாராகுங்கள்.",
    },
    signType: "ROUNDABOUT",
  },
  {
    id: "sign-hospital",
    category: "INFORMATION",
    name: { en: "Hospital Zone", si: "රෝහල් කලාපය", ta: "வைத்தியசாலை பகுதி" },
    meaning: {
      en: "Medical facility nearby; strictly avoid unnecessary horn sounding.",
      si: "ආසන්නයේ රෝහලක් ඇති බැවින් නලා ශබ්ද කිරීමෙන් වළකින්න.",
      ta: "அருகில் மருத்துவமனை உள்ளது, தேவையின்றி ஒலி எழுப்ப வேண்டாம்.",
    },
    signType: "HOSPITAL",
  },
];

function RenderSignGraphic({ type }: { type: string }) {
  switch (type) {
    case "STOP":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" stroke="#ffffff" strokeWidth="4" />
          <text x="50" y="58" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">STOP</text>
        </svg>
      );
    case "GIVE_WAY":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <polygon points="50,90 10,15 90,15" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
        </svg>
      );
    case "NO_ENTRY":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <circle cx="50" cy="50" r="45" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
          <rect x="18" y="42" width="64" height="16" fill="#ffffff" rx="2" />
        </svg>
      );
    case "SPEED_50":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <text x="50" y="62" fill="#0f172a" fontSize="36" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">50</text>
        </svg>
      );
    case "NO_OVERTAKING":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <rect x="25" y="42" width="22" height="16" rx="3" fill="#dc2626" />
          <rect x="53" y="42" width="22" height="16" rx="3" fill="#0f172a" />
        </svg>
      );
    case "PED_CROSSING":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <polygon points="50,10 90,85 10,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          {/* Walking figure & stripes */}
          <line x1="28" y1="74" x2="72" y2="74" stroke="#0f172a" strokeWidth="4" />
          <circle cx="48" cy="38" r="5" fill="#0f172a" />
          <path d="M 44 45 L 52 45 L 56 60 L 48 68" stroke="#0f172a" strokeWidth="4" fill="none" />
        </svg>
      );
    case "ROUNDABOUT":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <polygon points="50,10 90,85 10,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <circle cx="50" cy="58" r="14" fill="none" stroke="#0f172a" strokeWidth="4" strokeDasharray="18 8" />
        </svg>
      );
    case "HOSPITAL":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#1e40af" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="65" fill="#ffffff" fontSize="48" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">H</text>
        </svg>
      );
    default:
      return (
        <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-700">
          SIGN
        </div>
      );
  }
}

export function RoadSignsModal({ locale, onClose }: RoadSignsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "REGULATORY" | "WARNING" | "INFORMATION">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSigns = ROAD_SIGNS_DATA.filter((s) => {
    const matchesCat = selectedCategory === "ALL" || s.category === selectedCategory;
    const matchesSearch =
      s.name[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.meaning[locale].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase">
              <span>Sri Lankan Road Safety Standards</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-white">
              {locale === "si" ? "මාර්ග සංඥා නාමාවලිය" : locale === "ta" ? "வீதி அடையாளங்கள் அடைவு" : "Sri Lanka Road Signs Directory"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-3">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === "ALL"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              All Signs
            </button>
            <button
              onClick={() => setSelectedCategory("REGULATORY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                selectedCategory === "REGULATORY"
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Regulatory</span>
            </button>
            <button
              onClick={() => setSelectedCategory("WARNING")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                selectedCategory === "WARNING"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Warning</span>
            </button>
            <button
              onClick={() => setSelectedCategory("INFORMATION")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                selectedCategory === "INFORMATION"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Information</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search sign name or meaning..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Signs Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSigns.map((sign) => (
              <div
                key={sign.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-start gap-4"
              >
                <RenderSignGraphic type={sign.signType} />
                <div className="flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {sign.category}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {sign.name[locale]}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sign.meaning[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Source: Official DMT Road Traffic (Signs and Signals) Regulations</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
