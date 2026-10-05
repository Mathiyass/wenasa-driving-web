"use client";

import { useState } from "react";
import Image from "next/image";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { X, ZoomIn, Sparkles } from "lucide-react";
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
    <section id="gallery" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Marcus Lorenzet Editorial Style */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
            <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
              [ 10 · FLEET & GROUNDS PORTFOLIO ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
            {dict.gallery.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
            {dict.gallery.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
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
                  ? "bg-[#d0c5ab] text-[#11100d] shadow-md"
                  : "bg-[#141310] border border-white/[0.08] text-[#c7c2b6] hover:border-white/20 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="group relative rounded-3xl overflow-hidden marcus-card cursor-pointer shadow-xl"
              onClick={() => setLightboxItem(item)}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0c0a]">
                <Image
                  src={item.imageSrc}
                  alt={item.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/40 to-transparent opacity-90" />

                {/* Top Tag & Number */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161513]/90 backdrop-blur-md border border-white/10 text-[#d0c5ab] text-xs font-bold shadow-md">
                    <Sparkles className="w-3 h-3 text-[#fcc438]" />
                    <span>{item.tag}</span>
                  </span>
                  <span className="text-xs font-mono text-[#a8a295] px-2 py-0.5 rounded-full bg-[#0d0c0a]/80 border border-white/[0.06]">
                    0{idx + 1}
                  </span>
                </div>

                {/* Zoom Icon Hover Cue */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#161513]/90 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#d0c5ab] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-[#fcc438]" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-base sm:text-xl font-black text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-1 text-xs text-[#c7c2b6] leading-relaxed line-clamp-2">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0c0a]/90 backdrop-blur-xl"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden marcus-card shadow-2xl"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#1c1a17] hover:bg-[#25231f] text-[#d0c5ab] hover:text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-[#0d0c0a]">
                <Image
                  src={lightboxItem.imageSrc}
                  alt={lightboxItem.title[locale]}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-[#141310] text-[#f5f5f3] border-t border-white/[0.06]">
                <div className="text-xs font-bold text-[#fcc438] uppercase tracking-wider mb-1">
                  {lightboxItem.tag}
                </div>
                <h3 className="text-lg font-black text-[#f5f5f3]">
                  {lightboxItem.title[locale]}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed">
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
