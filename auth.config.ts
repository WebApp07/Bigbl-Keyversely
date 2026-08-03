import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /^\/shipping-address(\/.*)?$/,
        /^\/payment-method(\/.*)?$/,
        /^\/place-order(\/.*)?$/,
        /^\/profile(\/.*)?$/,
        /^\/user(\/.*)?$/,
        /^\/order(\/.*)?$/,
        /^\/admin(\/.*)?$/,
      ];

      const { pathname } = new URL(request.url);

      if (!auth && protectedPaths.some((pattern) => pattern.test(pathname))) {
        const isGuestCheckout =
          request.cookies.get("isGuestCheckout")?.value === "true";

        if (
          isGuestCheckout &&
          (pathname.startsWith("/shipping-address") ||
            pathname.startsWith("/payment-method") ||
            pathname.startsWith("/place-order") ||
            pathname.includes("/thank-you"))
        ) {
          return true;
        }

        const signInUrl = new URL("/sign-in", request.url);

        signInUrl.searchParams.set(
          "callbackUrl",
          request.nextUrl.pathname + request.nextUrl.search,
        );

        return NextResponse.redirect(signInUrl);
      }

      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();
        const newRequestHeaders = new Headers(request.headers);
        const response = NextResponse.next({
          request: { headers: newRequestHeaders },
        });
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
