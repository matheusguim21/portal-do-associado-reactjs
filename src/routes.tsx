import CallbackPage from '@pages/auth/CallBackPage'
import { ForgotPassword } from '@pages/auth/forgot--password'
import { OAuthLogin } from '@pages/auth/oauth-login'
import { ConsultaDeFonogramas } from '@pages/fonogramas/consulta'
import { createBrowserRouter } from 'react-router-dom'

import { Applayout } from './pages/_layouts/app'
import { Authlayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { ConsultaDeObras } from './pages/obras/consulta'
import {Financeiro} from '@/pages/financeiro/payment'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/consulta',
    element: <Applayout />,
    children: [
      {
        path: 'obras',
        element: <ConsultaDeObras />,
      },
      {
        path: 'fonogramas',
        element: <ConsultaDeFonogramas />,
      },
    ],
  },
{
  path:"financeiro",
  element:<Applayout/>,
  children:[
    {
      path:"",
      element:<Financeiro/>
    }
  ]
},
  {
    path: '/auth',
    element: <Authlayout />,
    children: [
      {
        path: 'login',
        element: <OAuthLogin />,
      },
      // {
      //   path: 'cadastro',
      //   element: <SignUp />,
      // },
      // {
      //   path: 'esqueceu-senha',
      //   element: <ForgotPassword />,
      // },
      // {
      //   path: 'oauth-login',
      //   element: <OAuthLogin />,
      // },
      {
        path: 'callback',
        element: <CallbackPage />,
      },
    ],
  },
])
