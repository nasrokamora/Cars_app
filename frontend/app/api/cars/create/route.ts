"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_NEST_API_URL}/cars/create-car`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // cookie: request.headers.get("cookie") || "",
          // Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to create car" },
        { status: response.status }
      );
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
