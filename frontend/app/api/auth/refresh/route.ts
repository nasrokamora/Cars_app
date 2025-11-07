import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const incomingRequest = request.headers.get("cookie") || "";

  try {
    const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: incomingRequest,
      },
    });
    const data = await response.json();
    const nextResponse = NextResponse.json(data, { status: response.status });

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextResponse.headers.set("set-cookie", setCookie);
    }
    return nextResponse;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
