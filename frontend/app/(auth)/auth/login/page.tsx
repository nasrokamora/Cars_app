// import Image from "next/image";
// import imageLogin from "../../../public/Futuristic Car.png"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import Image from "next/image";
import futuristicCar from '@/public/all_image_cars/carRental.png'
import { LoginAction } from "@/app/api/auth/login/action";

// // import { redirect } from "next/navigation";

// // import { LoginAction } from "@/app/action/actions";


// // async function LoginAction(formData: FormData) {
// //   "use server";
// //   const email = formData.get("email") as string;
// //   const password = formData.get("password") as string;

// //   const response = await fetch("http://localhost:3000/api/auth/login", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ email, password }),
// //     credentials: "include"
// //   });
// //   const data = await response.json();
// // if (!response.ok ) {
// //     throw new Error('Failed to login');
// // }

// //   console.log(data);
// //   if (data.error) {
// //     throw new Error(data.error);
// //   }


// // } // SignInAction
export default function LoginPage() {
    return (
        <form action={LoginAction}>
            <div className=" flex justify-center items-center h-screen relative">
                <div className="w-full">

                    <Image src={futuristicCar} fill alt="futuristic_car" className="object-cover blur-md  " placeholder="blur" priority />
                </div>
                <Card className="w-full max-w-sm text-3xl bg-gradient-to-br from-blue-500 to-sky-400/30 glass backdrop-blur absolute shadow-3xl shadow-sky-400 border-[#cd090a] border  ">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription className="text-white">
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button variant="link" className="text-xl">
                                <Link href={'/auth/register'} >
                                    Sign Up
                                </Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="placeholder:text-white"
                                    name="email"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <input id="password" type="password" required name="password" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full cursor-pointer " >
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </form>
        // <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        //     {/* <Image src={imageLogin} fill alt="Login" className="object-contain" /> */}
        //     <div className="w-full max-w-md  dark:bg-gray-800 rounded-xl shadow p-6">
        //         <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        //         {/* 🔑 هنا تضيف الفورم */}
        //         <form className="space-y-4">
        //             <input
        //                 type="email"
        //                 placeholder="Email"
        //                 className="w-full p-2 border rounded-lg dark:bg-gray-700"
        //             />
        //             <input
        //                 type="password"
        //                 placeholder="Password"
        //                 className="w-full p-2 border rounded-lg dark:bg-gray-700"
        //             />
        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        //             >
        //                 Login
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
}
