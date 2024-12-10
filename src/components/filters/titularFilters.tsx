import { RequestTitular } from '@components/modals/titularSearchModal'
import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface TitularFiltersProps {
  form: UseFormReturn<RequestTitular>
  isFetching: boolean
  handleFunction: (formParams: RequestTitular) => Promise<void>
}

export function TitularFilters({
  form,
  handleFunction,
  isFetching,
}: TitularFiltersProps) {
  useEffect(() => {
    console.log('erros: ', form.formState.errors)
  }, [form.formState.errors])
  return (
    <Form {...form}>
      <div className="flex flex-col justify-center gap-5">
        <form
          onSubmit={form.handleSubmit(handleFunction)}
          className="flex flex-row items-center justify-center gap-4"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do titular" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pseudonimo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pseudônimo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Pseudônimo do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codigoECAD"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código ECAD</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ECAD do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codigoSOC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código SOC</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SOC do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF/CNPJ</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="CPF ou CNPJ do titular" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codigoCAE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo CAE</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Codigo CAE do titular" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        <div className="flex w-full justify-end gap-4">
          <Button
            className="self-end"
            variant={'destructive'}
            type="reset"
            onClick={() => {
              form.reset() // Chama o reset
              console.log('Formulário foi resetado')
            }}
          >
            Limpar
          </Button>
          <Button
            className="self-end"
            variant={'default'}
            type="submit"
            onClick={form.handleSubmit(handleFunction)}
          >
            Pesquisar
          </Button>
        </div>
      </div>
    </Form>
  )
}
