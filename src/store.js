import { create } from 'zustand'

const initialState = {
  nest: '',
  nests: [],
}

const useStore = create((set) => ({
  ...initialState,
  setNests: (nests) => set(() => ({ nests: nests })),
  setNest: (nest) => set(() => ({ nest: nest })),
  resetStore: () => set(initialState),
}))

export default useStore
