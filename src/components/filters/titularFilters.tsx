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
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { useCpfCnpjMask } from './CpfCnpjMask'

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
  const cpfCnpjMask = useCpfCnpjMask()
  const removeMask = (value: string) => value.replace(/\D/g, '')
  const onSubmit = (formData: RequestTitular) => {
    // Limpa o CPF/CNPJ antes de enviar
    const sanitizedData = {
      ...formData,
      cpf: removeMask(formData.cpf), // Remove a máscara do CPF/CNPJ
    }
    return handleFunction(sanitizedData)
  }

  useEffect(() => {
    console.log('erros: ', form.formState.errors)
  }, [form.formState.errors])
  return (
    <Form {...form}>
      <div className="mb-10 flex flex-col justify-center gap-5">
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
                  <Input
                    {...field}
                    maxLength={18}
                    placeholder="CPF ou CNPJ do titular"
                    value={cpfCnpjMask.value || form.watch('cpf') || ''} // Usa o valor do formulário como fonte inicial
                    onChange={(e) => {
                      cpfCnpjMask.onChange(e) // Atualiza a máscara
                      form.setValue('cpf', e.target.value.replace(/\D/g, '')) // Atualiza o formulário com o valor sem máscara
                    }}
                    onBlur={field.onBlur} // Preserva o evento de blur
                  />
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
              form.setValue('cpf', '')
              console.log('Formulário foi resetado')
            }}
          >
            Limpar
          </Button>
          <Button
            className="self-end"
            variant={'default'}
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            Pesquisar
          </Button>
        </div>
      </div>
    </Form>
  )
}
