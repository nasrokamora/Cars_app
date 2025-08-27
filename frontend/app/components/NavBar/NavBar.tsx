import Link from "next/link";
// import { LinkBar } from "../Link/LinkBar";
// import { Input } from "@/components/ui/input"
import { CommandMenu } from "../Buttons/SearchButton";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NavigationsMenu } from "./NavigationMenu";
// import ToggleMenu from "./ToggleMenu/ToggleMenu";
import { DropdownMenuLinks } from "./DropDownMenu/DropDownMenu";

// import NavigationMenuExample from "./NavigationMenu";


export default function NavBar() {
    return (
        <nav className="navbar bg-neutral text-black gap-3 ">
            <div className=" navbar-start">

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
            <div className="navbar-center">
                <NavigationsMenu />
            </div>
            {/* component for command CTRL + j to open search  */}
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