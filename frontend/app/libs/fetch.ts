"use server";

import { cookies } from "next/headers";

export async function fetchWithRefresh(url: string, options?: RequestInit) {
  let response = await fetch(url, {
    ...options,
    credentials: "include", // include cookies in the request
    headers: {
      "Content-Type": "application/json",

    },
  });
  if (response.status === 401) {
    try {
      const responseRefresh = await fetch(
        `${process.env.NEXT_NEST_API_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseRefresh.status === 200) {
        const setCookie = responseRefresh.headers
          .get("set-cookie")
          ?.split(";")[0]
          .split("=")[1];
        if (setCookie) {
          const cookieStore = cookies();
          (await cookieStore).set("access_token", setCookie);
        }
      }
    } catch (error) {
      console.log(error);
    }
    response = await fetch(url, {
      ...options,
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return response;
}
