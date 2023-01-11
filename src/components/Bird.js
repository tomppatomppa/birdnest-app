import { useEffect } from 'react'
import useBird from '../hooks/useBird'
import useStore from '../store'

import SelectNest from './SelectNest'

const Bird = () => {
  const bird = useStore((state) => state.bird)
  const { setNests } = useStore((state) => state)

  const { nests } = useBird({
    name: bird,
    nests: true,
  })
  //set default nests
  useEffect(() => {
    if (nests) {
      setNests(...nests)
    }
  }, [nests, setNests])

  return <SelectNest />
}

export default Bird
