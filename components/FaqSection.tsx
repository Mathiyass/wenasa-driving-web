"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  locale: Locale;
}

export interface FaqItem {
  id: string;
  q: { en: string; si: string; ta: string };
  a: { en: string; si: string; ta: string };
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    q: {
      en: "What is the minimum age to apply for a driving licence in Sri Lanka?",
      si: "ශ්‍රී ලංකාවේ රියැදුරු බලපත්‍රයක් සඳහා අයදුම් කළ හැකි අවම වයස් සීමාව කුමක්ද?",
      ta: "இலங்கையில் சாரதி அனுமதிப்பத்திரத்திற்கு விண்ணப்பிக்க குறைந்தபட்ச வயது என்ன?",
    },
    a: {
      en: "For Light Vehicles (Class B cars, Class A/A1 motorcycles, Class B1 three-wheelers), the minimum age is 18 years. For Commercial and Heavy Vehicles (Class C, C1, D), the statutory minimum age is 21 years with at least 2 years of prior Class B licence holding experience.",
      si: "සැහැල්ලු වාහන (B කාණ්ඩයේ කාර්, A/A1 යතුරුපැදි, B1 ත්‍රිරෝද රථ) සඳහා අවම වයස අවුරුදු 18කි. වාණිජ සහ බර වාහන (C, C1, D) සඳහා අවම වයස අවුරුදු 21ක් සහ වසර 2ක B කාණ්ඩයේ බලපත්‍රයක් තිබිය යුතුය.",
      ta: "இலகுரக வாகனங்களுக்கு (கார், பைக்) குறைந்தபட்ச வயது 18. கனரக வாகனங்களுக்கு 21 வயது.",
    },
  },
  {
    id: "faq-2",
    q: {
      en: "Where should I get my medical certificate (NTMI)?",
      si: "වෛද්‍ය සහතිකය ලබාගත යුත්තේ කොතැනින්ද?",
      ta: "மருத்துவச் சான்றிதழை எங்கிருந்து பெற வேண்டும்?",
    },
    a: {
      en: "Medical certificates must be obtained exclusively from the National Transport Medical Institute (NTMI). For residents of Kirindiwela, the nearest convenient NTMI centers are located in Nittambuwa and Gampaha. Wenasa assists you in booking the eChannelling slot.",
      si: "වෛද්‍ය සහතිකය ලබාගත යුත්තේ ජාතික ප්‍රවාහන වෛද්‍ය ආයතනයෙන් (NTMI) පමණි. කිරිඳිවැල ප්‍රදේශවාසීන්ට පහසුම මධ්‍යස්ථාන නිට්ටඹුව සහ ගම්පහ පිහිටා ඇත. වේලාවක් වෙන්කර ගැනීමට වෙනස කාර්ය මණ්ඩලය සහය ලබාදෙයි.",
      ta: "தேசிய போக்குவரத்து மருத்துவ நிறுவனத்தில் (NTMI) இருந்து மட்டுமே பெற வேண்டும்.",
    },
  },
  {
    id: "faq-3",
    q: {
      en: "What happens if I fail the DMT written test on my first attempt?",
      si: "පළමු උත්සාහයේදී ලිඛිත විභාගය අසමත් වුවහොත් කුමක් සිදුවේද?",
      ta: "முதல் முயற்சியில் எழுத்துத் தேர்வில் தோல்வியடைந்தால் என்ன நடக்கும்?",
    },
    a: {
      en: "You can re-apply to resit the DMT theory examination by paying the government resit stamp fee. Wenasa provides free additional theory review classes and past paper mock sessions until you pass with 100% confidence.",
      si: "නැවත රජයේ මුද්දර ගාස්තු ගෙවා විභාගයට පෙනී සිටිය හැක. ඔබ විභාගය සමත්වන තෙක් වෙනස රියැදුරු පාසල නොමිලේ අතිරේක න්‍යායාත්මක පන්ති සහ ආදර්ශ ප්‍රශ්න පත්‍ර පුහුණුව ලබාදෙයි.",
      ta: "மீண்டும் பரீட்சை கட்டணம் செலுத்தி எழுதலாம். வெனசா உங்களுக்கு கூடுதல் பயிற்சிகளை வழங்கும்.",
    },
  },
  {
    id: "faq-4",
    q: {
      en: "What is the difference between Manual (B) and Automatic (B-Auto) driving licences?",
      si: "මැනුවල් (Manual) සහ ඔටෝ (Auto) බලපත්‍ර අතර වෙනස කුමක්ද?",
      ta: "மானுவல் மற்றும் ஆட்டோ உரிமங்களுக்கு இடையிலான வேறுபாடு என்ன?",
    },
    a: {
      en: "Passing your practical test in a Manual transmission vehicle grants an unrestricted Class B licence permitting you to drive both manual and automatic cars. Passing in an Automatic vehicle limits your licence endorsement strictly to automatic transmission vehicles.",
      si: "මැනුවල් (Manual) රථයකින් ට්‍රයල් විභාගය සමත් වූ විට මැනුවල් මෙන්ම ඔටෝ රථද ධාවනය කිරීමට පූර්ණ අවසර ලැබේ. ඔටෝ (Automatic) රථයකින් සමත් වූ විට ධාවනය කළ හැක්කේ ඔටෝ රථ පමණි.",
      ta: "மானுவல் தேர்வில் தேர்ச்சி பெற்றால் இரண்டு வகை கார்களையும் ஓட்டலாம். ஆட்டோ தேர்வில் ஆட்டோ கார்களை மட்டுமே ஓட்ட முடியும்.",
    },
  },
  {
    id: "faq-5",
    q: {
      en: "Are your training vehicles equipped with dual-controls for safety?",
      si: "පුහුණු රථවල ද්විත්ව පාලක (Dual-Control) පද්ධති තිබේද?",
      ta: "பயிற்சி வாகனங்களில் இரட்டை கட்டுப்பாடுகள் உள்ளதா?",
    },
    a: {
      en: "Yes, 100% of our training fleet is equipped with certified dual-control pedal systems (instructor brake and clutch). This ensures total safety on public roads and immediate intervention if required.",
      si: "ඔව්, අපගේ සියලුම පුහුණු රථ උපදේශකවරයා සතුවද තිරිංග සහ ක්ලච් පද්ධති සහිත ද්විත්ව පාලක (Dual-Control) සුරක්ෂිත රථ වේ. එබැවින් බියෙන් තොරව ආරක්ෂිතව පුහුණු විය හැක.",
      ta: "ஆம், எங்கள் அனைத்து வாகனங்களிலும் பயிற்றுவிப்பாளருக்கான பிரேக் மற்றும் கிளட்ச் கட்டுப்பாடுகள் உள்ளன.",
    },
  },
  {
    id: "faq-6",
    q: {
      en: "What time do practical lessons start in the morning?",
      si: "උදෑසන ප්‍රායෝගික පුහුණුවීම් ආරම්භ වන වේලාව කුමක්ද?",
      ta: "காலை பயிற்சி வகுப்புகள் எத்தனை மணிக்கு ஆரம்பமாகும்?",
    },
    a: {
      en: "Our early-bird practical driving slots commence from 6:30 AM daily, enabling students and working professionals to complete their lessons before morning work or university commitments.",
      si: "උදෑසන 6:30 සිට ප්‍රායෝගික පුහුණු සැසි ආරම්භ වන බැවින් පාසල්, රැකියා හෝ වෙනත් කටයුතුවලට පෙර පහසුවෙන්ම පුහුණුවීම් නිම කළ හැක.",
      ta: "காலை 6:30 மணி முதல் பயிற்சி வகுப்புகள் தொடங்குகின்றன.",
    },
  },
];

export function FaqSection({ locale }: FaqSectionProps) {
  const dict = getDictionary(locale);
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.q[locale],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a[locale],
      },
    })),
  };

  return (
    <section id="faq" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a]">
      {/* Inject FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Marcus Lorenzet Editorial Style */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
            <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
              [ 09 · FREQUENTLY ASKED QUESTIONS ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
            {dict.faq.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
            {dict.faq.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#d0c5ab]/30 bg-[#141310] shadow-2xl"
                    : "border-white/[0.06] bg-[#141310]/60 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#fcc438] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold text-[#a8a295]">
                      0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#f5f5f3]">
                      {item.q[locale]}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#a8a295] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#fcc438]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed pt-2 border-t border-white/[0.06] pl-11">
                    {item.a[locale]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
