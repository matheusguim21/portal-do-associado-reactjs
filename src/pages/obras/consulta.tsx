import { Input } from '@components/ui/input'
import { Helmet } from 'react-helmet-async'

export function Obras() {
  return (
    <>
      <Helmet title="Obras" />

      <div>
        <h1 className="trac text-3xl font-semibold tracking-tighter">
          Consulta de Obras
        </h1>
      </div>

      <div className="space-y-2.5">
        <form action="" className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros</span>
          <Input
            id="client_name"
            placeholder="Nome do Cliente"
            className="h-8 w-[320px]"
          />
        </form>

        <div></div>
      </div>
    </>
  )
}
