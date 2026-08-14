import { cookies } from "next/headers";
import {
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./config";
import { createT, getDictionary, type Messages, type TFunction } from "./index";

/**
 * Resolve the active locale on the server from the persisted cookie.
 * Falls back to the default locale when the visitor has no stored choice
 * (client-side first-visit detection will persist one).
 */
export async function getLocale(): Promise<Locale> {
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