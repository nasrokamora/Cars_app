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
import bmwPng from '@/public/all_image_cars/bmwPng.png'
import symbole from '@/public/all_image_cars/symboleCar.png'
import Image from "next/image"
const componentsLink: { title: string; href: string; description: string, image?: React.ReactNode }[] = [
  {
    title: "New Cars",
    href: '/new-cars',
    description: "Find the latest cars on the market",
    image:<Image src={bmwPng} alt="bmw" width={48} height={48} /> 
  },
  {
    title: "Used Cars",
    href: '/used-cars',
    description: "Find the latest cars on the market",
    image:<Image src={symbole} alt="bmw" width={48} height={48} />
  },
]


const componentsVihicles: { title: string; href: string; description: string, image?: React.ReactNode }[] = [
  {
    title: "Trucks",
    href: '/trucks',
    description: "Find the latest trucks on the market",
    image:<Image src={symbole} alt="bmw" width={48} height={48} />
  },
  {
    title: "Motorcycles",
    href: '/motorcycles',
    description: "Find the latest motorcycles on the market",
    image:<Image src={symbole} alt="bmw" width={48} height={48} />
  },
  {
    title: "Buses",
    href: '/buses',
    description: "Find the latest buses on the market",
    image:<Image src={symbole} alt="bmw" width={48} height={48} />
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