"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale, locales, localeDetails } from "@/src/config/i18n";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function setLocaleCookie(locale: Locale) {
  if (typeof document !== "undefined") {
    document.cookie = `WENASA_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

interface LanguageSwitcherProps {
  currentLocale: Locale;
  variant?: "header" | "footer" | "mobile";
}

export function LanguageSwitcher({ currentLocale, variant = "header" }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    // Remember preference in cookie (valid 1 year)
    setLocaleCookie(newLocale);

    // Construct new pathname
    let newPath = pathname;
    const currentLocaleInPath = locales.find(
      (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
    );

    if (currentLocaleInPath) {
      newPath = pathname.replace(`/${currentLocaleInPath}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname}`;
    }

    setIsOpen(false);
    router.push(newPath);
  };

  const currentInfo = localeDetails[currentLocale] || localeDetails.si;

  if (variant === "footer") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          <span>Language:</span>
        </span>
        <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-lg border border-slate-700">
          {locales.map((loc) => {
            const info = localeDetails[loc];
            const isActive = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`}
                aria-label={`Switch to ${info.name}`}
              >
                {info.nativeName}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 whitespace-nowrap"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="font-medium">{currentInfo.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Select Language
          </div>
          {locales.map((loc) => {
            const info = localeDetails[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{info.flag}</span>
                  <div>
                    <div className="text-xs">{info.nativeName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{info.name}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
