"use server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;

  if (!accessToken) {
    return Response.json({ user: null });
  }
  try {
    const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      return Response.json({ user: null }, { status: response.status });
    }
    const user = await response.json();
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ user: null }, { status: 500 });
  }
}
