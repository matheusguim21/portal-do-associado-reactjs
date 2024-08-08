import { createBrowserRouter } from 'react-router-dom'

import { Applayout } from './pages/_layouts/app'
import { Authlayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Obras } from './pages/obras/obras'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/obras',
        element: <Obras />,
      },
    ],
  },
  {
    path: '/',
    element: <Authlayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
