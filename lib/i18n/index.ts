import { en, type Messages } from "./messages/en";
import { fr } from "./messages/fr";
import { es } from "./messages/es";
import { de } from "./messages/de";
import {
  defaultLocale,
  isSupportedLocale,
  type Locale,
} from "./config";

export type { Locale };
export type { Messages } from "./messages/en";
export {
  defaultLocale,
  isSupportedLocale,
  supportedLocales,
  locales,
  localeLabel,
  localeFlag,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
} from "./config";
export { browserLocaleToLocale } from "./config";

const dictionaries: Record<Locale, Messages> = {
  en,
  fr: deepMerge(en, fr),
  es: deepMerge(en, es),
  de: deepMerge(en, de),
};

/** Deep-merge a partial dictionary over the English base so missing keys fall back to English. */
function deepMerge<T>(base: T, overrides: unknown): T {
  const result: Record<string, unknown> = { ...(base as object) };
  if (typeof overrides !== "object" || overrides === null) return result as T;
  for (const [key, value] of Object.entries(overrides as object)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = deepMerge(
        (base as Record<string, unknown>)[key] ?? {},
        value,
      );
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as T;
}

export function getDictionary(locale: Locale): Messages {
  return dictionaries[isSupportedLocale(locale) ? locale : defaultLocale];
}

/**
 * Resolve a dot-notated path against a dictionary (e.g. "header.signIn").
 * Returns the fallback or the path itself when nothing is found.
 */
export function resolvePath(
  dict: Record<string, unknown>,
  path: string,
  fallback?: string,
): string {
  const parts = path.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (
      current &&
      typeof current === "object" &&
      Object.prototype.hasOwnProperty.call(current, part)
    ) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return fallback ?? path;
    }
  }
  if (typeof current === "string") return current;
  return fallback ?? path;
}

export type TFunction = (path: string, params?: Record<string, string | number>) => string;

/** Create a translation function bound to a dictionary. */
export function createT(dict: Messages): TFunction {
  const flat: Record<string, unknown> = {};
  flatten(dict, "", flat);
  return (path, params) => {
    const found = flat[path];
    let value = typeof found === "string" ? found : path;
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        value = value.replaceAll(`{${key}}`, String(val));
      }
    }
    return value;
  };
}

/** Flatten a nested dictionary into dotted keys. */
function flatten(
  node: unknown,
  prefix: string,
  out: Record<string, unknown>,
): void {
  if (node && typeof node === "object") {
    const entries = Object.entries(node as Record<string, unknown>);
    if (entries.length === 0) {
      out[prefix] = "";
      return;
    }
    for (const [key, value] of entries) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        flatten(value, path, out);
      } else {
        out[path] = value;
      }
    }
  } else if (typeof node === "string") {
    out[prefix] = node;
  }
}