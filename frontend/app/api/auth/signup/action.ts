"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { NextRequest } from "next/server";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function SignUpAction(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });
  //   const data = await response.json();
  if (formData.get("email") === email) {
    redirect("/auth/signup");
  }
  if (response.status === 409) {
    redirect("/auth/login");
  }
  
  // //   if (response.status === 409) {
  // //     redirect("/auth/login")
  // //   }
  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  redirect("/dashboard");
  // return data;
}

export async function UserAction() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;
  let user: { username?: string; email?: string } | null = null;
  if (accessToken) {
    const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      cache: "no-store",
    });
    if (response.ok) {
      user = await response.json();
    }
    return user;
  }
}
