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

import { ResponseObra } from '@/dtos/Obra'
import { Obra } from '@/models/Obra'
import { fetchObras } from '@/services/ObrasService'
import useTitularSearch from '@/store/titularSearchStore'
import { useTitularStore } from '@/store/titularStore'
import { api } from '@/utils/api'

// Definição do esquema de validação usando Zod
const ObraSchema = z.object({
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
// .superRefine((data, ctx) => {
//   const values = [
//     data.id,
//     data.titulo,
//     data.titularId,
//     data.titularCodigoEcad,
//     data.codigoEcad,
//     data.titularNome,
//   ]

//   // Verificação se há pelo menos dois campos preenchidos
//   const filledValues = values.filter((value) => value && value.trim() !== '')
//   data.minhasObras &&
//     (data.titularId = useTitularStore.getState().titular?.id.toString())
//   if (filledValues.length < 0 && !data.minhasObras) {
//     ctx.addIssue({
//       code: 'custom',
//       path: ['fieldsValidation'],
//       message:
//         'Você precisa preencher pelo menos dois campos para fazer a pesquisa se minhas obras estiver desmarcado',
//     })
//   }
// })

export type RequestObra = z.infer<typeof ObraSchema>

// Defina o tipo personalizado de erros
type CustomFormErrors = FieldErrors<RequestObra> & {
  fieldsValidation?: {
    message: string
  }
}

export function ConsultaDeObras() {
  const { selectedTitular } = useTitularSearch()

  const form = useForm<RequestObra>({
    resolver: zodResolver(ObraSchema), // Integrando o schema de validação
    defaultValues: {
      titulo: '',
      codigoEcad: '',
      id: '',
      titularCodigoEcad: selectedTitular?.codigoEcad.toString() ?? '',
      titularId: selectedTitular?.id.toString() ?? '',
      titularNome: selectedTitular?.nome ?? '',
      titularPseudonimo: '',
      minhasObras: true,
    },
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data, isError, isFetching, refetch, isLoading } = useQuery<
    ResponseObra,
    AxiosError
  >({
    queryKey: ['pesquisa-obras', form.watch(), pageIndex], // Inclua form.watch() para refletir mudanças nos valores do formulário
    queryFn: () => fetchObras(form.getValues(), pageIndex),
    enabled: true, // A consulta só é acionada manualmente
  })

  const handleObrasSearch = async (formParams: RequestObra) => {
    try {
      console.log('Parâmetros: ', formParams)

      await refetch() // Refetch ao submeter o formulário
      console.log('Resultado da pesquisa', data)
    } catch (error) {
      console.error(error)
    }
  }
  const handlePaginate = async (pageIndex: number) => {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())
      return state
    })
    console.log(pageIndex)
    await refetch()
  }

  const { errors } = form.formState as { errors: CustomFormErrors }

  useEffect(() => {
    if (errors.fieldsValidation?.message != null) {
      toast.error(errors.fieldsValidation?.message, {
        position: 'bottom-left',
      })
    }
  }, [errors.fieldsValidation?.message])
  useEffect(() => {
    const fetchData = async () => {
      setSearchParams((state) => {
        state.set('page', String(0))
        return state
      })
      try {
        const result = await refetch() // Aguarda a conclusão do refetch
        console.log('Dados carregados:', result.data)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    fetchData() // Chama a função ao montar o componente
  }, [refetch, setSearchParams])

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
          ) : isFetching || isLoading ? (
            <SkeletonTable />
          ) : null}
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
