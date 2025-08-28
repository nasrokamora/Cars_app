"use client"

import * as React from "react"
import Link from "next/link"


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { componentsLink, componentsVihicles } from "../Link/ComponentsAllLink"





export default function NavigationsMenu() {
  return (
    <div className=" md:flex  hidden">
      <NavigationMenu viewport={false} className="bg-transparent sm:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Cars</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid  w-[300px] gap-4">
                {componentsLink.map((link) => (
                  <ListItemLink
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    className=""
                  >
                    <div className=" flex justify-between items-center">

                      {link.description}
                      {link.image}
                    </div>
                  </ListItemLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* trucks */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Vehicles</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid  w-[300px] gap-4">
                {componentsVihicles.map((link) => (
                  <ListItemLink
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    className=""
                  >
                    <div className=" flex justify-between items-center">

                      {link.description}
                      {link.image}
                    </div>
                  </ListItemLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* Search */}
          <NavigationMenuItem>
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
      </NavigationMenu>
    </div>
  )
}
 function ListItemLink({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
