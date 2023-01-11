import { Box } from '@mui/material'

import Bird from './components/Bird'
import Navbar from './components/Navbar'
import PilotTable from './components/PilotTable'
import SelectBird from './components/SelectBird'
import useNest from './hooks/useNest'

import useStore from './store'

function App() {
  const { nest } = useStore((state) => state)
  const { pilots } = useNest({
    getNestId: nest,
  })

  return (
    <Box>
      <Navbar>
        <SelectBird />
      </Navbar>
      <Bird />
      <PilotTable pilots={pilots} />
    </Box>
  )
}

export default App
