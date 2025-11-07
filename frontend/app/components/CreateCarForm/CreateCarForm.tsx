"use client";

import { CreateCarAction } from "@/app/action/CreateCarAction";
import { Brand, Car, Category } from "@/app/types/car";
import { useActionState, useOptimistic } from "react";
import { toast } from "sonner";


interface FormState {
    success?: boolean;
    error?: string;
    data?: unknown;

}

export default function CreateCarForm({
    brand,
    category,
    initialCars
}: {
    brand: Brand[],
    category: Category[],
    initialCars: Car[]
}) {

    const [state, formAction, isPending] = useActionState<FormState, FormData>(CreateCarAction, { success: false });

    const [optimisticCars, addOptimisticCar] = useOptimistic(initialCars, (state, newCar: Car) => [...state, newCar]);


    const handleSubmit = async (FormData: FormData) => {

        const tempCar: Car = {
            title: FormData.get("title") as string,
            brandId: FormData.get("brandId") as string,
            categoryId: FormData.get("categoryId") as string,
            price: parseInt(FormData.get("price") as string),
            discription: FormData.get("discription") as string,
        }

        addOptimisticCar(tempCar);
         formAction(FormData);
    }



    return (
        <div className="p-4 h-auto bg-gray-50 rounded-lg border flex justify-center items-center flex-col container">
            <form action={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    placeholder="اسم السيارة"
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    name="price"
                    placeholder="السعر بالدينار"
                    type="number"
                    className="border p-2 w-full rounded"
                    required
                />
                <textarea
                    name="discription"
                    placeholder="الوصف (اختياري)"
                    className="border p-2 w-full rounded"
                />

                <select name="brandId" className="border p-2 w-full rounded" required>
                    <option value="">اختر العلامة التجارية</option>
                    {brand.map((b) => (
                        <option key={b.id} value={b.id}>
                            {b.name}
                        </option>
                    ))}
                </select>

                <select name="categoryId" className="border p-2 w-full rounded" required>
                    <option value="">اختر الفئة</option>
                    {category.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
                    disabled={isPending}
                    onClick={()=> toast('created')}
                >
                    {isPending ? "جاري الإضافة..." : "إضافة السيارة"}
                </button>
            </form>

            {state.error && <p className="text-red-600 mt-2">{state.error}</p>}
            {state.success && toast("تمت إضافة السيارة بنجاح")}

            <div className="mt-6">
                <h2 className="font-semibold mb-2">🚘 سياراتك الحالية:</h2>
                {optimisticCars.length === 0 ? (
                    <p className="text-gray-500">لا توجد سيارات بعد</p>
                ) : (
                    <ul className="space-y-2 flex justify-around items-center gap-3 flex-wrap">
                        {optimisticCars.map((car, index) => (
                            <li key={car.id || index} className="border p-3 rounded bg-white">
                                <p className="font-medium">{car.title}</p>
                                <p className="text-sm text-gray-600">{car.price} دج</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}