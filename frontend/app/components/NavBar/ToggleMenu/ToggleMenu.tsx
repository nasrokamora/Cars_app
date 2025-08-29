// import {
//     ToggleVault,
//     ToggleVaultTrigger,
//     ToggleVaultContent,
//     ToggleVaultClose,
// } from "@/components/ui/toggle-vault";
import { LinkBar } from "../../Link/LinkBar";
import * as React from "react";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { componentsLink, componentsVihicles } from "../../Link/ComponentsAllLink";

export default function ToggleMenu() {
    const AllComponentsLink = [...componentsLink, ...componentsVihicles]
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg bg-gray-100 dark:bg-none dark:border-none scroll-y-auto"
                >
                    <Menu className="h-6 w-6 dark:text-white" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-78 ">
                <SheetHeader className="">
                    <SheetTitle className="text-lg font-bold text-[#0268bd]  ">
                        <SheetClose asChild>

                            <Link href="/">Cars Hub</Link>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <ul className="mt-8 flex flex-col gap-3">
                    {AllComponentsLink.map((link) => (
                        <ToggleItemLink
                            key={link.title}
                            title={link.title}
                            href={link.href}
                        >
                            {link.description}
                            {link.image}
                        </ToggleItemLink>
                    ))}
                    {/* <Button variant="outline" className="w-full">
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
                    </Button> */}
                </ul>



            </SheetContent>
        </Sheet>
    );
}


function ToggleItemLink({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <SheetClose asChild>
                <Link href={href} className=" btn border-none h-auto active:scale-95 transition-transform duration-150">
                    <div className="text-sm leading-none font-medium ml-2">{title}</div>
                    <div className="flex justify-evenly items-center pr-2 text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </div>
                </Link>
            </SheetClose>
        </li>
    )
}

