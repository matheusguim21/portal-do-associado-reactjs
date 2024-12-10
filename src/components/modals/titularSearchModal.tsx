import { Pagination } from '@components/pagination'
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
import useTitularSearch from '@/store/titularSearchStore'

import { TitularFilters } from '../filters/titularFilters'

const TitularSchema = z
  .object({
    pseudonimo: z.string().optional(),
    nome: z.string().optional(),
    codigoECAD: z.string().optional(),
    codigoSOC: z.string().optional(),
    cpf: z.string().optional(),
    codigoCAE: z.string().optional(),
    email: z.string().optional(),
  })
  .refine(
    (data) =>
      Object.values(data).some(
        (value) => value !== undefined && value.trim() !== '',
      ),
    {
      message: 'Pelo menos um campo deve ser preenchido.',
      path: [], // Aplica a mensagem ao formulário inteiro
    },
  )
export type RequestTitular = z.infer<typeof TitularSchema>

export function TitularSearchModal() {
  const form = useForm<RequestTitular>({
    resolver: zodResolver(TitularSchema),
    defaultValues: {
      pseudonimo: '',
      nome: '',
      codigoECAD: '',
      codigoSOC: '',
      cpf: '',
      codigoCAE: '',
      email: '',
    },
  })
  const { setModalPageIndex, modalPageIndex } = useTitularSearch()

  const { data, isFetching, isError, refetch, isLoading } = useQuery({
    queryKey: ['pesquisa-titular', form.getValues(), modalPageIndex],
    enabled: true,
    ...titularService.searchTitular,
  })
  const handletitularSearch = async (values: RequestTitular) => {
    console.log(values)
    await refetch()
  }

  const handlePaginate = async (pageIndex: number) => {
    setModalPageIndex(pageIndex)
    console.log('Página: ', modalPageIndex)
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
      <DialogContent className="max-h-[90vh] min-w-[80vw] max-w-fit overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-foreground">
            Buscar titular do fonograma
          </DialogTitle>
          <DialogDescription>
            Insira os dados do titular e clique em pesquisar para buscar um
            titular.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-w-[20rem] flex-col">
          <TitularFilters
            form={form}
            handleFunction={handletitularSearch}
            isFetching={isFetching}
          />
          {data?.content?.length > 0 ? (
            <>
              <TitularTable titulares={data.content} />
              <Pagination
                onPageChange={handlePaginate}
                pageIndex={modalPageIndex} // Use o estado global
                perPage={data?.size || 10}
                totalCount={data?.totalElements || 0}
              />
            </>
          ) : isFetching ? (
            <SkeletonTable />
          ) : (
            <p>Nenhum titular encontrado.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
