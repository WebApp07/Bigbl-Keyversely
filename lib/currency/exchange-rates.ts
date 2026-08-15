import {
  BASE_CURRENCY,
  supportedCurrencies,
  type CurrencyCode,
} from "@/lib/i18n/currencies";

/**
 * Exchange-rate service.
 *
 * - The base currency (USD) is always represented by a rate of 1.
 * - Rates are cached in-memory with a TTL so external APIs are NOT hit on
 *   every page load.
 * - The provider is swappable: implement `ExchangeRateProvider` and add it to
 *   `providers`, or point `EXCHANGE_RATES_API_URL` at any endpoint returning
 *   `{ result: "success", rates: { EUR: 0.92, ... } }`.
 * - If every provider fails we fall back to the static `FALLBACK_RATES` table,
 *   so the site never breaks because of a rate API outage.
 */

export type Rates = Record<string, number>;

export interface ExchangeRateProvider {
  name: string;
  fetchRates(base: CurrencyCode): Promise<Rates>;
}

/** Approximate rates used only when no provider is reachable. */
export const FALLBACK_RATES: Rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.37,
  MAD: 10.1,
  CHF: 0.88,
};

const DEFAULT_API_URL = "https://open.er-api.com/v6/latest/USD";

/** Free, keyless provider. Swap out by setting EXCHANGE_RATES_API_URL. */
export const openErApiProvider: ExchangeRateProvider = {
  name: "open.er-api.com",
  async fetchRates(base) {
    const url =
      process.env.EXCHANGE_RATES_API_URL || DEFAULT_API_URL.replace("USD", base);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Exchange-rate API responded ${res.status}`);
      }
      const json = (await res.json()) as {
        result?: string;
        rates?: Record<string, number | string>;
      };
      if (json.result !== "success" || !json.rates) {
        throw new Error("Exchange-rate API returned an unexpected payload");
      }
      return sanitizeRates({ [base]: 1, ...json.rates });
    } finally {
      clearTimeout(timeout);
    }
  },
};

/** Registered providers, tried in order until one succeeds. */
const providers: ExchangeRateProvider[] = [openErApiProvider];

/** Keep only supported currencies with sane numeric rates. */
function sanitizeRates(rates: Record<string, number | string>): Rates {
  const out: Rates = {};
  for (const code of supportedCurrencies) {
    const value = rates[code];
    const n = typeof value === "number" ? value : Number(value);
    if (Number.isFinite(n) && n > 0) out[code] = n;
  }
  return out;
}

function ttlMs(): number {
  const seconds = Number(process.env.EXCHANGE_RATE_TTL_SECONDS) || 6 * 60 * 60;
  return seconds * 1000;
}

interface CacheEntry {
  rates: Rates;
  fetchedAt: number;
}

let cache: CacheEntry | null = null;

/** Rates for the base currency, cached within a TTL window. */
export async function getRates(): Promise<Rates> {
  const ttl = ttlMs();
  if (cache && Date.now() - cache.fetchedAt < ttl) {
    return cache.rates;
  }

  for (const provider of providers) {
    try {
      const rates = await provider.fetchRates(BASE_CURRENCY);
      if (Object.keys(rates).length > 0) {
        cache = { rates, fetchedAt: Date.now() };
        return rates;
      }
    } catch (err) {
      console.error(`[exchange-rates] ${provider.name} failed:`, err);
    }
  }

  // Providers failed. Prefer a stale cache over the static fallback.
  if (cache) {
    return cache.rates;
  }
  return sanitizeRates(FALLBACK_RATES);
}

/** Synchronous conversion using an already-available rates table. */
export function convertWithRates(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates: Rates,
): number {
  const fromRate = rates[from] ?? 1;
  const toRate = rates[to] ?? 1;
  return amount * (toRate / fromRate);
}

/**
 * Convert an amount between two currencies using the current (cached) rates.
 * Falls back to 1:1 when either currency is unknown so it never throws.
 */
export async function convertAmount(
  amount: number,
  from: CurrencyCode = BASE_CURRENCY,
  to: CurrencyCode = BASE_CURRENCY,
): Promise<number> {
  if (!Number.isFinite(amount)) return 0;
  if (from === to) return amount;
  const rates = await getRates();
  return convertWithRates(amount, from, to, rates);
}

/** Rates narrowed to a specific target set (used when serializing to client). */
export function ratesFor(currencies: CurrencyCode[], rates: Rates): Rates {
  const out: Rates = {};
  for (const code of currencies) {
    if (rates[code]) out[code] = rates[code];
  }
  return out;
}