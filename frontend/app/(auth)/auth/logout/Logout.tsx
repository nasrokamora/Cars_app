"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Logout failed:");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // بعد تنفيذ الطلب، نعيد المستخدم إلى صفحة تسجيل الدخول
      router.push("auth/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
    >
      تسجيل الخروج
    </button>
  );
}
