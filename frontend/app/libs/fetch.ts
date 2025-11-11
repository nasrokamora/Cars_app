import { NextResponse } from "next/server"


export async function fetchWithRefresh(url:string, options?: RequestInit, request?: Request) {
    const accessToken = request?.headers.get('cookie')
    const res = await fetch(url,{
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    })

    if(!res.ok){
        try {
            const refreshResponse = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await refreshResponse.json();
            if(!refreshResponse.ok){
                return NextResponse.json({error:"refresh token not valid"}, {status:401})
            }
            const newResponse = await fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.accessToken}`
                }
            })
            return newResponse
        }catch(error){
            return NextResponse.json({error:"refresh token not valid"}, {status:401})
            console.error("Error refreshing token:", error);
        }
    } 
    return NextResponse.json({error:"refresh token not valid"}, {status:401})
        // return NextResponse.json({error:"refresh token not valid"}, {status:401})
    }
