import { Obra } from '@/models/Obra'

export type ResponseObra = {
  content: Obra[]
  size: number
  totalElements: number
  totalPages: number
  number: number
}
