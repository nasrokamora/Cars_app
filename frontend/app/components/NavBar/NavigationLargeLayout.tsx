"use client"
// import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    // NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
// import { componentsLink } from "./NavigationMenu"
import Link from "next/link"
import { componentsLink, componentsVihicles } from "../Link/ComponentsAllLink"
// import { ListItemLink } from "./NavigationMenu"
// import { componentsLink } from "@/app/components/NavBar/NavigationMenu"


export default function NavigationsLargeLayout() {
    return (
        <div className=" hidden sm:flex xs:  md:hidden lg:hidden xl:hidden 2xl:hidden ">
            <NavigationMenu viewport={true} >
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>All Vihicles</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid  w-[300px] gap-4">

                                {componentsLink.map((link) => (
                                    <ListItemLargeLayoutLink
                                        key={link.title}
                                        title={link.title}
                                        href={link.href}
                                        className=""
                                    >
                                        <div className=" flex justify-between items-center">
                                            {link.description}
                                            {link.image}
                                        </div>
                                    </ListItemLargeLayoutLink>
                                ))}
                                {componentsVihicles.map((link) => (
                                    <ListItemLargeLayoutLink
                                        key={link.title}
                                        title={link.title}
                                        href={link.href}
                                        className=""
                                    >
                                        <div className=" flex justify-between items-center">
                                            {link.description}
                                            {link.image}
                                        </div>
                                    </ListItemLargeLayoutLink>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Search */}
                    <NavigationMenuItem className="">
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <div className="flex justify-center items-center ">
                                <Link href="/Research" className=" flex justify-center items-center ">
                                    Research
                                    <div className="text-white pl-2">
                                        <kbd className="kbd kbd-sm mr-1 ">⌘</kbd>
                                        <kbd className="kbd kbd-sm ">K</kbd>
                                    </div>
                                </Link>
                            </div>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                {/* <NavigationMenuViewport /> */}
            </NavigationMenu>
        </div>
    )
}

function ListItemLargeLayoutLink({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>

                <Link href={href} className="">
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <div className="text-muted-foreground line-clamp-2 text-sm leading-snug" >{children}</div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}




// export function NavigationLargeLayout() {
//   return (
//     <div className="hidden sm:flex">

//       <NavigationMenu viewport={false} className="">
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger>Cars</NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <ul className="grid  w-[300px] gap-4">
//                 {componentsLink.map((link) => (
//                   <ListItemLink
//                     key={link.title}
//                     title={link.title}
//                     href={link.href}
//                     className=""
//                   >
//                     <div className=" flex justify-between items-center">

//                       {link.description}
//                       {link.image}
//                     </div>
//                   </ListItemLink>
//                 ))}
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </div>
//   );
// }