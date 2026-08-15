import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIpLimit } from "@/lib/ip-limit";
import {
  isSupportedLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  LOCALE_MANUAL_COOKIE,
  type Locale,
} from "@/lib/i18n/config";
import { countryToLocale } from "@/lib/i18n/countries";
import {
  BASE_CURRENCY,
  CURRENCY_COOKIE,
  CURRENCY_HEADER,
  CURRENCY_MANUAL_COOKIE,
  isSupportedCurrency,
  type CurrencyCode,
} from "@/lib/i18n/currencies";
import { countryToCurrency } from "@/lib/i18n/countries";

const { auth } = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkIpLimit(ip)) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  // Automatic localization: only geo-detect when the visitor has no stored
  // (manually-selected or previously-detected) preference. A manual choice
  // always wins because it sets the marker cookie, which short-circuits
  // detection here — for both language AND currency.
  const locale = resolveLocale(req);
  const currency = resolveCurrency(req);

  return attachLocalization(req, locale, currency);
}

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

/**
 * Runs the NextAuth pipeline, then attaches the resolved `locale`/`currency`
 * cookies and propagates `x-locale` / `x-currency` request headers so the very
 * first SSR render is already localized.
 *
 * NextAuth v5's `handleAuth` wraps its result in a plain `Response`, which
 * drops the `NextResponse` request-header propagation, so pass-through
 * responses are rebuilt to preserve the modified request headers.
 */
async function attachLocalization(
  req: NextRequest,
  locale: Locale | null,
  currency: CurrencyCode,
): Promise<NextResponse> {
  const authRes = (await (auth as any)(req)) as NextResponse | Response | null;

  // NextResponse from the authorized callback (e.g. sessionCartId): use as-is.
  if (authRes instanceof NextResponse) {
    if (locale) authRes.cookies.set(LOCALE_COOKIE, locale, COOKIE_OPTIONS);
    authRes.cookies.set(CURRENCY_COOKIE, currency, COOKIE_OPTIONS);
    return authRes;
  }

  // Everything else from NextAuth is a plain Response; preserve redirects
  // (protected routes) exactly while still persisting the preference cookies.
  const status = authRes?.status ?? 200;
  if (status >= 300 && status < 400) {
    const redirectRes = new NextResponse(authRes?.body, {
      status,
      headers: authRes?.headers,
    });
    if (locale) redirectRes.cookies.set(LOCALE_COOKIE, locale, COOKIE_OPTIONS);
    redirectRes.cookies.set(CURRENCY_COOKIE, currency, COOKIE_OPTIONS);
    return redirectRes;
  }

  // Pass-through: rebuild as NextResponse so the request headers are seen by
  // the page render. Copy the whole auth response (status + headers) so the
  // `set-cookie` headers from NextAuth survive — appending them to a
  // `NextResponse.next()` is dropped by Next.js's middleware serialization.
  const requestHeaders = new Headers(req.headers);
  if (locale) requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(CURRENCY_HEADER, currency);

  const passRes = new NextResponse(authRes?.body, {
    status,
    headers: authRes?.headers,
  });
  passRes.headers.set("x-middleware-next", "1");

  if (locale) passRes.cookies.set(LOCALE_COOKIE, locale, COOKIE_OPTIONS);
  passRes.cookies.set(CURRENCY_COOKIE, currency, COOKIE_OPTIONS);
  return passRes;
}

/**
 * Resolve the locale for a request without depending on a pre-existing cookie.
 *
 * Priority:
 *   1. An explicit manual selection (`locale_manual` marker cookie) always wins.
 *   2. IP geo-detection (Vercel / Cloudflare / edge `geo`) for visitors with no
 *      stored preference.
 *   3. A previously persisted `locale` cookie.
 *   4. null → default (English) behavior.
 */
function resolveLocale(req: NextRequest): Locale | null {
  const manual = req.cookies.get(LOCALE_MANUAL_COOKIE)?.value;
  if (isSupportedLocale(manual)) return manual;

  const country = readGeoCountry(req);
  if (country) {
    const geoLocale = countryToLocale(country);
    if (geoLocale) return geoLocale;
  }

  const existing = req.cookies.get(LOCALE_COOKIE)?.value;
  return isSupportedLocale(existing) ? existing : null;
}

/**
 * Resolve the currency for a request.
 *
 * Priority (mirrors `resolveLocale`):
 *   1. Manual selection (`currency_manual` marker cookie) always wins.
 *   2. IP geo-detection → the country's configured currency.
 *   3. Previously persisted `currency` cookie.
 *   4. Base currency (USD) fallback.
 */
function resolveCurrency(req: NextRequest): CurrencyCode {
  const manual = req.cookies.get(CURRENCY_MANUAL_COOKIE)?.value;
  if (isSupportedCurrency(manual)) return manual;

  const country = readGeoCountry(req);
  if (country) return countryToCurrency(country);

  const existing = req.cookies.get(CURRENCY_COOKIE)?.value;
  return isSupportedCurrency(existing) ? existing : BASE_CURRENCY;
}

/**
 * Country is read from the proxy/host geo headers first because `req.geo` is
 * not reliably populated on Vercel in Next.js 15:
 *   - `x-vercel-ip-country`  (Vercel)
 *   - `cf-ipcountry`         (Cloudflare)
 *   - `req.geo?.country`     (legacy edge runtime fallback)
 */
function readGeoCountry(req: NextRequest): string | null {
  return (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    (req as unknown as { geo?: { country?: string | null } }).geo?.country ||
    null
  );
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};