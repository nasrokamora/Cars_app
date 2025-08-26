import {
    ToggleVault,
    ToggleVaultTrigger,
    ToggleVaultContent,
    ToggleVaultClose,
} from "@/components/ui/toggle-vault";
import { LinkBar } from "../../Link/LinkBar";
import Link from "next/link";

export default function ToggleMenu() {
    return (
        <div className=" w-full sm:hidden flex min-h-max">
            <ToggleVault className=" ">
                <ToggleVaultTrigger className="w-20 h-8 text-sm">
                    MENU
                </ToggleVaultTrigger>
                <ToggleVaultClose className="w-20 h-8 text-sm">
                    CLOSE
                </ToggleVaultClose>
                <ToggleVaultContent className="w-[300px] p-8 text-xl flex flex-col gap-4">
                    {LinkBar.map((link) => (
                        <ToggleVaultClose key={link.id}>
                            <Link href={link.url} className="hover:underline hover:decoration-blue-300 duration-300">{link.title.toUpperCase()}</Link>
                        </ToggleVaultClose>
                    ))}
                </ToggleVaultContent>
            </ToggleVault>
        </div>
    );
}
