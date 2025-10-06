import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");

  const protectedRoutes = ["/dashboard","/profile"]
  const pathname = req.nextUrl.pathname;

  if(protectedRoutes.some((route)=> pathname.startsWith(route))){
    if(!accessToken){
      const refreshResponse = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      }) 
      if(!refreshResponse){
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

  }

  // if (!accessToken && req.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  return NextResponse.next();

}

export const config = {
  matcher: ["/dashboard/:path*"],
};
