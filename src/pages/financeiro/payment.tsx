import InternationalPaymentForm from "@components/forms/InternationalPaymentForm";
import { InternationalPaymentTable } from "@/components/tables/InternationalPaymentTable";
import { InternationalPayment } from "@dtos/Internacional";
import { zodResolver } from "@hookform/resolvers/zod";
import { internationalService } from "@services/InternacionalService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { SkeletonTable } from "@/components/skeletons/table-skeleton";
import { Pagination } from "@/components/pagination";
import { format } from "date-fns/format";

const InternationalPaymentSchema = z.object({
  dataInicial: z.coerce.date(),
  dataFinal: z.coerce.date(), 
  status:z.enum(["PROCESSADO", "EM ABERTO"]),
  size:z.coerce.number(),
})

export type RequestInternationalPayment = z.infer<typeof InternationalPaymentSchema>


export  function Financeiro() {

  
  const form = useForm<RequestInternationalPayment>({
    resolver: zodResolver(InternationalPaymentSchema),
    defaultValues:{
      dataFinal:new Date(),
      dataInicial:new Date(),
      size:5,
      status:"PROCESSADO"
    }
  })
  const [searchParams, setSearchParams] = useSearchParams()


  const pageIndex = z.coerce
      .number()
      .transform((page) => page - 1)
      .parse(searchParams.get('page') ?? '1')




  const {data, isLoading, error, refetch,isFetching} = useQuery({
    queryFn:internationalService.getPagamento.queryFn,
    queryKey: ["search-international-payment", form.getValues(), pageIndex.toString() ],
    enabled:false
  })


  const handlePaginate = async (pageIndex: number) => {
    const safePageIndex = Math.max(0, pageIndex) // Garante que não será menor que 0
    setSearchParams((state) => {
      state.set('page', (safePageIndex + 1).toString())
      return state
    })
    await refetch()
  }
  const handlePaymentSearch = async (formParams: RequestInternationalPayment) => {
    
    
    
      try {
        console.log('Parâmetros: ', formParams)
        await refetch() // Refetch ao submeter o formulário
        console.log('Resultado da pesquisa', data)
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <main className="flex-1 flex flex-col">
      <InternationalPaymentForm
      form={form}
      isFetching={isFetching}
      OnSearch={handlePaymentSearch}
      />
      {isFetching || isLoading ? (
                  <SkeletonTable />
                ) : data != null ? (
                  <InternationalPaymentTable
      arquivo={data.content}
      />
                ) : null}
      {data?.content ? (
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={data.number}
            perPage={data.size}
            totalCount={data.totalElements}
          />
        ) : null}
    </main>
  )
}

