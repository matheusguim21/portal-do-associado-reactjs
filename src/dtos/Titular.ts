import { Titular } from '@/models/Titular'

export type ResponseTitular = {
  content: Titular[]
  size: number
  totalElements: number
  totalPages: number
  number: number
}
