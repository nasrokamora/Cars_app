import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, LogIn, } from "lucide-react"
// import { HoverButton } from "./HoverButton";
// import { cookies } from "next/headers";


export default async function LoginSignUpButton() {
    // const dataUser = await getUserProfile();
    // console.log(dataUser)

    return (
        <div className="  justify-center items-center gap-3 ">
            {!!false ? (
                <div>

                    <div className="sm:flex hidden flex-1 gap-3">

                        <Button variant="outline" className="">
                            <div>
                                <LinkPropsHref href="/auth/login" className=" text-center">
                                    Login
                                </LinkPropsHref>
                            </div>
                        </Button>

                        <Button className="bg-[#0067ba] text-white hover:bg-blue-700">
                            <div>
                                <LinkPropsHref href="/auth/register" className=" text-center">
                                    Get Started
                                </LinkPropsHref>
                            </div>
                        </Button>
                    </div>
                    <div className="sm:hidden ">
                        <div className="dropdown dropdown-bottom dropdown-end bg-transparent">
                            <div tabIndex={0} role="button" className=" cursor-pointer m-1 flex items-center gap-2 font-semibold ">
                                <User className="w-4 h-4" />
                                <span >Account</span>
                            </div>
                            <ul tabIndex={0} className="dropdown-content bg-white/30 backdrop-blur-md menu rounded-box z-1 w-52 p-2 shadow-sm mt-5">
                                <li className="">
                                    <div className="flex justify-start gap-2 items-center">

                                        <LogIn className="h-5 w-5 text-black" />
                                        <LinkPropsHref href="/auth/login" className=" font-semibold">Login</LinkPropsHref>
                                    </div>
                                </li>
                                <li><LinkPropsHref href="/auth/register" className=" text-center">Get Started</LinkPropsHref></li>
                            </ul>
                        </div>

                    </div>
                </div>

            ) : (
                <div>
                    {/* <UserProfile user={user as Users} /> */}
                    login
                </div>
            )}
        </div>
    )
}

function LinkPropsHref({
    href,
    children,
}: React.ComponentPropsWithoutRef<typeof Link> & { href: string }) {
    return (
        <Link href={href} >
            {children}
        </Link>
    )
}

