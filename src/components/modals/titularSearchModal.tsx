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
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { UserSearch } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFetcher, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { titularService } from '@/services/TitularService'
import useTitularSearch from '@/store/titularSearchStore'

import { TitularFilters } from '../forms/titularFilters'

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

  const [isOpen, setIsOpen] = useState(false)

  const { setModalPageIndex, modalPageIndex, selectedTitular } =
    useTitularSearch()

  const [filters, setFilters] = useState<RequestTitular | null>(null)
  const { data, isFetching, isError, refetch, isLoading } = useQuery({
    queryKey: ['pesquisa-titular', filters, modalPageIndex],
    enabled: !!filters,
    placeholderData: keepPreviousData,
    ...titularService.searchTitular,
  })
  const handletitularSearch = async (values: RequestTitular) => {
    setFilters(form.getValues())
    console.log(values)
    await refetch()
  }

  const handlePaginate = async (pageIndex: number) => {
    setModalPageIndex(pageIndex)
    console.log('Página: ', modalPageIndex)
    await refetch()
  }
  useEffect(() => {
    setModalPageIndex(0)
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'secondary'}
          size={'xs'}
          className="flex items-center justify-center gap-2"
        >
          <UserSearch size={20} className="mb-1" color="white" />
          <span className="text-sm text-white">
            {selectedTitular ? selectedTitular.nome : 'Selecionar Titular'}
          </span>
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
          {isFetching ? (
            <SkeletonTable />
          ) : data?.content?.length > 0 ? (
            <>
              <TitularTable titulares={data.content} setIsOpen={setIsOpen} />
              <Pagination
                onPageChange={handlePaginate}
                pageIndex={modalPageIndex} // Use o estado global
                perPage={data?.size || 10}
                totalCount={data?.totalElements || 0}
              />
            </>
          ) : (
            <p>Nenhum titular encontrado.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
