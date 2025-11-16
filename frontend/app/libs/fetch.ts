"use server";

import { cookies } from "next/headers";

// import { cookies } from "next/headers";


export async function fetchWithRefresh(url: string, options?: RequestInit) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;
  let response = await fetch(url, {
    ...options,
    credentials: "include", // include cookies in the request
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,

    },
  });
  if (response.status === 401) {
    try {
      const responseRefresh = await fetch(
        `${process.env.NEXT_BASE_URL}/api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseRefresh.status === 200) {
        const newAccessToken = await responseRefresh.json();
        const cookieStore = cookies();
        (await cookieStore).set("access_token", newAccessToken.accessToken);

        response = await fetch(url, {
          ...options,
          credentials: "include", // include cookies in the request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken.accessToken}`,
          },
        });
        return response;
        console.log("refreshed token");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return response;
}
