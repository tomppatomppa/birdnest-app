import Bird from './components/Bird'
import Navbar from './components/Navbar'
import PilotTable from './components/PilotTable'
import SelectBird from './components/SelectBird'

function App() {
  return (
    <div className="App">
      <Navbar>
        <SelectBird />
      </Navbar>
      <Bird />
      <PilotTable />
    </div>
  )
}

export default App
