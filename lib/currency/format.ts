import {
  BASE_CURRENCY,
  currencyLocales,
  isSupportedCurrency,
  type CurrencyCode,
} from "@/lib/i18n/currencies";

/** Number-like values, including Prisma.Decimal (which exposes toNumber()). */
export type FormattableAmount =
  | number
  | string
  | null
  | undefined
  | { toNumber(): number };

/**
 * Convert any amount-like value (number, string, Prisma.Decimal, ...) to a
 * number. Returns null for anything that cannot be parsed.
 */
export function toNumber(value: FormattableAmount): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  // Prisma.Decimal and other numeric wrapper objects.
  if (typeof value === "object") {
    const wrapped = value as { toNumber?: () => number };
    if (typeof wrapped.toNumber === "function") {
      const n = wrapped.toNumber();
      return Number.isFinite(n) ? n : null;
    }
  }
  return null;
}

const formatterCache = new Map<string, Intl.NumberFormat>();

/**
 * Formats an amount in the given currency using Intl.NumberFormat. Currency
 * symbols are derived by the runtime — never hardcoded.
 *
 * Falls back to the base currency + `en-US` when the currency is invalid, so
 * this function never throws on bad input.
 */
export function formatCurrency(
  amount: FormattableAmount,
  currency: CurrencyCode = BASE_CURRENCY,
  locale?: string,
): string {
  const num = toNumber(amount);
  if (num === null) return "NaN";

  const safeCurrency = isSupportedCurrency(currency)
    ? currency
    : BASE_CURRENCY;
  const safeLocale = locale || currencyLocales(safeCurrency)[0];
  const key = `${safeLocale}|${safeCurrency}`;
  let formatter = formatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(safeLocale, {
      style: "currency",
      currency: safeCurrency,
      minimumFractionDigits: 2,
    });
    formatterCache.set(key, formatter);
  }
  return formatter.format(num);
}

/**
 * Same as `formatCurrency` but also returns the raw `Intl.NumberFormatPart[]`
 * (used for components that render symbol / integer / fraction separately).
 * Returns null for unparseable amounts.
 */
export function formatCurrencyParts(
  amount: FormattableAmount,
  currency: CurrencyCode = BASE_CURRENCY,
  locale?: string,
): Intl.NumberFormatPart[] | null {
  const num = toNumber(amount);
  if (num === null) return null;

  const safeCurrency = isSupportedCurrency(currency)
    ? currency
    : BASE_CURRENCY;
  const safeLocale = locale || currencyLocales(safeCurrency)[0];
  return new Intl.NumberFormat(safeLocale, {
    style: "currency",
    currency: safeCurrency,
    minimumFractionDigits: 2,
  }).formatToParts(num);
}