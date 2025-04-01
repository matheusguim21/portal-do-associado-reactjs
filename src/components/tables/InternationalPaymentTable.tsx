import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { InternationalPayment } from "@dtos/Internacional";
import { parseISO,format, formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowDownUp } from "lucide-react";


type Props = {
 arquivo: InternationalPayment[]
};



export  function InternationalPaymentTable({arquivo}:Props) {

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  


  return (
    <Table>
      <TableHeader>
      <TableRow>
          <TableHead><div className="flex items-center gap-1"><span>ID</span> <ArrowDownUp size={15} cursor={"pointer"}  /></div> </TableHead>
          <TableHead><div className="flex items-center gap-1"><span>Data Inicial</span><ArrowDownUp size={15} cursor={"pointer"} /></div></TableHead>
          <TableHead><div className="flex items-center gap-1">Data Final <ArrowDownUp size={15} cursor={"pointer"} /></div></TableHead>
          <TableHead><div className="flex items-center gap-1"><span>Total</span><ArrowDownUp size={15} cursor={"pointer"} /></div></TableHead>
          <TableHead><div className="flex items-center gap-1"><span>Status</span><ArrowDownUp size={15} cursor={"pointer"} /></div></TableHead>
          <TableHead><div className="flex items-center gap-1"><span>Data Processamento</span><ArrowDownUp cursor={"pointer"} size={15}/></div></TableHead>
      </TableRow>
      </TableHeader>
      <TableBody>
        {arquivo.map((arquivo)=>(
          <TableRow key={arquivo.id}>
            <TableCell>{arquivo.id}</TableCell>
            <TableCell>{format(parseISO(arquivo.dataInicial), "dd/MM/yyyy")}</TableCell>
            <TableCell>{format(parseISO(arquivo.dataFinal), "dd/MM/yyyy")}</TableCell>
            <TableCell>{Intl.NumberFormat('pt-BR',{
              style:"currency",
              currency:"BRL"
            }).format(arquivo.totalLiquido)}</TableCell>
            <TableCell className="text-green-600" >{capitalizeFirstLetter(arquivo.status)}</TableCell>
            <TableCell> {format(parseISO(arquivo.dataProcessamento), "dd/MM/yyyy")} { formatDistanceToNowStrict(parseISO(arquivo.dataProcessamento), {
              addSuffix:true,
              locale:ptBR,
              
            })}</TableCell>
           
          </TableRow>

        ))}
      </TableBody>
    </Table>
  )
}
