import { TitularTable } from '@components/tables/TitularTables'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { UserSearch } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { TitularFilters } from '../filters/titularFilters'

const TitularSchema = z.object({
  pseudonimo: z.string().min(1),
  nome: z.string().min(1),
  codigoECAD: z.string().min(1),
  codigoSOC: z.string().min(1),
  cpf: z.string().min(1),
  codigoCAE: z.string().min(1),
  email: z.string().min(1),
})
export type RequestTitular = z.infer<typeof TitularSchema>

export function TitularSearchModal() {
  const form = useForm<RequestTitular>({
    resolver: zodResolver(TitularSchema),
  })

  function handleSubmit(values: RequestTitular) {
    console.log(values)
  }

  const { data, isFetching, isError } = useQuery({})
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'secondary'}
          size={'xs'}
          className="flex items-center justify-center gap-2"
        >
          <UserSearch size={20} className="mb-1" color="white" />
          <span className="text-sm text-white">Selecionar Titular</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle className="font-bold text-foreground">
            Buscar titular do fonograma
          </DialogTitle>
          <DialogDescription>
            Insira os dados do titular e clique em pesquisar para buscar um
            titular.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-w-[20rem] flex-row">
          <TitularFilters
            form={form}
            handleFunction={handleSubmit}
            isFetching={isFetching}
          />
        </div>
        <TitularTable />
      </DialogContent>
    </Dialog>
  )
}
