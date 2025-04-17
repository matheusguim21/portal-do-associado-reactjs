import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useTitularStore } from '@/store/titularStore'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {  } from './ui/navigation-menu'

export function AccountMenu() {
  const { titular } = useTitularStore()

   const redirectUri = 'http://127.0.0.1:3000/auth/callback'
  const logoutURL = `https://staging-auth.socinpro.org.br/sipa-auth/logout`
  // const logoutURL = `https://staging-auth.socinpro.org.br/sipa-auth/logout?redirect_uri=${encodeURIComponent(redirectUri)}`
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex select-none items-center gap-2"
        >
          {
            titular?.titularPseudonimos?.find(
              (pseudonimo) => pseudonimo.principal === 'S',
            )?.pseudonimo
          }
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>{titular?.nome}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {titular?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-start gap-3">
          <User />
          <Link to={'/profile'}>
            {' '}
            <span>Perfil do associado</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start gap-3">
         <Button  variant={'outline'} className='flex-1' onClick={()=> window.location.href = logoutURL}>
            <LogOut />
            <span>Sair</span>
         </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
