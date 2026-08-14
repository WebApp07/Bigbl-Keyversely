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
import { countryToLocale } from "@/lib/i18n/geo";

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
  // (manually-selected or previously-detected) locale. A manual choice always
  // wins because it sets the cookie, which short-circuits detection here.
  const locale = resolveLocale(req);
  if (locale) {
    return attachLocale(req, locale);
  }

  return (auth as any)(req);
}

/**
 * Runs the NextAuth pipeline for a request that has no stored locale yet, then
 * attaches the resolved `locale` cookie and propagates an `x-locale` request
 * header so the very first SSR render is already localized.
 *
 * NextAuth v5's `handleAuth` wraps its result in a plain `Response`, which
 * drops the `NextResponse` request-header propagation, so pass-through
 * responses are rebuilt to preserve the modified request headers.
 */
async function attachLocale(
  req: NextRequest,
  locale: Locale,
): Promise<NextResponse> {
  const authRes = (await (auth as any)(req)) as NextResponse | Response | null;

  // NextResponse from the authorized callback (e.g. sessionCartId): use as-is.
  if (authRes instanceof NextResponse) {
    authRes.cookies.set(LOCALE_COOKIE, locale, LOCALE_COOKIE_OPTIONS);
    return authRes;
  }

  // Everything else from NextAuth is a plain Response; preserve redirects
  // (protected routes) exactly while still persisting the locale cookie.
  const status = authRes?.status ?? 200;
  if (status >= 300 && status < 400) {
    const redirectRes = new NextResponse(authRes?.body, {
      status,
      headers: authRes?.headers,
    });
    redirectRes.cookies.set(LOCALE_COOKIE, locale, LOCALE_COOKIE_OPTIONS);
    return redirectRes;
  }

  // Pass-through: rebuild as NextResponse so the `x-locale` header is seen by
  // the page render, carry over any session cookies, and persist the locale.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  const passRes = NextResponse.next({ request: { headers: requestHeaders } });

  const authHeaders =
    authRes instanceof Response ? authRes.headers : new Headers();
  for (const [key, value] of authHeaders.entries()) {
    if (key.toLowerCase() === "set-cookie") {
      passRes.headers.append("set-cookie", value);
    }
  }

  passRes.cookies.set(LOCALE_COOKIE, locale, LOCALE_COOKIE_OPTIONS);
  return passRes;
}

const LOCALE_COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

/**
 * Resolve the locale for a request without depending on a pre-existing cookie.
 *
 * Priority:
 *   1. An explicit manual selection (`locale_manual` marker cookie) always wins.
 *   2. IP geo-detection (Vercel / Cloudflare / edge `geo`) for visitors with no
 *      stored preference.
 *   3. A previously persisted `locale` cookie (e.g. a manual choice made before
 *      the manual marker existed, or an earlier session).
 *   4. null → default (English) behavior.
 *
 * Country is read from the proxy/host geo headers first because `req.geo` is
 * not reliably populated on Vercel in Next.js 15:
 *   - `x-vercel-ip-country`  (Vercel)
 *   - `cf-ipcountry`         (Cloudflare)
 *   - `req.geo?.country`     (legacy edge runtime fallback)
 */
function resolveLocale(req: NextRequest): Locale | null {
  const manual = req.cookies.get(LOCALE_MANUAL_COOKIE)?.value;
  if (isSupportedLocale(manual)) return manual;

  const country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    (req as unknown as { geo?: { country?: string | null } }).geo?.country ||
    null;
  const geoLocale = countryToLocale(country);
  if (geoLocale) return geoLocale;

  const existing = req.cookies.get(LOCALE_COOKIE)?.value;
  return isSupportedLocale(existing) ? existing : null;
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
