import { defaultLocale, isSupportedLocale, type Locale } from "./config";
import {
  BASE_CURRENCY,
  isSupportedCurrency,
  type CurrencyCode,
} from "./currencies";

/**
 * Single source of truth for country → language(s) + currency.
 *
 * A country's `locales` are the preferred ISO 639-1 language codes, ordered by
 * priority. The locale actually served is the first one that the app supports
 * (see `countryToLocale`). If a language like `nl` is added to the i18n setup
 * later, it will automatically be used for that country without touching this
 * file.
 *
 * A country's `currency` is validated against the supported currency list and
 * falls back to the base currency when unsupported.
 *
 * Override the preferred-locale mapping per environment with the GEO_LOCALE_MAP
 * env var as JSON, e.g.  GEO_LOCALE_MAP={"FR":"fr","BE":"fr","ES":"es"}
 */
export interface CountryConfig {
  /** ISO 3166-1 alpha-2 country code. */
  code: string;
  /** English display name. */
  name: string;
  /** Preferred ISO 639-1 language codes, in priority order. */
  locales: string[];
  /** Currency used for that country (ISO 4217). */
  currency: CurrencyCode;
}

export const COUNTRIES: CountryConfig[] = [
  { code: "BE", name: "Belgium", locales: ["fr", "nl"], currency: "EUR" },
  { code: "FR", name: "France", locales: ["fr"], currency: "EUR" },
  { code: "NL", name: "Netherlands", locales: ["nl"], currency: "EUR" },
  { code: "DE", name: "Germany", locales: ["de"], currency: "EUR" },
  { code: "ES", name: "Spain", locales: ["es"], currency: "EUR" },
  { code: "GB", name: "United Kingdom", locales: ["en"], currency: "GBP" },
  { code: "US", name: "United States", locales: ["en"], currency: "USD" },
  { code: "CA", name: "Canada", locales: ["en", "fr"], currency: "CAD" },
  { code: "MA", name: "Morocco", locales: ["fr", "ar"], currency: "MAD" },
  { code: "CH", name: "Switzerland", locales: ["de", "fr", "it"], currency: "CHF" },
];

const COUNTRY_MAP: Record<string, CountryConfig> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
);

function loadLocaleOverride(): Record<string, Locale> | null {
  const raw = process.env.GEO_LOCALE_MAP;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    const map: Record<string, Locale> = {};
    for (const [country, locale] of Object.entries(parsed)) {
      if (isSupportedLocale(locale)) {
        map[country.trim().toUpperCase()] = locale as Locale;
      }
    }
    return Object.keys(map).length > 0 ? map : null;
  } catch {
    return null;
  }
}

const LOCALE_OVERRIDE = loadLocaleOverride();

export function getCountry(code?: string | null): CountryConfig | undefined {
  if (!code) return undefined;
  return COUNTRY_MAP[code.trim().toUpperCase()];
}

export function isKnownCountry(code?: string | null): boolean {
  return getCountry(code) !== undefined;
}

export function getCountryName(code?: string | null): string | undefined {
  return getCountry(code)?.name;
}

/**
 * Map a country to the app's locale. Returns null when the country is unknown
 * or none of its preferred languages are supported (caller falls back to the
 * default locale).
 */
export function countryToLocale(country?: string | null): Locale | null {
  if (!country) return null;
  const key = country.trim().toUpperCase();

  // Environment override wins (existing behavior preserved).
  const override = LOCALE_OVERRIDE?.[key];
  if (override) return override;

  const config = COUNTRY_MAP[key];
  if (!config) return null;
  for (const lang of config.locales) {
    if (isSupportedLocale(lang)) return lang as Locale;
  }
  return null;
}

/**
 * Map a country to its configured currency. Unknown countries or unsupported
 * currency codes fall back to the base currency.
 */
export function countryToCurrency(
  country?: string | null,
): CurrencyCode {
  const config = getCountry(country);
  if (!config) return BASE_CURRENCY;
  return isSupportedCurrency(config.currency)
    ? config.currency
    : BASE_CURRENCY;
}

/**
 * Resolve both language and currency for a country in one call.
 * The locale is null when the country is unknown; currency never is.
 */
export function countryToPreferences(country?: string | null): {
  locale: Locale | null;
  currency: CurrencyCode;
} {
  return {
    locale: countryToLocale(country),
    currency: countryToCurrency(country),
  };
}

/** Fall back for a locale without geo data (browser language, etc.). */
export function currencyForLocale(locale: Locale): CurrencyCode {
  switch (locale) {
    case "fr":
    case "es":
    case "de":
      return "EUR";
    default:
      return defaultLocale === locale ? BASE_CURRENCY : BASE_CURRENCY;
  }
}