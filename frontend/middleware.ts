import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  const accessToken = req.cookies.get("access_token")?.value;

  if (accessToken) {
    return NextResponse.next();
  }



  return NextResponse.redirect(new URL("/auth/login", req.url));



}
export const config = {
  matcher: ["/dashboard/:path*",],
};