import { RequestObra } from '@pages/obras/consulta'

import { Fonograma } from '@/models/Fonograma'
import { Obra } from '@/models/Obra'
import { useTitularStore } from '@/store/titularStore'
import { api } from '@/utils/api'

export type ResponseFonograma = {
  content: Fonograma[]
  size: number
  totalElements: number
  totalPages: number
  number: number
}

export async function fetchFonogramas(
  obra: RequestObra,
  pageIndex: number,
): Promise<ResponseFonograma> {
  const queryParams = new URLSearchParams({
    titulo: obra.titulo || '',
    titularNome: obra.titularNome || '',
    titularId: obra.minhasObras
      ? useTitularStore.getState().titular!.id.toString()
      : '',
    page: pageIndex.toString(),
  }).toString()

  console.log('PArametros do Obra Srevice: ', obra)
  const response = await api.get(
    `/sipa-documentacao/v1/obras-musicais?pesquisa=CONTENDO&${queryParams}&sort=titulo,asc`,
  )
  console.log('resposta da requisição', response)
  return response.data
}
