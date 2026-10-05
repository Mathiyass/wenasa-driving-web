"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale, isValidLocale } from "@/src/config/i18n";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    let target = defaultLocale;
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|; )WENASA_LOCALE=([^;]*)/);
      if (match && isValidLocale(match[1])) {
        target = match[1];
      } else if (typeof navigator !== "undefined" && navigator.language) {
        const lang = navigator.language.toLowerCase();
        if (lang.startsWith("ta")) target = "ta";
        else if (lang.startsWith("en")) target = "en";
      }
    }
    router.replace(`/${target}/`);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0d0c0a] flex items-center justify-center text-[#d0c5ab] font-mono text-xs">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#fcc438] animate-ping" />
        <span>Entering Wenasa Driving School...</span>
      </div>
    </div>
  );
}

