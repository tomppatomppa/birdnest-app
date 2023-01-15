import { Box } from '@mui/material'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import PilotTable from './components/PilotTable'
import { SelectBirdContainer } from './components/SelectBird'
import SelectNest from './components/SelectNest'
import useNest from './hooks/useNest'

import useStore from './store'

function App() {
  const nest = useStore((state) => state.nest)
  const { pilots, setPilots } = useNest({
    getNestId: nest,
  })

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
