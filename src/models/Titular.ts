interface Nacionalidade {
  pais: string
  sigla: string
}
interface Pseudonimo {
  id: number
  principal: string
  pseudonimo: string
  tipoPseudonimo: string
}

export interface Titular {
  codigoCae: number
  codigoEcad: number
  codigoIpi: string
  cpfCnpj: string
  dataNascimento: string
  id: number
  ipn: number
  email: string
  celular: string

  irrfInternacional: 'S' | 'N'
  nacional: 'S' | 'N'
  nacionalidade: Nacionalidade
  nome: string
  situacaoCadastro: 'A'
  telefone: string

  titularPseudonimos: Pseudonimo[] | null
  tipoPessoa: 'F' | 'J'
  tipoTitular: string
  fotoPerfil: string
}
