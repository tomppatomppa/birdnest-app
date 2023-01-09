import create from 'zustand'

const useStore = create((set) => ({
  bird: '',
  setBird: (bird) => set(() => ({ bird: bird })),
}))
export default useStore
