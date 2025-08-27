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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function LoginPage() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
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
                            <Input id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter>
        </Card>
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
