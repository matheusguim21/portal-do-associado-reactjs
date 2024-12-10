import { Button } from '@components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import dayjs from 'dayjs'

import { Titular } from '@/models/Titular'
import useTitularSearch from '@/store/titularSearchStore'

interface TitularTableProps {
  titulares: Titular[]
}

export function TitularTable({ titulares }: TitularTableProps) {
  const { setSelectedTitular } = useTitularSearch()

  return (
    <>
      <Table className="mt-10 rounded bg-none">
        {/* <TableCaption className="text-lg">
      Resultado da pesquisa de titulars
    </TableCaption> */}
        <TableHeader>
          <TableRow className="py-1">
            <TableHead></TableHead>
            <TableHead className="text-sm text-primary">SOC</TableHead>
            <TableHead className="text-sm text-primary">ECAD</TableHead>
            <TableHead className="text-sm text-primary">CPF/CNPJ</TableHead>
            <TableHead className="text-sm text-primary">IPI</TableHead>
            <TableHead className="text-sm text-primary">IPN</TableHead>
            <TableHead className="text-sm text-primary">
              Nome Completo
            </TableHead>
            <TableHead className="text-sm text-primary">Email</TableHead>
            <TableHead className="text-sm text-primary">
              Data de Nascimento
            </TableHead>
            <TableHead className="text-sm text-primary">Nacional</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-muted-foreground">
          {titulares.map((titular) => (
            <TableRow key={titular.id} className="py-1">
              <TableCell></TableCell>
              <TableCell className="text-sm leading-tight">
                {titular.id}
              </TableCell>
              <TableCell className="text-sm">{titular.codigoEcad}</TableCell>
              <TableCell className="text-sm">{titular.cpfCnpj}</TableCell>
              <TableCell className="text-sm">{titular.codigoIpi}</TableCell>
              <TableCell className="text-center">{titular.ipn}</TableCell>
              <TableCell className="text-sm">{titular.nome}</TableCell>
              <TableCell className="text-center text-sm">
                {titular.email}
              </TableCell>
              <TableCell className="text-sm">
                {dayjs(titular.dataNascimento).format('DD/MM/YYYY')}
              </TableCell>

              <TableCell className="text-center">
                {titular.nacional === 'S' ? 'SIM' : 'NÂO'}
              </TableCell>
              <TableCell>
                <Button
                  variant={'outline'}
                  onClick={() => setSelectedTitular(titular)}
                >
                  Selecionar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
