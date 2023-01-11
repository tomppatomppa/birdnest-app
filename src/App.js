import { Box } from '@mui/material'

import Navbar from './components/Navbar'
import PilotTable from './components/PilotTable'
import SelectBird from './components/SelectBird'
import SelectNest from './components/SelectNest'
import useNest from './hooks/useNest'

import useStore from './store'

function App() {
  const nest = useStore((state) => state.nest)
  const { pilots } = useNest({
    getNestId: nest,
  })

  return (
    <Box>
      <Navbar>
        <SelectNest />
        <SelectBird />
      </Navbar>
      <PilotTable pilots={pilots} />
    </Box>
  )
}

export default App
