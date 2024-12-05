import { Button } from '@components/ui/button'
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
      <Table className="mt-10 caption-top rounded border-2 bg-none">
        {/* <TableCaption className="text-lg">
          Resultado da pesquisa de Obras
        </TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-primary">Código SOC</TableHead>
            <TableHead className="text-primary">Código ECAD</TableHead>
            <TableHead className="text-primary">ISWC</TableHead>
            <TableHead className="text-primary">Título</TableHead>
            <TableHead className="text-primary">Situação Cadastral</TableHead>
            <TableHead className="text-primary">Data de Registro</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Nacional</TableHead>
            <TableHead className="text-primary">Domínio Público</TableHead>
            <TableHead className="text-primary">Instrumental</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-muted-foreground">
          {obras.map((obra) => (
            <TableRow key={obra.id}>
              <TableCell></TableCell>
              <TableCell>{obra.id}</TableCell>
              <TableCell>{obra.codigoEcad}</TableCell>
              <TableCell>{obra.iswc}</TableCell>
              <TableCell>{obra.titulo}</TableCell>
              <TableCell>{obra.situacaoCadastral.descricao}</TableCell>
              <TableCell>
                {obra.dtRegistro != null
                  ? dayjs(obra.dtRegistro).format('DD/MM/YYYY')
                  : 'Sem data'}
              </TableCell>
              <TableCell>{obra.status}</TableCell>
              <TableCell className="text-center">
                {obra.nacional === 'S' ? 'SIM' : 'NÂO'}
              </TableCell>
              <TableCell className="text-center">
                {obra.dominioPublico === 'S' ? 'SIM' : 'NÂO'}
              </TableCell>
              <TableCell className="text-center">
                {obra.instrumental === 'S' ? 'SIM' : 'NÂO'}
              </TableCell>
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
