import { headers, cookies } from "next/headers";
import {
  BASE_CURRENCY,
  CURRENCY_COOKIE,
  CURRENCY_HEADER,
  isSupportedCurrency,
  type CurrencyCode,
} from "@/lib/i18n/currencies";
import { formatCurrency } from "./format";
import { convertAmount, getRates, type Rates } from "./exchange-rates";
import type { FormattableAmount } from "./format";

/**
 * Server-side currency helpers.
 *
 * The active currency is resolved exactly like the locale:
 *   1. `x-currency` request header (set by middleware from geo-detection).
 *   2. Persisted `currency` cookie (manual selection wins over geo).
 *   3. Base currency (USD).
 */
export async function getCurrency(): Promise<CurrencyCode> {
  const headerStore = await headers();
  const headerCurrency = headerStore.get(CURRENCY_HEADER);
  if (isSupportedCurrency(headerCurrency)) return headerCurrency;

  const store = await cookies();
  const value = store.get(CURRENCY_COOKIE)?.value;
  return isSupportedCurrency(value) ? value : BASE_CURRENCY;
}

/** Convert an amount (already in base currency) into the active currency. */
export async function convertActiveCurrency(
  amount: FormattableAmount,
): Promise<number> {
  const currency = await getCurrency();
  return convertAmount(Number(amount) || 0, BASE_CURRENCY, currency);
}

/**
 * Format an amount for the request's currency + the currency's default locale.
 * The input is treated as base-currency (stored) amount and converted.
 */
export async function formatPrice(
  amount: FormattableAmount,
): Promise<string> {
  const currency = await getCurrency();
  const converted = await convertActiveCurrency(amount);
  return formatCurrency(converted, currency);
}

/** Rates table for the current currency, for passing to the client provider. */
export async function getRatesForClient(): Promise<Rates> {
  return getRates();
}

/**
 * Settlement currency for payments. Only currencies both Stripe and PayPal
 * support out of the box are allowed (see SETTLEMENT_CURRENCIES env). Anything
 * else (e.g. MAD, CHF) is display-only and checkout falls back to the base
 * currency so a charge can never fail because of an unsupported currency code.
 */
export function getSettlementCurrency(
  selected: CurrencyCode = BASE_CURRENCY,
): CurrencyCode {
  const allowed = (process.env.SETTLEMENT_CURRENCIES || "USD,EUR,GBP,CAD")
    .split(",")
    .map((c) => c.trim().toUpperCase());
  return isSupportedCurrency(selected) && allowed.includes(selected)
    ? selected
    : BASE_CURRENCY;
}