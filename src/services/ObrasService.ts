import { RequestObra } from '@pages/obras/consulta'

import { ResponseObra } from '@/dtos/Obra'
import { Obra } from '@/models/Obra'
import { useTitularStore } from '@/store/titularStore'
import { api } from '@/utils/api'

export async function fetchObras(
  obra: RequestObra,
  pageIndex: number,
): Promise<ResponseObra> {
  const titular = useTitularStore.getState().titular

  const queryParams = new URLSearchParams({
    titulo: obra.titulo || '',
    titularNome: titular?.nome || '',
    titularId: obra.minhasObras
      ? useTitularStore.getState().titular!.id.toString()
      : titular
        ? titular.id.toString()
        : '',
    codigoEcad: obra.codigoEcad || '',
    titularPseudonimo:
      titular?.titularPseudonimos?.find(
        (pseudonimo) => pseudonimo.principal === 'S',
      )?.pseudonimo ?? '',

    nacional: obra.nacional || 'S',
    page: pageIndex.toString() || '0',
  }).toString()

  console.log('PArametros do Obra Srevice: ', queryParams)
  const response = await api.get(
    `/sipa-documentacao/v1/obras-musicais?pesquisa=CONTENDO&${queryParams}&sort=titulo,asc${obra.minhasObras ? ',id,asc' : ''}`,
  )
  console.log('URL da requisição', response.config.url)
  return response.data
}
