export type Locale = "si" | "en" | "ta";

export const defaultLocale: Locale = "si";

export const locales: Locale[] = ["si", "en", "ta"];

export interface LocaleInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr";
}

export const localeDetails: Record<Locale, LocaleInfo> = {
  si: {
    code: "si",
    name: "Sinhala",
    nativeName: "සිංහල",
    flag: "🇱🇰",
    dir: "ltr",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    dir: "ltr",
  },
  ta: {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇱🇰",
    dir: "ltr",
  },
};

export function isValidLocale(code: string): code is Locale {
  return locales.includes(code as Locale);
}
