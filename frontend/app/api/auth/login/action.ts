"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LoginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/login}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const setCookie = response.headers.get("Set-cookie");
  if (setCookie) {
    const cookieStore = cookies();
    const cookieList = setCookie
      .split(", ")
      .filter((cookie) => cookie.includes("token"));
    for (const cookie of cookieList) {
      const [name, value] = cookie.split(";")[0].split("=");
      (await cookieStore).set(name.trim(), value.trim());
    }
  }
  redirect("/dashboard");
}
