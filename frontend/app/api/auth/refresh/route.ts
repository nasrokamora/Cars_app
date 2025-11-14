import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token")?.value;
    const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": accessToken || "",
      },
      credentials: "include",
    })
    if(!response.ok){
       throw new Error("refresh token not valid")
    }
    const rowSetCookie = response.headers.get("Set-Cookie")
    const responseSuccess = new Response("success",{status:200});

    if (rowSetCookie) {
      rowSetCookie?.split(",").forEach((cookie) => {
        responseSuccess.headers.append("Set-Cookie", cookie);
      })
    }
    return responseSuccess
  } catch (error) {
    console.log (error);
    return new Response("refresh token not valid", { status: 500 });
  }
}
