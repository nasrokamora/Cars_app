import Link from "next/link";
import { CommandMenu } from "../Buttons/SearchButton";
import { AuroraText } from "@/components/magicui/aurora-text";
// import {NavigationsMenu } from "./NavigationMenu";
import { DropdownMenuLinks } from "./DropDownMenu/DropDownMenu";
import LoginSignUpButton from "../Buttons/LoginSignUpButton";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
// import NavigationLargeLayout from "./NavigationLargeLayout";
import NavigationsLargeLayout from "./NavigationLargeLayout";
import NavigationsMenu from "./NavigationMenu";
import Image from "next/image";
import logoCarHub from '@/public/logo_Cars_Hub.png'
import logoCarHub_white_v from '@/public/logo_png_Cars_Hub_white_v.png'
import ToggleMenu from "./ToggleMenu/ToggleMenu";
import { cookies } from "next/headers";
// import NavigationMenuExample from "./NavigationMenu";


export default async function NavBar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  let user: { username?: string; email?: string } | null = null;

  if (accessToken) {
    try {
      // ✅ جلب بيانات المستخدم من NestJS مباشرة
      const response = await fetch(`${process.env.NEXT_NEST_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store", // حتى لا يخزن الرد في الكاش
      });

      if (response.ok) {
        user = await response.json();
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  }
    return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      <div className="text-2xl font-bold">CARS HUB</div>

      <div className="flex gap-4 items-center">
        <Link href="/">Home</Link>
        <Link href="/cars">Cars</Link>
        <Link href="/vehicles">Vehicles</Link>
        <Link href="/research">Research</Link>

        {!accessToken || !user ? (
          <>
            <Link
              href="/auth/login"
              className="px-3 py-1 border rounded-md hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get Started
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="font-medium">{user.username || user.email}</div>
            <form action="/auth/logout" method="post">
              <button
                type="submit"
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
    
}