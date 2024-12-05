import { FonogramasFilters } from '@components/filters/FonogramasFilters'
import { Pagination } from '@components/pagination'
import { FonogramasTable } from '@components/tables/FonogramasTables'
import { Button } from '@components/ui/button'
import { Form, FormField, FormItem } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FieldErrors, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z, ZodError } from 'zod'

import { Fonograma } from '@/models/Fonograma'
import {
  fetchFonogramas,
  ResponseFonograma,
} from '@/services/fonogramasService'
import { useTitularStore } from '@/store/titularStore'
import { api } from '@/utils/api'

// Definição do esquema de validação usando Zod
const FonogramaSchema = z
  .object({
    meusFonogramas: z.boolean(),
    id: z.string().optional(),
    titulo: z.string().optional(),
    titularId: z.string().optional(),
    titularCodigoEcad: z.string().optional(),
    codigoEcad: z.string().optional(),
    titularNome: z.string().optional(),
    titularPseudonimo: z.string().optional(),
    minhasFonogramas: z.boolean().default(true),
    nacional: z.string().default('S'),
  })
  .superRefine((data, ctx) => {
    const values = [
      data.id,
      data.titulo,
      data.titularId,
      data.titularCodigoEcad,
      data.codigoEcad,
      data.titularNome,
    ]

    // Verificação se há pelo menos dois campos preenchidos
    const filledValues = values.filter((value) => value && value.trim() !== '')
    data.minhasFonogramas &&
      (data.titularId = useTitularStore.getState().titular?.id.toString())
    if (filledValues.length < 2 && !data.minhasFonogramas) {
      ctx.addIssue({
        code: 'custom',
        path: ['fieldsValidation'],
        message:
          'Você precisa preencher pelo menos dois campos para fazer a pesquisa se minhas Fonogramas estiver desmarcado',
      })
    }
  })

export type RequestFonograma = z.infer<typeof FonogramaSchema>

// Defina o tipo personalizado de erros
type CustomFormErrors = FieldErrors<RequestFonograma> & {
  fieldsValidation?: {
    message: string
  }
}

export function ConsultaDeFonogramas() {
  const form = useForm<RequestFonograma>({
    resolver: zodResolver(FonogramaSchema), // Integrando o schema de validação
    defaultValues: {
      meusFonogramas: true,
      titulo: '',
      codigoEcad: '',
      id: '',
      titularCodigoEcad: '',
      titularId: '',
      titularNome: '',
      titularPseudonimo: '',
    },
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data, isError, isFetching, refetch } = useQuery<
    ResponseFonograma,
    AxiosError
  >({
    queryKey: ['pesquisa-fonogramas', pageIndex], // Usar form.watch() para observar mudanças
    queryFn: () => fetchFonogramas(form.getValues(), pageIndex), // A função fetch será executada com os valores do formulário
    // Não buscar automaticamente
  })

  const handleFonogramasSearch = async (formParams: RequestFonograma) => {
    try {
      console.log('Parâmetros: ', formParams)

      await refetch() // Refetch ao submeter o formulário
      console.log('Resultado da pesquisa', data)
      console.log('Token da API: ', api.defaults.headers.common.Authorization)
    } catch (error) {
      console.error(error)
    }
  }
  const handlePaginate = (pageIndex: number) => {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())
      return state
    })
  }

  const { errors } = form.formState as { errors: CustomFormErrors }

  useEffect(() => {
    if (errors.fieldsValidation?.message != null) {
      toast.error(errors.fieldsValidation?.message, {
        position: 'bottom-left',
      })
    }
  }, [errors.fieldsValidation?.message])

  return (
    <>
      <Helmet title="Fonogramas" />

      <div>
        <h1 className="trac text-3xl font-semibold tracking-tighter">
          Consulta de Fonogramas
        </h1>
      </div>

      <div className="max-w-max space-y-2 p-5">
        <FonogramasFilters
          form={form}
          handleFunction={handleFonogramasSearch}
          isFetching={isFetching}
        />
        {/* <div className="rounded-md border">
          {data != null ? <FonogramasTable Fonogramas={data.content} /> : null}
        </div> */}
        {data ? (
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={data.number}
            perPage={data.size}
            totalCount={data.totalElements}
          />
        ) : null}
      </div>
    </>
  )
}
