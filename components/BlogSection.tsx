"use client";

import { useState } from "react";
import Image from "next/image";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  imageSrc: string;
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
    imageSrc: "/images/blog/licence-guide-cover.jpg",
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
        "நடைமுறைப் பயிற்சியை முடித்த பின்னர் உத்தியோகபூர்வ சோதனைக்கு தோற்றி அனுமதிப்பத்திரத்தைப் பெற்றுக் கொள்ளலாம்.",
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
    imageSrc: "/images/blog/exam-prep-cover.jpg",
    content: {
      en: [
        "The DMT written examination comprises 40 multiple-choice questions with a pass threshold of 30 correct answers (75%). Candidates are allotted 60 minutes.",
        "The highest concentration of questions originates from three domains: (1) Regulatory and Warning Road Signs, (2) Right-of-Way priority at roundabouts and T-junctions, and (3) Vehicle lane discipline.",
        "At Wenasa Driving School, we provide interactive mock exam papers modeled directly after the computerized testing terminal, guaranteeing high familiarity before test day.",
      ],
      si: [
        "DMT පරිගණක විභාගයේ ප්‍රශ්න 40ක් ඇති අතර ඉන් 30ක් (75%) නිවැරදිව පිළිතුරු සපයා සමත් විය යුතුය.",
        "වැඩිම ලකුණු සංඛ්‍යාවක් හිමිවන්නේ නියෝග හා අනතුරු ඇඟවීමේ මාර්ග සංඥා, රවුම්මංසල ප්‍රමුඛතා නීති සහ මංතීරු විනය පිළිබඳ ප්‍රශ්න සඳහාය.",
        "වෙනස රියැදුරු පාසලේ පරිගණක ආදර්ශ විභාග ප්‍රශ්න පත්‍ර කට්ටලය මඟින් විභාගයට පෙර ඉහළ පුහුණුවක් ලබාගත හැක.",
      ],
      ta: [
        "DMT தேர்வில் 40 வினாக்களுக்கு 30 சரியான விடைகள் தேவை.",
        "வீதி சமிக்ஞைகள் மற்றும் முன்னுரிமை விதிகள் பற்றிய கேள்விகள் முக்கியத்துவம் பெறுகின்றன.",
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
    publishedDate: "2026-09-12",
    category: "Road Safety",
    imageSrc: "/images/blog/road-signs-cover.jpg",
    content: {
      en: [
        "Sri Lankan road traffic signs are harmonized with international Vienna Convention standards and categorized into three distinct geometrical classifications: Circular (Regulatory & Prohibitory), Triangular (Hazard & Warning), and Rectangular (Directional & Informative).",
        "Red circular signs dictate mandatory prohibitions (e.g. Stop, Speed Limit, No Entry). Red triangles warn drivers of upcoming road conditions such as pedestrian crossings, steep descents, or roundabouts.",
        "Blue circles indicate mandatory positive instructions (e.g., Turn Left Ahead), while rectangular blue or green signboards supply essential navigational guidance.",
      ],
      si: [
        "ශ්‍රී ලංකාවේ මාර්ග සංඥා ප්‍රධාන කාණ්ඩ 3 කට වෙන්කර හඳුනාගත හැක: වෘත්තාකාර (නියෝග සංඥා), ත්‍රිකෝණාකාර (අනතුරු ඇඟවීමේ සංඥා) සහ සෘජුකෝණාස්‍රාකාර (තොරතුරු සංඥා).",
        "රතු පැහැති වෘත්තාකාර සංඥා මඟින් අනිවාර්ය නීතිමය නියෝග (නැවතීම, වේග සීමා, ඇතුළුවීම තහනම්) නිරූපණය කරයි. රතු මායිම් සහිත ත්‍රිකෝණ මඟින් ඉදිරියේ ඇති අනතුරු පිළිබඳ අවවාද සපයයි.",
      ],
      ta: [
        "இலங்கை வீதி அடையாளங்கள் வட்ட, முக்கோண மற்றும் செவ்வக வடிவங்களில் வகைப்படுத்தப்படுகின்றன.",
      ],
    },
  },
];

export function BlogSection({ locale }: BlogSectionProps) {
  const dict = getDictionary(locale);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <>
      <section id="blog" className="py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3 shadow-xs">
              <span>{dict.nav.blog}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: "balance" }}>
              {dict.resources.blogTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {dict.resources.blogDesc}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <Image
                      src={article.imageSrc}
                      alt={article.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900/95 backdrop-blur-md text-emerald-300 border border-emerald-800/80 shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.publishedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {article.title[locale]}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {article.excerpt[locale]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="w-full inline-flex items-center justify-between py-3 px-4 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-800/80 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{dict.common.learnMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-950">
                <Image
                  src={activeArticle.imageSrc}
                  alt={activeArticle.title[locale]}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                {activeArticle.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {activeArticle.title[locale]}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-400 my-4 pb-4 border-b border-slate-800">
                <span>{activeArticle.publishedDate}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                {activeArticle.content[locale].map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
