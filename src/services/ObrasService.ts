import { RequestObra } from '@pages/obras/consulta'

import { ResponseObra } from '@dtos/Obra'
import useTitularSearch from '@store/titularSearchStore'
import { useTitularStore } from '@store/titularStore'
import { api } from '@utils/api'

type SearchObraProps = {
  queryKey: [string, RequestObra, number]
}

const searchObra = {
  queryFn: async ({ queryKey }: SearchObraProps) => {
    const [_, obra, pageIndex] = queryKey

    const titular = useTitularSearch.getState().selectedTitular

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

    console.log('Parametros do Obra Service: ', queryParams)

    const uri = `/sipa-documentacao/v1/obras-musicais?pesquisa=CONTENDO&${queryParams}&sort=titulo,asc${obra.minhasObras ? ',id,asc' : ''}`

    console.log('URI da requisição de obras: ', uri)

    const response = await api.get(uri)

    console.log('Resposta do Obra Service: ', response.data)

    return response.data
  },
}

export const obraService = {
  searchObra,
}
