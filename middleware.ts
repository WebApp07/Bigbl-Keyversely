import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIpLimit } from "@/lib/ip-limit";

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

  return (auth as any)(req);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
