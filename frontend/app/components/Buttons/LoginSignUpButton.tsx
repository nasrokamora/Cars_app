import { Button } from "@/components/ui/button";
import Link from "next/link";




export default function LoginSignUpButton() {
    return (
        <div className="sm:flex hidden  justify-center items-center gap-3 ">
            <Button variant="outline" className="">
                <div>
                    <Link href="/auth/login" className=" text-center">
                        Login
                    </Link>
                </div>
            </Button>

            <Button className="bg-[#0067ba] text-white hover:bg-blue-700">
                <div>
                    <Link href="/auth/register" className=" text-center">
                        Get Started
                    </Link>
                </div>
            </Button>
        </div>
    )
}