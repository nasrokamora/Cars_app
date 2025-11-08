import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No access token provided" },
      { status: 401 }
    );
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_NEST_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `refresh_token=${refreshToken}`,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to refresh token" },
        { status: response.status }
      );
    }
    const data = await response.json();
    const nextResponse = NextResponse.json(
      { accessToken: data.accessToken },
      { status: response.status }
    );
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextResponse.headers.set("set-cookie", setCookie);
    }
    return nextResponse;
  } catch (e) {
    console.error("Error refreshing token:", e);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}

// // import { NextResponse } from "next/server";

// // export async function POST(request: Request) {

// //   const incomingRequest = request.headers.get("cookie") || "";

// //   try {
// //     const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         cookie: incomingRequest,
// //       },
// //     });
// //     const data = await response.json();
// //     const nextResponse = NextResponse.json(data, { status: response.status });

// //     const setCookie = response.headers.get("set-cookie");
// //     if (setCookie) {
// //       nextResponse.headers.set("set-cookie", setCookie);
// //     }
// //     return nextResponse;
// //   } catch (error) {
// //     console.error("Error refreshing token:", error);
// //     return NextResponse.json(
// //       { error: "Failed to refresh token" },
// //       { status: 500 }
// //     );
// //   }
// // }
