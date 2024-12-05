import { ObrasFilters } from '@components/filters/obrasFilters'
import { Pagination } from '@components/pagination'
import { SkeletonTable } from '@components/skeletons/table-skeleton'
import { ObrasTable } from '@components/tables/ObrasTables'
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
import { z } from 'zod'

import { Obra } from '@/models/Obra'
import { fetchObras, ResponseObra } from '@/services/ObrasService'
import { useTitularStore } from '@/store/titularStore'
import { api } from '@/utils/api'

// Definição do esquema de validação usando Zod
const ObraSchema = z
  .object({
    id: z.string().optional(),
    titulo: z.string().optional(),
    titularId: z.string().optional(),
    titularCodigoEcad: z.string().optional(),
    codigoEcad: z.string().optional(),
    titularNome: z.string().optional(),
    titularPseudonimo: z.string().optional(),
    minhasObras: z.boolean().default(true),
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
    data.minhasObras &&
      (data.titularId = useTitularStore.getState().titular?.id.toString())
    if (filledValues.length < 0 && !data.minhasObras) {
      ctx.addIssue({
        code: 'custom',
        path: ['fieldsValidation'],
        message:
          'Você precisa preencher pelo menos dois campos para fazer a pesquisa se minhas obras estiver desmarcado',
      })
    }
  })

export type RequestObra = z.infer<typeof ObraSchema>

// Defina o tipo personalizado de erros
type CustomFormErrors = FieldErrors<RequestObra> & {
  fieldsValidation?: {
    message: string
  }
}

export function ConsultaDeObras() {
  const form = useForm<RequestObra>({
    resolver: zodResolver(ObraSchema), // Integrando o schema de validação
    defaultValues: {
      titulo: '',
      codigoEcad: '',
      id: '',
      titularCodigoEcad: '',
      titularId: '',
      titularNome: '',
      titularPseudonimo: '',
      minhasObras: true,
    },
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data, isError, isFetching, refetch } = useQuery<
    ResponseObra,
    AxiosError
  >({
    queryKey: ['pesquisa-obras', pageIndex], // Usar form.watch() para observar mudanças
    queryFn: () => fetchObras(form.getValues(), pageIndex), // A função fetch será executada com os valores do formulário
    // Não buscar automaticamente
  })

  const handleObrasSearch = async (formParams: RequestObra) => {
    try {
      console.log('Parâmetros: ', formParams)
      setSearchParams((state) => {
        state.set('page', String(0))
        return state
      })
      await refetch() // Refetch ao submeter o formulário
      console.log('Resultado da pesquisa', data)
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
      <Helmet title="Obras" />

      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          Consulta de Obras
        </h1>
      </div>

      <div className="max-w-max space-y-2 p-5">
        <ObrasFilters
          form={form}
          handleFunction={handleObrasSearch}
          isFetching={isFetching}
        />
        <div className="rounded-md shadow-sm shadow-muted-foreground">
          {data != null ? (
            <ObrasTable obras={data.content} />
          ) : (
            <SkeletonTable />
          )}
        </div>
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
