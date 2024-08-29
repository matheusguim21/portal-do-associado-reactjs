import { RequestObra } from '@pages/obras/consulta'

import { Obra } from '@/models/Obra'
import { api } from '@/utils/api'

export async function fetchObras(obra: RequestObra): Promise<Obra[]> {
  const queryParams = new URLSearchParams({
    titulo: obra.titulo || '',
    titularNome: obra.titularNome || '',
  }).toString()

  console.log(queryParams)
  const response = await api.get(
    `http://127.0.0.1:8085/sipa-documentacao/v1/obras-musicais?pesquisa=CONTENDO&${queryParams}`,
  )
  console.log('resposta da requisição', response)
  return response.data.content
}
