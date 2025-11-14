"use server";


export async function fetchWithRefresh(url: string, options?: RequestInit) {
  let response = await fetch(url, {
    ...options,
    credentials: "include", // include cookies in the request
    headers: {
      "Content-Type": "application/json",

    },
  });
  if (response.status === 401) {
    try {
      const responseRefresh = await fetch(
        `${process.env.NEXT_BASE_URL}/api/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseRefresh.status === 200) {
        console.log("refreshed token");
      }
    } catch (error) {
      console.log(error);
    }
    response = await fetch(url, {
      ...options,
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return response;
}
