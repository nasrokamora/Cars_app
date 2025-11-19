import { cookies } from "next/headers";

export async function GET(request: Request) {
    let response;
    const  accessToken = request.headers.get('access_token');

    try {
      if(accessToken){
        const response = await fetch(`${process.env.NEXT_NEST_API_URL}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        })
        if (response.status === 401) {
          const responseRefresh = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
          const setCookie = responseRefresh.headers.get('set-cookie');
          if(setCookie){
            const res = new Response("refresh token valid", { status: 200 });
            res.headers.set("Set-Cookie", setCookie);
            return res;
          }
        }
      }
    } catch (error) {
    console.error(error);     
    }

    return response || new Response("Not authenticated", { status: 401 });
}