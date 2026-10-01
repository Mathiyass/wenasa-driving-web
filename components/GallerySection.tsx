"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { X, ZoomIn, Car, MapPin, BookOpen, Award } from "lucide-react";

interface GallerySectionProps {
  locale: Locale;
}

interface GalleryItem {
  id: string;
  category: "FLEET" | "GROUND" | "CLASSROOM" | "TRIALS";
  title: { en: string; si: string; ta: string };
  caption: { en: string; si: string; ta: string };
  aspect: string;
  icon: React.ElementType;
  bgGradient: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    category: "FLEET",
    title: {
      en: "Dual-Control Suzuki Training Fleet",
      si: "ද්විත්ව පාලක සුසුකි පුහුණු රථ පෙළ",
      ta: "இரட்டை கட்டுப்பாட்டு சுஸுகி வாகனங்கள்",
    },
    caption: {
      en: "Regularly inspected manual & automatic vehicles fitted with certified secondary instructor controls.",
      si: "උපදේශක පාලක පද්ධති සහිත පූර්ණ ආරක්ෂිත මැනුවල් හා ඔටෝ පුහුණු රථ.",
      ta: "பயிற்றுவிப்பாளர் கட்டுப்பாடுகளுடன் கூடிய பாதுகாப்பான வாகனங்கள்.",
    },
    aspect: "aspect-video",
    icon: Car,
    bgGradient: "from-emerald-900 to-slate-900",
  },
  {
    id: "gal-2",
    category: "GROUND",
    title: {
      en: "Kirindiwela Practice Track & Reverse Bays",
      si: "කිරිඳිවැල පුහුණු ධාවන පථය සහ රිවර්ස් ධාවනය",
      ta: "கிரிந்திவெல பயிற்சி மைதானம்",
    },
    caption: {
      en: "Exact DMT-dimensioned reversing, parking bays, and slalom obstacle courses on asphalt.",
      si: "DMT නිල ප්‍රමිතීන්ට අනුව සකස් කළ රිවර්ස් සහ සමාන්තර පාක් කිරීමේ විශේෂ පුහුණු භූමිය.",
      ta: "DMT தரநிலைகளுக்கு ஏற்ப அமைக்கப்பட்ட பயிற்சி மைதானம்.",
    },
    aspect: "aspect-video",
    icon: MapPin,
    bgGradient: "from-slate-800 to-emerald-950",
  },
  {
    id: "gal-3",
    category: "CLASSROOM",
    title: {
      en: "Interactive Theory & Road Signs Classroom",
      si: "න්‍යායාත්මක හා මාර්ග සංඥා දේශන ශාලාව",
      ta: "கோட்பாட்டு வகுப்பறை",
    },
    caption: {
      en: "Equipped with projection displays, mechanical models, and multilingual exam prep kits.",
      si: "මාර්ග සංඥා සහ විභාග ප්‍රශ්න පත්‍ර සාකච්ඡා කෙරෙන සුවපහසු දේශන ශාලාව.",
      ta: "நவீன வகுப்பறை வசதிகள் மற்றும் மாதிரி வினாத்தாள் பயிற்சிகள்.",
    },
    aspect: "aspect-video",
    icon: BookOpen,
    bgGradient: "from-blue-900 to-slate-900",
  },
  {
    id: "gal-4",
    category: "TRIALS",
    title: {
      en: "DMT Trial Day Pre-Test Briefing",
      si: "DMT ට්‍රයල් විභාග දින පූර්ව දැනුවත් කිරීම",
      ta: "DMT சோதனை நாள் வழிகாட்டல்",
    },
    caption: {
      en: "Instructors accompany students to the official DMT testing ground for on-site warm-up and support.",
      si: "ට්‍රයල් දිනයේදී උපදේශකවරුන් පෞද්ගලිකවම විභාග භූමියට පැමිණ සිසුන් දිරිගන්වයි.",
      ta: "பயிற்றுவிப்பாளர்கள் மாணவர்களுடன் சோதனை மைதானத்திற்கு வருகை தந்து உற்சாகப்படுத்துகிறார்கள்.",
    },
    aspect: "aspect-video",
    icon: Award,
    bgGradient: "from-amber-950 to-slate-900",
  },
];

export function GallerySection({ locale }: GallerySectionProps) {
  const dict = getDictionary(locale);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "FLEET" | "GROUND" | "CLASSROOM" | "TRIALS">("ALL");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === "ALL") return true;
    return item.category === selectedFilter;
  });

  return (
    <>
      <section id="gallery" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              {dict.gallery.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
              {dict.gallery.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {dict.gallery.subtitle}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10">
            {[
              { id: "ALL", label: dict.common.filterAll },
              { id: "FLEET", label: "Fleet & Cars" },
              { id: "GROUND", label: "Practice Track" },
              { id: "CLASSROOM", label: "Classroom" },
              { id: "TRIALS", label: "Practical Trials" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer aspect-video bg-gradient-to-br flex flex-col justify-end p-6"
                >
                  {/* Background graphic container adhering to Zero Broken Images Policy */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-90 transition-transform duration-500 group-hover:scale-105`} />
                  
                  {/* Subtle Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Top Category Badge & Zoom Indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Centered Thematic Watermark Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <Icon className="w-28 h-28 text-white" />
                  </div>

                  {/* Foreground Content with Scrim */}
                  <div className="relative z-10 text-white">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title[locale]}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                      {item.caption[locale]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl overflow-hidden">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${lightboxItem.bgGradient} flex items-center justify-center mb-6 relative overflow-hidden`}>
              <lightboxItem.icon className="w-24 h-24 text-white/40" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              {lightboxItem.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {lightboxItem.title[locale]}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {lightboxItem.caption[locale]}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
