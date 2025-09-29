import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${process.env.NEST_API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });
  const setCookie = response.cookies.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie as unknown as string);
  }
  return response;
  // return NextResponse.json({data}, {status: res.status})
}
