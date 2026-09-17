import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = [
  "/dashboard",
  "/chat",
  "/admin",
  "/investor",
  "/customer",
  "/employee",
  "/intern",
];

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const refreshToken = req.cookies.get(
    "refresh_token"
  )?.value;

  const isProtected = PROTECTED_PATHS.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`)
  );

  if (isProtected && !refreshToken) {
    const loginUrl = new URL("/login", req.url);

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/chat/:path*",
    "/admin/:path*",
    "/investor/:path*",
    "/customer/:path*",
    "/employee/:path*",
    "/intern/:path*",
  ],
};
