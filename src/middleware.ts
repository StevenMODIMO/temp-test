import { NextResponse, NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // i18n routing
  const i18nResponse = i18nRouter(request, i18nConfig);

  // Get the locale from the NEXT_LOCALE cookie
  const nextLocale = request.cookies.get("NEXT_LOCALE")?.value;

  if (nextLocale) {
    response.headers.set(
      "Accept-Language",
      nextLocale === "uz-Cyrl" ? "uz-Cyrl" : nextLocale === "uz" ? "uz" : "en" // Set default to Uzbek Cyrillic, then Uzbek, and finally English
    );
  } else {
    // Fallback to Uzbek Cyrillic if no NEXT_LOCALE cookie is present
    response.headers.set("Accept-Language", "uz-Cyrl");
  }

  return i18nResponse || response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
