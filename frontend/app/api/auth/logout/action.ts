"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogoutAction() {



  await fetch(`${process.env.NEXT_NEST_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  // مسح الكوكيز محليًا من Next
  const cookieStore = cookies();
  (await cookieStore).delete("access_token");
  (await cookieStore).delete("refresh_token");

  redirect("/");
}