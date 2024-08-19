import { RequestObra } from '@pages/obras/consulta'

import { Obra } from '@/models/Obra'
import { api } from '@/utils/api'

export async function fetchObras(obra: RequestObra): Promise<Obra[]> {
  return await api.get(
    `https://gateway-sipa-stag.socinpro.org.br/sipa-documentacao/v1/obras-musicais?pesquisa=CONTENDO&`,
  )
}
