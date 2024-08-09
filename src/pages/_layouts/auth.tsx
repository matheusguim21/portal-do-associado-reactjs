import LogoSocinproClara from '@assets/logos/vazada-branca.svg'
import LogoSocinproEscura from '@assets/logos/vazada-preta.svg'
import { useTheme } from '@theme/theme-provider'
import { ThemeToggle } from '@theme/theme-toggle'
import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'
export function Authlayout() {
  const theme = useTheme()
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex max-h-screen flex-col items-center justify-center border-r-2 border-foreground/5 bg-primary p-10 text-muted-foreground">
        <img
          alt="logo da Socinpro"
          src={
            theme.theme === 'dark' || theme.theme === 'system'
              ? LogoSocinproEscura
              : LogoSocinproClara
          }
          className="h-[500px] w-[500px]"
        />

        <footer className="absolute bottom-5 text-center text-sm font-semibold text-secondary">
          Portal do Associado &copy; SOCINPRO - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
