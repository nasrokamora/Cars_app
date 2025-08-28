import Link from "next/link";
import { CommandMenu } from "../Buttons/SearchButton";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NavigationsMenu } from "./NavigationMenu";
import { DropdownMenuLinks } from "./DropDownMenu/DropDownMenu";
import LoginSignUpButton from "../Buttons/LoginSignUpButton";

// import NavigationMenuExample from "./NavigationMenu";


export default function NavBar() {
    return (
        <nav className="navbar bg-neutral text-black gap-3 justify-between items-center ">
            <div className=" ">

                {/* icon link  */}
                <Link href={"/"} className="m-1 text-xl md:text-2xl font-bold lg:text-3xl xl:text-3xl">
                    <AuroraText colors={["#FF0000", "#7928CA", "#0070F3", "#38fdf8"]}>
                        Cars Hub
                    </AuroraText>
                </Link>
                <div>
                    <DropdownMenuLinks />
                </div>

            </div>
            <div className="">
                <NavigationsMenu />
            </div>

            <div className="">
                <LoginSignUpButton />
            </div>
            <div>
                <CommandMenu />
            </div>
            {/* <div className="">
                <Link href={"/login"} className="btn  rounded-btn">
                    Login
                </Link>
            </div> */}
        </nav>
    )
}