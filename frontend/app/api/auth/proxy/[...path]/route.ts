import { cookies } from "next/headers";

export async function GET(request:Request){
    const cookieStore = cookies()
    const accessToken = (await cookieStore).get("access_token")?.value;
    
}