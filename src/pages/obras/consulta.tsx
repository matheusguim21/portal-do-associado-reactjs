import { ObrasFilters } from '@components/filters/obrasFilters'
import { Pagination } from '@components/pagination'
import { SkeletonTable } from '@components/skeletons/table-skeleton'
import { ObrasTable } from '@components/tables/ObrasTables'
import { Button } from '@components/ui/button'
import { Form, FormField, FormItem } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FieldErrors, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { ResponseObra } from '@/dtos/Obra'
import { Obra } from '@/models/Obra'
import { obraService } from '@/services/ObrasService'
import useTitularSearch from '@/store/titularSearchStore'
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
  .refine(
    (data) =>
      Object.values(data).some(
        (value) => value !== undefined && value.toString().trim() !== '',
      ),
    {
      message: 'Pelo menos um campo deve ser preenchido.',
      path: [],
    },
  )

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
      titularCodigoEcad: '',
      titularId: '',
      titularNome: '',
      titularPseudonimo: '',
      minhasObras: true,
    },
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<RequestObra | null>(null)

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data, isError, isFetching, refetch, isLoading, isFetched } = useQuery<
    ResponseObra,
    AxiosError
  >({
    queryKey: ['pesquisa-obras', filters, pageIndex], // Inclua form.watch() para refletir mudanças nos valores do formulário

    enabled: !!filters, // A consulta só é acionada manualmente
    ...obraService.searchObra,
  })

  const handleObrasSearch = async (formParams: RequestObra) => {
    try {
      console.log('Parâmetros: ', formParams)
      setFilters(form.getValues())
      await refetch() // Refetch ao submeter o formulário
      console.log('Resultado da pesquisa', data)
    } catch (error) {
      console.error(error)
    }
  }
  const handlePaginate = async (pageIndex: number) => {
    const safePageIndex = Math.max(0, pageIndex) // Garante que não será menor que 0
    setSearchParams((state) => {
      state.set('page', (safePageIndex + 1).toString())
      return state
    })
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
        state.set('page', String(1))
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
  }, [])

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
          isFetched={isFetched}
        />
        <div className="rounded-md shadow-sm shadow-muted-foreground">
          {isFetching || isLoading ? (
            <SkeletonTable />
          ) : data != null ? (
            <ObrasTable obras={data.content} />
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
