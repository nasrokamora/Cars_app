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
// import futuristicCar from '@/public/all_image_cars/carRental.png'
import { LoginAction } from "@/app/api/auth/login/action";
import loginBg from '@/public/all_image_cars/bg_carhub.webp'



// // } // SignInAction
export default function LoginPage() {
    return (
        <form action={LoginAction}>
            <div className=" flex justify-center items-center h-screen relative">
                <div className="w-full">

                    <Image src={loginBg} fill alt="futuristic_car" className="object-cover   " placeholder="blur" priority />
                </div>
                <Card className="w-full max-w-sm text-3xl bg-gradient-to-br from-[#5d0002] to-sky-400/30 glass backdrop-blur absolute shadow-3xl shadow-sky-400 border-[#cd090a] border  ">
                    <CardHeader>
                        <CardTitle className="text-white">Login to your account</CardTitle>
                        <CardDescription className="text-white/70">
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
                                <Label htmlFor="email" className="text-[#ffffff]">Email</Label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="input bg-transparent text-xl  placeholder:text-gray-500 "
                                    name="email"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href={"/auth/forgot-password"}
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <input id="password" type="password" required name="password" placeholder="password" />
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
