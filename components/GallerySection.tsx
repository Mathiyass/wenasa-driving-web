"use client";

import { useState } from "react";
import Image from "next/image";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { X, ZoomIn, Camera, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GallerySectionProps {
  locale: Locale;
}

interface GalleryItem {
  id: string;
  category: "FLEET" | "GROUND" | "CLASSROOM" | "TRIALS";
  title: { en: string; si: string; ta: string };
  caption: { en: string; si: string; ta: string };
  imageSrc: string;
  tag: string;
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
    imageSrc: "/images/gallery/fleet-dual-control.jpg",
    tag: "Dual-Control Fleet",
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
    imageSrc: "/images/gallery/kirindiwela-ground.jpg",
    tag: "Practice Ground",
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
    imageSrc: "/images/gallery/theory-classroom.jpg",
    tag: "Theory Lecture Hall",
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
    imageSrc: "/images/gallery/trial-day-briefing.jpg",
    tag: "Trial Day Support",
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
    <section id="gallery" className="py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3 shadow-xs">
            <span>{locale === "si" ? "පුහුණු පරිශ්‍රය" : locale === "ta" ? "படத்தொகுப்பு" : "Gallery"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
            {dict.gallery.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {dict.gallery.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { key: "ALL", label: dict.common.filterAll },
            { key: "FLEET", label: "Fleet" },
            { key: "GROUND", label: "Ground" },
            { key: "CLASSROOM", label: "Classroom" },
            { key: "TRIALS", label: "Trial Day" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === tab.key
                  ? "bg-emerald-600 text-white shadow-emerald-glow"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500 hover:text-white shadow-xs"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl hover:shadow-2xl cursor-pointer hover:border-emerald-500/50 transition-all"
              onClick={() => setLightboxItem(item)}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <Image
                  src={item.imageSrc}
                  alt={item.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85" />

                {/* Top Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-md">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{item.tag}</span>
                  </span>
                </div>

                {/* Zoom Icon Hover Cue */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.caption[locale]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-slate-950">
                <Image
                  src={lightboxItem.imageSrc}
                  alt={lightboxItem.title[locale]}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 text-white">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  {lightboxItem.tag}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {lightboxItem.title[locale]}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lightboxItem.caption[locale]}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
