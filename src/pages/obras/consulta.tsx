import { Form, FormField, FormItem } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z, ZodError } from 'zod'

import { Obra } from '@/models/Obra'
import { fetchEscalas } from '@/services/ObrasService'

// Definição do esquema de validação usando Zod
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
        code: 'custom', // Usando 'custom' para uma validação personalizada
        path: ['fieldsValidation'],
        message:
          'Você precisa preencher pelo menos dois campos para fazer a pesquisa',
      })
    }
  })

export type RequestObra = z.infer<typeof ObraSchema>

export function ConsultaDeObras() {
  const { data, isError, isFetching, refetch } = useQuery<Obra[], AxiosError>({
    queryKey: ['pesquisa-obras'],
    queryFn: fetchEscalas,
  })
  const form = useForm<RequestObra>()

  async function handleObrasSearch(data: RequestObra) {
    try {
    } catch (error) { }
  }

  return (
    <>
      <Helmet title="Obras" />

      <div>
        <h1 className="trac text-3xl font-semibold tracking-tighter">
          Consulta de Obras
        </h1>
      </div>

      <div className="space-y-2.5">
        <Form>
          <form
            onSubmit={form.handleSubmit()}
            className="flex items-center gap-2"
            {...form}
          >
            <span className="text-sm font-semibold">Filtros</span>
            <FormField
              control={form.control}
              name="titulo"
              render={() => (
                <FormItem>
                  {' '}
                  <Input
                    id="client_name"
                    placeholder="Título da obra"
                    className="h-8 w-[320px]"
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div></div>
      </div>
    </>
  )
}
