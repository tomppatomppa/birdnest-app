import { Box } from '@mui/material'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import PilotTable from './components/PilotTable'
import { SelectBirdContainer } from './components/SelectBird'
import SelectNest from './components/SelectNest'
import useNest from './hooks/useNest'

import useStore from './store'

let interval

function App() {
  const nest = useStore((state) => state.nest)
  const { pilots, setPilots } = useNest({
    getNestId: nest,
  })

  //Reset all pilots if updates for 10 minutes
  useEffect(() => {
    if (interval) {
      clearInterval(interval)
    }
    interval = setInterval(() => {
      setPilots([])
    }, 600000)
    return () => clearInterval(interval)
  }, [setPilots, pilots])

  return (
    <Box>
      <Navbar>
        <SelectBirdContainer />
      </Navbar>
      <SelectNest />
      <PilotTable pilots={pilots} setPilots={setPilots} />
    </Box>
  )
}

export default App
