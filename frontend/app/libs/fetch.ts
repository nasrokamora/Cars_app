"use server";;
import { cookies } from "next/headers";

let BASE_URL;

BASE_URL = process.env.NEXT_NEST_API_URL;

export async function FetchWithRefresh(url: string, options: RequestInit) {
  // const cookieStore = cookies();
  // const accessToken = (await cookieStore).get("access_token")?.value;
  let response = await fetch(url,{
    ...options,
    headers:{
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${accessToken}`,
    }
  })
}
