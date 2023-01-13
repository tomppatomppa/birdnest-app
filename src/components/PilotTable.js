import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getTimeDifferenceMinutes } from '../hooks/useNest'
import { useEffect, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { PILOT_UPDATED } from '../graphql/subscriptions'
import useStore from '../store'
/**
 *
 * @param {*} pilots existing array of pilots
 * @param {*} updatedPilot updated pilot
 * @returns Filter out updated pilot if it exists,
 *  or if a pilot has NOT been seen in the last 10 minutes
 *  add updated pilot to array
 */
export const filterPilots = (pilots = [], updatedPilot) => {
  const filteredPilots = pilots.filter(
    (pilot) =>
      pilot.pilotId !== updatedPilot.pilotId &&
      getTimeDifferenceMinutes(pilot.lastSeen) < 10
  )

  return filteredPilots.concat(updatedPilot)
}
export default function PilotTable({ pilots, setPilots }) {
  const [recentlyAddedPilots, setRecentlyAddedPilots] = useState([])
  const nest = useStore((state) => state.nest)

  function handlePilotAdd(newPilot) {
    setRecentlyAddedPilots([...recentlyAddedPilots, newPilot])
  }

  useEffect(() => {
    setTimeout(() => {
      setRecentlyAddedPilots([])
    }, 3000)
  }, [recentlyAddedPilots])

  useSubscription(PILOT_UPDATED, {
    variables: {
      nestUrl: nest,
    },
    skip: !nest, //Skip subscription if no url is selected
    onData: ({ data }) => {
      const updatedPilot = data.data.pilotUpdated.pilot
      setPilots(filterPilots(pilots, updatedPilot))
      handlePilotAdd(updatedPilot.pilotId)
    },
  })

  const allPilots = pilots.map((pilot) => pilot).reverse()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full name</TableCell>
            <TableCell align="right">Last Seen (min)</TableCell>
            <TableCell align="right">Confirmed Violation (m)</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allPilots.map((row) => (
            <TableRow
              data-testid="pilotItemRow"
              key={row.pilotId}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: recentlyAddedPilots.includes(row.pilotId)
                  ? 'lightgreen'
                  : '',
                transition: 'background-color 1s ease-in-out',
              }}
            >
              <TableCell component="th" scope="row">
                {row.firstName + ' ' + row.lastName}
              </TableCell>
              <TableCell align="right">
                {getTimeDifferenceMinutes(row.lastSeen)}
              </TableCell>
              <TableCell align="right">
                {Number(row.drone.confirmedDistance).toFixed(2)}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
