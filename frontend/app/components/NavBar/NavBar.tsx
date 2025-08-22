import Link from "next/link";
import { LinkBar } from "../Link/LinkBar";
// import { Input } from "@/components/ui/input"
import { CommandMenu } from "../Buttons/SearchButton";


export default function NavBar() {
    return (
        <div className="navbar bg-neutral text-neutral-content justify-between">
            <Link href={"/"} className="m-1 text-xl">CarHub</Link>

            <ul className=" flex justify-center items-center">
                {LinkBar.map((link) => (
                    <li key={link.id} className="mx-2">
                        <Link href={link.url}>{link.title.toUpperCase()}</Link>
                    </li>
                ))}
            </ul>
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