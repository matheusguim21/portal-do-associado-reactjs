import { jwtDecode } from 'jwt-decode'

import { Titular } from '@/models/Titular'
import { Token } from '@/models/Token'
import { api } from '@/utils/api'

export async function fetchUsuarioInfo(token: string) {
  let decodedToken: Token = {} as Token

  let titular = {} as Titular

  try {
    decodedToken = jwtDecode<Token>(token)

    const { titular_id } = decodedToken
    console.log('Id do titular', titular_id)

    const response = await api.get(
      `sipa-documentacao/v1/titulares/${titular_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    console.log('resposta aqui: ', { response })

    titular = response.data
  } catch (error) {
    console.error('O erro ta aqui ao pegar as infos do titular')
  }

  // Implementação da lógica para buscar informações do usuário
  return titular
}
