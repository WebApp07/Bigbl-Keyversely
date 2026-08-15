/**
 * Centralized currency configuration.
 *
 * - The canonical ("base") currency is what product prices are stored in
 *   (Product.price, Cart totals, Order totals). Everything is stored in the
 *   base currency; user-facing conversion happens at display time.
 * - Display currencies are validated against this list. Unknown codes always
 *   fall back to the base currency.
 * - Currency symbols are NEVER hardcoded here or in components: the
 *   `formatCurrency` util renders them via `Intl.NumberFormat`.
 */

export const currencies = [
  {
    code: "USD",
    label: "US Dollar",
    /** Locale used by Intl.NumberFormat when no explicit locale is given. */
    locales: ["en-US"],
  },
  {
    code: "EUR",
    label: "Euro",
    locales: ["fr-FR", "de-DE", "es-ES", "nl-NL", "it-IT"],
  },
  {
    code: "GBP",
    label: "British Pound",
    locales: ["en-GB"],
  },
  {
    code: "CAD",
    label: "Canadian Dollar",
    locales: ["en-CA", "fr-CA"],
  },
  {
    code: "MAD",
    label: "Moroccan Dirham",
    locales: ["fr-MA", "fr-FR"],
  },
  {
    code: "CHF",
    label: "Swiss Franc",
    locales: ["de-CH", "fr-CH", "it-CH"],
  },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

/** Currency that all product / cart / order prices are stored in. */
export const BASE_CURRENCY: CurrencyCode = "USD";

export const supportedCurrencies = currencies.map(
  (c) => c.code,
) as CurrencyCode[];

export const CURRENCY_COOKIE = "currency";
export const CURRENCY_STORAGE_KEY = "currency";
export const CURRENCY_HEADER = "x-currency";
/** Marker cookie set only when the user actively picks a currency. When
 * present, geo/IP detection never overrides the choice. */
export const CURRENCY_MANUAL_COOKIE = "currency_manual";

export function isSupportedCurrency(
  value?: string | null,
): value is CurrencyCode {
  return !!value && (supportedCurrencies as string[]).includes(value);
}

export function currencyLabel(code: CurrencyCode): string {
  return currencies.find((c) => c.code === code)?.label ?? code;
}

export function currencyDisplayLabel(code: CurrencyCode): string {
  const c = currencies.find((cur) => cur.code === code);
  if (!c) return code;
  return `${code} - ${c.label}`;
}

/** Default formatting locales for a currency (used by Intl.NumberFormat). */
export function currencyLocales(code: CurrencyCode): readonly string[] {
  return currencies.find((c) => c.code === code)?.locales ?? ["en-US"];
}