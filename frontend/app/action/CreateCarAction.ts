"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface FormState {
  success?: boolean;
  message?: string;
  error?: string;
  data?: unknown;
}

export async function CreateCarAction(PrevState: FormState, formData: FormData) {
    const accessToken = (await cookies()).get("access_token")?.value;
    if(!accessToken) {
        return { success: false, message: "Unauthorized",status: 401 };
    }
  try {
    const car = {
      title: formData.get("title") as string,
      discription: formData.get("discription") as string,
      price: Number(formData.get("price")),
      brandId: formData.get("brandId") as string,
      categoryId: formData.get("categoryId") as string,
    };

    const response = await fetch(
      `http://localhost:3000/api/cars/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
        cache: "no-store",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.error || "Failed to create car" };
    }
    revalidatePath("/dashboard");
    return { success: true, message: "Car created successfully" };
  } catch (error) {
    console.error("Create car action failed:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
