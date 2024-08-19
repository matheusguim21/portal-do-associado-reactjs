import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex select-none items-center gap-2"
        >
          Matheus de Guaratiba
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Matheus Cirino Guimarães de Pinho</span>
          <span className="text-sm font-normal text-muted-foreground">
            matheusdeguaratiba@gmail.com
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
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
