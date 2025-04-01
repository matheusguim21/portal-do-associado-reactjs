
export interface InternationalPayment {
  id: number
  dataInicial: string // ou Date, se você for converter para objetos Date
  dataFinal: string
  dataProcessamento: string
  status: "PROCESSADO" | "PENDENTE" | "CANCELADO" // ajuste conforme os possíveis valores
  totalLiquido: number
}

export interface PaginatedResponse<T> {
  content: T[]
  size: number
  totalElements: number
  totalPages: number
  number: number
}

// Uso da interface com InternationalPayment:
export type InternationalPaymentResponse = PaginatedResponse<InternationalPayment>