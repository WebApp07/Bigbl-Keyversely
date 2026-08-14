export const locales = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", native: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", native: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", native: "Deutsch", flag: "🇩🇪" },
] as const;

export type Locale = (typeof locales)[number]["code"];

export const defaultLocale: Locale = "en";

export const supportedLocales = locales.map((l) => l.code) as Locale[];

export const LOCALE_COOKIE = "locale";
export const LOCALE_STORAGE_KEY = "locale";
export const LOCALE_HEADER = "x-locale";

export function isSupportedLocale(value?: string | null): value is Locale {
  return !!value && (supportedLocales as string[]).includes(value);
}

/**
 * Maps an arbitrary browser/navigator language string (e.g. "en-US", "fr-FR")
 * to the closest supported locale. Falls back to the default.
 */
export function browserLocaleToLocale(lang?: string | null): Locale {
  if (!lang) return defaultLocale;
  const code = lang.toLowerCase().replace("_", "-").split("-")[0];
  if ((supportedLocales as string[]).includes(code)) {
    return code as Locale;
  }
  return defaultLocale;
}

export function localeLabel(code: Locale): string {
  return locales.find((l) => l.code === code)?.native ?? code;
}

export function localeFlag(code: Locale): string {
  return locales.find((l) => l.code === code)?.flag ?? "";
}