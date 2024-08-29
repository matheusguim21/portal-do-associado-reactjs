import { ObrasTable } from '@components/ObrasTables'
import { Button } from '@components/ui/button'
import { Form, FormField, FormItem } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z, ZodError } from 'zod'

import { Obra } from '@/models/Obra'
import { fetchObras } from '@/services/ObrasService'
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

    if (filledValues.length < 2) {
      ctx.addIssue({
        code: 'custom',
        path: ['fieldsValidation'],
        message:
          'Você precisa preencher pelo menos dois campos para fazer a pesquisa',
      })
    }
  })

export type RequestObra = z.infer<typeof ObraSchema>

export function ConsultaDeObras() {
  const form = useForm<RequestObra>({
    resolver: zodResolver(ObraSchema), // Integrando o schema de validação
    defaultValues: {
      titulo: '',
    },
  })

  const { titular } = useTitularStore()

  const { data, isError, isFetching, refetch } = useQuery<Obra[], AxiosError>({
    queryKey: ['pesquisa-obras', form.watch()], // Usar form.watch() para observar mudanças
    queryFn: () => fetchObras(form.getValues()), // A função fetch será executada com os valores do formulário
    enabled: false, // Não buscar automaticamente
  })

  const handleObrasSearch = async (formParams: RequestObra) => {
    try {
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

      <div className="space-y-2.5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleObrasSearch)}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-semibold">Filtros</span>
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Título da obra"
                    className="h-8 w-[320px]"
                    {...field} // Usar spread operator para vincular corretamente o campo
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titularNome"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Nome do Titular"
                    className="h-8 w-[320px]"
                    {...field} // Usar spread operator para vincular corretamente o campo
                  />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isFetching}>
              {isFetching ? 'Buscando...' : 'Buscar'}
            </Button>
          </form>
        </Form>

        <div className="rounded-md border">
          {data != null ? <ObrasTable obras={data} /> : null}
        </div>
      </div>
    </>
  )
}
