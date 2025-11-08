import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const accessToken = req.cookies.get("access_token")?.value;

  if (accessToken) {
    return NextResponse.next();
  }
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*",],
};
