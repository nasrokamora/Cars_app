import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get("refresh_token")?.value;

  if(!refreshToken){
    return NextResponse.json({error:"refresh token not found"}, {status:401})
  }


  const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "cookie":`refresh_token=${refreshToken}`
    }
  })

  if(!response.ok){// لو لم يكن الرد ناجح
    const res = NextResponse.json({error:"refresh token not valid"}, {status:401})
    // res.cookies.delete("refresh_token")// مسح الكوكي
    res.cookies.delete("access_token")// مسح الكوكي
    return res
  }

  const setCookie = response.headers.get("set-cookie");// التقاط الكوكي
  const responseSuccess = NextResponse.json({success:true});// الرد الناجح
  if(setCookie){
    responseSuccess.headers.set("set-cookie", setCookie)// تعيين الكوكي
  } 
  return responseSuccess;
}

// // import { NextResponse } from "next/server";

// // export async function POST(request: Request) {

// //   const incomingRequest = request.headers.get("cookie") || "";

// //   try {
// //     const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         cookie: incomingRequest,
// //       },
// //     });
// //     const data = await response.json();
// //     const nextResponse = NextResponse.json(data, { status: response.status });

// //     const setCookie = response.headers.get("set-cookie");
// //     if (setCookie) {
// //       nextResponse.headers.set("set-cookie", setCookie);
// //     }
// //     return nextResponse;
// //   } catch (error) {
// //     console.error("Error refreshing token:", error);
// //     return NextResponse.json(
// //       { error: "Failed to refresh token" },
// //       { status: 500 }
// //     );
// //   }
// // }
