import axios, { formToJSON } from 'axios'
import base64 from 'base-64'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useTitularStore } from '@/store/titularStore'

const CallbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const { codeVerifier } = useTitularStore()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const authorizationCode = params.get('code')
    const state = params.get('state')

    if (authorizationCode && state) {
      const tokenEndpoint =
        'https://homolog-auth.socinpro.org.br:8443/sipa-auth/oauth2/token'
      const clientId = 'sipa-associado'
      const clientSecret = 'web123'
      const redirectUri = 'http://127.0.0.1:3000/auth/callback'

      console.log('Code Verifier recuperado do Zustand:', codeVerifier)

      if (!codeVerifier) {
        console.error('Code Verifier não encontrado no estado')
        toast.error('Erro: Code Verifier não encontrado.')
        return
      }

      try {
        const credentials = base64.encode(`${clientId}:${clientSecret}`)

        const form = new FormData()
        form.append('code', authorizationCode)
        form.append('grant_type', 'authorization_code')
        form.append('redirect_uri', redirectUri)
        form.append('code_verifier', codeVerifier)
        console.log('Form: ', formToJSON(form))

        axios
          .post(tokenEndpoint, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Basic ${credentials}`,
            },
          })
          .then((response) => {
            const { access_token } = response.data as { access_token: string }
            console.log('Access Token:', access_token)
            localStorage.setItem('access_token', access_token)
            toast.success('Login successful')
            setToken(access_token)
            navigate('/')
          })
          .catch((error) => {
            console.error('Erro ao buscar o access token:', error)
            toast.error(error.response?.data || 'Erro ao buscar o access token')
          })
      } catch (error) {
        console.error('Erro inesperado durante a requisição:', error)
        toast.error('Erro inesperado durante a requisição')
      }
    } else {
      console.error('Código de autorização ou estado está faltando')
      toast.error('Código de autorização ou estado está faltando')
    }
  }, [navigate, codeVerifier])

  return <div>Seu Token é {token}...</div>
}

export default CallbackPage
