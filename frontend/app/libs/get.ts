import { cookies } from "next/headers";



export async function getAccess(){
    const cookieStore = cookies();
    return (await cookieStore).get("access_token")?.value;
}