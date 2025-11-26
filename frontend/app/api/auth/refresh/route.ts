export async function POST() {
  try {
    const response = await fetch(
      `${process.env.NEXT_NEST_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("refresh token not valid");
    }
    const setCookie = response.headers.get("Set-Cookie");
    const res = new Response("refresh token valid", { status: 200 });
    if (setCookie) {
      res.headers.set("Set-Cookie", setCookie);
    }
    return res;
  } catch (error) {
    console.log(error);
    return new Response("refresh token not valid", { status: 500 });
  }
}
