"use server";;
import { cookies } from "next/headers";

// let BASE_URL;

// BASE_URL = process.env.NEXT_NEST_API_URL;

export async function FetchWithRefresh(url: string, options: RequestInit) {
  let response = await fetch(url,{
    ...options,
    headers:{
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${accessToken}`,
    }
  })
    if(response.status === 401){
      const refreshResponse = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const setCookie = refreshResponse.headers.get("set-cookie");
      if (setCookie) {
        const cookieStore = cookies();
        const cookieList = setCookie
          .split(/,(?=\s*[a-zA-Z0-9_\-]+=)/)
          .filter((cookie) => cookie.includes("access_token"));
        for (const cookie of cookieList) {
          const [name, value] = cookie.split(";")[0].split("=");
          (await cookieStore).set(name.trim(), value.trim());
        }
      }
      
      response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
    }
  
}
