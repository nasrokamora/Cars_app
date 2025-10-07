import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  if (!accessToken && !refreshToken) {
    try {
      const refreshTokenResponse = await fetch(
        `${process.env.NEXT_NEST_API_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!refreshTokenResponse.ok) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      } else {
        return NextResponse.next();
      }
        } catch (error) {
        if (error instanceof Error) {
          throw new Error('Invalid refresh token');
        }
        throw new Error('Invalid refresh token');
        }
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
    // const refreshTokenResponse = await fetch(
    //   `${process.env.NEXT_NEST_API_URL}/auth/refresh`,
    //   {
    //     method: "POST",
    //     credentials: "include",
    //   }
    // );
    // if (!refreshTokenResponse.ok) {
    //   return NextResponse.redirect(new URL("/auth/login", req.url));
    // } else {
    //   return NextResponse.next();
    // }
  }

  // return NextResponse.next();


export const config = {
  matcher: ["/dashboard/:path*"],
};
