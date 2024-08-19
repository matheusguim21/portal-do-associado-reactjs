import { api } from '@utils/api'
// Substitua pelos seus modelos reais
import { Titular } from 'src/models/Titular'
import { create } from 'zustand'

type TitularStore = {
  titular: Titular | null
  signIn: (titular: Titular, token: string) => void
  signOut: () => void
  codeVerifier: string | null
  saveCodeVerifier: (code_verifier: string) => void
}

export const useTitularStore = create<TitularStore>((set) => {
  const savedTitular = localStorage.getItem('titular')
  const savedCodeVerifier = localStorage.getItem('code_verifier')

  return {
    titular: savedTitular ? JSON.parse(savedTitular) : null,

    signIn: (titular: Titular, token: string) => {
      localStorage.setItem('titular', JSON.stringify(titular))
      localStorage.setItem('token', token)

      console.log(
        'Dados salvos do titular aqui',
        JSON.parse(localStorage.getItem('titular')!),
      )

      // Defina o token de autorização no cabeçalho padrão da API
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      set(() => ({
        titular,
      }))
    },
    signOut: () => {
      localStorage.removeItem('titular')
      localStorage.removeItem('token')
      localStorage.removeItem('code_verifier')

      set(() => ({
        titular: null,
        codeVerifier: null,
      }))
    },
    saveCodeVerifier: (code_verifier) => {
      console.log('Código de verificação sendo salvo no estado', code_verifier)

      // Armazena no localStorage para garantir persistência
      localStorage.setItem('code_verifier', code_verifier)

      set(() => ({
        codeVerifier: code_verifier,
      }))
    },
    codeVerifier: savedCodeVerifier || null,
  }
})
