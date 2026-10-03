"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { X, Sparkles, Check, ArrowRight, RotateCcw, Car, Bike, Layers, Gauge, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PackageFinderModalProps {
  locale: Locale;
  onClose: () => void;
}

const content = {
  en: {
    modalTitle: "Smart Package Finder",
    modalSubtitle: "Find the exact driving course customized to your goals and experience level",
    step1Title: "1. Which vehicle would you like to get a licence for?",
    step2Title: "2. What is your current driving experience?",
    step3Title: "3. Preferred transmission type for cars?",
    vehicleOptions: {
      car: { label: "Car Only", desc: "Dual-control Suzuki Alto / WagonR" },
      combo: { label: "Car + Bike Combo", desc: "Best value, dual DMT licence" },
      bike: { label: "Bike / Scooter", desc: "125cc-160cc manual & automatic" },
    },
    experienceOptions: {
      beginner: { label: "Absolute Beginner", desc: "Never driven before, start from zero" },
      some: { label: "Some Experience", desc: "Know the basics, need test polish" },
    },
    transmissionOptions: {
      manual: { label: "Manual (Clutch & Gear)", desc: "Full licence for all cars" },
      auto: { label: "Automatic (Easy Drive)", desc: "Smooth, stress-free urban driving" },
    },
    results: {
      bike: {
        title: "Class A / A1 Motorcycle & Scooter Course",
        classCode: "A",
        badge: "DMT Class A / A1",
        description: "Specialized training focusing on balance, figure-of-8 track mastery at Kirindiwela ground, emergency braking, and safe defensive riding in traffic.",
        price: "Rs. 14,500",
        duration: "Flexible practical sessions · Test bike included",
      },
      combo: {
        title: "Dual Combo: Car (Manual) + Motorcycle",
        classCode: "BA",
        badge: "DMT Class B + A (Best Value)",
        description: "Our #1 most recommended course. Covers full car road control, reverse parking, and motorcycle figure-8 test preparation. Save time and money with combined medical and DMT submissions.",
        price: "Rs. 32,500",
        duration: "Comprehensive car & bike curriculum · Dual trial",
      },
      auto: {
        title: "Class B Car - Automatic Transmission",
        classCode: "B",
        badge: "DMT Class B (Auto)",
        description: "Ideal for easy daily commuting without the stress of clutch balancing or stalling in traffic. Master defensive driving, reverse parking, and Kirindiwela test routes.",
        price: "Rs. 24,000",
        duration: "Full on-road practicals · Official DMT trial car",
      },
      manual: {
        title: "Class B Car - Manual Transmission",
        classCode: "B",
        badge: "DMT Class B (Manual)",
        description: "The gold standard for complete driving freedom. Master clutch bite points, gradient hill starts, reverse box parking, and earn an unrestricted car licence.",
        price: "Rs. 24,000",
        duration: "Full on-road practicals · Official DMT trial car",
      },
    },
    calculateBtn: "Discover My Recommended Course",
    recommendedBadge: "Your Recommended Pathway",
    enrollBtn: "Enroll in this Course",
    resetBtn: "Retake Quiz",
    closeBtn: "Close",
  },
  si: {
    modalTitle: "සුදුසුම පාඨමාලා තේරීම් ප්‍රශ්නාවලිය",
    modalSubtitle: "ඔබගේ අවශ්‍යතාවය සහ පළපුරුද්දට වඩාත්ම ගැලපෙන පාඨමාලාව තත්පර කිහිපයකින් තෝරාගන්න",
    step1Title: "1. ඔබ රියදුරු බලපත්‍රය ලබා ගැනීමට බලාපොරොත්තු වන්නේ කුමන වාහනයක් සඳහාද?",
    step2Title: "2. ඔබගේ වත්මන් රියදුරු පළපුරුද්ද කෙබඳුද?",
    step3Title: "3. මෝටර් රථ සඳහා ඔබ වඩාත් කැමති ගියර් ක්‍රමය කුමක්ද?",
    vehicleOptions: {
      car: { label: "මෝටර් රථ පමණි", desc: "ද්විත්ව පාලක Suzuki Alto / WagonR" },
      combo: { label: "කාර් + බයික් ද්විත්ව පැකේජය", desc: "වඩාත් ලාභදායී, බලපත්‍ර 2ක් එකවර" },
      bike: { label: "යතුරුපැදි / ස්කූටර්", desc: "125cc-160cc ගියර් සහ ඔටෝ" },
    },
    experienceOptions: {
      beginner: { label: "ආධුනිකයෙක් (මුල සිට)", desc: "පෙර පුහුණුවක් නොමැත, මුල සිටම ඉගෙනීම" },
      some: { label: "සුළු පළපුරුද්දක් ඇත", desc: "මූලික දැනුම ඇත, විභාග පුහුණුව අවශ්‍යයි" },
    },
    transmissionOptions: {
      manual: { label: "Manual (ක්ලච් සහ ගියර්)", desc: "සියලුම කාර් සඳහා වලංගු පූර්ණ බලපත්‍රය" },
      auto: { label: "Automatic (ස්වයංක්‍රීය)", desc: "පහසු, ක්ලච් රහිත සුවපහසු රිය පැදවීම" },
    },
    results: {
      bike: {
        title: "Class A / A1 යතුරුපැදි සහ ස්කූටර් පාඨමාලාව",
        classCode: "A",
        badge: "DMT Class A / A1",
        description: "කිරිඳිවැල පුහුණු ධාවන පථයේදී 8 හැඩය කැපීම, සමබරතාවය, හදිසි තිරිංග යෙදීම සහ නගර මාර්ග ආරක්ෂක ධාවනය ප්‍රගුණ කරවන විශේෂිත පාඨමාලාවකි.",
        price: "රු. 14,500",
        duration: "ප්‍රායෝගික පුහුණු සැසි · විභාග රථය ඇතුළත්ය",
      },
      combo: {
        title: "ද්විත්ව පැකේජය: කාර් (Manual) + යතුරුපැදි",
        classCode: "BA",
        badge: "DMT Class B + A (වඩාත්ම ජනප්‍රිය)",
        description: "අපගේ අංක 1 නිර්දේශිත පාඨමාලාව. කාර් සහ යතුරුපැදි දෙකම එකවර ප්‍රගුණ කර මුදල් සහ කාලය ඉතිරි කරගන්න. එකම වෛද්‍ය පරීක්ෂණයකින් කාණ්ඩ 2ම සම්පූර්ණ කළ හැක.",
        price: "රු. 32,500",
        duration: "පූර්ණ කාර් සහ බයික් පුහුණු මාලාව",
      },
      auto: {
        title: "Class B මෝටර් රථ - Automatic Transmission",
        classCode: "B",
        badge: "DMT Class B (Auto)",
        description: "ක්ලච් පාලනය හෝ වාහනය නැවතීමේ බියෙන් තොරව, පහසුවෙන් රියදුරු කලාව ප්‍රගුණ කිරීමට කැමති අයට කදිමයි. කිරිඳිවැල විභාග මාර්ග පුහුණුවද ඇතුළත්ය.",
        price: "රු. 24,000",
        duration: "සම්පූර්ණ ප්‍රායෝගික පුහුණුව හා විභාග මඟපෙන්වීම",
      },
      manual: {
        title: "Class B මෝටර් රථ - Manual Transmission",
        classCode: "B",
        badge: "DMT Class B (Manual)",
        description: "සැබෑ රියදුරු නිපුණතාවය සඳහා රන් ප්‍රමිතිය. ක්ලච් බයිට් පොයින්ට්, කඳු බෑවුම්වල වාහනය පාලනය සහ රිවර්ස් පාකිං නිවැරදිව ප්‍රගුණ කර පූර්ණ බලපත්‍රයක් හිමිකරගන්න.",
        price: "රු. 24,000",
        duration: "සම්පූර්ණ ප්‍රායෝගික පුහුණුව හා විභාග මඟපෙන්වීම",
      },
    },
    calculateBtn: "සුදුසුම පාඨමාලාව පෙන්වන්න",
    recommendedBadge: "ඔබට වඩාත් ගැළපෙන පාඨමාලාව",
    enrollBtn: "මෙම පාඨමාලාවට ලියාපදිංචි වන්න",
    resetBtn: "නැවත තෝරන්න",
    closeBtn: "වසන්න",
  },
  ta: {
    modalTitle: "பொருத்தமான பயிற்சிநெறி தெரிவு",
    modalSubtitle: "உங்கள் இலக்கு மற்றும் அனுபவத்திற்கு ஏற்ற சிறந்த பயிற்சிநெறியை சில வினாடிகளில் கண்டறியுங்கள்",
    step1Title: "1. எந்த வாகனத்திற்கான சாரதி அனுமதிப்பத்திரத்தைப் பெற விரும்புகிறீர்கள்?",
    step2Title: "2. உங்கள் தற்போதைய சாரதி அனுபவம் எத்தகையது?",
    step3Title: "3. கார்களுக்கு நீங்கள் விரும்பும் டிரான்ஸ்மிஷன் எது?",
    vehicleOptions: {
      car: { label: "கார் மட்டும்", desc: "இரட்டை கட்டுப்பாட்டு Suzuki Alto / WagonR" },
      combo: { label: "கார் + மோட்டார் சைக்கிள்", desc: "அதிக மதிப்பு, ஒரே நேரத்தில் இரு உரிமங்கள்" },
      bike: { label: "மோட்டார் சைக்கிள் / ஸ்கூட்டர்", desc: "125cc-160cc மேனுவல் & ஆட்டோமேட்டிக்" },
    },
    experienceOptions: {
      beginner: { label: "ஆரம்பநிலை (முற்றிலும் புதியவர்)", desc: "முன் அனுபவம் இல்லை, புதிதாக தொடங்குபவர்" },
      some: { label: "சிறிது அனுபவம் உண்டு", desc: "அடிப்படை தெரியும், பரீட்சை பயிற்சி தேவை" },
    },
    transmissionOptions: {
      manual: { label: "Manual (கிளட்ச் & கியர்)", desc: "அனைத்து கார்களுக்கும் செல்லுபடியாகும் முழு அனுமதி" },
      auto: { label: "Automatic (தானியங்கி)", desc: "நகர நெரிசலில் எளிதான, மன அழுத்தமற்ற ஓட்டுதல்" },
    },
    results: {
      bike: {
        title: "Class A / A1 மோட்டார் சைக்கிள் & ஸ்கூட்டர் பயிற்சிநெறி",
        classCode: "A",
        badge: "DMT Class A / A1",
        description: "கிரிந்திவெல பயிற்சி மைதானத்தில் 8-வடிவ வளைவு, சமநிலை, அவசர பிரேக்கிங் மற்றும் பாதுகாப்பான வீதிப் பயணத்திற்கான சிறப்புப் பயிற்சி.",
        price: "ரூபா 14,500",
        duration: "செயன்முறைப் பயிற்சி · பரீட்சை வாகனம் உள்ளடக்கம்",
      },
      combo: {
        title: "இரட்டை சேர்க்கை: கார் (Manual) + மோட்டார் சைக்கிள்",
        classCode: "BA",
        badge: "DMT Class B + A (சிறந்த தெரிவு)",
        description: "எமது மிகவும் பரிந்துரைக்கப்பட்ட பயிற்சி. கார் வீதிக் கட்டுப்பாடு, ரிவர்ஸ் பார்க்கிங் மற்றும் பைக் 8-வடிவ பரீட்சைக்கான முழுமையான பயிற்சி. பணத்தையும் நேரத்தையும் மிச்சப்படுத்துங்கள்.",
        price: "ரூபா 32,500",
        duration: "முழுமையான கார் & பைக் பாடத்திட்டம் · இரட்டை பரீட்சை",
      },
      auto: {
        title: "Class B கார் - Automatic Transmission",
        classCode: "B",
        badge: "DMT Class B (Auto)",
        description: "கிளட்ச் அழுத்தம் அல்லது வாகனம் நிற்கும் பயமின்றி எளிதாகக் கற்றுக்கொள்ள விரும்புவோருக்கு ஏற்றது. கிரிந்திவெல பரீட்சை வீதிப் பயிற்சியும் உள்ளடங்கும்.",
        price: "ரூபா 24,000",
        duration: "முழுமையான வீதிப் பயிற்சி & பரீட்சை வழிகாட்டல்",
      },
      manual: {
        title: "Class B கார் - Manual Transmission",
        classCode: "B",
        badge: "DMT Class B (Manual)",
        description: "முழுமையான சாரதி தேர்ச்சிக்கான மிகச் சிறந்த தரம். கிளட்ச் சமநிலை, மேட்டுப்பாதைக் கட்டுப்பாடு, ரிவர்ஸ் பார்க்கிங் ஆகியவற்றைத் தேர்ச்சி பெற்று முழு உரிமத்தைப் பெறுங்கள்.",
        price: "ரூபா 24,000",
        duration: "முழுமையான வீதிப் பயிற்சி & பரீட்சை வழிகாட்டல்",
      },
    },
    calculateBtn: "பரிந்துரைக்கப்பட்ட பயிற்சியைக் காண்க",
    recommendedBadge: "உங்களுக்காக பரிந்துரைக்கப்பட்டது",
    enrollBtn: "இப்பயிற்சிக்கு பதிவு செய்க",
    resetBtn: "மீண்டும் தெரிவு செய்க",
    closeBtn: "மூடுக",
  },
};

export function PackageFinderModal({ locale, onClose }: PackageFinderModalProps) {
  const t = content[locale] || content.en;

  const [vehicleChoice, setVehicleChoice] = useState<"car" | "combo" | "bike">("combo");
  const [experienceChoice, setExperienceChoice] = useState<"beginner" | "some">("beginner");
  const [transmissionChoice, setTransmissionChoice] = useState<"manual" | "auto">("manual");
  const [hasCalculated, setHasCalculated] = useState(false);

  const getResult = () => {
    if (vehicleChoice === "bike") return t.results.bike;
    if (vehicleChoice === "combo") return t.results.combo;
    if (transmissionChoice === "auto") return t.results.auto;
    return t.results.manual;
  };

  const result = getResult();

  const handleEnroll = () => {
    // Notify ApplySection to select the corresponding vehicle category
    window.dispatchEvent(
      new CustomEvent("wenasa:select-class", {
        detail: result.classCode,
      })
    );
    onClose();
    // Smooth scroll to apply section
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {t.modalTitle}
              </h3>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t.modalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={t.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!hasCalculated ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Question 1: Vehicle */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                    {t.step1Title}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "combo", icon: Layers, data: t.vehicleOptions.combo, popular: true },
                      { id: "car", icon: Car, data: t.vehicleOptions.car, popular: false },
                      { id: "bike", icon: Bike, data: t.vehicleOptions.bike, popular: false },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = vehicleChoice === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setVehicleChoice(item.id as any)}
                          className={`relative p-3.5 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/50"
                              : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                          }`}
                        >
                          {item.popular && (
                            <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider">
                              Popular
                            </span>
                          )}
                          <div className="flex items-center gap-2 mb-1.5">
                            <Icon className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                            <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-300"}`}>
                              {item.data.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {item.data.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 2: Experience */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                    {t.step2Title}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: "beginner", data: t.experienceOptions.beginner },
                      { id: "some", data: t.experienceOptions.some },
                    ].map((item) => {
                      const isSelected = experienceChoice === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setExperienceChoice(item.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/50"
                              : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                          }`}
                        >
                          <div className={`text-xs font-bold mb-1 ${isSelected ? "text-white" : "text-slate-300"}`}>
                            {item.data.label}
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {item.data.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 3: Transmission (if not bike-only) */}
                {vehicleChoice !== "bike" && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                      {t.step3Title}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: "manual", data: t.transmissionOptions.manual },
                        { id: "auto", data: t.transmissionOptions.auto },
                      ].map((item) => {
                        const isSelected = transmissionChoice === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setTransmissionChoice(item.id as any)}
                            className={`p-3.5 rounded-2xl border text-left transition-all ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/50"
                                : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                            }`}
                          >
                            <div className={`text-xs font-bold mb-1 ${isSelected ? "text-white" : "text-slate-300"}`}>
                              {item.data.label}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              {item.data.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Calculate Trigger */}
                <button
                  type="button"
                  onClick={() => setHasCalculated(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/40 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>{t.calculateBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Result Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-500/40 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t.recommendedBadge}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono font-semibold">
                      {result.badge}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-xl font-bold text-white tracking-tight mb-2">
                    {result.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {result.description}
                  </p>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        {t.results.manual.duration ? "Estimated Plan" : "Plan"}
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">
                        {result.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Course Fee
                      </div>
                      <div className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                        {result.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setHasCalculated(false)}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.resetBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEnroll}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/40 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{t.enrollBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
