"use client";

import { useState } from "react";
import Image from "next/image";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
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
        "The DMT theory test consists of 40 multiple-choice questions with a mandatory pass mark of 30. More than 60% of questions focus directly on regulatory road signs, traffic signals, and right-of-way roundabout rules.",
        "To maximize your score, study the distinctive shapes: circles command orders, triangles warn of hazards, and rectangles give directions. Use Wenasa's online mock exam simulator to practice against real exam countdown clocks.",
      ],
      si: [
        "DMT ලිඛිත විභාගය බහුවරණ ප්‍රශ්න 40 කින් සමන්විත වන අතර සමත්වීම සඳහා ලකුණු 30ක් ලබාගත යුතුය. ප්‍රශ්න වලින් 60% කට වඩා අසනු ලබන්නේ මාර්ග සංඥා සහ මංසන්ධි ප්‍රමුඛතා නීති පිළිබඳවයි.",
        "සංඥාවල හැඩතල නිවැරදිව මතක තබාගන්න. වෙනස අන්තර්ජාල ආදර්ශ විභාග පද්ධතිය මඟින් සැබෑ කාලගණකය යටතේ පුහුණුවීමෙන් විභාග බිය සම්පූර්ණයෙන්ම දුරුකරගත හැක.",
      ],
      ta: [
        "DMT கோட்பாட்டுத் தேர்வில் 40 வினாக்களில் 30 மதிப்பெண்கள் பெற வேண்டும். வீதி சமிக்ஞைகள் மற்றும் முன்னுரிமை விதிகள் முக்கிய பங்கு வகிக்கின்றன.",
      ],
    },
  },
  {
    id: "art-3",
    slug: "understanding-road-signs-sri-lanka",
    title: {
      en: "Essential Sri Lankan Road Signs Every New Driver Must Know",
      si: "නවක රියැදුරන් දැනගත යුතු ප්‍රධාන ශ්‍රී ලාංකික මාර්ග සංඥා",
      ta: "ஒவ்வொரு சாரதியும் அறிந்திருக்க வேண்டிய முக்கிய வீதி அடையாளங்கள்",
    },
    excerpt: {
      en: "A comprehensive breakdown of regulatory, warning, and informational road signs with real-world scenarios.",
      si: "නියෝග, අනතුරු ඇඟවීම් සහ තොරතුරු සංඥා නිවැරදිව වටහා ගැනීම සහ ප්‍රායෝගික රිය ධාවනය.",
      ta: "ஒழுங்குமுறை, எச்சரிக்கை மற்றும் தகவல் சமிக்ஞைகள் பற்றிய தெளிவான விளக்கம்.",
    },
    readTime: "4 min read",
    publishedDate: "2026-09-15",
    category: "Road Safety",
    imageSrc: "/images/blog/road-signs-cover.jpg",
    content: {
      en: [
        "Sri Lankan road signs are categorized into three primary visual groups: circular regulatory signs, triangular warning signs, and rectangular informational signs.",
        "Red circular signs represent mandatory orders such as Stop, No Entry, or Speed Limits. Red-bordered triangles alert drivers to imminent road conditions such as pedestrian crossings, steep inclines, or sharp bends.",
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
      <section id="blog" className="py-20 sm:py-28 scroll-mt-20 bg-[#0d0c0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Marcus Lorenzet Editorial Style */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161513] border border-white/[0.08] text-xs font-semibold mb-4">
              <span className="editorial-bracket text-[10px] sm:text-[11px] text-[#d0c5ab]">
                [ 11 · EDITORIAL & EXAM SECRETS ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f5f5f3] uppercase leading-tight" style={{ textWrap: "balance" }}>
              {dict.resources.blogTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#c7c2b6] leading-relaxed">
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
                className="marcus-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0c0a]">
                    <Image
                      src={article.imageSrc}
                      alt={article.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#161513]/90 backdrop-blur-md text-[#d0c5ab] border border-white/10 shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-[#8c877a] mb-2 font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.publishedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#f5f5f3] group-hover:text-[#d0c5ab] transition-colors leading-snug">
                      {article.title[locale]}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed line-clamp-3">
                      {article.excerpt[locale]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="w-full inline-flex items-center justify-between py-3 px-5 rounded-full text-xs font-bold text-[#d0c5ab] bg-[#1c1a17] hover:bg-[#25231f] border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{dict.common.learnMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#fcc438]" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0c0a]/90 backdrop-blur-xl"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl marcus-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1a17] text-[#c7c2b6] hover:text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Close article"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 text-xs text-[#8c877a] mb-2 font-mono">
                <span className="text-[#d0c5ab] font-bold">{activeArticle.category}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#f5f5f3] tracking-tight leading-snug">
                {activeArticle.title[locale]}
              </h2>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#c7c2b6] leading-relaxed border-t border-white/[0.06] pt-5">
                {activeArticle.content[locale].map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8c877a]">
                  Published by Wenasa Editorial
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-full bg-[#d0c5ab] hover:bg-[#e4dbc6] text-[#11100d] text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
