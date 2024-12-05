import { Button } from '@components/ui/button'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import dayjs from 'dayjs'
import { Table } from 'lucide-react'

import { Titular } from '@/models/Titular'

interface TitularTableProps {
  titular: Titular[]
}

export function TitularTable({ titular }: TitularTableProps) {
  return (
    <>
      <Table className="mt-10 caption-top rounded border-2 bg-none">
        {/* <TableCaption className="text-lg">
      Resultado da pesquisa de titulars
    </TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-primary">Código SOC</TableHead>
            <TableHead className="text-primary">Código ECAD</TableHead>
            <TableHead className="text-primary">CPF/CNPJ</TableHead>
            <TableHead className="text-primary">CódigoIPI</TableHead>
            <TableHead className="text-primary">Nome Completo</TableHead>
            <TableHead className="text-primary">Data de Nascimento</TableHead>
            <TableHead className="text-primary">Nacional</TableHead>
            <TableHead className="text-primary">Código IPN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-muted-foreground">
          {titular.map((titular) => (
            <TableRow key={titular.id}>
              <TableCell></TableCell>
              <TableCell>{titular.id}</TableCell>
              <TableCell>{titular.codigoEcad}</TableCell>
              <TableCell>{titular.cpfCnpj}</TableCell>
              <TableCell>{titular.codigoIpi}</TableCell>
              <TableCell>{titular.nome}</TableCell>
              <TableCell className="text-center">{titular.email}</TableCell>
              <TableCell>
                {dayjs(titular.dataNascimento).format('DD/MM/YYYY')}
              </TableCell>

              <TableCell className="text-center">
                {titular.nacional === 'S' ? 'SIM' : 'NÂO'}
              </TableCell>
              <TableCell className="text-center">{titular.ipn}</TableCell>
              <TableCell>
                <Button variant={'outline'}>Ver Mais</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
