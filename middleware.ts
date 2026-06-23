import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIpLimit } from "@/lib/ip-limit";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const allowed = await checkIpLimit(ip);

  if (!allowed) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  return (auth as any)(req);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
