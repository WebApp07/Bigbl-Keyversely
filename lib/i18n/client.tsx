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
  browserLocaleToLocale,
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "./config";
import { createT, getDictionary, type TFunction } from "./index";

interface I18nContextValue {
  locale: Locale;
  t: TFunction;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setLocaleCookie(locale: Locale): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored =
    window.localStorage.getItem(LOCALE_STORAGE_KEY) ??
    getCookie(LOCALE_COOKIE);
  if (stored && isSupportedLocale(stored)) return stored;
  // First visit: detect from the browser language
  return browserLocaleToLocale(navigator.language);
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(
    isSupportedLocale(initialLocale) ? initialLocale : defaultLocale,
  );

  return (
    <I18nInternal
      locale={locale}
      setLocale={setLocaleState}
      router={router}
    >
      {children}
    </I18nInternal>
  );
}

function I18nInternal({
  locale,
  setLocale,
  router,
  children,
}: {
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
  router: ReturnType<typeof useRouter>;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // First-visit detection + persistence. Manual selections are stored and
  // never overridden by auto-detection afterwards.
  useEffect(() => {
    if (mounted || typeof window === "undefined") return;
    const stored =
      window.localStorage.getItem(LOCALE_STORAGE_KEY) ??
      getCookie(LOCALE_COOKIE);

    if (stored && isSupportedLocale(stored)) {
      // Remembered choice wins — never auto-change.
      setLocale(stored);
      setMounted(true);
      document.documentElement.lang = stored;
      return;
    }

    // First visit: detect browser language once, then remember it.
    const detectedLocale = browserLocaleToLocale(navigator.language);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, detectedLocale);
    setLocaleCookie(detectedLocale);
    document.documentElement.lang = detectedLocale;
    setLocale(detectedLocale);
    setMounted(true);
  }, [mounted, setLocale]);

  // Keep the <html lang> attribute in sync after manual switches.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocaleHandler = useCallback(
    (next: Locale) => {
      if (!isSupportedLocale(next)) return;
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      setLocaleCookie(next);
      document.documentElement.lang = next;
      setLocale(next);
      setDetected(true);
      router.refresh();
    },
    [router, setLocale],
  );

  const t = useMemo(() => createT(getDictionary(locale)), [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t, setLocale: setLocaleHandler }),
    [locale, t, setLocaleHandler],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}