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

import { Fonograma } from '@/models/Fonograma'

interface RequestFonogramasTable {
  fonogramas: Fonograma[]
}

export function FonogramasTable({ fonogramas }: RequestFonogramasTable) {
  return (
    <>
      <Table className="caption-top rounded border-foreground bg-none">
        <TableCaption>Resultado da pesquisa de Fonogramas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-primary">Id</TableHead>
            <TableHead className="text-primary">Título</TableHead>
            <TableHead className="text-primary">Código ECAD</TableHead>
            <TableHead className="text-primary">ISRC</TableHead>
            <TableHead className="text-primary">Data de Registro</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Nacional</TableHead>
            <TableHead className="text-primary">Situação Cadastral</TableHead>
            <TableHead className="text-primary">Domínio Público</TableHead>
            <TableHead className="text-primary">Instrumental</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-muted-foreground">
          {fonogramas.map((fonograma) => (
            <TableRow key={fonograma.id}>
              <TableCell></TableCell>
              <TableCell>{fonograma.id}</TableCell>
              <TableCell>{fonograma.titulo}</TableCell>
              <TableCell>{fonograma.codigoEcad}</TableCell>
              <TableCell>{fonograma.iswc}</TableCell>
              <TableCell>
                {fonograma.dtRegistro != null
                  ? dayjs(fonograma.dtRegistro).format('DD/MM/YYYY')
                  : 'Sem data'}
              </TableCell>
              <TableCell>{fonograma.status}</TableCell>
              <TableCell>{fonograma.nacional}</TableCell>
              <TableCell>{fonograma.situacaoCadastral.descricao}</TableCell>
              <TableCell>{fonograma.dominioPublico}</TableCell>
              <TableCell>{fonograma.instrumental}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
