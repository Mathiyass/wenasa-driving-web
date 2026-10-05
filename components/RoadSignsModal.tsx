"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { 
  X, 
  Search, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  BookOpen
} from "lucide-react";

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
  // REGULATORY SIGNS
  {
    id: "sign-stop",
    category: "REGULATORY",
    name: { en: "Stop Sign", si: "නවතින්න සංඥාව", ta: "நிறுத்து அடையாளம்" },
    meaning: {
      en: "Drivers must come to a complete standstill before the white stop line and give right of way to all crossing traffic.",
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
      en: "Entry strictly forbidden for all vehicles from this direction into the roadway.",
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
      en: "Mandatory maximum legal speed within this urban sector is 50 kilometers per hour.",
      si: "මෙම මාර්ග කොටසේ ධාවනය කළ හැකි නීත්‍යානුකූල උපරිම වේගය පැයට කිලෝමීටර් 50කි.",
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
      si: "මෙම කලාපය තුළ වෙනත් කිසිදු මෝටර් රථයක් ඉස්සර කිරීම තහනම් වේ.",
      ta: "இந்த பகுதியில் பிற வாகனங்களை முந்திச் செல்லக்கூடாது.",
    },
    signType: "NO_OVERTAKING",
  },
  {
    id: "sign-no-parking",
    category: "REGULATORY",
    name: { en: "No Parking", si: "නැවැත්වීම තහනම්", ta: "நிறுத்த தடை" },
    meaning: {
      en: "Vehicles may not be parked along this section of roadway; brief stopping for passenger boarding is permitted.",
      si: "මෙම මාර්ගයේ වාහන නතර කර තැබීම තහනම් වේ. මගීන් බැස්සවීම සඳහා පමණක් ක්ෂණික නැවැත්වීම කළ හැක.",
      ta: "இங்கு வாகனங்களை நிறுத்தக்கூடாது.",
    },
    signType: "NO_PARKING",
  },
  {
    id: "sign-no-uturn",
    category: "REGULATORY",
    name: { en: "No U-Turn", si: "යූ-හැරවුම තහනම්", ta: "யு-வளைவு தடை" },
    meaning: {
      en: "Vehicles are strictly prohibited from making a 180-degree U-turn along this highway section.",
      si: "මෙම මාර්ග කොටසේ ආපසු හැරවීම (U-Turn) සම්පූර්ණයෙන්ම තහනම් වේ.",
      ta: "இப்பகுதியில் யு-வளைவு எடுப்பது தடை செய்யப்பட்டுள்ளது.",
    },
    signType: "NO_UTURN",
  },
  {
    id: "sign-one-way",
    category: "REGULATORY",
    name: { en: "One Way Traffic", si: "එක් දිශාවකට පමණි", ta: "ஒரு வழி பாதை" },
    meaning: {
      en: "Traffic permitted to travel only in the direction indicated by the arrow.",
      si: "ඊතලයෙන් දක්වා ඇති දිශාවට පමණක් වාහන ධාවනය කිරීමට අවසර ඇත.",
      ta: "அம்பு குறிக்கும் திசையில் மட்டுமே வாகனங்கள் செல்ல அனுமதிக்கப்படும்.",
    },
    signType: "ONE_WAY",
  },

  // WARNING SIGNS
  {
    id: "sign-pedestrian-crossing",
    category: "WARNING",
    name: { en: "Pedestrian Crossing Ahead", si: "ඉදිරියෙන් පදික මාරුවක්", ta: "முன்னால் பாதசாரி கடவை" },
    meaning: {
      en: "Warns of a designated zebra pedestrian crossing ahead; prepare to slow down and yield.",
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
      en: "Traffic circle ahead; prepare to yield to circulating vehicles coming from your right side.",
      si: "ඉදිරියෙන් රවුම්මංසලක් ඇති බැවින් දකුණෙන් එන වාහනවලට ප්‍රමුඛතාවය දීමට සූදානම් වන්න.",
      ta: "முன்னால் வட்டவடிவ சந்தி உள்ளது, வலதுபுற வாகனங்களுக்கு முன்னுரிமை அளிக்க தயாராகுங்கள்.",
    },
    signType: "ROUNDABOUT",
  },
  {
    id: "sign-bend-left",
    category: "WARNING",
    name: { en: "Sharp Bend to Left", si: "ඉදිරියෙන් වමට තද වංගුවක්", ta: "இடதுபுற வளைவு" },
    meaning: {
      en: "Warns of a sharp curve to the left ahead; reduce speed before entering the turn.",
      si: "ඉදිරියෙන් වමට තද වංගුවක් ඇති බැවින් වංගුවට පෙර වේගය අඩු කරගන්න.",
      ta: "முன்னால் கடுமையான இடதுபுற வளைவு உள்ளது, வேகத்தை குறைக்கவும்.",
    },
    signType: "BEND_LEFT",
  },
  {
    id: "sign-bend-right",
    category: "WARNING",
    name: { en: "Sharp Bend to Right", si: "ඉදිරියෙන් දකුණට තද වංගුවක්", ta: "வலதுபுற வளைவு" },
    meaning: {
      en: "Warns of a sharp curve to the right ahead; maintain your lane and appropriate speed.",
      si: "ඉදිරියෙන් දකුණට තද වංගුවක් ඇති බැවින් මංතීරුව පවත්වාගනිමින් වේගය පාලනය කරන්න.",
      ta: "முன்னால் கடுமையான வலதுபுற வளைவு உள்ளது.",
    },
    signType: "BEND_RIGHT",
  },
  {
    id: "sign-slippery-road",
    category: "WARNING",
    name: { en: "Slippery Road Surface", si: "ලිස්සන සුළු මතුපිටක්", ta: "வழுக்கும் வீதி" },
    meaning: {
      en: "Road surface may be slippery especially during rain; avoid sudden braking and sharp steering.",
      si: "වැසි සහිත අවස්ථාවල මාර්ගය ලිස්සා යා හැකි බැවින් හදිසි තිරිංග යෙදීමෙන් වළකින්න.",
      ta: "மழைக்காலங்களில் வீதி வழுக்கக்கூடும், அவசர பிரேக்கிங் தவிர்க்கவும்.",
    },
    signType: "SLIPPERY_ROAD",
  },
  {
    id: "sign-school-zone",
    category: "WARNING",
    name: { en: "School Zone Ahead", si: "පාසල් කලාපය", ta: "பாடசாலை வலயம்" },
    meaning: {
      en: "Children crossing the road ahead; strictly adhere to reduced school hour speed limits.",
      si: "පාසල් දරුවන් මාරුවන කලාපයක් බැවින් වේගය අවම මට්ටමකට අඩු කරන්න.",
      ta: "குழந்தைகள் வீதியை கடக்கலாம், வேகத்தை மிகவும் குறைக்கவும்.",
    },
    signType: "SCHOOL_ZONE",
  },
  {
    id: "sign-speed-bump",
    category: "WARNING",
    name: { en: "Road Hump / Speed Breaker", si: "වේග බාධකය", ta: "வேகத்தடை" },
    meaning: {
      en: "Physical speed hump on the roadway ahead; slow down to avoid vehicle chassis impact.",
      si: "ඉදිරියෙන් මාර්ගයේ වේග බාධකයක් ඇති බැවින් වාහනයට හානි නොවීමට වේගය අඩු කරන්න.",
      ta: "முன்னால் வேகத்தடை உள்ளது, வேகத்தை குறைக்கவும்.",
    },
    signType: "SPEED_BUMP",
  },
  {
    id: "sign-narrow-bridge",
    category: "WARNING",
    name: { en: "Narrow Bridge Ahead", si: "පටු පාලමක්", ta: "குறுகிய பாலம்" },
    meaning: {
      en: "Road narrows onto a bridge structure; yield if oncoming vehicle has already entered.",
      si: "ඉදිරියෙන් පටු පාලමක් ඇති බැවින් ඉදිරියෙන් පැමිණෙන වාහනවලට අවධානය යොමු කරන්න.",
      ta: "முன்னால் குறுகிய பாலம் உள்ளது.",
    },
    signType: "NARROW_BRIDGE",
  },

  // INFORMATION SIGNS
  {
    id: "sign-hospital",
    category: "INFORMATION",
    name: { en: "Hospital / Medical Center", si: "රෝහල් කලාපය", ta: "வைத்தியசாலை பகுதி" },
    meaning: {
      en: "Medical facility nearby; strictly avoid sounding horns and maintain quiet discipline.",
      si: "ආසන්නයේ රෝහලක් ඇති බැවින් නළා ශබ්ද කිරීමෙන් සම්පූර්ණයෙන්ම වළකින්න.",
      ta: "அருகில் மருத்துவமனை உள்ளது, தேவையின்றி ஒலி எழுப்ப வேண்டாம்.",
    },
    signType: "HOSPITAL",
  },
  {
    id: "sign-bus-stop",
    category: "INFORMATION",
    name: { en: "Designated Bus Stop", si: "බස් නැවතුම", ta: "பேருந்து நிறுத்தம்" },
    meaning: {
      en: "Designated public transport stopping bay; do not park or obstruct passenger embarkation.",
      si: "පොදු බස් නැවතුම්පොළකි; බස් රථවලට හෝ මගීන්ට බාධා වන පරිදි වාහන නොනවත්වන්න.",
      ta: "பேருந்து நிறுத்தும் இடம்.",
    },
    signType: "BUS_STOP",
  },
  {
    id: "sign-parking",
    category: "INFORMATION",
    name: { en: "Designated Parking Area", si: "වාහන නැවතුම්පොළ (Parking)", ta: "வாகன நிறுத்துமிடம்" },
    meaning: {
      en: "Authorized location designated for passenger motor vehicle parking.",
      si: "නීත්‍යානුකූලව වාහන ගාල් කිරීමට අවසර ලත් ස්ථානයකි.",
      ta: "அனுமதிக்கப்பட்ட வாகன நிறுத்துமிடம்.",
    },
    signType: "PARKING",
  },
  {
    id: "sign-first-aid",
    category: "INFORMATION",
    name: { en: "First Aid Station", si: "ප්‍රථමාධාර මධ්‍යස්ථානය", ta: "முதலுதவி நிலையம்" },
    meaning: {
      en: "Emergency medical first aid station available ahead.",
      si: "හදිසි ප්‍රථමාධාර ප්‍රතිකාර මධ්‍යස්ථානයක් ඉදිරියෙන් පිහිටා ඇත.",
      ta: "முதலுதவி சிகிச்சை மையம்.",
    },
    signType: "FIRST_AID",
  },
  {
    id: "sign-fuel",
    category: "INFORMATION",
    name: { en: "Filling / Fuel Station", si: "ඉන්ධන පිරවුම්හල", ta: "எரிபொருள் நிரப்பு நிலையம்" },
    meaning: {
      en: "Automotive refueling and service station situated on or adjacent to route.",
      si: "ඉදිරියෙන් ඉන්ධන පිරවුම්හලක් පිහිටා ඇත.",
      ta: "எரிபொருள் நிரப்பு நிலையம் முன்னால் உள்ளது.",
    },
    signType: "FUEL",
  },
];

function RenderSignGraphic({ type }: { type: string }) {
  switch (type) {
    case "STOP":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" stroke="#ffffff" strokeWidth="4" />
          <text x="50" y="58" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">STOP</text>
        </svg>
      );
    case "GIVE_WAY":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,92 10,15 90,15" fill="#ffffff" stroke="#dc2626" strokeWidth="12" strokeLinejoin="round" />
        </svg>
      );
    case "NO_ENTRY":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
          <rect x="18" y="42" width="64" height="16" fill="#ffffff" rx="2" />
        </svg>
      );
    case "SPEED_50":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <text x="50" y="62" fill="#0f172a" fontSize="36" fontWeight="900" fontFamily="monospace" textAnchor="middle">50</text>
        </svg>
      );
    case "NO_OVERTAKING":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <rect x="25" y="42" width="22" height="16" rx="3" fill="#dc2626" />
          <rect x="53" y="42" width="22" height="16" rx="3" fill="#0f172a" />
        </svg>
      );
    case "NO_PARKING":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#0284c7" stroke="#dc2626" strokeWidth="10" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="10" />
        </svg>
      );
    case "NO_UTURN":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <path d="M 65 65 L 65 42 A 18 18 0 0 0 35 42 L 35 60" fill="none" stroke="#0f172a" strokeWidth="6" />
          <polygon points="27,55 35,68 43,55" fill="#0f172a" />
          <line x1="18" y1="18" x2="82" y2="82" stroke="#dc2626" strokeWidth="8" />
        </svg>
      );
    case "ONE_WAY":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <rect x="15" y="10" width="70" height="80" rx="8" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <polygon points="50,22 30,48 42,48 42,75 58,75 58,48 70,48" fill="#ffffff" />
        </svg>
      );
    case "PED_CROSSING":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <line x1="28" y1="74" x2="72" y2="74" stroke="#0f172a" strokeWidth="4" />
          <circle cx="48" cy="38" r="5" fill="#0f172a" />
          <path d="M 44 45 L 52 45 L 56 60 L 48 68" stroke="#0f172a" strokeWidth="4" fill="none" />
        </svg>
      );
    case "ROUNDABOUT":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <circle cx="50" cy="55" r="16" fill="none" stroke="#0f172a" strokeWidth="5" strokeDasharray="16 10" />
        </svg>
      );
    case "BEND_LEFT":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <path d="M 60 72 L 60 52 L 40 40" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          <polygon points="34,48 30,35 44,36" fill="#0f172a" />
        </svg>
      );
    case "BEND_RIGHT":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <path d="M 40 72 L 40 52 L 60 40" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          <polygon points="66,48 70,35 56,36" fill="#0f172a" />
        </svg>
      );
    case "SLIPPERY_ROAD":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <rect x="40" y="44" width="20" height="12" rx="2" fill="#0f172a" />
          <path d="M 34 76 Q 42 66 38 56" fill="none" stroke="#0f172a" strokeWidth="3" />
          <path d="M 62 76 Q 54 66 58 56" fill="none" stroke="#0f172a" strokeWidth="3" />
        </svg>
      );
    case "SCHOOL_ZONE":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <circle cx="42" cy="40" r="5" fill="#0f172a" />
          <rect x="38" y="46" width="8" height="18" fill="#0f172a" />
          <circle cx="58" cy="48" r="4" fill="#0f172a" />
          <rect x="55" y="53" width="6" height="14" fill="#0f172a" />
        </svg>
      );
    case "SPEED_BUMP":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <path d="M 25 68 Q 38 52 50 68 Q 62 52 75 68" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "NARROW_BRIDGE":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <polygon points="50,10 92,85 8,85" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
          <path d="M 30 75 L 42 55 L 42 40" fill="none" stroke="#0f172a" strokeWidth="4" />
          <path d="M 70 75 L 58 55 L 58 40" fill="none" stroke="#0f172a" strokeWidth="4" />
        </svg>
      );
    case "HOSPITAL":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <rect x="42" y="24" width="16" height="52" fill="#ffffff" rx="2" />
          <rect x="24" y="42" width="52" height="16" fill="#ffffff" rx="2" />
        </svg>
      );
    case "BUS_STOP":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <rect x="25" y="26" width="50" height="42" rx="6" fill="#ffffff" />
          <rect x="30" y="32" width="18" height="14" rx="2" fill="#0284c7" />
          <rect x="52" y="32" width="18" height="14" rx="2" fill="#0284c7" />
          <circle cx="35" cy="58" r="4" fill="#0284c7" />
          <circle cx="65" cy="58" r="4" fill="#0284c7" />
        </svg>
      );
    case "PARKING":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="70" fill="#ffffff" fontSize="56" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">P</text>
        </svg>
      );
    case "FIRST_AID":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="#059669" stroke="#ffffff" strokeWidth="3" />
          <rect x="43" y="25" width="14" height="50" fill="#ffffff" rx="2" />
          <rect x="25" y="43" width="50" height="14" fill="#ffffff" rx="2" />
        </svg>
      );
    case "FUEL":
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 drop-shadow-md">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <rect x="26" y="26" width="30" height="48" rx="4" fill="#ffffff" />
          <rect x="32" y="32" width="18" height="16" rx="2" fill="#0284c7" />
          <path d="M 58 40 L 68 40 L 68 62 L 62 68" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function RoadSignsModal({ locale, onClose }: RoadSignsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "REGULATORY" | "WARNING" | "INFORMATION">("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [studyMode, setStudyMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const counts = {
    all: ROAD_SIGNS_DATA.length,
    regulatory: ROAD_SIGNS_DATA.filter((s) => s.category === "REGULATORY").length,
    warning: ROAD_SIGNS_DATA.filter((s) => s.category === "WARNING").length,
    information: ROAD_SIGNS_DATA.filter((s) => s.category === "INFORMATION").length,
  };

  const labels = {
    title: locale === "si" ? "ශ්‍රී ලංකා මාර්ග සංඥා නාමාවලිය" : locale === "ta" ? "இலங்கை வீதி அடையாளங்கள் அடைவு" : "Sri Lanka Road Signs Directory",
    badge: locale === "si" ? "DMT නිල ප්‍රමිති අනුව" : locale === "ta" ? "DMT உத்தியோகபூர்வ தரம்" : "Official DMT Standards",
    all: locale === "si" ? "සියලු සංඥා" : locale === "ta" ? "அனைத்து" : "All Signs",
    regulatory: locale === "si" ? "නියෝග සංඥා" : locale === "ta" ? "கட்டளை" : "Regulatory",
    warning: locale === "si" ? "අනතුරු ඇඟවීම්" : locale === "ta" ? "எச்சரிக்கை" : "Warning",
    information: locale === "si" ? "තොරතුරු සංඥා" : locale === "ta" ? "தகவல்" : "Information",
    searchPlaceholder: locale === "si" ? "සංඥාවේ නම හෝ අර්ථය සොයන්න..." : locale === "ta" ? "அடையாளத்தைத் தேடுக..." : "Search by name or rule...",
    noResults: locale === "si" ? "කිසිදු සංඥාවක් සොයාගත නොහැකි විය." : locale === "ta" ? "அடையாளங்கள் எதுவும் காணப்படவில்லை." : "No signs found matching your search.",
    studyModeOn: locale === "si" ? "ස්වයං පරීක්ෂණ මාදිලිය (ක්‍රියාත්මකයි)" : "Test Yourself Mode (Active)",
    studyModeOff: locale === "si" ? "පරීක්ෂණ මාදිලිය" : "Test Yourself Mode",
    revealHint: locale === "si" ? "අර්ථය බැලීමට මෙහි ක්ලික් කරන්න" : "Click to reveal answer",
  };

  const filteredSigns = ROAD_SIGNS_DATA.filter((s) => {
    const matchesCat = selectedCategory === "ALL" || s.category === selectedCategory;
    const matchesSearch =
      s.name[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.meaning[locale].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0c0a]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl">
        <div className="bg-[#141310] text-white flex flex-col overflow-hidden max-h-[90vh] rounded-3xl border border-white/10">
          
          {/* Modal Header */}
          <div className="p-5 sm:p-6 bg-[#0d0c0a] text-white flex items-center justify-between border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#d0c5ab] font-bold uppercase tracking-wider">
                <span className="text-[#fcc438]">■</span>
                <span>[ {labels.badge} ]</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black mt-1 text-[#f5f2eb] tracking-tight">
                {labels.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {/* Study Mode Toggle Button */}
              <button
                type="button"
                onClick={() => setStudyMode(!studyMode)}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  studyMode
                    ? "bg-[#fcc438] text-[#0d0c0a] shadow-xs"
                    : "bg-[#1c1a17] text-[#a39e93] hover:text-white border border-white/10"
                }`}
                title="Toggle flashcard study mode"
              >
                {studyMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{studyMode ? labels.studyModeOn : labels.studyModeOff}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full text-[#78756c] hover:text-white hover:bg-white/5 transition-colors cursor-pointer active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Controls & Search */}
          <div className="p-4 sm:p-5 bg-[#0d0c0a]/60 border-b border-white/10 space-y-3">
            {/* Segmented Category Buttons with Counts */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "ALL"
                    ? "bg-[#d0c5ab] text-[#0d0c0a] shadow-sm"
                    : "bg-[#141310] border border-white/10 text-[#a39e93] hover:text-white hover:border-white/20"
                }`}
              >
                <span>{labels.all}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/10 text-[#f5f2eb] font-mono">
                  {counts.all}
                </span>
              </button>
              <button
                onClick={() => setSelectedCategory("REGULATORY")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "REGULATORY"
                    ? "bg-red-500 text-white shadow-sm"
                    : "bg-[#141310] border border-white/10 text-[#a39e93] hover:text-white hover:border-white/20"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{labels.regulatory}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-red-950/60 text-red-200 font-mono">
                  {counts.regulatory}
                </span>
              </button>
              <button
                onClick={() => setSelectedCategory("WARNING")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "WARNING"
                    ? "bg-[#fcc438] text-[#0d0c0a] shadow-sm"
                    : "bg-[#141310] border border-white/10 text-[#a39e93] hover:text-white hover:border-white/20"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{labels.warning}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-950/60 text-amber-200 font-mono">
                  {counts.warning}
                </span>
              </button>
              <button
                onClick={() => setSelectedCategory("INFORMATION")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "INFORMATION"
                    ? "bg-sky-500 text-white shadow-sm"
                    : "bg-[#141310] border border-white/10 text-[#a39e93] hover:text-white hover:border-white/20"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>{labels.information}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-sky-950/60 text-sky-200 font-mono">
                  {counts.information}
                </span>
              </button>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78756c]" />
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-white/10 bg-[#0d0c0a] text-[#f5f2eb] placeholder-[#78756c] focus:outline-none focus:border-[#fcc438] focus:ring-1 focus:ring-[#fcc438]/30 transition-all"
              />
            </div>
          </div>

          {/* Signs Grid */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {filteredSigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredSigns.map((sign) => {
                  const isRevealed = revealedIds[sign.id] || !studyMode;

                  return (
                    <div
                      key={sign.id}
                      onClick={() => studyMode && toggleReveal(sign.id)}
                      className={`p-4 sm:p-5 rounded-2xl border bg-[#0d0c0a] flex items-start gap-4 transition-all duration-200 ${
                        studyMode ? "cursor-pointer hover:border-[#fcc438]/60" : "hover:border-white/20"
                      } border-white/10 shadow-xs`}
                    >
                      <RenderSignGraphic type={sign.signType} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                            sign.category === "REGULATORY"
                              ? "text-red-400"
                              : sign.category === "WARNING"
                              ? "text-[#fcc438]"
                              : "text-sky-400"
                          }`}>
                            {sign.category}
                          </span>
                          {studyMode && (
                            <span className="text-[10px] text-[#fcc438] font-bold flex items-center gap-1">
                              {isRevealed ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-black text-[#f5f2eb] mt-1">
                          {sign.name[locale]}
                        </h4>

                        {isRevealed ? (
                          <p className="mt-1.5 text-xs text-[#a39e93] leading-relaxed animate-in fade-in duration-200">
                            {sign.meaning[locale]}
                          </p>
                        ) : (
                          <div className="mt-2 py-2 px-3 rounded-lg bg-[#141310] border border-white/10 text-[11px] text-[#d0c5ab] font-mono flex items-center gap-1.5">
                            <BookOpen className="w-3 h-3 text-[#fcc438]" />
                            <span>{labels.revealHint}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-[#78756c] text-xs font-semibold">
                {labels.noResults}
              </div>
            )}
          </div>

          {/* Modal Footer Tip */}
          <div className="p-3.5 bg-[#0d0c0a] border-t border-white/10 text-center text-[11px] font-mono text-[#78756c] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#fcc438]" />
            <span>Sri Lanka Department of Motor Traffic (DMT) Official Theory Test Curriculum</span>
          </div>

        </div>
      </div>
    </div>
  );
}
