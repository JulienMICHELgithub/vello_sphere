'use client'

import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'

export function NavigationBar() {
    const linkBase =
        `${navigationMenuTriggerStyle()} 
        focus:outline-none focus:ring-0
        focus-visible:ring-2 focus-visible:ring-white 
        focus-visible:ring-offset-2
        h-10 px-4 rounded-lg
        bg-transparent hover:bg-gray-700 focus:bg-gray-700
        text-white hover:text-white focus:text-white`

    return (
        <nav className="p-2">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/dashboard" className={linkBase}>
                                Dashboard
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className="rounded-md px-4 py-2
                                    bg-transparent hover:bg-gray-700 focus:bg-gray-700
                                    text-white data-[state=open]:bg-gray-700
                                    flex items-center gap-2 group
                                    focus:outline-none"
                            >
                                Catalogue
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="start"
                                sideOffset={8}
                                className="w-[300px] bg-gray-700 text-white border-0 shadow-lg"
                            >
                                <DropdownMenuPrimitive.Arrow className="fill-gray-700" />

                                <DropdownMenuItem asChild>
                                    <Link href="/bikes?type=vtt" className="w-full">VTT</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/bikes?type=gravel" className="w-full">Gravel</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/bikes?type=route" className="w-full">Vélo de route</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/bikes?type=tt" className="w-full">TT bike</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/docs" className={linkBase}>
                                Docs
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}
