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
        <span className="text-xs text-[#a8a295] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#fcc438]" aria-hidden="true" />
          <span>Language:</span>
        </span>
        <div className="flex items-center gap-1 p-1 bg-[#141310] rounded-xl border border-white/10">
          {locales.map((loc) => {
            const info = localeDetails[loc];
            const isActive = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                aria-current={isActive ? "page" : undefined}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#fcc438] text-[#0d0c0a] shadow-xs"
                    : "text-[#d0c5ab] hover:text-white hover:bg-white/5"
                }`}
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
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#161513]/90 hover:bg-[#1f1e1a] text-xs font-semibold text-[#d0c5ab] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#fcc438] whitespace-nowrap shrink-0 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${currentInfo.nativeName} - Select Language`}
      >
        <Globe className="w-3.5 h-3.5 text-[#fcc438] shrink-0" aria-hidden="true" />
        <span className="font-semibold text-[11px] sm:text-xs">{currentInfo.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#141310] shadow-2xl border border-white/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold text-[#a8a295] uppercase tracking-wider">
            Select Language
          </div>
          {locales.map((loc) => {
            const info = localeDetails[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left cursor-pointer ${
                  isSelected
                    ? "bg-[#25231e] text-[#fcc438] font-bold"
                    : "text-[#c7c2b6] hover:bg-[#1c1a17] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{info.flag}</span>
                  <div>
                    <div className="text-xs">{info.nativeName}</div>
                    <div className="text-[10px] text-[#a8a295] font-normal">{info.name}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#fcc438]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
