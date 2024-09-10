import { ObrasFilters } from '@components/obras/obrasFilters'
import { ObrasTable } from '@components/obras/ObrasTables'
import { Pagination } from '@components/pagination'
import { Button } from '@components/ui/button'
import { Form, FormField, FormItem } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z, ZodError } from 'zod'

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
    minhasObras: z.boolean().default(false),
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
    if (filledValues.length < 2 && !data.minhasObras) {
      ctx.addIssue({
        code: 'custom',
        path: ['fieldsValidation'],
        message:
          'Você precisa preencher pelo menos dois campos para fazer a pesquisa se minhas obras estiver desmarcado',
      })
    }
  })

export type RequestObra = z.infer<typeof ObraSchema>

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
    },
  })

  const { data, isError, isFetching, refetch } = useQuery<
    ResponseObra,
    AxiosError
  >({
    queryKey: ['pesquisa-obras', form.watch()], // Usar form.watch() para observar mudanças
    queryFn: () => fetchObras(form.getValues()), // A função fetch será executada com os valores do formulário
    enabled: false, // Não buscar automaticamente
  })

  const handleObrasSearch = async (formParams: RequestObra) => {
    try {
      console.log('Parâmetros: ', formParams)

      await refetch() // Refetch ao submeter o formulário
      console.log('Resultado da pesquisa', data)
      console.log('Token da API: ', api.defaults.headers.common.Authorization)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  return (
    <>
      <Helmet title="Obras" />

      <div>
        <h1 className="trac text-3xl font-semibold tracking-tighter">
          Consulta de Obras
        </h1>
      </div>

      <div className="max-w-max space-y-2 rounded border-2 border-muted-foreground p-5">
        <ObrasFilters
          form={form}
          handleFunction={handleObrasSearch}
          isFetching={isFetching}
        />
        <div className="rounded-md border">
          {data != null ? <ObrasTable obras={data.content} /> : null}
        </div>
        {data ? (
          <Pagination
            pageIndex={data.number}
            perPage={data.totalElements}
            totalCount={data.totalElements}
          />
        ) : null}
      </div>
    </>
  )
}
