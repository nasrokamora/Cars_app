import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(`${process.env.NEST_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // include cookies in the request
  });

  const setCookie = res.headers.get("set-cookie");
  const response = NextResponse.json(await res.json(), { status: res.status });
  if (setCookie) response.headers.set("set-cookie", setCookie);
  
  return response;
}
