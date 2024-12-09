import { RequestTitular } from '@components/modals/titularSearchModal'
import { jwtDecode } from 'jwt-decode'
import { string } from 'zod'

import { Titular } from '@/models/Titular'
import { Token } from '@/models/Token'
import { api } from '@/utils/api'

type SearchTitularProps = {
  queryKey: string
  formValues: RequestTitular
  pageIndex: number
}

const fetchUsuarioInfoFromToken = async (token: string) => {
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

const searchTitular = {
  queryFn: async (queryKey: { queryKey: [string, RequestTitular, number] }) => {
    const [_, formValues, pageIndex] = queryKey

    const queryParams = new URLSearchParams({
      pseudonimo: formValues.pseudonimo,
      nome: formValues.nome,
      codigoECAD: formValues.codigoECAD,
      codigoSOC: formValues.codigoSOC,
      cpf: formValues.cpf,
      codigoCAE: formValues.codigoCAE,
      email: formValues.email,
    })

    console.log('query Params do Titular service', queryParams)

    const response = await api.get(
      `sipa-documentacao/v1/titulares/${queryParams}`,
    )

    return response.data
  },
}

export const titularService = {
  fetchUsuarioInfoFromToken,
  searchTitular,
}
