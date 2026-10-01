"use client";

import { useState } from "react";
import { Locale } from "@/src/config/i18n";
import { X, Sparkles, Check, ArrowRight, RotateCcw } from "lucide-react";

interface PackageFinderModalProps {
  locale: Locale;
  onClose: () => void;
}

export function PackageFinderModal({ locale, onClose }: PackageFinderModalProps) {
  const [vehicleChoice, setVehicleChoice] = useState<string>("car");
  const [experienceChoice, setExperienceChoice] = useState<string>("beginner");
  const [transmissionChoice, setTransmissionChoice] = useState<string>("manual");
  const [calculatedResult, setCalculatedResult] = useState<{
    title: string;
    description: string;
    recommendedPackage: string;
  } | null>(null);

  const handleCalculate = () => {
    if (vehicleChoice === "bike") {
      setCalculatedResult({
        title: locale === "si" ? "යතුරුපැදි සහ ස්කූටර් පාඨමාලාව" : "Class A / A1 Motorcycle & Scooter Course",
        description:
          locale === "si"
            ? "සමබරතාවය, 8 හැඩය කැපීම සහ හදිසි තිරිංග පුහුණුව සඳහා කදිම පාඨමාලාවකි."
            : "Perfect for mastering motorcycle balancing, figure-8 maneuvers, and safe road riding.",
        recommendedPackage: "Class A / A1 Motorcycle Package",
      });
    } else if (vehicleChoice === "combo") {
      setCalculatedResult({
        title: locale === "si" ? "ද්විත්ව පැකේජය: කාර් (Manual) + බයික්" : "Dual Combo: Car (Manual) + Motorcycle",
        description:
          locale === "si"
            ? "වඩාත්ම ජනප්‍රිය සහ ලාභදායී පාඨමාලාව. එකවර බලපත්‍ර කාණ්ඩ 2ක් සම්පූර්ණ කරගැනීමට අවස්ථාව."
            : "Our most popular package. Save time and money by mastering both light cars and motorbikes together.",
        recommendedPackage: "Dual Combo: Car + Bike",
      });
    } else if (transmissionChoice === "auto") {
      setCalculatedResult({
        title: locale === "si" ? "කාර් රථ - ස්වයංක්‍රීය (Automatic)" : "Class B Car - Automatic Transmission",
        description:
          locale === "si"
            ? "ක්ලච් පාලනයකින් තොරව පහසුවෙන් සහ සැහැල්ලුවෙන් රියදුරු කලාව ප්‍රගුණ කිරීමට කැමති අයට වඩාත් සුදුසුය."
            : "Best suited for effortless driving in heavy urban traffic without worrying about clutch stalls.",
        recommendedPackage: "Class B Car - Automatic",
      });
    } else {
      setCalculatedResult({
        title: locale === "si" ? "කාර් රථ - අතින් ක්‍රියාත්මක (Manual Transmission)" : "Class B Car - Manual Transmission",
        description:
          locale === "si"
            ? "ඕනෑම වාහනයක් ධාවනය කිරීමේ පූර්ණ නිපුණතාවය සහ ක්ලච් පාලනය අත්පත් කරගැනීමට අවශ්‍ය අයට පරිපූර්ණයි."
            : "The gold standard for full vehicle control, giving you the skills and license to drive both manual and automatic cars.",
        recommendedPackage: "Class B Car - Manual",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {locale === "si" ? "සුදුසුම පාඨමාලා තේරීම් ප්‍රශ්නාවලිය" : "Smart Package Finder"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!calculatedResult ? (
            <>
              {/* Question 1 */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  1. Which vehicle would you like to get a licence for?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "car", label: "Car Only" },
                    { id: "combo", label: "Car + Bike" },
                    { id: "bike", label: "Bike Only" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setVehicleChoice(item.id)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                        vehicleChoice === item.id
                          ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  2. What is your current driving experience level?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "beginner", label: "Absolute Beginner" },
                    { id: "some", label: "Practiced a little" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setExperienceChoice(item.id)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                        experienceChoice === item.id
                          ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              {vehicleChoice !== "bike" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    3. Do you prefer Manual or Automatic transmission?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "manual", label: "Manual (Gear & Clutch)" },
                      { id: "auto", label: "Automatic (Easy Drive)" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setTransmissionChoice(item.id)}
                        className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                          transmissionChoice === item.id
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                            : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleCalculate}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 shadow-md transition-colors"
              >
                Find My Recommended Course
              </button>
            </>
          ) : (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  Recommended For You:
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {calculatedResult.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {calculatedResult.description}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-2">
                <button
                  onClick={() => setCalculatedResult(null)}
                  className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>

                <a
                  href="#apply"
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-md"
                >
                  <span>Enroll in this Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
