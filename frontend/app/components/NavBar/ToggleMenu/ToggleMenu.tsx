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
    const neededLinks = ["about", "contact"];
    const AboutContactLinks = LinkBar.filter((link) => neededLinks.includes(link.title))
    return (
        <Sheet  >
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg bg-gray-100 dark:bg-none dark:border-none scroll-y-auto hidden "
                >
                    <Menu className="h-6 w-6 dark:text-white" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-78 ">
                <SheetHeader className="">
                    <SheetTitle className="text-lg font-bold text-[#0268bd]  ">
                        <SheetClose asChild>

                            <Link href="/" className="active:bg-gradient-to-l active:text-transparent active:bg-clip-text active:from-amber-700 active:to-blue-600 duration-300 active:scale-95 transition-transform">Cars Hub</Link>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>

                <div>
                    <div className="flex justify-center  items-center  ">
                        <SheetClose asChild>

                            <Link href="/Research" className=" font-bold flex justify-center items-center rounded-lg border border-[#0268bd] p-2 w-1/2 active:bg-blue-500 active:text-white duration-300 active:scale-95 transition-transform ">
                                Research
                                <div className="text-white pl-2">
                                    <kbd className="kbd kbd-sm mr-1 ">⌘</kbd>
                                    <kbd className="kbd kbd-sm ">K</kbd>
                                </div>
                            </Link>
                        </SheetClose>
                    </div>
                </div>


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
                    {AboutContactLinks.map((link) => (
                        <Link href={link.url} key={link.id} className="text-sm leading-none font-medium ml-2">{link.title}</Link>
                    ))}
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

