"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { getDictionary } from "@/src/i18n";
import { 
  GraduationCap, 
  FileQuestion, 
  Compass, 
  Package, 
  BookOpen, 
  ShoppingBag, 
  Video, 
  LayoutDashboard,
  ArrowUpRight
} from "lucide-react";
import { MockExamModal } from "./MockExamModal";
import { RoadSignsModal } from "./RoadSignsModal";
import { LicenceGuideModal } from "./LicenceGuideModal";

interface DigitalResourcesGridProps {
  locale: Locale;
}

export function DigitalResourcesGrid({ locale }: DigitalResourcesGridProps) {
  const dict = getDictionary(locale);

  const [activeModal, setActiveModal] = useState<"exam" | "signs" | "guide" | null>(null);

  const resources = [
    {
      id: "mock-exams",
      title: dict.resources.mockExamsTitle,
      description: dict.resources.mockExamsDesc,
      icon: FileQuestion,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      action: () => setActiveModal("exam"),
      actionLabel: "Start Mock Test",
    },
    {
      id: "road-signs",
      title: dict.resources.roadSignsTitle,
      description: dict.resources.roadSignsDesc,
      icon: Compass,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      action: () => setActiveModal("signs"),
      actionLabel: "View Signs Catalog",
    },
    {
      id: "info-portal",
      title: dict.resources.infoPortalTitle,
      description: dict.resources.infoPortalDesc,
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      action: () => setActiveModal("guide"),
      actionLabel: "Read Licence Guide",
    },
    {
      id: "packages",
      title: dict.resources.packagesTitle,
      description: dict.resources.packagesDesc,
      icon: Package,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
      href: "#packages",
      actionLabel: "Compare Packages",
    },
    {
      id: "student-portal",
      title: dict.resources.studentPortalTitle,
      description: dict.resources.studentPortalDesc,
      icon: LayoutDashboard,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-950/40",
      href: "#apply",
      actionLabel: "Student Login / Access",
    },
    {
      id: "video-tutorials",
      title: dict.resources.videoTutorialsTitle,
      description: dict.resources.videoTutorialsDesc,
      icon: Video,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
      href: "#gallery",
      actionLabel: "Watch Tutorials",
    },
    {
      id: "blog",
      title: dict.resources.blogTitle,
      description: dict.resources.blogDesc,
      icon: GraduationCap,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      href: "#blog",
      actionLabel: "Explore Articles",
    },
    {
      id: "shop",
      title: dict.resources.shopTitle,
      description: dict.resources.shopDesc,
      icon: ShoppingBag,
      color: "text-amber-700 dark:text-amber-500",
      bg: "bg-amber-100/50 dark:bg-amber-950/30",
      href: "#contact",
      actionLabel: "Inquire at Desk",
    },
  ];

  return (
    <>
      <section id="resources" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              {dict.resources.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
              {dict.resources.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {dict.resources.subtitle}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={res.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${res.bg} ${res.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {res.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {res.action ? (
                      <button
                        onClick={res.action}
                        className="w-full inline-flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 py-1 cursor-pointer"
                      >
                        <span>{res.actionLabel}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <a
                        href={res.href}
                        className="inline-flex items-center justify-between w-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 py-1"
                      >
                        <span>{res.actionLabel}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Feature Modals */}
      {activeModal === "exam" && (
        <MockExamModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "signs" && (
        <RoadSignsModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "guide" && (
        <LicenceGuideModal locale={locale} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
