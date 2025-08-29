import Link from "next/link";
import { CommandMenu } from "../Buttons/SearchButton";
import { AuroraText } from "@/components/magicui/aurora-text";
// import {NavigationsMenu } from "./NavigationMenu";
import { DropdownMenuLinks } from "./DropDownMenu/DropDownMenu";
import LoginSignUpButton from "../Buttons/LoginSignUpButton";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
// import NavigationLargeLayout from "./NavigationLargeLayout";
import NavigationsLargeLayout from "./NavigationLargeLayout";
import NavigationsMenu from "./NavigationMenu";
import Image from "next/image";
import logoCarHub from '@/public/CarHub_MarketPlace.png'
import ToggleMenu from "./ToggleMenu/ToggleMenu";
// import NavigationMenuExample from "./NavigationMenu";


export default function NavBar() {
    return (
        <nav className="navbar  gap-1 justify-around items-center border-b border-gray-400  ">
            <div className="" >

                {/* icon link  */}
                <Link href={"/"} className="m-1 text-xl md:text-2xl font-bold lg:text-3xl xl:text-3xl hidden">
                    <AuroraText colors={["#FF0000", "#7928CA", "#0070F3", "#38fdf8"]}>
                        Cars Hub
                    </AuroraText>
                </Link>
                <div className="flex xs:flex lg:hidden xl:hidden 2xl:hidden md:hidden   w-full ">
                    <Link href={"/"}>
                    <Image src={logoCarHub} width={58} height={58} alt="carhub" priority />
                    </Link>
                </div>

            </div>
            {/* navigation menu md => all */}
            <div>
                <NavigationsMenu />
            </div>

            {/* navigation menu lg => all */}
            <div>
                <NavigationsLargeLayout />
            </div>

            {/* login and sign up lg => all */}
            <div>
                <LoginSignUpButton />
            </div>

            {/* dark mode toggle */}
            <div className=" flex justify-center items-center gap-2 ">
                <div className="mr-2">
                    {/* md => lg */}
                    <DropdownMenuLinks />
                </div>
                {/* xs => none */}
                <ToggleMenu />
                {/* toggle dark mode */}
                <AnimatedThemeToggler className="bg-none" />
            </div>

            {/* commend CTRL + K to open Commend research */}
            <div>
                <CommandMenu />
            </div>
        </nav>
    )
}