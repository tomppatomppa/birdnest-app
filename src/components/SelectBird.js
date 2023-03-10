import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { GET_BIRDS } from '../graphql/queries'
import useBirds from '../hooks/useBirds'
import useStore from '../store'

const SelectBird = ({ bird, birds, handleSelectBird }) => {
  return (
    <Box minWidth={120}>
      <FormControl style={{ width: 240, marginRight: 12 }}>
        <InputLabel>Birds</InputLabel>
        <Select
          value={bird}
          label="Bird"
          placeholder="Select a bird"
          onChange={handleSelectBird}
        >
          {birds?.map((bird) => (
            <MenuItem key={bird.name} value={bird.name}>
              {bird.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export const SelectBirdContainer = () => {
  const [bird, setBird] = useState('')
  const { birds, loading, error } = useBirds(GET_BIRDS)
  const { setNest, setNests, resetStore } = useStore((state) => state)

  const handleSelectBird = (e) => {
    const selectedBird = birds.find((b) => b.name === e.target.value)
    resetStore() //Reset Zustand store when bird changes
    setBird(selectedBird.name)
    if (selectedBird.protectedNests[0]) {
      setNest(selectedBird.protectedNests[0].url)
      setNests(selectedBird.protectedNests)
    }
  }
  //Set default
  useEffect(() => {
    const setDefaultBird = () => {
      const [defaultBird] = birds
      setBird(defaultBird.name)
      setNests(defaultBird.protectedNests)
      setNest(defaultBird.protectedNests[0]?.url)
    }
    if (!loading && !error) {
      setDefaultBird()
    }
  }, [birds, loading, error, setBird, setNest, setNests])

  if (loading) {
    return <div>loading birds..</div>
  }

  if (error) {
    return <div>Something went wrong loading birds</div>
  }

  return (
    <SelectBird bird={bird} birds={birds} handleSelectBird={handleSelectBird} />
  )
}

export default SelectBird
