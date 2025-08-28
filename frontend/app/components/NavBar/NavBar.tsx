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

// import NavigationMenuExample from "./NavigationMenu";


export default function NavBar() {
    return (
        <nav className="navbar  gap-1 justify-around items-center border-b border-gray-400  ">
            <div >

                {/* icon link  */}
                <Link href={"/"} className="m-1 text-xl md:text-2xl font-bold lg:text-3xl xl:text-3xl">
                    <AuroraText colors={["#FF0000", "#7928CA", "#0070F3", "#38fdf8"]}>
                        Cars Hub
                    </AuroraText>
                </Link>


            </div>
            {/* navigation menu md => all */}
            <div>
                <NavigationsMenu />
            </div>

            {/* navigation menu sm => none */}

            {/* <div>
                <NavigationLargeLayout />
            </div> */}
            <div>
                <NavigationsLargeLayout />
            </div>

            {/* login and sign up */}
            <div>
                <LoginSignUpButton />
            </div>

            {/* dark mode toggle */}
            <div className=" flex justify-center items-center gap-4 ">
                <AnimatedThemeToggler className="bg-none" />
                <div>
                    <DropdownMenuLinks />
                </div>
            </div>

            {/* commend CTRL + K to open Commend research */}
            <div>
                <CommandMenu />
            </div>
        </nav>
    )
}