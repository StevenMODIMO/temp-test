import { NextResponse, NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const i18nResponse = i18nRouter(request, i18nConfig);

  const nextLocale = request.cookies.get("NEXT_LOCALE")?.value;

  if (nextLocale) {
    response.headers.set(
      "Accept-Language",
      nextLocale === "uz" ? "uz" : "uz-cyr"
    );
  }

  return i18nResponse || response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
