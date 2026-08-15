"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  BASE_CURRENCY,
  CURRENCY_COOKIE,
  CURRENCY_MANUAL_COOKIE,
  CURRENCY_STORAGE_KEY,
  isSupportedCurrency,
  type CurrencyCode,
} from "@/lib/i18n/currencies";
import {
  formatCurrency,
  formatCurrencyParts,
  toNumber,
  type FormattableAmount,
} from "./format";
import { convertWithRates, FALLBACK_RATES, type Rates } from "./exchange-rates";

interface CurrencyContextValue {
  /** Currently selected display currency. */
  currency: CurrencyCode;
  /** Select a currency manually (persisted, never overridden by geo). */
  setCurrency: (code: CurrencyCode) => void;
  /** Format an amount stored in base currency, converting to the active currency. */
  format: (amount: FormattableAmount) => string;
  /** Format an amount that is already expressed in the given currency (no conversion). */
  formatInCurrency: (amount: FormattableAmount, currency: CurrencyCode) => string;
  /** Like `format` but returns Intl parts (for symbol/fraction styling). */
  formatParts: (amount: FormattableAmount) => Intl.NumberFormatPart[] | null;
  /** Exchange-rate table (base = 1) provided by the server. */
  rates: Rates;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCurrencyCookie(code: CurrencyCode): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CURRENCY_COOKIE}=${encodeURIComponent(code)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function setCurrencyManualCookie(code: CurrencyCode): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CURRENCY_MANUAL_COOKIE}=${encodeURIComponent(code)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function getCurrencyCookie(): CurrencyCode | null {
  if (typeof document === "undefined") return null;
  const stored =
    window.localStorage.getItem(CURRENCY_STORAGE_KEY) ??
    getCookie(CURRENCY_COOKIE);
  return stored && isSupportedCurrency(stored) ? stored : null;
}

export function CurrencyProvider({
  children,
  initialCurrency,
  rates,
}: {
  children: React.ReactNode;
  initialCurrency?: CurrencyCode;
  rates?: Rates;
}) {
  const router = useRouter();
  const [currency, setCurrencyState] = useState<CurrencyCode>(
    isSupportedCurrency(initialCurrency) ? initialCurrency : BASE_CURRENCY,
  );

  // Sync with stored preferences on mount. The server-set cookie (geo-detected
  // or manual) is authoritative; a manual client-side choice sets the manual
  // marker cookie so geo-detection never overrides it afterwards.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = getCurrencyCookie();
    if (stored && stored !== currency) {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, stored);
      setCurrencyState(stored);
    }
  }, [currency]);

  const setCurrency = useCallback(
    (next: CurrencyCode) => {
      if (!isSupportedCurrency(next)) return;
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, next);
      setCurrencyCookie(next);
      setCurrencyManualCookie(next);
      setCurrencyState(next);
      router.refresh();
    },
    [router],
  );

  const safeRates: Rates = useMemo(() => {
    const table = rates && Object.keys(rates).length > 0 ? rates : FALLBACK_RATES;
    return { [BASE_CURRENCY]: 1, ...table };
  }, [rates]);

  const format = useCallback(
    (amount: FormattableAmount) => {
      const num = toNumber(amount);
      if (num === null) return "NaN";
      const converted = convertWithRates(num, BASE_CURRENCY, currency, safeRates);
      return formatCurrency(converted, currency);
    },
    [currency, safeRates],
  );

  const formatInCurrency = useCallback(
    (amount: FormattableAmount, code: CurrencyCode) =>
      formatCurrency(amount, code),
    [],
  );

  const formatParts = useCallback(
    (amount: FormattableAmount) => {
      const num = toNumber(amount);
      if (num === null) return null;
      const converted = convertWithRates(num, BASE_CURRENCY, currency, safeRates);
      return formatCurrencyParts(converted, currency);
    },
    [currency, safeRates],
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      format,
      formatInCurrency,
      formatParts,
      rates: safeRates,
    }),
    [currency, setCurrency, format, formatInCurrency, formatParts, safeRates],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}