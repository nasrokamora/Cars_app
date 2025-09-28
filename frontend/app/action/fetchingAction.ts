// fetch brands action

export async function FetchBrands() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_API_URL}/brands`,
      {
        method: "GET",
        credentials: "include", // يمرر الكوكيز عشان NestJS يحذفها
        headers: { Accept: "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
}


export async function FetchCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_API_URL}/categories`,
      {
        method: "GET",
        credentials: "include", // يمرر الكوكيز عشان NestJS يحذفها
        headers: { Accept: "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
}
