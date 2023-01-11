import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import useStore from '../store'

const SelectNest = () => {
  const { nest, nests, setNest } = useStore((state) => state)

  const handleSetNest = (event) => {
    setNest(event.target.value)
  }

  if (nests[0] === undefined) {
    return <div>no nests avaliable for selected bird </div>
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Nests</InputLabel>
        <Select value={nest} label="Nest" onChange={handleSetNest}>
          {nests.map((nest) => (
            <MenuItem key={nest.url} value={nest.url}>
              {nest.url}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
export default SelectNest
