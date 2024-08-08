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

import LogoSocinproBranca from '@/assets/logo-sem-slogan-branca.png'
import LogoSocinproPreta from '@/assets/logo-sem-slogan-preta.png'
import { useTheme } from '@/theme/theme-provider'
import { ThemeToggle } from '@/theme/theme-toggle'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'

export function Header() {
  const theme = useTheme()
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img
          src={theme.theme === 'light' ? LogoSocinproPreta : LogoSocinproBranca}
          alt="logo da socinpro"
          className="w-40"
        />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to={'/'}>
            <Home className="h-6 w-6" />
            Dashboard
          </NavLink>
          <NavLink to={'/obras'}>
            <FileMusic className="h-6 w-6" />
            Obras
          </NavLink>
          <NavLink to={'/fonogramas'}>
            <AudioLines className="h-6 w-6" />
            Fonogramas
          </NavLink>
          <NavLink to={'/financeiro'}>
            <CircleDollarSign className="h-6 w-6" />
            Financeiro
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
