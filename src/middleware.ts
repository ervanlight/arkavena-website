import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";

/**
 * Gates every /admin/* route behind a signed session cookie. Runs before any
 * admin page or layout renders, so there's no way to reach admin content
 * (leads, media, site-settings, etc.) without a valid session — closing the
 * gap where src/app/admin/layout.tsx had no auth check at all.
 *
 * /admin/login itself and the login/logout API routes are excluded so the
 * login form is reachable and doesn't redirect-loop.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAdminPath =
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout";

  if (isPublicAdminPath) return NextResponse.next();

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isValid = await verifySessionToken(token);

  if (!isValid) {
    const loginUrl = new URL("/admin/login", request.url);
    // Only ever redirect back into /admin — never let this become an open
    // redirect to an arbitrary external URL.
    if (pathname.startsWith("/admin/")) {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
