import { isSupportedLocale, type Locale } from "./config";

/**
 * Default country → locale mapping (ISO 3166-1 alpha-2 → supported locale).
 * Override per environment with the GEO_LOCALE_MAP env var as JSON, e.g.:
 *   GEO_LOCALE_MAP={"FR":"fr","BE":"fr","ES":"es","DE":"de","NL":"en"}
 */
const DEFAULT_COUNTRY_MAP: Record<string, Locale> = {
  FR: "fr",
  BE: "fr",
  ES: "es",
  DE: "de",
};

function loadCountryMap(): Record<string, Locale> {
  const raw = process.env.GEO_LOCALE_MAP;
  if (!raw) return DEFAULT_COUNTRY_MAP;
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    const map: Record<string, Locale> = {};
    for (const [country, locale] of Object.entries(parsed)) {
      if (isSupportedLocale(locale)) {
        map[country.trim().toUpperCase()] = locale as Locale;
      }
    }
    return Object.keys(map).length > 0 ? map : DEFAULT_COUNTRY_MAP;
  } catch {
    return DEFAULT_COUNTRY_MAP;
  }
}

const COUNTRY_LOCALE_MAP = loadCountryMap();

/**
 * Map an ISO country code to its configured locale.
 * Returns null when the country is not configured (caller falls back to English).
 */
export function countryToLocale(country?: string | null): Locale | null {
  if (!country) return null;
  const locale = COUNTRY_LOCALE_MAP[country.trim().toUpperCase()];
  return locale ?? null;
}
