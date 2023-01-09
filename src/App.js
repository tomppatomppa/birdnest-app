import { gql } from '@apollo/client'
import { useState } from 'react'
import Navbar from './components/Navbar'
import SelectBird from './components/SelectBird'
import useStore from './store'
const query = gql`
  query Query {
    getBirds {
      name
    }
  }
`
function App() {
  const [selectedBird, setSelectedBird] = useState('')
  const bird = useStore((state) => state.bird)
  console.log(bird)
  return (
    <div className="App">
      <Navbar>
        <SelectBird
          selectedBird={selectedBird}
          setSelectedBird={setSelectedBird}
        />
      </Navbar>
    </div>
  )
}

export default App
