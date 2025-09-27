
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${process.env.NEST_API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data  = await res.json();
  if(!res.ok) {
    return NextResponse.json({message: data.message}, {status: res.status})
  }
  return NextResponse.json({data}, {status: res.status})
  }
