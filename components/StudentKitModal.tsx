"use client";

import { useEffect } from "react";
import { Locale } from "@/src/config/i18n";
import { 
  X, 
  ShoppingBag, 
  Package, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  MessageCircle,
  Truck,
  MapPin
} from "lucide-react";

interface StudentKitModalProps {
  locale: Locale;
  onClose: () => void;
}

const shopData = {
  en: {
    badge: "Official DMT Study Accessories",
    title: "Learner Shop & Test-Day Starter Kits",
    subtitle: "DMT-compliant magnetic L-plates, official Highway Code manuals, and driver preparation kits available at our Kirindiwela branch.",
    pickupNotice: "Available for same-day counter collection at Kirindiwela Office or courier delivery across Gampaha District.",
    orderViaWhatsApp: "Order via WhatsApp",
    reserveBtn: "Reserve Item",
    items: [
      {
        id: "kit-1",
        title: "Official Magnetic DMT L-Plates (Front & Rear Pair)",
        badge: "DMT Compliant",
        price: "LKR 1,200",
        desc: "Heavy-duty UV-resistant magnetic sheets that adhere firmly to car body panels without scratching automotive paint. Regulation size red 'L' on pure white.",
        features: ["Regulation 15cm x 15cm size", "Weatherproof & high-speed tested", "Non-scratch magnetic back"],
      },
      {
        id: "kit-2",
        title: "Sri Lanka Highway Code & DMT Road Signs Handbook",
        badge: "Official Study Guide",
        price: "LKR 1,500",
        desc: "Comprehensive 140-page illustrated pocket handbook containing every official DMT road sign, road marking, and priority junction rule in Sinhala, English & Tamil.",
        features: ["All 21+ DMT signs categorized", "Priority junction visual puzzles", "Trilingual glossary & test tips"],
      },
      {
        id: "kit-3",
        title: "Driver Practice Logbook & Milestone Tracker",
        badge: "Instructor Approved",
        price: "LKR 800",
        desc: "Structured workbook to log behind-the-wheel hours, night driving sessions, and instructor signatures leading up to your practical trial.",
        features: ["Hour log with supervisor sign-offs", "Trial-readiness skills rubric", "Emergency contact pocket page"],
      },
      {
        id: "kit-4",
        title: "Complete Learner Safety Pack (All-in-One Bundle)",
        badge: "Best Value · Save 20%",
        price: "LKR 3,200",
        desc: "Complete bundle containing: Pair of Magnetic L-Plates, Highway Code Handbook, Driver Practice Logbook, and 2x wide-angle blind spot mirrors.",
        features: ["Includes all essential gear", "Bonus blind spot convex mirrors", "Special bundled discount"],
      },
    ],
  },
  si: {
    badge: "නිල DMT අධ්‍යයන උපාංග",
    title: "ශිෂ්‍ය අත්වැල සහ විභාග පුහුණු උපකරණ",
    subtitle: "DMT නියෝගවලට අනුකූල චුම්භක L-තහඩු, නිල මාර්ග නීති අත්පොත් සහ ආරක්ෂිත රියැදුරු කට්ටල කිරිඳිවැල ප්‍රධාන කාර්යාලයෙන් ලබාගන්න.",
    pickupNotice: "කිරිඳිවැල ප්‍රධාන කාර්යාලයෙන් එදිනම ලබාගත හැක. ගම්පහ දිස්ත්‍රික්කය පුරා කුරියර් පහසුකම් ද සපයනු ලැබේ.",
    orderViaWhatsApp: "WhatsApp මගින් ඇණවුම් කරන්න",
    reserveBtn: "වෙන්කරවා ගන්න",
    items: [
      {
        id: "kit-1",
        title: "නිල චුම්භක DMT L-තහඩු (ඉදිරිපස සහ පසුපස යුගලය)",
        badge: "DMT නීත්‍යානුකූලයි",
        price: "රු. 1,200",
        desc: "වාහනයේ තීන්ත සීරීමට ලක්නොවන, වැස්සට සහ අධික වේගයට ඔරොත්තු දෙන ශක්තිමත් චුම්භක L-තහඩු යුගලයක්.",
        features: ["නියමිත ප්‍රමාණය (15cm x 15cm)", "තීන්ත ආරක්ෂිත චුම්භක පිටුපස", "කල්පවතින වර්ණ මුද්‍රණය"],
      },
      {
        id: "kit-2",
        title: "ශ්‍රී ලංකා මාර්ග නීති සංග්‍රහය සහ සංඥා අත්පොත",
        badge: "පූර්ණ අධ්‍යයන අත්පොත",
        price: "රු. 1,500",
        desc: "ශ්‍රී ලංකා DMT විභාගයට අදාළ සියලුම මාර්ග සංඥා, මාර්ග සලකුණු සහ ප්‍රමුඛතා නීති ඇතුළත් පිටු 140 ක පූර්ණ වර්ණ අත්පොත.",
        features: ["නිල සංඥා සියල්ල විස්තර සහිතව", "හන්දියක ප්‍රමුඛතා රීති", "සිංහල, ඉංග්‍රීසි හා දෙමළ අන්තර්ගතය"],
      },
      {
        id: "kit-3",
        title: "රියැදුරු පුහුණු වාර්තා පොත (Practice Logbook)",
        badge: "උපදේශක නිර්දේශිතයි",
        price: "රු. 800",
        desc: "පුහුණු වූ පැය ගණන, රාත්‍රී ධාවන සැසි සහ උපදේශක අත්සන් නිසි පරිදි සටහන් කර තබාගැනීමට වෙන්වූ අත්පොත.",
        features: ["පැය ගණන් සටහන් කිරීමේ පිටු", "ට්‍රයල් සුදානම්තා පිරික්සුම", "හදිසි සම්බන්ධතා සටහන"],
      },
      {
        id: "kit-4",
        title: "සම්පූර්ණ ශිෂ්‍ය ආරක්ෂක කට්ටලය (All-in-One)",
        badge: "20%ක විශේෂ වට්ටමක්",
        price: "රු. 3,200",
        desc: "L-තහඩු යුගල, මාර්ග නීති අත්පොත, පුහුණු වාර්තා පොත සහ අමතර Blind-Spot දර්පණ 2ක් ඇතුළත් සම්පූර්ණ කට්ටලය.",
        features: ["අවශ්‍ය සියලුම උපාංග එකවර", "Blind-Spot කණ්ණාඩි 2ක් නොමිලේ", "විශේෂ පැකේජ මිල අඩුකිරීම"],
      },
    ],
  },
  ta: {
    badge: "DMT கற்றல் உபகரணங்கள்",
    title: "மாணவர் அங்காடி மற்றும் பரீட்சை உபகரணங்கள்",
    subtitle: "DMT அங்கீகரிக்கப்பட்ட காந்த L-அட்டைகள், வீதி விதிமுறை புத்தகங்கள் மற்றும் பாதுகாப்பு உபகரணங்கள்.",
    pickupNotice: "கிரிந்திவெல அலுவலகத்தில் நேரடியாகப் பெறலாம் அல்லது கூரியர் மூலம் பெற்றுக்கொள்ளலாம்.",
    orderViaWhatsApp: "WhatsApp மூலம் ஆர்டர் செய்க",
    reserveBtn: "முன்பதிவு செய்க",
    items: [
      {
        id: "kit-1",
        title: "உத்தியோகபூர்வ காந்த L-அட்டைகள் (முன் மற்றும் பின்)",
        badge: "DMT அங்கீகாரம்",
        price: "ரூபா 1,200",
        desc: "வாகனத்தின் பெயிண்ட் பாதிக்கப்படாத வகையில் வலுவான காந்தத்தால் அமைக்கப்பட்ட L-அட்டை ஜோடி.",
        features: ["சட்டபூர்வ அளவு (15cm x 15cm)", "வானிலைக்கு உகந்தது", "கீறல்கள் ஏற்படாத காந்தம்"],
      },
      {
        id: "kit-2",
        title: "இலங்கை வீதி விதிமுறைகள் மற்றும் சைகைகள் கையேடு",
        badge: "முழுமையான கையேடு",
        price: "ரூபா 1,500",
        desc: "DMT பரீட்சைக்கான அனைத்து வீதி சைகைகள் மற்றும் விதிமுறைகள் அடங்கிய 140 பக்க வண்ண கையேடு.",
        features: ["அனைத்து சைகைகளும் விளக்கங்களுடன்", "முன்னுரிமை விதிகள்", "மும்மொழி உள்ளடக்கம்"],
      },
      {
        id: "kit-3",
        title: "பயிற்சி பதிவுப் புத்தகம் (Practice Logbook)",
        badge: "பரிந்துரைக்கப்பட்டது",
        price: "ரூபா 800",
        desc: "பயிற்சி மணிநேரங்கள் மற்றும் பயிற்றுவிப்பாளர் கையொப்பங்களை பதிவு செய்வதற்கான புத்தகம்.",
        features: ["மணிநேர பதிவு அட்டவணை", "பரீட்சை தயார்நிலை பட்டியல்", "அவசர தொடர்பு பக்கம்"],
      },
      {
        id: "kit-4",
        title: "முழுமையான மாணவர் பாதுகாப்பு தொகுப்பு",
        badge: "20% தள்ளுபடி",
        price: "ரூபா 3,200",
        desc: "L-அட்டைகள், கையேடு, பதிவு புத்தகம் மற்றும் கண்ணாடிகள் அடங்கிய முழுமையான தொகுப்பு.",
        features: ["அனைத்து அத்தியாவசிய உபகரணங்கள்", "Blind Spot கண்ணாடிகள்", "சிறப்பு தள்ளுபடி"],
      },
    ],
  },
};

export function StudentKitModal({ locale, onClose }: StudentKitModalProps) {
  const t = shopData[locale] || shopData.en;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0d0c0a]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#141310] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0d0c0a] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fcc438]/10 border border-[#fcc438]/30 text-[#fcc438] text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-[#fcc438]" />
              <span>{t.badge}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#f5f2eb] tracking-tight">
              {t.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#78756c] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="p-4 rounded-2xl bg-[#1c1a17] border border-white/10 flex items-center gap-3 text-xs text-[#d0c5ab]">
            <Truck className="w-5 h-5 text-[#fcc438] shrink-0" />
            <p>{t.pickupNotice}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.items.map((item) => (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-[#0d0c0a] border border-white/10 hover:border-[#fcc438]/50 flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#d0c5ab]">
                      {item.badge}
                    </span>
                    <span className="text-sm font-black text-[#fcc438] font-mono">
                      {item.price}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-[#f5f2eb] group-hover:text-[#fcc438] transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#a39e93] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-3.5 space-y-1.5 border-t border-white/10 pt-3">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-[#a39e93]">
                        <Check className="w-3.5 h-3.5 text-[#fcc438] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#78756c] font-mono">Kirindiwela Stock</span>
                  <a
                    href={`https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20would%20like%20to%20reserve%20item:%20${encodeURIComponent(item.title)}%20(${item.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d0c5ab] hover:bg-[#e4dcce] text-[#0d0c0a] font-mono font-bold text-xs cursor-pointer transition-all active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.reserveBtn}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#0d0c0a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#78756c] text-xs font-mono">
            <MapPin className="w-4 h-4 text-[#d0c5ab] shrink-0" />
            <span>No. 12/5, Hanwella-Kirindiwela-Urapola Rd, Kirindiwela</span>
          </div>
          <a
            href="https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20have%20an%20inquiry%20about%20the%20Learner%20Shop%20items."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#0d0c0a] font-mono font-bold uppercase tracking-wider cursor-pointer transition-all active:scale-95 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.orderViaWhatsApp}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
