import '@/global.css'

import { colors } from '@theme/colors'
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
        <Toaster
          visibleToasts={3}
          toastOptions={{
            classNames: {
              toast: 'bg-primary ',
              title: 'text-muted',
              icon: 'fill-muted',
            },
          }}
        />
        <Helmet titleTemplate="%s | SOCINPRO" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
