import Link from "next/link";
// import { LinkBar } from "../Link/LinkBar";
// import { Input } from "@/components/ui/input"
import { CommandMenu } from "../Buttons/SearchButton";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NavigationsMenu } from "./NavigationMenu";
import ToggleMenu from "./ToggleMenu/ToggleMenu";

// import NavigationMenuExample from "./NavigationMenu";


export default function NavBar() {
    return (
        <div className="navbar bg-neutral text-black ">
            <div className=" navbar-start">

                {/* icon link  */}
                <Link href={"/"} className="m-1 text-2xl">
                    <AuroraText colors={["#FF0000", "#7928CA", "#0070F3", "#38fdf8"]}>
                        Cars Hub
                    </AuroraText>
                </Link>
                <div>
                    <ToggleMenu />
                </div>

            </div>
            <div className="navbar-center">
                <NavigationsMenu />
            </div>
            {/* component for command CTRL + j to open search  */}
            <div>
                <CommandMenu />
                <div className="navbar-end ml-2">
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                    </div>









                    {/* <Input placeholder="Search" spellCheck={false}
                        data-ms-editor="false"
                    /> */}
            </div>
        </div>
    )
}