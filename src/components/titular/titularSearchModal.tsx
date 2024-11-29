import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@components/ui/dialog'
import {
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { UserSearch } from 'lucide-react'

import { TitularFilters } from './titularFilters'

export function TitularSearchModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'secondary'}
          size={'xs'}
          className="flex items-center justify-center gap-2"
        >
          <UserSearch size={20} className="mb-1" />
          <span className="text-sm">Buscar Titular</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle className="font-bold text-white">
            Buscar Titular
          </DialogTitle>
          <DialogDescription>
            Insira os dados do titular e clique em pesquisar
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-w-[20rem] flex-row">
          <TitularFilters />
        </div>
      </DialogContent>
    </Dialog>
  )
}
