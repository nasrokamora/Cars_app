import Link from "next/link";
// import { LinkBar } from "../Link/LinkBar";
// import { Input } from "@/components/ui/input"
import { CommandMenu } from "../Buttons/SearchButton";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NavigationMenuDemo } from "./NavigationMenu";
// import NavigationMenuExample from "./NavigationMenu";


export default function NavBar() {
    return (
        <div className="navbar bg-neutral text-neutral-content justify-between">

            {/* icon link  */}
            <Link href={"/"} className="m-1 text-2xl">
                <AuroraText colors={["#FF0000", "#7928CA", "#0070F3", "#38fdf8"]}>
                    Cars Hub
                </AuroraText>
            </Link>

            {/*  list of Link routes  */}
            <div className=" ">
            <NavigationMenuDemo />

            </div>
            {/* <ul className="hidden  justify-center items-center  sm:flex">
                {LinkBar.map((link) => (
                    <li key={link.id} className="mx-2">
                        <Link href={link.url} className=" hover:underline hover:decoration-blue-300 duration-300">{link.title.toUpperCase()}</Link>
                    </li>
                ))}
                <p className="text-muted-foreground text-sm">
                    Press{" "}
                    <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </p>
            </ul> */}


            {/* component for command CTRL + j to open search  */}
            <div>
                <CommandMenu />
                <div>
                    {/* <Input placeholder="Search" spellCheck={false}
                        data-ms-editor="false"
                    /> */}
                </div>
            </div>
        </div>
    )
}