import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json();

    const res = await fetch(`${process.env.NEST_API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    })
    const setCookie = res.headers.get("set-cookie");
    const data = await res.json();
    const response = NextResponse.json(data, { status: res.status });
    if (setCookie) {
        response.headers.set("set-cookie", setCookie);
    }
    return response;

}