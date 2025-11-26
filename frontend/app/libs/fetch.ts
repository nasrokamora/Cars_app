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
      // const setCookie = responseRefresh.headers.get("Set-Cookie");
      // const newAccessToken = await responseRefresh.json();
      
      // const newAccessToken = await responseRefresh.json();
      // const cookieStore = cookies();
      const newAccessToken=  (await cookieStore).get("access_token")?.value;
      // (await cookieStore).set("Set-Cookie", newAccessToken || "");

      if (responseRefresh.status === 200) {

        response = await fetch(url, {
          ...options,
          credentials: "include", // include cookies in the request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
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
