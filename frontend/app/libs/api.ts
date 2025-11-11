import { cookies } from "next/headers";


export async function getBrands() {
  try {
    const response = await fetch(`${process.env.NEXT_NEST_API_URL}/brands`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch brands");
  }
}

export async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_NEST_API_URL}/categories`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories");
  }
}

// export async function fetchWithRefresh(url: string, options?: RequestInit) {
//   const cookieStore = cookies();
//   const accessToken = (await cookieStore).get("accessToken");
//   const res = await fetch(url, {
//     ...options,
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     }
//   });
//   if (res.status !== 401 ) return res;

//   const refreshResponse = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
//     method: "POST",
//     credentials: "include",
//   })
//     if(!refreshResponse.ok) return refreshResponse

//     return fetch(url,{
//       ...options,
//       credentials: "include",
//     })
    
// }
