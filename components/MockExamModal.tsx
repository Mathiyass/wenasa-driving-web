"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/src/config/i18n";
import { X, CheckCircle, AlertCircle, Clock, RotateCcw, Award } from "lucide-react";

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

// 10 Sample high-yield questions flagged "sample, verify before publishing"
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
        "ඔබේ දකුණු පසින් දැනටමත් රවුම්මංසල තුළ ධාවනය වන වාහනවලට",
        "වේගයෙන් ධාවනය වන වාහනයට",
        "කෙළින්ම ඉදිරියට ගමන් කරන වාහනවලට",
      ],
      ta: [
        "உங்கள் இடதுபுறத்தில் இருந்து வரும் வாகனங்களுக்கு",
        "உங்கள் வலதுபுறத்தில் ஏற்கனவே சுற்றிக்கொண்டிருக்கும் வாகனங்களுக்கு",
        "வேகமாக வரும் வாகனத்திற்கு",
        "நேராக செல்லும் வாகனத்திற்கு",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Sri Lanka follows left-hand traffic; at roundabouts, priority must always be given to traffic approaching from your immediate right.",
      si: "ශ්‍රී ලංකාව වමෙන් ධාවනය වන රටක් බැවින්, රවුම්මංසලකදී සැමවිටම ඔබේ දකුණු පසින් එන වාහනවලට ප්‍රමුඛතාවය දිය යුතුය.",
      ta: "இலங்கையில் வட்டவடிவ சந்திகளில் வலதுபுறத்தில் இருந்து வரும் போக்குவரத்துக்கு முன்னுரிமை அளிக்கப்பட வேண்டும்.",
    },
  },
  {
    id: 4,
    question: {
      en: "What does a solid single unbroken white line along the center of the road indicate?",
      si: "මාර්ගය මැද ඇති නොකැඩුණු තනි සුදු ඉරකින් (Single Continuous White Line) අදහස් වන්නේ කුමක්ද?",
      ta: "வீதியின் நடுவே உள்ள தொடர்ச்சியான வெள்ளை கோடு எதனை குறிக்கிறது?",
    },
    options: {
      en: [
        "You may overtake if the road ahead is clear",
        "You must never cross or straddle the line to overtake",
        "Parking is permitted along the edge",
        "Speed limit increases after this line",
      ],
      si: [
        "ඉදිරියෙන් මාර්ගය පැහැදිලි නම් ඉස්සර කළ හැක",
        "ඉස්සර කිරීම සඳහා කිසිවිටෙකත් එම ඉර කැපීම හෝ ඉර මතින් ධාවනය නොකළ යුතුය",
        "මාර්ගය අයිනේ වාහන නැවැත්විය හැක",
        "වේග සීමාව වැඩි කළ හැක",
      ],
      ta: [
        "முன்னால் வீதி தெளிவாக இருந்தால் முந்தலாம்",
        "முந்துவதற்காக ஒருபோதும் கோட்டை தாண்டவோ அல்லது அதன் மேல் செல்லவோ கூடாது",
        "நிறுத்துவதற்கு அனுமதிக்கப்பட்டுள்ளது",
        "வேகத்தை அதிகரிக்கலாம்",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "A continuous center white line strictly prohibits crossing or straddling for overtaking due to restricted visibility or hazard ahead.",
      si: "නොකැඩුණු සුදු ඉරක් ඇති ස්ථානයක අනතුරුදායක බව නිසා කිසිසේත්ම ඉස්සර කිරීමට ඉර කැපීම තහනම්ය.",
      ta: "தொடர்ச்சியான வெள்ளை கோடு முந்துவதை முற்றாக தடை செய்கிறது.",
    },
  },
  {
    id: 5,
    question: {
      en: "What is the minimum legal tread depth requirement for motor car tyres in Sri Lanka?",
      si: "ශ්‍රී ලංකාවේ මෝටර් කාර් රථයක ටයර් සඳහා අවශ්‍ය අවම නීත්‍යානුකූල මට්ටම (Tread Depth) කොපමණද?",
      ta: "மோட்டார் கார் டயர்களுக்கான குறைந்தபட்ச சட்டபூர்வ ஆழம் (Tread depth) எவ்வளவு?",
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
  const hasPassed = passPercentage >= 75; // 75% pass mark

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase">
              <span>DMT Written Test Simulator</span>
              <span aria-hidden="true">·</span>
              <span>Pass mark: 75%</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-white">
              {locale === "si" ? "DMT ආදර්ශ විභාග පද්ධතිය" : locale === "ta" ? "DMT மாதிரி தேர்வு தளம்" : "DMT Mock Examination"}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg text-amber-400 font-mono text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Sample disclaimer banner */}
          <div className="mb-4 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Sample interactive questions based on Sri Lankan DMT syllabus (verify before publishing).</span>
          </div>

          {!isSubmitted ? (
            <div>
              {/* Question Navigation Bubbles */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4">
                {SAMPLE_QUESTIONS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 rounded-md text-xs font-bold shrink-0 transition-colors ${
                      idx === currentIndex
                        ? "bg-emerald-600 text-white"
                        : selectedAnswers[idx] !== undefined
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Current Question */}
              <div className="space-y-4">
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Question {currentIndex + 1} of {totalQuestions}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {currentQ.question[locale]}
                </h4>

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options[locale].map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                            isSelected
                              ? "border-emerald-600 bg-emerald-600 text-white font-bold"
                              : "border-slate-400"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
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
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
                  hasPassed
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                }`}
              >
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {hasPassed ? "Congratulations! You Passed!" : "Good Try! Keep Practicing"}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  You scored <span className="font-bold text-slate-900 dark:text-white">{score}</span> out of{" "}
                  {totalQuestions} ({passPercentage}%).
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Official DMT pass requirement is 30 out of 40 (75%).
                </p>
              </div>

              {/* Review Answers Accordion */}
              <div className="text-left space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Review Explanations:
                </div>
                {SAMPLE_QUESTIONS.map((q, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border text-xs ${
                        isCorrect
                          ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20"
                          : "border-red-200 bg-red-50/50 dark:bg-red-950/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {idx + 1}. {q.question[locale]}
                          </div>
                          <div className="mt-1 text-slate-600 dark:text-slate-300">
                            Correct: <span className="font-semibold">{q.options[locale][q.correctIndex]}</span>
                          </div>
                          <div className="mt-1 text-[11px] text-slate-500 italic">
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
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 disabled:opacity-30"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-800"
                  >
                    Submit Test
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
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Test</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
              >
                Close Simulator
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
