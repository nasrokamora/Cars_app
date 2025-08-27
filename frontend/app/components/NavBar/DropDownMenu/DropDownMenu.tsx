
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LinkBar } from "../../Link/LinkBar";
// import Image from "next/image";
// import LogoImage from "@/public/CarHub_MarketPlace.png"
export function DropdownMenuLinks() {
    return (
        <div className="sm:hidden">
            <Sheet >
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl bg-gray-100 dark:bg-gray-800"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64">
                    <SheetHeader className="">
                        <SheetTitle className="text-lg font-semibold text-[#0268bd]  ">

                            {/* <Image src={LogoImage} alt="CarHub Logo" draggable={false} width={50} height={50} /> */}
                            Cars Hub

                        </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-3 mt-6">
                        {LinkBar.map((link) => (
                            <SheetClose asChild key={link.id}>
                                <Link
                                    href={link.url}
                                    className="px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    {link.title}
                                </Link>
                            </SheetClose>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>

    )
}
