import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  const accessToken = req.cookies.get("access_token")?.value;
  // const refreshToken = req.cookies.get("refresh_token")?.value;

  if(!accessToken) {
    return NextResponse.redirect(new URL("auth/login", req.url));
  }

return NextResponse.next();

}
export const config = {
  matcher: ["/dashboard/:path*",],
};