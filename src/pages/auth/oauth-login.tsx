import { ThemeToggle } from '@theme/theme-toggle'
import { generateCodeChallenge, generateState } from '@utils/AuthUtils'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useTitularStore } from '@/store/titularStore'
type RequestError = {
  message: string
}

const signinFormSchema = z.object({
  username: z
    .string({
      message: 'Insira um usuário',
    })
    .min(1, { message: 'Insira um usuário' }),
  password: z
    .string({
      message: 'Insira a sua senha',
    })
    .min(8, 'A senha têm no mínimo 8 caractéres')
    .max(16, 'A senha têm no máximo 16 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]*$/, {
      message:
        'A senha deve conter pelo menos um carácter maiúsculo, um minúsculo e um número',
    }),
})

export function OAuthLogin() {
  const [authState, setAuthState] = useState<{
    codeVerifier: string
    state: string
    codeChallenge: string
  } | null>(null)

  const { saveCodeVerifier } = useTitularStore()

  useEffect(() => {
    ; (async () => {
      try {
        const { codeVerifier, codeChallenge } = await generateCodeChallenge()
        const state = generateState()
        setAuthState({ codeVerifier, state, codeChallenge })
        console.log({ codeVerifier, state, codeChallenge })

        // Ensure codeVerifier is correctly saved
        if (codeVerifier) {
          saveCodeVerifier(codeVerifier)
          localStorage.setItem('code_verifier', codeVerifier)
          console.log(
            'Code Verifier saved to localStorage:',
            localStorage.getItem('code_verifier'),
          )
        } else {
          console.error('Code Verifier is not defined')
        }
      } catch (error) {
        console.error('Error generating code challenge:', error)
      }
    })()
  }, [saveCodeVerifier])

  const handleLogin = () => {
    if (!authState) return

    const clientId = 'sipa-associado'
    const redirectUri = 'http://127.0.0.1:3000/auth/callback'
    const authEndpoint =
      'https://staging-auth.socinpro.org.br/sipa-auth/oauth2/authorize'
    const responseType = 'code'

    const url = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&state=${authState.state}&code_challenge=${authState.codeChallenge}&code_challenge_method=S256&scope=READ+WRITE&redirect_uri=${encodeURIComponent(redirectUri)}`
    console.log('Authorization URL:', url)

    window.location.href = url
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="absolute bottom-5 right-5">
        <ThemeToggle />
      </div>
      <div className="p-8">
        {/* <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to={'/sign-up'}>Primeiro acesso</Link>
        </Button> */}
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex- flex-col justify-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Portal do Associado
            </h1>
            <p className="text-sm text-muted-foreground">
              Cosulte suas obras, fonogramas, rendimentos e muito mais.
            </p>
          </div>
          <Button onClick={() => handleLogin()}>Fazer Login na Socinpro</Button>
        </div>
      </div>
    </>
  )
}
