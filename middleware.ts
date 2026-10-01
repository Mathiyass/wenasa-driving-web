import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./src/config/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files, api routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Check cookie or header for preference, default to 'si' (Sinhala)
  const savedLocale = request.cookies.get("WENASA_LOCALE")?.value;
  const targetLocale = savedLocale && isValidLocale(savedLocale) ? savedLocale : defaultLocale;

  request.nextUrl.pathname = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
