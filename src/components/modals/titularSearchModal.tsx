import { SkeletonTable } from '@components/skeletons/table-skeleton'
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
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { titularService } from '@/services/TitularService'

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

  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data, isFetching, isError, refetch, isLoading } = useQuery({
    queryKey: ['pesquisa-titular', form.getValues(), pageIndex],
    enabled: false,
    ...titularService.searchTitular,
  })
  const handletitularSearch = async (values: RequestTitular) => {
    console.log(values)
    await refetch()
  }

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
      <DialogContent className="min-w-[80vw] max-w-fit">
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
            handleFunction={handletitularSearch}
            isFetching={isFetching}
          />
        </div>
        {data != null ? <TitularTable titulares={data.content} /> : null}
      </DialogContent>
    </Dialog>
  )
}
