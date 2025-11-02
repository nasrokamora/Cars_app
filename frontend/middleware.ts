import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  if (accessToken) {
    return NextResponse.next();
  }
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/register", req.url));
  }
  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${req.nextUrl.origin}/api/auth/refresh`,
        {
          method: "POST",
          headers: { cookie: req.headers.get("cookie") || "" },
        }
      );
      if (!refreshResponse.ok) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      const setCookie = refreshResponse.headers.get("set-cookie");
      const response = NextResponse.next();
      if (setCookie) response.headers.set("set-Cookie", setCookie);
      
      return response;

    } catch (error) {
      console.error("Error in middleware token refresh:", error);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
