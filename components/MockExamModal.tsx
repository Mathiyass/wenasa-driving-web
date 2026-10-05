"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/src/config/i18n";
import { X, CheckCircle, AlertCircle, Clock, RotateCcw, Award, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MockExamModalProps {
  locale: Locale;
  onClose: () => void;
}

interface Question {
  id: number;
  question: { en: string; si: string; ta: string };
  options: { en: string[]; si: string[]; ta: string[] };
  correctIndex: number;
  explanation: { en: string; si: string; ta: string };
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: {
      en: "What should you do when approaching a pedestrian crossing where people are waiting to cross?",
      si: "පදිකයින් පාර මාරුවීමට බලා සිටින පදික මාරුවක් වෙත ළඟාවීමේදී ඔබ කළ යුත්තේ කුමක්ද?",
      ta: "பாதசாரிகள் கடக்க காத்திருக்கும் பாதசாரி கடவையை நெருங்கும்போது நீங்கள் என்ன செய்ய வேண்டும்?",
    },
    options: {
      en: [
        "Sound the horn and maintain speed",
        "Slow down and stop completely before the white line to allow them to cross",
        "Overtake the car stopped ahead of you",
        "Wave pedestrians across while moving slowly",
      ],
      si: [
        "නාද නළාව ශබ්ද කර වේගයෙන් ඉදිරියට ධාවනය කිරීම",
        "වේගය අඩුකර පදිකයින්ට මාරුවීමට ඉඩ සලසමින් සුදු ඉරට පෙර සම්පූර්ණයෙන් නැවැත්වීම",
        "ඉදිරියෙන් නතර කර ඇති වාහනය පසුකර ඉස්සර කිරීම",
        "සෙමින් ධාවනය කරන අතරතුර පදිකයින්ට අතින් සංඥා කිරීම",
      ],
      ta: [
        "ஒலி எழுப்பி அதே வேகத்தில் செல்லுதல்",
        "வேகத்தைக் குறைத்து வெள்ளை கோட்டிற்கு முன் முற்றிலும் நிறுத்துதல்",
        "முன்னால் நிற்கும் வாகனத்தை முந்திச் செல்லுதல்",
        "வாகனம் நகரும் போதே சைகை காட்டுதல்",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Under the Sri Lanka Motor Traffic Act, drivers must give absolute priority to pedestrians at designated pedestrian crossings.",
      si: "ශ්‍රී ලංකා මෝටර් රථ පනත යටතේ පදික මාරුවකදී පදිකයින්ට පූර්ණ ප්‍රමුඛතාවය ලබාදීම රියදුරුගේ නීතිමය වගකීමකි.",
      ta: "மோட்டார் போக்குவரத்து சட்டத்தின் கீழ் பாதசாரி கடவையில் பாதசாரிகளுக்கு முழு முன்னுரிமை வழங்க வேண்டும்.",
    },
  },
  {
    id: 2,
    question: {
      en: "What is the standard national speed limit for motor cars within built-up urban municipal areas in Sri Lanka?",
      si: "ශ්‍රී ලංකාවේ නාගරික සහ ගොඩනැඟිලි සහිත ප්‍රදේශ තුළ මෝටර් කාර් රථ සඳහා උපරිම වේග සීමාව කොපමණද?",
      ta: "இலங்கையின் நகர்ப்புற எல்லைக்குள் மோட்டார் கார்களுக்கான அனுமதிக்கப்பட்ட அதிகபட்ச வேகம் யாது?",
    },
    options: {
      en: ["50 km/h", "70 km/h", "30 km/h", "60 km/h"],
      si: ["පැයට කි.මී. 50", "පැයට කි.මී. 70", "පැයට කි.මී. 30", "පැයට කි.මී. 60"],
      ta: ["மணிக்கு 50 கி.மீ.", "மணிக்கு 70 கி.மீ.", "மணிக்கு 30 கி.மீ.", "மணிக்கு 60 கி.மீ."],
    },
    correctIndex: 0,
    explanation: {
      en: "Urban standard speed limit for cars is 50 km/h, and 70 km/h in non-urban open highways unless signposted otherwise.",
      si: "ශ්‍රී ලංකාවේ නාගරික සීමාවන්හි සාමාන්‍ය උපරිම වේගය පැයට කි.මී. 50ක් වන අතර, නගරයෙන් පිටත විවෘත මාර්ගවල පැයට කි.මී. 70කි.",
      ta: "நகர்ப்புறங்களில் கார்களுக்கான அதிகபட்ச வேகம் மணிக்கு 50 கி.மீ. ஆகும்.",
    },
  },
  {
    id: 3,
    question: {
      en: "When entering a traffic roundabout in Sri Lanka, which vehicles have the right of way?",
      si: "ශ්‍රී ලංකාවේ රවුම්මංසලකට (Roundabout) ඇතුළු වීමේදී ප්‍රමුඛතාවය හිමිවන්නේ කාහටද?",
      ta: "ஒரு வட்டவடிவ சந்தியில் நுழையும் போது யாருக்கு முன்னுரிமை உண்டு?",
    },
    options: {
      en: [
        "Vehicles approaching from your left side",
        "Vehicles already circulating inside the roundabout from your right",
        "The fastest moving vehicle",
        "Vehicles traveling straight through",
      ],
      si: [
        "ඔබේ වම්පසින් පැමිණෙන වාහනවලට",
        "ඔබේ දකුණු පසින් රවුම්මංසල තුළ දැනටමත් ධාවනය වන වාහනවලට",
        "වැඩිම වේගයෙන් පැමිණෙන වාහනයට",
        "කෙලින්ම ඉදිරියට ධාවනය වන වාහනවලට",
      ],
      ta: [
        "இடதுபுறத்தில் இருந்து வரும் வாகனங்களுக்கு",
        "வலதுபுறத்தில் வட்டவடிவ சந்தியில் ஏற்கனவே சுற்றும் வாகனங்களுக்கு",
        "வேகமாக வரும் வாகனத்திற்கு",
        "நேராக செல்லும் வாகனங்களுக்கு",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Traffic inside the roundabout circulating from the right has strict right of way over vehicles joining the roundabout.",
      si: "රවුම්මංසල තුළ දකුණු පසින් ධාවනය වන වාහනවලට ප්‍රමුඛතාවය ලබාදී ඇතුළු විය යුතුය.",
      ta: "வலதுபுறத்தில் இருந்து ஏற்கனவே சுற்றும் வாகனங்களுக்கே முன்னுரிமை அளிக்க வேண்டும்.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is the minimum legal tyre tread depth requirement for passenger motor cars in Sri Lanka?",
      si: "ශ්‍රී ලංකාවේ මෝටර් කාර් රථ සඳහා ටයරයක නීත්‍යානුකූලව තිබිය යුතු අවම කට්ට ගැඹුර කොපමණද?",
      ta: "இலங்கையில் மோட்டார் கார்களுக்கான டயர் தேய்மானத்தின் குறைந்தபட்ச சட்டபூர்வ ஆழம் யாது?",
    },
    options: {
      en: ["1.6 mm", "0.5 mm", "3.0 mm", "5.0 mm"],
      si: ["මි.මී. 1.6", "මි.මී. 0.5", "මි.මී. 3.0", "මි.මී. 5.0"],
      ta: ["1.6 மி.மீ.", "0.5 மி.மீ.", "3.0 மி.மீ.", "5.0 மி.மீ."],
    },
    correctIndex: 0,
    explanation: {
      en: "Under safety inspection guidelines, tyre tread depth must not be worn below 1.6 mm across the central three-quarters of the tyre.",
      si: "නීත්‍යානුකූලව මෝටර් කාර් රථයක ටයරයක අවම ගැඹුර මිලිමීටර් 1.6 ට වඩා අඩු නොවිය යුතුය.",
      ta: "டயர் தேய்மான ஆழம் 1.6 மி.மீ.க்கு குறைவாக இருக்கக்கூடாது.",
    },
  },
];

export function MockExamModal({ locale, onClose }: MockExamModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQ = SAMPLE_QUESTIONS[currentIndex];
  const totalQuestions = SAMPLE_QUESTIONS.length;

  const handleSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    SAMPLE_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const passPercentage = Math.round((score / totalQuestions) * 100);
  const hasPassed = passPercentage >= 75;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const labels = {
    title: locale === "si" ? "DMT ආදර්ශ විභාග පද්ධතිය" : locale === "ta" ? "DMT மாதிரி தேர்வு தளம்" : "DMT Mock Examination",
    simulator: locale === "si" ? "DMT පරිගණක විභාග අනුකරණය" : locale === "ta" ? "DMT கணினி மாதிரி தேர்வு" : "DMT Written Test Simulator",
    passMark: locale === "si" ? "සමත් ලකුණු: 75%" : locale === "ta" ? "தேர்ச்சி: 75%" : "Pass mark: 75%",
    question: locale === "si" ? "ප්‍රශ්න අංක" : locale === "ta" ? "கேள்வி" : "Question",
    of: locale === "si" ? "/" : locale === "ta" ? "/" : "of",
    previous: locale === "si" ? "පෙර ප්‍රශ්නය" : locale === "ta" ? "முந்தையது" : "Previous",
    next: locale === "si" ? "මීළඟ ප්‍රශ්නය" : locale === "ta" ? "அடுத்தது" : "Next Question",
    submit: locale === "si" ? "විභාගය අවසන් කරන්න" : locale === "ta" ? "தேர்வை முடிக்க" : "Submit Test",
    retry: locale === "si" ? "නැවත උත්සාහ කරන්න" : locale === "ta" ? "மீண்டும் முயற்சி" : "Retry Test",
    close: locale === "si" ? "වසන්න" : locale === "ta" ? "மூடுக" : "Close",
    passedTitle: locale === "si" ? "සුබ පැතුම්! ඔබ සමත්!" : locale === "ta" ? "வாழ்த்துகள்! நீங்கள் தேர்ச்சி பெற்றீர்கள்!" : "Congratulations! You Passed!",
    failedTitle: locale === "si" ? "නැවත උත්සාහ කරමු! දිගටම පුහුණු වන්න" : locale === "ta" ? "தொடர்ந்து பயிற்சி செய்யுங்கள்!" : "Good Try! Keep Practicing",
    scoreText: locale === "si" ? `ඔබ ලකුණු ${totalQuestions} න් ${score} ක් ලබාගෙන ඇත (${passPercentage}%)` : `You scored ${score} out of ${totalQuestions} (${passPercentage}%)`,
    reviewHeader: locale === "si" ? "ප්‍රශ්න හා නිවැරදි පිළිතුරු විශ්ලේෂණය:" : "Review Explanations:",
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0c0a]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141310] rounded-3xl max-w-2xl w-full border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0d0c0a] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#d0c5ab] font-bold uppercase tracking-wider">
              <span className="text-[#fcc438]">■</span>
              <span>{labels.simulator}</span>
              <span className="text-white/20">·</span>
              <span className="text-[#fcc438]">{labels.passMark}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black mt-1 text-[#f5f2eb]">
              {labels.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1a17] border border-white/10 rounded-xl text-[#fcc438] font-mono text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#78756c] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="w-full bg-white/5 h-1">
            <div
              className="bg-[#fcc438] h-1 transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <div>
              {/* Question Navigation Bubbles */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5">
                {SAMPLE_QUESTIONS.map((_, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-8 h-8 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-[#d0c5ab] text-[#0d0c0a] font-black shadow-md scale-105"
                          : isAnswered
                          ? "bg-[#1c1a17] text-[#d0c5ab] border border-white/15"
                          : "bg-white/5 text-[#78756c] hover:bg-white/10 hover:text-white border border-transparent"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Current Question */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d0c5ab]">
                  [ {labels.question} {currentIndex + 1} {labels.of} {totalQuestions} ]
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#f5f2eb] leading-snug">
                  {currentQ.question[locale]}
                </h4>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options[locale].map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(optIdx)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? "border-[#fcc438] bg-[#fcc438]/10 text-[#f5f2eb] shadow-sm"
                            : "border-white/10 hover:bg-white/5 text-[#a39e93] hover:text-[#f5f2eb]"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs shrink-0 mt-0.5 font-mono font-bold ${
                            isSelected
                              ? "border-[#fcc438] bg-[#fcc438] text-[#0d0c0a] font-black"
                              : "border-white/15 text-[#78756c]"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-6">
              <div
                className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg ${
                  hasPassed
                    ? "bg-[#fcc438]/10 text-[#fcc438] border border-[#fcc438]/30"
                    : "bg-white/5 text-[#d0c5ab] border border-white/10"
                }`}
              >
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-[#f5f2eb]">
                  {hasPassed ? labels.passedTitle : labels.failedTitle}
                </h4>
                <p className="text-sm font-mono font-semibold text-[#d0c5ab] mt-2">
                  {labels.scoreText}
                </p>
                <p className="text-xs text-[#78756c] mt-1">
                  Official DMT examination pass standard is 30 out of 40 (75%).
                </p>
              </div>

              {/* Review Answers */}
              <div className="text-left space-y-3 pt-4 border-t border-white/10">
                <div className="text-[11px] font-mono font-bold text-[#d0c5ab] uppercase tracking-wider">
                  [ {labels.reviewHeader} ]
                </div>
                {SAMPLE_QUESTIONS.map((q, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border text-xs ${
                        isCorrect
                          ? "border-[#fcc438]/30 bg-[#fcc438]/5"
                          : "border-red-500/30 bg-red-500/5"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-[#fcc438] shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-bold text-[#f5f2eb]">
                            {idx + 1}. {q.question[locale]}
                          </div>
                          <div className="mt-1 text-[#a39e93]">
                            Correct: <span className="font-bold text-[#fcc438]">{q.options[locale][q.correctIndex]}</span>
                          </div>
                          <div className="mt-1 text-[11px] text-[#78756c] italic">
                            {q.explanation[locale]}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-[#0d0c0a] border-t border-white/10 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-[#78756c] hover:text-[#f5f2eb] disabled:opacity-30 cursor-pointer"
              >
                {labels.previous}
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#d0c5ab] hover:bg-[#e4dcce] text-[#0d0c0a] rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    <span>{labels.next}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-5 py-2.5 bg-[#fcc438] hover:bg-[#fed36a] text-[#0d0c0a] rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    {labels.submit}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setIsSubmitted(false);
                  setCurrentIndex(0);
                  setSecondsRemaining(600);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#a39e93] hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{labels.retry}</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#d0c5ab] hover:bg-[#e4dcce] text-[#0d0c0a] rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                {labels.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
