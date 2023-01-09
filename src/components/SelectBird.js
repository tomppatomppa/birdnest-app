import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { GET_BIRDS } from '../graphql/queries'
import useBirds from '../hooks/useBirds'
import useStore from '../store'

const defaultNestUrl = 'assignments.reaktor.com/birdnest/drones'

const SelectBird = () => {
  const { birds, loading, error } = useBirds(GET_BIRDS)
  const { bird, setBird, setNest } = useStore((state) => state)

  useEffect(() => {
    //Set default to first bird in array on initial mount
    const setDefaultBird = () => {
      const [defaultBird] = birds
      setBird(defaultBird.name)
      //Set default nest for testing
      setNest(defaultNestUrl)
    }
    if (!loading && !error) {
      setDefaultBird()
    }
  }, [birds, loading, error, setBird, setNest])

  if (loading) {
    return <div>loading birds..</div>
  }

  if (error) {
    return <div>Something went wrong loading birds</div>
  }
  return (
    <Box minWidth={120}>
      <FormControl style={{ width: 240, marginRight: 12 }}>
        <InputLabel>Birds</InputLabel>
        <Select
          value={bird}
          label="Bird"
          onChange={(e) => setBird(e.target.value)}
        >
          {birds.map((bird) => (
            <MenuItem key={bird.name} value={bird.name}>
              {bird.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectBird