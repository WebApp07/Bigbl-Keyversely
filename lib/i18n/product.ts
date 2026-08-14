import { defaultLocale, type Locale } from "./config";
import type { ProductTranslation, ProductTranslations } from "@/types";

/** Keys of a product that carry localized content. */
export interface LocalizableFields {
  name?: string;
  description?: string;
  features?: string | null;
  faqs?: string | null;
  category?: string;
  brand?: string;
  translations?: unknown;
}

/**
 * Casts a stored `translations` JSON value (Prisma `JsonValue`) into the
 * structured translation type. Returns null for anything unexpected.
 */
function asTranslations(
  translations: unknown,
): ProductTranslations | null {
  if (!translations || typeof translations !== "object") return null;
  return translations as ProductTranslations;
}

/**
 * Returns the translation override for a product in the given locale, or null
 * when the locale is the default (English) or no translation is stored.
 */
export function getProductTranslation(
  translations: unknown,
  locale: Locale,
): ProductTranslation | null {
  if (locale === defaultLocale) return null;
  const map = asTranslations(translations);
  if (!map) return null;
  return (map as Record<string, ProductTranslation>)[locale] ?? null;
}

function hasValue(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Localizes a product's editable fields in-place of the given locale, falling
 * back to the stored English values for any field without a translation.
 * The `id`, `slug`, price, stock, images, etc. are left untouched (only
 * human-readable content is overridden).
 */
export function localizeProduct<T extends LocalizableFields>(
  product: T,
  locale: Locale,
): T {
  const tr = getProductTranslation(product.translations, locale);
  if (!tr) return product;

  const localized = { ...product };

  if (hasValue(tr.name)) localized.name = tr.name;
  if (hasValue(tr.description)) localized.description = tr.description;
  if (hasValue(tr.features)) localized.features = tr.features;
  if (hasValue(tr.faqs)) localized.faqs = tr.faqs;
  if (hasValue(tr.category)) localized.category = tr.category;
  if (hasValue(tr.brand)) localized.brand = tr.brand;

  return localized;
}

/** Localizes a list of products for the given locale. */
export function localizeProducts<T extends LocalizableFields>(
  products: T[],
  locale: Locale,
): T[] {
  return products.map((p) => localizeProduct(p, locale));
}

/** Returns a product name for the locale, falling back to English. */
export function localizeProductName(
  translations: unknown,
  name: string,
  locale: Locale,
): string {
  const tr = getProductTranslation(translations, locale);
  return tr && hasValue(tr.name) ? tr.name : name;
}
