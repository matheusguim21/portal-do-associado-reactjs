import '@/global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { Button } from './components/ui/button'
import { router } from './routes'
import { ThemeProvider } from './theme/theme-provider'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Toaster richColors />
        <Helmet titleTemplate="%s | SOCINPRO" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
