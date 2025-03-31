import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { Pagamento } from "@dtos/Internacional";


type Props = {
 arquivo: Pagamento[]
};



export  function Financeirotable({arquivo}:Props) {
  return (
    <Table>
      <TableHeader>
        <TableHead>ID</TableHead>
        <TableHead>Data Inicial</TableHead>
        <TableHead>Data Final</TableHead>
        <TableHead>Data Processamento</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Total</TableHead>
      </TableHeader>
      <TableBody>
        {arquivo.map((arquivo)=>(
          <TableRow>
            <TableCell>{arquivo.id}</TableCell>
            <TableCell>{arquivo.dataInicial}</TableCell>
            <TableCell>{arquivo.dataFinal}</TableCell>
            <TableCell>{arquivo.dataProcessamento}</TableCell>
            <TableCell>{arquivo.status}</TableCell>
            <TableCell>{arquivo.totalLiquido}</TableCell>
           
          </TableRow>

        ))}
      </TableBody>
    </Table>
  )
}
