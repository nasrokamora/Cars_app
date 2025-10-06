import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(`${process.env.NEST_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // include cookies in the request
  });
  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }
  return response;
}
