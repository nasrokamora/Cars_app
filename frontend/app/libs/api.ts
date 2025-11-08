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

export async function fetchWithRefresh(url: string, options?: RequestInit) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (!accessToken && response.status === 401) {
    // If unauthorized, try to refresh the token
    const refreshResponse = await fetch(
      `http://localhost:3000/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!refreshResponse.ok) {
      throw new Error("Unauthorized");
    }
    return fetch(url, {
      ...options,
      credentials: "include",
    });
  }
  return response;
}
