"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/src/config/i18n";
import { X, Play, Clock, CheckCircle2, ChevronRight, AlertCircle, Sparkles, BookOpen } from "lucide-react";

interface VideoLessonsModalProps {
  locale: Locale;
  onClose: () => void;
}

const lessons = {
  en: [
    {
      id: "lesson-1",
      title: "Mastering the Clutch Bite Point & Hill Start",
      duration: "14:20",
      level: "Beginner · Manual Transmission",
      thumbnail: "/images/blog/licence-guide-cover.jpg",
      summary: "Learn how to find the exact clutch friction zone, balance throttle pressure, and execute flawless handbrake-assisted hill starts without rolling back or stalling.",
      checkpoints: [
        "Finding the vibration point with left foot feathering",
        "Setting throttle to 1,500-2,000 RPM before releasing handbrake",
        "Coordinating handbrake release with pedal bite hold",
        "Common mistakes that cause engine stalling on DMT trial ramps",
      ],
      instructorTip: "Examiner Tip: Keep your foot steady on the clutch bite for 2 full car-lengths before releasing it completely.",
    },
    {
      id: "lesson-2",
      title: "DMT Standard Parallel Parking & 3-Point Turn",
      duration: "18:45",
      level: "Intermediate · Practical Trial",
      thumbnail: "/images/blog/trial-mistakes.jpg",
      summary: "Comprehensive breakdown of the exact spatial reference markers used by DMT examiners to evaluate parallel parking between flags and narrow 3-point road turns.",
      checkpoints: [
        "Aligning side mirrors with the lead curb marker",
        "Full left lock into 45-degree approach line",
        "Straightening wheels until front bumper clears rear bumper line",
        "Final right lock curb tuck within 30cm of the pavement",
      ],
      instructorTip: "Examiner Tip: Always perform physical over-the-shoulder blind spot checks before changing steering lock direction.",
    },
    {
      id: "lesson-3",
      title: "Navigating the Official DMT Reverse 'S' Track",
      duration: "12:10",
      level: "Advanced · Trial Specific",
      thumbnail: "/images/blog/defensive-driving.jpg",
      summary: "Master the most feared segment of the Sri Lankan practical driving exam. Complete visual guide on pivot points, mirror sweeps, and speed control.",
      checkpoints: [
        "Crawling speed management using pure clutch control",
        "Reading the rear window marker against the inner apex pole",
        "Timing the reverse swing transition from left to right curve",
        "Recovering alignment without touching corner boundary flags",
      ],
      instructorTip: "Examiner Tip: If your car speed increases, depress clutch slightly — do not jab the footbrake violently.",
    },
  ],
  si: [
    {
      id: "lesson-1",
      title: "ක්ලච් බයිට් පොයින්ට් පාලනය සහ කන්දක නැවැත්වීම",
      duration: "විනාඩි 14:20",
      level: "ආරම්භක · මැනුවල් ගියර් පද්ධතිය",
      thumbnail: "/images/blog/licence-guide-cover.jpg",
      summary: "ක්ලච් එක නිවැරදිව සමබර කර එන්ජිම නොනවත්වා, අත් තිරිංගය (Handbrake) ආධාරයෙන් රථය ආපස්සට නොයවා කන්දක ආරම්භ කරන ආකාරය පියවරෙන් පියවර ඉගෙන ගන්න.",
      checkpoints: [
        "වම් පාදයෙන් ක්ලච් කම්පන ස්ථානය (Bite Point) හඳුනාගැනීම",
        "හෑන්ඩ්බ්‍රේක් මුදාහැරීමට පෙර 1,500-2,000 RPM අතර ඇක්සලරේටරය රඳවා ගැනීම",
        "හෑන්ඩ්බ්‍රේක් පහත් කිරීම සහ ක්ලච් පාලනය සමපාත කිරීම",
        "ට්‍රයල් කන්දේදී එන්ජිම ක්‍රියාවිරහිත වීමට බලපාන ප්‍රධාන වැරදි",
      ],
      instructorTip: "විභාග උපදෙස: ක්ලච් එක මුළුමනින්ම මුදාහැරීමට පෙර රථය ඉදිරියට මීටර් 2-3ක් යනතුරු ක්ලච් බයිට් එකෙහි රඳවා ගන්න.",
    },
    {
      id: "lesson-2",
      title: "සමාන්තර පාක් කිරීම සහ පාරේ හරවා ගැනීම (3-Point Turn)",
      duration: "විනාඩි 18:45",
      level: "මධ්‍යම · ප්‍රායෝගික ට්‍රයල් පරීක්ෂණය",
      thumbnail: "/images/blog/trial-mistakes.jpg",
      summary: "DMT විභාග කොන්දේසි යටතේ නිවැරදි සලකුණු උපයෝගී කරගනිමින් කණු ස්පර්ශ නොකර නියමිත ඉඩෙහි රථය පාක් කරන ආකාරය.",
      checkpoints: [
        "පළමු කණුව හා පැති කන්නාඩිය සමපාත කිරීම",
        "සුක්කානම සම්පූර්ණයෙන් වමට කපා අංශක 45 කෝණයට ගැනීම",
        "ඉදිරිපස රථය මගහැරෙන තෙක් රෝද කෙළින් කර ආපස්සට ගැනීම",
        "අවසන් වශයෙන් දකුණට හරවා පදික වේදිකාවට සෙන්ටිමීටර් 30ක් ඇතුළත ස්ථානගත කිරීම",
      ],
      instructorTip: "විභාග උපදෙස: සුක්කානම හරවන සෑම අවස්ථාවකම දෙපස සහ පිටුපස හොඳින් පරීක්ෂා කිරීමට අමතක නොකරන්න.",
    },
    {
      id: "lesson-3",
      title: "නිල DMT ආපසු හැරවීමේ 'S' ධාවන පථය ජයගැනීම",
      duration: "විනාඩි 12:10",
      level: "උසස් · ප්‍රායෝගික ට්‍රයල් පරීක්ෂණය",
      thumbnail: "/images/blog/defensive-driving.jpg",
      summary: "DMT ප්‍රායෝගික පරීක්ෂණයේ වඩාත්ම අභියෝගාත්මක 'S' ආපසු ධාවන පථය කණු නොබිඳ සාර්ථකව නිමකිරීමට අවශ්‍ය උපදෙස්.",
      checkpoints: [
        "ක්ලච් එක පමණක් භාවිතයෙන් රථයේ වේගය අවම මට්ටමක පාලනය",
        "පිටුපස වීදුරුවේ සලකුණ සහ ඇතුළත කණුව කෝණගත කිරීම",
        "වම් වක්‍රයේ සිට දකුණු වක්‍රයට මාරුවීමේ නිවැරදි කාලය",
        "සීමා මායිම් ධජ ස්පර්ශ නොකර අවසන් සීමාවට පැමිණීම",
      ],
      instructorTip: "විභාග උපදෙස: රථයේ වේගය වැඩිවන විට ක්ලච් එක මදක් පාගන්න — එකවර තිරිංග (Brake) තදින් නොපාගන්න.",
    },
  ],
  ta: [
    {
      id: "lesson-1",
      title: "கிளட்ச் கன்ட்ரோல் மற்றும் மலையுச்சி தொடக்கம்",
      duration: "14:20 நிமிடங்கள்",
      level: "தொடக்க நிலை · மெனுவல்",
      thumbnail: "/images/blog/licence-guide-cover.jpg",
      summary: "வாகனம் பின்னோக்கி நகராமல் மலையுச்சியில் இருந்து மென்மையாக வாகனத்தை இயக்குவதற்கான முழுமையான பயிற்சி வழிகாட்டி.",
      checkpoints: [
        "கிளட்ச் பைட் பாயிண்ட் (Bite Point) கண்டறிதல்",
        "ஹேண்ட்பிரேக் இறக்குவதற்கு முன் சரியான ஆக்சிலரேட்டர் சமநிலை",
        "என்ஜின் நிற்காமல் நகர்த்துவதற்கான நுட்பங்கள்",
        "DMT சோதனையில் அடிக்கடி நிகழும் தவறுகளை தவிர்த்தல்",
      ],
      instructorTip: "பரீட்சை குறிப்பு: கிளட்ச்சை மெதுவாக விடுவித்து வாகனம் முன்னோக்கி நகரும் வரை அதே நிலையில் வைத்திருங்கள்.",
    },
    {
      id: "lesson-2",
      title: "DMT இணையான பார்க்கிங் மற்றும் 3-பாயிண்ட் திருப்பம்",
      duration: "18:45 நிமிடங்கள்",
      level: "நடுத்தர நிலை · செய்முறை சோதனை",
      thumbnail: "/images/blog/trial-mistakes.jpg",
      summary: "DMT செய்முறைப் பரீட்சையில் கேட்கப்படும் துல்லியமான பார்க்கிங் செய்முறை வழிகாட்டல்.",
      checkpoints: [
        "பக்கவாட்டு கண்ணாடிகளை சீரமைத்தல்",
        "45 பாகை கோணத்தில் ஸ்டீயரிங் திருப்புதல்",
        "கம்பங்களை தொடாமல் வாகனத்தை உள்ளே செலுத்துதல்",
        "நடைபாதைக்கு அருகில் துல்லியமாக நிறுத்துதல்",
      ],
      instructorTip: "பரீட்சை குறிப்பு: ஸ்டீயரிங் திருப்பும்போது எப்போதும் தோள்பட்டைக்கு மேல் திரும்பிப் பார்க்க மறக்காதீர்கள்.",
    },
    {
      id: "lesson-3",
      title: "DMT ரிவர்ஸ் 'S' பாதையை கடத்தல்",
      duration: "12:10 நிமிடங்கள்",
      level: "உயர் நிலை · செய்முறைப் பரீட்சை",
      thumbnail: "/images/blog/defensive-driving.jpg",
      summary: "செய்முறைப் பரீட்சையின் மிகக் கடினமான 'S' ரிவர்ஸ் தடத்தை இலகுவாகக் கடப்பதற்கான செய்முறை.",
      checkpoints: [
        "மிகக் குறைந்த வேகத்தில் கிளட்ச் இயக்கம்",
        "உட்புற கம்பங்களை மையப்படுத்தி திரும்புதல்",
        "சரியான தருணத்தில் ஸ்டீயரிங் மாற்றுதல்",
        "எல்லைக் கம்பங்களைத் தொடாமல் வெளியேறுதல்",
      ],
      instructorTip: "பரீட்சை குறிப்பு: வேகம் கூடும் போது கிளட்சை லேசாக அழுத்துங்கள் — திடீர் பிரேக் அடிக்காதீர்கள்.",
    },
  ],
};

const labels = {
  en: {
    headerBadge: "DMT Practical Masterclass Series",
    title: "Practical Trial Video Lessons",
    subtitle: "High-definition instructional tutorials filmed on actual DMT testing circuits in Gampaha and Werahera.",
    playPreview: "Playing Demonstration",
    keyCheckpoints: "Essential Test Checkpoints",
    close: "Close Window",
    needSupport: "Need one-on-one behind-the-wheel coaching? Book a session at our Kirindiwela practice track.",
    bookTrial: "Book Track Practice Session",
  },
  si: {
    headerBadge: "DMT ප්‍රායෝගික පුහුණු වීඩියෝ මාලාව",
    title: "ප්‍රායෝගික ට්‍රයල් විභාග වීඩියෝ පාඩම්",
    subtitle: "ගම්පහ සහ වේරහැර DMT නිල පරීක්ෂණ ධාවන පථ ආශ්‍රිතව සකස් කළ සවිස්තරාත්මක පුහුණු වීඩියෝ මාලාව.",
    playPreview: "වීඩියෝ පෙරදසුන",
    keyCheckpoints: "විභාගයේදී පරීක්ෂා කරන ප්‍රධාන කරුණු",
    close: "වසන්න",
    needSupport: "පෞද්ගලික පුහුණුකරුවෙකු සමග පුහුණුවීමට අවශ්‍යද? කිරිඳිවැල අපගේ පුහුණු ධාවන පථයේ වෙලාවක් වෙන්කරවා ගන්න.",
    bookTrial: "පුහුණු සැසියක් වෙන්කරගන්න",
  },
  ta: {
    headerBadge: "DMT செய்முறைப் பயிற்சி தொடர்",
    title: "செய்முறைப் பரீட்சை வீடியோ பாடங்கள்",
    subtitle: "கம்பஹா மற்றும் வேரஹெர DMT களங்களில் பதிவுசெய்யப்பட்ட பிரத்தியேக செய்முறை வழிகாட்டிகள்.",
    playPreview: "வீடியோ முன்னோட்டம்",
    keyCheckpoints: "முக்கிய பரீட்சை புள்ளிகள்",
    close: "மூடுக",
    needSupport: "நேரடி தனிப்பயிற்சி தேவையா? கිරිந்திவெல பயிற்சி களத்தில் ஒரு அமர்வை முன்பதிவு செய்யுங்கள்.",
    bookTrial: "பயிற்சியை முன்பதிவு செய்க",
  },
};

export function VideoLessonsModal({ locale, onClose }: VideoLessonsModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const t = labels[locale] || labels.en;
  const lessonList = lessons[locale] || lessons.en;
  const current = lessonList[selectedIdx] || lessonList[0];

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
              <span>{t.headerBadge}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#f5f2eb] tracking-tight">
              {t.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#a8a295] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Video Viewport Mockup */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0c0a] shadow-inner aspect-video flex flex-col justify-between p-4 sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/60 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#d0c5ab] text-[#0d0c0a] text-[11px] font-mono font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow-md">
                <Play className="w-3 h-3 fill-current" />
                <span>{t.playPreview}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#141310]/90 backdrop-blur-md border border-white/10 text-[#d0c5ab] text-xs font-mono font-bold flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#fcc438]" />
                <span>{current.duration}</span>
              </span>
            </div>

            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#fcc438] font-bold block mb-1">
                {current.level}
              </span>
              <h4 className="text-lg sm:text-2xl font-black text-[#f5f2eb] tracking-tight">
                {current.title}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm text-[#a39e93] leading-relaxed max-w-2xl">
                {current.summary}
              </p>
            </div>

            {/* Play Bar Mockup */}
            <div className="relative z-10 pt-3">
              <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                <div className="bg-[#fcc438] h-full w-2/5 rounded-full" />
              </div>
            </div>
          </div>

          {/* Lesson Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lessonList.map((lesson, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    active 
                      ? "bg-[#fcc438]/10 border-[#fcc438] text-[#f5f2eb] shadow-md" 
                      : "bg-[#0d0c0a] border-white/10 text-[#a39e93] hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#d0c5ab]">
                      Lesson {idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-[#a8a295]">{lesson.duration}</span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold line-clamp-2 leading-snug">
                    {lesson.title}
                  </h5>
                </button>
              );
            })}
          </div>

          {/* Checkpoints & Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0d0c0a] border border-white/10">
              <h5 className="text-xs sm:text-sm font-black text-[#f5f2eb] flex items-center gap-2 mb-3.5 font-mono uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#fcc438]" />
                <span>[ {t.keyCheckpoints} ]</span>
              </h5>
              <ul className="space-y-2.5">
                {current.checkpoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#a39e93]">
                    <span className="w-4 h-4 rounded-full bg-[#fcc438]/15 text-[#fcc438] font-bold text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#1c1a17] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#fcc438] uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Pro Examiner Tip</span>
                </div>
                <p className="text-xs text-[#d0c5ab] leading-relaxed italic">
                  &ldquo;{current.instructorTip}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-[#a8a295] font-mono">
                Wenasa Master Driving Academy · Kirindiwela
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#0d0c0a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-[#a8a295] text-center sm:text-left text-[11px] sm:text-xs">
            {t.needSupport}
          </p>
          <a
            href="https://wa.me/94707076029?text=Hello%20Wenasa,%20I%20would%20like%20to%20book%20a%20track%20practice%20session%20at%20Kirindiwela."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#d0c5ab] hover:bg-[#e4dcce] text-[#0d0c0a] font-mono font-bold uppercase tracking-wider cursor-pointer transition-all active:scale-95 shadow-md"
          >
            <span>{t.bookTrial}</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
