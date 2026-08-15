import { countryToLocale, countryToCurrency } from "./countries";
import type { Locale } from "./config";
import type { CurrencyCode } from "./currencies";

/**
 * Thin adapter around the centralized country configuration in `./countries`.
 * Kept as its own module so imports that referenced `lib/i18n/geo` keep
 * working; all mapping logic lives in `./countries`.
 */
export { countryToLocale, countryToCurrency };
export type { Locale, CurrencyCode };

/** @deprecated Use `countryToPreferences` from "./countries". */
export function countryToPreferences(
  country?: string | null,
): { locale: Locale | null; currency: CurrencyCode } {
  return countryToLocale(country) === null
    ? { locale: null, currency: countryToCurrency(country) }
    : {
        locale: countryToLocale(country) as Locale,
        currency: countryToCurrency(country),
      };
}