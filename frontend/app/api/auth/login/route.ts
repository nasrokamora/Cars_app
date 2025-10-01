"use server"
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json();

    const res = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include",
    })

    const data = await res.json();
    const response =  NextResponse.json(data, {status: res.status});
    const setCookie = res.headers.get("set-cookie");
    if(setCookie) {
        response.headers.append("set-cookie", setCookie);
    }

    return response;
}