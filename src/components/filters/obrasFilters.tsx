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
import { RequestObra } from '@pages/obras/consulta'
import { Search } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface ObrasFiltersProps {
  form: UseFormReturn<RequestObra>
  isFetching: boolean
  handleFunction: (formParams: RequestObra) => Promise<void>
}

export function ObrasFilters({
  form,
  handleFunction,
  isFetching,
}: ObrasFiltersProps) {
  return (
    <Form {...form}>
      <span className="text-lg font-semibold">Filtros:</span>
      <form
        onSubmit={form.handleSubmit(handleFunction)}
        className="flex w-[70rem] flex-col flex-wrap items-start justify-end gap-3"
      >
        <div className="flex flex-wrap items-end gap-5">
          <FormField
            control={form.control}
            name="minhasObras"
            render={({ field }) => (
              <FormItem className="flex items-end justify-center gap-2">
                <Label htmlFor="minhas-obras">Minhas Obras: </Label>
                <Checkbox
                  id="minhas-obras"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormItem>
            )}
          />
          <div className="flex">
            <Label className="mr-2">Nacional:</Label>
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
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-3">
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Título da obra"
                    className="h-8 w-52"
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
                <FormLabel>Código ECAD </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ECAD da Obra"
                    className="h-8 w-44"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="titularCodigoEcad"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Código Ecad do Titular"
                  className="h-8 w-44"
                  {...field}
                />
              </FormItem>
            )}
          /> */}
          {/* <FormField
            control={form.control}
            name="titularId"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Código SOC do Titular"
                  className="h-8 w-44"
                  {...field}
                />
              </FormItem>
            )}
          /> */}
          {/* <FormField
            control={form.control}
            name="titularPseudonimo"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Pseudônimo"
                  className="h-8 w-40"
                  {...field}
                />
              </FormItem>
            )}
          /> */}
          <TitularSearchModal />
          <Button
            size={'xs'}
            className="self-end"
            variant={'destructive'}
            type="reset"
            onClick={() => {
              console.log('Resetou')
              form.reset()
            }}
          >
            Limpar
          </Button>
          <Button size={'xs'} type="submit" disabled={isFetching}>
            <Search className="mr-2 h-4 w-4" />
            {isFetching ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
