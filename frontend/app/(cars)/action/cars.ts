"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function CarAction(formData: FormData) {
  const access_token = (await cookies()).get("access_token")?.value;
  if (!access_token) {
    throw new Error("No access token found");
  }
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;
  const title = formData.get("title") as string;
  const discription = formData.get("discription") as string;
  const price = Number(formData.get("price"));
  const images = formData.getAll("images") as File[];

  try {
    const response = await fetch(
      `${process.env.NEXT_NEST_API_URL}/cars/create-car`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          brandId,
          categoryId,
          title,
          discription,
          price,
          images,
        }),
        cache: "no-store",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText + " Failed to create car");
    }
    revalidatePath('/cars');
  } catch (error) {
    console.error("Error creating car:", error);
    throw new Error("Error creating car: " + (error as Error).message);
  }
  
}
 revalidatePath('/dashboard');

