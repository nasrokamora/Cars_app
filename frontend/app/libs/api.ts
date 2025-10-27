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

// export async function getProfile() {
//   const accessToken = (await cookies()).get("access_token")?.value;
//   try {
//     const response = await fetch(`${process.env.NEXT_NEST_API_URL}/profile`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       cache: "no-store",
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch cars");
//     }
//     const data = await response.json();
//     return data;

//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to fetch cars");
//   }

// }
