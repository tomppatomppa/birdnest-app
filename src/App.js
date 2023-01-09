import { gql } from '@apollo/client'
import Navbar from './components/Navbar'
const query = gql`
  query Query {
    getBirds {
      name
    }
  }
`
function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  )
}

export default App
