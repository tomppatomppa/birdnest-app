import create from 'zustand'

const useStore = create((set) => ({
  bird: '',
  setBird: (bird) => set(() => ({ bird: bird })),
  nest: '',
  nests: [],
  setNests: (nests) => set(() => ({ nests: [nests] })),
  setNest: (nest) => set(() => ({ nest: nest })),
}))
export default useStore
