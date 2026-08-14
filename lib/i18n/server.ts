import { headers } from "next/headers";
import { cookies } from "next/headers";
import {
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  type Locale,
} from "./config";
import { createT, getDictionary, type Messages, type TFunction } from "./index";

/**
 * Resolve the active locale on the server.
 *
 * Priority order:
 *   1. `x-locale` request header (set by middleware from IP geo-detection).
 *   2. Persisted `locale` cookie (manual selection wins over geo-detection).
 *   3. Default locale.
 */
export async function getLocale(): Promise<Locale> {
  const headerStore = await headers();
  const headerLocale = headerStore.get(LOCALE_HEADER);
  if (isSupportedLocale(headerLocale)) return headerLocale;

  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isSupportedLocale(value) ? value : defaultLocale;
}

/** Translation function for server components bound to the request locale. */
export async function getT(): Promise<TFunction> {
  const locale = await getLocale();
  return createT(getDictionary(locale));
}

/** Raw merged message dictionary for the request locale (arrays, etc.). */
export async function getMessages(): Promise<Messages> {
  const locale = await getLocale();
  return getDictionary(locale);
}