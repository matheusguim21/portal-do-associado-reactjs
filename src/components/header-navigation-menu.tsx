// import { Icons } from "@components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@components/ui/navigation-menu'
import { cn } from '@lib/utils'
import { AudioLines, FileMusic, LayoutDashboard, Search } from 'lucide-react'
import * as React from 'react'

import { Separator } from './ui/separator'

const components = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

export function HeaderNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href='/' className={navigationMenuTriggerStyle()}>
            <LayoutDashboard className="h-6 w-6" />
            <p className="ml-2 text-lg">Dashboard</p>
          </NavigationMenuLink>

          <Separator orientation={'vertical'} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Search />
            <p className="ml-2 text-lg">Consulta</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink href="/consulta/obras">
                  {/* <Icons.logo className="h-6 w-6" /> */}
                  <FileMusic className="h-6 w-6" />
                  <div className="mb-2 mt-4 text-lg font-medium">Obras</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Faça uma busca no banco de dados público para encontrar as
                    obras que deseja
                  </p>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink href="/consulta/fonogramas">
                  {/* <Icons.logo className="h-6 w-6" /> */}
                  <AudioLines className="h-6 w-6" />
                  <div className="mb-2 mt-4 text-lg font-medium">
                    Fonogramas
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Faça uma busca no banco de dados público para encontrar as
                    obras que deseja
                  </p>
                </NavigationMenuLink>
              </li>
            
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href={"/financeiro"}>
                    <span>Financeiro</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }:any, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
