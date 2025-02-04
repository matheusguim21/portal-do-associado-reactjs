import { create } from 'zustand'

import { Titular } from '@/models/Titular'

interface TitularSearch {
  modalPageIndex: number
  setModalPageIndex: (pageIndex: number) => void
  selectedTitular: Titular | null
  auxSelectedTitular: Titular | null
  setAuxSelectedTitular: (titular: Titular | null) => void
  setSelectedTitular: (titular: Titular | null) => void
}

const useTitularSearch = create<TitularSearch>((set) => ({
  modalPageIndex: 0,
  setModalPageIndex: (pageIndex: number) => set({ modalPageIndex: pageIndex }),
  selectedTitular: null,
  setSelectedTitular: (titular: Titular | null) =>
    set({ selectedTitular: titular }),
  auxSelectedTitular: null,
  setAuxSelectedTitular: (titular: Titular | null) => {
    set({ auxSelectedTitular: titular })
  },
}))

export default useTitularSearch
