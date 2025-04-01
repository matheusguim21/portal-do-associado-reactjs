import { Separator } from '@radix-ui/react-separator'
import {
  AudioLines,
  CircleDollarSign,
  FileMusic,
  Home,
  Music,
  Pizza,
  UtensilsCrossed,
} from 'lucide-react'

import LogoSocinproBranca from '@assets/logos/logo-sem-slogan-branca.png'
import LogoSocinproPreta from '@assets/logos/logo-sem-slogan-preta.png'
import { useTheme } from '@theme/theme-provider'
import { ThemeToggle } from '@theme/theme-toggle'

import { AccountMenu } from './account-menu'
import { HeaderNavigationMenu } from './header-navigation-menu'
import { NavLink } from './nav-link'
import { NavigationMenu } from './ui/navigation-menu'

export function Header() {
  const theme = useTheme()
  return (
    <div className="border-b bg-primary">
      <div className="flex h-16 items-center gap-6 px-6">
        <img
          src={theme.theme === 'light' ? LogoSocinproBranca : LogoSocinproPreta  }
          alt="logo da socinpro"
          className="w-40"
        />
        <Separator orientation="vertical" className="h-6" />
        <HeaderNavigationMenu />
      
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
