"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, LogOut } from "lucide-react";

type Car = {
    id: string;
    title?: string;
    brand?: string;
    discription?: string;
    price?: number;
    createdAt?: string;
};

export default function DashboardPage() {
    const [cars, setCars] = useState<Car[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                // ⚠️ تأكد أن NEXT_PUBLIC_NEST_API_URL مُعرّف في env (مثلاً https://api.example.com)
                const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_API_URL}/cars/my`, {
                    method: "GET",
                    credentials: "include", // مهم: يرسل الكوكيز (access_token)
                    headers: {
                        "Accept": "application/json",
                    },
                });

                if (res.status === 401) {
                    // ليس مسجلاً دخول -> أعد التوجيه للـ login
                    router.push("/login");
                    return;
                }

                if (!res.ok) {
                    const txt = await res.text();
                    throw new Error(txt || "Failed to load cars");
                }

                const data = await res.json();

                if (mounted) setCars(data);
            } catch (error ) {
                if (mounted) setError(error as string);
    } finally {
        if (mounted) setLoading(false);
    }
}
load();
return () => {
    mounted = false;
};
    }, [router]);

async function handleLogout() {
    try {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include", // يمرر الكوكيز عشان NestJS يحذفها
        });
    } catch (err) {
        console.error(err);
    } finally {
        router.push("/login");
    }
}

const filtered = cars?.filter((c) =>
    `${c.brand ?? ""} ${c.title ?? ""} ${c.discription ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
);

return (
    <div className="min-h-screen bg-slate-50 p-6">
        <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="/avatar-placeholder.png" alt="user" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">مرحباً بك</h1>
                    <p className="text-sm text-muted-foreground">لوحة التحكم — سياراتي</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Input
                    placeholder="ابحث في سياراتك..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="max-w-xs"
                />
                <Button variant="ghost" onClick={() => router.push("/cars/new")}>
                    أضف سيارة <ArrowRight className="ml-2" />
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="ml-2" /> خروج
                </Button>
            </div>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column: إحصاءات بسيطة */}
            <section className="md:col-span-1 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>الإحصاءات</CardTitle>
                        <CardDescription>نظرة عامة سريعة</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-8 w-32" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>عدد السيارات</span>
                                    <strong>{cars?.length ?? 0}</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span>إجمالي متوسط السعر</span>
                                    <strong>
                                        {cars && cars.length > 0
                                            ? Math.round(
                                                (cars.reduce((s, c) => s + (c.price ?? 0), 0) / cars.length) * 100,
                                            ) / 100 + " د.ج"
                                            : "—"}
                                    </strong>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>سريعة</CardTitle>
                        <CardDescription>أوامر سريعة</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <Button onClick={() => router.push("/cars/new")}>أضف سيارة جديدة</Button>
                            <Button variant="ghost" onClick={() => router.push("/profile")}>
                                تعديل الملف
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Right column: قائمة السيارات */}
            <section className="md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">قائمة سياراتي</h2>

                {loading && (
                    <div className="grid gap-4">
                        <Skeleton className="h-28 rounded" />
                        <Skeleton className="h-28 rounded" />
                        <Skeleton className="h-28 rounded" />
                    </div>
                )}

                {!loading && error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
                )}

                {!loading && !error && filtered && filtered.length === 0 && (
                    <div className="p-6 bg-white rounded shadow text-center">لا توجد سيارات لعرضها</div>
                )}

                {!loading && !error && filtered && filtered.length > 0 && (
                    <div className="grid gap-4">
                        {filtered.map((car) => (
                            <Card key={car.id} className="hover:shadow-lg transition">
                                <CardContent className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold">{car.brand} — {car.title}</h3>
                                        <p className="text-sm text-muted-foreground">{car.discription}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold">{car.price ? `${car.price} د.ج` : "—"}</div>
                                        <div className="text-xs text-muted-foreground">{car.createdAt ? new Date(car.createdAt).toLocaleDateString() : ""}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </main>
    </div>
);
}
