"use client";


import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Car, User } from "lucide-react"
// import Image from "next/image";
// import LogoImage from "@/public/CarHub_MarketPlace.png"
export function DropdownMenuLinks() {
    return (
        <div className="sm:hidden  mr-3">
            <Popover >

                <PopoverTrigger asChild >
                    <Button variant="outline" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Account</span>
                    </Button>
                </PopoverTrigger>

                {/* المحتوى */}
                <PopoverContent className="w-64 p-4 space-y-4 rounded-2xl shadow-md">
                    <div className="text-center mb-2">
                        <h3 className="text-lg font-semibold">Welcome to AutoMarket 🚗</h3>
                        <p className="text-sm text-muted-foreground">
                            Buy & sell cars, trucks and more
                        </p>
                    </div>

                    <Button variant="outline" className="w-full flex gap-2">
                        <Car className="w-4 h-4 text-blue-600" />
                        <Link href="/auth/login" className="w-full text-center">
                            Login
                        </Link>
                    </Button>

                    <Button className="w-full bg-[#0067ba] text-white hover:bg-blue-700 flex gap-2">
                        <Car className="w-4 h-4 text-white" />
                        <Link href="/auth/register" className="w-full text-center">
                            Get Started
                        </Link>
                    </Button>
                </PopoverContent>
            </Popover>
            {/* <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Account</Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 space-y-3">
                    <Button variant="outline" className="w-full">
                        <Link href="/auth/login" className="w-full text-center">
                            Login
                        </Link>
                    </Button>
                    <Button className="w-full bg-[#0067ba] text-white hover:bg-blue-700">
                        <Link href="/auth/register" className="w-full text-center">
                            Get Started
                        </Link>
                    </Button>
                </PopoverContent>
            </Popover> */}



            {/* <Sheet >
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-lg bg-gray-100 dark:bg-none dark:border-none scroll-y-auto"
                    >
                        <Menu className="h-6 w-6 dark:text-white" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 glass bg-white/30">
                    <SheetHeader className="">
                        <SheetTitle className="text-lg font-semibold text-[#0268bd]  "> */}

            {/* <Image src={LogoImage} alt="CarHub Logo" draggable={false} width={50} height={50} /> */}


            {/* </SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 flex flex-col gap-3">
                            <Button variant="outline" className="w-full">
                        <SheetClose asChild>
                                <Link href="/auth/login" className="w-full text-center">
                                    Login
                                </Link>
                        </SheetClose>
                            </Button>

                            <Button className="w-full bg-[#0067ba] text-white hover:bg-blue-700">
                        <SheetClose asChild>
                                <Link href="/auth/register" className="w-full text-center">
                                    Get Started
                                </Link>
                        </SheetClose>
                            </Button>
                    </div>


                </SheetContent>
            </Sheet> */}
        </div>

    )
}
