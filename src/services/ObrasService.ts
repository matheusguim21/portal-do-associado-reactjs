import { RequestObra } from '@pages/obras/consulta'

import { Obra } from '@/models/Obra'
import { useTitularStore } from '@/store/titularStore'
import { api } from '@/utils/api'

export type ResponseObra = {
  content: Obra[]
  size: number
  totalElements: number
  totalPages: number
  number: number
}

export async function fetchObras(obra: RequestObra): Promise<ResponseObra> {
  const queryParams = new URLSearchParams({
    titulo: obra.titulo || '',
    titularNome: obra.titularNome || '',
    titularId: obra.minhasObras
      ? useTitularStore.getState().titular!.id.toString()
      : '',
  }).toString()

  console.log('PArametros do Obra Srevice: ', obra)
  const response = await api.get(
    `http://127.0.0.1:8085/sipa-documentacao/v1/obras-musicais?pesquisa=CONTENDO&${queryParams}`,
  )
  console.log('resposta da requisição', response)
  return response.data
}
