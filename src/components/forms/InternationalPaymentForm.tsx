import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { RequestInternationalPayment } from '@/pages/financeiro/payment'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@components/ui/form'
import { DatePicker } from '../inputs/DatePicker'
import { Input } from '../ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@components/ui/select'
import { Button } from '../ui/button'
import { CalendarPlus2, CalendarSearch } from 'lucide-react'
import { format } from 'date-fns/format'


type Props ={
  form: UseFormReturn<RequestInternationalPayment>
  isFetching: boolean
  OnSearch: (formParams: RequestInternationalPayment) => Promise<void>
}
export default function InternationalPaymentForm({form,isFetching,OnSearch}:Props) {


  const onSubmit = async (formParams:RequestInternationalPayment)=>{
    const formattedParams = {
      ...formParams,
      dataInicial: format(new Date(formParams.dataInicial), "yyyy-MM-dd"),
      dataFinal: format(new Date(formParams.dataFinal), "yyyy-MM-dd"),
    }
    console.log("formatted params: ",formattedParams)
    await OnSearch(formattedParams)

  }

  return (
    <div className='flex rounded-lg bg-primary h-24'>
      <div className='flex flex-1 flex-row px-5 py-2'>
        <div className='flex-1'>
          <Form
          
          {...form}
          >
          <form className='flex flex-1 gap-10' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
              control={form.control}
              name='dataInicial'
              render={({field,fieldState,formState})=>(
                <FormItem className='flex-col flex '>
                  <FormLabel className='text-background'>Data Inicial:</FormLabel>
                 <FormControl
                 >
                 <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                 </FormControl>
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name='dataFinal'
              render={({field,fieldState,formState})=>(
                <FormItem className='flex-col flex '>
                  <FormLabel className='text-background'>Data Final:</FormLabel>
                 <FormControl
                 >
                 <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                 </FormControl>
                 <FormMessage/>
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name='status'
              render={({field})=>(
                <FormItem className='flex-col flex '>
                  <FormLabel className='text-background'>
                  Status:
                  </FormLabel>
                  <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EM ABERTO">EM ABERTO</SelectItem>
                      <SelectItem value="PROCESSADO">PROCESSADO</SelectItem>
                    </SelectContent>
                  </Select>
  
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              
              />
  
           </form>
          </Form>
        </div>
        <div className='flex gap-5 items-center'>
          <Button className='gap-2 '  variant={'secondary'} onClick={form.handleSubmit(onSubmit)}>
            <CalendarSearch size={20}/>
            <span>Pesquisar</span></Button>
          <Button className='gap-2' variant={'secondary'}>
          <CalendarPlus2 size={20} />
            <span>Incluir Novo</span></Button>
        </div>
      </div>
      
      
    </div>
  )
}
