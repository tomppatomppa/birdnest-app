import { useEffect } from 'react'
import useBird from '../hooks/useBird'
import useStore from '../store'
import PilotTable from './PilotTable'
import SelectNest from './SelectNest'

const Bird = () => {
  const bird = useStore((state) => state.bird)
  const { setNests } = useStore((state) => state)

  const { nests, error } = useBird({
    name: bird,
    nests: true,
  })

  useEffect(() => {
    if (nests) {
      setNests(...nests)
    }
  }, [nests, setNests])

  return <ul>{<SelectNest />}</ul>
}

export default Bird
