import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import dayjs from 'dayjs'

import { Obra } from '@/models/Obra'

interface RequestObrasTable {
  obras: Obra[]
}

export function ObrasTable({ obras }: RequestObrasTable) {
  return (
    <>
      <Table className="caption-top rounded-md bg-foreground">
        <TableCaption>Resultado da pesquisa de Obras</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Código ECAD</TableHead>
            <TableHead>ISWC</TableHead>
            <TableHead>Data de Registro</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Nacional</TableHead>
            <TableHead>Situação Cadastral</TableHead>
            <TableHead>Domínio Público</TableHead>
            <TableHead>Instrumental</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-muted">
          {obras.map((obra) => (
            <TableRow key={obra.id}>
              <TableCell></TableCell>
              <TableCell>{obra.id}</TableCell>
              <TableCell>{obra.titulo}</TableCell>
              <TableCell>{obra.codigoEcad}</TableCell>
              <TableCell>{obra.iswc}</TableCell>
              <TableCell>
                {obra.dtRegistro != null
                  ? dayjs(obra.dtRegistro).format('DD/MM/YYYY')
                  : 'Sem data'}
              </TableCell>
              <TableCell>{obra.status}</TableCell>
              <TableCell>{obra.nacional}</TableCell>
              <TableCell>{obra.situacaoCadastral.descricao}</TableCell>
              <TableCell>{obra.dominioPublico}</TableCell>
              <TableCell>{obra.instrumental}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
