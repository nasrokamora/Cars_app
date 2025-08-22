"use client"

import * as React from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"




export function CommandMenu() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>Used Cars</CommandItem>
                    <CommandItem>New Cars</CommandItem>
                    <CommandItem>Sell Your Vehicle</CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
// "use client"

// import * as React from "react"



// export default function SearchButton() {
//     const [open, setOpen] = React.useState(false)

//     React.useEffect(() => {
//         const down = (e: KeyboardEvent) => {
//             if (e.key === "k" && e.ctrlKey) {
//                 e.preventDefault()
//                 setOpen((open) => !open)
//             }
//         }
//         document.addEventListener("keydown", down)
//         return () => document.removeEventListener("keydown", down)

//     }, [])
//     return (
//         <div >
//             {open && <div>hello</div>}
//             <label className="input">
//                 <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                     <g
//                         strokeLinejoin="round"
//                         strokeLinecap="round"
//                         strokeWidth="2.5"
//                         fill="none"
//                         stroke="currentColor"
//                     >
//                         <circle cx="11" cy="11" r="8"></circle>
//                         <path d="m21 21-4.3-4.3"></path>
//                     </g>
//                 </svg>
//                 <input type="search" className="grow" placeholder="Search" />
//                 <kbd className="kbd kbd-sm">⌘</kbd>
//                 <kbd className="kbd kbd-sm">K</kbd>
//             </label>
//         </div>
//     )
// }