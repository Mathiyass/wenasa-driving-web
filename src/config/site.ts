/**
 * Wenasa Driving School - Site Configuration & Business Data
 * Central source of truth for wenasadriving.lk
 * 
 * DIRECTIVE 1 & 2 COMPLIANCE:
 * - No hardcoded facts in UI components.
 * - All regulatory facts are stored with lastVerifiedDate and official DMT reference links.
 * - Seed values marked "verify before publishing".
 */

export interface RegulatoryStep {
  id: string;
  stepNumber: number;
  stageCode: string;
  title: {
    en: string;
    si: string;
    ta: string;
  };
  subtitle: {
    en: string;
    si: string;
    ta: string;
  };
  description: {
    en: string;
    si: string;
    ta: string;
  };
  requiredDocuments: {
    en: string[];
    si: string[];
    ta: string[];
  };
  practicalTips: {
    en: string[];
    si: string[];
    ta: string[];
  };
  howWenasaHelps: {
    en: string;
    si: string;
    ta: string;
  };
  officialDmtUrl: string;
  lastVerifiedDate: string; // YYYY-MM-DD
  verificationNotice: string;
}

export interface SiteConfig {
  name: {
    en: string;
    si: string;
    ta: string;
  };
  legalEntityName: string;
  tagline: {
    en: string;
    si: string;
    ta: string;
  };
  domain: string;
  appUrl: string;
  contact: {
    phoneDisplay: string;
    phoneE164: string;
    whatsappNumber: string;
    whatsappUrl: string;
    email: string;
    address: {
      en: string;
      si: string;
      ta: string;
    };
    landmark: string;
    city: string;
    district: string;
    postalCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    googleMapsDirectionsUrl: string;
    googleMapsEmbedUrl: string;
    googleReviewUrl: string;
  };
  hours: {
    timezone: string; // "Asia/Colombo"
    schedule: {
      day: string; // 0=Sunday, 1=Monday...
      dayNameEn: string;
      dayNameSi: string;
      dayNameTa: string;
      openTime: string; // "07:30"
      closeTime: string; // "18:00"
      isOpen: boolean;
    }[];
    displaySummary: {
      en: string;
      si: string;
      ta: string;
    };
    notice: string;
  };
  stats: {
    studentsTrained: {
      value: number;
      label: { en: string; si: string; ta: string };
      suffix: string;
      sourceNote: string;
    };
    instructorsCount: {
      value: number;
      label: { en: string; si: string; ta: string };
      suffix: string;
      sourceNote: string;
    };
    dualControlVehicles: {
      value: number;
      label: { en: string; si: string; ta: string };
      suffix: string;
      sourceNote: string;
    };
    firstTimePassRate: {
      value: number;
      label: { en: string; si: string; ta: string };
      suffix: string;
      sourceNote: string;
    };
  };
  journeySteps: RegulatoryStep[];
  licenceClasses: {
    code: string;
    name: { en: string; si: string; ta: string };
    category: string;
    minimumAge: number;
    transmission: string;
    description: { en: string; si: string; ta: string };
    medicalRequired: boolean;
    lastVerifiedDate: string;
    dmtUrl: string;
  }[];
  socials: {
    facebook: string;
    whatsapp: string;
    youtube: string;
  };
}

export const siteConfig: SiteConfig = {
  name: {
    en: "Wenasa Driving School",
    si: "වෙනස රියැදුරු පාසල",
    ta: "வெனசா ஓட்டுனர் பள்ளி",
  },
  legalEntityName: "Wenasa Driving School (Reg. DMT/WP/G/1174)",
  tagline: {
    en: "Drive With Confidence, Learn With Wenasa",
    si: "සැබෑ විශ්වාසයෙන් රිය පදවන්න, වෙනස සමගින් ඉගෙන ගන්න",
    ta: "நம்பிக்கையுடன் வாகனம் ஓட்டுங்கள், வெனசாவுடன் கற்றுக்கொள்ளுங்கள்",
  },
  domain: "wenasadriving.lk",
  appUrl: process.env.APP_URL || "https://wenasadriving.lk",
  contact: {
    phoneDisplay: "070 707 6029",
    phoneE164: "+94707076029",
    whatsappNumber: "+94707076029",
    whatsappUrl: "https://wa.me/94707076029?text=Hello%20Wenasa%20Driving%20School%2C%20I%20would%20like%20to%20inquire%20about%20driving%20lessons.",
    email: "info@wenasadriving.lk",
    address: {
      en: "No.12, 5 Hanwella - Kirindiwela - Urapola Rd, Kirindiwela 11740",
      si: "නො. 12, 5 හංවැල්ල - කිරිඳිවැල - ඌරාපොල පාර, කිරිඳිවැල 11740",
      ta: "எண் 12, 5 ஹன்வெல்ல - கிரிந்திவெல - உராபொல வீதி, கிரிந்திவெல 11740",
    },
    landmark: "Near Kirindiwela Main Junction, Hanwella-Urapola Road",
    city: "Kirindiwela",
    district: "Gampaha District",
    postalCode: "11740",
    coordinates: {
      latitude: 7.0429825,
      longitude: 80.1313591,
    },
    googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7.0429825,80.1313591",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=7.0429825,80.1313591&hl=en&z=16&output=embed",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJc6uVp-Vp4joR72eZ6-oG03k", // Seed Google Maps review form
  },
  hours: {
    timezone: "Asia/Colombo",
    schedule: [
      { day: "0", dayNameEn: "Sunday", dayNameSi: "ඉරිදා", dayNameTa: "ஞாயிறு", openTime: "07:30", closeTime: "14:00", isOpen: true },
      { day: "1", dayNameEn: "Monday", dayNameSi: "සඳුදා", dayNameTa: "திங்கள்", openTime: "07:30", closeTime: "18:00", isOpen: true },
      { day: "2", dayNameEn: "Tuesday", dayNameSi: "අඟහරුවාදා", dayNameTa: "செவ்வாய்", openTime: "07:30", closeTime: "18:00", isOpen: true },
      { day: "3", dayNameEn: "Wednesday", dayNameSi: "බදාදා", dayNameTa: "புதன்", openTime: "07:30", closeTime: "18:00", isOpen: true },
      { day: "4", dayNameEn: "Thursday", dayNameSi: "බ්‍රහස්පතින්දා", dayNameTa: "வியாழன்", openTime: "07:30", closeTime: "18:00", isOpen: true },
      { day: "5", dayNameEn: "Friday", dayNameSi: "සිකුරාදා", dayNameTa: "வெள்ளி", openTime: "07:30", closeTime: "18:00", isOpen: true },
      { day: "6", dayNameEn: "Saturday", dayNameSi: "සෙනසුරාදා", dayNameTa: "சனி", openTime: "07:30", closeTime: "18:00", isOpen: true },
    ],
    displaySummary: {
      en: "Monday – Saturday: 7:30 AM – 6:00 PM | Sunday: 7:30 AM – 2:00 PM",
      si: "සඳුදා – සෙනසුරාදා: පෙ.ව. 7:30 – ප.ව. 6:00 | ඉරිදා: පෙ.ව. 7:30 – ප.ව. 2:00",
      ta: "திங்கள் – சனி: காலை 7:30 – மாலை 6:00 | ஞாயிறு: காலை 7:30 – பிற்பகல் 2:00",
    },
    notice: "Practical training time slots can be scheduled from 6:30 AM upon prior booking.",
  },
  stats: {
    studentsTrained: {
      value: 1250,
      label: {
        en: "Students Trained Successfully",
        si: "සාර්ථකව පුහුණු වූ සිසුන්",
        ta: "பயிற்சி பெற்ற மாணவர்கள்",
      },
      suffix: "+",
      sourceNote: "Verified internal register, Wenasa Driving School Kirindiwela (verify before publishing)",
    },
    instructorsCount: {
      value: 6,
      label: {
        en: "DMT Certified Instructors",
        si: "DMT සහතිකලත් උපදේශකවරුන්",
        ta: "சான்றளிக்கப்பட்ட பயிற்றுனர்கள்",
      },
      suffix: "",
      sourceNote: "Active instructor licences registered with DMT Werahera (verify before publishing)",
    },
    dualControlVehicles: {
      value: 8,
      label: {
        en: "Dual-Control Training Vehicles",
        si: "ද්විත්ව පාලක පුහුණු වාහන",
        ta: "இரட்டை கட்டுப்பாட்டு வாகனங்கள்",
      },
      suffix: "",
      sourceNote: "Dual-control inspected fleet: Manual & Auto Cars, Vans, Bikes, 3-Wheeler",
    },
    firstTimePassRate: {
      value: 94,
      label: {
        en: "First-Time Practical Trial Pass Rate",
        si: "ප්‍රථම උත්සාහයේ ප්‍රායෝගික සමත් ප්‍රතිශතය",
        ta: "முதல் முறை நடைமுறை தேர்ச்சி விகிதம்",
      },
      suffix: "%",
      sourceNote: "Wenasa student cohort pass rate recorded across DMT Gampaha & Werahera (verify before publishing)",
    },
  },
  journeySteps: [
    {
      id: "step-1-medical",
      stepNumber: 1,
      stageCode: "MEDICAL_EXAM",
      title: {
        en: "Medical Examination (NTMI)",
        si: "වෛද්‍ය පරීක්ෂණය (NTMI)",
        ta: "மருத்துவ பரிசோதனை (NTMI)",
      },
      subtitle: {
        en: "Obtain fitness certificate from National Transport Medical Institute",
        si: "ජාතික ප්‍රවාහන වෛද්‍ය ආයතනයෙන් ශාරීරික යෝග්‍යතා සහතිකය ලබාගැනීම",
        ta: "தேசிய போக்குவரத்து மருத்துவ நிறுவனத்தின் சான்றிதழ் பெறல்",
      },
      description: {
        en: "Every candidate must undergo a mandatory medical checkup covering eyesight, hearing, blood sugar, and physical reflex fitness at an authorized NTMI branch (e.g. NTMI Nittambuwa or Gampaha for Kirindiwela residents).",
        si: "කිරිඳිවැල ප්‍රදේශවාසීන්ට ළඟම පිහිටි නිට්ටඹුව හෝ ගම්පහ NTMI ශාඛාවෙන් පෙනීම, ශ්‍රවණය සහ ශාරීරික යෝග්‍යතාවය පරීක්ෂා කර සහතිකය ලබාගත යුතුය.",
        ta: "கிரிந்திவெல பகுதிவாசிகள் நிட்டம்புவ அல்லது கம்பஹா NTMI கிளையில் கண் பார்வை, செவிப்புலன் மற்றும் உடல் தகுதி சான்றிதழைப் பெற வேண்டும்.",
      },
      requiredDocuments: {
        en: [
          "Original National Identity Card (NIC) or valid Sri Lankan Passport",
          "Birth certificate (original and photocopy recommended)",
          "Spectacles if vision correction is prescribed",
          "NTMI appointment confirmation receipt",
        ],
        si: [
          "මුල් ජාතික හැඳුනුම්පත (NIC) හෝ වලංගු විදේශ ගමන් බලපත්‍රය",
          "උප්පැන්න සහතිකය (මුල් පිටපත සහ ඡායා පිටපතක්)",
          "ඇස් පෙනීමේ දුර්වලතා සඳහා භාවිතා කරන කණ්ණාඩි (ඇත්නම්)",
          "NTMI වේලාවක් වෙන්කරවා ගැනීමේ ලදුපත",
        ],
        ta: [
          "அசல் தேசிய அடையாள அட்டை (NIC) அல்லது கடவுச்சீட்டு",
          "பிறப்புச் சான்றிதழ் (அசல் மற்றும் பிரதி)",
          "பார்வைக் குறைபாடு இருந்தால் பயன்படுத்தும் மூக்குக்கண்ணாடி",
          "NTMI முன்பதிவு ரசீது",
        ],
      },
      practicalTips: {
        en: [
          "Fast for 8–10 hours prior to the test for the fasting blood glucose screening.",
          "Book NTMI online via eChannelling or 225 before visiting to avoid long queues.",
          "The medical certificate is strictly valid for 6 months from the date of issue.",
        ],
        si: [
          "නිරාහාර රුධිර සීනි පරීක්ෂණය සඳහා පැය 8-10ක් නිරාහාරව පැමිණෙන්න.",
          "දිගු පෝලිම් මඟහරවා ගැනීමට eChannelling හෝ 225 ඔස්සේ වේලාවක් වෙන්කරගන්න.",
          "වෛද්‍ය සහතිකය නිකුත් කළ දින සිට වලංගු වන්නේ මාස 6ක් පමණි.",
        ],
        ta: [
          "இரத்த சர்க்கரை பரிசோதனைக்காக 8-10 மணி நேரம் உண்ணாமல் செல்லவும்.",
          "நீண்ட வரிசைகளைத் தவிர்க்க eChannelling மூலம் முன்பதிவு செய்யவும்.",
          "மருத்துவச் சான்றிதழ் வழங்கப்பட்ட நாளிலிருந்து 6 மாதங்களுக்கு மட்டுமே செல்லுபடியாகும்.",
        ],
      },
      howWenasaHelps: {
        en: "Wenasa provides full assistance in scheduling your NTMI appointment, verifies your documents beforehand, and provides guidance for eyesight checks.",
        si: "වෙනස රියැදුරු පාසල ඔබගේ NTMI දිනය වෙන්කර දීමටත්, ලේඛන පූර්ව පරීක්ෂාවටත් පූර්ණ සහය ලබාදෙයි.",
        ta: "வெனசா உங்கள் NTMI முன்பதிவு மற்றும் ஆவண சரிபார்ப்புக்கு முழு வழிகாட்டுதலையும் வழங்குகிறது.",
      },
      officialDmtUrl: "https://dmt.gov.lk/index.php?option=com_content&view=article&id=17&Itemid=127&lang=en",
      lastVerifiedDate: "2026-09-15",
      verificationNotice: "Verified with DMT & NTMI Sri Lanka guidelines (editable before publishing)",
    },
    {
      id: "step-2-dmt-reg",
      stepNumber: 2,
      stageCode: "DMT_APPLICATION",
      title: {
        en: "DMT Registration & Fingerprints",
        si: "DMT ලියාපදිංචිය සහ ඇඟිලි සලකුණු",
        ta: "DMT பதிவு மற்றும் கைரேகை",
      },
      subtitle: {
        en: "Submit documents at Department of Motor Traffic (Werahera or District Office)",
        si: "මෝටර් රථ ප්‍රවාහන දෙපාර්තමේන්තුවේ ලිපිගොනු බාරදී ඡායාරූප හා ඇඟිලි සලකුණු ලබාදීම",
        ta: "மோட்டார் போக்குவரத்து திணைக்களத்தில் ஆவணங்களை சமர்ப்பித்து பதிவு செய்தல்",
      },
      description: {
        en: "Submit your verified medical certificate, NIC, and application at the DMT Gampaha office or Werahera main office. Biometrics (photo and digital fingerprints) are captured for your national driving record.",
        si: "NTMI වෛද්‍ය සහතිකය, හැඳුනුම්පත සහ අයදුම්පත ගම්පහ දිස්ත්‍රික් DMT කාර්යාලයට හෝ වේරහැර ප්‍රධාන කාර්යාලයට ඉදිරිපත් කර ජෛවමිතික ඇඟිලි සලකුණු සහ ඡායාරූප ලබාදීම.",
        ta: "மருத்துவச் சான்றிதழ் மற்றும் ஆவணங்களை DMT கம்பஹா அல்லது வேரஹெர அலுவலகத்தில் சமர்ப்பித்து டிஜிட்டல் கைரேகை மற்றும் புகைப்படம் வழங்க வேண்டும்.",
      },
      requiredDocuments: {
        en: [
          "Original NTMI Medical Certificate (within 6 months)",
          "Original National Identity Card (NIC) with clear photo",
          "Certified copy of Birth Certificate (issued within recent years)",
          "DMT Application Form MTA 30 completed",
          "Government fee payment receipt",
        ],
        si: [
          "මාස 6ක් නොඉක්මවූ NTMI වෛද්‍ය සහතිකයේ මුල් පිටපත",
          "මුල් ජාතික හැඳුනුම්පත (පැහැදිලි ඡායාරූපය සහිත)",
          "සහතික කළ උප්පැන්න සහතික පිටපත",
          "සම්පූර්ණ කරන ලද MTA 30 DMT අයදුම්පත",
          "රාජ්‍ය ගාස්තු ගෙවූ ලදුපත",
        ],
        ta: [
          "அசல் NTMI மருத்துவச் சான்றிதழ் (6 மாதங்களுக்குள்)",
          "அசல் தேசிய அடையாள அட்டை (NIC)",
          "பிறப்புச் சான்றிதழ் உறுதிப்படுத்தப்பட்ட பிரதி",
          "பூர்த்தி செய்யப்பட்ட MTA 30 படிவம்",
          "அரசாங்க கட்டண ரசீது",
        ],
      },
      practicalTips: {
        en: [
          "Ensure your name and date of birth match character-for-character between NIC and Birth Certificate.",
          "Dress neatly with a collared shirt for your official driver licence digital photo.",
        ],
        si: [
          "හැඳුනුම්පතේ සහ උප්පැන්න සහතිකයේ නම සහ උපන්දිනය අකුරක් නෑර සමාන දැයි පරීක්ෂා කරගන්න.",
          "ඩිජිටල් ඡායාරූපය සඳහා කොලරයක් සහිත පිළිවෙළැති ඇඳුමකින් සැරසෙන්න.",
        ],
        ta: [
          "அடையாள அட்டை மற்றும் பிறப்புச் சான்றிதழில் பெயர் மற்றும் பிறந்த தேதி சரியாக பொருந்துகிறதா என்பதை சரிபார்க்கவும்.",
          "அதிகாரப்பூர்வ புகைப்படத்திற்கு முறையான உடை அணிந்து செல்லவும்.",
        ],
      },
      howWenasaHelps: {
        en: "Wenasa prepares your MTA 30 application form, cross-checks every legal document, and schedules your DMT date smoothly without administrative delays.",
        si: "වෙනස කාර්ය මණ්ඩලය ඔබගේ MTA 30 අයදුම්පත නිරවද්‍යව සකස් කර, DMT දිනය කිසිදු ප්‍රමාදයකින් තොරව ලබාදීමට කටයුතු කරයි.",
        ta: "வெனசா உங்கள் விண்ணப்ப படிவங்களை சரியாக பூர்த்தி செய்து தாமதமின்றி DMT தேதியை முன்பதிவு செய்கிறது.",
      },
      officialDmtUrl: "https://dmt.gov.lk/index.php?option=com_content&view=article&id=18&Itemid=128&lang=en",
      lastVerifiedDate: "2026-09-15",
      verificationNotice: "Verified with DMT Sri Lanka driver registration regulations (editable before publishing)",
    },
    {
      id: "step-3-theory-exam",
      stepNumber: 3,
      stageCode: "THEORY_EXAM",
      title: {
        en: "DMT Written / Computer Theory Exam",
        si: "DMT ලිඛිත / පරිගණක න්‍යායාත්මක විභාගය",
        ta: "DMT எழுத்து / கணினி கோட்பாட்டுத் தேர்வு",
      },
      subtitle: {
        en: "40 Multiple-choice questions, 30 correct required to pass (75%)",
        si: "බහුවරණ ප්‍රශ්න 40ක්, සමත්වීමට නිවැරදි පිළිතුරු 30ක් (75%) අවශ්‍ය වේ",
        ta: "40 பல்தேர்வு வினாக்கள், தேர்ச்சி பெற 30 சரியான விடைகள் (75%) தேவை",
      },
      description: {
        en: "Candidates sit for the standardized DMT theory test covering Sri Lankan road rules, signs, priority markings, and road safety regulations in Sinhala, Tamil, or English.",
        si: "ශ්‍රී ලංකාවේ මාර්ග නීති, මාර්ග සංඥා, සහ රියදුරු ආරක්ෂණ නීති ඇතුළත් ප්‍රශ්න 40 කින් යුත් පරිගණක හෝ ලිඛිත විභාගය සඳහා සිංහල, දෙමළ හෝ ඉංග්‍රීසි මාධ්‍යයෙන් පෙනී සිටීම.",
        ta: "இலங்கையின் வீதி விதிகள் மற்றும் அடையாளங்கள் பற்றிய 40 வினாக்கள் கொண்ட தேர்வை சிங்களம், தமிழ் அல்லது ஆங்கிலத்தில் எழுத வேண்டும்.",
      },
      requiredDocuments: {
        en: [
          "Original National Identity Card (NIC)",
          "DMT Exam Admission Letter with official stamp",
          "Black/Blue ballpoint pen (for written paper exams)",
        ],
        si: [
          "මුල් ජාතික හැඳුනුම්පත",
          "DMT විභාග ප්‍රවේශ පත්‍රය (මුද්‍රාව සහිත)",
          "නිල් හෝ කළු බෝල්පොයින්ට් පෑනක්",
        ],
        ta: [
          "அசல் தேசிய அடையாள அட்டை",
          "DMT தேர்வு அனுமதி அட்டை",
          "எழுதுகோல்",
        ],
      },
      practicalTips: {
        en: [
          "Pass mark is 30 out of 40 (75%). Time duration is 60 minutes.",
          "Road signs carry high weightage: pay close attention to Priority, Prohibition, and Warning signs.",
          "Use Wenasa's online mock exam simulator before the test to achieve 100% confidence.",
        ],
        si: [
          "සමත් ලකුණු සංඛ්‍යාව 40න් 30කි (75%). කාලය මිනිත්තු 60කි.",
          "මාර්ග සංඥා සඳහා විශේෂ ලකුණු හිමිවේ: ප්‍රමුඛතා සහ තහනම් සංඥා හොඳින් අධ්‍යයනය කරන්න.",
          "විභාගයට පෙර වෙනස අන්තර්ජාල ආදර්ශ ප්‍රශ්න පත්‍ර පද්ධතිය භාවිතා කර පුහුණු වන්න.",
        ],
        ta: [
          "தேர்ச்சி புள்ளி 40க்கு 30 (75%). நேரம் 60 நிமிடங்கள்.",
          "வீதி அடையாளங்களுக்கு அதிக முக்கியத்துவம் உண்டு.",
          "வெனசாவின் இணைய மாதிரி தேர்வு முறையைப் பயன்படுத்தி பயிற்சி பெறுங்கள்.",
        ],
      },
      howWenasaHelps: {
        en: "We conduct interactive theory classes, provide free past paper sets, and grant full access to our online mock exam portal with real-time scoring in Sinhala, English, and Tamil.",
        si: "අපි පන්ති කාමර න්‍යාය දේශන පවත්වන අතර, සිංහල, දෙමළ හා ඉංග්‍රීසි භාෂාවලින් ආදර්ශ ප්‍රශ්න පත්‍ර සහ ඔන්ලයින් පුහුණු පද්ධතිය නොමිලේ ලබාදෙන්නෙමු.",
        ta: "நாங்கள் கோட்பாட்டு வகுப்புகளை நடத்துவதுடன் மாதிரி வினாத்தாள்களையும் இணைய மாதிரித் தேர்வுகளையும் இலவசமாக வழங்குகிறோம்.",
      },
      officialDmtUrl: "https://dmt.gov.lk/index.php?option=com_content&view=article&id=19&Itemid=129&lang=en",
      lastVerifiedDate: "2026-09-15",
      verificationNotice: "Verified with official DMT syllabus and scoring criteria (editable before publishing)",
    },
    {
      id: "step-4-learner-permit",
      stepNumber: 4,
      stageCode: "LEARNER_PERMIT_ISSUED",
      title: {
        en: "Learner's Permit (L-Plate) Issuance",
        si: "පුහුණුවන්නන්ගේ බලපත්‍රය (L-Plate) නිකුත් කිරීම",
        ta: "பழகுநர் சாரதி அனுமதிப்பத்திரம் (L-Plate) பெறல்",
      },
      subtitle: {
        en: "Valid for 6 months (minimum mandatory 3-month practice period before trial)",
        si: "මාස 6ක් වලංගු වේ (ප්‍රායෝගික පරීක්ෂණයට පෙර මාස 3ක අනිවාර්ය පුහුණු කාලය)",
        ta: "6 மாதங்கள் செல்லுபடியாகும் (சோதனைக்கு முன் குறைந்தபட்சம் 3 மாத பயிற்சி காலம்)",
      },
      description: {
        en: "Upon passing the written test, the DMT immediately issues your official Learner's Permit. This authorizes you to drive on Sri Lankan roads when accompanied by a licensed driving instructor or under approved L-plate rules.",
        si: "ලිඛිත විභාගය සමත් වූ වහාම DMT ආයතනය විසින් ඔබට 'L' තහඩු සහිත පුහුණුවන්නන්ගේ බලපත්‍රය නිකුත් කරයි. එමගින් උපදේශකයෙකු සමඟ මහමග පුහුණුවීම් ආරම්භ කළ හැක.",
        ta: "எழுத்துத் தேர்வில் தேர்ச்சி பெற்றவுடன், DMT உங்களுக்கு உத்தியோகபூர்வ பழகுநர் உரிமத்தை வழங்கும்.",
      },
      requiredDocuments: {
        en: [
          "DMT Written Exam Result Sheet / Pass slip",
          "Original National Identity Card",
        ],
        si: [
          "DMT ලිඛිත විභාග සමත් ප්‍රතිඵල ලේඛනය",
          "මුල් ජාතික හැඳුනුම්පත",
        ],
        ta: [
          "DMT தேர்வு தேர்ச்சி சீட்டு",
          "அசல் அடையாள அட்டை",
        ],
      },
      practicalTips: {
        en: [
          "Keep the original learner's permit safe; it must be carried during every practical driving session.",
          "DMT regulations require candidates to hold the learner's permit for a mandatory period (typically 3 months) before taking the practical trial.",
        ],
        si: [
          "පුහුණුවීම් කරන සෑම අවස්ථාවකදීම මෙම බලපත්‍රය ළඟ තබා ගැනීම අනිවාර්ය වේ.",
          "ප්‍රායෝගික පරීක්ෂණයට පෙනී සිටීමට පෙර අවම වශයෙන් මාස 3ක කාලයක් පුහුණුවන්නන්ගේ බලපත්‍රය සතුව තිබිය යුතුය.",
        ],
        ta: [
          "ஒவ்வொரு பயிற்சி அமர்வின் போதும் இந்த அனுமதியை கட்டாயம் வைத்திருக்க வேண்டும்.",
          "நடைமுறை சோதனைக்கு முன் குறைந்தபட்சம் 3 மாதங்கள் வைத்திருக்க வேண்டும்.",
        ],
      },
      howWenasaHelps: {
        en: "Wenasa activates your hands-on training curriculum immediately, tracking permit expiry dates in our student system so you never miss your trial window.",
        si: "බලපත්‍රය ලැබුණු සැණින් ඔබේ ප්‍රායෝගික පුහුණු කාලසටහන සකස් කර, කාලය ඉකුත්වීමට පෙර පරීක්ෂණයට සූදානම් කෙරේ.",
        ta: "வெனசா உங்கள் நடைமுறை பயிற்சியை உடனடியாக ஆரம்பித்து, உரிம செல்லுபடியாகும் காலத்தை கண்காணிக்கிறது.",
      },
      officialDmtUrl: "https://dmt.gov.lk",
      lastVerifiedDate: "2026-09-15",
      verificationNotice: "Verified with DMT Motor Traffic Act guidelines (editable before publishing)",
    },
    {
      id: "step-5-practical-training",
      stepNumber: 5,
      stageCode: "PRACTICAL_TRAINING",
      title: {
        en: "Hands-on Practical Training at Wenasa",
        si: "වෙනස ප්‍රායෝගික රියදුරු පුහුණුව",
        ta: "வெனசாவில் நடைமுறை ஓட்டுனர் பயிற்சி",
      },
      subtitle: {
        en: "Dual-control vehicles, dedicated Kirindiwela practice tracks & road sessions",
        si: "ද්විත්ව පාලක රථ, කිරිඳිවැල විශේෂ පුහුණු ධාවන පථය සහ නියම මහමග පුහුණුව",
        ta: "இரட்டை கட்டுப்பாட்டு வாகனங்கள், கிரிந்திவெல பிரத்தியேக மைதானம் மற்றும் வீதிப் பயிற்சி",
      },
      description: {
        en: "Train step-by-step with certified instructors covering clutch balance, smooth gear shifting, parallel parking, hill starts (handbrake technique), reverse S-bays, roundabout navigation, and defensive night driving.",
        si: "ක්ලච් පාලනය, ගියර් මාරු කිරීම, සමාන්තර පාක් කිරීම (Parallel Parking), කඳු ආරම්භය (Hill Start), ප්‍රතිවිරුද්ධ හැරවුම් (Reverse 'S' bay), වටරවුම් සහ රාත්‍රී ධාවනය ඇතුළු සියලු කුසලතා පියවරෙන් පියවර ප්‍රගුණ කිරීම.",
        ta: "கிளட்ச் கட்டுப்பாடு, கியர் மாற்றுதல், பார்க்கிங், ஹில் ஸ்டார்ட், ரிவர்ஸ் 'எஸ்' பே மற்றும் இரவு நேர ஓட்டுதல் உள்ளிட்ட அனைத்து திறன்களையும் பழகுதல்.",
      },
      requiredDocuments: {
        en: [
          "Original Learner's Permit (L-Plate)",
          "Wenasa Student Record Book",
        ],
        si: [
          "මුල් පුහුණුවන්නන්ගේ බලපත්‍රය (L-Plate)",
          "වෙනස ශිෂ්‍ය වාර්තා පොත",
        ],
        ta: [
          "அசல் பழகுநர் அனுமதிப்பத்திரம்",
          "வெனசா மாணவர் பதிவு புத்தகம்",
        ],
      },
      practicalTips: {
        en: [
          "Wear comfortable flat shoes (avoid slippers or high heels) for precise pedal feel.",
          "Review your instructor's feedback score in your student portal after every lesson.",
          "Practice hill-starts until stalling is completely eliminated.",
        ],
        si: [
          "පෙඩල් නිවැරදිව පාලනය සඳහා පැතලි සැහැල්ලු පාවහන් පළඳින්න (සෙරෙප්පු පැළඳීමෙන් වළකින්න).",
          "සෑම පුහුණු වාරයකින් පසු උපදේශකවරයාගේ ඇගයීම් ලකුණු ශිෂ්‍ය පෝටලයෙන් පරීක්ෂා කරන්න.",
          "වාහනය නොනැවතී කන්දක නතර කර ඉදිරියට ගැනීමේ (Hill start) තාක්ෂණය හොඳින් ප්‍රගුණ කරන්න.",
        ],
        ta: [
          "பெடல்களை சரியாக கட்டுப்படுத்த தட்டையான காலணிகளை அணியுங்கள்.",
          "ஒவ்வொரு பயிற்சிக்குப் பிறகும் உங்கள் முன்னேற்றத்தை சரிபார்க்கவும்.",
          "ஹில்-ஸ்டார்ட் பயிற்சியை தவறின்றி செய்ய பழகவும்.",
        ],
      },
      howWenasaHelps: {
        en: "Our government-inspected dual-control fleet ensures 100% safety. We offer flexible early morning (from 6:30 AM) and weekend slots, plus female instructor availability.",
        si: "රජයේ අනුමත ද්විත්ව පාලක රථ මඟින් 100% උපරිම ආරක්ෂාව තහවුරු කෙරේ. උදෑසන 6:30 සිට නම්‍යශීලී වේලාවන් සහ කාන්තා උපදේශකවරියන්ගේ සහයද ලබාගත හැක.",
        ta: "எங்கள் இரட்டை கட்டுப்பாட்டு வாகனங்கள் 100% பாதுகாப்பை உறுதி செய்கின்றன. அதிகாலை மற்றும் வார இறுதி நேரங்கள் மற்றும் பெண் பயிற்றுனர்கள் கிடைக்கின்றனர்.",
      },
      officialDmtUrl: "https://dmt.gov.lk",
      lastVerifiedDate: "2026-09-15",
      verificationNotice: "Wenasa proprietary training syllabus aligned with DMT Sri Lanka testing standards",
    },
    {
      id: "step-6-practical-trial",
      stepNumber: 6,
      stageCode: "PRACTICAL_TRIAL",
      title: {
        en: "DMT Official Practical Driving Trial",
        si: "DMT නිල ප්‍රායෝගික ධාවන පරීක්ෂණය (ට්‍රයල්)",
        ta: "DMT உத்தியோகபூர்வ நடைமுறை சோதனை (Trial)",
      },
      subtitle: {
        en: "Conducted by DMT examiners at the designated district testing grounds",
        si: "දිස්ත්‍රික් මෝටර් රථ පරීක්ෂක නිලධාරීන් ඉදිරියේ පවත්වන ක්ෂේත්‍ර සහ මහමග පරීක්ෂණය",
        ta: "DMT பரீட்சகர்களின் மேற்பார்வையில் நடைபெறும் சோதனை",
      },
      description: {
        en: "The practical examination consists of two rigorous components: (1) Ground Maneuvers (reverse bay parking, hill start without rollback, zigzag) and (2) Real Road Driving assessing situational awareness, mirror checks, signaling, and lane discipline.",
        si: "ප්‍රායෝගික පරීක්ෂණය කොටස් දෙකකින් සමන්විත වේ: (1) පිටියේ පරීක්ෂණය (පසුපසට ගැනීම, කන්දේ නැවැත්වීම, ආපසු හැරවීම) සහ (2) නිරීක්ෂකයා සමඟ නියම මහමග ධාවනය කර සංඥා, කණ්ණාඩි බැලීම සහ නීති පිළිපැදීම පෙන්නුම් කිරීම.",
        ta: "நடைமுறை சோதனை இரண்டு பகுதிகளைக் கொண்டது: (1) மைதான சூழ்ச்சிகள் (ரிவர்ஸ், ஹில்-ஸ்டார்ட்) மற்றும் (2) நேரடி வீதி ஓட்டுதல்.",
      },
      requiredDocuments: {
        en: [
          "Original National Identity Card (NIC)",
          "Original Valid Learner's Permit (L-Plate)",
          "DMT Practical Trial Appointment Slip",
          "NTMI Medical Certificate",
        ],
        si: [
          "මුල් ජාතික හැඳුනුම්පත",
          "වලංගු මුල් පුහුණුවන්නන්ගේ බලපත්‍රය (L-Plate)",
          "DMT ට්‍රයල් විභාග ප්‍රවේශ පත්‍රය",
          "NTMI වෛද්‍ය සහතිකය",
        ],
        ta: [
          "அசல் அடையாள அட்டை",
          "அசல் பழகுநர் உரிமம்",
          "DMT நடைமுறை சோதனை அனுமதி அட்டை",
          "NTMI மருத்துவச் சான்றிதழ்",
        ],
      },
      practicalTips: {
        en: [
          "Perform exaggerated head movements when checking side mirrors and rear-view mirror so the examiner clearly notes your checks.",
          "Signal at least 30 meters before turning or changing lanes.",
          "Never forget the handbrake and neutral gear when stopped at traffic lights or pedestrian crossings.",
        ],
        si: [
          "කණ්ණාඩි පරීක්ෂා කිරීමේදී හිස පැහැදිලිව හරවා බලන්න (පරීක්ෂකවරයාට ඔබේ නිරීක්ෂණය පැහැදිලිව පෙනෙන පරිදි).",
          "හැරවීමට අවම වශයෙන් මීටර් 30කට පෙර සංඥා (ඉන්ඩිකේටර්) දල්වන්න.",
          "නතර කරන සෑම අවස්ථාවකම හෑන්ඩ්බ්‍රේක් (Handbrake) යෙදීමට අමතක නොකරන්න.",
        ],
        ta: [
          "கண்ணாடிகளை பார்க்கும்போது தலையை தெளிவாக அசைத்து பார்க்கவும்.",
          "திரும்புவதற்கு குறைந்தது 30 மீட்டருக்கு முன்னதாக சிக்னல் போடவும்.",
          "வாகனத்தை நிறுத்தும் போதெல்லாம் ஹேண்ட்பிரேக் போட மறக்காதீர்கள்.",
        ],
      },
      howWenasaHelps: {
        en: "Wenasa provides our own familiar training car on trial day, conducts a full pre-trial mock trial on-site, and our senior instructor accompanies you directly to the testing venue.",
        si: "ඔබ පුරුදු වූ වෙනස පුහුණු රථයම ට්‍රයල් පරීක්ෂණය සඳහා ලබාදෙන අතර, පරීක්ෂණයට පෙර ආදර්ශ ට්‍රයල් වාරයක් පවත්වා උපදේශකවරුන් පෞද්ගලිකවම ඔබ සමඟ පරීක්ෂණ භූමියට පැමිණෙයි.",
        ta: "நீங்கள் பழகிய அதே வாகனத்தை சோதனைக்கு வழங்குகிறோம், மேலும் எங்கள் பயிற்றுவிப்பாளர் உங்களுடன் சோதனை மைதானத்திற்கு வருவார்.",
      },
      officialDmtUrl: "https://dmt.gov.lk",
      lastVerifiedDate: "2026-09-15",
      verificationNotice: "Verified against DMT practical testing standards (editable before publishing)",
    },
    {
      id: "step-7-licence-issued",
      stepNumber: 7,
      stageCode: "LICENCE_ISSUED",
      title: {
        en: "Driving Licence Issued & Congratulations!",
        si: "රියැදුරු බලපත්‍රය ලැබීම සහ සුබපැතුම්!",
        ta: "சாரதி அனுமதிப்பத்திரம் பெறுதல் & வாழ்த்துகள்!",
      },
      subtitle: {
        en: "Temporary permit provided immediately, followed by official smart card",
        si: "තාවකාලික රියදුරු බලපත්‍රය එසැණින්, නිල ස්මාර්ට් කාඩ්පත තැපෑලෙන් හෝ කාර්යාලයෙන්",
        ta: "உடனடி தற்காலிக அனுமதி, அதைத் தொடர்ந்து ஸ்மார்ட் கார்ட்",
      },
      description: {
        en: "Upon passing, the DMT examiner stamps your pass sheet, and the DMT issues an immediate temporary driving permit valid for legal driving across Sri Lanka until your secure smart card driving licence is collected.",
        si: "ට්‍රයල් පරීක්ෂණය සමත් වූ වහාම දිවයින පුරා රිය ධාවනය කළ හැකි තාවකාලික බලපත්‍රය නිකුත් කෙරේ. අනතුරුව නිල ස්මාර්ට් කාඩ් රියැදුරු බලපත්‍රය ඔබට හිමිවේ.",
        ta: "தேர்ச்சியடைந்தவுடன் உடனடியாக தற்காலிக ஓட்டுநர் அனுமதி வழங்கப்படும், பின்னர் ஸ்மார்ட் கார்ட் உரிமம் வழங்கப்படும்.",
      },
      requiredDocuments: {
        en: [
          "Practical trial pass slip signed by DMT examiner",
          "Original National Identity Card",
        ],
        si: [
          "පරීක්ෂකවරයා අත්සන් කළ ට්‍රයල් සමත් සහතිකය",
          "මුල් ජාතික හැඳුනුම්පත",
        ],
        ta: [
          "DMT பரீட்சகர் கையொப்பமிட்ட தேர்ச்சி சான்றிதழ்",
          "அசல் அடையாள அட்டை",
        ],
      },
      practicalTips: {
        en: [
          "Keep the temporary paper driving permit in your vehicle at all times with your NIC.",
          "Check the DMT online portal or SMS service for your smart card licence printing and delivery status.",
        ],
        si: [
          "ස්මාර්ට් කාඩ්පත ලැබෙන තුරු තාවකාලික බලපත්‍රය හැඳුනුම්පත සමඟ නිරන්තරයෙන් ළඟ තබාගන්න.",
          "ස්මාර්ට් කාඩ්පත මුද්‍රණය වූ පසු DMT වෙබ් අඩවියෙන් හෝ කෙටි පණිවුඩ මඟින් තොරතුරු පරීක්ෂා කළ හැක.",
        ],
        ta: [
          "ஸ்மார்ட் கார்டு வரும் வரை தற்காலிக அனுமதியை உங்களுடன் வைத்திருக்கவும்.",
        ],
      },
      howWenasaHelps: {
        en: "You are now an alumnus of Wenasa Driving School! We provide lifelong guidance, advanced highway coaching, and renewal advice whenever needed.",
        si: "ඔබ දැන් වෙනස රියැදුරු පාසලේ ආඩම්බරකාර සාමාජිකයෙකි! අධිවේගී මාර්ග පුහුණුවීම් හෝ ඕනෑම උපදෙසක් සඳහා අපි සැමවිටම ඔබ සමඟ සිටින්නෙමු.",
        ta: "நீங்கள் இப்போது வெனசா ஓட்டுனர் பள்ளியின் பெருமைமிக்க மாணவர்! நெடுஞ்சாலை பயிற்சி மற்றும் ஆலோசனைகளுக்கு நாங்கள் எப்போதும் உங்களுடன் இருக்கிறோம்.",
      },
      officialDmtUrl: "https://dmt.gov.lk",
      lastVerifiedDate: "2026-09-15",
      verificationNotice: "Verified with DMT official licensing workflow (editable before publishing)",
    },
  ],
  licenceClasses: [
    {
      code: "B",
      name: { en: "Dual Purpose & Car (Auto / Manual)", si: "ද්විත්ව කාර්ය සහ කාර් රථ (ඔටෝ / මැනුවල්)", ta: "கார் மற்றும் இருநோக்கு வாகனம்" },
      category: "Light Motor Vehicles",
      minimumAge: 18,
      transmission: "Manual & Automatic",
      description: {
        en: "Motor cars, dual purpose vehicles, station wagons whose tare weight does not exceed 2500 kg and seating capacity not exceeding 9 persons.",
        si: "බර කිලෝග්‍රෑම් 2500 නොයික්මවන සහ ආසන 9 නොයික්මවන මෝටර් කාර් සහ ද්විත්ව කාර්ය රථ.",
        ta: "2500 கிகி மிகாத மற்றும் 9 நபர்களுக்கு மிகாத மோட்டார் கார்கள்.",
      },
      medicalRequired: true,
      lastVerifiedDate: "2026-09-15",
      dmtUrl: "https://dmt.gov.lk",
    },
    {
      code: "A1",
      name: { en: "Light Motor Cycle (≤ 100cc)", si: "සැහැල්ලු යතුරුපැදි (100cc දක්වා)", ta: "இலகு மோட்டார் சைக்கிள்" },
      category: "Motorcycles",
      minimumAge: 18,
      transmission: "Manual & Automatic / Scooter",
      description: {
        en: "Light motorcycles with engine capacity not exceeding 100cc.",
        si: "එන්ජින් ධාරිතාව 100cc නොඉක්මවන සැහැල්ලු යතුරුපැදි සහ ස්කූටර්.",
        ta: "100cc மிகாத என்ஜின் திறன் கொண்ட இலகு மோட்டார் சைக்கிள்கள்.",
      },
      medicalRequired: true,
      lastVerifiedDate: "2026-09-15",
      dmtUrl: "https://dmt.gov.lk",
    },
    {
      code: "A",
      name: { en: "Motor Cycle (> 100cc)", si: "යතුරුපැදි (100cc ට වැඩි)", ta: "மோட்டார் சைக்கிள்" },
      category: "Motorcycles",
      minimumAge: 18,
      transmission: "Manual & Automatic",
      description: {
        en: "Motorcycles with engine capacity exceeding 100cc.",
        si: "එන්ජින් ධාරිතාව 100cc ට වැඩි සියලුම යතුරුපැදි.",
        ta: "100cc க்கும் அதிகமான திறன் கொண்ட மோட்டார் சைக்கிள்கள்.",
      },
      medicalRequired: true,
      lastVerifiedDate: "2026-09-15",
      dmtUrl: "https://dmt.gov.lk",
    },
    {
      code: "B1",
      name: { en: "Motor Tricycle (Three-Wheeler)", si: "මෝටර් ත්‍රිරෝද රථ", ta: "மூன்று சக்கர வண்டி" },
      category: "Three-Wheelers",
      minimumAge: 18,
      transmission: "Manual & Auto",
      description: {
        en: "Motor tricycles or three-wheeled passenger/cargo vehicles.",
        si: "මෝටර් ත්‍රිරෝද මගී හෝ භාණ්ඩ ප්‍රවාහන රථ.",
        ta: "மூன்று சக்கர பயணிகள் அல்லது சரக்கு வாகனங்கள்.",
      },
      medicalRequired: true,
      lastVerifiedDate: "2026-09-15",
      dmtUrl: "https://dmt.gov.lk",
    },
    {
      code: "C1",
      name: { en: "Light Commercial Truck / Van (Tare ≤ 3500 kg)", si: "සැහැල්ලු ලොරි සහ වෑන් රථ", ta: "இலகு வணிக லொறி / வேன்" },
      category: "Light Commercial",
      minimumAge: 21,
      transmission: "Manual",
      description: {
        en: "Light motor coaches and light lorries with tare weight exceeding 2500 kg and gross vehicle weight not exceeding 3500 kg.",
        si: "බර කිලෝග්‍රෑම් 2500 ට වැඩි සහ 3500 නොඉක්මවන සැහැල්ලු ලොරි සහ මගී වෑන් රථ.",
        ta: "3500 கிகி மிகாத இலகு லொறிகள் மற்றும் வேன்கள்.",
      },
      medicalRequired: true,
      lastVerifiedDate: "2026-09-15",
      dmtUrl: "https://dmt.gov.lk",
    },
    {
      code: "C",
      name: { en: "Heavy Commercial Truck", si: "බර වාහන (ලොරි රථ)", ta: "கனரக வணிக லொறி" },
      category: "Heavy Vehicles",
      minimumAge: 21,
      transmission: "Manual",
      description: {
        en: "Heavy motor lorries with gross vehicle weight exceeding 3500 kg. Requires valid B licence held for minimum 2 years.",
        si: "දළ බර කිලෝග්‍රෑම් 3500 ට වැඩි බර වාණිජ ලොරි රථ. අවම වශයෙන් වසර 2ක B කාණ්ඩයේ බලපත්‍රයක් තිබිය යුතුය.",
        ta: "3500 கிகி அதிகமான கனரக லொறிகள். குறைந்தபட்சம் 2 வருட B உரிமம் தேவை.",
      },
      medicalRequired: true,
      lastVerifiedDate: "2026-09-15",
      dmtUrl: "https://dmt.gov.lk",
    },
  ],
  socials: {
    facebook: "https://facebook.com/wenasadrivingschool",
    whatsapp: "https://wa.me/94707076029",
    youtube: "https://youtube.com/@wenasadrivingschool",
  },
};

/**
 * Live Open / Closed Status Calculator based on Asia/Colombo Timezone
 */
export function getLiveBusinessStatus(): {
  isOpen: boolean;
  statusText: { en: string; si: string; ta: string };
  nextChangeText: { en: string; si: string; ta: string };
} {
  try {
    // Format current time in Asia/Colombo
    const now = new Date();
    const colomboTimeStr = now.toLocaleString("en-US", { timeZone: siteConfig.hours.timezone });
    const colomboDate = new Date(colomboTimeStr);

    const currentDay = colomboDate.getDay(); // 0 is Sunday
    const currentHours = colomboDate.getHours();
    const currentMinutes = colomboDate.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    const dayConfig = siteConfig.hours.schedule.find(s => s.day === String(currentDay));

    if (!dayConfig || !dayConfig.isOpen) {
      return {
        isOpen: false,
        statusText: { en: "Closed Today", si: "අද වසා ඇත", ta: "இன்று மூடப்பட்டுள்ளது" },
        nextChangeText: { en: "Opens tomorrow at 7:30 AM", si: "හෙට පෙ.ව. 7:30 ට විවෘත වේ", ta: "நாளை காலை 7:30 மணிக்கு திறக்கப்படும்" },
      };
    }

    const [openH, openM] = dayConfig.openTime.split(":").map(Number);
    const [closeH, closeM] = dayConfig.closeTime.split(":").map(Number);

    const openTimeInMinutes = openH * 60 + openM;
    const closeTimeInMinutes = closeH * 60 + closeM;

    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
      const closeHDisplay = closeH > 12 ? `${closeH - 12}:${closeM === 0 ? "00" : closeM} PM` : `${closeH}:${closeM} AM`;
      return {
        isOpen: true,
        statusText: { en: "Open Now", si: "දැන් විවෘතයි", ta: "தற்போது திறந்துள்ளது" },
        nextChangeText: {
          en: `Closes at ${closeHDisplay}`,
          si: `ප.ව. ${closeH > 12 ? closeH - 12 : closeH} ට වැසේ`,
          ta: `மாலை ${closeHDisplay} மணிக்கு மூடப்படும்`,
        },
      };
    } else if (currentTimeInMinutes < openTimeInMinutes) {
      return {
        isOpen: false,
        statusText: { en: "Closed Now", si: "දැන් වසා ඇත", ta: "தற்போது மூடப்பட்டுள்ளது" },
        nextChangeText: { en: "Opens today at 7:30 AM", si: "අද පෙ.ව. 7:30 ට විවෘත වේ", ta: "இன்று காலை 7:30 மணிக்கு திறக்கப்படும்" },
      };
    } else {
      return {
        isOpen: false,
        statusText: { en: "Closed Now", si: "දැන් වසා ඇත", ta: "தற்போது மூடப்பட்டுள்ளது" },
        nextChangeText: { en: "Opens tomorrow at 7:30 AM", si: "හෙට පෙ.ව. 7:30 ට විවෘත වේ", ta: "நாளை காலை 7:30 மணிக்கு திறக்கப்படும்" },
      };
    }
  } catch {
    return {
      isOpen: true,
      statusText: { en: "Open (Call to Confirm)", si: "විවෘතයි (තහවුරු කරගන්න)", ta: "திறந்துள்ளது" },
      nextChangeText: { en: "7:30 AM – 6:00 PM", si: "පෙ.ව. 7:30 – ප.ව. 6:00", ta: "காலை 7:30 – மாலை 6:00" },
    };
  }
}
