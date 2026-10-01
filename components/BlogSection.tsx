"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { BookOpen, Calendar, Clock, ArrowRight, X } from "lucide-react";

interface BlogSectionProps {
  locale: Locale;
}

interface Article {
  id: string;
  slug: string;
  title: { en: string; si: string; ta: string };
  excerpt: { en: string; si: string; ta: string };
  readTime: string;
  publishedDate: string;
  category: string;
  content: { en: string[]; si: string[]; ta: string[] };
}

const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "sri-lankan-driving-licence-complete-guide",
    title: {
      en: "The Complete Step-by-Step Guide to Getting a Sri Lankan Driving Licence",
      si: "ශ්‍රී ලංකාවේ රියැදුරු බලපත්‍රයක් ලබාගැනීමේ පූර්ණ මඟපෙන්වීම",
      ta: "இலங்கையில் சாரதி அனுமதிப்பத்திரம் பெறுவதற்கான முழுமையான வழிகாட்டி",
    },
    excerpt: {
      en: "From scheduling your NTMI medical fitness screening to taking your practical trial with examiner confidence.",
      si: "NTMI වෛද්‍ය පරීක්ෂණයේ සිට අවසන් ප්‍රායෝගික ට්‍රයල් පරීක්ෂණය දක්වා දැනගත යුතු සියලු කරුණු.",
      ta: "NTMI மருத்துவ பரிசோதனை முதல் நடைமுறை சோதனை வரை நீங்கள் தெரிந்து கொள்ள வேண்டிய அனைத்தும்.",
    },
    readTime: "6 min read",
    publishedDate: "2026-09-20",
    category: "Licensing Guide",
    content: {
      en: [
        "Obtaining your driving licence in Sri Lanka is a proud milestone, but navigating government processes without guidance can lead to unexpected delays. The process starts with obtaining your official medical fitness certificate from the National Transport Medical Institute (NTMI).",
        "Once your medical is secured, applicants visit the Department of Motor Traffic (DMT) for biometrics and application processing. Passing the 40-question written theory exam earns you the official Learner's Permit (L-Plate).",
        "Sri Lankan regulations mandate a continuous holding period (typically 3 months) before you are permitted to sit for the practical trial. During this window, rigorous dual-control practice at a certified school like Wenasa ensures you develop defensive reflexes and pass on your very first attempt.",
      ],
      si: [
        "ශ්‍රී ලංකාවේ රියැදුරු බලපත්‍රයක් ලබාගැනීම සෑම අයෙකුගේම ජීවිතයේ වැදගත් සන්ධිස්ථානයකි. පළමුවෙන්ම ජාතික ප්‍රවාහන වෛද්‍ය ආයතනයෙන් (NTMI) වලංගු ශාරීරික යෝග්‍යතා සහතිකය ලබාගත යුතුය.",
        "ඉන්පසු මෝටර් රථ දෙපාර්තමේන්තුවේ (DMT) ලියාපදිංචි වී බහුවරණ ප්‍රශ්න 40 කින් යුත් ලිඛිත විභාගයට පෙනී සිටිය යුතුය. 40න් 30ක් නිවැරදිව පිළිතුරු සපයා සමත් වූ පසු ඔබට මාස 6ක් වලංගු 'L' තහඩු සහිත පුහුණුවන්නන්ගේ බලපත්‍රය ලැබේ.",
        "නියාමන නීති අනුව මාස 3ක කාලයක් බලපත්‍රය ළඟ තබාගෙන ද්විත්ව පාලක රථයකින් ප්‍රායෝගික පුහුණුව නිමකළ පසු දිස්ත්‍රික් ට්‍රයල් විභාගයට පෙනී සිට නිල බලපත්‍රය ලබාගත හැක.",
      ],
      ta: [
        "இலங்கையில் சாரதி அனுமதிப்பத்திரம் பெறுவது ஒரு முக்கியமான படியாகும். முதலில் NTMI மருத்துவ சான்றிதழைப் பெற வேண்டும்.",
        "பின்னர் DMT கணினி தேர்வில் 40 கேள்விகளில் 30க்கு சரியாக விடையளித்து தேர்ச்சி பெற வேண்டும்.",
      ],
    },
  },
  {
    id: "art-2",
    slug: "pass-dmt-written-exam-first-try",
    title: {
      en: "How to Pass the DMT Theory Exam on Your First Attempt",
      si: "DMT න්‍යායාත්මක විභාගය පළමු උත්සාහයෙන්ම සමත්වන්නේ කෙසේද?",
      ta: "DMT எழுத்துத் தேர்வில் முதல் முயற்சியிலேயே தேர்ச்சி பெறுவது எப்படி?",
    },
    excerpt: {
      en: "Insider tips on high-yield question categories: road signs, right-of-way priority rules, and vehicle safety.",
      si: "මාර්ග සංඥා, ප්‍රමුඛතා නීති සහ රියදුරු ආරක්ෂාව පිළිබඳ නිතර අසන ප්‍රශ්න නිවැරදිව හඳුනාගැනීම.",
      ta: "வீதி அடையாளங்கள் மற்றும் பாதுகாப்பு விதிகள் பற்றிய முக்கிய குறிப்புகள்.",
    },
    readTime: "5 min read",
    publishedDate: "2026-09-18",
    category: "Exam Preparation",
    content: {
      en: [
        "The DMT written examination comprises 40 multiple-choice questions with a pass threshold of 30 correct answers (75%). Candidates are allotted 60 minutes.",
        "The highest concentration of questions originates from three domains: (1) Regulatory and Warning Road Signs, (2) Right-of-Way priority at roundabouts and T-junctions, and (3) Vehicle lane discipline.",
        "At Wenasa Driving School, we provide interactive mock exam papers modeled directly after the computerized testing terminal, guaranteeing high familiarity before test day.",
      ],
      si: [
        "DMT පරිගණක විභාගයේ ප්‍රශ්න 40ක් ඇති අතර ඉන් 30ක් (75%) නිවැරදිව පිළිතුරු සපයා සමත් විය යුතුය.",
        "වැඩිම ලකුණු සංඛ්‍යාවක් හිමිවන්නේ නියෝග හා අනතුරු ඇඟවීමේ මාර්ග සංඥා, රවුම්මංසල ප්‍රමුඛතා නීති සහ මංතීරු විනය පිළිබඳ ප්‍රශ්න සඳහාය.",
      ],
      ta: [
        "DMT தேர்வில் 40 வினாக்களுக்கு 30 சரியான விடைகள் தேவை.",
      ],
    },
  },
  {
    id: "art-3",
    slug: "mastering-sri-lankan-road-signs",
    title: {
      en: "Mastering Sri Lankan Road Signs: Priority, Warning & Regulatory",
      si: "ශ්‍රී ලංකාවේ මාර්ග සංඥා නිවැරදිව හඳුනාගනිමු",
      ta: "இலங்கை வீதி அடையாளங்களை சரியாக அறிந்துகொள்வோம்",
    },
    excerpt: {
      en: "Understand the visual shapes, color codes, and legal mandates behind Sri Lanka's road signage system.",
      si: "වෘත්තාකාර, ත්‍රිකෝණාකාර සහ චතුරස්‍රාකාර මාර්ග සංඥාවල අර්ථයන් පහසුවෙන් මතක තබාගන්නා ක්‍රම.",
      ta: "வட்ட, முக்கோண மற்றும் சதுர அடையாளங்களின் அர்த்தங்களை எளிதாக நினைவில் கொள்வது.",
    },
    readTime: "4 min read",
    publishedDate: "2026-09-15",
    category: "Road Safety",
    content: {
      en: [
        "Road signs in Sri Lanka follow international standards: Red circles indicate Prohibitions or Mandatory limits (Stop, No Entry, Speed Limit).",
        "Red-bordered triangles signify Danger Warnings (Pedestrian crossing ahead, sharp bend, slippery surface). Blue or green rectangles denote informative guidance.",
      ],
      si: [
        "රතු පැහැති වෘත්තාකාර සංඥා මඟින් නියෝග හා තහනම් කිරීම් දක්වයි (Stop, No Entry, වේග සීමා).",
        "රතු මායිමක් සහිත ත්‍රිකෝණාකාර සංඥා මඟින් ඉදිරියෙන් ඇති අනතුරු ඇඟවීම් නිරූපණය කරයි.",
      ],
      ta: [
        "சிவப்பு வட்டங்கள் தடைகளை குறிக்கின்றன, முக்கோணங்கள் எச்சரிக்கைகளை குறிக்கின்றன.",
      ],
    },
  },
  {
    id: "art-4",
    slug: "dmt-practical-trial-day-checklist",
    title: {
      en: "DMT Practical Trial Day: What Examiners Watch For",
      si: "ට්‍රයල් විභාග දවසේ පරීක්ෂකවරුන් වැඩිපුරම බලන දේවල්",
      ta: "நடைமுறை சோதனை நாளில் பரீட்சகர்கள் கவனிக்கும் விடயங்கள்",
    },
    excerpt: {
      en: "Mirror checks, smooth clutch releases, handbrake application, and clear 30-meter indicator signaling.",
      si: "කණ්ණාඩි බැලීම, හෑන්ඩ්බ්‍රේක් නිවැරදිව භාවිතය සහ සංඥා ලාම්පු නිවැරදි දුරින් දැල්වීම පිළිබඳ උපදෙස්.",
      ta: "கண்ணாடிகளை கவனித்தல் மற்றும் சிக்னல் போடுதல் பற்றிய முக்கிய ஆலோசனைகள்.",
    },
    readTime: "7 min read",
    publishedDate: "2026-09-10",
    category: "Practical Driving",
    content: {
      en: [
        "Practical test examiners look for disciplined habits rather than flashy speed. Always exaggerate head checks when looking at side mirrors.",
        "Never forget to apply the handbrake and return the gear lever to neutral whenever the vehicle comes to a complete standstill.",
      ],
      si: [
        "පරීක්ෂක නිලධාරීන් මූලිකවම නිරීක්ෂණය කරන්නේ ඔබේ විනය සහ ආරක්ෂිත පුරුදුයි. කණ්ණාඩි බලන විට හිස හරවා බලන්න.",
        "වාහනය සම්පූර්ණයෙන්ම නතර කරන සෑම අවස්ථාවකම Handbrake යෙදීම සහ Neutral කිරීම අත්‍යවශ්‍ය වේ.",
      ],
      ta: [
        "வாகனத்தை நிறுத்தும் போதெல்லாம் ஹேண்ட்பிரேக் போட மறக்காதீர்கள்.",
      ],
    },
  },
];

export function BlogSection({ locale }: BlogSectionProps) {
  const dict = getDictionary(locale);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <>
      <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              Driver Education Hub
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
              Expert Guides & Test Preparation Articles
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Clear, practical advice written by certified instructors to help you master Sri Lankan road regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.map((art) => (
              <div
                key={art.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {art.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {art.title[locale]}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {art.excerpt[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{art.publishedDate}</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(art)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase">
                <BookOpen className="w-4 h-4" />
                <span>{activeArticle.category}</span>
              </div>
              <button onClick={() => setActiveArticle(null)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {activeArticle.title[locale]}
              </h3>
              <div className="text-xs text-slate-400 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span>By Wenasa Senior Driving Faculty</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
                <span>·</span>
                <span>{activeArticle.publishedDate}</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                {activeArticle.content[locale].map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
