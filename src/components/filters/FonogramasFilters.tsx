import { TitularSearchModal } from '@components/modals/titularSearchModal'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group'
import { Separator } from '@components/ui/separator'
import { RequestFonograma } from '@pages/fonogramas/consulta'
import { Search } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface FonogramasFiltersProps {
  form: UseFormReturn<RequestFonograma>
  isFetching: boolean
  handleFunction: (formParams: RequestFonograma) => Promise<void>
}

export function FonogramasFilters({
  form,
  handleFunction,
  isFetching,
}: FonogramasFiltersProps) {
  return (
    <Form {...form}>
      <span className="text-lg font-semibold">Filtros:</span>
      <form
        onSubmit={form.handleSubmit(handleFunction)}
        className="flex w-[70rem] flex-col flex-wrap items-start gap-3"
      >
        <div className="flex h-10 flex-wrap items-center justify-center gap-3">
          <FormField
            control={form.control}
            name="meusFonogramas"
            render={({ field }) => (
              <FormItem className="-mt-2 flex items-end justify-center gap-2">
                <Label htmlFor="meus-fonogramas" className="text-sm">
                  Meus Fonogramas{' '}
                </Label>
                <Checkbox
                  className="-mt-5"
                  id="meus-fonogramas"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormItem>
            )}
          />
          <Separator
            orientation="vertical"
            className="h-7 w-0.5 bg-foreground"
          />
          <Label>Nacional</Label>
          <FormField
            control={form.control}
            name="nacional"
            render={({ field }) => (
              <RadioGroup
                className="flex items-center"
                defaultValue="S"
                value={field.value}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sim">Sim</Label>
                  <RadioGroupItem id="sim" value="S" />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="nao">Não</Label>
                  <RadioGroupItem id="nao" value="N" />
                </div>
              </RadioGroup>
            )}
          />
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Título do fonograma"
                    className="h-8 w-52 placeholder:text-xs"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codigoEcad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código ECAD</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ECAD do Fonograma"
                    className="h-8 w-44 placeholder:text-xs"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <TitularSearchModal />
          <Button size={'xs'} type="submit" disabled={isFetching}>
            <Search className="mr-2 h-4 w-4" />
            {isFetching ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
