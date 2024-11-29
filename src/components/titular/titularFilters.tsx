import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

const TitularSchema = z.object({
  pseudonimo: z.string(),
  nome: z.string(),
  codigoECAD: z.string(),
  codigoSOC: z.string(),
  cpf: z.string(),
  codigoCAE: z.string(),
  email: z.string(),
})
export type RequestTitular = z.infer<typeof TitularSchema>

interface TitularFilterProps {
  form: UseFormReturn<RequestTitular>
  isFetching: boolean
  handleFunction: (formParams: RequestTitular) => Promise<void>
}

export function TitularFilters() {
  const form = useForm<RequestTitular>()

  return (
    <div>
      <Form {...form}>
        <div className="flex flex-row items-center justify-center gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={() => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pseudonimo"
            render={() => (
              <FormItem>
                <FormLabel>Pseudônimo</FormLabel>
                <FormControl>
                  <Input placeholder="Pseudônimo do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codigoECAD"
            render={() => (
              <FormItem>
                <FormLabel>Codigo ECAD</FormLabel>
                <FormControl>
                  <Input placeholder="Codigo ECAD do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codigoSOC"
            render={() => (
              <FormItem>
                <FormLabel>Código SOC</FormLabel>
                <FormControl>
                  <Input placeholder="Codigo SOC do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={() => (
              <FormItem>
                <FormLabel>CPF/CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="CPF ou CNPJ do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codigoCAE"
            render={() => (
              <FormItem>
                <FormLabel>Codigo CAE</FormLabel>
                <FormControl>
                  <Input placeholder="Codigo CAE do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="self-end" variant={'default'} type="submit">
            Pesquisar
          </Button>
        </div>
      </Form>
    </div>
  )
}
