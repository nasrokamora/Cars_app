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
import { Separator } from "@/components/ui/separator";
import FooterCRH from "../../Footer/FooterCRH";


export default function ToggleMenu() {
    const AllComponentsLink = [...componentsLink, ...componentsVihicles]
    const neededLinks = ["About", "Contact"];
    const AboutContactLinks = LinkBar.filter((link) => neededLinks.includes(link.title))
    return (
        <Sheet    >
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg bg-gray-100 dark:bg-none dark:border-none  flex xs:hidden "
                >
                    <Menu className="h-6 w-6 dark:text-white" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-78 container overflow-y-scroll p-2  ">
                <SheetHeader className="">
                    <SheetTitle className=" text-[#0268bd]  ">
                        <SheetClose asChild>

                            <Link href="/" className=" bg-gradient-to-br from-blue-500 to-sky-400 text-transparent bg-clip-text text-2xl font-bold">Cars Hub</Link>
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
                            {/* {link.description} */}
                            {link.image}
                        </ToggleItemLink>
                    ))}
                    <Separator className="text-blue-500 font-bold text-md mt-1" />
                </ul>
                <Separator className="text-blue-500  " />
                <div className="flex justify-evenly items-center mt-5">

                    {AboutContactLinks.map((link) => (
                        <div key={link.id} className="flex justify-evenly items-center w-full ">

                            <Link href={link.url} className="btn border-none h-auto active:scale-95 transition-transform duration-150 rounded-lg text-lg">{link.title}</Link>
                        </div>
                    ))}
                </div>


                <FooterCRH />
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
                <Link href={href} className="w-full flex justify-around items-center   bg-gradient-to-br from-[#0066b7] to-sky-400 rounded-lg btn border-none h-auto active:scale-95 transition-transform duration-150">
                    <div className="text-xl leading-none font-medium ">{title}</div>
                    <div className="flex  justify-around items-center p-2 text-muted-foreground line-clamp-2  leading-snug">
                        {children}

                    </div>

                </Link>
            </SheetClose>

        </li>
    )
}

