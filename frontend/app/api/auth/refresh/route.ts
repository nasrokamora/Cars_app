import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(`${process.env.NEST_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // include cookies in the request
    });
    const data = await response.json();
    const nextResponse = NextResponse.json(data, { status: response.status });

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextResponse.headers.set("set-Cookie", setCookie);
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
