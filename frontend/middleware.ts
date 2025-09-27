import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('access_Token')?.value;

    if(!accessToken && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
}


export const config = {
    matcher : ["/dashboard/:path*"],
}