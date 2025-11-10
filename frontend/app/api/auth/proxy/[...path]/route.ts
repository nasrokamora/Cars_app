"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");

  // 1) نمنع المرور على روت refresh حتى لا يحصل infinite loop
  if (path.startsWith("auth/refresh")) {
    return NextResponse.json(
      { error: "Refresh route cannot be proxied" },
      { status: 400 }
    );
  }

  // 2) نقرأ التوكن من الكوكيز
  const cookieStore = cookies();
  let accessToken = (await cookieStore).get("access_token")?.value;

  // 3) إذا لا يوجد access token نقوم بالتجديد
  if (!accessToken) {
    const refreshed = await fetch(
      `${process.env.NEXT_BASE_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshed.ok) {
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      );
    }

    // نعيد القراءة بعد التجديد
    accessToken = (await cookies()).get("access_token")?.value;
  }

  // 4) نرسل الطلب إلى Nest API
  const upstream = await fetch(
    `${process.env.NEXT_NEST_API_URL}/${path}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  // 5) لو انتهت الجلسة (Nest رجع 401) نعيد التجديد ثم نعيد الطلب
  if (upstream.status === 401) {
    const refreshed = await fetch(
      `${process.env.NEXT_BASE_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshed.ok) {
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      );
    }

    // إعادة قراءة التوكن الجديد بعد التحديث
    const retryToken = (await cookies()).get("access_token")?.value;

    const retryRes = await fetch(
      `${process.env.NEXT_NEST_API_URL}/${path}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${retryToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const retryBody = await retryRes.json();
    return NextResponse.json(retryBody, {
      status: retryRes.status,
    });
  }

  // 6) نرجّع الرد الأصلي بدون مشاكل
  const data = await upstream.json();
  return NextResponse.json(data, {
    status: upstream.status,
  });
}



// "use server"
// // خاص بعملية تجديد الـ JWT و user profile

// import { cookies } from "next/headers";
// import { NextResponse} from "next/server";

// export async function GET(request: Request, { params }: { params: { path: string[] } }) {
//     const path = params.path.join('/');
//     const accessToken = request.headers.get('access_token');
//     // const refreshToken = request.headers.get('refresh_token');

//     //نقوم بتجديد الـ access token
//     if(!accessToken){
//         const refrechRequest = await fetch(`${process.env.NEXT_BASE_URL}/api/auth/refresh`, {
//             method:"POST",
//         })
//         if(!refrechRequest.ok){
//             return NextResponse.json({error:"refresh token not valid"}, {status:401})
//         }
//     }
//     //بعد التجديد نحاول قراءة access token
//     const token = request.headers.get('access_token');

//     const upstream = await fetch(`${process.env.NEXT_NEST_API_URL}/${path}`,{
//        method:"GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//         // body:JSON.stringify({})
//     })
//     if(upstream.status === 401){
//         const refrechRequest = await fetch(`${process.env.NEXT_BASE_URL}/api/auth/refresh`, {
//             method:"POST",
//         })
//         if(!refrechRequest.ok){
//             return NextResponse.json({error:"session expired"}, {status:401})
//         }
        
//         //نحاول اعادة قراءة الـ access token

//     const retryToken = (await cookies()).get('access_token')?.value;
//     const retry = await fetch(`${process.env.NEXT_NEST_API_URL}/${path}`,{
//         method:"GET",
//         headers:{
//             Authorization:`Bearer ${retryToken}`,
//             "Content-Type": "application/json",
//         }
//     })
//     const retryBody = await retry.json();
//     return NextResponse.json(retryBody, {status:retry.status});
// }
//     const data = await upstream.json();
//     return NextResponse.json(data, {status:upstream.status});
// }