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

export function TitularTable({
  titulares,
  setIsOpen,
}: TitularTableProps & { setIsOpen: (value: boolean) => void }) {
  const { setSelectedTitular, setModalPageIndex } = useTitularSearch()

  const handleSelectTitular = (titular: Titular) => {
    console.log('Selecionando Titular: ', titular)
    setSelectedTitular(titular) // Atualiza o titular selecionado
    setIsOpen(false) // Fecha o modal
  }
  return (
    <>
      <Table className="rounded bg-none">
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
          {titulares.map((titular) => {
            const nascTitular = dayjs(titular.dataNascimento).format(
              'DD/MM/YYYY',
            )
            return (
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
                  {nascTitular !== 'Invalid Date' ? nascTitular : 'Sem data'}
                </TableCell>

                <TableCell className="text-center">
                  {titular.nacional === 'S' ? 'SIM' : 'NÂO'}
                </TableCell>
                <TableCell>
                  <Button
                    variant={'outline'}
                    onClick={() => handleSelectTitular(titular)}
                  >
                    Selecionar
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
