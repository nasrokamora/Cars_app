import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
// import { componentsLink } from "./NavigationMenu"
import Link from "next/link"
// import { ListItemLink } from "./NavigationMenu"
// import { componentsLink } from "@/app/components/NavBar/NavigationMenu"


export default function NavigationsLargeLayout() {
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Cars</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
                  <NavigationMenuViewport />
            </NavigationMenu>
        </div>
    )
}

function ListItemLargeLayoutLink({
    title,
    href,
    children,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <Link href={href} className="flex items-center gap-2">
                <span className="text-sm leading-none font-medium">{title}</span>
                <div >{children}</div>
            </Link>
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