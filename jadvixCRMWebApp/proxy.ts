import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/*
 * Next.js 16 renamed Middleware to Proxy — same behaviour, new filename.
 *
 * This is only an optimistic redirect so signed-out visitors don't land on a
 * portal shell. It reads the cookie's presence, not its validity; the layout
 * still resolves the real session. Per the Next auth guide, Proxy is not the
 * place for authorization.
 */

const SESSION_COOKIE = "jadvix_portal";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/login" && signedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname !== "/login" && !signedIn) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // everything except Next internals, the API, and static assets
  matcher: ["/((?!_next/static|_next/image|icon.svg|.*\\.svg$|favicon.ico).*)"],
};
