export type SituacaoCadastral = {
  descricao: string
  sigla: string
}

export type Fonograma = {
  codigoEcad: number
  dominioPublico: string
  dtCriacao: string
  dtEmissao: string
  dtRegistro: string
  id: number
  instrumental: string
  isrc: string
  iswc: string | null
  nacional: string
  situacaoCadastral: SituacaoCadastral
  status: string
  titulo: string
  // titular: Titular // Se o titular ainda deve ser incluído, e como ele deve ser mapeado com base no objeto retornado.
}
