"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const componentsLink: { title: string; href: string; description: string }[] = [
  {
    title: "New Cars",
    href: '/new-cars',
    description: "Find the latest cars on the market"
  },
  {
    title: "Used Cars",
    href: '/used-cars',
    description: "Find the latest cars on the market"
  },
]

const componentsLinkAbout: { title: string; href: string; description: string }[] = [
  {
    title: "About",
    href: '/about',
    description: "about us"
  },
  {
    title: "Contact",
    href: '/contact',
    description: "contact us"
  },
]

export function NavigationsMenu() {
  return (
    <div className=" sm:flex hidden">
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
              <ul className="grid w-[300px] gap-4">
                {componentsLink.map((link) => (
                  <ListItemLink
                    key={link.title}
                    title={link.title}
                    href={link.href}
                  >
                    {link.description}
                  </ListItemLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
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
          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleHelpIcon />
                      Backlog
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleIcon />
                      To Do
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleCheckIcon />
                      Done
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
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
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}