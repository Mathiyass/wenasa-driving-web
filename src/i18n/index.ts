import { en } from "./en";
import { si } from "./si";
import { ta } from "./ta";
import { Locale, defaultLocale, isValidLocale } from "../config/i18n";

const dictionaries: Record<Locale, typeof si> = {
  si,
  en,
  ta,
};

export function getDictionary(locale?: string): typeof si {
  if (locale && isValidLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}

export { en, si, ta };
