import {   InternationalPaymentResponse } from "@dtos/Internacional"
import { RequestInternationalPayment } from "@/pages/financeiro/payment"
import { api } from "@utils/api"
import { format } from "date-fns/format"

type GetPagamentoProps={
  queryKey: [string, RequestInternationalPayment, string]
}
interface RequestPaymentParams extends RequestInternationalPayment{
  page:string
}

const getPagamento = {
   buildQueryParams:(arquivo:RequestInternationalPayment, pageIndex:string):RequestPaymentParams=>{
    return{
      dataInicial: format(new Date(arquivo.dataInicial), "yyyy-MM-dd")|| '',
      dataFinal: format(new Date(arquivo.dataFinal), "yyyy-MM-dd")|| '',
      page:pageIndex || "0", 
      size:arquivo.size || 5,
      status:arquivo.status
    }
  },

  queryFn:async ({queryKey}:GetPagamentoProps):Promise<InternationalPaymentResponse> =>{
    const [_, arquivo, pageIndex]  = queryKey
    const params = getPagamento.buildQueryParams(arquivo, pageIndex)

    const response = await api.get("sipa-financeiro/v1/pgto-internacional/periodos",{params})

    console.log("Resposta do Arquivo de Pagamento Internacional: ", response)
    return response.data
   

  }
}

export const internationalService ={
 getPagamento 
}