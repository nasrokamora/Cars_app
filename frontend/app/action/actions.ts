// import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export async function SignUpAction(formData: FormData) {
  "use server";
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to sign up");
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  redirect("/dashboard");
} // SignUpAction

export async function LoginAction(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
  redirect("/login");

} // SignInAction

export async function LogoutAction() {
  "use server";
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to logout");
  }
  redirect("/login");
} // LogoutAction
